import { useEffect, useRef, useState } from "react";
import { Plus, Edit, Trash2, Eye, Search } from "lucide-react";
import Toast from "../components/Toast";
import DeleteConfirmation from "../components/DeleteConfirmation";
import FormInput from "../components/FormInput";
import RecentActivities from "../components/RecentActivities";
import Modal from "../components/Modal";
import AdminLayout from "../Shared/AdminLayout";
import { usePage, Head, router } from "@inertiajs/react";

const AdminService = () => {
  const { services: initialServices, activities, counts } = usePage().props;
  // console.log(activities);
  const [services, setServices] = useState(initialServices || []);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [toast, setToast] = useState(null);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [perPageCount, setPerPageCount] = useState(10);
  const [logoPreview, setLogoPreview] = useState(null);
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [isModalOpen]);

  useEffect(() => {
    setServices(initialServices || []);
  }, [initialServices]);

  const itemsPerPage = perPageCount === "all" ? services?.length || 0 : perPageCount;

  const filteredServices = services.filter((s) => {
    const t = searchTerm.toLowerCase();
    return (
      (s.title_en || "").toLowerCase().includes(t) ||
      (s.title_am || "").toLowerCase().includes(t) ||
      (s.sub_title_en || "").toLowerCase().includes(t) ||
      (s.sub_title_am || "").toLowerCase().includes(t)
    );
  });

  const visibleServices = filteredServices.slice(0, itemsPerPage || filteredServices.length);

  const fetchServices = async (size) => {
    try {
      setLoading(true);
      setPerPageCount(size);
      const url = window.route("admin.services.list", {
        per_page: size === "all" ? "all" : String(size),
      });
      const res = await fetch(url, { headers: { Accept: "application/json" } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const list = Array.isArray(data) ? data : data.data || data;
      setServices(list);
    } catch (e) {
      console.error("Failed to load services:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices(10);
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title_en?.trim()) newErrors.title_en = "English title is required";
    if (!formData.title_am?.trim()) newErrors.title_am = "Amharic title is required";
    if (!formData.description_en?.trim()) newErrors.description_en = "English description is required";
    if (!formData.description_am?.trim()) newErrors.description_am = "Amharic description is required";
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
        console.log("[AdminService] Selected file:", { name: file.name, type: file.type, size: file.size });
        setFormData((prev) => ({ ...prev, [name]: file }));
        const url = URL.createObjectURL(file);
        setLogoPreview(url);
      } else {
        setFormData((prev) => ({ ...prev, [name]: null }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleLogoFile = (file) => {
    if (!file) return;
    // Frontend validation: only images and max 5MB
    const MAX_SIZE = 5 * 1024 * 1024;
    if (!file.type.startsWith("image/")) {
      setErrors((prev) => ({
        ...prev,
        logo: "Please select a valid image file.",
      }));
      setToast({
        message: "Invalid file type. Please select an image.",
        type: "error",
      });
      return;
    }
    if (file.size > MAX_SIZE) {
      setErrors((prev) => ({ ...prev, logo: "Image must be 5MB or smaller." }));
      setToast({ message: "Image is too large (max 5MB).", type: "error" });
      return;
    }
    setFormData((prev) => ({ ...prev, thumbnail: file }));
    const url = URL.createObjectURL(file);
    setLogoPreview(url);
    console.log("SELECTED LOGO FILE:", file);
  };

  const onLogoInputChange = (e) => {
    const file = e.target.files?.[0];
    handleLogoFile(file);
  };

  const onLogoDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    handleLogoFile(file);
    setIsDragging(false);
  };

  const onLogoDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const onLogoDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };


  useEffect(() => {
    return () => {
      if (logoPreview) URL.revokeObjectURL(logoPreview);
    };
  }, [logoPreview]);

  const handleCreate = () => {
    setFormData({
      title_en: "",
      title_am: "",
      sub_title_en: "",
      sub_title_am: "",
      description_en: "",
      description_am: "",
      image: "",
      approval: true,
    });
    setSelectedService(null);
    setErrors({});
    setIsModalOpen(true);
  };

  const handleEdit = (service) => {
    setFormData(service);
    setSelectedService(service);
    setErrors({});
    setIsModalOpen(true);
  };

  const handleView = (service) => {
    setSelectedService(service);
    setIsViewModalOpen(true);
  };

  const handleDelete = (service) => {
    setSelectedService(service);
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
    fd.append("title_am", formData.title_am ?? "");
    fd.append("sub_title_en", formData.sub_title_en ?? "");
    fd.append("sub_title_am", formData.sub_title_am ?? "");
    fd.append("description_en", formData.description_en ?? "");
    fd.append("description_am", formData.description_am ?? "");
    fd.append("approval", formData.approval ? "1" : "0");
    if (formData.image instanceof File) {
      fd.append("image", formData.image);
    } else if (fileInputRef?.current?.files?.[0] instanceof File) {
      fd.append("image", fileInputRef.current.files[0]);
    }

    // Debug: log FormData entries (including file metadata)
    // console.group("[AdminService] FormData payload");
    // for (const [key, val] of fd.entries()) {
    //   if (val instanceof File) {
    //     console.log(key, { name: val.name, type: val.type, size: val.size });
    //   } else {
    //     console.log(key, val);
    //   }
    // }
    // console.groupEnd();

    if (selectedService) {
      fd.append("_method", "put");
      console.log(fd);
      router.post(window.route("admin.services.update", selectedService.id), fd, {
        forceFormData: true,
        onError: (errs) => {
          setErrors(errs || {});
          setToast({ message: "Failed to update service", type: "error" });
          setToast({ message: Object.values(errs)[0], type: 'error' });
        },
        onSuccess: () => {
          setIsModalOpen(false);
          setSelectedService(null);
          setToast({ message: "Service updated successfully", type: "success" });
          router.reload({ only: ["services", "counts"] });
        },
      });
    } else {
      router.post(window.route("admin.services.store"), fd, {
        forceFormData: true,
        onError: (errs) => {
          setErrors(errs || {});
          setToast({ message: "Failed to create service", type: "error" });
          setToast({ message: Object.values(errs)[0], type: 'error' });
        },
        onSuccess: () => {
          setIsModalOpen(false);
          setSelectedService(null);
          setToast({ message: "Service created successfully", type: "success" });
          router.reload({ only: ["services", "counts"] });
        },
      });
    }
  };

  const confirmDelete = () => {
    if (!selectedService) return;
    router.post(
      window.route("admin.services.destroy", selectedService.id),
      { _method: "delete" },
      {
        onSuccess: () => {
          setIsDeleteModalOpen(false);
          setSelectedService(null);
          setToast({ message: "Service deleted successfully", type: "success" });
          router.reload({ only: ["services", "counts"] });
        },
      }
    );
  };

  return (
    <AdminLayout>
      <Head title="Admin Service" />
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Services Management</h1>
            <p className="text-gray-600 mt-1">Manage mall services</p>
          </div>
          <button
            onClick={handleCreate}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add New Service
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <p className="text-sm text-gray-600 mb-1">Total Services</p>
            <p className="text-3xl font-bold text-gray-800">{counts?.total ?? services.length}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <p className="text-sm text-gray-600 mb-1">Approved</p>
            <p className="text-3xl font-bold text-green-600">{counts?.approved ?? services.filter(s => s.approval).length}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <p className="text-sm text-gray-600 mb-1">Pending</p>
            <p className="text-3xl font-bold text-yellow-600">{counts?.pending ?? services.filter(s => !s.approval).length}</p>
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
                    placeholder="Search services..."
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
                        fetchServices(
                          (perPageCount === "all" ? services.length : perPageCount || 0) + n
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
                    onClick={() => fetchServices("all")}
                    disabled={loading}
                    className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                  >
                    Load all
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {visibleServices.length > 0 ? (
                  visibleServices.map((s) => (
                    <div key={s.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start gap-4">
                        <img
                          src={s.image ? `/${s.image}` : "https://via.placeholder.com/120x80?text=No+Img"}
                          alt={s.title_en}
                          className="w-20 h-20 rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold text-gray-800">{s.title_en}</h3>
                              <p className="text-sm text-gray-600">{s.sub_title_en || ""}</p>
                              <div className="mt-2 text-xs">
                                <span className={`px-2 py-1 rounded ${s.approval ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                                  {s.approval ? "Approved" : "Pending"}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 justify-center">
                              <button
                                onClick={() => handleView(s)}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                title="View"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleEdit(s)}
                                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                title="Edit"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDelete(s)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-500 py-8">No services found</div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <RecentActivities
            activities={activities}
            subjectType="service"
            onViewMore={() => router.visit(window.route('admin.activity.index', { subject: 'service' }))}
          />
        </div>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={selectedService ? "Edit Service" : "Add Service"}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput label="Title (EN)" name="title_en" value={formData.title_en || ""} onChange={handleInputChange} error={errors.title_en} required />
              <FormInput label="Title (AM)" name="title_am" value={formData.title_am || ""} onChange={handleInputChange} error={errors.title_am} required />
              <FormInput label="Subtitle (EN)" name="sub_title_en" value={formData.sub_title_en || ""} onChange={handleInputChange} />
              <FormInput label="Subtitle (AM)" name="sub_title_am" value={formData.sub_title_am || ""} onChange={handleInputChange} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description (EN)</label>
                <textarea name="description_en" value={formData.description_en || ""} onChange={handleInputChange} rows={4} className="w-full p-2 border rounded"></textarea>
                {errors.description_en && <p className="text-sm text-red-600 mt-1">{errors.description_en}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description (AM)</label>
                <textarea name="description_am" value={formData.description_am || ""} onChange={handleInputChange} rows={4} className="w-full p-2 border rounded"></textarea>
                {errors.description_am && <p className="text-sm text-red-600 mt-1">{errors.description_am}</p>}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="flex flex-col justify-center">
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Thumbnail
                    </label>
                    <div
                      onDrop={onLogoDrop}
                      onDragOver={onLogoDragOver}
                      onDragEnter={onLogoDragOver}
                      onDragLeave={onLogoDragLeave}
                      onClick={() => fileInputRef.current?.click()}
                      className={`w-full px-4 py-8 border-2 rounded-lg text-center cursor-pointer transition-colors ${isDragging
                          ? "border-indigo-400 bg-indigo-50 ring-2 ring-indigo-300"
                          : "border-dashed border-gray-300 hover:bg-gray-50"
                        }`}
                    >
                      {logoPreview ? (
                        <img
                          src={logoPreview}
                          alt="Logo preview"
                          className="mx-auto h-20 w-20 object-cover rounded"
                        />
                      ) : typeof formData.thumbnail === "string" &&
                        formData.thumbnail ? (
                        <img
                          src={`/${formData.thumbnail}`}
                          alt="Current thumbnail"
                          className="mx-auto h-20 w-20 object-cover rounded"
                        />
                      ) : (
                        <div className="text-gray-500">
                          Drag & drop image here, or click to select
                        </div>
                      )}
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      name="thumbnail"
                      accept="image/*"
                      onChange={onLogoInputChange}
                      className="hidden"
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 mt-6">
                <input id="approval" type="checkbox" name="approval" checked={!!formData.approval} onChange={handleInputChange} className="w-4 h-4" />
                <label htmlFor="approval" className="text-sm text-gray-700">Approved</label>
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border rounded">Cancel</button>
              <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded">{selectedService ? "Update" : "Create"}</button>
            </div>
          </form>
        </Modal>

        <Modal isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)} title="Service Details">
          {selectedService && (
            <div className="space-y-3">
              <div className="flex items-start gap-4">
                <img src={selectedService.image ? `/${selectedService.image}` : "https://via.placeholder.com/120x80?text=No+Img"} alt={selectedService.title_en} className="w-24 h-24 rounded object-cover" />
                <div>
                  <h3 className="text-lg font-semibold">{selectedService.title_en}</h3>
                  <p className="text-sm text-gray-600">{selectedService.sub_title_en}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-700 whitespace-pre-line">{selectedService.description_en}</p>
              </div>
              <div className="text-xs">
                <span className={`px-2 py-1 rounded ${selectedService.approval ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                  {selectedService.approval ? "Approved" : "Pending"}
                </span>
              </div>
            </div>
          )}
        </Modal>

        <DeleteConfirmation
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={confirmDelete}
          title="Delete Service"
          message={`Are you sure you want to delete "${selectedService?.title_en || "this service"}"? This action cannot be undone.`}
        />

        {toast && (
          <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminService;

