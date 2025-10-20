// import React, { useState, useEffect } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// const Slider = ({ slides, language = "en" }) => {
//   console.log(slides);
//   const [currentSlide, setCurrentSlide] = useState(0);

//   const defaultSlides = [];
//   const displaySlides =
//     slides.length > 0
//       ? slides
//           .filter((slide) => slide.approval)
//           .sort((a, b) => a.priority - b.priority)
//       : defaultSlides;

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % displaySlides.length);
//     }, 5000);
//     return () => clearInterval(timer);
//   }, [displaySlides.length]);

//   const goToSlide = (index) => {
//     setCurrentSlide(index);
//   };

//   const nextSlide = () => {
//     setCurrentSlide((prev) => (prev + 1) % displaySlides.length);
//   };

//   const prevSlide = () => {
//     setCurrentSlide(
//       (prev) => (prev - 1 + displaySlides.length) % displaySlides.length
//     );
//   };

//   if (displaySlides.length === 0) {
//     return (
//       <section className="relative h-screen overflow-hidden bg-gray-200 flex items-center justify-center">
//         <p className="text-gray-500 text-xl">No slides available</p>
//       </section>
//     );
//   }

//   return (
//     <section className="relative h-screen overflow-hidden">
//       <div className="relative w-full h-full">
//         {displaySlides.map((slide, index) => (
//           <div
//             key={slide.id}
//             className={`absolute inset-0 transition-opacity duration-1000 ${
//               index === currentSlide ? "opacity-100" : "opacity-0"
//             }`}
//           >
//             <div
//               className="w-full h-full bg-cover bg-center bg-no-repeat"
//               style={{ backgroundImage: `url(${slide.image})` }}
//             >
//               <div className="absolute inset-0 bg-black/30"></div>
//               <div className="absolute bottom-8 right-8 text-right">
//                 <h2 className="text-4xl lg:text-6xl font-bold text-white drop-shadow-2xl">
//                   {language === "am" ? slide.title_am : slide.title_en}
//                 </h2>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Navigation arrows */}
//       <button
//         onClick={prevSlide}
//         className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300"
//       >
//         <ChevronLeft size={24} />
//       </button>
//       <button
//         onClick={nextSlide}
//         className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300"
//       >
//         <ChevronRight size={24} />
//       </button>

//       {/* Slide indicators */}
//       <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
//         {displaySlides.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => goToSlide(index)}
//             className={`w-3 h-3 rounded-full transition-all duration-300 ${
//               index === currentSlide ? "bg-white" : "bg-white/50"
//             }`}
//           />
//         ))}
//       </div>
//     </section>
//   );
// };

// export default Slider;
// import React, { useState, useEffect } from "react";

// const Slider = ({ slides = [], language = "en" }) => {
//   const [currentItems, setCurrentItems] = useState([]);
//   const [isPaused, setIsPaused] = useState(false);

//   const displaySlides = slides.length > 0 ? slides : null;

//   useEffect(() => {
//     setCurrentItems(displaySlides);
//   }, [displaySlides]);

//   // Auto-advance timer
//   useEffect(() => {
//     if (isPaused || !displaySlides || displaySlides.length === 0) return;

//     const timer = setInterval(() => {
//       handleNext();
//     }, 5000); // Change slide every 5 seconds

//     return () => clearInterval(timer);
//   }, [isPaused, displaySlides]);

//   const handleNext = () => {
//     setCurrentItems((prev) => {
//       const newItems = [...prev];
//       const firstItem = newItems.shift();
//       return [...newItems, firstItem];
//     });
//   };

//   const handlePrev = () => {
//     setCurrentItems((prev) => {
//       const newItems = [...prev];
//       const lastItem = newItems.pop();
//       return [lastItem, ...newItems];
//     });
//   };

//   const togglePause = () => {
//     setIsPaused(!isPaused);
//   };

//   if (displaySlides.length === 0) {
//     return (
//       <div className="flex items-center justify-center h-screen bg-gray-300">
//         <p className="text-gray-600 text-xl">No slides available</p>
//       </div>
//     );
//   }

//   return (
//     <div
//       className="relative max-w- h-screen bg-gray-300 overflow-hidden"
//       onMouseEnter={() => setIsPaused(true)} // Pause on hover
//       onMouseLeave={() => setIsPaused(false)} // Resume when mouse leaves
//     >
//       <div className="absolute inset-0">
//         {currentItems.map((slide, index) => (
//           <div
//             key={slide.id}
//             className={`
//               absolute transition-all duration-500 ease-in-out
//               bg-cover bg-center bg-no-repeat
//               ${
//                 index === 0 || index === 1
//                   ? "inset-0" // Full screen
//                   : index === 2
//                   ? "bottom-8 left-[calc(60%+110px)] transform -translate-x-1/2 w-48 h-60 rounded-2xl shadow-2xl shadow-gray-600"
//                   : index === 3
//                   ? "bottom-8 left-[calc(60%+220px)] w-48 h-60 rounded-2xl shadow-2xl shadow-gray-600"
//                   : index === 4
//                   ? "bottom-8 left-[calc(60%+440px)] w-48 h-60 rounded-2xl shadow-2xl shadow-gray-600"
//                   : index === 5
//                   ? "bottom-8 left-[calc(60%+660px)] w-48 h-60 rounded-2xl shadow-2xl shadow-gray-600 opacity-0"
//                   : "bottom-8 left-[calc(60%+660px)] w-48 h-60 rounded-2xl shadow-2xl shadow-gray-600 opacity-0"
//               }
//             `}
//             style={{ backgroundImage: `url(${slide.image})` }}
//           >
//             {(index === 0 || index === 1) && (
//               <div className="absolute inset-0 bg-black/20"></div>
//             )}

//             <div
//               className={`
//                 absolute top-1/2 left-24 transform -translate-y-1/2
//                 w-72 text-left text-white font-sans z-10
//                 ${index === 1 ? "block" : "hidden"}
//               `}
//             >
//               <div className="name flex flex-col gap-12 mt-8">
//                 <div className="text-4xl font-bold uppercase opacity-0 animate-fade-in-up text-nowrap">
//                   {slide.title_en}
//                 </div>
//                 <div className="text-4xl font-bold uppercase opacity-0 animate-fade-in-up text-nowrap">
//                   {slide.title_am}
//                 </div>
//               </div>
//               <div className="des mt-2 mb-5 opacity-0 animate-fade-in-up animation-delay-300">
//                 {language === "am"
//                   ? slide.description_am || slide.description_en
//                   : slide.description_en}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Pause/Play Button */}
//       <div className="absolute top-8 right-8 z-30">
//         <button
//           onClick={togglePause}
//           className="w-10 h-10 rounded-full bg-white/60 border-2 border-gray-700 flex items-center justify-center transition-all duration-300 hover:bg-white hover:scale-110"
//           title={isPaused ? "Play auto-advance" : "Pause auto-advance"}
//         >
//           {isPaused ? "▶" : "⏸"}
//         </button>
//       </div>

//       {/* Navigation Buttons */}
//       <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 flex gap-5 items-center text-center z-20">
//         <button
//           onClick={handlePrev}
//           className="w-10 h-9 rounded-lg border-2 border-gray-700 bg-white/60 transition-all duration-300 hover:text-black hover:border-white/70 hover:scale-110 active:scale-105 focus:scale-110 focus:bg-white focus:border-white/70 flex items-center justify-center"
//         >
//           <span className="pr-1">◁</span>
//         </button>

//         {/* Progress indicator */}
//         <div className="flex gap-1">
//           {displaySlides.map((_, idx) => (
//             <div
//               key={idx}
//               className={`w-2 h-2 rounded-full transition-all duration-300 ${
//                 idx ===
//                 (currentItems[0]
//                   ? displaySlides.findIndex(
//                       (slide) => slide.id === currentItems[0].id
//                     )
//                   : 0)
//                   ? "bg-white scale-125"
//                   : "bg-white/40"
//               }`}
//             />
//           ))}
//         </div>

//         <button
//           onClick={handleNext}
//           className="w-10 h-9 rounded-lg border-2 border-gray-700 bg-white/60 transition-all duration-300 hover:text-black hover:border-white/70 hover:scale-110 active:scale-105 focus:scale-110 focus:bg-white focus:border-white/70 flex items-center justify-center"
//         >
//           <span className="pl-1">▷</span>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Slider;

import { useEffect, useRef, useCallback, useState } from "react";
import "./carousel.css";

export default function Slides({ slides = [] }) {
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
  const allSlides = slides;

  // Get thumbnail slides based on current position (show next 4 slides in queue)
  const getThumbnailSlides = () => {
    if (allSlides.length <= 4) return allSlides;

    const thumbnailSlides = [];
    for (let i = 1; i <= 4; i++) {
      const index = (currentIndex + i) % allSlides.length;
      thumbnailSlides.push(allSlides[index]);
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

  useEffect(() => {
    runAutoRef.current = setTimeout(() => showSlider("next"), timeAutoNext);

    return () => {
      clearTimeout(runTimeoutRef.current);
      clearTimeout(runAutoRef.current);
    };
  }, [showSlider, timeAutoNext]);

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
