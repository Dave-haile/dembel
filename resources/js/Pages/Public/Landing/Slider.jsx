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
import React, { useState, useEffect } from "react";

const Slider = ({ slides = [], language = "en" }) => {
  const [currentItems, setCurrentItems] = useState([]);
  const [isPaused, setIsPaused] = useState(false);

  const displaySlides = slides.length > 0 ? slides : null;

  useEffect(() => {
    setCurrentItems(displaySlides);
  }, [displaySlides]);

  // Auto-advance timer
  useEffect(() => {
    if (isPaused || !displaySlides || displaySlides.length === 0) return;

    const timer = setInterval(() => {
      handleNext();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, [isPaused, displaySlides]);

  const handleNext = () => {
    setCurrentItems((prev) => {
      const newItems = [...prev];
      const firstItem = newItems.shift();
      return [...newItems, firstItem];
    });
  };

  const handlePrev = () => {
    setCurrentItems((prev) => {
      const newItems = [...prev];
      const lastItem = newItems.pop();
      return [lastItem, ...newItems];
    });
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  if (displaySlides.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-300">
        <p className="text-gray-600 text-xl">No slides available</p>
      </div>
    );
  }

  return (
    <div
      className="relative max-w- h-screen bg-gray-300 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)} // Pause on hover
      onMouseLeave={() => setIsPaused(false)} // Resume when mouse leaves
    >
      <div className="absolute inset-0">
        {currentItems.map((slide, index) => (
          <div
            key={slide.id}
            className={`
              absolute transition-all duration-500 ease-in-out
              bg-cover bg-center bg-no-repeat
              ${
                index === 0 || index === 1
                  ? "inset-0" // Full screen
                  : index === 2
                  ? "bottom-8 left-[calc(60%+110px)] transform -translate-x-1/2 w-48 h-60 rounded-2xl shadow-2xl shadow-gray-600"
                  : index === 3
                  ? "bottom-8 left-[calc(60%+220px)] w-48 h-60 rounded-2xl shadow-2xl shadow-gray-600"
                  : index === 4
                  ? "bottom-8 left-[calc(60%+440px)] w-48 h-60 rounded-2xl shadow-2xl shadow-gray-600"
                  : index === 5
                  ? "bottom-8 left-[calc(60%+660px)] w-48 h-60 rounded-2xl shadow-2xl shadow-gray-600 opacity-0"
                  : "bottom-8 left-[calc(60%+660px)] w-48 h-60 rounded-2xl shadow-2xl shadow-gray-600 opacity-0"
              }
            `}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            {(index === 0 || index === 1) && (
              <div className="absolute inset-0 bg-black/20"></div>
            )}

            <div
              className={`
                absolute top-1/2 left-24 transform -translate-y-1/2
                w-72 text-left text-white font-sans z-10
                ${index === 1 ? "block" : "hidden"}
              `}
            >
              <div className="name flex flex-col gap-12 mt-8">
                <div className="text-4xl font-bold uppercase opacity-0 animate-fade-in-up text-nowrap">
                  {slide.title_en}
                </div>
                <div className="text-4xl font-bold uppercase opacity-0 animate-fade-in-up text-nowrap">
                  {slide.title_am}
                </div>
              </div>
              <div className="des mt-2 mb-5 opacity-0 animate-fade-in-up animation-delay-300">
                {language === "am"
                  ? slide.description_am || slide.description_en
                  : slide.description_en}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pause/Play Button */}
      <div className="absolute top-8 right-8 z-30">
        <button
          onClick={togglePause}
          className="w-10 h-10 rounded-full bg-white/60 border-2 border-gray-700 flex items-center justify-center transition-all duration-300 hover:bg-white hover:scale-110"
          title={isPaused ? "Play auto-advance" : "Pause auto-advance"}
        >
          {isPaused ? "▶" : "⏸"}
        </button>
      </div>

      {/* Navigation Buttons */}
      <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 flex gap-5 items-center text-center z-20">
        <button
          onClick={handlePrev}
          className="w-10 h-9 rounded-lg border-2 border-gray-700 bg-white/60 transition-all duration-300 hover:text-black hover:border-white/70 hover:scale-110 active:scale-105 focus:scale-110 focus:bg-white focus:border-white/70 flex items-center justify-center"
        >
          <span className="pr-1">◁</span>
        </button>

        {/* Progress indicator */}
        <div className="flex gap-1">
          {displaySlides.map((_, idx) => (
            <div
              key={idx}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                idx ===
                (currentItems[0]
                  ? displaySlides.findIndex(
                      (slide) => slide.id === currentItems[0].id
                    )
                  : 0)
                  ? "bg-white scale-125"
                  : "bg-white/40"
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="w-10 h-9 rounded-lg border-2 border-gray-700 bg-white/60 transition-all duration-300 hover:text-black hover:border-white/70 hover:scale-110 active:scale-105 focus:scale-110 focus:bg-white focus:border-white/70 flex items-center justify-center"
        >
          <span className="pl-1">▷</span>
        </button>
      </div>
    </div>
  );
};

export default Slider;
// import React, { useState, useEffect, useRef } from "react";
// import "../../../../css/slider.css";

// const UniqueCarousel = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [isAnimating, setIsAnimating] = useState(false);
//   const autoPlayRef = useRef(null);

//   const slides = [
//     {
//       id: 1,
//       image:
//         "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//       author: "LUNDEV",
//       title: "DESIGN SLIDER",
//       topic: "ANIMAL",
//       description:
//         "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut sequi, rem magnam nesciunt minima placeat, itaque eum neque officiis unde, eaque optio ratione aliquid assumenda facere ab et quasi ducimus aut doloribus non numquam.",
//     },
//     {
//       id: 2,
//       image:
//         "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//       author: "LUNDEV",
//       title: "DESIGN SLIDER",
//       topic: "ANIMAL",
//       description:
//         "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut sequi, rem magnam nesciunt minima placeat, itaque eum neque officiis unde, eaque optio ratione aliquid assumenda facere ab et quasi ducimus aut doloribus non numquam.",
//     },
//     {
//       id: 3,
//       image:
//         "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//       author: "LUNDEV",
//       title: "DESIGN SLIDER",
//       topic: "ANIMAL",
//       description:
//         "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut sequi, rem magnam nesciunt minima placeat, itaque eum neque officiis unde, eaque optio ratione aliquid assumenda facere ab et quasi ducimus aut doloribus non numquam.",
//     },
//     {
//       id: 4,
//       image:
//         "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//       author: "LUNDEV",
//       title: "DESIGN SLIDER",
//       topic: "ANIMAL",
//       description:
//         "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut sequi, rem magnam nesciunt minima placeat, itaque eum neque officiis unde, eaque optio ratione aliquid assumenda facere ab et quasi ducimus aut doloribus non numquam.",
//     },
//   ];

//   const nextSlide = () => {
//     if (isAnimating) return;
//     setIsAnimating(true);
//     setCurrentSlide((prev) => (prev + 1) % slides.length);
//     setTimeout(() => setIsAnimating(false), 500);
//   };

//   const prevSlide = () => {
//     if (isAnimating) return;
//     setIsAnimating(true);
//     setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
//     setTimeout(() => setIsAnimating(false), 500);
//   };

//   // Auto-play functionality
//   useEffect(() => {
//     autoPlayRef.current = setInterval(nextSlide, 5000);
//     return () => {
//       if (autoPlayRef.current) {
//         clearInterval(autoPlayRef.current);
//       }
//     };
//   }, []);

//   const handleThumbnailClick = (index) => {
//     if (isAnimating || index === currentSlide) return;
//     setIsAnimating(true);
//     setCurrentSlide(index);
//     setTimeout(() => setIsAnimating(false), 500);
//   };

//   return (
//     <div className="unique-carousel-container">
//       {/* Header */}
//       <header className="unique-carousel-header">
//         <nav>
//           <a href="#">Home</a>
//           <a href="#">Contacts</a>
//           <a href="#">Info</a>
//         </nav>
//       </header>

//       {/* Carousel */}
//       <div className="unique-carousel">
//         {/* Slides */}
//         <div className="unique-carousel-list">
//           {slides.map((slide, index) => (
//             <div
//               key={slide.id}
//               className={`unique-carousel-item ${
//                 index === currentSlide ? "unique-carousel-item-active" : ""
//               }`}
//             >
//               <img
//                 src={slide.image}
//                 alt={slide.title}
//                 className="unique-carousel-img"
//               />

//               {/* Content Overlay */}
//               <div className="unique-carousel-content">
//                 <div className="unique-carousel-author">{slide.author}</div>
//                 <div className="unique-carousel-title">{slide.title}</div>
//                 <div className="unique-carousel-topic">{slide.topic}</div>
//                 <div className="unique-carousel-des">{slide.description}</div>
//                 <div className="unique-carousel-buttons">
//                   <button>SEE MORE</button>
//                   <button>SUBSCRIBE</button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Thumbnails */}
//         <div className="unique-carousel-thumbnail">
//           {slides.map((slide, index) => (
//             <div
//               key={slide.id}
//               className={`unique-thumbnail-item ${
//                 index === currentSlide ? "unique-thumbnail-active" : ""
//               }`}
//               onClick={() => handleThumbnailClick(index)}
//             >
//               <img
//                 src={slide.image}
//                 alt={`Thumbnail ${index + 1}`}
//                 className="unique-thumbnail-img"
//               />
//               <div className="unique-thumbnail-content">
//                 <div className="unique-thumbnail-title">Name Slider</div>
//                 <div className="unique-thumbnail-description">Description</div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Navigation Arrows */}
//         <div className="unique-carousel-arrows">
//           <button
//             className="unique-arrow-btn"
//             onClick={prevSlide}
//             disabled={isAnimating}
//           >
//             ‹
//           </button>
//           <button
//             className="unique-arrow-btn"
//             onClick={nextSlide}
//             disabled={isAnimating}
//           >
//             ›
//           </button>
//         </div>

//         {/* Progress Bar */}
//         <div className="unique-carousel-time">
//           <div
//             className="unique-time-progress"
//             style={{
//               width: isAnimating ? "100%" : "0%",
//               transition: isAnimating ? "width 3s linear" : "none",
//             }}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UniqueCarousel;
