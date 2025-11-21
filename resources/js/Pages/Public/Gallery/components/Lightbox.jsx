import React from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const Lightbox = ({ 
  isOpen, 
  image, 
  onClose, 
  onNext, 
  onPrev
}) => {
  if (!isOpen || !image) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="relative max-w-6xl max-h-full">
        <img
          src={`${image.image}`}
          alt={image.title}
          className="max-w-full max-h-[85vh] object-contain rounded-lg"
        />

        <div className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-sm rounded-lg p-4">
          <h3 className="text-white font-semibold text-lg mb-1">
            {image.title}
          </h3>
          <div className="flex items-center space-x-2 text-white/80 text-sm mb-2">
            <span className="bg-blue-500/20 px-2 py-1 rounded text-xs">
              {image.category}
            </span>
            <span>•</span>
            <span>Floor {image.floor_id}</span>
            <span>•</span>
            <span>{image.sector}</span>
          </div>
          <p className="text-white/90 text-sm leading-relaxed">
            {image.description}
          </p>
          {image.created_at && (
            <p className="text-white/60 text-xs mt-2">
              Added {new Date(image.created_at).toLocaleDateString()}
            </p>
          )}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute top-4 right-4 text-white bg-black/50 hover:bg-black/70 p-3 rounded-full transition-colors duration-200"
        >
          <X size={24} />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          tabIndex={-1}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-black/50 hover:bg-gray-600 p-3 rounded-full transition-colors duration-200"
        >
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-black/50 hover:bg-gray-600 p-3 rounded-full transition-colors duration-200"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default Lightbox;
