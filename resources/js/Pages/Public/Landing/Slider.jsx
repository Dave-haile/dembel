import { useRef, useCallback, useState } from "react";
import "./carousel.css";

// Loading spinner component
// const LoadingSpinner = () => (
//   <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-50">
//     <div className="relative w-20 h-20">
//       <div className="absolute inset-0 border-4 border-t-transparent border-primary-500 rounded-full animate-spin"></div>
//       <div className="absolute inset-2 border-4 border-b-transparent border-primary-300 rounded-full animate-spin animation-delay-200"></div>
//     </div>
//   </div>
// );

const Slides = ({ slides }) => {
  const carouselRef = useRef(null);
  const listRef = useRef(null);
  const thumbnailRef = useRef(null);
  const nextBtnRef = useRef(null);
  const prevBtnRef = useRef(null);

  // State to track current position for thumbnail management
  const [currentIndex, setCurrentIndex] = useState(0);

  const timeRunning = 3000;
  const timeAutoNext = 7000;
  let runTimeoutRef = useRef();
  let runAutoRef = useRef();

  // Use all slides for main carousel
  const allSlides = slides || [];

  // Get thumbnail slides based on current position (show next 4 slides in queue)
  const getThumbnailSlides = () => {
    if (!allSlides || allSlides.length === 0) return [];
    if (allSlides.length <= 4) return [...allSlides];

    const thumbnailSlides = [];
    for (let i = 1; i <= 4; i++) {
      const index = (currentIndex + i) % allSlides.length;
      if (allSlides[index]) {
        thumbnailSlides.push(allSlides[index]);
      }
    }
    return thumbnailSlides;
  };

  const thumbnailSlides = getThumbnailSlides();

  const showSlider = useCallback(
    (type) => {
      const carousel = carouselRef.current;
      const list = listRef.current;

      if (!carousel || !list || allSlides.length === 0) return;

      const listItems = list.querySelectorAll(".item");
      if (listItems.length === 0) return;

      // Update current index
      if (type === "next") {
        setCurrentIndex((prev) => (prev + 1) % allSlides.length);
        list.appendChild(listItems[0]);
        carousel.classList.add("next");
      } else {
        setCurrentIndex(
          (prev) => (prev - 1 + allSlides.length) % allSlides.length
        );
        list.prepend(listItems[listItems.length - 1]);
        carousel.classList.add("prev");
      }

      clearTimeout(runTimeoutRef.current);
      runTimeoutRef.current = setTimeout(() => {
        carousel.classList.remove("next");
        carousel.classList.remove("prev");
      }, timeRunning);

      clearTimeout(runAutoRef.current);
      runAutoRef.current = setTimeout(() => {
        const nextCarousel = carouselRef.current;
        const nextList = listRef.current;
        const nextListItems = nextList?.querySelectorAll(".item");

        if (nextListItems?.length > 0) {
          setCurrentIndex((prev) => (prev + 1) % allSlides.length);
          nextList.appendChild(nextListItems[0]);
          nextCarousel.classList.add("next");

          clearTimeout(runTimeoutRef.current);
          runTimeoutRef.current = setTimeout(() => {
            nextCarousel.classList.remove("next");
            nextCarousel.classList.remove("prev");
          }, timeRunning);
        }
      }, timeAutoNext);
    },
    [timeRunning, timeAutoNext, allSlides.length]
  );

  const handleNext = () => showSlider("next");
  const handlePrev = () => showSlider("prev");

  // Key to force re-render of thumbnails when currentIndex changes
  const thumbnailKey = `thumbnails-${currentIndex}`;


  return (
    <div
      className="carousel relative h-screen w-full overflow-x-hidden bg-black text-neutral-200 z-10"
      ref={carouselRef}
      style={{ margin: 0, padding: 0, maxWidth: "100vw" }}
    >
      <div className="list absolute inset-0" ref={listRef}>
        {allSlides.map((slide, idx) => (
          <div className="item absolute inset-0" key={slide?.id ?? idx}>
            <img
              src={`/${slide.image}`}
              alt="slide"
              className="w-full h-full object-cover"
            />
            <div className="content absolute top-[20%] left-1/2 -translate-x-[60%] w-[1140px] max-w-[80%] pr-[30%] box-border text-white [text-shadow:0_5px_10px_rgba(0,0,0,0.266)]">
              <div className="title text-[5em] font-bold leading-[1.3em]">
                {slide.title_en}
              </div>
              <div className="topic text-[4em] font-bold leading-[1.3em] text-[#f1683a]">
                {slide.title_am}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        className="thumbnail absolute bottom-[130px] left-[80%] -translate-x-1/2 w-max z-40 flex gap-5 max-w-[90vw] overflow-hidden"
        ref={thumbnailRef}
        key={thumbnailKey}
      >
        {thumbnailSlides.map((slide, idx) => (
          <div
            className="item relative w-[150px] h-[220px] shrink-0"
            key={`${slide?.id}-${currentIndex}-${idx}`}
          >
            <img
              src={`/${slide.image}`}
              alt={slide.title_en || "thumb"}
              className="w-full h-full object-cover rounded-[20px]"
            />
            <div className="content text-white absolute bottom-[10px] left-[10px] right-[10px]">
              <div className="title font-medium">{slide.title_en}</div>
              <div className="description font-light">{slide.title_am} </div>
            </div>
          </div>
        ))}
      </div>

      <div className="arrows absolute top-[80%] right-[52%] z-40 w-[300px] max-w-[30%] flex gap-4 items-center">
        <button
          id="prev"
          ref={prevBtnRef}
          onClick={handlePrev}
          className="w-14 h-14 rounded-full bg-gray-800/80 border-2 border-gray-600 text-white text-xl font-bold transition-all duration-300 hover:bg-gray-700 hover:border-gray-500 hover:scale-110 pointer-events-auto shadow-lg"
        >
          {"<"}
        </button>
        <button
          id="next"
          ref={nextBtnRef}
          onClick={handleNext}
          className="w-14 h-14 rounded-full bg-gray-800/80 border-2 border-gray-600 text-white text-xl font-bold transition-all duration-300 hover:bg-gray-700 hover:border-gray-500 hover:scale-110 pointer-events-auto shadow-lg"
        >
          {">"}
        </button>
      </div>
    </div>
  );
}

export default Slides;

// import React, { useState, useEffect } from "react";
// import { ArrowRight, ChevronRight } from "lucide-react";

// export default function Hero({ slides: HERO_SLIDES }) {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [isAutoPlay, setIsAutoPlay] = useState(true);

//   useEffect(() => {
//     if (!isAutoPlay) return;

//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
//     }, 5000);

//     return () => clearInterval(interval);
//   }, [isAutoPlay]);

//   const goToSlide = (index) => {
//     setCurrentSlide(index);
//     setIsAutoPlay(false);
//   };

//   const nextSlide = () => {
//     setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
//     setIsAutoPlay(false);
//   };

//   const prevSlide = () => {
//     setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
//     setIsAutoPlay(false);
//   };

//   const handleMouseEnter = () => setIsAutoPlay(false);
//   const handleMouseLeave = () => setIsAutoPlay(true);

//   return (
//     <section
//       className="relative h-screen min-h-[600px] overflow-hidden bg-black"
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//     >
//       {/* Slides Container */}
//       <div className="relative w-full h-full">
//         {HERO_SLIDES.map((slide, index) => (
//           <div
//             key={slide.id}
//             className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'
//               }`}
//           >
//             {/* Background Image */}
//             <img
//               src={slide.image}
//               alt={slide.alt}
//               className="w-full h-full object-cover"
//             />

//             {/* Dark Overlay */}
//             <div className="absolute inset-0 bg-gradient-to-r from-[#303890]/70 via-[#303890]/50 to-[#303890]/60" />

//             {/* Content Container */}
//             <div className="absolute inset-0 flex flex-col items-center justify-center px-4 md:px-8">
//               <div className="max-w-3xl text-center">
//                 {/* Animated Headline */}
//                 <h1
//                   className={`text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 md:mb-6 drop-shadow-2xl transition-all duration-700 transform ${index === currentSlide ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
//                     }`}
//                   style={{ fontFamily: 'Poppins, sans-serif', textShadow: '0 4px 20px rgba(0,0,0,0.4)' }}
//                 >
//                   {slide.title_en}
//                 </h1>

//                 {/* Animated Subheadline */}
//                 <p
//                   className={`text-lg md:text-xl lg:text-2xl text-white/95 mb-8 md:mb-12 drop-shadow-lg transition-all duration-700 delay-100 transform ${index === currentSlide ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
//                     }`}
//                   style={{ fontFamily: 'Inter, sans-serif' }}
//                 >
//                   {slide.title_am}
//                 </p>

//                 {/* Animated CTA Button */}
//                 <button
//                   onClick={() => (window.location.href = slide.buttonUrl)}
//                   className={`inline-flex items-center gap-2 bg-[#fbee21] text-[#303890] px-8 md:px-10 py-4 md:py-5 rounded-2xl font-bold text-base md:text-lg hover:bg-[#fef856] transition-all duration-300 hover:shadow-2xl hover:scale-105 active:scale-95 transform ${index === currentSlide ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
//                     }`}
//                   style={{ fontFamily: 'Inter, sans-serif', transitionDelay: '200ms' }}
//                 >
//                   {slide.buttonText}
//                   <ArrowRight size={20} />
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Navigation Buttons - Left */}
//       <button
//         onClick={prevSlide}
//         className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#fbee21] focus:ring-offset-2"
//         aria-label="Previous slide"
//       >
//         <ChevronRight size={28} className="text-white -rotate-180" />
//       </button>

//       {/* Navigation Buttons - Right */}
//       <button
//         onClick={nextSlide}
//         className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#fbee21] focus:ring-offset-2"
//         aria-label="Next slide"
//       >
//         <ChevronRight size={28} className="text-white" />
//       </button>

//       {/* Slide Indicators - Bottom */}
//       <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2 md:gap-3">
//         {HERO_SLIDES.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => goToSlide(index)}
//             className={`transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#fbee21] focus:ring-offset-2 ${index === currentSlide
//               ? 'w-8 md:w-10 h-2 md:h-3 bg-[#fbee21]'
//               : 'w-2 md:w-3 h-2 md:h-3 bg-white/50 hover:bg-white/75'
//               }`}
//             aria-label={`Go to slide ${index + 1}`}
//             aria-current={index === currentSlide ? 'true' : 'false'}
//           />
//         ))}
//       </div>

//       {/* Scroll Indicator */}
//       <div className="absolute bottom-24 md:bottom-32 left-1/2 -translate-x-1/2 z-20 animate-bounce">
//         <ChevronRight size={28} className="text-white/60 rotate-90" />
//       </div>

//       {/* Slide Counter */}
//       <div className="absolute top-6 md:top-8 right-4 md:right-8 z-20 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-white font-semibold" style={{ fontFamily: 'Inter, sans-serif' }}>
//         {String(currentSlide + 1).padStart(2, '0')} / {String(HERO_SLIDES.length).padStart(2, '0')}
//       </div>
//     </section>
//   );
// };