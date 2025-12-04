import React, { useRef, useLayoutEffect } from "react";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Star, Utensils } from 'lucide-react';
import { Link } from "@inertiajs/react";

gsap.registerPlugin(ScrollTrigger);

const DiningAndEntertainment = ({ restaurant, aboutDine }) => {
  console.log(aboutDine);
  const containerRef = useRef(null);
  const imagesRef = useRef(null);
  const textRef = useRef(null);

  // Extract images safely, ensuring we have at least 3 for the grid
  const defaultImages = [
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
    "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80"
  ];

  const displayImages = restaurant
    .map(r => r.logo)
    .filter(Boolean)
    .concat(defaultImages)
    .slice(0, 3);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax effect for images
      // We animate the grid items slightly differently to create depth
      const mm = gsap.matchMedia();

      // Desktop animation
      mm.add("(min-width: 1024px)", () => {
        // Fade in and slide up text
        gsap.fromTo(textRef.current,
          { opacity: 0, x: 50 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 70%",
              end: "bottom 80%",
              toggleActions: "play none none reverse"
            }
          }
        );

        // Staggered image entry
        const imageElements = imagesRef.current?.querySelectorAll('.grid-img');
        if (imageElements) {
          gsap.fromTo(imageElements,
            { y: 60, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.2,
              ease: "back.out(1.2)",
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top 75%",
              }
            }
          );
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);
  const subtitleParts = (aboutDine.subtitle || "")
    .split(",")
    .map((s) => s.trim());
  const taste = subtitleParts[0] || "Fine Dining";
  const cuisines = subtitleParts[1] || "International";
  return (
    <section className="w-full py-8 px-4 flex justify-center sticky top-8 z-20">
      <div
        ref={containerRef}
        className="relative w-full max-w-[80rem] bg-slate-950 rounded-[2.5rem] overflow-hidden shadow-2xl text-white isolate"
      >
        <h1 className="text-4xl py-8 md:text-6xl font-serif font-bold text-white mb-4 text-center relative z-20">
          Welcome to <span className="text-yellow-500">The Plaza</span>
        </h1>

        {/* Abstract Background Gradient */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px] mix-blend-screen opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] mix-blend-screen opacity-50"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 opacity-90"></div>

          {/* Grain Texture */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 p-8 md:p-12 lg:p-16 items-center relative z-10">

          {/* Left Side: Image Collage */}
          <div ref={imagesRef} className="lg:col-span-6 relative">
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              <div className="flex flex-col gap-4 md:gap-6 pt-12">
                <div className="grid-img group relative rounded-2xl overflow-hidden shadow-xl h-64 w-full transform transition-transform duration-500 hover:scale-[1.02]">
                  <img
                    src={displayImages[0]}
                    alt="Fine Dining Atmosphere"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                </div>

                {/* Decorative Element */}
                <div className="grid-img hidden md:flex items-center justify-center p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
                  <div className="text-center">
                    <span className="block text-3xl font-serif text-yellow-400 font-bold">{cuisines.split(' ')[0]} </span>
                    <span className="text-sm text-gray-300 uppercase tracking-widest">{cuisines.split(' ')[1]}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4 md:gap-6">
                <div className="grid-img group relative rounded-2xl overflow-hidden shadow-xl h-80 w-full transform transition-transform duration-500 hover:scale-[1.02]">
                  <img
                    src={displayImages[1]}
                    alt="Chef's Special"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                  <div className="absolute bottom-4 left-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                      <span className="text-xs font-semibold text-white">Top Rated</span>
                    </div>
                  </div>
                </div>
                <div className="grid-img group relative rounded-2xl overflow-hidden shadow-xl h-48 w-full transform transition-transform duration-500 hover:scale-[1.02]">
                  <img
                    src={displayImages[2]}
                    alt="Gourmet Dish"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Content */}
          <div ref={textRef} className="lg:col-span-6 flex flex-col justify-center text-center lg:text-left">
            <div className="inline-flex items-center gap-2 self-center lg:self-start bg-yellow-500/10 border border-yellow-500/20 rounded-full px-4 py-1.5 mb-6">
              <Utensils className="w-4 h-4 text-yellow-400" />
              <span className="text-yellow-400 text-xs font-bold tracking-widest uppercase">{taste}</span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 leading-tight text-white">
              {aboutDine.title.includes(' E') ? aboutDine.title.split(' E')[0] : 'Fine'} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400">
                {aboutDine.title.includes('& ') ? aboutDine.title.split('& ')[1] : 'Dining'}
              </span>
            </h2>

            <p className="text-lg text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {aboutDine.description}
            </p>

            <div className="mb-10">
              <h3 className="text-xl font-serif text-white mb-4 border-b border-white/10 pb-2 inline-block">Featured Venues</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                {restaurant.slice(0, 4).map((restaurant, index) => (
                  <li key={index} className="flex items-center gap-3 text-gray-300 group cursor-default">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 group-hover:shadow-[0_0_8px_rgba(234,179,8,0.8)] transition-all" />
                    <span className="group-hover:text-white transition-colors">{restaurant.name}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href={'/tenant?building=all&category=7&search='}
                className="bg-white text-slate-950 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-white/20 flex items-center justify-center gap-2 group"
              >
                View Restaurants
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href={'/tenant'}
                className="px-8 py-4 rounded-xl font-semibold text-white border border-white/20 hover:bg-white/5 transition-all duration-300 flex items-center justify-center"
              >
                View All Categories
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiningAndEntertainment;
