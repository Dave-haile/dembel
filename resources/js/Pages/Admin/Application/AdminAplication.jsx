import { useEffect, useRef, useState } from "react";
import { Plus, Edit, Trash2, Eye, Search } from "lucide-react";
import Toast from "../components/Toast";
import DeleteConfirmation from "../components/DeleteConfirmation";
import FormInput from "../components/FormInput";
import RecentActivities from "../components/RecentActivities";
import Modal from "../components/Modal";
import AdminLayout from "../Shared/AdminLayout";
import { usePage, Head, router } from "@inertiajs/react";

const AdminAplication = () => {
  const { applications: initialApps, activities, counts, vacancies, flash } = usePage().props;
  const [applications, setApplications] = useState(initialApps || []);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);
  const [toast, setToast] = useState(null);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [perPageCount, setPerPageCount] = useState(10);
  const photoInputRef = useRef(null);
  const cvInputRef = useRef(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  useEffect(() => {
    setApplications(Array.isArray(initialApps) ? initialApps : (initialApps?.data || []));
  }, [initialApps]);

  useEffect(() => {
    if (flash?.success) setToast({ message: flash.success, type: "success" });
    else if (flash?.error) setToast({ message: flash.error, type: "error" });
  }, [flash]);

  const itemsPerPage = perPageCount === "all" ? applications?.length || 0 : perPageCount;

  const filteredApps = (applications || []).filter((a) => {
    const t = searchTerm.toLowerCase();
    const name = `${a.first_name || ""} ${a.last_name || ""}`.trim().toLowerCase();
    return (
      name.includes(t) ||
      (a.email || "").toLowerCase().includes(t) ||
      (a.phone || "").toLowerCase().includes(t) ||
      (a.city || "").toLowerCase().includes(t)
    );
  });

  const visibleApps = filteredApps.slice(0, itemsPerPage || filteredApps.length);

  const fetchApplications = async (size) => {
    try {
      setLoading(true);
      setPerPageCount(size);
      const url = window.route("admin.applications.list", {
        per_page: size === "all" ? "all" : String(size),
      });
      const res = await fetch(url, { headers: { Accept: "application/json" } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const list = Array.isArray(data) ? data : data.data || data;
      setApplications(list);
    } catch (e) {
      console.error("Failed to load applications:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications(10);
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.first_name?.trim()) newErrors.first_name = "First name is required";
    if (!formData.last_name?.trim()) newErrors.last_name = "Last name is required";
    if (!formData.phone?.trim()) newErrors.phone = "Phone is required";
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      const file = files?.[0];
      setFormData((prev) => ({ ...prev, [name]: file }));
      if (name === "photo" && file) {
        const MAX_SIZE = 5 * 1024 * 1024;
        if (!file.type.startsWith("image/")) {
          setErrors((prev) => ({ ...prev, photo: "Please select a valid image file." }));
          setToast({ message: "Invalid photo file type.", type: "error" });
          return;
        }
        if (file.size > MAX_SIZE) {
          setErrors((prev) => ({ ...prev, photo: "Image must be 5MB or smaller." }));
          setToast({ message: "Image is too large (max 5MB).", type: "error" });
          return;
        }
        const url = URL.createObjectURL(file);
        setPhotoPreview(url);
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  useEffect(() => () => { if (photoPreview) URL.revokeObjectURL(photoPreview); }, [photoPreview]);

  const handleCreate = () => {
    setFormData({
      first_name: "",
      last_name: "",
      phone: "",
      alt_phone: "",
      birth_date: "",
      email: "",
      photo: "",
      subcity: "",
      woreda: "",
      city: "",
      marital_status: "",
      education_background: "",
      vacancy_id: "",
      cv: "",
    });
    setSelectedApp(null);
    setErrors({});
    setPhotoPreview(null);
    setIsModalOpen(true);
  };

  const handleEdit = (app) => {
    setFormData({ ...app });
    setSelectedApp(app);
    setErrors({});
    setPhotoPreview(null);
    setIsModalOpen(true);
  };

  const handleView = (app) => {
    setSelectedApp(app);
    setIsViewModalOpen(true);
  };

  const handleDelete = (app) => {
    setSelectedApp(app);
    setIsDeleteModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setToast({ message: "Please fix the errors in the form", type: "error" });
      return;
    }

    const fd = new FormData();
    fd.append("first_name", formData.first_name ?? "");
    fd.append("last_name", formData.last_name ?? "");
    fd.append("phone", formData.phone ?? "");
    if (formData.alt_phone) fd.append("alt_phone", formData.alt_phone);
    if (formData.birth_date) fd.append("birth_date", formData.birth_date);
    if (formData.email) fd.append("email", formData.email);
    if (formData.subcity) fd.append("subcity", formData.subcity);
    if (formData.woreda) fd.append("woreda", formData.woreda);
    if (formData.city) fd.append("city", formData.city);
    if (formData.marital_status) fd.append("marital_status", formData.marital_status);
    if (formData.education_background) fd.append("education_background", formData.education_background);
    if (formData.vacancy_id) fd.append("vacancy_id", String(formData.vacancy_id));
    if (formData.photo instanceof File) fd.append("photo", formData.photo);
    if (formData.cv instanceof File) fd.append("cv", formData.cv);

    if (selectedApp) {
      fd.append("_method", "put");
      router.post(window.route("admin.applications.update", selectedApp.id), fd, {
        forceFormData: true,
        onError: (errs) => {
          setErrors(errs || {});
          setToast({ message: errs?.message || "Failed to update application", type: "error" });
          setToast({ message: Object.values(errs)[0], type: 'error' });
        },
        onSuccess: () => {
          setIsModalOpen(false);
          setSelectedApp(null);
          setPhotoPreview(null);
          router.reload({ only: ["applications", "counts"] });
        },
      });
    } else {
      router.post(window.route("admin.applications.store"), fd, {
        forceFormData: true,
        onError: (errs) => {
          setErrors(errs || {});
          setToast({ message: errs?.message || "Failed to create application", type: "error" });
          setToast({ message: Object.values(errs)[0], type: 'error' });
        },
        onSuccess: () => {
          setIsModalOpen(false);
          setSelectedApp(null);
          setPhotoPreview(null);
          router.reload({ only: ["applications", "counts"] });
        },
      });
    }
  };

  const confirmDelete = () => {
    if (!selectedApp) return;
    router.post(
      window.route("admin.applications.destroy", selectedApp.id),
      { _method: "delete" },
      {
        onSuccess: () => {
          setIsDeleteModalOpen(false);
          setSelectedApp(null);
          router.reload({ only: ["applications", "counts"] });
        },
      }
    );
  };

  const vacancyName = (id) => vacancies?.find((v) => v.id === id)?.title || "—";

  const computedCounts = {
    total: counts?.total ?? applications.length,
    with_cv: counts?.with_cv ?? applications.filter((a) => !!a.cv).length,
  };

  return (
    <AdminLayout>
      <Head title="Admin Applications" />
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Applications Management</h1>
            <p className="text-gray-600 mt-1">Manage job applications</p>
          </div>
          <button
            onClick={handleCreate}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add New Application
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <p className="text-sm text-gray-600 mb-1">Total Applications</p>
            <p className="text-3xl font-bold text-gray-800">{computedCounts.total}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <p className="text-sm text-gray-600 mb-1">With CV</p>
            <p className="text-3xl font-bold text-blue-600">{computedCounts.with_cv}</p>
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
                    placeholder="Search applications..."
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
                        fetchApplications(
                          (perPageCount === "all" ? applications.length : perPageCount || 0) + n
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
                    onClick={() => fetchApplications("all")}
                    disabled={loading}
                    className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                  >
                    Load all
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {visibleApps.length > 0 ? (
                  visibleApps.map((a) => (
                    <div key={a.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start gap-4">
                        <img
                          src={a.photo ? `/${a.photo}` : "https://via.placeholder.com/80?text=Photo"}
                          alt={a.first_name}
                          className="w-14 h-14 rounded-full object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold text-gray-800">{a.first_name} {a.last_name}</h3>
                              <p className="text-sm text-gray-600 break-words">{a.email || "—"}</p>
                              <div className="mt-2 text-xs flex items-center gap-2 flex-wrap">
                                <span className="px-2 py-1 rounded bg-gray-100 text-gray-700">{a.phone || "—"}</span>
                                <span className="px-2 py-1 rounded bg-blue-100 text-blue-700">{vacancyName(a.vacancy_id)}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 justify-center">
                              <button onClick={() => handleView(a)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button onClick={() => handleEdit(a)} className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Edit">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button onClick={() => handleDelete(a)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-500 py-8">No applications found</div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <RecentActivities activities={activities} subjectType="application" onViewMore={()=>router.visit(window.route('admin.activity.index', { subject: 'application' }))} />
        </div>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={selectedApp ? "Edit Application" : "Add Application"}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput label="First Name" name="first_name" value={formData.first_name || ""} onChange={handleInputChange} error={errors.first_name} required />
              <FormInput label="Last Name" name="last_name" value={formData.last_name || ""} onChange={handleInputChange} error={errors.last_name} required />
              <FormInput label="Phone" name="phone" value={formData.phone || ""} onChange={handleInputChange} error={errors.phone} required />
              <FormInput label="Alt Phone" name="alt_phone" value={formData.alt_phone || ""} onChange={handleInputChange} />
              <FormInput label="Email" name="email" type="email" value={formData.email || ""} onChange={handleInputChange} error={errors.email} />
              <FormInput label="Birth Date" name="birth_date" type="date" value={formData.birth_date || ""} onChange={handleInputChange} />
              <FormInput label="Subcity" name="subcity" value={formData.subcity || ""} onChange={handleInputChange} />
              <FormInput label="Woreda" name="woreda" value={formData.woreda || ""} onChange={handleInputChange} />
              <FormInput label="City" name="city" value={formData.city || ""} onChange={handleInputChange} />
              <FormInput label="Marital Status" name="marital_status" value={formData.marital_status || ""} onChange={handleInputChange} />
              <FormInput label="Education Background" name="education_background" value={formData.education_background || ""} onChange={handleInputChange} />
              <FormInput
                label="Vacancy"
                name="vacancy_id"
                type="select"
                value={formData.vacancy_id || ""}
                onChange={handleInputChange}
                options={[{ value: "", label: "Select vacancy" }, ...(vacancies || []).map(v => ({ value: v.id, label: v.title }))]}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Photo</label>
                <div
                  onClick={() => photoInputRef.current?.click()}
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
                <input ref={photoInputRef} type="file" name="photo" accept="image/*" onChange={handleInputChange} className="hidden" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">CV (PDF/DOC)</label>
                <div
                  onClick={() => cvInputRef.current?.click()}
                  className="w-full px-4 py-6 border-2 border-dashed rounded-lg text-center cursor-pointer hover:bg-gray-50"
                >
                  <div className="text-gray-500">
                    {formData.cv instanceof File ? formData.cv.name : (typeof formData.cv === "string" && formData.cv ? "Current file selected" : "Click to upload CV")}
                  </div>
                </div>
                <input ref={cvInputRef} type="file" name="cv" accept=".pdf,.doc,.docx,.rtf,.txt" onChange={handleInputChange} className="hidden" />
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border rounded">Cancel</button>
              <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded">{selectedApp ? "Update" : "Create"}</button>
            </div>
          </form>
        </Modal>

        <Modal isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)} title="Application Details">
          {selectedApp && (
            <div className="space-y-3">
              <div className="flex items-start gap-4">
                <img src={selectedApp.photo ? `/${selectedApp.photo}` : "https://via.placeholder.com/120x120?text=Photo"} alt={selectedApp.first_name} className="w-24 h-24 rounded-full object-cover" />
                <div>
                  <h3 className="text-lg font-semibold">{selectedApp.first_name} {selectedApp.last_name}</h3>
                  <p className="text-sm text-gray-600">{selectedApp.email || "—"}</p>
                  <div className="mt-2 text-xs flex items-center gap-2 flex-wrap">
                    <span className="px-2 py-1 rounded bg-gray-100 text-gray-700">{selectedApp.phone || "—"}</span>
                    <span className="px-2 py-1 rounded bg-blue-100 text-blue-700">{vacancyName(selectedApp.vacancy_id)}</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">City</p>
                  <p className="text-gray-800 font-medium">{selectedApp.city || '—'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Subcity / Woreda</p>
                  <p className="text-gray-800 font-medium">{selectedApp.subcity || '—'} {selectedApp.woreda ? `/ ${selectedApp.woreda}` : ''}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Marital Status</p>
                  <p className="text-gray-800 font-medium">{selectedApp.marital_status || '—'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Birth Date</p>
                  <p className="text-gray-800 font-medium">{selectedApp.birth_date || '—'}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Education Background</p>
                <p className="text-gray-800 whitespace-pre-line">{selectedApp.education_background || '—'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">CV</p>
                {selectedApp.cv ? (
                  <a href={`/${selectedApp.cv}`} target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline">View CV</a>
                ) : (
                  <span className="text-gray-700">—</span>
                )}
              </div>
            </div>
          )}
        </Modal>

        <DeleteConfirmation
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={confirmDelete}
          title="Delete Application"
          message={`Are you sure you want to delete "${selectedApp ? (selectedApp.first_name + ' ' + selectedApp.last_name) : "this application"}"? This action cannot be undone.`}
        />

        {toast && (
          <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminAplication;
