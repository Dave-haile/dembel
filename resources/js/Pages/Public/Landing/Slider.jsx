import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Slider = ({ slides, language = "en" }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const defaultSlides = [];
  const displaySlides =
    slides.length > 0
      ? slides
          .filter((slide) => slide.approval)
          .sort((a, b) => a.priority - b.priority)
      : defaultSlides;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % displaySlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [displaySlides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % displaySlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + displaySlides.length) % displaySlides.length
    );
  };

  if (displaySlides.length === 0) {
    return (
      <section className="relative h-screen overflow-hidden bg-gray-200 flex items-center justify-center">
        <p className="text-gray-500 text-xl">No slides available</p>
      </section>
    );
  }

  return (
    <section className="relative h-screen overflow-hidden">
      <div className="relative w-full h-full">
        {displaySlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-black/30"></div>
              <div className="absolute bottom-8 right-8 text-right">
                <h2 className="text-4xl lg:text-6xl font-bold text-white drop-shadow-2xl">
                  {language === "am" ? slide.title_am : slide.title_en}
                </h2>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300"
      >
        <ChevronRight size={24} />
      </button>

      {/* Slide indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {displaySlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Slider;
