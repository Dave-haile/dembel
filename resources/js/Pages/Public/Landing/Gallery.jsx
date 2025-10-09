import React, { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "@inertiajs/react";

export default function Gallery({ galleries, language = "en" }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const displayImages =
    galleries.length > 0
      ? galleries.filter((gallery) => gallery.approval)
      : defaultImages;

  const openLightbox = (index) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const goToNext = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % displayImages.length);
    }
  };

  const goToPrev = () => {
    if (selectedImage !== null) {
      setSelectedImage(
        (selectedImage - 1 + displayImages.length) % displayImages.length
      );
    }
  };

  return (
    <section className="py-20 bg-gray-50 border-green-800 rounded-t-[10rem] rounded-tr-[10rem] h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            {language === "am" ? "ማዕከለ ስዕላት" : "Gallery"}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {language === "am"
              ? "በፎቶ ማዕከለ ስዕላታችን በኩል ዘመናዊ መገልገያዎቻችንን እና ደማቅ ቦታዎቻችንን ያስሱ"
              : "Explore our modern facilities and vibrant spaces through our photo gallery"}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {displayImages.map((image, index) => (
            <div
              key={image.id}
              className="relative overflow-hidden rounded-xl cursor-pointer group"
              onClick={() => {
                openLightbox(index);
                console.log("clickedk");
              }}
            >
              <img
                src={`storage/${image.image}`}
                alt={image.title}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <div className="w-6 h-6 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <h3 className="text-white font-semibold text-lg">
                  {image.title}
                </h3>
                <p className="text-white/80 text-sm">{image.sector}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12 max-w-2xl mx-auto">
          <p className="text-gray-700 text-lg mb-6">
            The twelve-floor structure has more than 123 spaces for shops and
            offices. It has a modern well-secured double deck parking with a
            capacity of 500 vehicles at a time.
          </p>
        </div>
        <div className="text-center">
          <Link
            href={"/gallery"}
            className="bg-blue-800 hover:bg-blue-900 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
          >
            {language === "am" ? "ሁሉንም ማዕከለ ስዕላት ይመልከቱ" : "View All Galleries"}
          </Link>
        </div>
      </div>

      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={closeLightbox} // Clicking the background closes the lightbox
        >
          <div
            className="relative max-w-4xl max-h-full"
            onClick={(e) => e.stopPropagation()} // Prevent click from bubbling to outer div
          >
            <img
              src={`storage/${displayImages[selectedImage].image}`}
              alt={displayImages[selectedImage].title}
              className="max-w-full max-h-[80vh] object-contain"
            />

            <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg p-4">
              <h3 className="text-white font-semibold text-lg">
                {displayImages[selectedImage].title}
              </h3>
              <p className="text-white/80 text-sm">
                {displayImages[selectedImage].description}
              </p>
              <p className="text-white/60 text-xs mt-1">
                Floor {displayImages[selectedImage].floor_id} •{" "}
                {displayImages[selectedImage].sector}
              </p>
            </div>

            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white bg-black/50 hover:bg-black/70 p-2 rounded-full transition-colors duration-200"
            >
              <X size={24} />
            </button>

            <button
              onClick={goToPrev}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-black/50 hover:bg-black/70 p-2 rounded-full transition-colors duration-200"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-black/50 hover:bg-black/70 p-2 rounded-full transition-colors duration-200"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
