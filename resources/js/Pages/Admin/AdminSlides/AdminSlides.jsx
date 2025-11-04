import { useEffect, useRef, useState } from "react";
import { Plus, Edit, Trash2, Eye, Search, Grid3X3, List } from "lucide-react";
import Toast from "../components/Toast";
import DeleteConfirmation from "../components/DeleteConfirmation";
import FormInput from "../components/FormInput";
import RecentActivities from "../components/RecentActivities";
import Modal from "../components/Modal";
import AdminLayout from "../Shared/AdminLayout";
import { usePage, Head, router } from "@inertiajs/react";

const AdminSlides = () => {
    const { slides: initialSlides, activities, counts, flash } = usePage().props;
    const [slides, setSlides] = useState(initialSlides || []);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedSlide, setSelectedSlide] = useState(null);
    const [toast, setToast] = useState(null);
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [perPageCount, setPerPageCount] = useState(10);
    const [imagePreview, setImagePreview] = useState(null);
    const [viewMode, setViewMode] = useState('list');
    const fileInputRef = useRef(null);

    useEffect(() => {
        setSlides(Array.isArray(initialSlides) ? initialSlides : (initialSlides?.data || []));
    }, [initialSlides]);

    useEffect(() => {
        if (flash?.success) setToast({ message: flash.success, type: "success" });
        else if (flash?.error) setToast({ message: flash.error, type: "error" });
    }, [flash]);

    const itemsPerPage = perPageCount === "all" ? slides?.length || 0 : perPageCount;

    const filteredSlides = slides.filter((s) => {
        const t = searchTerm.toLowerCase();
        return (
            (s.title_en || "").toLowerCase().includes(t) ||
            (s.title_am || "").toLowerCase().includes(t) ||
            String(s.priority ?? "").toLowerCase().includes(t)
        );
    });

    const visibleSlides = filteredSlides.slice(0, itemsPerPage || filteredSlides.length);

    const fetchSlides = async (size) => {
        try {
            setLoading(true);
            setPerPageCount(size);
            const url = window.route("admin.slides.list", { per_page: size === "all" ? "all" : String(size) });
            const res = await fetch(url, { headers: { Accept: "application/json" } });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = await res.json();
            const list = Array.isArray(data) ? data : data.data || data;
            setSlides(list);
        } catch (e) {
            console.error("Failed to load slides:", e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchSlides(10); }, []);

    const validateForm = () => {
        const newErrors = {};
        if (!formData.title_en?.trim()) newErrors.title_en = "Title (EN) is required";
        if (formData.priority !== undefined && formData.priority !== null) {
            const p = Number(formData.priority);
            if (Number.isNaN(p)) newErrors.priority = "Priority must be a number";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        if (type === "checkbox") setFormData((prev) => ({ ...prev, [name]: checked }));
        else if (type === "file") {
            const file = files?.[0];
            if (file) {
                const MAX_SIZE = 5 * 1024 * 1024;
                if (!file.type.startsWith("image/")) { setErrors((p) => ({ ...p, [name]: "Please select a valid image file." })); setToast({ message: "Invalid file type. Please select an image.", type: "error" }); return; }
                if (file.size > MAX_SIZE) { setErrors((p) => ({ ...p, [name]: "Image must be 5MB or smaller." })); setToast({ message: "Image is too large (max 5MB).", type: "error" }); return; }
                setFormData((prev) => ({ ...prev, [name]: file }));
                const url = URL.createObjectURL(file);
                setImagePreview(url);
            } else {
                setFormData((prev) => ({ ...prev, [name]: null }));
            }
        } else setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    useEffect(() => () => { if (imagePreview) URL.revokeObjectURL(imagePreview); }, [imagePreview]);

    const handleCreate = () => {
        setFormData({ title_en: "", title_am: "", priority: 0, approval: true, image: "" });
        setSelectedSlide(null);
        setErrors({});
        setImagePreview(null);
        setIsModalOpen(true);
    };

    const handleEdit = (slide) => {
        setFormData({ ...slide });
        setSelectedSlide(slide);
        setErrors({});
        setImagePreview(null);
        setIsModalOpen(true);
    };

    const handleView = (slide) => { setSelectedSlide(slide); setIsViewModalOpen(true); };
    const handleDelete = (slide) => { setSelectedSlide(slide); setIsDeleteModalOpen(true); };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) { setToast({ message: "Please fix the errors in the form", type: "error" }); return; }
        const fd = new FormData();
        fd.append("title_en", formData.title_en ?? "");
        if (formData.title_am) fd.append("title_am", formData.title_am);
        if (formData.priority !== undefined && formData.priority !== null) fd.append("priority", String(formData.priority));
        fd.append("approval", formData.approval ? "1" : "0");
        if (formData.image instanceof File) fd.append("image", formData.image);
        if (selectedSlide) {
            fd.append("_method", "put");
            router.post(window.route("admin.slides.update", selectedSlide.id), fd, {
                forceFormData: true,
                onError: (errs) => { setErrors(errs || {}); setToast({ message: errs?.message || "Failed to update slide", type: "error" }); },
                onSuccess: () => { setIsModalOpen(false); setSelectedSlide(null); setImagePreview(null); },
            });
        } else {
            router.post(window.route("admin.slides.store"), fd, {
                forceFormData: true,
                onError: (errs) => { setErrors(errs || {}); setToast({ message: errs?.message || "Failed to create slide", type: "error" }); },
                onSuccess: () => { setIsModalOpen(false); setSelectedSlide(null); setImagePreview(null); },
            });
        }
    };

    const confirmDelete = () => {
        if (!selectedSlide) return;
        router.post(window.route("admin.slides.destroy", selectedSlide.id), { _method: "delete" }, {
            onSuccess: () => { setIsDeleteModalOpen(false); setSelectedSlide(null); },
        });
    };

    const computedCounts = {
        total: counts?.total ?? slides.length,
        approved: counts?.approved ?? slides.filter((s) => s.approval == 1).length,
        pending: counts?.pending ?? slides.filter((s) => !s.approval).length,
    };

    return (
        <AdminLayout>
            <Head title="Admin Slides" />
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Slides Management</h1>
                        <p className="text-gray-600 mt-1">Manage homepage slides</p>
                    </div>
                    <button onClick={handleCreate} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors">
                        <Plus className="w-4 h-4" />
                        Add New Slide
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                        <p className="text-sm text-gray-600 mb-1">Total Slides</p>
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

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <div
                        className="grid items-center gap-4"
                        style={{ gridTemplateColumns: "auto 1fr auto" }}
                    >
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={() => setViewMode("grid")}
                                className={`px-3 py-2 border rounded-lg flex items-center gap-2 ${viewMode === "grid"
                                    ? "bg-gray-800 text-white border-gray-800"
                                    : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300"
                                    }`}
                            >
                                <Grid3X3 className="w-4 h-4" /> Grid
                            </button>
                            <button
                                type="button"
                                onClick={() => setViewMode("list")}
                                className={`px-3 py-2 border rounded-lg flex items-center gap-2 ${viewMode === "list"
                                    ? "bg-gray-800 text-white border-gray-800"
                                    : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300"
                                    }`}
                            >
                                <List className="w-4 h-4" /> List
                            </button>
                        </div>

                        <div className="relative w-full">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search slides..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        <div className="flex items-center gap-2 justify-end">
                            <span className="text-sm text-gray-600">Add more:</span>
                            {[5, 10, 20].map((n) => (
                                <button
                                    key={n}
                                    type="button"
                                    onClick={() =>
                                        fetchSlides(
                                            (perPageCount === "all" ? slides.length : perPageCount || 0) + n
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
                                onClick={() => fetchSlides("all")}
                                disabled={loading}
                                className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                            >
                                Load all
                            </button>
                        </div>
                    </div>
                </div>


                {viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {visibleSlides.length > 0 ? (
                            visibleSlides.map((s) => (
                                <div key={s.id} className="relative group overflow-hidden rounded-xl bg-gray-100 aspect-video">
                                    <img src={s.image ? `/${s.image}` : "https://placehold.co/600x400?text=No+Image"} alt={s.title_en} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="absolute bottom-0 left-0 right-0 p-4">
                                            <h4 className="text-white font-semibold">{s.title_en}</h4>
                                            <p className="text-white/80 text-sm">{s.title_am || '—'}</p>
                                            <div className="mt-2 text-xs flex items-center gap-2 flex-wrap">
                                                <span className="px-2 py-1 rounded bg-indigo-100/90 text-indigo-800">Priority: {s.priority ?? 0}</span>
                                                <span className={`px-2 py-1 rounded ${s.approval ? 'bg-green-100/90 text-green-800' : 'bg-yellow-100/90 text-yellow-800'}`}>{s.approval ? 'Approved' : 'Pending'}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button onClick={() => handleView(s)} className="p-2 bg-white/80 hover:bg-white text-blue-600 rounded-lg transition-colors" title="View"><Eye className="w-4 h-4" /></button>
                                        <button onClick={() => handleEdit(s)} className="p-2 bg-white/80 hover:bg-white text-green-600 rounded-lg transition-colors" title="Edit"><Edit className="w-4 h-4" /></button>
                                        <button onClick={() => handleDelete(s)} className="p-2 bg-white/80 hover:bg-white text-red-600 rounded-lg transition-colors" title="Delete"><Trash2 className="w-4 h-4" /></button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center text-gray-500 py-8 col-span-full">No slides found</div>
                        )}
                    </div>
                ) : (
                    <div className="space-y-4">
                        {visibleSlides.length > 0 ? (
                            visibleSlides.map((s) => (
                                <div key={s.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                    <div className="flex items-start gap-4">
                                        <img src={s.image ? `/${s.image}` : "https://placehold.co/600x400?text=No+Image"} alt={s.title_en} className="w-28 h-16 rounded object-cover" />
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="flex-1">
                                                    <h3 className="text-lg font-semibold text-gray-800">{s.title_en}</h3>
                                                    <p className="text-sm text-gray-600 break-words">{s.title_am}</p>
                                                    <div className="mt-2 text-xs flex items-center gap-2 flex-wrap">
                                                        <span className="px-2 py-1 rounded bg-indigo-100 text-indigo-700">Priority: {s.priority ?? 0}</span>
                                                        <span className={`px-2 py-1 rounded ${s.approval ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{s.approval ? 'Approved' : 'Pending'}</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2 justify-center">
                                                    <button onClick={() => handleView(s)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View"><Eye className="w-4 h-4" /></button>
                                                    <button onClick={() => handleEdit(s)} className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Edit"><Edit className="w-4 h-4" /></button>
                                                    <button onClick={() => handleDelete(s)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete"><Trash2 className="w-4 h-4" /></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center text-gray-500 py-8">No slides found</div>
                        )}
                    </div>
                )}

                <div className="mt-6">
                    <RecentActivities activities={activities} subjectType="slider" onViewMore={() => router.visit(window.route('admin.activity.index', { subject: 'slider' }))} />
                </div>

                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={selectedSlide ? "Edit Slide" : "Add Slide"}>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormInput label="Title (EN)" name="title_en" value={formData.title_en || ""} onChange={handleInputChange} error={errors.title_en} required />
                            <FormInput label="Title (AM)" name="title_am" value={formData.title_am || ""} onChange={handleInputChange} />
                            <FormInput label="Priority" name="priority" type="number" value={formData.priority ?? 0} onChange={handleInputChange} error={errors.priority} />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                                <div onClick={() => fileInputRef.current?.click()} className="w-full px-4 py-6 border-2 border-dashed rounded-lg text-center cursor-pointer hover:bg-gray-50">
                                    {imagePreview ? (
                                        <img src={imagePreview} alt="Slide preview" className="mx-auto h-24 w-full object-cover rounded" />
                                    ) : typeof formData.image === "string" && formData.image ? (
                                        <img src={`/${formData.image}`} alt="Current slide" className="mx-auto h-24 w-full object-cover rounded" />
                                    ) : (
                                        <div className="text-gray-500">Click to upload image</div>
                                    )}
                                </div>
                                <input ref={fileInputRef} type="file" name="image" accept="image/*" onChange={handleInputChange} className="hidden" />
                            </div>
                            <div className="flex items-center gap-3 mt-6">
                                <input id="approval" type="checkbox" name="approval" checked={!!formData.approval} onChange={handleInputChange} className="w-4 h-4" />
                                <label htmlFor="approval" className="text-sm text-gray-700">Approved</label>
                            </div>
                        </div>
                        <div className="flex justify-end gap-3 pt-2">
                            <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border rounded">Cancel</button>
                            <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded">{selectedSlide ? "Update" : "Create"}</button>
                        </div>
                    </form>
                </Modal>

                <Modal isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)} title="Slide Details">
                    {selectedSlide && (
                        <div className="space-y-3">
                            <div className="flex items-start gap-4">
                                <img src={selectedSlide.image ? `/${selectedSlide.image}` : "https://placehold.co/600x400?text=No+Image"} alt={selectedSlide.title_en} className="w-full h-40 object-cover rounded" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-500">Title (EN)</p>
                                    <p className="text-gray-800 font-medium">{selectedSlide.title_en}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Title (AM)</p>
                                    <p className="text-gray-800 font-medium">{selectedSlide.title_am || '—'}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Priority</p>
                                    <p className="text-gray-800 font-medium">{selectedSlide.priority ?? 0}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Approved</p>
                                    <p className="text-gray-800 font-medium">{selectedSlide.approval ? 'Yes' : 'No'}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </Modal>

                <DeleteConfirmation isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onConfirm={confirmDelete} title="Delete Slide" message={`Are you sure you want to delete "${selectedSlide?.title_en || 'this slide'}"? This action cannot be undone.`} />

                {toast && (<Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />)}
            </div>
        </AdminLayout>
    );
};

export default AdminSlides;