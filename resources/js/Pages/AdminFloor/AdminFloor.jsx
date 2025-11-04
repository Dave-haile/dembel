import { useEffect, useState } from "react";
import { Plus, Edit, Trash2, Eye, Search } from "lucide-react";
import Toast from "../Admin/components/Toast";
import DeleteConfirmation from "../Admin/components/DeleteConfirmation";
import FormInput from "../Admin/components/FormInput";
import RecentActivities from "../Admin/components/RecentActivities";
import Modal from "../Admin/components/Modal";
import AdminLayout from "../Admin/Shared/AdminLayout";
import { usePage, Head, router } from "@inertiajs/react";

const AdminFloor = () => {
  const { floors: initialFloors, activities, counts, flash } = usePage().props;
  const [floors, setFloors] = useState(initialFloors || []);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [toast, setToast] = useState(null);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [perPageCount, setPerPageCount] = useState(10);

  useEffect(() => {
    setFloors(Array.isArray(initialFloors) ? initialFloors : (initialFloors?.data || []));
  }, [initialFloors]);

  useEffect(() => {
    if (flash?.success) setToast({ message: flash.success, type: "success" });
    else if (flash?.error) setToast({ message: flash.error, type: "error" });
  }, [flash]);

  const itemsPerPage = perPageCount === "all" ? floors?.length || 0 : perPageCount;

  const filtered = (floors || []).filter((f) => {
    const t = searchTerm.toLowerCase();
    return (
      (f.name || "").toLowerCase().includes(t) ||
      (f.description || "").toLowerCase().includes(t)
    );
  });
  const visible = filtered.slice(0, itemsPerPage || filtered.length);

  const fetchFloors = async (size) => {
    try {
      setLoading(true);
      setPerPageCount(size);
      const url = window.route("admin.floors.list", {
        per_page: size === "all" ? "all" : String(size),
      });
      const res = await fetch(url, { headers: { Accept: "application/json" } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const list = Array.isArray(data) ? data : data.data || data;
      setFloors(list);
    } catch (e) {
      console.error("Failed to load floors:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFloors(10);
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name?.trim()) newErrors.name = "Name is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleCreate = () => {
    setFormData({ name: "", description: "" });
    setSelected(null);
    setErrors({});
    setIsModalOpen(true);
  };

  const handleEdit = (item) => {
    setFormData({ ...item });
    setSelected(item);
    setErrors({});
    setIsModalOpen(true);
  };

  const handleView = (item) => {
    setSelected(item);
    setIsViewModalOpen(true);
  };

  const handleDelete = (item) => {
    setSelected(item);
    setIsDeleteModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setToast({ message: "Please fix the errors in the form", type: "error" });
      return;
    }

    const fd = new FormData();
    fd.append("name", formData.name ?? "");
    if (typeof formData.description === "string") fd.append("description", formData.description);

    if (selected) {
      fd.append("_method", "put");
      router.post(window.route("admin.floors.update", selected.id), fd, {
        forceFormData: true,
        onError: (errs) => {
          setErrors(errs || {});
          setToast({ message: errs?.message || "Failed to update floor", type: "error" });
        },
        onSuccess: () => {
          setIsModalOpen(false);
          setSelected(null);
          router.reload({ only: ["floors", "counts"] });
        },
      });
    } else {
      router.post(window.route("admin.floors.store"), fd, {
        forceFormData: true,
        onError: (errs) => {
          setErrors(errs || {});
          setToast({ message: errs?.message || "Failed to create floor", type: "error" });
        },
        onSuccess: () => {
          setIsModalOpen(false);
          setSelected(null);
          router.reload({ only: ["floors", "counts"] });
        },
      });
    }
  };

  const confirmDelete = () => {
    if (!selected) return;
    router.post(
      window.route("admin.floors.destroy", selected.id),
      { _method: "delete" },
      {
        onSuccess: () => {
          setIsDeleteModalOpen(false);
          setSelected(null);
          router.reload({ only: ["floors", "counts"] });
        },
      }
    );
  };

  const computedCounts = {
    total: counts?.total ?? floors.length,
    with_description: counts?.with_description ?? floors.filter((f) => !!f.description).length,
  };

  return (
    <AdminLayout>
      <Head title="Admin Floors" />
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Floors Management</h1>
            <p className="text-gray-600 mt-1">Manage building floors</p>
          </div>
          <button
            onClick={handleCreate}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Floor
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <p className="text-sm text-gray-600 mb-1">Total Floors</p>
            <p className="text-3xl font-bold text-gray-800">{computedCounts.total}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <p className="text-sm text-gray-600 mb-1">With Description</p>
            <p className="text-3xl font-bold text-blue-600">{computedCounts.with_description}</p>
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
                    placeholder="Search floors..."
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
                        fetchFloors(
                          (perPageCount === "all" ? floors.length : perPageCount || 0) + n
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
                    onClick={() => fetchFloors("all")}
                    disabled={loading}
                    className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                  >
                    Load all
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {visible.length > 0 ? (
                  visible.map((f) => (
                    <div key={f.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold text-gray-800">{f.name}</h3>
                              {f.description && (
                                <p className="text-sm text-gray-600 break-words">{f.description}</p>
                              )}
                            </div>
                            <div className="flex items-center gap-2 justify-center">
                              <button onClick={() => handleView(f)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button onClick={() => handleEdit(f)} className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Edit">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button onClick={() => handleDelete(f)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-500 py-8">No floors found</div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <RecentActivities activities={activities} subjectType="floor" onViewMore={() => router.visit(window.route('admin.activity.index', { subject: 'floor' }))} />
        </div>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={selected ? "Edit Floor" : "Add Floor"}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput label="Name" name="name" value={formData.name || ""} onChange={handleInputChange} error={errors.name} required />
              <FormInput label="Description" name="description" value={formData.description || ""} onChange={handleInputChange} />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border rounded">Cancel</button>
              <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded">{selected ? "Update" : "Create"}</button>
            </div>
          </form>
        </Modal>

        <Modal isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)} title="Floor Details">
          {selected && (
            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="text-gray-800 font-medium break-words">{selected.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Description</p>
                  <p className="text-gray-800 font-medium break-words">{selected.description || '—'}</p>
                </div>
              </div>
            </div>
          )}
        </Modal>

        <DeleteConfirmation
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={confirmDelete}
          title="Delete Floor"
          message={`Are you sure you want to delete "${selected?.name || "this floor"}"? This action cannot be undone.`}
        />

        {toast && (
          <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminFloor;

