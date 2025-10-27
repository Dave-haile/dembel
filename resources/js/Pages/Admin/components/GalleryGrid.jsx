import { useState } from 'react';
import { X, ZoomIn } from 'lucide-react';

const GalleryGrid = ({ items }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="relative group overflow-hidden rounded-xl bg-gray-100 aspect-video cursor-pointer"
            onClick={() => setSelectedImage(item)}
          >
            <img
              src={item.url}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h4 className="text-white font-semibold">{item.title}</h4>
                <p className="text-white/80 text-sm">{item.category}</p>
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <ZoomIn className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          <div className="max-w-5xl max-h-[90vh] w-full">
            <img
              src={selectedImage.url}
              alt={selectedImage.title}
              className="w-full h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="mt-4 text-center">
              <h3 className="text-xl font-semibold text-white">
                {selectedImage.title}
              </h3>
              <p className="text-white/70">{selectedImage.category}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GalleryGrid;
