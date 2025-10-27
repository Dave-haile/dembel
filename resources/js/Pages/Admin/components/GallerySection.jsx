import React from "react";
import { mockGallery } from "../Dashboard/Dashboar";

const GallerySection = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">Mall Gallery</h3>
        <button className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded text-sm">
          Upload Image
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {mockGallery.map((img, i) => (
          <div
            key={i}
            className="aspect-square rounded-lg overflow-hidden shadow-sm"
          >
            <img
              src={img}
              alt={`Mall ${i + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GallerySection;
