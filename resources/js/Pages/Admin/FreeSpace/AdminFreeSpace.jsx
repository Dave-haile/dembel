import { useState, useEffect, useRef } from 'react';
import { usePage, Head, router } from '@inertiajs/react';
import AdminLayout from '../Shared/AdminLayout';
import Toast from '../components/Toast';
import DeleteConfirmation from '../components/DeleteConfirmation';
import RecentActivities from '../components/RecentActivities';
import Header from './components/Header';
import StatsGrid from './components/StatsGrid';
import Filters from './components/Filters';
import FreeSpaceTable from './components/FreeSpaceTable';
import CreateEditModal from './components/CreateEditModal';
import ViewSpaceModal from './components/ViewSpaceModal';

const FreeSpacesCRUD = () => {
  const { freeSpaces, floors, activities: active, counts } = usePage().props;

  // State mirrors original file
  const [spaces, setSpaces] = useState(freeSpaces);
  const [activities] = useState(active);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [logoPreview, setLogoPreview] = useState(null);
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedSpace, setSelectedSpace] = useState(null);
  const [toast, setToast] = useState(null);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [perPageCount, setPerPageCount] = useState(10);
  const maxColumns = 6;
  const [isColumnMenuOpen, setIsColumnMenuOpen] = useState(false);
  const [selectedColumns, setSelectedColumns] = useState([
    'space',
    'floor',
    'area',
    'rent',
    'status',
  ]);
  const columnMenuRef = useRef(null);

  // Keep spaces in sync with latest server props after Inertia responses
  useEffect(() => {
    setSpaces(freeSpaces);
  }, [freeSpaces]);

  const itemsPerPage = perPageCount === 'all' ? (spaces?.length || 0) : perPageCount;

  const filteredSpaces = (spaces || []).filter(space => {
    const matchesSearch = (space.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (space.wing_or_zone || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !filterStatus || space.availability_status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const visibleSpaces = filteredSpaces.slice(0, itemsPerPage || filteredSpaces.length);

  const fetchFreeSpaces = async (size) => {
    try {
      setLoading(true);
      setPerPageCount(size);
      const url = window.route('admin.free-spaces.list', {
        per_page: size === 'all' ? 'all' : String(size)
      });
      const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const items = Array.isArray(data) ? data : (data.data || data);
      setSpaces(items);
    } catch (e) {
      console.error('Failed to load free spaces:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFreeSpaces(10);
  }, []);

  const validateForm = () => {
    const newErrors = {};

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const checked = e.target.checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'file') {
      setFormData(prev => ({ ...prev, [name]: e.target.files[0] }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: name === 'floor_id' ? Number(value) : value
      }));
    }

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleCreate = () => {
    setFormData({
      name: '',
      floor_id: 0,
      wing_or_zone: '',
      area_sqm: '',
      dimensions: '',
      has_window: false,
      has_ventilation: false,
      has_plumbing: false,
      has_electricity: false,
      features: [],
      monthly_rent: '',
      rent_currency: 'ETB',
      rent_includes: [],
      negotiable: false,
      thumbnail: '',
      gallery: [],
      virtual_tour_url: '',
      short_description: '',
      full_description: '',
      contact_person: '',
      contact_phone: '',
      contact_email: '',
      meta_title: '',
      meta_description: '',
      slug: '',
      availability_status: 'available'
    });
    setSelectedSpace(null);
    setErrors({});
    setIsModalOpen(true);
  };

  const handleLogoFile = (file) => {
    if (!file) return;
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
      if (logoPreview) {
        URL.revokeObjectURL(logoPreview);
      }
    };
  }, [logoPreview]);

  const handleEdit = (space) => {
    setFormData(space);
    setSelectedSpace(space);
    setErrors({});
    setIsModalOpen(true);
  };

  const handleView = (space) => {
    setSelectedSpace(space);
    setIsViewModalOpen(true);
  };

  const handleDelete = (space) => {
    setSelectedSpace(space);
    setIsDeleteModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setToast({ message: 'Please fix the errors in the form', type: 'error' });
      return;
    }

    const fd = new FormData();
    fd.append('name', formData.name ?? '');
    if (formData.floor_id) fd.append('floor_id', String(formData.floor_id));
    fd.append('wing_or_zone', formData.wing_or_zone ?? '');
    if (formData.area_sqm !== undefined && formData.area_sqm !== '') fd.append('area_sqm', String(formData.area_sqm));
    fd.append('dimensions', formData.dimensions ?? '');
    fd.append('has_window', formData.has_window ? 1 : 0);
    fd.append('has_ventilation', formData.has_ventilation ? 1 : 0);
    fd.append('has_plumbing', formData.has_plumbing ? 1 : 0);
    fd.append('has_electricity', formData.has_electricity ? 1 : 0);
    if (Array.isArray(formData.features)) fd.append('features', JSON.stringify(formData.features));
    if (formData.monthly_rent !== undefined && formData.monthly_rent !== '') fd.append('monthly_rent', String(formData.monthly_rent));
    fd.append('rent_currency', formData.rent_currency ?? '');
    if (Array.isArray(formData.rent_includes)) fd.append('rent_includes', JSON.stringify(formData.rent_includes));
    fd.append('negotiable', formData.negotiable ? 1 : 0);
    if (formData.thumbnail instanceof File) {
      fd.append('thumbnail', formData.thumbnail);
    }
    fd.append('virtual_tour_url', formData.virtual_tour_url ?? '');
    fd.append('short_description', formData.short_description ?? '');
    fd.append('full_description', formData.full_description ?? '');
    fd.append('contact_person', formData.contact_person ?? '');
    fd.append('contact_phone', formData.contact_phone ?? '');
    fd.append('contact_email', formData.contact_email ?? '');
    fd.append('meta_title', formData.meta_title ?? '');
    fd.append('meta_description', formData.meta_description ?? '');
    fd.append('slug', formData.slug ?? '');
    fd.append('availability_status', formData.availability_status ?? 'available');

    if (selectedSpace) {
      fd.append('_method', 'put');
      router.post(
        window.route('admin.free-spaces.update', selectedSpace.id),
        fd,
        {
          forceFormData: true,
          onSuccess: () => {
            setIsModalOpen(false);
            setSelectedSpace(null);
            setToast({ message: 'Space updated successfully', type: 'success' });
            router.reload({ only: ['freeSpaces', 'counts'] });
          },
          onError: (errors) => {
            setToast({ message: Object.values(errors)[0], type: 'error' });
            console.log('Error in Free Space', errors);
          },
        }
      );
    } else {
      router.post(
        window.route('admin.free-spaces.store'),
        fd,
        {
          forceFormData: true,
          onSuccess: () => {
            setIsModalOpen(false);
            setSelectedSpace(null);
            setToast({ message: 'Space created successfully', type: 'success' });
            router.reload({ only: ['freeSpaces', 'counts'] });
          },
          onError: (errors) => {
            setToast({ message: Object.values(errors)[0], type: 'error' });
            console.log('Error in Free Space', errors);
          },
        }
      );
    }
  };

  const confirmDelete = () => {
    if (selectedSpace) {
      router.post(
        window.route('admin.free-spaces.destroy', selectedSpace.id),
        { _method: 'delete' },
        {
          forceFormData: true,
          onSuccess: () => {
            setIsDeleteModalOpen(false);
            setSelectedSpace(null);
            setToast({ message: 'Space deleted successfully', type: 'success' });
            router.reload({ only: ['freeSpaces', 'counts'] });
          },
          onError: (errors) => {
            const firstError = Object.values(errors)[0];
            setToast({ message: firstError, type: 'error' });
          },
        }
      );
    }
  };

  const getStatusBadge = (status) => {
    const colors = {
      available: 'bg-green-100 text-green-700',
      reserved: 'bg-yellow-100 text-yellow-700',
      occupied: 'bg-red-100 text-red-700'
    };
    return colors[status] || colors.available;
  };

  const allColumns = [
    {
      key: 'space',
      label: 'Space',
      render: (row) => (
        <div className="flex items-center gap-3">
          <img
            src={row.thumbnail ? `/${row.thumbnail}` : 'https://via.placeholder.com/120x80?text=No+Img'}
            alt={row.name}
            className="w-12 h-12 rounded-lg object-cover"
          />
          <div>
            <p className="font-medium text-gray-800">{row.name}</p>
            <p className="text-sm text-gray-500">{row.wing_or_zone}</p>
          </div>
        </div>
      ),
    },
    { key: 'floor', label: 'Floor', render: (row) => row.floor?.name || '—' },
    {
      key: 'area',
      label: 'Area',
      render: (row) => (
        <div className="text-sm text-gray-800">
          {row.area_sqm} m²
          {row.dimensions && <div className="text-xs text-gray-500">{row.dimensions}</div>}
        </div>
      ),
    },
    {
      key: 'rent',
      label: 'Rent',
      render: (row) => (
        <div className="text-sm">
          <p className="font-medium text-gray-800">{row.rent_currency || 'ETB'} {row.monthly_rent}</p>
          {row.negotiable && <p className="text-xs text-green-600">Negotiable</p>}
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (row) => (
        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusBadge(row.availability_status)}`}>
          {row.availability_status}
        </span>
      ),
    },
    {
      key: 'contact',
      label: 'Contact',
      render: (row) => (
        <div className="text-sm">
          <div>{row.contact_phone || '—'}</div>
          <div className="text-gray-500">{row.contact_email || '—'}</div>
        </div>
      ),
    },
  ];

  const toggleColumn = (key) => {
    setSelectedColumns((prev) => {
      const exists = prev.includes(key);
      if (exists) return prev.filter((k) => k !== key);
      if (prev.length >= maxColumns) return prev;
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

  return (
    <AdminLayout>
      <Head title="Admin Free Space" />
      <div className="space-y-6">
        <Header onCreate={handleCreate} />

        <StatsGrid counts={counts} />

        <div className="grid grid-cols-1 gap-6">
          <div className="lg:col-span-2 space-y-6 shadow-2xl rounded-xl p-6 min-h-[calc(100vh-16rem)] hover:shadow-none transition-all">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">

              <Filters
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                filterStatus={filterStatus}
                setFilterStatus={setFilterStatus}
                fetchFreeSpaces={fetchFreeSpaces}
                perPageCount={perPageCount}
                setIsColumnMenuOpen={setIsColumnMenuOpen}
                isColumnMenuOpen={isColumnMenuOpen}
                columnMenuRef={columnMenuRef}
                allColumns={allColumns}
                selectedColumns={selectedColumns}
                toggleColumn={toggleColumn}
                loading={loading}
                spaces={spaces}
                maxColumns={maxColumns}
              />

              <FreeSpaceTable
                selectedColumns={selectedColumns}
                allColumns={allColumns}
                visibleSpaces={visibleSpaces}
                handleView={handleView}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />

              <div className="flex items-center justify-between mt-4 pt-4 border-t">
                <p className="text-sm text-gray-600">
                  Showing {Math.min(visibleSpaces.length, filteredSpaces.length)} of {filteredSpaces.length} spaces
                </p>
                {loading && <span className="text-sm text-gray-500">Loading…</span>}
              </div>

            </div>
          </div>

          <div className='mt-6 shadow-[9px_9px_15px_5px_#c8bfbf] rounded-xl p-6 hover:shadow-none transition-all'>
            <RecentActivities activities={activities} subjectType={"free_space"} onViewMore={() => router.visit(window.route('admin.activity.index', { subject: 'free_space' }))} />
          </div>
        </div>

        {isModalOpen && (
          <CreateEditModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title={selectedSpace ? 'Edit Space' : 'Add New Space'}
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            fileInputRef={fileInputRef}
            isDragging={isDragging}
            setIsDragging={setIsDragging}
            logoPreview={logoPreview}
            setLogoPreview={setLogoPreview}
            onLogoInputChange={onLogoInputChange}
            onLogoDrop={onLogoDrop}
            onLogoDragOver={onLogoDragOver}
            onLogoDragLeave={onLogoDragLeave}
            floors={floors}
            selectedSpace={selectedSpace}
          />
        )}

        {isViewModalOpen && selectedSpace && (
          <ViewSpaceModal
            isOpen={isViewModalOpen}
            onClose={() => setIsViewModalOpen(false)}
            selectedSpace={selectedSpace}
            getStatusBadge={getStatusBadge}
          />
        )}

        <DeleteConfirmation
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={confirmDelete}
          itemName={selectedSpace?.name || ''}
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

export default FreeSpacesCRUD;
