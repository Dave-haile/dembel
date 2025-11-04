
import { useEffect, useRef, useState } from "react";
import { Plus, Edit, Trash2, Eye, Search } from "lucide-react";
import Toast from "../components/Toast";
import DeleteConfirmation from "../components/DeleteConfirmation";
import FormInput from "../components/FormInput";
import RecentActivities from "../components/RecentActivities";
import Modal from "../components/Modal";
import AdminLayout from "../Shared/AdminLayout";
import { usePage, Head, router } from "@inertiajs/react";

const AdminTeam = () => {
  const { teams: initialTeams, activities, counts, flash } = usePage().props;
  const [teams, setTeams] = useState(initialTeams || []);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [toast, setToast] = useState(null);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [perPageCount, setPerPageCount] = useState(10);
  const [photoPreview, setPhotoPreview] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setTeams(Array.isArray(initialTeams) ? initialTeams : (initialTeams?.data || []));
  }, [initialTeams]);

  useEffect(() => {
    if (flash?.success) setToast({ message: flash.success, type: "success" });
    else if (flash?.error) setToast({ message: flash.error, type: "error" });
  }, [flash]);

  const itemsPerPage = perPageCount === "all" ? teams?.length || 0 : perPageCount;

  const filtered = (teams || []).filter((t) => {
    const q = searchTerm.toLowerCase();
    return (
      (t.name_en || "").toLowerCase().includes(q) ||
      (t.name_am || "").toLowerCase().includes(q) ||
      (t.position || "").toLowerCase().includes(q) ||
      (t.email || "").toLowerCase().includes(q) ||
      (t.phone || "").toLowerCase().includes(q)
    );
  });
  const visible = filtered.slice(0, itemsPerPage || filtered.length);

  const fetchTeams = async (size) => {
    try {
      setLoading(true);
      setPerPageCount(size);
      const url = window.route("admin.teams.list", {
        per_page: size === "all" ? "all" : String(size),
      });
      const res = await fetch(url, { headers: { Accept: "application/json" } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const list = Array.isArray(data) ? data : data.data || data;
      setTeams(list);
    } catch (e) {
      console.error("Failed to load teams:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeams(10);
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name_en?.trim()) newErrors.name_en = "English name is required";
    if (formData.email?.trim() && !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (type === "file") {
      const file = files?.[0];
      if (file) {
        const MAX_SIZE = 5 * 1024 * 1024;
        if (!file.type.startsWith("image/")) {
          setErrors((prev) => ({ ...prev, [name]: "Please select a valid image file." }));
          setToast({ message: "Invalid file type. Please select an image.", type: "error" });
          return;
        }
        if (file.size > MAX_SIZE) {
          setErrors((prev) => ({ ...prev, [name]: "Image must be 5MB or smaller." }));
          setToast({ message: "Image is too large (max 5MB).", type: "error" });
          return;
        }
        setFormData((prev) => ({ ...prev, [name]: file }));
        const url = URL.createObjectURL(file);
        setPhotoPreview(url);
      } else {
        setFormData((prev) => ({ ...prev, [name]: null }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  useEffect(() => () => { if (photoPreview) URL.revokeObjectURL(photoPreview); }, [photoPreview]);

  const handleCreate = () => {
    setFormData({
      name_en: "",
      name_am: "",
      position: "",
      email: "",
      phone: "",
      approval: false,
      photo: "",
    });
    setSelectedTeam(null);
    setErrors({});
    setPhotoPreview(null);
    setIsModalOpen(true);
  };

  const handleEdit = (item) => {
    setFormData({ ...item });
    setSelectedTeam(item);
    setErrors({});
    setPhotoPreview(null);
    setIsModalOpen(true);
  };

  const handleView = (item) => {
    setSelectedTeam(item);
    setIsViewModalOpen(true);
  };

  const handleDelete = (item) => {
    setSelectedTeam(item);
    setIsDeleteModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setToast({ message: "Please fix the errors in the form", type: "error" });
      return;
    }

    const fd = new FormData();
    fd.append("name_en", formData.name_en ?? "");
    if (formData.name_am) fd.append("name_am", formData.name_am);
    if (formData.position) fd.append("position", formData.position);
    if (formData.email) fd.append("email", formData.email);
    if (formData.phone) fd.append("phone", formData.phone);
    fd.append("approval", formData.approval ? "1" : "0");
    if (formData.photo instanceof File) fd.append("photo", formData.photo);

    if (selectedTeam) {
      fd.append("_method", "put");
      router.post(window.route("admin.teams.update", selectedTeam.id), fd, {
        forceFormData: true,
        onError: (errs) => {
          setErrors(errs || {});
          setToast({ message: errs?.message || "Failed to update team member", type: "error" });
        },
        onSuccess: () => {
          setIsModalOpen(false);
          setSelectedTeam(null);
          setPhotoPreview(null);
          router.reload({ only: ["teams", "counts"] });
        },
      });
    } else {
      router.post(window.route("admin.teams.store"), fd, {
        forceFormData: true,
        onError: (errs) => {
          setErrors(errs || {});
          setToast({ message: errs?.message || "Failed to create team member", type: "error" });
        },
        onSuccess: () => {
          setIsModalOpen(false);
          setSelectedTeam(null);
          setPhotoPreview(null);
          router.reload({ only: ["teams", "counts"] });
        },
      });
    }
  };

  const confirmDelete = () => {
    if (!selectedTeam) return;
    router.post(
      window.route("admin.teams.destroy", selectedTeam.id),
      { _method: "delete" },
      {
        onSuccess: () => {
          setIsDeleteModalOpen(false);
          setSelectedTeam(null);
          router.reload({ only: ["teams", "counts"] });
        },
      }
    );
  };

  const computedCounts = {
    total: counts?.total ?? teams.length,
    approved: counts?.approved ?? teams.filter((t) => !!t.approval).length,
    pending: counts?.pending ?? teams.filter((t) => !t.approval).length,
  };

  return (
    <AdminLayout>
      <Head title="Admin Team" />
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Team Management</h1>
            <p className="text-gray-600 mt-1">Manage team members</p>
          </div>
          <button
            onClick={handleCreate}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add New Member
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <p className="text-sm text-gray-600 mb-1">Total Members</p>
            <p className="text-3xl font-bold text-gray-800">{computedCounts.total}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <p className="text-sm text-gray-600 mb-1">Approved</p>
            <p className="text-3xl font-bold text-green-600">{computedCounts.approved}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <p className="text-sm text-gray-600 mb-1">Pending</p>
            <p className="text-3xl font-bold text-yellow-600">{computedCounts.pending}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-6 shadow-2xl rounded-xl p-6 min-h-[calc(100vh-16rem)] hover:shadow-none transition-all">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search team..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Add more:</span>
                  {[5, 10, 20].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() =>
                        fetchTeams(
                          (perPageCount === "all" ? teams.length : perPageCount || 0) + n
                        )
                      }
                      disabled={loading}
                      className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                    >
                      {n}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => fetchTeams("all")}
                    disabled={loading}
                    className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                  >
                    Load all
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {visible.length > 0 ? (
                  visible.map((m) => (
                    <div key={m.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start gap-4">
                        <img
                          src={m.photo ? `/${m.photo}` : "https://via.placeholder.com/80?text=Team"}
                          alt={m.name_en || m.name_am}
                          className="w-14 h-14 rounded object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold text-gray-800">{m.name_en} {m.name_am ? ` / ${m.name_am}` : ""}</h3>
                              <p className="text-sm text-gray-600 break-words">{m.position || "—"}</p>
                              <div className="mt-2 text-xs flex items-center gap-2 flex-wrap">
                                <span className={`px-2 py-1 rounded ${m.approval ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                                  {m.approval ? "Approved" : "Pending"}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 justify-center">
                              <button onClick={() => handleView(m)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button onClick={() => handleEdit(m)} className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Edit">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button onClick={() => handleDelete(m)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                          <div className="mt-2 text-sm text-gray-600 flex gap-4 flex-wrap">
                            {m.email && <span>{m.email}</span>}
                            {m.phone && <span>{m.phone}</span>}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-500 py-8">No team members found</div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <RecentActivities activities={activities} subjectType="team" onViewMore={()=>router.visit(window.route('admin.activity.index', { subject: 'team' }))} />
        </div>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={selectedTeam ? "Edit Team Member" : "Add Team Member"}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput label="Name (English)" name="name_en" value={formData.name_en || ""} onChange={handleInputChange} error={errors.name_en} required />
              <FormInput label="Name (Amharic)" name="name_am" value={formData.name_am || ""} onChange={handleInputChange} />
              <FormInput label="Position" name="position" value={formData.position || ""} onChange={handleInputChange} />
              <FormInput label="Email" name="email" type="email" value={formData.email || ""} onChange={handleInputChange} error={errors.email} />
              <FormInput label="Phone" name="phone" value={formData.phone || ""} onChange={handleInputChange} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Photo</label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full px-4 py-6 border-2 border-dashed rounded-lg text-center cursor-pointer hover:bg-gray-50"
                >
                  {photoPreview ? (
                    <img src={photoPreview} alt="Photo preview" className="mx-auto h-20 w-20 object-cover rounded-full" />
                  ) : typeof formData.photo === "string" && formData.photo ? (
                    <img src={`/${formData.photo}`} alt="Current photo" className="mx-auto h-20 w-20 object-cover rounded-full" />
                  ) : (
                    <div className="text-gray-500">Click to upload photo</div>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={handleInputChange}
                  className="hidden"
                />
              </div>
              <div className="flex items-center gap-3 mt-6">
                <input id="approval" type="checkbox" name="approval" checked={!!formData.approval} onChange={handleInputChange} className="w-4 h-4" />
                <label htmlFor="approval" className="text-sm text-gray-700">Approved</label>
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border rounded">Cancel</button>
              <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded">{selectedTeam ? "Update" : "Create"}</button>
            </div>
          </form>
        </Modal>

        <Modal isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)} title="Team Member Details">
          {selectedTeam && (
            <div className="space-y-3">
              <div className="flex items-start gap-4">
                <img src={selectedTeam.photo ? `/${selectedTeam.photo}` : "https://via.placeholder.com/120x120?text=Team"} alt={selectedTeam.name_en} className="w-24 h-24 rounded-full object-cover" />
                <div>
                  <h3 className="text-lg font-semibold">{selectedTeam.name_en} {selectedTeam.name_am ? ` / ${selectedTeam.name_am}` : ""}</h3>
                  <p className="text-sm text-gray-600">{selectedTeam.position || "—"}</p>
                  <div className="mt-2 text-xs flex items-center gap-2 flex-wrap">
                    <span className={`px-2 py-1 rounded ${selectedTeam.approval ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                      {selectedTeam.approval ? "Approved" : "Pending"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-gray-800 font-medium">{selectedTeam.email || '—'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="text-gray-800 font-medium">{selectedTeam.phone || '—'}</p>
                </div>
              </div>
            </div>
          )}
        </Modal>

        <DeleteConfirmation
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={confirmDelete}
          title="Delete Team Member"
          message={`Are you sure you want to delete "${selectedTeam?.name_en || "this member"}"? This action cannot be undone.`}
        />

        {toast && (
          <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminTeam;

