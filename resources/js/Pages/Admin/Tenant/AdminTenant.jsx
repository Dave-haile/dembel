/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from "react";
import Toast from "../components/Toast";
import DeleteConfirmation from "../components/DeleteConfirmation";
import FormInput from "../components/FormInput";
import RecentActivities from "../components/RecentActivities";
import Modal from "../components/Modal";
import AdminLayout from "../Shared/AdminLayout";
import { Head, usePage, router } from "@inertiajs/react";
import HeaderBar from "./components/HeaderBar";
import StatsCards from "./components/StatsCards";
import ControlsBar from "./components/ControlsBar";
import TenantsTable from "./components/TenantsTable";

const Tenants = () => {
  // All hooks must be called at the top level, before any conditional logic
  const { tenants: initialTenants, categories, activities, count } = usePage().props;
  // Ensure tenants is always an array
  const [tenants, setTenants] = useState(Array.isArray(initialTenants) ? initialTenants : (initialTenants?.data || []));
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [toast, setToast] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    category_id: 0,
    description: "",
    logo: "",
    location: "",
    hours: "",
    fullDescription: "",
    floor_id: "",
    building: "",
    room_no: "",
    phone: "",
    email: "",
    website: "",
  });
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [perPage, setPerPage] = useState(null); // null = client mode; number|'all' = server mode
  const [loading, setLoading] = useState(false);
  const [isColumnMenuOpen, setIsColumnMenuOpen] = useState(false);
  const [selectedColumns, setSelectedColumns] = useState([
    'tenant',
    'category',
    'location',
    'floor',
    'contact',
  ]);
  const columnMenuRef = useRef(null);

  // Fetch tenants with search and filters
  const fetchTenants = async (size = perPage) => {
    try {
      setLoading(true);

      // Use the list endpoint for AJAX requests
      const url = window.route('admin.tenants.list', {
        per_page: size === 'all' ? 'all' : String(size),
        search: searchTerm || '',
        category_id: filterCategory || '',
        page: currentPage,
      });

      const res = await fetch(url, {
        headers: {
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'X-Inertia': 'true'
        }
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error('Error response:', errorText);
        throw new Error(`HTTP ${res.status}: ${errorText}`);
      }

      const data = await res.json();

      // Handle both paginated response and direct array response
      if (data && data.data) {
        // Paginated response
        setTenants(data.data);
        setCurrentPage(data.current_page || 1);
      } else if (Array.isArray(data)) {
        // Direct array response (when per_page=all)
        setTenants(data);
      } else {
        console.warn('Unexpected response format:', data);
        setTenants([]);
      }

      setLoading(false);
      return data;
    } catch (e) {
      console.error('Failed to load tenants:', e);
      setToast({
        message: `Failed to load tenants: ${e.message}`,
        type: 'error'
      });
      setLoading(false);
      setTenants([]); // Clear tenants on error
      return [];
    }
  };

  // Initial data load
  useEffect(() => {
    fetchTenants(10);
  }, []);

  // Handle search and filter changes with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchTenants(perPage);
    }, 500); // 500ms debounce

    return () => clearTimeout(timer);
  }, [searchTerm, filterCategory, currentPage]);

  // Handle page changes
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handle per page changes
  const handlePerPageChange = (size) => {
    setPerPage(size);
    setCurrentPage(1); // Reset to first page when changing page size
    fetchTenants(size);
  };

  const handleLogoFile = (file) => {
    if (!file) return;
    // Frontend validation: only images and max 5MB
    const MAX_SIZE = 5 * 1024 * 1024;
    if (!file.type.startsWith('image/')) {
      setErrors((prev) => ({ ...prev, logo: 'Please select a valid image file.' }));
      setToast({ message: 'Invalid file type. Please select an image.', type: 'error' });
      return;
    }
    if (file.size > MAX_SIZE) {
      setErrors((prev) => ({ ...prev, logo: 'Image must be 5MB or smaller.' }));
      setToast({ message: 'Image is too large (max 5MB).', type: 'error' });
      return;
    }
    setFormData((prev) => ({ ...prev, logo: file }));
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
  };

  const onLogoDragOver = (e) => e.preventDefault();

  useEffect(() => {
    return () => {
      if (logoPreview) {
        URL.revokeObjectURL(logoPreview);
      }
    };
  }, [logoPreview]);

  const maxColumns = 5;

  const toggleColumn = (key) => {
    setSelectedColumns((prev) => {
      const exists = prev.includes(key);
      if (exists) return prev.filter((k) => k !== key);
      if (prev.length >= maxColumns) return prev; // enforce limit
      return [...prev, key];
    });
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isColumnMenuOpen && columnMenuRef.current && !columnMenuRef.current.contains(e.target)) {
        setIsColumnMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isColumnMenuOpen]);

  const allColumns = [
    {
      key: 'tenant',
      label: 'Tenant',
      render: (tenant) => (
        <div className="flex items-center gap-3">
          <img
            src={tenant.logo ? `/${tenant.logo}` : 'https://placehold.co/600x400?text=No+Image'}
            alt={tenant.name}
            className="w-10 h-10 rounded-lg object-cover"
          />
          <div>
            <p className="font-medium text-gray-800">{tenant.name}</p>
            <p className="text-sm text-gray-500">{tenant.description}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'category',
      label: 'Category',
      render: (tenant) => (
        <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-sm">
          {tenant.category?.icon} {tenant.category?.name}
        </span>
      ),
    },
    { key: 'location', label: 'Location', render: (t) => t.location },
    { key: 'floor', label: 'Floor', render: (t) => t.floor?.name || '—' },
    { key: 'room', label: 'Room', render: (t) => t.room_no || '—' },
    {
      key: 'contact',
      label: 'Contact',
      render: (t) => (
        <div className="text-sm">
          <p className="text-gray-800">{t.phone}</p>
          <p className="text-gray-500">{t.email}</p>
        </div>
      ),
    },
    { key: 'hours', label: 'Hours', render: (t) => t.hours },
    {
      key: 'website',
      label: 'Website',
      render: (t) => (
        t.website ? (
          <a href={`https://${t.website.replace(/^https?:\/\//, '')}`} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
            {t.website}
          </a>
        ) : '—'
      ),
    },
    { key: 'description', label: 'Description', render: (t) => t.description || '—' },
    { key: 'email', label: 'Email', render: (t) => t.email || '—' },
    { key: 'phone', label: 'Phone', render: (t) => t.phone || '—' },
    { key: 'fullDescription', label: 'Full Description', render: (t) => t.fullDescription || '—' },
    {
      key: 'logo', label: 'Logo', render: (t) => (
        <img
          src={t.logo ? `/${t.logo}` : 'https://placehold.co/600x400?text=No+Image'}
          alt={t.name}
          className="w-10 h-10 rounded-lg object-cover"
        />
      )
    },
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name?.trim()) newErrors.name = "Name is required";
    if (!formData.category_id) newErrors.category_id = "Category is required";
    if (!formData.description?.trim())
      newErrors.description = "Description is required";
    if (!formData.location?.trim()) newErrors.location = "Location is required";
    if (!formData.hours?.trim()) newErrors.hours = "Hours are required";
    if (!formData.floor_id) newErrors.floor_id = "Floor is required";
    if (!formData.room_no?.trim()) newErrors.room_no = "Room number is required";
    if (!formData.phone?.trim()) newErrors.phone = "Phone is required";
    if (!formData.email?.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "category_id" ? Number(value) : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleCreate = () => {
    setFormData({
      name: "",
      category_id: 0,
      description: "",
      logo: "",
      location: "",
      hours: "",
      fullDescription: "",
      floor_id: "",
      building: "",
      room_no: "",
      phone: "",
      email: "",
      website: "",
    });
    setSelectedTenant(null);
    setErrors({});
    setLogoPreview(null);
    setIsModalOpen(true);
  };

  const handleEdit = (tenant) => {
    // Extract only the necessary fields and handle the floor object
    const { floor, ...tenantData } = tenant;

    setFormData({
      ...tenantData,
      floor_id: floor?.id || tenant.floor_id || '',
      // Ensure we don't include the floor object in formData
      floor: undefined
    });

    setSelectedTenant(tenant);
    setErrors({});
    setLogoPreview(tenant.logo ? `/${tenant.logo}` : null);
    setIsModalOpen(true);
  };

  const handleView = (tenant) => {
    // Create a new object without the floor object to prevent rendering issues
    const { floor, ...tenantData } = tenant;
    setSelectedTenant({
      ...tenantData,
      floor_name: floor?.name || 'N/A', // Add floor_name for display
      floor_description: floor?.description || '' // Add floor_description if needed
    });
    setIsViewModalOpen(true);
  };

  const handleDelete = (tenant) => {
    setSelectedTenant(tenant);
    setIsDeleteModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setToast({ message: "Please fix the errors in the form", type: "error" });
      return;
    }

    const isFileLogo = formData.logo instanceof File;
    const fd = new FormData();
    fd.append('name', formData.name ?? '');
    if (formData.category_id) fd.append('category_id', String(formData.category_id));
    fd.append('description', formData.description ?? '');
    fd.append('location', formData.location ?? '');
    fd.append('hours', formData.hours ?? '');
    fd.append('fullDescription', formData.fullDescription ?? '');
    if (formData.floor_id) fd.append('floor_id', String(formData.floor_id));
    fd.append('building', formData.building ?? '');
    fd.append('room_no', formData.room_no ?? '');
    fd.append('phone', formData.phone ?? '');
    fd.append('email', formData.email ?? '');
    fd.append('website', formData.website ?? '');
    if (isFileLogo) fd.append('logo', formData.logo);

    // Debug: Inspect FormData contents before sending
    // for (const [key, val] of fd.entries()) {
    //   if (val instanceof File) {
    //     console.log(key, '(File)', { name: val.name, type: val.type, size: val.size });
    //   } else {
    //     console.log(key, String(val));
    //   }
    // }

    if (selectedTenant) {
      fd.append('_method', 'put');
      router.post(
        window.route('admin.tenants.update', selectedTenant.id),
        fd,
        {
          onSuccess: () => {
            setIsModalOpen(false);
            setSelectedTenant(null);
            setLogoPreview(null);
            setToast({ message: 'Tenant updated successfully', type: 'success' });
            router.reload({ only: ['tenants'] });
          },
          onError: (errs) => {
            setErrors(errs || {});
            setToast({ message: "Failed to update tenant", type: "error" });
            setToast({ message: Object.values(errs)[0], type: 'error' });
          },
        }
      );
    } else {
      router.post(
        window.route('admin.tenants.store'),
        fd,
        {
          onSuccess: () => {
            setIsModalOpen(false);
            setSelectedTenant(null);
            setLogoPreview(null);
            setToast({ message: 'Tenant created successfully', type: 'success' });
            router.reload({ only: ['tenants'] });
          },
          onError: (errs) => {
            setErrors(errs || {});
            setToast({ message: "Failed to create tenant", type: "error" });
            setToast({ message: Object.values(errs)[0], type: 'error' });
          },
        }
      );
    }
  };

  const confirmDelete = () => {
    if (selectedTenant) {
      console.log("DELETE TENANT:", selectedTenant);
      router.post(window.route('admin.tenants.destroy', selectedTenant.id), {
        _method: 'delete',
      }, {
        onSuccess: () => {
          setIsDeleteModalOpen(false);
          setSelectedTenant(null);
          setToast({ message: 'Tenant deleted successfully', type: 'success' });
          router.reload({ only: ['tenants'] });
        },
        onError: (errs) => {
          setErrors(errs || {});
          setToast({ message: "Failed to delete tenant", type: "error" });
          setToast({ message: Object.values(errs)[0], type: 'error' });
        },
      });
    }
  };
  const itemsPerPage = 10;

  // Client-side filtering (only used when not using server-side pagination)
  const clientFiltered = Array.isArray(tenants)
    ? tenants.filter((tenant) => {
      if (!tenant) return false;
      const matchesSearch = !searchTerm ||
        (tenant.name && tenant.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (tenant.description && tenant.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (tenant.location && tenant.location.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = !filterCategory ||
        (tenant.category_id && tenant.category_id.toString() === filterCategory.toString());
      return matchesSearch && matchesCategory;
    })
    : [];

  // Use server-side filtering when perPage is set, otherwise use client-side filtering
  const effectiveList = perPage ? tenants : clientFiltered;

  const totalPages = Math.ceil(effectiveList.length / itemsPerPage);
  const paginatedTenants = effectiveList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const LockBodyScroll = () => {
    useEffect(() => {
      if (isModalOpen) {
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
          document.body.style.overflow = prev;
        };
      }
    }, [isModalOpen]);
  };

  LockBodyScroll();

  return (
    <AdminLayout>
      <Head title="Admin Tenant" />
      <div className="space-y-6">
        <HeaderBar title="Tenants Management" subtitle="Manage all mall tenants" onAdd={handleCreate} />
        <StatsCards count={count} />
        <div className="grid grid-cols-1">
          <div className="lg:col-span-2 space-y-6 shadow-2xl rounded-xl p-6 min-h-[calc(100vh-16rem)] hover:shadow-none transition-all">
            <ControlsBar
              searchTerm={searchTerm}
              onSearchChange={(v) => { setSearchTerm(v); setCurrentPage(1); }}
              filterCategory={filterCategory}
              onCategoryChange={(v) => { setFilterCategory(v); setCurrentPage(1); }}
              categories={categories}
              selectedColumns={selectedColumns}
              maxColumns={maxColumns}
              toggleColumn={toggleColumn}
              isColumnMenuOpen={isColumnMenuOpen}
              setIsColumnMenuOpen={setIsColumnMenuOpen}
              allColumns={allColumns}
              perPage={perPage}
              loading={loading}
              onFetchTenants={fetchTenants}
            />

            <TenantsTable
              selectedColumns={selectedColumns}
              allColumns={allColumns}
              items={paginatedTenants}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDelete}
              currentPage={currentPage}
              totalPages={totalPages}
              itemsPerPage={itemsPerPage}
              onPrevPage={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              onNextPage={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              totalCount={effectiveList.length}
            />
          </div>
        </div>

        <div className="mt-6 shadow-[9px_9px_15px_5px_#c8bfbf] rounded-xl p-6 hover:shadow-none transition-all">
          <RecentActivities
            activities={activities}
            subjectType="Tenant"
            onViewMore={() => router.visit(window.route('admin.activity.index', { subject: 'Tenant' }))}
          />
        </div>

        {isModalOpen && (
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title={selectedTenant ? "Edit Tenant" : "Add New Tenant"}
          >
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  label="Tenant Name"
                  name="name"
                  value={formData.name || ""}
                  onChange={handleInputChange}
                  error={errors.name}
                  required
                  placeholder="Enter tenant name"
                />

                <FormInput
                  label="Category"
                  name="category_id"
                  type="select"
                  value={formData.category_id || ""}
                  onChange={handleInputChange}
                  error={errors.category_id}
                  required
                  options={categories.map((cat) => ({
                    value: cat.id,
                    label: `${cat.icon} ${cat.name}`,
                  }))}
                />

                <div className="md:col-span-2">
                  <FormInput
                    label="Description"
                    name="description"
                    value={formData.description || ""}
                    onChange={handleInputChange}
                    error={errors.description}
                    required
                    placeholder="Brief description"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">Logo</label>
                  <div
                    onDrop={onLogoDrop}
                    onDragOver={onLogoDragOver}
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full px-4 py-8 border-2 border-dashed rounded-lg text-center cursor-pointer hover:bg-gray-50"
                  >
                    {logoPreview ? (
                      <img src={logoPreview} alt="Logo preview" className="mx-auto h-20 w-20 object-cover rounded" />
                    ) : typeof formData.logo === "string" && formData.logo ? (
                      <img src={`/${formData.logo}`} alt="Current logo" className="mx-auto h-20 w-20 object-cover rounded" />
                    ) : (
                      <div className="text-gray-500">
                        Drag & drop logo here, or click to select
                      </div>
                    )}
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    name="logo"
                    accept="image/*"
                    onChange={onLogoInputChange}
                    className="hidden"
                  />
                </div>

                <FormInput
                  label="Location"
                  name="location"
                  value={formData.location || ""}
                  onChange={handleInputChange}
                  error={errors.location}
                  required
                  placeholder="e.g., Fashion District"
                />

                <FormInput
                  label="Building"
                  name="building"
                  type="select"
                  value={formData.building || ""}
                  onChange={handleInputChange}
                  error={errors.building}
                  required
                  options={[
                    { value: "Dembel", label: "Dembel" },
                    { value: "Dembel Extension", label: "Dembel Extension" },
                  ]}
                  placeholder="Select building"
                />

                <FormInput
                  label="Floor"
                  name="floor_id"
                  type="select"
                  value={formData.floor_id || ""}
                  onChange={handleInputChange}
                  error={errors.floor_id}
                  required
                  options={usePage().props.floors?.map(floor => ({
                    value: floor.id,
                    label: floor.name
                  })) || []}
                  placeholder="Select floor"
                />

                <FormInput
                  label="Room Number"
                  name="room_no"
                  value={formData.room_no || ""}
                  onChange={handleInputChange}
                  error={errors.room_no}
                  required
                  placeholder="e.g., 101"
                />

                <FormInput
                  label="Operating Hours"
                  name="hours"
                  value={formData.hours || ""}
                  onChange={handleInputChange}
                  error={errors.hours}
                  required
                  placeholder="e.g., 10:00 AM - 9:00 PM"
                />

                <FormInput
                  label="Phone"
                  name="phone"
                  type="tel"
                  value={formData.phone || ""}
                  onChange={handleInputChange}
                  error={errors.phone}
                  required
                  placeholder="+1 (555) 123-4567"
                />

                <FormInput
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email || ""}
                  onChange={handleInputChange}
                  error={errors.email}
                  required
                  placeholder="contact@example.com"
                />

                <FormInput
                  label="Website"
                  name="website"
                  value={formData.website || ""}
                  onChange={handleInputChange}
                  placeholder="www.example.com"
                />

                <div className="md:col-span-2">
                  <FormInput
                    label="Full Description"
                    name="fullDescription"
                    type="textarea"
                    value={formData.fullDescription || ""}
                    onChange={handleInputChange}
                    placeholder="Detailed description of the tenant..."
                    rows={4}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {selectedTenant ? "Update Tenant" : "Create Tenant"}
                </button>
              </div>
            </form>
          </Modal>
        )}

        {isViewModalOpen && selectedTenant && (
          <Modal
            isOpen={isViewModalOpen}
            onClose={() => setIsViewModalOpen(false)}
            title="Tenant Details"
          >
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-4 pb-4 border-b">
                <img
                  src={`/${selectedTenant.logo}`}
                  alt={selectedTenant.name}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">
                    {selectedTenant.name}
                  </h3>
                  <p className="text-gray-600">{selectedTenant.description}</p>
                  <span className="inline-block mt-2 px-3 py-1 bg-blue-50 text-blue-700 rounded text-sm">
                    {selectedTenant.category?.icon}{" "}
                    {selectedTenant.category?.name}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="text-gray-800 font-medium">
                    {selectedTenant.location}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Floor</p>
                  <p className="text-gray-800 font-medium">
                    {selectedTenant.floor_name}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Operating Hours</p>
                  <p className="text-gray-800 font-medium">
                    {selectedTenant.hours}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Building</p>
                  <p className="text-gray-800 font-medium">
                    {selectedTenant.building}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Room Number</p>
                  <p className="text-gray-800 font-medium">
                    {selectedTenant.room_no}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="text-gray-800 font-medium">
                    {selectedTenant.phone}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-gray-800 font-medium">
                    {selectedTenant.email}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Website</p>
                  <p className="text-blue-600 font-medium">
                    {selectedTenant.website}
                  </p>
                </div>
              </div>

              {selectedTenant.fullDescription && (
                <div className="pt-4 border-t">
                  <p className="text-sm text-gray-500 mb-2">Full Description</p>
                  <p className="text-gray-800">
                    {selectedTenant.fullDescription}
                  </p>
                </div>
              )}
            </div>
          </Modal>
        )}

        <DeleteConfirmation
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={confirmDelete}
          itemName={selectedTenant?.name || ""}
        />

        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </div>
    </AdminLayout>
  );
};

export default Tenants;
