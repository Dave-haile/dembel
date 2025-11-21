import React, { useState, useEffect, useRef, useMemo } from "react";
import MainLayout from "../Shared/MainLayout";
import { Head } from "@inertiajs/react";
import GalleryHeader from "./components/GalleryHeader";
import CategoryFilter from "./components/CategoryFilter";
import GalleryImage from "./components/GalleryImage";
import InstagramFeed from "./components/InstagramFeed";
import VisitUs from "./components/VisitUs";
import Lightbox from "./components/Lightbox";

const Gallery = ({ gallery = [], instagram = [] }) => {
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
  }, [lightboxImage, closeLightbox, nextImage, prevImage]);

  return (
    <MainLayout>
      <Head title="Gallery - Dembel City Center" />
      <div className="min-h-screen bg-gray-50">
        <GalleryHeader isVisible={isVisible} />

        {/* Gallery Section Container */}
        <div className="relative">
          <CategoryFilter 
            categories={categories} 
            selectedCategory={selectedCategory} 
            onSelectCategory={setSelectedCategory} 
          />

          <section className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div
                ref={galleryRef}
                className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6"
              >
                {filteredImages.map((image, index) => (
                  <GalleryImage
                    key={image.id}
                    image={image}
                    onClick={() => openLightbox(index)}
                    onMouseMove={handleMouseMove}
                  />
                ))}
              </div>
            </div>
          </section>
        </div>

        <InstagramFeed instagram={instagram} />
        <VisitUs />

        {lightboxImage !== null && (
          <Lightbox
            isOpen={lightboxImage !== null}
            image={filteredImages[lightboxImage]}
            onClose={closeLightbox}
            onNext={nextImage}
            onPrev={prevImage}
          />
        )}
      </div>
    </MainLayout>
  );
};

export default Gallery;
