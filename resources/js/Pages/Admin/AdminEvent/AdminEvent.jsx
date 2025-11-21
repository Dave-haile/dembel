import { useEffect, useRef, useState } from "react";
import { Plus, Edit, Trash2, Eye, Search } from "lucide-react";
import Toast from "../components/Toast";
import DeleteConfirmation from "../components/DeleteConfirmation";
import FormInput from "../components/FormInput";
import RecentActivities from "../components/RecentActivities";
import Modal from "../components/Modal";
import AdminLayout from "../Shared/AdminLayout";
import { usePage, Head, router } from "@inertiajs/react";

const AdminEvent = () => {
  const { events: initialEvents, activities, counts, flash } = usePage().props;
  const [items, setItems] = useState(initialEvents || []);
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

  useEffect(() => {
    setItems(Array.isArray(initialEvents) ? initialEvents : (initialEvents?.data || []));
  }, [initialEvents]);

  useEffect(() => {
    if (flash?.success) setToast({ message: flash.success, type: "success" });
    else if (flash?.error) setToast({ message: flash.error, type: "error" });
  }, [flash]);

  useEffect(() => () => { if (imagePreview) URL.revokeObjectURL(imagePreview); }, [imagePreview]);

  const itemsPerPage = perPageCount === "all" ? items?.length || 0 : perPageCount;

  const filtered = (items || []).filter((e) => {
    const t = searchTerm.toLowerCase();
    return (
      (e.title_en || "").toLowerCase().includes(t) ||
      (e.sub_title_en || "").toLowerCase().includes(t) ||
      (e.title_am || "").toLowerCase().includes(t)
    );
  });
  const visible = filtered.slice(0, itemsPerPage || filtered.length);

  const fetchEvents = async (size) => {
    try {
      setLoading(true);
      setPerPageCount(size);
      const url = window.route("admin.events.list", {
        per_page: size === "all" ? "all" : String(size),
      });
      const res = await fetch(url, { headers: { Accept: "application/json" } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const list = Array.isArray(data) ? data : data.data || data;
      setItems(list);
    } catch (e) {
      console.error("Failed to load events:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents(10);
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title_en?.trim()) newErrors.title_en = "Title (EN) is required";
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
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleCreate = () => {
    setFormData({
      title_en: "",
      title_am: "",
      sub_title_en: "",
      sub_title_am: "",
      description_en: "",
      description_am: "",
      event_date: "",
      image: "",
      approval: false,
    });
    setSelected(null);
    setErrors({});
    setImagePreview(null);
    setIsModalOpen(true);
  };

  const handleEdit = (item) => {
    setFormData({ ...item, approval: !!item.approval, image: item.image || "" });
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
    fd.append("title_en", formData.title_en ?? "");
    if (formData.title_am) fd.append("title_am", formData.title_am);
    if (formData.sub_title_en) fd.append("sub_title_en", formData.sub_title_en);
    if (formData.sub_title_am) fd.append("sub_title_am", formData.sub_title_am);
    if (formData.description_en) fd.append("description_en", formData.description_en);
    if (formData.description_am) fd.append("description_am", formData.description_am);
    if (formData.event_date) fd.append("event_date", formData.event_date);
    fd.append("approval", formData.approval ? "1" : "0");
    if (formData.image instanceof File) fd.append("image", formData.image);

    if (selected) {
      fd.append("_method", "put");
      router.post(window.route("admin.events.update", selected.id), fd, {
        forceFormData: true,
        onError: (errs) => {
          setErrors(errs || {});
          setToast({ message: errs?.message || "Failed to update event", type: "error" });
          setToast({ message: Object.values(errs)[0], type: 'error' });
        },
        onSuccess: () => {
          setIsModalOpen(false);
          setSelected(null);
          setImagePreview(null);
          router.reload({ only: ["events", "counts"] });
        },
      });
    } else {
      router.post(window.route("admin.events.store"), fd, {
        forceFormData: true,
        onError: (errs) => {
          setErrors(errs || {});
          setToast({ message: errs?.message || "Failed to create event", type: "error" });
          setToast({ message: Object.values(errs)[0], type: 'error' });
        },
        onSuccess: () => {
          setIsModalOpen(false);
          setSelected(null);
          setImagePreview(null);
          router.reload({ only: ["events", "counts"] });
        },
      });
    }
  };

  const confirmDelete = () => {
    if (!selected) return;
    router.post(
      window.route("admin.events.destroy", selected.id),
      { _method: "delete" },
      {
        onSuccess: () => {
          setIsDeleteModalOpen(false);
          setSelected(null);
          router.reload({ only: ["events", "counts"] });
        },
      }
    );
  };

  const computedCounts = {
    total: counts?.total ?? items.length,
    approved: counts?.approved ?? items.filter((e) => !!e.approval).length,
    pending: counts?.pending ?? items.filter((e) => !e.approval).length,
  };

  return (
    <AdminLayout>
      <Head title="Admin Events" />
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Events Management</h1>
            <p className="text-gray-600 mt-1">Manage events</p>
          </div>
          <button
            onClick={handleCreate}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Event
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
                    placeholder="Search events..."
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
                        fetchEvents(
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
                    onClick={() => fetchEvents("all")}
                    disabled={loading}
                    className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                  >
                    Load all
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {visible.length > 0 ? (
                  visible.map((ev) => (
                    <div key={ev.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start gap-4">
                        <img
                          src={ev.image ? (ev.image.includes("http") ? ev.image : `/${ev.image}`) : "https://placehold.co/600x400?text=No+Image"}
                          alt={ev.title_en}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold text-gray-800">{ev.title_en}</h3>
                              {[ev.sub_title_en, ev.event_date]?.filter(Boolean).length > 0 && (
                                <p className="text-sm text-gray-600 break-words">{[ev.sub_title_en, ev.event_date]?.filter(Boolean).join(" · ")}</p>
                              )}
                              <div className="mt-2 text-xs">
                                {ev.approval ? (
                                  <span className="px-2 py-1 rounded bg-green-100 text-green-700">Approved</span>
                                ) : (
                                  <span className="px-2 py-1 rounded bg-yellow-100 text-yellow-700">Pending</span>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-2 justify-center">
                              <button onClick={() => handleView(ev)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button onClick={() => handleEdit(ev)} className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Edit">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button onClick={() => handleDelete(ev)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-500 py-8">No events found</div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <RecentActivities activities={activities} subjectType="event" onViewMore={() => router.visit(window.route('admin.activity.index', { subject: 'event' }))} />
        </div>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={selected ? "Edit Event" : "Add Event"}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput label="Title (EN)" name="title_en" value={formData.title_en || ""} onChange={handleInputChange} error={errors.title_en} required />
              <FormInput label="Title (AM)" name="title_am" value={formData.title_am || ""} onChange={handleInputChange} />
              <FormInput label="Sub Title (EN)" name="sub_title_en" value={formData.sub_title_en || ""} onChange={handleInputChange} />
              <FormInput label="Sub Title (AM)" name="sub_title_am" value={formData.sub_title_am || ""} onChange={handleInputChange} />
              <FormInput label="Event Date" name="event_date" type="date" value={formData.event_date || ""} onChange={handleInputChange} />
            </div>
            <div className="grid grid-cols-1 gap-4">
              <label className="block text-sm font-medium text-gray-700">Description (EN)</label>
              <textarea name="description_en" value={formData.description_en || ""} onChange={handleInputChange} rows={4} className="w-full border border-gray-300 rounded-lg p-2"></textarea>
              <label className="block text-sm font-medium text-gray-700">Description (AM)</label>
              <textarea name="description_am" value={formData.description_am || ""} onChange={handleInputChange} rows={4} className="w-full border border-gray-300 rounded-lg p-2"></textarea>
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

        <Modal isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)} title="Event Details">
          {selected && (
            <div className="space-y-3">
              <div className="flex items-start gap-4">
                <img src={selected.image ? `/${selected.image}` : "https://via.placeholder.com/120x120?text=No+Img"} alt={selected.title_en} className="w-24 h-24 rounded object-cover" />
                <div>
                  <h3 className="text-lg font-semibold">{selected.title_en}</h3>
                  {[selected.sub_title_en, selected.event_date].filter(Boolean).length > 0 && (
                    <p className="text-sm text-gray-600">{[selected.sub_title_en, selected.event_date].filter(Boolean).join(" · ")}</p>
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
                  <p className="text-sm text-gray-500">Description (EN)</p>
                  <p className="text-gray-800 whitespace-pre-wrap">{selected.description_en || '—'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Description (AM)</p>
                  <p className="text-gray-800 whitespace-pre-wrap">{selected.description_am || '—'}</p>
                </div>
              </div>
            </div>
          )}
        </Modal>

        <DeleteConfirmation
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={confirmDelete}
          title="Delete Event"
          message={`Are you sure you want to delete "${selected?.title_en || "this event"}"? This action cannot be undone.`}
        />

        {toast && (
          <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminEvent;

