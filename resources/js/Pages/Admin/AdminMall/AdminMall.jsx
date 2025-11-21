import { useEffect, useState } from "react";
import { Plus, Edit, Trash2, Eye, Search } from "lucide-react";
import Toast from "../components/Toast";
import DeleteConfirmation from "../components/DeleteConfirmation";
import FormInput from "../components/FormInput";
import RecentActivities from "../components/RecentActivities";
import Modal from "../components/Modal";
import AdminLayout from "../Shared/AdminLayout";
import { usePage, Head, router } from "@inertiajs/react";

const AdminMall = () => {
    const { malls: initialMalls, activities, counts, flash } = usePage().props;
    const [malls, setMalls] = useState(initialMalls || []);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedMall, setSelectedMall] = useState(null);
    const [toast, setToast] = useState(null);
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [perPageCount, setPerPageCount] = useState(10);
    const [facilities, setFacilities] = useState([]);
    const [facilityInput, setFacilityInput] = useState("");
    const [galleryFiles, setGalleryFiles] = useState([]);
    const [floors, setFloors] = useState([]); // [{floor: string, highlights: [string]}]

    // Facilities handlers
    const addFacility = () => {
        const v = (facilityInput || "").trim();
        if (!v) return;
        setFacilities((prev) => [...prev, v]);
        setFacilityInput("");
    };
    const removeFacility = (idx) => {
        setFacilities((prev) => prev.filter((_, i) => i !== idx));
    };

    // Gallery handlers (files)
    const onGalleryFilesChange = (e) => {
        const files = Array.from(e.target.files || []);
        setGalleryFiles(files);
    };
    const removeGalleryFile = (idx) => {
        setGalleryFiles((prev) => prev.filter((_, i) => i !== idx));
    };

    // Floors handlers
    const addFloor = () => {
        setFloors((prev) => [...prev, { floor: "", highlights: [], _tmp: "" }]);
    };
    const removeFloor = (idx) => {
        setFloors((prev) => prev.filter((_, i) => i !== idx));
    };
    const updateFloorName = (idx, value) => {
        setFloors((prev) => prev.map((f, i) => (i === idx ? { ...f, floor: value } : f)));
    };
    const updateFloorTemp = (idx, value) => {
        setFloors((prev) => prev.map((f, i) => (i === idx ? { ...f, _tmp: value } : f)));
    };
    const addFloorHighlight = (idx) => {
        setFloors((prev) => prev.map((f, i) => {
            if (i !== idx) return f;
            const v = (f._tmp || "").trim();
            if (!v) return f;
            return { ...f, highlights: [...(f.highlights || []), v], _tmp: "" };
        }));
    };
    const removeFloorHighlight = (idx, hIdx) => {
        setFloors((prev) => prev.map((f, i) => (i === idx ? { ...f, highlights: (f.highlights || []).filter((_, j) => j !== hIdx) } : f)));
    };

    useEffect(() => {
        setMalls(Array.isArray(initialMalls) ? initialMalls : (initialMalls?.data || []));
    }, [initialMalls]);

    // Helpers to safely handle JSON-like fields that may come as arrays or JSON strings
    const parseJsonArray = (val) => {
        if (Array.isArray(val)) return val;
        if (typeof val === "string" && val.trim() !== "") {
            try {
                const parsed = JSON.parse(val);
                return Array.isArray(parsed) ? parsed : [];
            } catch (_) {
                console.log(_);
                return [];
            }
        }
        return [];
    };
    const parseFloorsDirectory = (val) => {
        const arr = parseJsonArray(val);
        return arr.filter((x) => x && (x.floor || x.title || x.name));
    };

    useEffect(() => {
        if (flash?.success) setToast({ message: flash.success, type: "success" });
        else if (flash?.error) setToast({ message: flash.error, type: "error" });
    }, [flash]);

    const itemsPerPage = perPageCount === "all" ? malls?.length || 0 : perPageCount;

    const filtered = (malls || []).filter((m) => {
        const t = searchTerm.toLowerCase();
        return (
            (m.name || "").toLowerCase().includes(t) ||
            String(m.year_built || "").toLowerCase().includes(t) ||
            (m.address || "").toLowerCase().includes(t) ||
            (m.contact_phone || "").toLowerCase().includes(t) ||
            (m.contact_email || "").toLowerCase().includes(t)
        );
    });
    const visible = filtered.slice(0, itemsPerPage || filtered.length);

    const fetchMalls = async (size) => {
        try {
            setLoading(true);
            setPerPageCount(size);
            const url = window.route("admin.malls.list", {
                per_page: size === "all" ? "all" : String(size),
            });
            const res = await fetch(url, { headers: { Accept: "application/json" } });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = await res.json();
            const list = Array.isArray(data) ? data : data.data || data;
            setMalls(list);
        } catch (e) {
            console.error("Failed to load malls:", e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMalls(10);
    }, []);

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name?.trim()) newErrors.name = "Name is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        let v = value;
        if (["year_built", "total_area_sqm", "total_shops"].includes(name)) {
            v = value === "" ? "" : Number(value);
        }
        setFormData((prev) => ({ ...prev, [name]: v }));
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const handleCreate = () => {
        setFormData({
            name: "",
            slug: "",
            year_built: "",
            total_area_sqm: "",
            total_shops: "",
            description: "",
            virtual_tour_url: "",
            address: "",
            contact_phone: "",
            contact_email: "",
        });
        setFacilities([]);
        setGalleryFiles([]);
        setFloors([]);
        setFacilityInput("");
        setSelectedMall(null);
        setErrors({});
        setIsModalOpen(true);
    };

    const handleEdit = (mall) => {
        setFormData({
            ...mall,
            year_built: mall.year_built ?? "",
            total_area_sqm: mall.total_area_sqm ?? "",
            total_shops: mall.total_shops ?? "",
        });
        setFacilities(parseJsonArray(mall.facilities));
        setGalleryFiles([]);
        setFloors(parseFloorsDirectory(mall.floors_directory).map((f) => ({ ...f, _tmp: "" })));
        setFacilityInput("");
        setSelectedMall(mall);
        setErrors({});
        setIsModalOpen(true);
    };

    const handleView = (mall) => {
        setSelectedMall(mall);
        setIsViewModalOpen(true);
    };

    const handleDelete = (mall) => {
        setSelectedMall(mall);
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
        if (formData.slug) fd.append("slug", formData.slug);
        if (formData.year_built !== undefined && formData.year_built !== "") fd.append("year_built", String(formData.year_built));
        if (formData.total_area_sqm !== undefined && formData.total_area_sqm !== "") fd.append("total_area_sqm", String(formData.total_area_sqm));
        if (formData.total_shops !== undefined && formData.total_shops !== "") fd.append("total_shops", String(formData.total_shops));
        if (formData.description) fd.append("description", formData.description);
        if (formData.virtual_tour_url) fd.append("virtual_tour_url", formData.virtual_tour_url);
        if (formData.address) fd.append("address", formData.address);
        if (formData.contact_phone) fd.append("contact_phone", formData.contact_phone);
        if (formData.contact_email) fd.append("contact_email", formData.contact_email);
        if (facilities && facilities.length) fd.append("facilities", JSON.stringify(facilities));
        const floorsSanitized = (floors || []).map(({ floor, highlights }) => ({ floor, highlights: highlights || [] }));
        if (floorsSanitized && floorsSanitized.length) fd.append("floors_directory", JSON.stringify(floorsSanitized));
        if (galleryFiles && galleryFiles.length) {
            galleryFiles.forEach((file) => fd.append("gallery[]", file));
        }

        if (selectedMall) {
            fd.append("_method", "put");
            router.post(window.route("admin.malls.update", selectedMall.id), fd, {
                forceFormData: true,
                onError: (errs) => {
                    setErrors(errs || {});
                    setToast({ message: errs?.message || "Failed to update mall", type: "error" });
                    setToast({ message: Object.values(errs)[0], type: 'error' });
                },
                onSuccess: () => {
                    setIsModalOpen(false);
                    setSelectedMall(null);
                    router.reload({ only: ["malls", "counts"] });
                },
            });
        } else {
            router.post(window.route("admin.malls.store"), fd, {
                forceFormData: true,
                onError: (errs) => {
                    setErrors(errs || {});
                    setToast({ message: errs?.message || "Failed to create mall", type: "error" });
                    setToast({ message: Object.values(errs)[0], type: 'error' });
                },
                onSuccess: () => {
                    setIsModalOpen(false);
                    setSelectedMall(null);
                    router.reload({ only: ["malls", "counts"] });
                },
            });
        }
    };

    const confirmDelete = () => {
        if (!selectedMall) return;
        router.post(
            window.route("admin.malls.destroy", selectedMall.id),
            { _method: "delete" },
            {
                onSuccess: () => {
                    setIsDeleteModalOpen(false);
                    setSelectedMall(null);
                    router.reload({ only: ["malls", "counts"] });
                },
            }
        );
    };

    const computedCounts = {
        total: counts?.total ?? malls.length,
        with_email: counts?.with_email ?? malls.filter((m) => !!m.contact_email).length,
        with_phone: counts?.with_phone ?? malls.filter((m) => !!m.contact_phone).length,
    };

    return (
        <AdminLayout>
            <Head title="Admin Malls" />
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Malls Management</h1>
                        <p className="text-gray-600 mt-1">Manage mall information</p>
                    </div>
                    <button
                        onClick={handleCreate}
                        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        Add New Mall
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                        <p className="text-sm text-gray-600 mb-1">Total Malls</p>
                        <p className="text-3xl font-bold text-gray-800">{computedCounts.total}</p>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                        <p className="text-sm text-gray-600 mb-1">With Email</p>
                        <p className="text-3xl font-bold text-blue-600">{computedCounts.with_email}</p>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                        <p className="text-sm text-gray-600 mb-1">With Phone</p>
                        <p className="text-3xl font-bold text-green-600">{computedCounts.with_phone}</p>
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
                                        placeholder="Search malls..."
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
                                                fetchMalls(
                                                    (perPageCount === "all" ? malls.length : perPageCount || 0) + n
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
                                        onClick={() => fetchMalls("all")}
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
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-start justify-between gap-4">
                                                        <div className="flex-1">
                                                            <h3 className="text-lg font-semibold text-gray-800">{m.name}</h3>
                                                            <div className="mt-1 text-sm text-gray-600 flex flex-wrap gap-3">
                                                                {m.year_built && <span>Built: {m.year_built}</span>}
                                                                {m.total_shops && <span>Shops: {m.total_shops}</span>}
                                                                {m.total_area_sqm && <span>Area: {m.total_area_sqm} m²</span>}
                                                                {m.floors && <span>Floors: {m.floors}</span>}
                                                            </div>
                                                            <div className="mt-1 text-sm text-gray-600">
                                                                <div>{m.address || "—"}</div>
                                                                <div className="flex gap-4">
                                                                    <span>{m.contact_phone || "—"}</span>
                                                                    <span className="text-gray-500">{m.contact_email || "—"}</span>
                                                                </div>
                                                                {/* sample of floors directory */}
                                                                {parseFloorsDirectory(m.floors_directory).length > 0 && (
                                                                    <div className="mt-2 flex flex-wrap gap-2">
                                                                        {parseFloorsDirectory(m.floors_directory)
                                                                            .slice(0, 2)
                                                                            .map((f, idx) => (
                                                                                <span
                                                                                    key={idx}
                                                                                    className="inline-flex items-center px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700"
                                                                                >
                                                                                    {f.floor}
                                                                                </span>
                                                                            ))}
                                                                        {parseFloorsDirectory(m.floors_directory).length > 2 && (
                                                                            <span className="text-xs text-gray-500">+{parseFloorsDirectory(m.floors_directory).length - 2} more</span>
                                                                        )}
                                                                    </div>
                                                                )}
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
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center text-gray-500 py-8">No malls found</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6">
                    <RecentActivities activities={activities} subjectType="mall" onViewMore={() => router.visit(window.route('admin.activity.index', { subject: 'mall' }))} />
                </div>

                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={selectedMall ? "Edit Mall" : "Add Mall"}>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormInput label="Name" name="name" value={formData.name || ""} onChange={handleInputChange} error={errors.name} required />
                            <FormInput label="Slug" name="slug" value={formData.slug || ""} onChange={handleInputChange} placeholder="Auto if blank" />
                            <FormInput label="Year Built" name="year_built" type="number" value={formData.year_built || ""} onChange={handleInputChange} />
                            <FormInput label="Total Area (m²)" name="total_area_sqm" type="number" value={formData.total_area_sqm || ""} onChange={handleInputChange} />
                            <FormInput label="Total Shops" name="total_shops" type="number" value={formData.total_shops || ""} onChange={handleInputChange} />
                            <FormInput label="Contact Phone" name="contact_phone" value={formData.contact_phone || ""} onChange={handleInputChange} />
                            <FormInput label="Contact Email" name="contact_email" type="email" value={formData.contact_email || ""} onChange={handleInputChange} />
                            <FormInput label="Address" name="address" value={formData.address || ""} onChange={handleInputChange} />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Facilities</label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={facilityInput}
                                        onChange={(e) => setFacilityInput(e.target.value)}
                                        placeholder="Add a facility (e.g. Parking)"
                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                    <button type="button" onClick={addFacility} className="px-3 py-2 bg-gray-100 rounded-lg border">Add</button>
                                </div>
                                {facilities.length > 0 && (
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {facilities.map((fac, idx) => (
                                            <span key={idx} className="inline-flex items-center gap-2 px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700">
                                                {fac}
                                                <button type="button" onClick={() => removeFacility(idx)} className="text-red-500">×</button>
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Gallery Images</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={onGalleryFilesChange}
                                    className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 border border-gray-300 rounded-lg"
                                />
                                {galleryFiles.length > 0 && (
                                    <div className="mt-2 grid grid-cols-2 gap-2">
                                        {galleryFiles.map((file, idx) => (
                                            <div key={idx} className="flex items-center gap-2 border rounded p-2">
                                                <div className="text-xs flex-1 truncate">{file.name}</div>
                                                <button type="button" onClick={() => removeGalleryFile(idx)} className="text-red-600 text-xs border px-2 py-1 rounded">Remove</button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Floors Directory</label>
                                <div className="space-y-3">
                                    {floors.map((f, idx) => (
                                        <div key={idx} className="border rounded-lg p-3">
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="text"
                                                    value={f.floor}
                                                    onChange={(e) => updateFloorName(idx, e.target.value)}
                                                    placeholder="Floor name (e.g. Ground Floor, 1st Floor)"
                                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                />
                                                <button type="button" onClick={() => removeFloor(idx)} className="text-red-600 border px-3 py-2 rounded-lg">Remove Floor</button>
                                            </div>
                                            <div className="mt-2">
                                                <div className="flex gap-2">
                                                    <input
                                                        type="text"
                                                        value={f._tmp}
                                                        onChange={(e) => updateFloorTemp(idx, e.target.value)}
                                                        placeholder="Add a highlight (e.g. Food Court)"
                                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                    />
                                                    <button type="button" onClick={() => addFloorHighlight(idx)} className="px-3 py-2 bg-gray-100 rounded-lg border">Add</button>
                                                </div>
                                                {Array.isArray(f.highlights) && f.highlights.length > 0 && (
                                                    <div className="mt-2 flex flex-wrap gap-2">
                                                        {f.highlights.map((h, hIdx) => (
                                                            <span key={hIdx} className="inline-flex items-center gap-2 px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700">
                                                                {h}
                                                                <button type="button" onClick={() => removeFloorHighlight(idx, hIdx)} className="text-red-500">×</button>
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                    <button type="button" onClick={addFloor} className="px-3 py-2 bg-gray-100 rounded-lg border">Add Floor</button>
                                </div>
                            </div>

                            <div>
                                <FormInput label="Virtual Tour URL" name="virtual_tour_url" value={formData.virtual_tour_url || ""} onChange={handleInputChange} />
                            </div>
                        </div>
                        <div className="grid grid-cols-1">
                            <FormInput label="Description" name="description" type="textarea" value={formData.description || ""} onChange={handleInputChange} />
                        </div>
                        <div className="flex justify-end gap-3 pt-2">
                            <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border rounded">Cancel</button>
                            <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded">{selectedMall ? "Update" : "Create"}</button>
                        </div>
                    </form>
                </Modal>

                <Modal isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)} title="Mall Details">
                    {selectedMall && (
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-lg font-semibold">{selectedMall.name}</h3>
                                <p className="text-sm text-gray-600">{selectedMall.address || "—"}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div><span className="text-gray-500">Year Built</span><div className="font-medium">{selectedMall.year_built || "—"}</div></div>
                                <div><span className="text-gray-500">Floors</span><div className="font-medium">{selectedMall.floors || parseFloorsDirectory(selectedMall.floors_directory).length || "—"}</div></div>
                                <div><span className="text-gray-500">Total Shops</span><div className="font-medium">{selectedMall.total_shops || "—"}</div></div>
                                <div><span className="text-gray-500">Area</span><div className="font-medium">{selectedMall.total_area_sqm ? `${selectedMall.total_area_sqm} m²` : "—"}</div></div>
                                <div><span className="text-gray-500">Phone</span><div className="font-medium">{selectedMall.contact_phone || "—"}</div></div>
                                <div><span className="text-gray-500">Email</span><div className="font-medium">{selectedMall.contact_email || "—"}</div></div>
                                <div className="col-span-2"><span className="text-gray-500">Virtual Tour</span><div className="font-medium break-all">{selectedMall.virtual_tour_url ? (<a className="text-indigo-600 hover:underline" href={selectedMall.virtual_tour_url} target="_blank" rel="noreferrer">{selectedMall.virtual_tour_url}</a>) : "—"}</div></div>
                            </div>

                            {selectedMall.description && (
                                <div>
                                    <h4 className="text-sm font-semibold text-gray-700 mb-1">Description</h4>
                                    <p className="text-gray-700 whitespace-pre-wrap text-sm">{selectedMall.description}</p>
                                </div>
                            )}

                            {parseFloorsDirectory(selectedMall.floors_directory).length > 0 && (
                                <div>
                                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Floors Directory</h4>
                                    <div className="space-y-2">
                                        {parseFloorsDirectory(selectedMall.floors_directory).map((f, idx) => (
                                            <div key={idx} className="border border-gray-200 rounded p-3">
                                                <div className="text-sm font-medium text-gray-800">{f.floor}</div>
                                                {Array.isArray(f.highlights) && f.highlights.length > 0 && (
                                                    <ul className="list-disc list-inside text-sm text-gray-600 mt-1">
                                                        {f.highlights.map((h, i) => (
                                                            <li key={i}>{h}</li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {parseJsonArray(selectedMall.facilities).length > 0 && (
                                <div>
                                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Facilities</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {parseJsonArray(selectedMall.facilities).map((fac, idx) => (
                                            <span key={idx} className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700">{fac}</span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {parseJsonArray(selectedMall.gallery).length > 0 && (
                                <div>
                                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Gallery</h4>
                                    <div className="grid grid-cols-2 gap-2">
                                        {parseJsonArray(selectedMall.gallery).map((src, idx) => (
                                            <a key={idx} href={src} target="_blank" rel="noreferrer" className="block group border rounded overflow-hidden">
                                                <img src={`/${src}`} alt="Mall" className="w-full h-24 object-cover group-hover:opacity-90" />
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </Modal>

                <DeleteConfirmation
                    isOpen={isDeleteModalOpen}
                    onClose={() => setIsDeleteModalOpen(false)}
                    onConfirm={confirmDelete}
                    title="Delete Mall"
                    message={`Are you sure you want to delete "${selectedMall?.name || "this mall"}"? This action cannot be undone.`}
                />

                {toast && (
                    <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
                )}
            </div>
        </AdminLayout>
    );
};

export default AdminMall;

