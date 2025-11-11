/* eslint-disable no-undef */
import { useState, useEffect, useRef, useMemo } from 'react';
import { Head, usePage, router } from '@inertiajs/react';
import { Edit, Eye, Plus, Trash2 } from 'lucide-react';
import AdminLayout from '../Shared/AdminLayout';
import Modal from '../components/Modal';
import DeleteConfirmation from '../components/DeleteConfirmation';
import FormInput from '../components/FormInput';
import RecentActivities from '../components/RecentActivities';

const AdminAboutContent = () => {
    const { aboutContents: initialContents = [], counts = {}, activities = [] } = usePage().props;
    const [contents, setContents] = useState(initialContents || []);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterComponent, setFilterComponent] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [viewMode, setViewMode] = useState('grid');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedContent, setSelectedContent] = useState(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        component: '',
        title: '',
        subtitle: '',
        description: '',
        image_url: '',
        position: 0,
        extra_data: {},
    });
    const [errors, setErrors] = useState({});
    const [toast, setToast] = useState(null);
    const itemsPerPage = 9;
    const fileInputRef = useRef(null);
    const [logoPreview, setLogoPreview] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [perPage, setPerPage] = useState(10); // Or whatever default value you prefe
    // Add this to your state variables at the top of the component
    const [selectedColumns, setSelectedColumns] = useState([
        'component',
        'title',
        'position',
        'actions'
    ]);

    const formatDate = (dateString) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Parse extra_data if it's a string
    const parseExtraData = (content) => {
        if (!content?.extra_data) return {};
        try {
            return typeof content.extra_data === 'string'
                ? JSON.parse(content.extra_data)
                : content.extra_data;
        } catch (e) {
            console.error('Error parsing extra_data:', e);
            return {};
        }
    };

    // Format content for display
    const formattedContents = useMemo(() => {
        return (contents || []).map(content => ({
            ...content,
            extra_data: parseExtraData(content)
        }));
    }, [contents]);

    // Filter and paginate contents
    const filteredContents = useMemo(() => {
        const term = searchTerm.toLowerCase();
        return formattedContents.filter(item =>
            (item.title || '').toLowerCase().includes(term) ||
            (item.component || '').toLowerCase().includes(term) ||
            (item.description || '').toLowerCase().includes(term)
        );
    }, [formattedContents, searchTerm]);

    const totalPages = Math.ceil(filteredContents.length / perPage) || 1;
    const pageItems = filteredContents.slice(
        (currentPage - 1) * perPage,
        currentPage * perPage
    );

    useEffect(() => {
        if (currentPage > totalPages) setCurrentPage(1);
    }, [totalPages]);

    // Handle file input
    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type and size
        const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
        const maxSize = 5 * 1024 * 1024; // 5MB

        if (!validTypes.includes(file.type)) {
            setErrors(prev => ({ ...prev, image_url: 'Please upload a valid image (JPEG, PNG, GIF)' }));
            return;
        }

        if (file.size > maxSize) {
            setErrors(prev => ({ ...prev, image_url: 'Image size should be less than 5MB' }));
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            setLogoPreview(reader.result);
            setFormData(prev => ({
                ...prev,
                image_file: file,
                image_url: reader.result
            }));
            setErrors(prev => ({ ...prev, image_url: '' }));
        };
        reader.readAsDataURL(file);
    };


    // Handle view content
    const handleView = (content) => {
        setSelectedContent({
            ...content,
            extra_data: parseExtraData(content)
        });
        setIsViewModalOpen(true);
    };

    // Handle edit content
    const handleEdit = (content) => {
        setSelectedContent(content);
        setFormData({
            component: content.component || '',
            title: content.title || '',
            subtitle: content.subtitle || '',
            description: content.description || '',
            image_url: content.image_url || '',
            position: content.position || 0,
            extra_data: parseExtraData(content)
        });
        setLogoPreview(content.image_url || null);
        setIsModalOpen(true);
    };

    // Handle delete content
    const handleDelete = (content) => {
        setSelectedContent(content);
        setIsDeleteModalOpen(true);
    };
    //     const { name, value } = e.target;
    //     setFormData(prev => ({
    //         ...prev,
    //         [name]: value
    //     }));
    // };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formDataToSend = new FormData();

            // Append all form data to FormData
            Object.entries(formData).forEach(([key, value]) => {
                if (key === 'extra_data') {
                    formDataToSend.append(key, JSON.stringify(value));
                } else if (key === 'image_file' && value) {
                    formDataToSend.append('image', value);
                } else if (value !== null && value !== undefined) {
                    formDataToSend.append(key, value);
                }
            });

            // Add _method for PUT requests
            if (selectedContent) {
                formDataToSend.append('_method', 'PUT');
            }

            // Determine the URL for the request
            const url = selectedContent
                ? route('admin.about-contents.update', selectedContent.id)
                : route('admin.about-contents.store');

            // Submit the form
            await router.post(url, formDataToSend, {
                onSuccess: () => {
                    setToast({
                        message: selectedContent
                            ? 'Content updated successfully'
                            : 'Content created successfully',
                        type: 'success'
                    });
                    setIsModalOpen(false);
                    setFormData({
                        component: '',
                        title: '',
                        subtitle: '',
                        description: '',
                        image_url: '',
                        position: 0,
                        extra_data: {},
                    });
                    setLogoPreview(null);
                    setSelectedContent(null);
                    fetchContents(perPage);
                },
                onError: (errors) => {
                    setErrors(errors);
                    setToast({
                        message: 'Please fix the errors in the form',
                        type: 'error'
                    });
                },
                preserveScroll: true,
                forceFormData: true
            });
        } catch (error) {
            console.error('Error saving about content:', error);
            setToast({
                message: error.response?.data?.message || 'Failed to save about content',
                type: 'error'
            });
        } finally {
            setLoading(false);
        }
    };

    // Fetch contents from the server
    const fetchContents = async (size = perPage) => {
        try {
            const response = await router.get(route('admin.about-contents'), {
                search: searchTerm,
                component: filterComponent,
                per_page: size,
                page: currentPage
            }, {
                preserveState: true,
                only: ['aboutContents']
            });

            if (response?.props?.aboutContents) {
                setContents(response.props.aboutContents);
            }
        } catch (error) {
            console.error('Error fetching about contents:', error);
            setToast({
                message: 'Failed to load about contents',
                type: 'error'
            });
        }
    };

    // Initial data load
    useEffect(() => {
        // Only fetch if we don't have initial data
        if (contents.length === 0) {
            fetchContents(perPage);
        }
    }, []);

    // Handle search and filter changes with debounce
    useEffect(() => {
        const timer = setTimeout(() => {
            fetchContents(perPage);
        }, 500);

        return () => clearTimeout(timer);
    }, [searchTerm, filterComponent, currentPage, perPage]);

    // Available components for filtering
    const componentTypes = [...new Set(contents.map(item => item.component))];

    // Handle page changes
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Handle per page changes
    const handlePerPageChange = (size) => {
        setPerPage(size);
        setCurrentPage(1); // Reset to first page when changing items per page
        fetchContents(size);
        setPerPage(size);
        setCurrentPage(1);
        fetchContents(size);
    };

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    // Handle JSON data input changes
    const handleJsonChange = (field, value) => {
        try {
            const parsedValue = JSON.parse(value);
            setFormData(prev => ({
                ...prev,
                [field]: parsedValue
            }));

            // Clear any existing JSON parse errors
            if (errors[field]) {
                setErrors(prev => {
                    const newErrors = { ...prev };
                    delete newErrors[field];
                    return newErrors;
                });
            }
        } catch (e) {
            console.error('Invalid JSON:', e);
            setErrors(prev => ({
                ...prev,
                [field]: 'Invalid JSON format'
            }));
            setToast({
                message: 'Invalid JSON format',
                type: 'error'
            });
        }
    };

    // Reset form
    const resetForm = () => {
        setFormData({
            component: "",
            title: "",
            subtitle: "",
            description: "",
            image_url: "",
            position: 0,
            extra_data: {},
        });
        setErrors({});
        setSelectedContent(null);
    };

    // Open create modal
    const openCreateModal = () => {
        resetForm();
        setIsModalOpen(true);
    };

    // Open edit modal
    const openEditModal = (content) => {
        setSelectedContent(content);
        setFormData({
            component: content.component || "",
            title: content.title || "",
            subtitle: content.subtitle || "",
            description: content.description || "",
            image_url: content.image_url || "",
            position: content.position || 0,
            extra_data: content.extra_data || {},
        });
        setIsModalOpen(true);
    };

    // Open view modal
    const openViewModal = (content) => {
        setSelectedContent(content);
        setIsViewModalOpen(true);
    };

    // Available components for filtering
    const availableComponents = [
        'AboutHero',
        'AboutIntro',
        'AboutMilestones',
        'AboutTeam',
        'AboutValues',
        'AboutGallery',
        'AboutTestimonials',
        'AboutCTA'
    ];

    // Open delete confirmation
    const openDeleteModal = (content) => {
        setSelectedContent(content);
        setIsDeleteModalOpen(true);
    };

    // Stats for the dashboard


    return (
        <AdminLayout>
            <Head title="Manage About Contents" />
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">
                            About Content Management
                        </h1>
                        <p className="text-gray-600 mt-1">
                            Manage all about page contents and sections
                        </p>
                    </div>
                    <button
                        onClick={openCreateModal}
                        className="flex items-center gap-2 px-4 py-2 bg-[#E83C91] hover:bg-[#E83C91] text-white rounded-lg transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        Add New About Content
                    </button>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    <div className="lg:col-span-2 space-y-6 shadow-2xl rounded-xl min-h-[calc(100vh-16rem)] hover:shadow-none transition-all">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <div className="flex flex-col md:flex-row gap-4 mb-6">
                                <div className="flex-1 relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search content..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    />
                                </div>
                                <select
                                    value={filterComponent}
                                    onChange={(e) => setFilterComponent(e.target.value)}
                                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                >
                                    <option value="">All Components</option>
                                    {availableComponents.map((comp) => (
                                        <option key={comp} value={comp}>
                                            {comp}
                                        </option>
                                    ))}
                                </select>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-600">Show:</span>
                                    {[5, 10, 20].map((n) => (
                                        <button
                                            key={n}
                                            type="button"
                                            onClick={() => setPerPage(n)}
                                            className={`px-3 py-2 border rounded-lg ${perPage === n ? 'bg-orange-100 border-orange-500' : 'border-gray-300 hover:bg-gray-50'}`}
                                        >
                                            {n}
                                        </button>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={() => setPerPage('all')}
                                        className={`px-3 py-2 border rounded-lg ${perPage === 'all' ? 'bg-orange-100 border-orange-500' : 'border-gray-300 hover:bg-gray-50'}`}
                                    >
                                        All
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {loading ? (
                                    <div className="text-center py-8">
                                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-orange-500"></div>
                                        <p className="mt-2 text-gray-600">Loading content...</p>
                                    </div>
                                ) : pageItems.length > 0 ? (
                                    pageItems.map((content) => (
                                        <div
                                            key={content.id}
                                            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                                        >
                                            <div className="flex items-start gap-4">
                                                {content.image_url && (
                                                    <img
                                                        src={content.image_url}
                                                        alt={content.title}
                                                        className="w-20 h-20 rounded-lg object-cover"
                                                    />
                                                )}
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-start justify-between gap-4">
                                                        <div className="flex-1">
                                                            <h3 className="text-lg font-semibold text-gray-800">
                                                                {content.title || 'Untitled Content'}
                                                            </h3>
                                                            <div className="flex flex-wrap items-center gap-2 mt-2">
                                                                <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium">
                                                                    {content.component}
                                                                </span>
                                                                {content.position !== null && (
                                                                    <span className="px-2 py-1 bg-green-50 text-green-700 rounded text-xs font-medium">
                                                                        Position: {content.position}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <button
                                                                onClick={() => openViewModal(content)}
                                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                                title="View"
                                                            >
                                                                <Eye className="w-4 h-4" />
                                                            </button>
                                                            <button
                                                                onClick={() => openEditModal(content)}
                                                                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                                                title="Edit"
                                                            >
                                                                <Edit className="w-4 h-4" />
                                                            </button>
                                                            <button
                                                                onClick={() => openDeleteModal(content)}
                                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                                title="Delete"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </div>

                                                    {content.subtitle && (
                                                        <p className="mt-2 text-sm text-gray-600 font-medium">
                                                            {content.subtitle}
                                                        </p>
                                                    )}

                                                    {content.description && (
                                                        <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                                                            {content.description}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-8 text-gray-500">
                                        No content found
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center justify-between mt-6 pt-4 border-t">
                                <p className="text-sm text-gray-600">
                                    Showing {pageItems.length} of {filteredContents.length} items
                                </p>
                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                                    >
                                        Previous
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage >= totalPages}
                                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 shadow-[9px_9px_15px_5px_#c8bfbf] rounded-xl p-6 hover:shadow-none transition-all">
                        <RecentActivities
                            activities={activities}
                            onViewMore={() => {
                                router.visit(
                                    window.route("admin.activity.index", { subject: "about-content" })
                                );
                            }}
                            subjectType={"about-content"}
                        />
                    </div>
                </div>
            </div>

            {/* Create/Edit Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Create About Content"
            >
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <FormInput
                            label="Component"
                            name="component"
                            type="select"
                            value={formData.component}
                            onChange={handleInputChange}
                            options={[
                                { value: '', label: 'Select a component' },
                                ...availableComponents.map(comp => ({
                                    value: comp,
                                    label: comp
                                }))
                            ]}
                            error={errors.component}
                            required
                        />

                        <FormInput
                            label="Title"
                            name="title"
                            type="text"
                            value={formData.title}
                            onChange={handleInputChange}
                            error={errors.title}
                        />

                        <FormInput
                            label="Subtitle"
                            name="subtitle"
                            type="text"
                            value={formData.subtitle}
                            onChange={handleInputChange}
                            error={errors.subtitle}
                        />

                        <FormInput
                            label="Description"
                            name="description"
                            type="textarea"
                            value={formData.description}
                            onChange={handleInputChange}
                            error={errors.description}
                            rows={4}
                        />

                        <FormInput
                            label="Image URL"
                            name="image_url"
                            type="text"
                            value={formData.image_url}
                            onChange={handleInputChange}
                            error={errors.image_url}
                        />

                        <FormInput
                            label="Position"
                            name="position"
                            type="number"
                            value={formData.position}
                            onChange={handleInputChange}
                            error={errors.position}
                            min="0"
                        />

                        <FormInput
                            label="Extra Data (JSON)"
                            name="extra_data"
                            type="textarea"
                            value={JSON.stringify(formData.extra_data, null, 2)}
                            onChange={(e) => handleJsonChange('extra_data', e.target.value)}
                            error={errors.extra_data}
                            rows={6}
                        />
                    </div>

                    <div className="mt-6 flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={() => {
                                setIsModalOpen(false);
                                resetForm();
                            }}
                            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                        >
                            {loading ? 'Saving...' : 'Save'}
                        </button>
                    </div>
                </form>
            </Modal>

            {/* View Modal */}
            <Modal
                isOpen={isViewModalOpen}
                onClose={() => setIsViewModalOpen(false)}
                title="View About Content"
            >
                {selectedContent && (
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-lg font-medium text-gray-900">{selectedContent.title || 'No Title'}</h3>
                            <p className="text-sm text-gray-500">{selectedContent.component}</p>
                        </div>

                        {selectedContent.subtitle && (
                            <div>
                                <h4 className="text-sm font-medium text-gray-500">Subtitle</h4>
                                <p className="mt-1 text-sm text-gray-900">{selectedContent.subtitle}</p>
                            </div>
                        )}

                        {selectedContent.description && (
                            <div>
                                <h4 className="text-sm font-medium text-gray-500">Description</h4>
                                <div className="mt-1 text-sm text-gray-900 whitespace-pre-line">
                                    {selectedContent.description}
                                </div>
                            </div>
                        )}

                        {selectedContent.image_url && (
                            <div>
                                <h4 className="text-sm font-medium text-gray-500">Image</h4>
                                <div className="mt-1">
                                    <img
                                        src={selectedContent.image_url}
                                        alt={selectedContent.title || 'Content Image'}
                                        className="h-32 w-32 object-cover rounded"
                                    />
                                </div>
                            </div>
                        )}

                        {selectedContent.position !== null && (
                            <div>
                                <h4 className="text-sm font-medium text-gray-500">Position</h4>
                                <p className="mt-1 text-sm text-gray-900">{selectedContent.position}</p>
                            </div>
                        )}

                        {selectedContent.extra_data && Object.keys(selectedContent.extra_data).length > 0 && (
                            <div>
                                <h4 className="text-sm font-medium text-gray-500">Extra Data</h4>
                                <pre className="mt-1 p-2 bg-gray-50 rounded text-xs overflow-auto">
                                    {JSON.stringify(selectedContent.extra_data, null, 2)}
                                </pre>
                            </div>
                        )}

                        <div className="pt-5 border-t border-gray-200">
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsViewModalOpen(false);
                                        openEditModal(selectedContent);
                                    }}
                                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Edit
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>

            {/* Delete Confirmation Modal */}
            <DeleteConfirmation
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDelete}
                title="Delete About Content"
                message={`Are you sure you want to delete "${selectedContent?.title || selectedContent?.component || 'this content'}"? This action cannot be undone.`}
                confirmText="Delete"
                loading={loading}
            />
        </div>

        {/* Create/Edit Modal */ }
    <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedContent ? 'Edit About Content' : 'Create New About Content'}
    >
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
                <FormInput
                    label="Component"
                    name="component"
                    type="select"
                    value={formData.component}
                    onChange={handleInputChange}
                    options={[
                        { value: '', label: 'Select a component', disabled: true },
                        ...availableComponents.map(comp => ({
                            value: comp,
                            label: comp
                        }))
                    ]}
                    error={errors.component}
                    required
                />

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

                <FormInput
                    label="Description"
                    name="description"
                    type="textarea"
                    value={formData.description}
                    onChange={handleInputChange}
                    error={errors.description}
                    rows={4}
                />

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Image
                    </label>
                    <div
                        className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                            }`}
                        onDragOver={(e) => {
                            e.preventDefault();
                            setIsDragging(true);
                        }}
                        onDragLeave={() => setIsDragging(false)}
                        onDrop={(e) => {
                            e.preventDefault();
                            setIsDragging(false);
                            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                                handleFileChange({
                                    target: { files: e.dataTransfer.files }
                                });
                            }
                        }}
                    >
                        <div className="space-y-1 text-center">
                            {logoPreview || formData.image_url ? (
                                <div className="relative">
                                    <img
                                        src={logoPreview || formData.image_url}
                                        alt="Preview"
                                        className="mx-auto h-32 w-auto object-contain"
                                    />
                                    <button
                                        type="button"
                                        className="absolute -top-2 -right-2 p-1 bg-red-500 rounded-full text-white"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setLogoPreview(null);
                                            setFormData(prev => ({
                                                ...prev,
                                                image_url: ''
                                            }));
                                            if (fileInputRef.current) {
                                                fileInputRef.current.value = '';
                                            }
                                        }}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <svg
                                        className="mx-auto h-12 w-12 text-gray-400"
                                        stroke="currentColor"
                                        fill="none"
                                        viewBox="0 0 48 48"
                                        aria-hidden="true"
                                    >
                                        <path
                                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    <div className="flex text-sm text-gray-600">
                                        <label
                                            htmlFor="file-upload"
                                            className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none"
                                        >
                                            <span>Upload a file</span>
                                            <input
                                                id="file-upload"
                                                name="file-upload"
                                                type="file"
                                                className="sr-only"
                                                onChange={handleFileChange}
                                                ref={fileInputRef}
                                                accept="image/*"
                                            />
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs text-gray-500">
                                        PNG, JPG, GIF up to 5MB
                                    </p>
                                </>
                            )}
                        </div>
                    </div>
                    {errors.image_url && (
                        <p className="mt-1 text-sm text-red-600">{errors.image_url}</p>
                    )}
                </div>

                <FormInput
                    label="Position"
                    name="position"
                    type="number"
                    value={formData.position}
                    onChange={handleInputChange}
                    error={errors.position}
                    min="0"
                />

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Extra Data (JSON)
                    </label>
                    <textarea
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        rows={6}
                        value={JSON.stringify(formData.extra_data, null, 2)}
                        onChange={(e) => {
                            try {
                                const value = JSON.parse(e.target.value);
                                handleJsonChange('extra_data', value);
                            } catch (err) {
                                // Invalid JSON, don't update
                            }
                        }}
                    />
                    {errors.extra_data && (
                        <p className="mt-1 text-sm text-red-600">
                            {typeof errors.extra_data === 'string'
                                ? errors.extra_data
                                : 'Invalid JSON format'}
                        </p>
                    )}
                </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
                <button
                    type="button"
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={() => {
                        setIsModalOpen(false);
                        setSelectedContent(null);
                        resetForm();
                    }}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                    {loading ? 'Saving...' : 'Save'}
                </button>
            </div>
        </form>
    </Modal>

    {/* View Modal */ }
    <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="View About Content"
    >
        {selectedContent && (
            <div className="space-y-4">
                <div>
                    <h3 className="text-lg font-medium text-gray-900">
                        {selectedContent.title || 'No Title'}
                    </h3>
                    <p className="text-sm text-gray-500">{selectedContent.component}</p>
                </div>

                {selectedContent.subtitle && (
                    <div>
                        <h4 className="text-sm font-medium text-gray-500">Subtitle</h4>
                        <p className="mt-1 text-sm text-gray-900">
                            {selectedContent.subtitle}
                        </p>
                    </div>
                )}

                {selectedContent.description && (
                    <div>
                        <h4 className="text-sm font-medium text-gray-500">Description</h4>
                        <div className="mt-1 text-sm text-gray-900 whitespace-pre-line">
                            {selectedContent.description}
                        </div>
                    </div>
                )}

                {selectedContent.image_url && (
                    <div>
                        <h4 className="text-sm font-medium text-gray-500">Image</h4>
                        <div className="mt-1">
                            <img
                                src={selectedContent.image_url}
                                alt={selectedContent.title || 'Content Image'}
                                className="h-32 w-32 object-cover rounded"
                            />
                        </div>
                    </div>
                )}

                {selectedContent.position !== null && (
                    <div>
                        <h4 className="text-sm font-medium text-gray-500">Position</h4>
                        <p className="mt-1 text-sm text-gray-900">
                            {selectedContent.position}
                        </p>
                    </div>
                )}

                {selectedContent.extra_data &&
                    Object.keys(selectedContent.extra_data).length > 0 && (
                        <div>
                            <h4 className="text-sm font-medium text-gray-500">Extra Data</h4>
                            <pre className="mt-1 p-2 bg-gray-50 rounded text-xs overflow-auto">
                                {JSON.stringify(selectedContent.extra_data, null, 2)}
                            </pre>
                        </div>
                    )}

                <div className="pt-5 border-t border-gray-200">
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={() => {
                                setIsViewModalOpen(false);
                                openEditModal(selectedContent);
                            }}
                            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Edit
                        </button>
                    </div>
                </div>
            </div>
        )}
    </Modal>

    {/* Delete Confirmation Modal */ }
    <DeleteConfirmation
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete About Content"
        message={`Are you sure you want to delete "${selectedContent?.title || selectedContent?.component || 'this content'}"? This action cannot be undone.`}
        confirmText="Delete"
        loading={loading}
    />
    </div >
</AdminLayout >

export default AdminAboutContent;
