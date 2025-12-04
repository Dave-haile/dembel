// import { useRef, useCallback, useState, useEffect } from "react";
// import "./carousel.css";
// import DembelLoader from "../Shared/Loader";

// const LoadingSpinner = () => (
//   <DembelLoader />
// );

// const PlayPauseButton = ({ isPlaying, onToggle, className = "" }) => (
//   <button
//     onClick={onToggle}
//     className={`w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full bg-primary border-2 border-accent text-accent text-lg md:text-xl font-bold transition-all duration-300 hover:scale-110 pointer-events-auto shadow-lg flex items-center justify-center ${className}`}
//     title={isPlaying ? "Pause slider" : "Play slider"}
//   >
//     {isPlaying ? (
//       <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
//         <rect x="6" y="4" width="4" height="16" />
//         <rect x="14" y="4" width="4" height="16" />
//       </svg>
//     ) : (
//       <svg className="w-4 h-4 md:w-5 md:h-5 ml-0.5 md:ml-1" fill="currentColor" viewBox="0 0 24 24">
//         <path d="M8 5v14l11-7z" />
//       </svg>
//     )}
//   </button>
// );

// const Slides = ({ slides }) => {
//   const [isLoading, setIsLoading] = useState(true);
//   const [imagesLoaded, setImagesLoaded] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(true);
//   const [touchStart, setTouchStart] = useState(null);
//   const [touchEnd, setTouchEnd] = useState(null);
//   const [isInViewport, setIsInViewport] = useState(true);
//   const carouselRef = useRef(null);
//   const listRef = useRef(null);
//   const thumbnailRef = useRef(null);

//   const [currentIndex, setCurrentIndex] = useState(0);

//   const timeRunning = 3000;
//   const timeAutoNext = 7000;
//   let runTimeoutRef = useRef();
//   let runAutoRef = useRef();

//   const allSlides = slides || [];

//   // Intersection Observer to detect when slider is in viewport
//   useEffect(() => {
//     const carousel = carouselRef.current;
//     if (!carousel) return;

//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         const isVisible = entry.isIntersecting && entry.intersectionRatio >= 0.5;
//         setIsInViewport(isVisible);

//         // Auto-play/pause based on visibility
//         if (isVisible && isPlaying) {
//           // Resume playing if it was playing and now visible
//           startAutoPlay();
//         } else {
//           // Pause if not visible
//           clearTimeout(runAutoRef.current);
//         }
//       },
//       {
//         threshold: [0, 0.3, 0.5, 0.7, 1],
//         rootMargin: '50px' // Consider 50px around the element as "in viewport"
//       }
//     );

//     observer.observe(carousel);

//     return () => {
//       observer.disconnect();
//       clearTimeout(runAutoRef.current);
//       clearTimeout(runTimeoutRef.current);
//     };
//   }, [isPlaying]);

//   // Scroll event listener as fallback
//   useEffect(() => {
//     const handleScroll = () => {
//       if (!carouselRef.current) return;

//       const rect = carouselRef.current.getBoundingClientRect();
//       const windowHeight = window.innerHeight || document.documentElement.clientHeight;

//       // Consider slider "in viewport" if at least 40% of it is visible
//       const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
//       const isVisible = visibleHeight >= (rect.height * 0.4);

//       setIsInViewport(isVisible);

//       if (isVisible && isPlaying) {
//         startAutoPlay();
//       } else {
//         clearTimeout(runAutoRef.current);
//       }
//     };

//     // Throttle scroll events
//     let scrollTimeout;
//     const throttledScroll = () => {
//       if (!scrollTimeout) {
//         scrollTimeout = setTimeout(() => {
//           handleScroll();
//           scrollTimeout = null;
//         }, 100);
//       }
//     };

//     window.addEventListener('scroll', throttledScroll, { passive: true });

//     // Initial check
//     handleScroll();

//     return () => {
//       window.removeEventListener('scroll', throttledScroll);
//       clearTimeout(scrollTimeout);
//     };
//   }, [isPlaying]);

//   const startAutoPlay = useCallback(() => {
//     if (!isPlaying || !isInViewport) return;

//     clearTimeout(runAutoRef.current);
//     runAutoRef.current = setTimeout(() => {
//       showSlider("next");
//     }, timeAutoNext);
//   }, [isPlaying, isInViewport, timeAutoNext]);

//   // Touch handling for mobile swipe
//   const handleTouchStart = (e) => {
//     setTouchStart(e.targetTouches[0].clientX);
//   };

//   const handleTouchMove = (e) => {
//     setTouchEnd(e.targetTouches[0].clientX);
//   };

//   const handleTouchEnd = () => {
//     if (!touchStart || !touchEnd) return;

//     const distance = touchStart - touchEnd;
//     const isLeftSwipe = distance > 50;
//     const isRightSwipe = distance < -50;

//     if (isLeftSwipe) {
//       handleNext();
//     } else if (isRightSwipe) {
//       handlePrev();
//     }

//     setTouchStart(null);
//     setTouchEnd(null);
//   };

//   useEffect(() => {
//     if (allSlides.length === 0) {
//       setIsLoading(true);
//       return;
//     }

//     setImagesLoaded(0);
//     setIsLoading(true);

//     const loadImages = () => {
//       let loadedCount = 0;
//       const totalImages = allSlides.length;

//       allSlides.forEach((slide) => {
//         const img = new Image();
//         img.src = `/${slide.image}`;
//         img.onload = () => {
//           loadedCount++;
//           setImagesLoaded(loadedCount);
//           if (loadedCount === totalImages) {
//             setTimeout(() => setIsLoading(false), 300);
//           }
//         };
//         img.onerror = () => {
//           loadedCount++;
//           setImagesLoaded(loadedCount);
//           if (loadedCount === totalImages) {
//             setTimeout(() => setIsLoading(false), 300);
//           }
//         };
//       });
//     };

//     loadImages();
//   }, [allSlides]);

//   // Auto-play effect that respects viewport visibility
//   useEffect(() => {
//     if (isLoading || allSlides.length === 0) return;

//     if (isPlaying && isInViewport) {
//       startAutoPlay();
//     } else {
//       clearTimeout(runAutoRef.current);
//     }

//     return () => {
//       clearTimeout(runAutoRef.current);
//     };
//   }, [isPlaying, currentIndex, isLoading, allSlides.length, isInViewport, startAutoPlay]);

//   const getThumbnailSlides = () => {
//     if (!allSlides || allSlides.length === 0) return [];
//     if (allSlides.length <= 3) return [...allSlides];

//     const thumbnailSlides = [];
//     const count = window.innerWidth < 768 ? 2 : window.innerWidth < 1024 ? 3 : 4;

//     for (let i = 1; i <= count; i++) {
//       const index = (currentIndex + i) % allSlides.length;
//       if (allSlides[index]) {
//         thumbnailSlides.push(allSlides[index]);
//       }
//     }
//     return thumbnailSlides;
//   };

//   const thumbnailSlides = getThumbnailSlides();

//   const showSlider = useCallback(
//     (type) => {
//       const carousel = carouselRef.current;
//       const list = listRef.current;

//       if (!carousel || !list || allSlides.length === 0) return;

//       const listItems = list.querySelectorAll(".item");
//       if (listItems.length === 0) return;

//       if (type === "next") {
//         setCurrentIndex((prev) => (prev + 1) % allSlides.length);
//         list.appendChild(listItems[0]);
//         carousel.classList.add("next");
//       } else {
//         setCurrentIndex(
//           (prev) => (prev - 1 + allSlides.length) % allSlides.length
//         );
//         list.prepend(listItems[listItems.length - 1]);
//         carousel.classList.add("prev");
//       }

//       clearTimeout(runTimeoutRef.current);
//       runTimeoutRef.current = setTimeout(() => {
//         carousel.classList.remove("next");
//         carousel.classList.remove("prev");
//       }, timeRunning);

//       // Restart auto-play only if playing and in viewport
//       if (isPlaying && isInViewport) {
//         clearTimeout(runAutoRef.current);
//         runAutoRef.current = setTimeout(() => {
//           showSlider("next");
//         }, timeAutoNext);
//       }
//     },
//     [timeRunning, timeAutoNext, allSlides.length, isPlaying, isInViewport]
//   );

//   const handleNext = () => {
//     showSlider("next");
//   };

//   const handlePrev = () => {
//     showSlider("prev");
//   };

//   const togglePlayPause = () => {
//     const newIsPlaying = !isPlaying;
//     setIsPlaying(newIsPlaying);

//     if (newIsPlaying && isInViewport) {
//       startAutoPlay();
//     } else {
//       clearTimeout(runAutoRef.current);
//     }
//   };

//   const thumbnailKey = `thumbnails-${currentIndex}`;

//   if (allSlides.length === 0 || isLoading) {
//     return (
//       <div className="carousel relative h-screen w-full overflow-x-hidden bg-black text-neutral-200 z-10 flex items-center justify-center">
//         <LoadingSpinner />
//         {allSlides.length > 0 && (
//           <div className="absolute bottom-10 text-white text-center">
//             <p>Loading images... {imagesLoaded}/{allSlides.length}</p>
//           </div>
//         )}
//       </div>
//     );
//   }

//   return (
//     <div
//       className="carousel relative h-screen w-full overflow-x-hidden bg-black text-neutral-200 z-10"
//       ref={carouselRef}
//       style={{ margin: 0, padding: 0, maxWidth: "100vw" }}
//       onTouchStart={handleTouchStart}
//       onTouchMove={handleTouchMove}
//       onTouchEnd={handleTouchEnd}
//     >
//       {/* Visibility Indicator (for debugging - can be removed in production) */}

//       <div className="list absolute inset-0" ref={listRef}>
//         {allSlides.map((slide, idx) => (
//           <div className="item absolute inset-0" key={slide?.id ?? idx}>
//             <img
//               src={`/${slide.image}`}
//               alt="slide"
//               className="w-full h-full object-cover"
//               onLoad={() => { }}
//             />
//             <div className="content absolute top-[10%] md:top-[15%] lg:top-[20%] left-1/2 transform -translate-x-1/2 md:-translate-x-[60%] w-full md:w-[1140px] max-w-[90%] md:max-w-[80%] pr-0 md:pr-[30%] box-border text-primary text-center md:text-left px-4">
//               <div
//                 style={{ textShadow: "1px 1px 0 #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff" }}
//                 className="title text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[5em] font-bold leading-tight md:leading-[1.3em]"
//               >
//                 {slide.title_en}
//               </div>
//               <div
//                 style={{ textShadow: "1px 1px 0 #f5f5f2, -1px -1px 0 #f5f5f2, 1px -1px 0 #f5f5f2, -1px 1px 0 #f5f5f2" }}
//                 className="topic text-2xl sm:text-3xl md:text-4xl lg:text-[4em] font-bold leading-tight md:leading-[1.3em] text-[#efe11a] mt-2 md:mt-4"
//               >
//                 {slide.title_am}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Thumbnails */}
//       <div
//         className="thumbnail absolute bottom-4 md:bottom-8 lg:bottom-[130px] left-1/2 transform -translate-x-1/2 md:left-[80%] md:-translate-x-1/2 w-full md:w-max max-w-[95vw] z-40 flex gap-2 md:gap-5 justify-center md:justify-start overflow-x-auto px-2 md:px-0"
//         ref={thumbnailRef}
//         key={thumbnailKey}
//       >
//         {thumbnailSlides.map((slide, idx) => (
//           <div
//             className="item relative w-20 h-28 sm:w-24 sm:h-32 md:w-[120px] md:h-[160px] lg:w-[150px] lg:h-[220px] flex-shrink-0"
//             key={`${slide?.id}-${currentIndex}-${idx}`}
//           >
//             <img
//               src={`/${slide.image}`}
//               alt={slide.title_en || "thumb"}
//               className="w-full h-full object-cover rounded-lg md:rounded-[20px]"
//             />
//             <div className="content text-primary-foreground absolute bottom-1 left-1 right-1 md:bottom-[10px] md:left-[10px] md:right-[10px]">
//               <div className="title font-medium text-xs md:text-sm truncate">{slide.title_en}</div>
//               <div className="description font-light text-xs truncate">{slide.title_am}</div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Navigation Arrows */}
//       <div className="arrows absolute bottom-24 md:bottom-auto md:top-[80%] left-1/2 transform -translate-x-1/2 md:left-auto md:right-[52%] z-40 w-full md:w-[300px] max-w-[280px] md:max-w-[30%] flex gap-3 md:gap-4 items-center justify-center md:justify-start">
//         <button
//           id="prev"
//           onClick={handlePrev}
//           className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full bg-primary border-2 border-accent text-accent text-lg md:text-xl font-bold transition-all duration-300 hover:scale-110 pointer-events-auto shadow-lg flex items-center justify-center"
//         >
//           {"<"}
//         </button>
//         <PlayPauseButton
//           isPlaying={isPlaying}
//           onToggle={togglePlayPause}
//         />
//         <button
//           id="next"
//           onClick={handleNext}
//           className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full bg-primary border-2 border-accent text-accent text-lg md:text-xl font-bold transition-all duration-300 hover:scale-110 pointer-events-auto shadow-lg flex items-center justify-center"
//         >
//           {">"}
//         </button>
//       </div>
//       {/* Mobile Indicators */}
//       <div className="md:hidden absolute bottom-16 left-1/2 transform -translate-x-1/2 z-40 flex gap-2">
//         {allSlides.map((_, index) => (
//           <div
//             key={index}
//             className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-accent scale-125' : 'bg-white/50'
//               }`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Slides;


// import React, { useRef, useState, useEffect, useLayoutEffect } from 'react';
// import { gsap } from 'gsap';
// import { ArrowRight, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';

// // Preload images to prevent lag/pop-in
// const useImagePreloader = (images) => {
//   const [loaded, setLoaded] = useState(false);

//   useEffect(() => {
//     let count = 0;
//     const total = images.length;

//     if (total === 0) {
//       setLoaded(true);
//       return;
//     }

//     const imgElements = images.map(src => {
//       const img = new Image();
//       img.src = src;
//       img.onload = () => {
//         count++;
//         if (count === total) setLoaded(true);
//       };
//       img.onerror = () => {
//         // Even if error, count it so we don't hang
//         count++;
//         if (count === total) setLoaded(true);
//       };
//       return img;
//     });

//     return () => {
//       // Cleanup not strictly necessary for simple Image objects but good practice
//       imgElements.forEach(img => { img.onload = null; img.onerror = null; });
//     };
//   }, [images]);

//   return loaded;
// };

// const HeroSlider = ({ slides = [] }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isAnimating, setIsAnimating] = useState(false);

//   const containerRef = useRef(null);
//   const slideRefs = useRef([]);
//   const textRefs = useRef([]);
//   const imageRefs = useRef([]);

//   const images = slides.map(s => s.image);
//   const isLoaded = useImagePreloader(images);

//   // Auto-play ref
//   const timerRef = useRef(null);

//   // Initialize GSAP states
//   useLayoutEffect(() => {
//     if (!isLoaded || slides.length === 0) return;

//     const ctx = gsap.context(() => {
//       // Set initial states
//       slideRefs.current.forEach((slide, i) => {
//         if (slide) {
//           if (i === 0) {
//             gsap.set(slide, { zIndex: 2, clipPath: 'circle(150% at 50% 50%)' });
//             // Start the slow zoom for the first image
//             if (imageRefs.current[i]) {
//               gsap.to(imageRefs.current[i], { scale: 1.1, duration: 10, ease: 'none' });
//             }
//           } else {
//             gsap.set(slide, { zIndex: 1, clipPath: 'circle(0% at 50% 50%)' });
//           }
//         }
//       });
//     }, containerRef);

//     return () => ctx.revert();
//   }, [isLoaded, slides]);

//   // Handle Slide Change
//   const goToSlide = (index) => {
//     if (isAnimating || index === currentIndex || !containerRef.current) return;
//     setIsAnimating(true);

//     const nextIndex = (index + slides.length) % slides.length;
//     const currentSlide = slideRefs.current[currentIndex];
//     const nextSlide = slideRefs.current[nextIndex];
//     const nextImage = imageRefs.current[nextIndex];

//     // Text elements to animate
//     const currentText = textRefs.current[currentIndex];
//     const nextText = textRefs.current[nextIndex];

//     const ctx = gsap.context(() => {
//       // 1. Prepare Next Slide
//       gsap.set(nextSlide, { zIndex: 3, clipPath: 'circle(0% at 50% 50%)' });
//       gsap.set(currentSlide, { zIndex: 2 });

//       // Reset Next Image Scale
//       gsap.set(nextImage, { scale: 1 });

//       // 2. Animate Clip Path (The Spotlight Reveal)
//       const tl = gsap.timeline({
//         onComplete: () => {
//           gsap.set(currentSlide, { zIndex: 1, clipPath: 'circle(0% at 50% 50%)' });
//           setCurrentIndex(nextIndex);
//           setIsAnimating(false);
//         }
//       });

//       // Expand the spotlight
//       tl.to(nextSlide, {
//         clipPath: 'circle(150% at 50% 50%)',
//         duration: 1.5,
//         ease: "power4.inOut"
//       });

//       // 3. Start Ken Burns on new image
//       tl.to(nextImage, {
//         scale: 1.1,
//         duration: 10,
//         ease: 'none'
//       }, 0);

//       // 4. Text Animations
//       if (currentText) {
//         // Fade out old text upwards
//         tl.to(currentText.children, {
//           y: -50,
//           opacity: 0,
//           duration: 0.5,
//           stagger: 0.05,
//           ease: "power2.in"
//         }, 0);
//       }

//       if (nextText) {
//         // Reset new text position
//         gsap.set(nextText.children, { y: 50, opacity: 0 });
//         // Fade in new text upwards
//         tl.to(nextText.children, {
//           y: 0,
//           opacity: 1,
//           duration: 0.8,
//           stagger: 0.1,
//           ease: "power3.out"
//         }, 0.6); // Start slightly after the circle expands
//       }

//     }, containerRef);
//   };

//   const nextSlide = () => goToSlide(currentIndex + 1);
//   const prevSlide = () => goToSlide(currentIndex - 1);

//   // Auto-play logic
//   useEffect(() => {
//     if (!isLoaded) return;
//     // Clear existing timer
//     if (timerRef.current) clearInterval(timerRef.current);

//     // Set new timer
//     timerRef.current = setInterval(() => {
//       goToSlide(currentIndex + 1);
//     }, 6000); // 6 seconds

//     return () => {
//       if (timerRef.current) clearInterval(timerRef.current);
//     };
//   }, [currentIndex, isLoaded, isAnimating]);

//   if (!isLoaded) {
//     return (
//       <div className="h-screen w-full bg-slate-950 flex items-center justify-center">
//         <Loader2 className="w-12 h-12 text-yellow-400 animate-spin" />
//       </div>
//     );
//   }

//   return (
//     <section
//       ref={containerRef}
//       className="relative w-full h-screen overflow-hidden bg-slate-950 text-white"
//     >
//       {slides.map((slide, index) => (
//         <div
//           key={slide.id}
//           ref={(el) => { slideRefs.current[index] = el; }}
//           className="absolute inset-0 w-full h-full"
//           style={{ zIndex: index === 0 ? 2 : 1 }}
//         >
//           {/* Background Image */}
//           <div className="absolute inset-0 bg-black">
//             <img
//               ref={(el) => { imageRefs.current[index] = el; }}
//               src={slide.image}
//               alt={slide.title}
//               className="w-full h-full object-cover opacity-80"
//               loading="eager"
//             />
//           </div>

//           {/* Gradient Overlay for Readability */}
//           <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent pointer-events-none" />

//           {/* Content */}
//           <div className="absolute inset-0 container mx-auto px-6 md:px-12 flex flex-col justify-center h-full z-20">
//             <div
//               ref={(el) => { textRefs.current[index] = el; }}
//               className="max-w-3xl"
//             >
//               <div className="overflow-hidden mb-4">
//                 <h4 className="text-yellow-400 font-bold tracking-[0.2em] uppercase text-sm md:text-base">
//                   {slide.subtitle}
//                 </h4>
//               </div>
//               <div className="overflow-hidden mb-6">
//                 <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-black leading-tight tracking-tighter text-white">
//                   {slide.title}
//                 </h1>
//               </div>
//               <div className="overflow-hidden mb-10">
//                 <p className="text-slate-300 text-lg md:text-xl leading-relaxed max-w-xl">
//                   {slide.description}
//                 </p>
//               </div>
//               <div className="overflow-hidden">
//                 <a
//                   href={slide.ctaLink}
//                   className="group inline-flex items-center gap-3 bg-white text-slate-950 px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-400 transition-colors duration-300"
//                 >
//                   {slide.ctaText}
//                   <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//       ))}

//       {/* Navigation Controls */}
//       <div className="absolute bottom-12 left-0 w-full z-30 container mx-auto px-6 md:px-12 flex justify-between items-end">

//         {/* Progress / Counter */}
//         <div className="flex items-end gap-2 text-white/50 font-mono text-sm">
//           <span className="text-white text-3xl font-bold leading-none">
//             {String(currentIndex + 1).padStart(2, '0')}
//           </span>
//           <span className="mb-1">/</span>
//           <span className="mb-1">{String(slides.length).padStart(2, '0')}</span>
//         </div>

//         {/* Arrows */}
//         <div className="flex gap-4">
//           <button
//             onClick={prevSlide}
//             disabled={isAnimating}
//             className="w-14 h-14 rounded-full border border-white/20 bg-white/5 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
//           >
//             <ChevronLeft className="w-6 h-6 text-white group-hover:-translate-x-0.5 transition-transform" />
//           </button>
//           <button
//             onClick={nextSlide}
//             disabled={isAnimating}
//             className="w-14 h-14 rounded-full border border-white/20 bg-white/5 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
//           >
//             <ChevronRight className="w-6 h-6 text-white group-hover:translate-x-0.5 transition-transform" />
//           </button>
//         </div>
//       </div>

//       {/* Pagination Lines (Optional visual flair) */}
//       <div className="absolute right-8 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col gap-4">
//         {slides.map((_, idx) => (
//           <button
//             key={idx}
//             onClick={() => goToSlide(idx)}
//             className={`w-1 h-12 rounded-full transition-all duration-500 ${idx === currentIndex ? 'bg-yellow-400 h-20' : 'bg-white/20 hover:bg-white/50'}`}
//             aria-label={`Go to slide ${idx + 1}`}
//           />
//         ))}
//       </div>
//     </section>
//   );
// };

// export default HeroSlider;



import React, { useRef, useState, useEffect, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ChevronLeft, ChevronRight, Loader2, Pause, Play, ArrowRight } from 'lucide-react';

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

    const imgElements = images.map(src => {
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
      imgElements.forEach(img => { img.onload = null; img.onerror = null; });
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
  
  const images = slides.map(s => s.image);
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
            gsap.set(slide, { zIndex: 2, clipPath: 'circle(150% at 50% 50%)' });
            if (imageRefs.current[i]) {
                gsap.to(imageRefs.current[i], { scale: 1.1, duration: 10, ease: 'none' });
            }
          } else {
            // Others hidden
            gsap.set(slide, { zIndex: 1, clipPath: 'circle(0% at 50% 50%)' });
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
      gsap.set(nextSlide, { zIndex: newZIndex, clipPath: 'circle(0% at 50% 50%)' });
      gsap.set(nextImage, { scale: 1 });

      // 2. Animate Spotlight (Faster: 0.8s)
      gsap.to(nextSlide, {
        clipPath: 'circle(150% at 50% 50%)',
        duration: 0.8, // Reduced from 1.5s
        ease: "power3.inOut" // Snappier ease
      });

      // 3. Start Ken Burns on new image
      gsap.to(nextImage, {
        scale: 1.1,
        duration: 10,
        ease: 'none'
      });

      // 4. Text Animations
      if (currentText) {
        gsap.to(currentText.children, {
          y: -30,
          opacity: 0,
          duration: 0.4, // Fast exit
          stagger: 0.05,
          ease: "power2.in"
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
          ease: "power3.out"
        });
      }

    }, containerRef);

    // Update state immediately
    setCurrentIndex(nextIndex);
  };

  const nextSlide = () => changeSlide((currentIndex + 1) % slides.length);
  const prevSlide = () => changeSlide((currentIndex - 1 + slides.length) % slides.length);

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
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  if (!isLoaded) {
    return (
      <div className="h-screen w-full bg-slate-950 flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-yellow-400 animate-spin" />
      </div>
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
          ref={(el) => { slideRefs.current[index] = el; }}
          className="absolute inset-0 w-full h-full"
          // We rely on GSAP for z-indices, avoid inline styles here to prevent React hydration mismatches or overwrites
        >
          {/* Background Image */}
          <div className="absolute inset-0 bg-black">
            <img
              ref={(el) => { imageRefs.current[index] = el; }}
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
              ref={(el) => { textRefs.current[index] = el; }}
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
            {String(currentIndex + 1).padStart(2, '0')}
          </span>
          <span className="mb-1">/</span>
          <span className="mb-1">{String(slides.length).padStart(2, '0')}</span>
        </div>

        {/* Controls */}
        <div className="flex gap-4 items-center">
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
                className={`w-1 h-12 rounded-full transition-all duration-500 ${idx === currentIndex ? 'bg-yellow-400 h-20' : 'bg-white/20 hover:bg-white/50'}`}
                aria-label={`Go to slide ${idx + 1}`}
            />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
