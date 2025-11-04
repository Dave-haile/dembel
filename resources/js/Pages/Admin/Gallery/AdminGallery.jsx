import { useEffect, useMemo, useRef, useState } from 'react';
import { Head, usePage, router } from '@inertiajs/react';
import { ImagePlus, List, Grid3X3, Search, Edit, Trash2, Eye } from 'lucide-react';
import AdminLayout from '../Shared/AdminLayout';
import GalleryGrid from '../components/GalleryGrid';
import RecentActivities from '../components/RecentActivities';
import Modal from '../components/Modal';
import FormInput from '../components/FormInput';
import DeleteConfirmation from '../components/DeleteConfirmation';
import Toast from '../components/Toast';

const AdminGallery = () => {
  const { galleries: initialGalleries = [], counts = {}, activities = [] } = usePage().props;
  const [galleries, setGalleries] = useState(initialGalleries || []);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const fileInputRef = useRef(null);
  const itemsPerPage = 9;
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    setGalleries(initialGalleries || []);
  }, [initialGalleries]);

  const formatted = useMemo(() => {
    return (galleries || []).map(g => ({
      id: g.id,
      url: g.image ? `/${g.image}` : 'https://via.placeholder.com/640x360?text=No+Image',
      title: g.title || 'Untitled',
      category: g.category || '—',
      approval: !!g.approval,
    }));
  }, [galleries]);

  const filtered = useMemo(() => {
    const t = searchTerm.toLowerCase();
    return formatted.filter(i => (
      (i.title || '').toLowerCase().includes(t) ||
      (i.category || '').toLowerCase().includes(t)
    ));
  }, [formatted, searchTerm]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
  const pageItems = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(1);
  }, [totalPages]);

  
  const handleLogoFile = (file) => {
    if (!file) return;
    // Frontend validation: only images and max 5MB
    const MAX_SIZE = 5 * 1024 * 1024;
    if (!file.type.startsWith("image/")) {
      setErrors((prev) => ({
        ...prev,
        image: "Please select a valid image file.",
      }));
      setToast({
        message: "Invalid file type. Please select an image.",
        type: "error",
      });
      return;
    }
    if (file.size > MAX_SIZE) {
      setErrors((prev) => ({ ...prev, image: "Image must be 5MB or smaller." }));
      setToast({ message: "Image is too large (max 5MB).", type: "error" });
      return;
    }
    setFormData((prev) => ({ ...prev, image: file }));
    setErrors((prev) => ({ ...prev, image: '' }));
    const url = URL.createObjectURL(file);
    setLogoPreview(url);
    console.log("SELECTED LOGO FILE:", file);
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


  return (
    <AdminLayout>
      <Head title="Admin Gallery" />
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Gallery Management</h1>
            <p className="text-gray-600 mt-1">Manage mall images and media</p>
          </div>
          <button
            type="button"
            onClick={() => {
              setFormData({ title: '', category: '', description: '', approval: true });
              setSelectedItem(null);
              setErrors({});
              setLogoPreview(null);
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
          >
            <ImagePlus className="w-4 h-4" />
            Add Image
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="w-full md:max-w-md relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search images..."
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`px-3 py-2 border rounded-lg flex items-center gap-2 ${viewMode==='grid' ? 'bg-gray-800 text-white border-gray-800' : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'}`}
              >
                <Grid3X3 className="w-4 h-4" /> Grid
              </button>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={`px-3 py-2 border rounded-lg flex items-center gap-2 ${viewMode==='list' ? 'bg-gray-800 text-white border-gray-800' : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'}`}
              >
                <List className="w-4 h-4" /> List
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <p className="text-sm text-gray-600 mb-1">Total Images</p>
            <p className="text-3xl font-bold text-gray-800">{counts?.total ?? galleries.length}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <p className="text-sm text-gray-600 mb-1">Approved</p>
            <p className="text-3xl font-bold text-green-600">{counts?.approved ?? galleries.filter(g => g.approval).length}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <p className="text-sm text-gray-600 mb-1">Pending</p>
            <p className="text-3xl font-bold text-yellow-600">{counts?.pending ?? galleries.filter(g => !g.approval).length}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-6 shadow-2xl rounded-xl p-6 min-h-[calc(100vh-16rem)] hover:shadow-none transition-all">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm text-gray-600">Showing {pageItems.length} of {filtered.length}</p>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                    disabled={currentPage === 1}
                  >
                    Prev
                  </button>
                  <span className="text-sm text-gray-600">Page {currentPage} / {totalPages}</span>
                  <button
                    type="button"
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
              </div>

              {viewMode === 'grid' ? (
                <GalleryGrid items={pageItems} />
              ) : (
                <div className="space-y-3">
                  {pageItems.map((it) => (
                    <div key={it.id} className="border border-gray-200 rounded-lg p-3">
                      <div className="flex items-start gap-4">
                        <img src={it.url} alt={it.title} className="w-20 h-20 rounded object-cover" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="text-base font-semibold text-gray-800">{it.title}</h3>
                              <p className="text-sm text-gray-600">{it.category}</p>
                            </div>
                            <div className="text-xs">
                              <span className={`px-2 py-1 rounded ${it.approval ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                {it.approval ? 'Approved' : 'Pending'}
                              </span>
                            </div>
                          </div>
                          <div className="mt-2 flex items-center gap-2">
                            <button
                              onClick={() => { setSelectedItem(galleries.find(g => g.id === it.id)); setIsViewModalOpen(true); }}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                              title="View"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => { setFormData(galleries.find(g => g.id === it.id)); setSelectedItem(galleries.find(g => g.id === it.id)); setErrors({}); setIsModalOpen(true); }}
                              className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                              title="Edit"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => { setSelectedItem(galleries.find(g => g.id === it.id)); setIsDeleteModalOpen(true); }}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6">
          <RecentActivities
            activities={activities}
            subjectType="Gallery"
            onViewMore={() => router.visit(window.route('admin.activity.index', { subject: 'gallery' }))}
          />
        </div>

        {isModalOpen && (
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={selectedItem ? 'Edit Image' : 'Add Image'}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData();
                fd.append('title', formData.title ?? '');
                fd.append('category', formData.category ?? '');
                if (formData.floor_id) fd.append('floor_id', String(formData.floor_id));
                if (formData.sector != null) fd.append('sector', String(formData.sector));
                fd.append('description', formData.description ?? '');
                fd.append('approval', formData.approval ? '1' : '0');
                if (formData.image instanceof File) {
                  fd.append('image', formData.image);
                } else if (fileInputRef?.current?.files?.[0] instanceof File) {
                  fd.append('image', fileInputRef.current.files[0]);
                }
                if (selectedItem) {
                  fd.append('_method', 'put');
                  router.post(window.route('admin.galleries.update', selectedItem.id), fd, {
                    forceFormData: true,
                    onError: (errs) => setErrors(errs || {}),
                    onSuccess: () => { setIsModalOpen(false); setSelectedItem(null); setToast({ message: 'Gallery updated successfully', type: 'success' }); router.reload({ only: ['galleries','counts'] }); },
                  });
                } else {
                  router.post(window.route('admin.galleries.store'), fd, {
                    forceFormData: true,
                    onError: (errs) => setErrors(errs || {}),
                    onSuccess: () => { setIsModalOpen(false); setSelectedItem(null); setToast({ message: 'Gallery created successfully', type: 'success' }); router.reload({ only: ['galleries','counts'] }); },
                  });
                }
              }}
              className="p-6 space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput label="Title" name="title" value={formData.title || ''} onChange={(e) => { const { name, value } = e.target; setFormData((p) => ({ ...p, [name]: value })); if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' })); }} error={errors.title} required />
                <FormInput label="Category" name="category" value={formData.category || ''} onChange={(e) => { const { name, value } = e.target; setFormData((p) => ({ ...p, [name]: value })); if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' })); }} />
                <FormInput label="Floor ID" name="floor_id" value={formData.floor_id || ''} onChange={(e) => { const { name, value } = e.target; setFormData((p) => ({ ...p, [name]: value })); if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' })); }} />
                <FormInput label="Sector" name="sector" value={formData.sector || ''} onChange={(e) => { const { name, value } = e.target; setFormData((p) => ({ ...p, [name]: value })); if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' })); }} />
                <div className="md:col-span-2">
                  <FormInput label="Description" name="description" type="textarea" value={formData.description || ''} onChange={(e) => { const { name, value } = e.target; setFormData((p) => ({ ...p, [name]: value })); if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' })); }} rows={4} />
                </div>
                <div className="flex items-center gap-3">
                  <input id="approval" type="checkbox" name="approval" checked={!!formData.approval} onChange={(e) => setFormData((p) => ({ ...p, approval: e.target.checked }))} className="w-4 h-4" />
                  <label htmlFor="approval" className="text-sm text-gray-700">Approved</label>
                </div>
              </div>
              <div>
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                  <div className="flex flex-col justify-center">
                    <div
                      onDrop={onLogoDrop}
                      onDragOver={onLogoDragOver}
                      onDragEnter={onLogoDragOver}
                      onDragLeave={onLogoDragLeave}
                      onClick={() => fileInputRef.current?.click()}
                      className={`w-full px-4 py-12 border-2 rounded-lg text-center cursor-pointer transition-colors ${isDragging
                        ? 'border-indigo-400 bg-indigo-50 ring-2 ring-indigo-300'
                        : 'border-dashed border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {logoPreview ? (
                        <img src={logoPreview} alt="Preview" className="mx-auto h-24 w-24 object-cover rounded" />
                      ) : typeof formData.image === 'string' && formData.image ? (
                        <img src={`/${formData.image}`} alt="Current" className="mx-auto h-24 w-24 object-cover rounded" />
                      ) : (
                        <div className="text-gray-500">
                          Drag & drop image here, or click to select
                        </div>
                      )}
                    </div>
                    {/* <input
                      ref={fileInputRef}
                      type="file"
                      name="thumbnail"
                      accept="image/*"
                      onChange={onLogoInputChange}
                      className="hidden"
                    /> */}
                     <input
                    ref={fileInputRef}
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const MAX = 5 * 1024 * 1024;
                        if (!file.type.startsWith('image/')) { setErrors((prev)=>({...prev,image:'Please select a valid image file.'})); return; }
                        if (file.size > MAX) { setErrors((prev)=>({...prev,image:'Image must be 5MB or smaller.'})); return; }
                        setFormData((p) => ({ ...p, image: file }));
                        const url = URL.createObjectURL(file);
                        setLogoPreview(url);
                      }
                    }}
                    className="hidden"
                  />
                  </div>
                </div>
                 
                  {errors.image && <p className="text-sm text-red-600 mt-1">{errors.image}</p>}
                </div>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border rounded">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded">{selectedItem ? 'Update' : 'Create'}</button>
              </div>
            </form>
          </Modal>
        )}

        {isViewModalOpen && selectedItem && (
          <Modal isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)} title="Image Details">
            <div className="p-6 space-y-3">
              <img src={selectedItem.image ? `/${selectedItem.image}` : 'https://via.placeholder.com/640x360?text=No+Image'} alt={selectedItem.title} className="w-full max-h-[320px] object-contain rounded" />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Title</p>
                  <p className="text-gray-800 font-medium">{selectedItem.title}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Category</p>
                  <p className="text-gray-800 font-medium">{selectedItem.category}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Approved</p>
                  <p className="text-gray-800 font-medium">{selectedItem.approval ? 'Yes' : 'No'}</p>
                </div>
              </div>
              {selectedItem.description && (
                <div>
                  <p className="text-sm text-gray-500">Description</p>
                  <p className="text-gray-800">{selectedItem.description}</p>
                </div>
              )}
            </div>
          </Modal>
        )}

        <DeleteConfirmation
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={() => {
            if (!selectedItem) return;
            router.post(window.route('admin.galleries.destroy', selectedItem.id), { _method: 'delete' }, {
              onSuccess: () => { setIsDeleteModalOpen(false); setSelectedItem(null); setToast({ message: 'Gallery deleted successfully', type: 'success' }); router.reload({ only: ['galleries','counts'] }); },
            });
          }}
          itemName={selectedItem?.title || ''}
        />

        {toast && (
          <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminGallery;
