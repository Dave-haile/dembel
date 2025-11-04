import { useEffect, useRef, useState } from "react";
import { Plus, Edit, Trash2, Eye, Search } from "lucide-react";
import Toast from "../components/Toast";
import DeleteConfirmation from "../components/DeleteConfirmation";
import FormInput from "../components/FormInput";
import RecentActivities from "../components/RecentActivities";
import Modal from "../components/Modal";
import AdminLayout from "../Shared/AdminLayout";
import { usePage, Head, router } from "@inertiajs/react";

const AdminNews = () => {
  const { news: initialNews, activities, counts, flash } = usePage().props;
  const [items, setItems] = useState(initialNews || []);
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
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const pdfInputRef = useRef(null);

  useEffect(() => {
    setItems(Array.isArray(initialNews) ? initialNews : (initialNews?.data || []));
  }, [initialNews]);

  useEffect(() => {
    if (flash?.success) setToast({ message: flash.success, type: "success" });
    else if (flash?.error) setToast({ message: flash.error, type: "error" });
  }, [flash]);

  useEffect(() => () => { if (imagePreview) URL.revokeObjectURL(imagePreview); }, [imagePreview]);

  const itemsPerPage = perPageCount === "all" ? items?.length || 0 : perPageCount;

  const filtered = (items || []).filter((n) => {
    const t = searchTerm.toLowerCase();
    return (
      (n.title_en || "").toLowerCase().includes(t) ||
      (n.sub_title_en || "").toLowerCase().includes(t) ||
      (n.title_am || "").toLowerCase().includes(t) ||
      (n.category || "").toLowerCase().includes(t)
    );
  });
  const visible = filtered.slice(0, itemsPerPage || filtered.length);

  const fetchNews = async (size) => {
    try {
      setLoading(true);
      setPerPageCount(size);
      const url = window.route("admin.news.list", {
        per_page: size === "all" ? "all" : String(size),
      });
      const res = await fetch(url, { headers: { Accept: "application/json" } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const list = Array.isArray(data) ? data : data.data || data;
      setItems(list);
    } catch (e) {
      console.error("Failed to load news:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews(10);
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title_en?.trim()) newErrors.title_en = "Title (EN) is required";
    if (!formData.title_am?.trim()) newErrors.title_am = "Title (AM) is required";
    if (!formData.category?.trim()) newErrors.category = "Category is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (type === "file") {
      const file = files?.[0];
      if (name === "image") {
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
          setImagePreview(url);
        } else {
          setFormData((prev) => ({ ...prev, [name]: null }));
          setImagePreview(null);
        }
      } else if (name === "pdf_file") {
        setFormData((prev) => ({ ...prev, [name]: file || null }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleCreate = () => {
    setFormData({
      category: "",
      title_en: "",
      title_am: "",
      sub_title_en: "",
      sub_title_am: "",
      excerpt_en: "",
      excerpt_am: "",
      content_en: "",
      content_am: "",
      image: "",
      pdf_file: "",
      approval: false,
    });
    setSelected(null);
    setErrors({});
    setImagePreview(null);
    setIsModalOpen(true);
  };

  const handleEdit = (item) => {
    setFormData({ ...item, approval: !!item.approval, image: item.image || "", pdf_file: "" });
    setSelected(item);
    setErrors({});
    setImagePreview(null);
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
    if (formData.category) fd.append("category", formData.category);
    fd.append("title_en", formData.title_en ?? "");
    if (formData.title_am) fd.append("title_am", formData.title_am);
    if (formData.sub_title_en) fd.append("sub_title_en", formData.sub_title_en);
    if (formData.sub_title_am) fd.append("sub_title_am", formData.sub_title_am);
    if (formData.excerpt_en) fd.append("excerpt_en", formData.excerpt_en);
    if (formData.excerpt_am) fd.append("excerpt_am", formData.excerpt_am);
    if (formData.content_en) fd.append("content_en", formData.content_en);
    if (formData.content_am) fd.append("content_am", formData.content_am);
    fd.append("approval", formData.approval ? "1" : "0");
    if (formData.image instanceof File) fd.append("image", formData.image);
    if (formData.pdf_file instanceof File) fd.append("pdf_file", formData.pdf_file);

    if (selected) {
      fd.append("_method", "put");
      router.post(window.route("admin.news.update", selected.id), fd, {
        forceFormData: true,
        onError: (errs) => {
          setErrors(errs || {});
          setToast({ message: errs?.message || "Failed to update news", type: "error" });
        },
        onSuccess: () => {
          setIsModalOpen(false);
          setSelected(null);
          setImagePreview(null);
          router.reload({ only: ["news", "counts"] });
        },
      });
    } else {
      router.post(window.route("admin.news.store"), fd, {
        forceFormData: true,
        onError: (errs) => {
          setErrors(errs || {});
          setToast({ message: errs?.message || "Failed to create news", type: "error" });
        },
        onSuccess: () => {
          setIsModalOpen(false);
          setSelected(null);
          setImagePreview(null);
          router.reload({ only: ["news", "counts"] });
        },
      });
    }
  };

  const confirmDelete = () => {
    if (!selected) return;
    router.post(
      window.route("admin.news.destroy", selected.id),
      { _method: "delete" },
      {
        onSuccess: () => {
          setIsDeleteModalOpen(false);
          setSelected(null);
          router.reload({ only: ["news", "counts"] });
        },
      }
    );
  };

  const computedCounts = {
    total: counts?.total ?? items.length,
    approved: counts?.approved ?? items.filter((n) => !!n.approval).length,
    pending: counts?.pending ?? items.filter((n) => !n.approval).length,
  };

  return (
    <AdminLayout>
      <Head title="Admin News" />
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">News Management</h1>
            <p className="text-gray-600 mt-1">Manage news and events</p>
          </div>
          <button
            onClick={handleCreate}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add News
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <p className="text-sm text-gray-600 mb-1">Total</p>
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
                    placeholder="Search news..."
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
                        fetchNews(
                          (perPageCount === "all" ? items.length : perPageCount || 0) + n
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
                    onClick={() => fetchNews("all")}
                    disabled={loading}
                    className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                  >
                    Load all
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {visible.length > 0 ? (
                  visible.map((n) => (
                    <div key={n.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start gap-4">
                        <img
                          src={ n.image ? (n.image.includes("http") ? n.image : `/${n.image}`) : "https://placehold.co/600x400?text=No+Image"}
                          alt={n.title_en}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold text-gray-800">{n.title_en}</h3>
                              {[n.sub_title_en, n.category].filter(Boolean).length > 0 && (
                                <p className="text-sm text-gray-600 break-words">{[n.sub_title_en, n.category].filter(Boolean).join(" · ")}</p>
                              )}
                              <div className="mt-2 text-xs">
                                {n.approval ? (
                                  <span className="px-2 py-1 rounded bg-green-100 text-green-700">Approved</span>
                                ) : (
                                  <span className="px-2 py-1 rounded bg-yellow-100 text-yellow-700">Pending</span>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-2 justify-center">
                              <button onClick={() => handleView(n)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button onClick={() => handleEdit(n)} className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Edit">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button onClick={() => handleDelete(n)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-500 py-8">No news found</div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <RecentActivities activities={activities} subjectType="news" onViewMore={() => router.visit(window.route('admin.activity.index', { subject: 'news' }))} />
        </div>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={selected ? "Edit News" : "Add News"}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput label="Title (EN)" name="title_en" value={formData.title_en || ""} onChange={handleInputChange} error={errors.title_en} required />
              
              <FormInput label="Sub Title (EN)" name="sub_title_en" value={formData.sub_title_en || ""} onChange={handleInputChange} />
              <FormInput label="Sub Title (AM)" name="sub_title_am" value={formData.sub_title_am || ""} onChange={handleInputChange} />
              <FormInput label="Category" name="category" value={formData.category || ""} onChange={handleInputChange} error={errors.category} required />
              <FormInput label="Title (AM)" name="title_am" value={formData.title_am || ""} onChange={handleInputChange} error={errors.title_am} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput label="Excerpt (EN)" name="excerpt_en" value={formData.excerpt_en || ""} onChange={handleInputChange} />
              <FormInput label="Excerpt (AM)" name="excerpt_am" value={formData.excerpt_am || ""} onChange={handleInputChange} />
            </div>
            {/* descriptions removed to align with DB schema */}
            <div className="grid grid-cols-1 gap-4">
              <label className="block text-sm font-medium text-gray-700">Content (EN)</label>
              <textarea name="content_en" value={formData.content_en || ""} onChange={handleInputChange} rows={4} className="w-full border border-gray-300 rounded-lg p-2"></textarea>
              <label className="block text-sm font-medium text-gray-700">Content (AM)</label>
              <textarea name="content_am" value={formData.content_am || ""} onChange={handleInputChange} rows={4} className="w-full border border-gray-300 rounded-lg p-2"></textarea>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full px-4 py-6 border-2 border-dashed rounded-lg text-center cursor-pointer hover:bg-gray-50"
                >
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="mx-auto h-20 w-20 object-cover rounded" />
                  ) : typeof formData.image === "string" && formData.image ? (
                    <img src={`/${formData.image}`} alt="Current" className="mx-auto h-20 w-20 object-cover rounded" />
                  ) : (
                    <div className="text-gray-500">Click to upload image</div>
                  )}
                </div>
                <input ref={fileInputRef} type="file" name="image" accept="image/*" onChange={handleInputChange} className="hidden" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">PDF File</label>
                <input ref={pdfInputRef} type="file" name="pdf_file" accept="application/pdf" onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-2" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 mt-2">
                <input id="approval" type="checkbox" name="approval" checked={!!formData.approval} onChange={handleInputChange} className="w-4 h-4" />
                <label htmlFor="approval" className="text-sm text-gray-700">Approved</label>
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border rounded">Cancel</button>
              <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded">{selected ? "Update" : "Create"}</button>
            </div>
          </form>
        </Modal>

        <Modal isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)} title="News Details">
          {selected && (
            <div className="space-y-3">
              <div className="flex items-start gap-4">
                <img src={selected.image ? `/${selected.image}` : "https://via.placeholder.com/120x120?text=No+Img"} alt={selected.title_en} className="w-24 h-24 rounded object-cover" />
                <div>
                  <h3 className="text-lg font-semibold">{selected.title_en}</h3>
                  {[selected.sub_title_en, selected.category].filter(Boolean).length > 0 && (
                    <p className="text-sm text-gray-600">{[selected.sub_title_en, selected.category].filter(Boolean).join(" · ")}</p>
                  )}
                  <div className="mt-2 text-xs">
                    {selected.approval ? (
                      <span className="px-2 py-1 rounded bg-green-100 text-green-700">Approved</span>
                    ) : (
                      <span className="px-2 py-1 rounded bg-yellow-100 text-yellow-700">Pending</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Excerpt (EN)</p>
                  <p className="text-gray-800 whitespace-pre-wrap">{selected.excerpt_en || '—'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Excerpt (AM)</p>
                  <p className="text-gray-800 whitespace-pre-wrap">{selected.excerpt_am || '—'}</p>
                </div>
              </div>
              {/* descriptions removed in details view */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Content (EN)</p>
                  <p className="text-gray-800 whitespace-pre-wrap">{selected.content_en || '—'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Content (AM)</p>
                  <p className="text-gray-800 whitespace-pre-wrap">{selected.content_am || '—'}</p>
                </div>
              </div>
              {selected.pdf_file && (
                <div>
                  <a href={`/${selected.pdf_file}`} target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline">View attached PDF</a>
                </div>
              )}
            </div>
          )}
        </Modal>

        <DeleteConfirmation
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={confirmDelete}
          title="Delete News"
          message={`Are you sure you want to delete "${selected?.title_en || "this news"}"? This action cannot be undone.`}
        />

        {toast && (
          <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminNews;

