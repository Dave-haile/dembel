import { useEffect, useRef, useState } from "react";
import { Plus, Edit, Trash2, Eye, Search } from "lucide-react";
import Toast from "../components/Toast";
import DeleteConfirmation from "../components/DeleteConfirmation";
import FormInput from "../components/FormInput";
import RecentActivities from "../components/RecentActivities";
import Modal from "../components/Modal";
import AdminLayout from "../Shared/AdminLayout";
import { usePage, Head, router } from "@inertiajs/react";

// Component-specific form configurations
const COMPONENT_CONFIGS = {
    AboutHero: {
        name: "Hero Section",
        description: "Main banner with slideshow",
        extraDataFields: [
            {
                key: "slides",
                label: "Slideshow Images",
                type: "array",
                fields: [
                    {
                        key: "image",
                        label: "Slide Image",
                        type: "file",
                        required: true,
                        accept: "image/*"
                    }
                ]
            }
        ]
    },
    MallStory: {
        name: "Mall Story Timeline",
        description: "Timeline of mall history",
        extraDataFields: [
            {
                key: "timeline",
                label: "Timeline Items",
                type: "array",
                fields: [
                    { key: "year", label: "Year", type: "text", required: true },
                    { key: "title", label: "Title", type: "text", required: true },
                    { key: "desc", label: "Description", type: "textarea", required: true }
                ]
            }
        ]
    },
    MissionValues: {
        name: "Mission & Values",
        description: "Company values with icons",
        extraDataFields: [
            {
                key: "values",
                label: "Values",
                type: "array",
                fields: [
                    { key: "icon", label: "Icon Name", type: "text", required: true },
                    { key: "title", label: "Title", type: "text", required: true },
                    { key: "desc", label: "Description", type: "textarea", required: true },
                    { key: "color", label: "Color Gradient", type: "text" }
                ]
            }
        ]
    },
    Facilities: {
        name: "Facilities",
        description: "Mall facilities and amenities",
        extraDataFields: [
            {
                key: "facilities",
                label: "Facilities",
                type: "array",
                fields: [
                    { key: "icon", label: "Icon Name", type: "text", required: true },
                    { key: "title", label: "Title", type: "text", required: true },
                    { key: "desc", label: "Description", type: "textarea", required: true },
                    {
                        key: "image",
                        label: "Facility Image",
                        type: "file",
                        accept: "image/*"
                    }
                ]
            }
        ]
    },
    Stats: {
        name: "Statistics",
        description: "Achievement statistics",
        extraDataFields: [
            {
                key: "stats",
                label: "Statistics",
                type: "array",
                fields: [
                    { key: "icon", label: "Icon Name", type: "text", required: true },
                    { key: "value", label: "Value", type: "number", required: true },
                    { key: "suffix", label: "Suffix", type: "text" },
                    { key: "label", label: "Label", type: "text", required: true },
                    { key: "desc", label: "Description", type: "textarea" }
                ]
            }
        ]
    },
    Team: {
        name: "Team Members",
        description: "Leadership team",
        extraDataFields: [
            {
                key: "team",
                label: "Team Members",
                type: "array",
                fields: [
                    { key: "name", label: "Full Name", type: "text", required: true },
                    { key: "role", label: "Role/Position", type: "text", required: true },
                    {
                        key: "image",
                        label: "Profile Photo",
                        type: "file",
                        accept: "image/*"
                    },
                    { key: "bio", label: "Bio", type: "textarea" },
                    { key: "linkedin", label: "LinkedIn URL", type: "text" },
                    { key: "email", label: "Email", type: "text" }
                ]
            }
        ]
    },
    Location: {
        name: "Location Info",
        description: "Contact and location details",
        extraDataFields: [
            {
                key: "info",
                label: "Information Items",
                type: "array",
                fields: [
                    { key: "icon", label: "Icon Name", type: "text", required: true },
                    { key: "title", label: "Title", type: "text", required: true },
                    { key: "content", label: "Content", type: "textarea", required: true },
                    { key: "subContent", label: "Sub Content", type: "text" }
                ]
            }
        ]
    },
    MissionVisionValues: {
        name: "Mission Vision Values",
        description: "Company mission, vision and values",
        extraDataFields: [
            {
                key: "sections",
                label: "Sections",
                type: "array",
                fields: [
                    { key: "title", label: "Section Title", type: "text", required: true },
                    { key: "content", label: "Content", type: "textarea", required: true }
                ]
            }
        ]
    },
    ManagementTeam: {
        name: "Management Team",
        description: "Management team members",
        extraDataFields: [
            {
                key: "management",
                label: "Management Team",
                type: "array",
                fields: [
                    { key: "name", label: "Full Name", type: "text", required: true },
                    { key: "role", label: "Role/Position", type: "text", required: true },
                    { key: "email", label: "Email", type: "text" },
                    { key: "phone", label: "Phone", type: "text" },
                    {
                        key: "image",
                        label: "Profile Photo",
                        type: "file",
                        accept: "image/*"
                    }
                ]
            }
        ]
    },
    WhoWeAre: {
        name: "Who We Are",
        description: "Basic information about the company",
        extraDataFields: [] // No extra data needed
    },
    OrganizationalStructure: {
        name: "Organizational Structure",
        description: "Company organizational chart",
        extraDataFields: [] // No extra data needed
    }
};

const AdminAboutContent = () => {
    const { aboutContents: initialContents, activities, counts, flash } = usePage().props;
    const [items, setItems] = useState(initialContents || []);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selected, setSelected] = useState(null);
    const [toast, setToast] = useState(null);

    const [formData, setFormData] = useState({
        id: null,
        component: "",
        title: "",
        subtitle: "",
        description: "",
        position: "",
        image: null,
        image_url: "",
        extra_data: []
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [perPageCount, setPerPageCount] = useState(10);
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);

    // Extra data state management
    const [extraData, setExtraData] = useState([]);
    const [extraDataPreviews, setExtraDataPreviews] = useState({});

    useEffect(() => {
        setItems(Array.isArray(initialContents) ? initialContents : (initialContents?.data || []));
    }, [initialContents]);

    useEffect(() => {
        if (flash?.success) setToast({ message: flash.success, type: "success" });
        else if (flash?.error) setToast({ message: flash.error, type: "error" });
    }, [flash]);

    useEffect(() => {
        return () => {
            if (imagePreview) URL.revokeObjectURL(imagePreview);
            // Clean up extra data preview URLs
            Object.values(extraDataPreviews).forEach(url => {
                if (url && url.startsWith('blob:')) {
                    URL.revokeObjectURL(url);
                }
            });
        };
    }, [imagePreview, extraDataPreviews]);

    // Reset extra data when component changes
    useEffect(() => {
        if (formData.component && COMPONENT_CONFIGS[formData.component]) {
            // Don't reset extraData if we're editing existing data
            if (!formData.id) {
                setExtraData([]);
                setExtraDataPreviews({});
            }
        }
    }, [formData.component, formData.id]);

    const itemsPerPage = perPageCount === "all" ? items?.length || 0 : perPageCount;

    const filtered = (items || []).filter((item) => {
        const t = searchTerm.toLowerCase();
        return (
            (item.component || "").toLowerCase().includes(t) ||
            (item.title || "").toLowerCase().includes(t) ||
            (item.subtitle || "").toLowerCase().includes(t) ||
            (item.position || "").toString().includes(t) ||
            (item.description || "").toLowerCase().includes(t)
        );
    });

    const visible = filtered.slice(0, itemsPerPage || filtered.length);

    const handleInputChange = (e) => {
        const { name, value, type, files } = e.target;

        if (type === 'file') {
            const file = files[0];
            if (file) {
                if (imagePreview) URL.revokeObjectURL(imagePreview);
                setImagePreview(URL.createObjectURL(file));
                setFormData(prev => ({
                    ...prev,
                    [name]: file
                }));
            }
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    // Extra Data Management
    const addExtraDataItem = () => {
        const config = COMPONENT_CONFIGS[formData.component];
        if (!config || !config.extraDataFields.length) return;

        const newItem = {};
        config.extraDataFields[0].fields.forEach(field => {
            newItem[field.key] = field.type === 'file' ? null : '';
        });

        setExtraData(prev => [...prev, { id: Date.now().toString(), ...newItem }]);
    };

    const removeExtraDataItem = (itemId) => {
        setExtraData(prev => prev.filter(item => item.id !== itemId));
        // Clean up preview URL
        if (extraDataPreviews[itemId]) {
            URL.revokeObjectURL(extraDataPreviews[itemId]);
            setExtraDataPreviews(prev => {
                const newPreviews = { ...prev };
                delete newPreviews[itemId];
                return newPreviews;
            });
        }
    };

    const updateExtraDataItem = (itemId, fieldKey, value, file = null) => {
        setExtraData(prev => prev.map(item =>
            item.id === itemId ? { ...item, [fieldKey]: file || value } : item
        ));

        // Handle file preview
        if (file) {
            // Clean up old preview
            if (extraDataPreviews[`${itemId}_${fieldKey}`]) {
                URL.revokeObjectURL(extraDataPreviews[`${itemId}_${fieldKey}`]);
            }

            // Create new preview
            const previewUrl = URL.createObjectURL(file);
            setExtraDataPreviews(prev => ({
                ...prev,
                [`${itemId}_${fieldKey}`]: previewUrl
            }));
        }
    };

    // Parse existing extra_data and create previews for existing images
    const parseExistingExtraData = (extraData) => {
        if (!extraData) return [];

        try {
            const parsed = typeof extraData === 'string' ? JSON.parse(extraData) : extraData;
            if (Array.isArray(parsed)) {
                return parsed.map((item, index) => ({
                    id: `existing_${index}_${Date.now()}`,
                    ...item
                }));
            }
        } catch (e) {
            console.error('Error parsing extra data:', e);
        }

        return [];
    };

    const buildFormDataForSubmit = () => {
        const formDataToSend = new FormData();

        // Basic text fields
        Object.keys(formData).forEach(key => {
        if (key !== "extra_data") {
            if (formData[key] !== undefined && formData[key] !== null) {
                formDataToSend.append(key, formData[key]);
            }
        }
        });
        const cleanedExtraData = extraData.map(item => {
        const config = COMPONENT_CONFIGS[formData.component];
        const cleanItem = {};
        
        if (config && config.extraDataFields.length > 0) {
            // Get all possible fields from the component config
            const allFields = config.extraDataFields[0].fields;
            
            allFields.forEach(field => {
                const fieldKey = field.key;
                // Preserve the value if it exists, otherwise set to null
                if (item[fieldKey] !== undefined) {
                    // For file fields, if it's a string (existing file path), preserve it
                    // If it's a File object, we'll handle it separately in the file upload section
                    cleanItem[fieldKey] = field.type === 'file' && typeof item[fieldKey] === 'string' 
                        ? item[fieldKey] 
                        : item[fieldKey];
                } else {
                    cleanItem[fieldKey] = null;
                }
            });
        }
        
        return cleanItem;
    });

        formDataToSend.append("extra_data", JSON.stringify(cleanedExtraData));

        // Add file uploads
        extraData.forEach((item, idx) => {
        Object.keys(item).forEach(field => {
            if (item[field] instanceof File) {
                formDataToSend.append(
                    `extra_data_files[${idx}][${field}]`,
                    item[field]
                );
            }
        });
    });

    return formDataToSend;
    };

    const resetForm = () => {
        setFormData({
            id: null,
            component: "",
            title: "",
            subtitle: "",
            description: "",
            image_url: "",
            position: "",
            extra_data: []
        });
        setExtraData([]);
        setExtraDataPreviews({});
        setImagePreview(null);
        setErrors({});
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const openCreateModal = () => {
        setSelected(null);
        resetForm();
        setIsModalOpen(true);
    };

    const openEditModal = (item) => {
        const extraDataItems = parseExistingExtraData(item.extra_data);

        setFormData({
            id: item.id,
            component: item.component || "",
            title: item.title || "",
            subtitle: item.subtitle || "",
            description: item.description || "",
            image_url: item.image_url || "",
            position: item.position || "",
            extra_data: []
        });

        setExtraData(extraDataItems);
        setIsModalOpen(true);
    };

    const openViewModal = (item) => {
        setSelected({
            ...item,
            parsed_extra_data: item.extra_data
                ? (typeof item.extra_data === 'string' ? JSON.parse(item.extra_data) : item.extra_data)
                : null
        });
        setIsViewModalOpen(true);
    };

    const renderContentPreview = (item) => {
        if (!item.extra_data) return 'No data';
        try {
            const extraData = typeof item.extra_data === 'string'
                ? JSON.parse(item.extra_data)
                : item.extra_data;

            if (Array.isArray(extraData)) {
                return `${extraData.length} items`;
            } else if (typeof extraData === 'object' && extraData !== null) {
                return Object.keys(extraData).length > 0
                    ? `${Object.keys(extraData).length} properties`
                    : 'Empty object';
            }
            return String(extraData).substring(0, 50) + '...';
        } catch (e) {
            console.log(e);
            return 'Invalid JSON data';
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        const formDataToSend = buildFormDataForSubmit();

        const url = formData.id
            ? `/admin/about-contents/${formData.id}`
            : '/admin/about-contents';


        if (formData.id) {
            formDataToSend.append('_method', 'PUT');
        }
        console.log(formDataToSend);

        router.post(url, formDataToSend, {
            forceFormData: true,
            onSuccess: () => {
                setLoading(false);
                setIsModalOpen(false);
                resetForm();
            },
            onError: (errors) => {
                setErrors(errors);
                setLoading(false);
            },
            preserveScroll: true
        });
    };

    const handleDeleteClick = (item) => {
        setSelected(item);
        setIsDeleteModalOpen(true);
    };

    const handleDelete = () => {
        if (!selected) return;

        router.delete(`/admin/about-contents/${selected.id}`, {
            onSuccess: () => {
                setItems(items.filter(item => item.id !== selected.id));
                setSelected(null);
                setIsDeleteModalOpen(false);
                setToast({ message: 'Content deleted successfully', type: 'success' });
            },
            onError: () => {
                setToast({ message: 'Error deleting content', type: 'error' });
                setIsDeleteModalOpen(false);
            },
            preserveScroll: true
        });
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';

        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    // Render component-specific extra data form
    const renderExtraDataForm = () => {
        const config = COMPONENT_CONFIGS[formData.component];

        if (!config || !config.extraDataFields.length) {
            return (
                <div className="text-center py-4 text-gray-500">
                    <p>No additional data required for this component.</p>
                </div>
            );
        }

        const fieldConfig = config.extraDataFields[0];

        return (
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <div>
                        <h4 className="text-lg font-medium text-gray-900">{fieldConfig.label}</h4>
                        <p className="text-sm text-gray-500">{config.description}</p>
                    </div>
                </div>

                <div className="space-y-4">
                    {extraData.map((item, index) => (
                        <div key={item.id} className="border border-gray-200 rounded-lg p-4 bg-white">
                            <div className="flex justify-between items-center mb-3">
                                <h5 className="font-medium text-gray-900">
                                    {fieldConfig.label.slice(0, -1)} #{index + 1}
                                </h5>
                                <button
                                    type="button"
                                    onClick={() => removeExtraDataItem(item.id)}
                                    className="text-red-600 hover:text-red-800 p-1"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {fieldConfig.fields.map(field => (
                                    <div key={field.key} className={field.type === 'textarea' || field.type === 'file' ? 'md:col-span-2' : ''}>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            {field.label}
                                            {field.required && <span className="text-red-500 ml-1">*</span>}
                                        </label>

                                        {field.type === 'textarea' ? (
                                            <textarea
                                                value={item[field.key] || ''}
                                                onChange={(e) => updateExtraDataItem(item.id, field.key, e.target.value)}
                                                rows={3}
                                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
                                                placeholder={`Enter ${field.label.toLowerCase()}`}
                                            />
                                        ) : field.type === 'file' ? (
                                            <div className="space-y-2">
                                                <input
                                                    type="file"
                                                    accept={field.accept || "image/*"}
                                                    onChange={(e) => {
                                                        const file = e.target.files[0];
                                                        if (file) {
                                                            updateExtraDataItem(item.id, field.key, '', file);
                                                        }
                                                    }}
                                                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                                />
                                                {/* Show existing image or new preview */}
                                                {(() => {
                                                    const previewKey = `${item.id}_${field.key}`;
                                                    const previewUrl = extraDataPreviews[previewKey];
                                                    const value = item[field.key];

                                                    // Determine if `value` is a valid persisted image URL (string starting with http or storage/)
                                                    const isPersistedImageUrl =
                                                        typeof value === 'string' &&
                                                        (value.startsWith('http') || value.startsWith('storage/'));

                                                    // Only show preview if we have a preview (new upload) or a valid persisted URL
                                                    if (!previewUrl && !isPersistedImageUrl) {
                                                        return null;
                                                    }

                                                    // Resolve the actual src to display
                                                    let imgSrc;
                                                    if (previewUrl) {
                                                        imgSrc = previewUrl; // blob URL from new file
                                                    } else if (value.startsWith('storage/')) {
                                                        imgSrc = `/${value}`; // make relative to public folder
                                                    } else {
                                                        imgSrc = value; // full http(s) URL
                                                    }

                                                    return (
                                                        <div className="mt-2">
                                                            <img
                                                                src={imgSrc}
                                                                alt="Preview"
                                                                className="h-32 w-auto object-contain rounded-md border border-gray-200"
                                                                onError={(e) => {
                                                                    e.target.src = '/img/default.jpg';
                                                                }}
                                                            />
                                                            {isPersistedImageUrl && (
                                                                <p className="text-xs text-gray-500 mt-1">
                                                                    Current image: {value.split('/').pop()}
                                                                </p>
                                                            )}
                                                        </div>
                                                    );
                                                })()}
                                            </div>
                                        ) : (
                                            <input
                                                type={field.type}
                                                value={item[field.key] || ''}
                                                onChange={(e) => updateExtraDataItem(item.id, field.key, e.target.value)}
                                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
                                                placeholder={`Enter ${field.label.toLowerCase()}`}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <button
                    type="button"
                    onClick={addExtraDataItem}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    <Plus className="w-4 h-4 mr-1" />
                    Add {fieldConfig.label.slice(0, -1)}
                </button>

                {extraData.length === 0 && (
                    <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                        <p className="text-gray-500">No {fieldConfig.label.toLowerCase()} added yet.</p>
                        <button
                            type="button"
                            onClick={addExtraDataItem}
                            className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
                        >
                            <Plus className="w-4 h-4 mr-1" />
                            Add First {fieldConfig.label.slice(0, -1)}
                        </button>
                    </div>
                )}
            </div>
        );
    };

    return (
        <AdminLayout>
            <Head title="Manage About Content" />

            {/* Toast Notification */}
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}

            <div className="flex flex-col gap-6">
                <div className="">
                    <div className="bg-white rounded-lg shadow mb-6">
                        <div className="p-6">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                                <h2 className="text-2xl font-bold text-gray-800">About Content</h2>
                                <button
                                    onClick={openCreateModal}
                                    className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    <Plus className="w-5 h-5 mr-2" />
                                    Add New Content
                                </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
                                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                                    <p className="text-sm text-gray-600 mb-1">Total Content</p>
                                    <p className="text-3xl font-bold text-gray-800">
                                        {counts?.total}
                                    </p>
                                </div>
                                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                                    <p className="text-sm text-gray-600 mb-1">Component</p>
                                    <p className="text-3xl font-bold text-orange-600">
                                        {counts?.components}
                                    </p>
                                </div>
                                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                                    <p className="text-sm text-gray-600 mb-1">Position</p>
                                    <p className="text-3xl font-bold text-blue-600">
                                        {counts?.positions}
                                    </p>
                                </div>
                            </div>

                            {/* Search and Filter */}
                            <div className="flex flex-col md:flex-row gap-4 mb-6">
                                <div className="relative flex-1">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Search className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Search content..."
                                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                <div className="w-full md:w-48">
                                    <select
                                        className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                                        value={perPageCount}
                                        onChange={(e) => setPerPageCount(e.target.value === 'all' ? 'all' : parseInt(e.target.value))}
                                    >
                                        <option value={5}>5 per page</option>
                                        <option value={10}>10 per page</option>
                                        <option value={25}>25 per page</option>
                                        <option value={50}>50 per page</option>
                                        <option value="all">Show all</option>
                                    </select>
                                </div>
                            </div>

                            {/* Content Table */}
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Position
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Component
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Title
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Content Preview
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Last Updated
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {visible.length > 0 ?
                                            (
                                                visible.map((item) => {
                                                    const extraData = item.extra_data ?
                                                        (typeof item.extra_data === 'string' ?
                                                            (() => {
                                                                try {
                                                                    return JSON.parse(item.extra_data);
                                                                } catch (e) {
                                                                    console.error('Error parsing extra_data:', e);
                                                                    return null;
                                                                }
                                                            })()
                                                            : item.extra_data)
                                                        : null;
                                                    const hasListData = Array.isArray(extraData);
                                                    // eslint-disable-next-line no-unused-vars
                                                    const previewContent = item.description
                                                        ? item.description.substring(0, 50) + (item.description.length > 50 ? '...' : '')
                                                        : hasListData
                                                            ? `${extraData.length} items`
                                                            : 'No content';

                                                    return (
                                                        <tr key={item.id} className="hover:bg-gray-50">
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                {item.position || 'N/A'}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                                {item.component}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                                {item.title || 'Untitled'}
                                                                {item.subtitle && (
                                                                    <p className="text-xs text-gray-500 mt-1">{item.subtitle}</p>
                                                                )}
                                                            </td>
                                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                                <div className="line-clamp-2">
                                                                    {renderContentPreview(item)}
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                {formatDate(item.updated_at)}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                                <div className="flex items-center gap-2 justify-center">
                                                                    <button
                                                                        onClick={() => openViewModal(item)}
                                                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                                        title="View"
                                                                    >
                                                                        <Eye className="w-4 h-4" />
                                                                    </button>
                                                                    <button
                                                                        onClick={() => openEditModal(item)}
                                                                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                                                        title="Edit"
                                                                    >
                                                                        <Edit className="w-4 h-4" />
                                                                    </button>
                                                                    <button
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            handleDeleteClick(item);
                                                                        }}
                                                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                                        title="Delete"
                                                                    >
                                                                        <Trash2 className="w-4 h-4" />
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    );
                                                })
                                            ) : (
                                                <tr>
                                                    <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                                                        No content found. {searchTerm ? 'Try a different search term.' : 'Create your first content item.'}
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            {perPageCount !== 'all' && filtered.length > perPageCount && (
                                <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200">
                                    <div className="text-sm text-gray-700">
                                        Showing <span className="font-medium">1</span> to{' '}
                                        <span className="font-medium">{Math.min(perPageCount, filtered.length)}</span> of{' '}
                                        <span className="font-medium">{filtered.length}</span> results
                                    </div>
                                    <div className="flex space-x-2">
                                        <button
                                            disabled={true}
                                            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Previous
                                        </button>
                                        <button
                                            disabled={filtered.length <= perPageCount}
                                            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Recent Activities Sidebar */}
                <div>
                    <RecentActivities activities={activities} />
                </div>
            </div>

            {/* Create/Edit Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    resetForm();
                }}
                title={`${formData.id ? 'Edit' : 'Create'} About Content`}
                maxWidth="4xl"
            >
                <form onSubmit={handleSubmit}>
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="md:col-span-1">
                                <FormInput
                                    label="Component Type"
                                    name="component"
                                    type="text"
                                    value={formData.component}
                                    onChange={handleInputChange}
                                    error={errors.component}
                                    required
                                >
                                </FormInput>
                            </div>
                            <div className="md:col-span-1">
                                <FormInput
                                    label="Position"
                                    name="position"
                                    type="number"
                                    value={formData.position}
                                    onChange={handleInputChange}
                                    error={errors.position}
                                    min="1"
                                />
                            </div>
                            <div className="md:col-span-1">
                                <FormInput
                                    label="Image URL"
                                    name="image_url"
                                    type="text"
                                    value={formData.image_url || ''}
                                    onChange={handleInputChange}
                                    error={errors.image_url}
                                    placeholder="https://example.com/image.jpg"
                                />
                            </div>
                        </div>

                        {formData.component && COMPONENT_CONFIGS[formData.component] && (
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <p className="text-sm text-blue-800">
                                    <strong>{COMPONENT_CONFIGS[formData.component].name}:</strong>{' '}
                                    {COMPONENT_CONFIGS[formData.component].description}
                                </p>
                            </div>
                        )}

                        <FormInput
                            label="Title"
                            name="title"
                            type="text"
                            value={formData.title}
                            onChange={handleInputChange}
                            error={errors.title}
                            required
                        />

                        <FormInput
                            label="Subtitle"
                            name="subtitle"
                            type="text"
                            value={formData.subtitle}
                            onChange={handleInputChange}
                            error={errors.subtitle}
                        />

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Description
                            </label>
                            <textarea
                                name="description"
                                rows={4}
                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                                value={formData.description}
                                onChange={handleInputChange}
                                placeholder="Enter description content here..."
                            />
                            {errors.description && (
                                <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                            )}
                            <p className="text-xs text-gray-500">
                                {formData.description ? formData.description.length : 0} characters
                            </p>
                        </div>

                        {/* Image Upload Section */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Image
                            </label>
                            <div className="flex items-center space-x-4">
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        name="image_url"
                                        value={formData.image_url || ''}
                                        onChange={handleInputChange}
                                        placeholder="Or enter image URL"
                                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
                                    />
                                </div>
                                <span className="text-sm text-gray-500">or</span>
                                <div className="flex-1">
                                    <input
                                        type="file"
                                        name="image"
                                        ref={fileInputRef}
                                        onChange={handleInputChange}
                                        accept="image/*"
                                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                    />
                                </div>
                            </div>
                            {(imagePreview || formData.image_url) && (
                                <div className="mt-2">
                                    <img
                                        src={imagePreview || formData.image_url}
                                        alt="Preview"
                                        className="h-32 w-auto object-contain rounded-md border border-gray-200"
                                        onError={(e) => {
                                            e.target.src = '/img/default.jpg';
                                        }}
                                    />
                                </div>
                            )}
                            {errors.image && (
                                <p className="mt-1 text-sm text-red-600">{errors.image}</p>
                            )}
                        </div>

                        {/* Component-specific Extra Data */}
                        {formData.component && COMPONENT_CONFIGS[formData.component] && (
                            <div className="border-t border-gray-200 pt-6">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Additional Data</h3>
                                {renderExtraDataForm()}
                            </div>
                        )}
                    </div>

                    <div className="mt-6 flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={() => {
                                setIsModalOpen(false);
                                resetForm();
                            }}
                            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                'Saving...'
                            ) : formData.id ? (
                                'Update Content'
                            ) : (
                                'Create Content'
                            )}
                        </button>
                    </div>
                </form>
            </Modal>

            {/* View Modal */}
            <Modal
                isOpen={isViewModalOpen}
                onClose={() => setIsViewModalOpen(false)}
                title="About Content Details"
                maxWidth="2xl"
            >
                {selected && (
                    <div className="space-y-4">
                        <div className="bg-white overflow-hidden">
                            {selected.image_url && (
                                <div className="mb-4">
                                    <img
                                        src={selected.image_url}
                                        alt={selected.title || 'Content Image'}
                                        className="w-full h-64 object-cover rounded-lg"
                                    />
                                </div>
                            )}

                            <div className="px-1">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">{selected.title || 'No Title'}</h3>
                                {selected.subtitle && (
                                    <p className="mt-1 text-sm text-gray-500">{selected.subtitle}</p>
                                )}

                                <div className="mt-4">
                                    <h4 className="text-sm font-medium text-gray-500">Component</h4>
                                    <p className="mt-1 text-sm text-gray-900">{selected.component}</p>
                                </div>

                                <div className="mt-4">
                                    <h4 className="text-sm font-medium text-gray-500">Position</h4>
                                    <p className="mt-1 text-sm text-gray-900">{selected.position || 'N/A'}</p>
                                </div>

                                {selected.description && (
                                    <div className="mt-4">
                                        <h4 className="text-sm font-medium text-gray-500">Description</h4>
                                        <div className="mt-1 text-sm text-gray-900 whitespace-pre-line">
                                            {selected.description}
                                        </div>
                                    </div>
                                )}

                                {/* Display extra data if any */}
                                {selected.extra_data && (
                                    <div className="mt-4">
                                        <h4 className="text-sm font-medium text-gray-500 mb-2">Additional Information</h4>
                                        <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                                            {(() => {
                                                try {
                                                    const data = typeof selected.extra_data === 'string'
                                                        ? JSON.parse(selected.extra_data)
                                                        : selected.extra_data;

                                                    // Handle slides (array of image paths)
                                                    if (data.slides && Array.isArray(data.slides)) {
                                                        return (
                                                            <div className="space-y-3">
                                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                                                    {data.slides.map((img, idx) => (
                                                                        <div key={idx} className="relative group">
                                                                            <img
                                                                                src={img.startsWith('http') ? img : `/${img}`}
                                                                                alt={`Slide ${idx + 1}`}
                                                                                className="w-full h-24 object-cover rounded-lg border border-gray-200"
                                                                                onError={(e) => e.target.src = '/img/default.jpg'}
                                                                            />
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        );
                                                    }

                                                    // Handle array of objects (like timeline, team, etc.)
                                                    if (Array.isArray(data)) {
                                                        return (
                                                            <div className="space-y-3">
                                                                {data.map((item, index) => (
                                                                    <div key={index} className="p-3 bg-white rounded border border-gray-100">
                                                                        {Object.entries(item).map(([key, value]) => (
                                                                            <div key={key} className="mb-1 last:mb-0">
                                                                                <span className="font-medium text-gray-700">
                                                                                    {key.replace(/^\w/, c => c.toUpperCase())}:
                                                                                </span>{' '}
                                                                                <span className="text-gray-600">
                                                                                    {Array.isArray(value) ?
                                                                                        value.join(', ') :
                                                                                        String(value)}
                                                                                </span>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        );
                                                    }

                                                    // Handle object with key-value pairs
                                                    return (
                                                        <div className="space-y-2">
                                                            {Object.entries(data).map(([key, value]) => (
                                                                <div key={key} className="flex flex-col sm:flex-row py-1">
                                                                    <span className="font-medium text-gray-700 w-32 flex-shrink-0">
                                                                        {key.replace(/^\w/, c => c.toUpperCase())}:
                                                                    </span>
                                                                    <div className="text-gray-600 break-words flex-1">
                                                                        {Array.isArray(value) ?
                                                                            value.join(', ') :
                                                                            String(value)}
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    );

                                                } catch (e) {
                                                    // If JSON parsing fails, show raw content with error
                                                    console.log(e);
                                                    return (
                                                        <div className="text-sm text-red-600">
                                                            <p>Error parsing JSON data:</p>
                                                            <pre className="mt-1 p-2 bg-red-50 rounded text-xs overflow-auto">
                                                                {selected.extra_data}
                                                            </pre>
                                                        </div>
                                                    );
                                                }
                                            })()}
                                        </div>
                                    </div>
                                )}

                                <div className="mt-4 pt-4 border-t border-gray-200">
                                    <div className="text-sm text-gray-500">
                                        Last updated on {formatDate(selected.updated_at)}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-5 sm:mt-6">
                            <button
                                type="button"
                                className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
                                onClick={() => {
                                    setIsViewModalOpen(false);
                                    openEditModal(selected);
                                }}
                            >
                                Edit Content
                            </button>
                        </div>
                    </div>
                )}
            </Modal>

            {/* Delete Confirmation Modal */}
            <DeleteConfirmation
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDelete}
                title="Delete Content"
                message="Are you sure you want to delete this content? This action cannot be undone."
                confirmText="Delete"
            />
        </AdminLayout>
    );
};

export default AdminAboutContent;