import { useRef, useCallback, useState, useEffect } from "react";
import "./carousel.css";
import DembelLoader from "../Shared/Loader";

const LoadingSpinner = () => (
  <DembelLoader />
);

const PlayPauseButton = ({ isPlaying, onToggle, className = "" }) => (
  <button
    onClick={onToggle}
    className={`w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full bg-primary border-2 border-accent text-accent text-lg md:text-xl font-bold transition-all duration-300 hover:scale-110 pointer-events-auto shadow-lg flex items-center justify-center ${className}`}
    title={isPlaying ? "Pause slider" : "Play slider"}
  >
    {isPlaying ? (
      <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
        <rect x="6" y="4" width="4" height="16" />
        <rect x="14" y="4" width="4" height="16" />
      </svg>
    ) : (
      <svg className="w-4 h-4 md:w-5 md:h-5 ml-0.5 md:ml-1" fill="currentColor" viewBox="0 0 24 24">
        <path d="M8 5v14l11-7z" />
      </svg>
    )}
  </button>
);

const Slides = ({ slides }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isInViewport, setIsInViewport] = useState(true);
  const carouselRef = useRef(null);
  const listRef = useRef(null);
  const thumbnailRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(0);

  const timeRunning = 3000;
  const timeAutoNext = 7000;
  let runTimeoutRef = useRef();
  let runAutoRef = useRef();

  const allSlides = slides || [];

  // Intersection Observer to detect when slider is in viewport
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry.isIntersecting && entry.intersectionRatio >= 0.5;
        setIsInViewport(isVisible);
        
        // Auto-play/pause based on visibility
        if (isVisible && isPlaying) {
          // Resume playing if it was playing and now visible
          startAutoPlay();
        } else {
          // Pause if not visible
          clearTimeout(runAutoRef.current);
        }
      },
      {
        threshold: [0, 0.3, 0.5, 0.7, 1],
        rootMargin: '50px' // Consider 50px around the element as "in viewport"
      }
    );

    observer.observe(carousel);

    return () => {
      observer.disconnect();
      clearTimeout(runAutoRef.current);
      clearTimeout(runTimeoutRef.current);
    };
  }, [isPlaying]);

  // Scroll event listener as fallback
  useEffect(() => {
    const handleScroll = () => {
      if (!carouselRef.current) return;

      const rect = carouselRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      
      // Consider slider "in viewport" if at least 40% of it is visible
      const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
      const isVisible = visibleHeight >= (rect.height * 0.4);

      setIsInViewport(isVisible);

      if (isVisible && isPlaying) {
        startAutoPlay();
      } else {
        clearTimeout(runAutoRef.current);
      }
    };

    // Throttle scroll events
    let scrollTimeout;
    const throttledScroll = () => {
      if (!scrollTimeout) {
        scrollTimeout = setTimeout(() => {
          handleScroll();
          scrollTimeout = null;
        }, 100);
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', throttledScroll);
      clearTimeout(scrollTimeout);
    };
  }, [isPlaying]);

  const startAutoPlay = useCallback(() => {
    if (!isPlaying || !isInViewport) return;
    
    clearTimeout(runAutoRef.current);
    runAutoRef.current = setTimeout(() => {
      showSlider("next");
    }, timeAutoNext);
  }, [isPlaying, isInViewport, timeAutoNext]);

  // Touch handling for mobile swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  useEffect(() => {
    if (allSlides.length === 0) {
      setIsLoading(true);
      return;
    }

    setImagesLoaded(0);
    setIsLoading(true);

    const loadImages = () => {
      let loadedCount = 0;
      const totalImages = allSlides.length;

      allSlides.forEach((slide) => {
        const img = new Image();
        img.src = `/${slide.image}`;
        img.onload = () => {
          loadedCount++;
          setImagesLoaded(loadedCount);
          if (loadedCount === totalImages) {
            setTimeout(() => setIsLoading(false), 300);
          }
        };
        img.onerror = () => {
          loadedCount++;
          setImagesLoaded(loadedCount);
          if (loadedCount === totalImages) {
            setTimeout(() => setIsLoading(false), 300);
          }
        };
      });
    };

    loadImages();
  }, [allSlides]);

  // Auto-play effect that respects viewport visibility
  useEffect(() => {
    if (isLoading || allSlides.length === 0) return;

    if (isPlaying && isInViewport) {
      startAutoPlay();
    } else {
      clearTimeout(runAutoRef.current);
    }

    return () => {
      clearTimeout(runAutoRef.current);
    };
  }, [isPlaying, currentIndex, isLoading, allSlides.length, isInViewport, startAutoPlay]);

  const getThumbnailSlides = () => {
    if (!allSlides || allSlides.length === 0) return [];
    if (allSlides.length <= 3) return [...allSlides];

    const thumbnailSlides = [];
    const count = window.innerWidth < 768 ? 2 : window.innerWidth < 1024 ? 3 : 4;
    
    for (let i = 1; i <= count; i++) {
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

      // Restart auto-play only if playing and in viewport
      if (isPlaying && isInViewport) {
        clearTimeout(runAutoRef.current);
        runAutoRef.current = setTimeout(() => {
          showSlider("next");
        }, timeAutoNext);
      }
    },
    [timeRunning, timeAutoNext, allSlides.length, isPlaying, isInViewport]
  );

  const handleNext = () => {
    showSlider("next");
  };

  const handlePrev = () => {
    showSlider("prev");
  };

  const togglePlayPause = () => {
    const newIsPlaying = !isPlaying;
    setIsPlaying(newIsPlaying);
    
    if (newIsPlaying && isInViewport) {
      startAutoPlay();
    } else {
      clearTimeout(runAutoRef.current);
    }
  };

  const thumbnailKey = `thumbnails-${currentIndex}`;

  if (allSlides.length === 0 || isLoading) {
    return (
      <div className="carousel relative h-screen w-full overflow-x-hidden bg-black text-neutral-200 z-10 flex items-center justify-center">
        <LoadingSpinner />
        {allSlides.length > 0 && (
          <div className="absolute bottom-10 text-white text-center">
            <p>Loading images... {imagesLoaded}/{allSlides.length}</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className="carousel relative h-screen w-full overflow-x-hidden bg-black text-neutral-200 z-10"
      ref={carouselRef}
      style={{ margin: 0, padding: 0, maxWidth: "100vw" }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Visibility Indicator (for debugging - can be removed in production) */}

      <div className="list absolute inset-0" ref={listRef}>
        {allSlides.map((slide, idx) => (
          <div className="item absolute inset-0" key={slide?.id ?? idx}>
            <img
              src={`/${slide.image}`}
              alt="slide"
              className="w-full h-full object-cover"
              onLoad={() => {}}
            />
            <div className="content absolute top-[10%] md:top-[15%] lg:top-[20%] left-1/2 transform -translate-x-1/2 md:-translate-x-[60%] w-full md:w-[1140px] max-w-[90%] md:max-w-[80%] pr-0 md:pr-[30%] box-border text-primary text-center md:text-left px-4">
              <div
                style={{ textShadow: "1px 1px 0 #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff" }}
                className="title text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[5em] font-bold leading-tight md:leading-[1.3em]"
              >
                {slide.title_en}
              </div>
              <div
                style={{ textShadow: "1px 1px 0 #f5f5f2, -1px -1px 0 #f5f5f2, 1px -1px 0 #f5f5f2, -1px 1px 0 #f5f5f2" }}
                className="topic text-2xl sm:text-3xl md:text-4xl lg:text-[4em] font-bold leading-tight md:leading-[1.3em] text-[#efe11a] mt-2 md:mt-4"
              >
                {slide.title_am}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Thumbnails */}
      <div
        className="thumbnail absolute bottom-4 md:bottom-8 lg:bottom-[130px] left-1/2 transform -translate-x-1/2 md:left-[80%] md:-translate-x-1/2 w-full md:w-max max-w-[95vw] z-40 flex gap-2 md:gap-5 justify-center md:justify-start overflow-x-auto px-2 md:px-0"
        ref={thumbnailRef}
        key={thumbnailKey}
      >
        {thumbnailSlides.map((slide, idx) => (
          <div
            className="item relative w-20 h-28 sm:w-24 sm:h-32 md:w-[120px] md:h-[160px] lg:w-[150px] lg:h-[220px] flex-shrink-0"
            key={`${slide?.id}-${currentIndex}-${idx}`}
          >
            <img
              src={`/${slide.image}`}
              alt={slide.title_en || "thumb"}
              className="w-full h-full object-cover rounded-lg md:rounded-[20px]"
            />
            <div className="content text-primary-foreground absolute bottom-1 left-1 right-1 md:bottom-[10px] md:left-[10px] md:right-[10px]">
              <div className="title font-medium text-xs md:text-sm truncate">{slide.title_en}</div>
              <div className="description font-light text-xs truncate">{slide.title_am}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <div className="arrows absolute bottom-24 md:bottom-auto md:top-[80%] left-1/2 transform -translate-x-1/2 md:left-auto md:right-[52%] z-40 w-full md:w-[300px] max-w-[280px] md:max-w-[30%] flex gap-3 md:gap-4 items-center justify-center md:justify-start">
        <button
          id="prev"
          onClick={handlePrev}
          className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full bg-primary border-2 border-accent text-accent text-lg md:text-xl font-bold transition-all duration-300 hover:scale-110 pointer-events-auto shadow-lg flex items-center justify-center"
        >
          {"<"}
        </button>
        <PlayPauseButton 
          isPlaying={isPlaying} 
          onToggle={togglePlayPause}
        />
        <button
          id="next"
          onClick={handleNext}
          className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full bg-primary border-2 border-accent text-accent text-lg md:text-xl font-bold transition-all duration-300 hover:scale-110 pointer-events-auto shadow-lg flex items-center justify-center"
        >
          {">"}
        </button>
      </div>
      {/* Mobile Indicators */}
      <div className="md:hidden absolute bottom-16 left-1/2 transform -translate-x-1/2 z-40 flex gap-2">
        {allSlides.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-accent scale-125' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default Slides;