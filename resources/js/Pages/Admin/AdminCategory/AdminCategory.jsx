import { useEffect, useState } from "react";
import { Plus, Edit, Trash2, Eye, Search } from "lucide-react";
import Toast from "../components/Toast";
import DeleteConfirmation from "../components/DeleteConfirmation";
import FormInput from "../components/FormInput";
import Modal from "../components/Modal";
import AdminLayout from "../Shared/AdminLayout";
import { usePage, Head, router } from "@inertiajs/react";
import ActivityFeed from "../components/RecentActivities";

const AdminCategory = () => {
  const { categories: initialCategories, activities, counts, flash } = usePage().props;
  const [categories, setCategories] = useState(initialCategories || []);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [toast, setToast] = useState(null);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [perPageCount, setPerPageCount] = useState(10);
  

  useEffect(() => {
    setCategories(Array.isArray(initialCategories) ? initialCategories : (initialCategories?.data || []));
  }, [initialCategories]);

  useEffect(() => {
    if (flash?.success) setToast({ message: flash.success, type: "success" });
    else if (flash?.error) setToast({ message: flash.error, type: "error" });
  }, [flash]);

  const itemsPerPage = perPageCount === "all" ? categories?.length || 0 : perPageCount;

  const filtered = (categories || []).filter((c) => {
    const t = searchTerm.toLowerCase();
    return (c.name || "").toLowerCase().includes(t);
  });
  const visible = filtered.slice(0, itemsPerPage || filtered.length);

  const fetchCategories = async (size) => {
    try {
      setLoading(true);
      setPerPageCount(size);
      const url = window.route("admin.categories.list", {
        per_page: size === "all" ? "all" : String(size),
      });
      const res = await fetch(url, { headers: { Accept: "application/json" } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const list = Array.isArray(data) ? data : data.data || data;
      setCategories(list);
    } catch (e) {
      console.error("Failed to load categories:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories(10);
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
    setFormData({ name: "", icon: "" });
    setSelectedCategory(null);
    setErrors({});
    
    setIsModalOpen(true);
  };

  const handleEdit = (category) => {
    setFormData({ ...category });
    setSelectedCategory(category);
    setErrors({});
    setIsModalOpen(true);
  };

  const handleView = (category) => {
    setSelectedCategory(category);
    setIsViewModalOpen(true);
  };

  const handleDelete = (category) => {
    setSelectedCategory(category);
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
    if (typeof formData.icon === "string") fd.append("icon", formData.icon);

    if (selectedCategory) {
      fd.append("_method", "put");
      router.post(window.route("admin.categories.update", selectedCategory.id), fd, {
        forceFormData: true,
        onError: (errs) => {
          setErrors(errs || {});
          setToast({ message: errs?.message || "Failed to update category", type: "error" });
          setToast({ message: Object.values(errs)[0], type: 'error' });
        },
        onSuccess: () => {
          setIsModalOpen(false);
          setSelectedCategory(null);
          setToast({ message: "Category updated successfully", type: "success" });
          router.reload({ only: ["categories", "counts"] });
        },
      });
    } else {
      router.post(window.route("admin.categories.store"), fd, {
        forceFormData: true,
        onError: (errs) => {
          setErrors(errs || {});
          setToast({ message: errs?.message || "Failed to create category", type: "error" });
          setToast({ message: Object.values(errs)[0], type: 'error' });
        },
        onSuccess: () => {
          setIsModalOpen(false);
          setSelectedCategory(null);
          setToast({ message: "Category created successfully", type: "success" });
          router.reload({ only: ["categories", "counts"] });
        },
      });
    }
  };

  const confirmDelete = () => {
    if (!selectedCategory) return;
    router.post(
      window.route("admin.categories.destroy", selectedCategory.id),
      { _method: "delete" },
      {
        onSuccess: () => {
          setIsDeleteModalOpen(false);
          setSelectedCategory(null);
          setToast({ message: "Category deleted successfully", type: "success" });
          router.reload({ only: ["categories", "counts"] });
        },
      }
    );
  };

  const computedCounts = {
    total: counts?.total ?? categories.length,
    with_icon: counts?.with_icon ?? categories.filter((c) => !!c.icon).length,
  };

  return (
    <AdminLayout>
      <Head title="Admin Categories" />
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Categories Management</h1>
            <p className="text-gray-600 mt-1">Manage tenant categories</p>
          </div>
          <button
            onClick={handleCreate}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add New Category
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <p className="text-sm text-gray-600 mb-1">Total Categories</p>
            <p className="text-3xl font-bold text-gray-800">{computedCounts.total}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <p className="text-sm text-gray-600 mb-1">With Icon</p>
            <p className="text-3xl font-bold text-blue-600">{computedCounts.with_icon}</p>
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
                    placeholder="Search categories..."
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
                        fetchCategories(
                          (perPageCount === "all" ? categories.length : perPageCount || 0) + n
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
                    onClick={() => fetchCategories("all")}
                    disabled={loading}
                    className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                  >
                    Load all
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {visible.length > 0 ? (
                  visible.map((c) => (
                    <div key={c.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-lg bg-gray-100 text-gray-700 flex items-center justify-center text-sm font-medium">
                          {c.icon || '—'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-4">
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold text-gray-800">{c.name}</h3>
                              {typeof c.tenants_count === 'number' && (
                                <p className="text-sm text-gray-500">{c.tenants_count} tenants</p>
                              )}
                            </div>
                            <div className="flex items-center gap-2 justify-center">
                              <button onClick={() => handleView(c)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button onClick={() => handleEdit(c)} className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Edit">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button onClick={() => handleDelete(c)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-500 py-8">No categories found</div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <ActivityFeed activities={activities} subjectType="category" onViewMore={() => router.visit(window.route('admin.activity.index', { subject: 'category' }))} />
        </div>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={selectedCategory ? "Edit Category" : "Add Category"}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput label="Name" name="name" value={formData.name || ""} onChange={handleInputChange} error={errors.name} required />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput label="Icon" name="icon" value={formData.icon || ""} onChange={handleInputChange} placeholder="e.g. fa-solid fa-store or 123" />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border rounded">Cancel</button>
              <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded">{selectedCategory ? "Update" : "Create"}</button>
            </div>
          </form>
        </Modal>

        <Modal isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)} title="Category Details">
          {selectedCategory && (
            <div className="space-y-3">
              <div className="flex items-start gap-4">
                <div className="w-24 h-24 rounded bg-gray-100 text-gray-700 flex items-center justify-center text-base font-medium">
                  {selectedCategory.icon || '—'}
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{selectedCategory.name}</h3>
                </div>
              </div>
            </div>
          )}
        </Modal>

        <DeleteConfirmation
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={confirmDelete}
          title="Delete Category"
          message={`Are you sure you want to delete "${selectedCategory?.name || "this category"}"? This action cannot be undone.`}
        />

        {toast && (
          <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminCategory;

