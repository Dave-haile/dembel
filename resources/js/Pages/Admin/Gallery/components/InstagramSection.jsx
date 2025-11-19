import { useEffect, useRef, useState } from 'react';
import { router } from '@inertiajs/react';
import { ImagePlus, Edit, Trash2 } from 'lucide-react';
import Modal from '../../components/Modal';
import FormInput from '../../components/FormInput';
import DeleteConfirmation from '../../components/DeleteConfirmation';
import Toast from '../../components/Toast';

/**
 * InstagramSection – CRUD manager for instagram_images table.
 *
 * Props:
 *  images  – array of instagram_rows (id,image,caption,hashtags,approval)
 *  onReload – callback to refresh parent listing (e.g., router.reload())
 */
export default function InstagramSection({ images = [], onReload = () => { }, viewMode = 'grid' }) {
  const [items, setItems] = useState(images);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({ approval: true });
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);
  const [preview, setPreview] = useState(null);

  // Normalize image src. Absolute URLs used as-is; relative paths prefixed with '/'.
  const formatUrl = (img) => {
    if (!img) return '';
    if (/^https?:/i.test(img)) return img;
    if (img.startsWith('/')) return img;
    return `/${img}`;
  };
  const fileRef = useRef(null);

  useEffect(() => setItems(images), [images]);

  const handleFile = (file) => {
    if (!file) return;
    const MAX = 5 * 1024 * 1024;
    if (!file.type.startsWith('image/')) {
      setErrors((p) => ({ ...p, image: 'Invalid image file' }));
      return;
    }
    if (file.size > MAX) {
      setErrors((p) => ({ ...p, image: 'Image too large (max 5MB)' }));
      return;
    }
    setFormData((p) => ({ ...p, image: file }));
    setPreview(URL.createObjectURL(file));
  };

  const submit = () => {
    const fd = new FormData();
    fd.append('caption', formData.caption ?? '');
    fd.append('hashtags', formData.hashtags ?? '');
    fd.append('approval', formData.approval ? '1' : '0');
    if (formData.image instanceof File) fd.append('image', formData.image);
    const isEdit = !!selectedItem;
    const url = isEdit ? window.route('admin.instagram.update', selectedItem.id) : window.route('admin.instagram.store');
    if (isEdit) fd.append('_method', 'put');
    router.post(url, fd, {
      forceFormData: true,
      onError: (e) => setErrors(e || {}),
      onSuccess: () => {
        setIsModalOpen(false);
        setSelectedItem(null);
        setFormData({ approval: true });
        setPreview(null);
        setToast({ message: isEdit ? 'Updated' : 'Created', type: 'success' });
        onReload();
      },
    });
  };

  const destroy = () => {
    if (!selectedItem) return;
    router.post(window.route('admin.instagram.destroy', selectedItem.id), { _method: 'delete' }, {
      onSuccess: () => {
        setIsDeleteModalOpen(false);
        setSelectedItem(null);
        setToast({ message: 'Deleted', type: 'success' });
        onReload();
      },
    });
  };

  const Card = ({ it }) => (
    <div className="relative group border rounded-xl overflow-hidden shadow-sm">
      <img src={formatUrl(it.image)} alt={it.caption} className="w-full h-40 object-cover" />
      <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition">
        <button onClick={() => { setSelectedItem(it); setFormData(it); setIsModalOpen(true); }} className="p-1 bg-white rounded text-green-600 shadow"><Edit size={14} /></button>
        <button onClick={() => { setSelectedItem(it); setIsDeleteModalOpen(true); }} className="p-1 bg-white rounded text-red-600 shadow"><Trash2 size={14} /></button>
      </div>
      <div className="p-2">
        <p className="text-sm font-semibold truncate">{it.caption || '—'}</p>
        <p className="text-xs text-gray-500 truncate">{it.hashtags}</p>
        <span className={`text-xs inline-block mt-1 px-2 py-0.5 rounded ${it.approval ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{it.approval ? 'Approved' : 'Pending'}</span>
      </div>
    </div>
  );

  return (
      <div className="space-y-6 shadow-2xl rounded-xl p-6 min-h-[calc(100vh-16rem)] hover:shadow-none transition-all">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"></div>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800">Instagram Images</h2>
        <button
          onClick={() => { setSelectedItem(null); setFormData({ approval: true }); setErrors({}); setPreview(null); setIsModalOpen(true); }}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
        >
          <ImagePlus size={16} />Add Image
        </button>
      </div>
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {items.map(it => <Card key={it.id} it={it} />)}
        </div>
      ) : (
        <div className="divide-y">
          {items.map(it => (
            <div key={it.id} className="flex items-center gap-4 py-3">
              <img src={formatUrl(it.image)} className="w-16 h-16 object-cover rounded" />
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{it.caption}</p>
                <p className="text-xs text-gray-500 truncate">{it.hashtags}</p>
              </div>
              <button onClick={() => { setSelectedItem(it); setFormData(it); setIsModalOpen(true); }} className="p-2 text-green-600"><Edit size={16}/></button>
              <button onClick={() => { setSelectedItem(it); setIsDeleteModalOpen(true); }} className="p-2 text-red-600"><Trash2 size={16}/></button>
            </div>
          ))}
        </div>
      )}

      {/* create/edit modal */}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={selectedItem ? 'Edit Instagram Image' : 'Add Instagram Image'}>
          <form onSubmit={(e) => { e.preventDefault(); submit(); }} className="p-6 space-y-4">
            <FormInput label="Caption" name="caption" value={formData.caption || ''} onChange={(e) => setFormData((p) => ({ ...p, caption: e.target.value }))} error={errors.caption} />
            <FormInput label="Hashtags" name="hashtags" value={formData.hashtags || ''} onChange={(e) => setFormData((p) => ({ ...p, hashtags: e.target.value }))} error={errors.hashtags} />
            <div className="flex items-center gap-2">
              <input id="approval" type="checkbox" checked={!!formData.approval} onChange={(e) => setFormData((p) => ({ ...p, approval: e.target.checked }))} />
              <label htmlFor="approval" className="text-sm">Approved</label>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Image</label>
              {preview || (typeof formData.image === 'string' && formData.image) ? (
                <img src={preview || formatUrl(formData.image) } alt="preview" className="w-32 h-32 object-cover rounded mb-2" />
              ) : null}
              <input
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                type="file" ref={fileRef} accept="image/*" onChange={(e) => handleFile(e.target.files?.[0])} />
              {errors.image && <p className="text-sm text-red-600 mt-1">{errors.image}</p>}
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border rounded">Cancel</button>
              <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded">{selectedItem ? 'Update' : 'Create'}</button>
            </div>
          </form>
        </Modal>
      )}

      {/* delete */}
      <DeleteConfirmation
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={destroy}
        itemName={selectedItem?.caption || ''}
      />

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </div>
  );
}
