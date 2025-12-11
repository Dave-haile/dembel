/* eslint-disable no-unused-vars */
import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
import { gsap } from "gsap";
import {
  ChevronLeft,
  ChevronRight,
  Loader2,
  Pause,
  Play,
  ArrowRight,
} from "lucide-react";
import DembelLoader, {
  LoadingAnimation,
  LoadingScreen,
} from "../Shared/Loader";

// Preload images to prevent lag/pop-in
const useImagePreloader = (images) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let count = 0;
    const total = images.length;

    if (total === 0) {
      setLoaded(true);
      return;
    }

    const imgElements = images.map((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        count++;
        if (count === total) setLoaded(true);
      };
      img.onerror = () => {
        count++;
        if (count === total) setLoaded(true);
      };
      return img;
    });

    return () => {
      imgElements.forEach((img) => {
        img.onload = null;
        img.onerror = null;
      });
    };
  }, [images]);

  return loaded;
};

const HeroSlider = ({ slides = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const containerRef = useRef(null);
  const slideRefs = useRef([]);
  const textRefs = useRef([]);
  const imageRefs = useRef([]);

  // Ref to track z-index for rapid stacking
  const zIndexRef = useRef(10);

  const images = slides.map((s) => s.image);
  const isLoaded = useImagePreloader(images);

  // Initialize GSAP states
  useLayoutEffect(() => {
    if (!isLoaded || slides.length === 0) return;

    const ctx = gsap.context(() => {
      // Set initial states
      slideRefs.current.forEach((slide, i) => {
        if (slide) {
          if (i === 0) {
            // First slide visible
            gsap.set(slide, { zIndex: 2, clipPath: "circle(150% at 50% 50%)" });
            if (imageRefs.current[i]) {
              gsap.to(imageRefs.current[i], {
                scale: 1.1,
                duration: 10,
                ease: "none",
              });
            }
          } else {
            // Others hidden
            gsap.set(slide, { zIndex: 1, clipPath: "circle(0% at 50% 50%)" });
          }
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isLoaded, slides]);

  // Handle Slide Change
  const changeSlide = (nextIndex) => {
    // Allow rapid clicking by removing isAnimating check
    if (nextIndex === currentIndex || !containerRef.current) return;

    // Increment z-index so the new slide always sits on top of whatever is currently happening
    zIndexRef.current += 1;
    const newZIndex = zIndexRef.current;

    const currentSlide = slideRefs.current[currentIndex];
    const nextSlide = slideRefs.current[nextIndex];
    const nextImage = imageRefs.current[nextIndex];

    const currentText = textRefs.current[currentIndex];
    const nextText = textRefs.current[nextIndex];

    const ctx = gsap.context(() => {
      // 1. Prepare Next Slide
      // Ensure previous tweens on this slide are killed so we can restart cleanly
      gsap.killTweensOf(nextSlide);
      gsap.killTweensOf(nextImage);
      if (nextText) gsap.killTweensOf(nextText.children);

      // Set to top and closed circle
      gsap.set(nextSlide, {
        zIndex: newZIndex,
        clipPath: "circle(0% at 50% 50%)",
      });
      gsap.set(nextImage, { scale: 1 });

      // 2. Animate Spotlight (Faster: 0.8s)
      gsap.to(nextSlide, {
        clipPath: "circle(150% at 50% 50%)",
        duration: 0.8, // Reduced from 1.5s
        ease: "power3.inOut", // Snappier ease
      });

      // 3. Start Ken Burns on new image
      gsap.to(nextImage, {
        scale: 1.1,
        duration: 10,
        ease: "none",
      });

      // 4. Text Animations
      if (currentText) {
        gsap.to(currentText.children, {
          y: -30,
          opacity: 0,
          duration: 0.4, // Fast exit
          stagger: 0.05,
          ease: "power2.in",
        });
      }

      if (nextText) {
        gsap.set(nextText.children, { y: 30, opacity: 0 });
        gsap.to(nextText.children, {
          y: 0,
          opacity: 1,
          duration: 0.6, // Fast entry
          stagger: 0.08,
          delay: 0.15, // Start sooner
          ease: "power3.out",
        });
      }
    }, containerRef);

    // Update state immediately
    setCurrentIndex(nextIndex);
  };

  const nextSlide = () => changeSlide((currentIndex + 1) % slides.length);
  const prevSlide = () =>
    changeSlide((currentIndex - 1 + slides.length) % slides.length);

  // Auto-play logic
  useEffect(() => {
    if (!isLoaded || !isPlaying) return;

    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [currentIndex, isLoaded, isPlaying]);

  const handleExplore = (e) => {
    e.preventDefault();
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

  if (!isLoaded) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-slate-950 text-white"
    >
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          ref={(el) => {
            slideRefs.current[index] = el;
          }}
          className="absolute inset-0 w-full h-full"
          // We rely on GSAP for z-indices, avoid inline styles here to prevent React hydration mismatches or overwrites
        >
          {/* Background Image */}
          <div className="absolute inset-0 bg-black">
            <img
              ref={(el) => {
                imageRefs.current[index] = el;
              }}
              src={slide.image}
              alt={slide.title_en}
              className="w-full h-full object-cover opacity-80"
              loading="eager"
            />
          </div>

          {/* Gradient Overlay for Readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent pointer-events-none" />

          {/* Content */}
          <div className="absolute inset-0 container mx-auto px-6 md:px-12 flex flex-col justify-center h-full z-20">
            <div
              ref={(el) => {
                textRefs.current[index] = el;
              }}
              className="max-w-3xl"
            >
              <div className="overflow-hidden mb-4">
                <h4 className="text-yellow-400 font-bold tracking-[0.2em] uppercase text-sm md:text-base">
                  {slide.title_am}
                </h4>
              </div>
              <div className="overflow-hidden mb-6">
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-black leading-tight tracking-tighter text-white">
                  {slide.title_en}
                </h1>
              </div>
              <div className="overflow-hidden mb-10">
                <p className="text-slate-300 text-lg md:text-xl leading-relaxed max-w-xl">
                  {slide.description}
                </p>
              </div>
              <div className="overflow-hidden">
                <button
                  onClick={handleExplore}
                  className="group inline-flex items-center gap-3 bg-white text-slate-950 px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-400 transition-colors duration-300"
                >
                  Explore Dembel
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Controls */}
      <div className="absolute bottom-12 left-0 w-full z-30 container mx-auto px-6 md:px-12 flex justify-between items-end">
        {/* Progress / Counter */}
        <div className="flex items-end gap-2 text-white/50 font-mono text-sm">
          <span className="text-white text-3xl font-bold leading-none">
            {String(currentIndex + 1).padStart(2, "0")}
          </span>
          <span className="mb-1">/</span>
          <span className="mb-1">{String(slides.length).padStart(2, "0")}</span>
        </div>

        {/* Controls */}
        <div className="flex gap-4 items-center mb-16">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-14 h-14 rounded-full border border-white/20 bg-white/5 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all group active:scale-95"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 text-white" />
            ) : (
              <Play className="w-5 h-5 text-white ml-0.5" />
            )}
          </button>

          <div className="w-px h-8 bg-white/20 mx-2 hidden md:block"></div>

          <button
            onClick={prevSlide}
            className="w-14 h-14 rounded-full border border-white/20 bg-white/5 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all group active:scale-95"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-6 h-6 text-white group-hover:-translate-x-0.5 transition-transform" />
          </button>
          <button
            onClick={nextSlide}
            className="w-14 h-14 rounded-full border border-white/20 bg-white/5 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all group active:scale-95"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-6 h-6 text-white group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* Pagination Lines (Visual Indicator) */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col gap-4">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => changeSlide(idx)}
            className={`w-1 h-12 rounded-full transition-all duration-500 ${
              idx === currentIndex
                ? "bg-yellow-400 h-20"
                : "bg-white/20 hover:bg-white/50"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
