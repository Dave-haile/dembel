import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Clock,
  Instagram,
} from "lucide-react";
import MainLayout from "../Shared/MainLayout";
import { Head } from "@inertiajs/react";

const Gallery = ({ gallery = [] }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [lightboxImage, setLightboxImage] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const galleryRef = useRef(null);

  const defaultImages = [];

  const normalizedImages = useMemo(() => {
    const source =
      gallery && Array.isArray(gallery) && gallery.length > 0
        ? gallery
        : defaultImages;
    return source.map((item) => {
      const isApproved =
        typeof item.approval === "boolean"
          ? item.approval
          : item.approval === 1;
      const imageSrc =
        typeof item.image === "string" && /^https?:\/\//i.test(item.image)
          ? item.image
          : item.image
          ? `/${item.image}`
          : item.image;
      return {
        ...item,
        approval: isApproved,
        image: imageSrc,
        sector: item.sector ?? "",
      };
    });
  }, [gallery]);

  const displayImages = useMemo(() => {
    return normalizedImages.filter((img) => img.approval);
  }, [normalizedImages]);

  const categories = useMemo(() => {
    const unique = Array.from(
      new Set(displayImages.map((img) => img.category).filter(Boolean))
    );
    return ["All", ...unique];
  }, [displayImages]);

  const filteredImages = useMemo(() => {
    if (selectedCategory === "All") return displayImages;
    return displayImages.filter((img) => img.category === selectedCategory);
  }, [selectedCategory, displayImages]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    e.currentTarget.style.setProperty("--x", `${x}px`);
    e.currentTarget.style.setProperty("--y", `${y}px`);
  };

  const openLightbox = (index) => {
    setLightboxImage(index);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  const nextImage = () => {
    if (lightboxImage !== null) {
      setLightboxImage((lightboxImage + 1) % filteredImages.length);
    }
  };

  const prevImage = () => {
    if (lightboxImage !== null) {
      setLightboxImage(
        (lightboxImage - 1 + filteredImages.length) % filteredImages.length
      );
    }
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (lightboxImage !== null) {
        if (e.key === "Escape") closeLightbox();
        if (e.key === "ArrowRight") nextImage();
        if (e.key === "ArrowLeft") prevImage();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [lightboxImage]);

  const socialImages = [
    "https://images.pexels.com/photos/1797161/pexels-photo-1797161.jpeg?auto=compress&cs=tinysrgb&w=300&h=300",
    "https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=300&h=300",
    "https://images.pexels.com/photos/264507/pexels-photo-264507.jpeg?auto=compress&cs=tinysrgb&w=300&h=300",
    "https://images.pexels.com/photos/1797161/pexels-photo-1797161.jpeg?auto=compress&cs=tinysrgb&w=300&h=300",
    "https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=300&h=300",
    "https://images.pexels.com/photos/264507/pexels-photo-264507.jpeg?auto=compress&cs=tinysrgb&w=300&h=300",
    "https://images.pexels.com/photos/1797161/pexels-photo-1797161.jpeg?auto=compress&cs=tinysrgb&w=300&h=300",
    "https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=300&h=300",
  ];

  return (
    <MainLayout>
      <Head title="Gallery - Dembel City Center" />
      <div className="min-h-screen bg-gray-50">
        <section className="relative h-screen overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-fixed"
            style={{
              backgroundImage:
                "url(https://images.pexels.com/photos/1797161/pexels-photo-1797161.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60"></div>
          </div>

          <div
            className={`relative z-10 h-full flex items-center justify-center text-center transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="max-w-4xl mx-auto px-4">
              <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 drop-shadow-2xl">
                Mall Gallery
              </h1>
              <p className="text-xl lg:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed drop-shadow-lg">
                Explore the beauty, lifestyle, and energy of Dembel City Center
              </p>
            </div>
          </div>
        </section>

        {/* Gallery Section Container */}
        <div className="relative">
          <section className="sticky top-16 z-30 bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="flex flex-wrap justify-center gap-4">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                      selectedCategory === category
                        ? "bg-blue-600 text-white shadow-lg transform scale-105"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div
                ref={galleryRef}
                className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6"
              >
                {filteredImages.map((image, index) => (
                  <div
                    key={image.id}
                    className="break-inside-avoid relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                    onClick={() => openLightbox(index)}
                    onMouseMove={handleMouseMove}
                    onMouseEnter={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const x = e.clientX - rect.left;
                      const y = e.clientY - rect.top;
                      e.currentTarget.style.setProperty("--x", `${x}px`);
                      e.currentTarget.style.setProperty("--y", `${y}px`);
                    }}
                    style={{
                      "--x": "50%",
                      "--y": "50%",
                    }}
                  >
                    <img
                      src={`${image.image}`}
                      alt={image.title}
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />

                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out"
                      style={{
                        background: `radial-gradient(circle 300px at var(--x) var(--y), rgba(59, 130, 246, 0.8) 0%, rgba(0, 0, 0, 0.7) 40%, rgba(0, 0, 0, 0.9) 100%)`,
                      }}
                    ></div>

                    <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                      <div className="text-center px-4 max-w-full">
                        <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 mb-3">
                          <span className="text-white text-xs font-medium uppercase tracking-wider">
                            {image.category}
                          </span>
                        </div>
                        <h3 className="text-white text-xl font-bold mb-2 drop-shadow-2xl leading-tight">
                          {image.title}
                        </h3>
                        <p className="text-white/90 text-sm drop-shadow-lg mb-2 leading-relaxed">
                          {image.description}
                        </p>
                        <div className="flex items-center justify-center space-x-4 text-white/70 text-xs">
                          <span className="flex items-center">
                            <svg
                              className="w-3 h-3 mr-1"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            Floor {image.floor_id}
                          </span>
                          <span>•</span>
                          <span>{image.sector}</span>
                        </div>
                        <div className="mt-4 w-12 h-0.5 bg-white/50 mx-auto rounded-full"></div>
                      </div>
                    </div>

                    <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 delay-200 transform scale-0 group-hover:scale-100">
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                #DembelMoments
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Follow us on Instagram for the latest updates and
                behind-the-scenes moments
              </p>
              <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-1 inline-flex items-center">
                <Instagram size={20} className="mr-2" />
                Follow Us
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
              {socialImages.map((image, index) => (
                <div
                  key={index}
                  className="aspect-square overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group"
                >
                  <img
                    src={image}
                    alt={`Instagram post ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-r from-blue-800 to-blue-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Come Experience It Yourself
            </h2>
            <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
              Visit Dembel City Center today and discover why we&apos;re the
              premier destination for shopping, dining, and entertainment
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="bg-white text-blue-800 hover:bg-blue-50 px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-1 inline-flex items-center justify-center">
                <MapPin size={20} className="mr-2" />
                Get Directions
              </button>
              <button className="bg-blue-700 hover:bg-blue-600 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-1 inline-flex items-center justify-center border-2 border-blue-600">
                <Clock size={20} className="mr-2" />
                View Mall Hours
              </button>
            </div>
          </div>
        </section>

        {lightboxImage !== null && (
          <div
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <div className="relative max-w-6xl max-h-full">
              <img
                src={`${filteredImages[lightboxImage].image}`}
                alt={filteredImages[lightboxImage].title}
                className="max-w-full max-h-[85vh] object-contain rounded-lg"
              />

              <div className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-sm rounded-lg p-4">
                <h3 className="text-white font-semibold text-lg mb-1">
                  {filteredImages[lightboxImage].title}
                </h3>
                <div className="flex items-center space-x-2 text-white/80 text-sm mb-2">
                  <span className="bg-blue-500/20 px-2 py-1 rounded text-xs">
                    {filteredImages[lightboxImage].category}
                  </span>
                  <span>•</span>
                  <span>Floor {filteredImages[lightboxImage].floor_id}</span>
                  <span>•</span>
                  <span>{filteredImages[lightboxImage].sector}</span>
                </div>
                <p className="text-white/90 text-sm leading-relaxed">
                  {filteredImages[lightboxImage].description}
                </p>
                {filteredImages[lightboxImage].created_at && (
                  <p className="text-white/60 text-xs mt-2">
                    Added{" "}
                    {new Date(
                      filteredImages[lightboxImage].created_at
                    ).toLocaleDateString()}
                  </p>
                )}
              </div>

              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 text-white bg-black/50 hover:bg-black/70 p-3 rounded-full transition-colors duration-200"
              >
                <X size={24} />
              </button>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              tabIndex={-1}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-black/50 hover:bg-gray-600 p-3 rounded-full transition-colors duration-200"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-black/50 hover:bg-gray-600 p-3 rounded-full transition-colors duration-200"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Gallery;
