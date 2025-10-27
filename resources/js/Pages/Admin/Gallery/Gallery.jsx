import { useState } from 'react';
import GalleryGrid from '../components/GalleryGrid';
import Modal from '../components/Modal';
import { mockGallery } from '../../data/mockData';
import { Plus, Upload } from 'lucide-react';
import AdminLayout from '../Shared/AdminLayout';

const Gallery = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <AdminLayout>
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Gallery</h1>
          <p className="text-gray-600 mt-1">Mall images and media</p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          Upload Image
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex gap-2 mb-6">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium">
            All
          </button>
          <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">
            Interior
          </button>
          <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">
            Exterior
          </button>
        </div>

        <GalleryGrid items={mockGallery} />
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Upload Image">
        <div className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">Click to upload or drag and drop</p>
            <p className="text-sm text-gray-500">PNG, JPG, GIF up to 10MB</p>
          </div>

          <input
            type="text"
            placeholder="Image Title"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Select Category</option>
            <option>Interior</option>
            <option>Exterior</option>
            <option>Events</option>
            <option>Tenants</option>
          </select>

          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={() => setModalOpen(false)}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => setModalOpen(false)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Upload
            </button>
          </div>
        </div>
      </Modal>
    </div></AdminLayout>
  );
};

export default Gallery;
