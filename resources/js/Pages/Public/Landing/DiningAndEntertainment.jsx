// // import React, { useRef, useLayoutEffect } from "react";
// // import { gsap } from "gsap";
// // import { ScrollTrigger } from "gsap/ScrollTrigger";

// // gsap.registerPlugin(ScrollTrigger);

// // // Helper Components for Icons
// // const ArrowRight = ({ className }) => (
// //   <svg
// //     className={className}
// //     width="24"
// //     height="24"
// //     viewBox="0 0 24 24"
// //     fill="none"
// //     stroke="currentColor"
// //     strokeWidth="2"
// //     strokeLinecap="round"
// //     strokeLinejoin="round"
// //   >
// //     <line x1="5" y1="12" x2="19" y2="12"></line>
// //     <polyline points="12 5 19 12 12 19"></polyline>
// //   </svg>
// // );

// // const Star = ({ className }) => (
// //   <svg
// //     className={className}
// //     width="24"
// //     height="24"
// //     viewBox="0 0 24 24"
// //     fill="none"
// //     stroke="currentColor"
// //     strokeWidth="2"
// //     strokeLinecap="round"
// //     strokeLinejoin="round"
// //   >
// //     <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
// //   </svg>
// // );

// // const Utensils = ({ className }) => (
// //   <svg
// //     className={className}
// //     width="24"
// //     height="24"
// //     viewBox="0 0 24 24"
// //     fill="none"
// //     stroke="currentColor"
// //     strokeWidth="2"
// //     strokeLinecap="round"
// //     strokeLinejoin="round"
// //   >
// //     <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
// //     <path d="M7 2v20" />
// //     <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
// //   </svg>
// // );

// // const Link = ({ href, className, children }) => (
// //   <a href={href} className={className}>
// //     {children}
// //   </a>
// // );

// // const DiningAndEntertainment = ({
// //   restaurant = [],
// //   aboutDine = {
// //     subtitle: "Fine Dining, International",
// //     title: "Dining & Entertainment",
// //     description:
// //       "Experience the finest dining and entertainment options at Dembel City Center.",
// //   },
// // }) => {
// //   const containerRef = useRef(null);
// //   const imagesRef = useRef(null);
// //   const textRef = useRef(null);

// //   // Default fallback images
// //   const defaultImages = [
// //     "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
// //     "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
// //     "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80",
// //   ];

// //   // Safely extract up to 3 valid logo URLs or fallback
// //   const displayImages =
// //     restaurant && Array.isArray(restaurant)
// //       ? restaurant
// //           .map((r) => r.logo)
// //           .filter(Boolean)
// //           .concat(defaultImages)
// //           .slice(0, 3)
// //       : defaultImages;

// //   useLayoutEffect(() => {
// //     const container = containerRef.current;
// //     if (!container) return;

// //     // Clean up previous ScrollTriggers if any (optional but safe)
// //     ScrollTrigger.getAll().forEach((trigger) => {
// //       if (trigger.trigger === container) trigger.kill();
// //     });

// //     const ctx = gsap.context(() => {
// //       // Pin the container when it reaches the top
// //       ScrollTrigger.create({
// //         trigger: container,
// //         start: "top top",
// //         end: () => `+=${window.innerHeight * 1.5}`, // Pin for ~1.5 viewport heights
// //         pin: true,
// //         pinSpacing: true, // Keeps space reserved so layout doesn't jump
// //         scrub: 1,
// //         // Optional: add markers in development
// //         // markers: true,
// //       });

// //       // Animate text in
// //       if (textRef.current) {
// //         gsap.fromTo(
// //           textRef.current,
// //           { opacity: 0, y: 80 },
// //           {
// //             opacity: 1,
// //             y: 0,
// //             duration: 1,
// //             scrollTrigger: {
// //               trigger: container,
// //               start: "top 60%",
// //               end: "top 20%",
// //               scrub: 1,
// //             },
// //           }
// //         );
// //       }

// //       // Animate images in
// //       const images = imagesRef.current?.querySelectorAll(".grid-img");
// //       if (images && images.length) {
// //         gsap.fromTo(
// //           images,
// //           { opacity: 0, y: 80 },
// //           {
// //             opacity: 1,
// //             y: 0,
// //             stagger: 0.15,
// //             duration: 1,
// //             scrollTrigger: {
// //               trigger: container,
// //               start: "top 60%",
// //               end: "top 20%",
// //               scrub: 1,
// //             },
// //           }
// //         );
// //       }
// //     }, container);

// //     return () => {
// //       ctx.revert();
// //     };
// //   }, []);

// //   // Parse subtitle safely
// //   const subtitleParts = (aboutDine.subtitle || "")
// //     .split(",")
// //     .map((s) => s.trim());
// //   const taste = subtitleParts[0] || "Fine Dining";
// //   const cuisines = subtitleParts[1] || "International";

// //   return (
// //     // 🔥 CRITICAL: NO "sticky" class here — let GSAP control pinning
// //     <section className="w-full py-8 px-4 flex justify-center">
// //       <div
// //         ref={containerRef}
// //         className="relative w-full max-w-[80rem] bg-slate-950 rounded-[2.5rem] overflow-hidden shadow-2xl text-white isolate"
// //       >
// //         {/* Background Decor */}
// //         <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(251,238,33,0.15),transparent_50%)] pointer-events-none" />
// //         <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.1),transparent_50%)] pointer-events-none" />
// //         <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 opacity-90" />

// //         <h1 className="text-4xl py-8 md:text-6xl font-serif font-bold text-white mb-4 text-center relative z-20">
// //           Welcome to <span className="text-yellow-500">The Plaza</span>
// //         </h1>

// //         {/* Grain Texture */}
// //         <div
// //           className="absolute inset-0 opacity-[0.03] pointer-events-none"
// //           style={{
// //             backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
// //           }}
// //         />

// //         <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 p-8 md:p-12 lg:p-16 items-center relative z-10">
// //           {/* Left Side: Image Collage */}
// //           <div ref={imagesRef} className="lg:col-span-6 relative">
// //             <div className="grid grid-cols-2 gap-4 md:gap-6">
// //               <div className="flex flex-col gap-4 md:gap-6 pt-12">
// //                 <div className="grid-img group relative rounded-2xl overflow-hidden shadow-xl h-64 w-full transform transition-transform duration-500 hover:scale-[1.02]">
// //                   <img
// //                     src={displayImages[0]}
// //                     alt="Fine Dining Atmosphere"
// //                     className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
// //                   />
// //                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
// //                 </div>

// //                 <div className="grid-img hidden md:flex items-center justify-center p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
// //                   <div className="text-center">
// //                     <span className="block text-3xl font-serif text-yellow-400 font-bold">
// //                       {cuisines.split(" ")[0]}{" "}
// //                     </span>
// //                     <span className="text-sm text-gray-300 uppercase tracking-widest">
// //                       {cuisines.split(" ")[1] || "Cuisine"}
// //                     </span>
// //                   </div>
// //                 </div>
// //               </div>

// //               <div className="flex flex-col gap-4 md:gap-6">
// //                 <div className="grid-img group relative rounded-2xl overflow-hidden shadow-xl h-80 w-full transform transition-transform duration-500 hover:scale-[1.02]">
// //                   <img
// //                     src={displayImages[1]}
// //                     alt="Chef's Special"
// //                     className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
// //                   />
// //                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
// //                   <div className="absolute bottom-4 left-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
// //                     <div className="flex items-center gap-1">
// //                       <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
// //                       <span className="text-xs font-semibold text-white">
// //                         Top Rated
// //                       </span>
// //                     </div>
// //                   </div>
// //                 </div>
// //                 <div className="grid-img group relative rounded-2xl overflow-hidden shadow-xl h-48 w-full transform transition-transform duration-500 hover:scale-[1.02]">
// //                   <img
// //                     src={displayImages[2]}
// //                     alt="Gourmet Dish"
// //                     className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
// //                   />
// //                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Right Side: Content */}
// //           <div
// //             ref={textRef}
// //             className="lg:col-span-6 flex flex-col justify-center text-center lg:text-left"
// //           >
// //             <div className="inline-flex items-center gap-2 self-center lg:self-start bg-yellow-500/10 border border-yellow-500/20 rounded-full px-4 py-1.5 mb-6">
// //               <Utensils className="w-4 h-4 text-yellow-400" />
// //               <span className="text-yellow-400 text-xs font-bold tracking-widest uppercase">
// //                 {taste}
// //               </span>
// //             </div>

// //             <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 leading-tight text-white">
// //               {aboutDine.title?.includes(" E")
// //                 ? aboutDine.title.split(" E")[0]
// //                 : "Fine"}
// //               <br />
// //               <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400">
// //                 {aboutDine.title?.includes("& ")
// //                   ? aboutDine.title.split("& ")[1]
// //                   : "Dining"}
// //               </span>
// //             </h2>

// //             <p className="text-lg text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
// //               {aboutDine.description}
// //             </p>

// //             <div className="mb-10">
// //               <h3 className="text-xl font-serif text-white mb-4 border-b border-white/10 pb-2 inline-block">
// //                 Featured Venues
// //               </h3>
// //               <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
// //                 {restaurant.slice(0, 4).map((rest, index) => (
// //                   <li
// //                     key={index}
// //                     className="flex items-center gap-3 text-gray-300 group cursor-default"
// //                   >
// //                     <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 group-hover:shadow-[0_0_8px_rgba(234,179,8,0.8)] transition-all" />
// //                     <span className="group-hover:text-white transition-colors">
// //                       {rest.name || `Restaurant ${index + 1}`}
// //                     </span>
// //                   </li>
// //                 ))}
// //               </ul>
// //             </div>

// //             <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
// //               <Link
// //                 href={"/tenant?building=all&category=7&search="}
// //                 className="bg-white text-slate-950 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-white/20 flex items-center justify-center gap-2 group"
// //               >
// //                 View Restaurants
// //                 <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
// //               </Link>
// //               <Link
// //                 href={"/tenant"}
// //                 className="px-8 py-4 rounded-xl font-semibold text-white border border-white/20 hover:bg-white/5 transition-all duration-300 flex items-center justify-center"
// //               >
// //                 View All Categories
// //               </Link>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // };

// // export default DiningAndEntertainment;

// // import { Link } from "@inertiajs/react";
// // import React from "react";

// // const DiningAndEntertainment = ({ restaurant }) => {
// //   const image = restaurant.map((restaurant) => restaurant.logo);
// //   return (
// //      <section className="py-16 md:py-24 bg-background">
// //       <div className="container mx-auto px-4 lg:px-8">
// //         <div className="grid lg:grid-cols-2 gap-12 items-center">
// //           <div className="grid grid-cols-2 gap-4">
// //             <img
// //               src={image[0] || `https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=600&fit=crop`}
// //               alt="Restaurant interior"
// //               className="rounded-2xl object-cover w-full h-64 card-shadow"
// //             />
// //             <img
// //               src={image[1] || `https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=600&fit=crop`}
// //               alt="Fine dining"
// //               className="rounded-2xl object-cover w-full h-64 card-shadow mt-8"
// //             />
// //             <img
// //               src={image[2] || `https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=600&h=600&fit=crop`}
// //               alt="Cuisine"
// //               className="rounded-2xl object-cover w-full h-64 card-shadow col-span-2"
// //             />
// //           </div>

// //           <div>
// //             <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
// //               Dining & Entertainment
// //             </h2>
// //             <p className="text-xl text-muted-foreground mb-8">
// //               Experience culinary excellence from around the world. From fine dining to casual bites, we have something for every taste.
// //             </p>

// //             <div className="space-y-4 mb-8">
// //               <h3 className="text-2xl font-semibold text-foreground">Top Restaurants</h3>
// //               <ul className="space-y-3">
// //                 {restaurant.map((restaurant, index) => (
// //                   <li key={index} className="flex items-center gap-3 text-muted-foreground">
// //                     <div className="w-2 h-2 rounded-full bg-accent flex-shrink-0" />
// //                     <span>{restaurant.name}</span>
// //                   </li>
// //                 ))}
// //               </ul>
// //             </div>
// //             <Link href={'/tenant?building=all&category=7&search='}
// //               className="bg-primary-600 w-40 text-center text-white px-8 py-4 rounded-2xl font-semibold
// //              hover:bg-accent-600 transition-all duration-200 hover:shadow-xl
// //              hover:scale-105 active:scale-95 flex items-center gap-2"
// //               style={{ fontFamily: 'Inter, sans-serif' }}
// //             >
// //               View All
// //             </Link>
// //           </div>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // };

// // export default DiningAndEntertainment;

// // import { Link } from "@inertiajs/react";
// // import React, { useRef, useEffect } from "react";
// // import { gsap } from 'gsap';
// // import { ScrollTrigger } from 'gsap/ScrollTrigger';

// // gsap.registerPlugin(ScrollTrigger);

// // const DiningAndEntertainment = ({ restaurant }) => {
// //   const sectionRef = useRef(null);
// //   const image = restaurant.map((restaurant) => restaurant.logo);

// //   useEffect(() => {
// //     if (sectionRef.current) {
// //       gsap.to(sectionRef.current, {
// //         scrollTrigger: {
// //           trigger: sectionRef.current,
// //           start: "top top",
// //           end: "bottom top",
// //           pin: true,
// //           pinSpacing: false,
// //           scrub: true,
// //         },
// //       });
// //     }

// //     return () => {
// //       ScrollTrigger.getAll().forEach((trigger) => {
// //         if (trigger.trigger === sectionRef.current) trigger.kill();
// //       });
// //     };
// //   }, []);

// //   return (
// //     <section ref={sectionRef} className="relative min-h-screen py-16 md:py-24 overflow-hidden flex items-center bg-gradient-to-br from-[#2a6df4] via-[#2a6df4] to-[#2563eb] text-white">
// //       <div className="container mx-auto px-4 lg:px-8 w-full absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.1),transparent)]">
// //         <div className="grid lg:grid-cols-2 gap-12 items-center">
// //           <div className="grid grid-cols-2 gap-4 mt-5">
// //             <img
// //               src={image[0] || `https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=600&fit=crop`}
// //               alt="Restaurant interior"
// //               className="rounded-2xl object-cover w-full h-64 card-shadow"
// //             />
// //             <img
// //               src={image[1] || `https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=600&fit=crop`}
// //               alt="Fine dining"
// //               className="rounded-2xl object-cover w-full h-64 card-shadow mt-8"
// //             />
// //             <img
// //               src={image[2] || `https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=600&h=600&fit=crop`}
// //               alt="Cuisine"
// //               className="rounded-2xl object-cover w-full h-64 card-shadow col-span-2"
// //             />
// //           </div>

// //           <div>
// //             <h2 className="text-4xl md:text-5xl font-bold mb-6">
// //               Dining & Entertainment
// //             </h2>
// //             <p className="text-[18px] font-semibold text-accent-300 mb-8">
// //               Experience culinary excellence from around the world. From fine dining to casual bites, we have something for every taste.
// //             </p>

// //             <div className="space-y-4 mb-8">
// //               <h3 className="text-2xl font-semibold text-white">Top Restaurants</h3>
// //               <ul className="space-y-3">
// //                 {restaurant.map((restaurant, index) => (
// //                   <li key={index} className="flex items-center gap-3 text-accent-400">
// //                     <div className="w-2 h-2 rounded-full bg-accent flex-shrink-0" />
// //                     <span>{restaurant.name}</span>
// //                   </li>
// //                 ))}
// //               </ul>
// //             </div>
// //             <Link href={'/tenant?building=all&category=7&search='}
// //               className="bg-primary-600 w-40 text-center text-white px-8 py-4 rounded-2xl font-semibold
// //              hover:bg-accent-600 transition-all duration-200 hover:shadow-xl
// //              hover:scale-105 active:scale-95 flex items-center gap-2"
// //               style={{ fontFamily: 'Inter, sans-serif' }}
// //             >
// //               View All
// //             </Link>
// //           </div>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // };

// // export default DiningAndEntertainment;
// import React, { useRef, useLayoutEffect } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { ArrowRight, Star, Utensils } from "lucide-react";
// import { Link } from "@inertiajs/react";

// gsap.registerPlugin(ScrollTrigger);

// const DiningAndEntertainment = ({ restaurant, aboutDine }) => {
//   const containerRef = useRef(null);
//   const imagesRef = useRef(null);
//   const textRef = useRef(null);

//   // Extract images safely, ensuring we have at least 3 for the grid
//   const defaultImages = [
//     "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
//     "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
//     "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80",
//   ];

//   const displayImages = restaurant
//     .map((r) => r.logo)
//     .filter(Boolean)
//     .concat(defaultImages)
//     .slice(0, 3);

//   useLayoutEffect(() => {
//     const ctx = gsap.context(() => {
//       // Parallax effect for images
//       // We animate the grid items slightly differently to create depth
//       const mm = gsap.matchMedia();

//       // Desktop animation
//       mm.add("(min-width: 1024px)", () => {
//         // Fade in and slide up text
//         gsap.fromTo(textRef.current,
//           { opacity: 0, x: 50 },
//           {
//             opacity: 1,
//             x: 0,
//             duration: 1,
//             ease: "power3.out",
//             scrollTrigger: {
//               trigger: containerRef.current,
//               start: "top 70%",
//               end: "bottom 80%",
//               toggleActions: "play none none reverse"
//             }
//           }
//         );

//         // Staggered image entry
//         const imageElements = imagesRef.current?.querySelectorAll('.grid-img');
//         if (imageElements) {
//           gsap.fromTo(imageElements,
//             { y: 60, opacity: 0 },
//             {
//               y: 0,
//               opacity: 1,
//               duration: 0.8,
//               stagger: 0.2,
//               ease: "back.out(1.2)",
//               scrollTrigger: {
//                 trigger: containerRef.current,
//                 start: "top 75%",
//               }
//             }
//           );
//         }
//       });

//     }, containerRef);

//     return () => ctx.revert();
//   }, []);

//   const subtitleParts = (aboutDine.subtitle || "")
//     .split(",")
//     .map((s) => s.trim());
//   const taste = subtitleParts[0] || "Fine Dining";
//   const cuisines = subtitleParts[1] || "International";
//   return (
//     <main className="flex-grow flex flex-col items-center justify-center py-10 z-20">
//       <h1 className="text-4xl md:text-6xl font-serif font-bold text-slate-900 mb-4 text-center">
//         Welcome to <span className="text-gold-600">The Plaza</span>
//       </h1>
//       <section className="w-full py-12 md:py-24 px-4 bg-gray-100  flex justify-center overflow-hidden">
//         {/*
//         Key Change 1: Container is not full width.
//         It uses max-w-7xl and rounded corners to look like a premium feature card.
//       */}
//         <div
//           ref={containerRef}
//           className="relative w-full max-w-7xl bg-slate-950 rounded-[2.5rem] overflow-hidden shadow-2xl text-white isolate"
//         >
//           {/* Abstract Background Gradient - Darker, more premium */}
//           <div className="absolute inset-0 -z-10">
//             <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px] mix-blend-screen opacity-50"></div>
//             <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] mix-blend-screen opacity-50"></div>
//             <div className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 opacity-90"></div>

//             {/* Grain Texture Overlay for realism */}
//             <div
//               className="absolute inset-0 opacity-[0.03]"
//               style={{
//                 backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
//               }}
//             ></div>
//           </div>

//           <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 p-8 md:p-12 lg:p-16 items-center">
//             {/* Left Side: Image Collage */}
//             <div ref={imagesRef} className="lg:col-span-6 relative">
//               <div className="grid grid-cols-2 gap-4 md:gap-6">
//                 <div className="flex flex-col gap-4 md:gap-6 pt-12">
//                   <div className="grid-img group relative rounded-2xl overflow-hidden shadow-xl h-64 w-full transform transition-transform duration-500 hover:scale-[1.02]">
//                     <img
//                       src={displayImages[0]}
//                       alt="Fine Dining Atmosphere"
//                       className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
//                   </div>

//                   {/* Decorative Element */}
//                   <div className="grid-img hidden md:flex items-center justify-center p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
//                     <div className="text-center">
//                       <span className="block text-3xl font-serif text-yellow-400 font-bold">
//                         {cuisines.split(" ")[0]}{" "}
//                       </span>
//                       <span className="text-sm text-gray-300 uppercase tracking-widest">
//                         {cuisines.split(" ")[1] || "Cuisine"}
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex flex-col gap-4 md:gap-6">
//                   <div className="grid-img group relative rounded-2xl overflow-hidden shadow-xl h-80 w-full transform transition-transform duration-500 hover:scale-[1.02]">
//                     <img
//                       src={displayImages[1]}
//                       alt="Chef's Special"
//                       className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
//                     <div className="absolute bottom-4 left-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
//                       <div className="flex items-center gap-1">
//                         <Star className="w-3 h-3 text-gold-400 fill-gold-400" />
//                         <span className="text-xs font-semibold text-white">
//                           Michelin Rated
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="grid-img group relative rounded-2xl overflow-hidden shadow-xl h-48 w-full transform transition-transform duration-500 hover:scale-[1.02]">
//                     <img
//                       src={displayImages[2]}
//                       alt="Gourmet Dish"
//                       className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Right Side: Content */}
//             <div
//               ref={textRef}
//               className="lg:col-span-6 flex flex-col justify-center text-center lg:text-left"
//             >
//               <div className="inline-flex items-center gap-2 self-center lg:self-start bg-gold-500/10 border border-gold-500/20 rounded-full px-4 py-1.5 mb-6">
//                 <Utensils className="w-4 h-4 text-gold-400" />
//                 <span className="text-gold-400 text-xs font-bold tracking-widest uppercase">
//                   {taste}
//                 </span>
//               </div>

//               <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 leading-tight text-white">
//                 {aboutDine.title?.includes(" E")
//                   ? aboutDine.title.split(" E")[0]
//                   : "Fine"}
//                 <br />
//                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400">
//                   {aboutDine.title?.includes("& ")
//                     ? aboutDine.title.split("& ")[1]
//                     : "Dining"}
//                 </span>
//               </h2>

//               <p className="text-lg text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
//                 {aboutDine.description}
//               </p>

//               <div className="mb-10">
//                 <h3 className="text-xl font-serif text-white mb-4 border-b border-white/10 pb-2 inline-block">
//                   Featured Venues
//                 </h3>
//                 <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
//                   {restaurant.slice(0, 4).map((rest, index) => (
//                     <li
//                       key={index}
//                       className="flex items-center gap-3 text-gray-300 group cursor-default"
//                     >
//                       <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 group-hover:shadow-[0_0_8px_rgba(234,179,8,0.8)] transition-all" />
//                       <span className="group-hover:text-white transition-colors">
//                         {rest.name || `Restaurant ${index + 1}`}
//                       </span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//               <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
//                 <Link
//                   href={"/tenant?building=all&category=7&search="}
//                   className="bg-white text-slate-950 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-white/20 flex items-center justify-center gap-2 group"
//                 >
//                   View Restaurants
//                   <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
//                 </Link>
//                 <Link
//                   href={"/tenant"}
//                   className="px-8 py-4 rounded-xl font-semibold text-white border border-white/20 hover:bg-white/5 transition-all duration-300 flex items-center justify-center"
//                 >
//                   View All Categories
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// };



// export default DiningAndEntertainment;


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
    // <main className="flex-grow flex flex-col items-center justify-center py-10 z-20 relative">
    //   <h1 className="text-4xl md:text-6xl font-serif font-bold text-slate-900 mb-4 text-center">
    //     Welcome to <span className="text-gold-600">The Plaza</span>
    //   </h1>
    //   <section className="w-full py-12 md:py-24 px-4 bg-gray-100  flex justify-center overflow-hidden">
    //     <div
    //       ref={containerRef}
    //       className="relative w-full max-w-7xl bg-slate-950 rounded-[2.5rem] overflow-hidden shadow-2xl text-white isolate"
    //     >
    //       <div className="absolute inset-0 -z-10">
    //         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px] mix-blend-screen opacity-50"></div>
    //         <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] mix-blend-screen opacity-50"></div>
    //         <div className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 opacity-90"></div>

    //         <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
    //       </div>

    //       <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 p-8 md:p-12 lg:p-16 items-center">
    //         <div ref={imagesRef} className="lg:col-span-6 relative">
    //           <div className="grid grid-cols-2 gap-4 md:gap-6">
    //             <div className="flex flex-col gap-4 md:gap-6 pt-12">
    //               <div className="grid-img group relative rounded-2xl overflow-hidden shadow-xl h-64 w-full transform transition-transform duration-500 hover:scale-[1.02]">
    //                 <img
    //                   src={displayImages[0]}
    //                   alt="Fine Dining Atmosphere"
    //                   className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
    //                 />
    //                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
    //               </div>

    //               <div className="grid-img hidden md:flex items-center justify-center p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
    //                 <div className="text-center">
    //                   <span className="block text-3xl font-serif text-gold-400 font-bold">50+</span>
    //                   <span className="text-sm text-gray-300 uppercase tracking-widest">Cuisines</span>
    //                 </div>
    //               </div>
    //             </div>

    //             <div className="flex flex-col gap-4 md:gap-6">
    //               <div className="grid-img group relative rounded-2xl overflow-hidden shadow-xl h-80 w-full transform transition-transform duration-500 hover:scale-[1.02]">
    //                 <img
    //                   src={displayImages[1]}
    //                   alt="Chef's Special"
    //                   className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
    //                 />
    //                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
    //                 <div className="absolute bottom-4 left-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
    //                   <div className="flex items-center gap-1">
    //                     <Star className="w-3 h-3 text-gold-400 fill-gold-400" />
    //                     <span className="text-xs font-semibold text-white"></span>
    //                   </div>
    //                 </div>
    //               </div>
    //               <div className="grid-img group relative rounded-2xl overflow-hidden shadow-xl h-48 w-full transform transition-transform duration-500 hover:scale-[1.02]">
    //                 <img
    //                   src={displayImages[2]}
    //                   alt="Gourmet Dish"
    //                   className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
    //                 />
    //                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>

    //         <div ref={textRef} className="lg:col-span-6 flex flex-col justify-center text-center lg:text-left">
    //           <div className="inline-flex items-center gap-2 self-center lg:self-start bg-gold-500/10 border border-gold-500/20 rounded-full px-4 py-1.5 mb-6">
    //             <Utensils className="w-4 h-4 text-gold-400" />
    //             <span className="text-gold-400 text-xs font-bold tracking-widest uppercase">Taste the Extraordinary</span>
    //           </div>

    //           <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 leading-tight">
    //             Dining & <br />
    //             <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400">Entertainment</span>
    //           </h2>

    //           <p className="text-lg text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
    //             Experience culinary excellence from around the world. Whether you crave an intimate fine dining experience or a vibrant atmosphere for casual bites, our curated selection of restaurants offers something to ignite every palate.
    //           </p>

    //           <div className="mb-10">
    //             <h3 className="text-xl font-serif text-white mb-4 border-b border-white/10 pb-2 inline-block">Featured Venues</h3>
    //             <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
    //               {restaurant.slice(0, 4).map((restaurant, index) => (
    //                 <li key={index} className="flex items-center gap-3 text-gray-300 group cursor-default">
    //                   <span className="w-1.5 h-1.5 rounded-full bg-gold-500 group-hover:shadow-[0_0_8px_rgba(234,179,8,0.8)] transition-all" />
    //                   <span className="group-hover:text-white transition-colors">{restaurant.name}</span>
    //                 </li>
    //               ))}
    //             </ul>
    //           </div>

    //           <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
    //             <Link
    //               href={'/tenant?building=all&category=7&search='}
    //               className="bg-white text-slate-950 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-white/20 flex items-center justify-center gap-2 group"
    //             >
    //               View Resturants
    //               <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
    //             </Link>
    //             <Link
    //               href={'/tenant'}
    //               className="px-8 py-4 rounded-xl font-semibold text-white border border-white/20 hover:bg-white/5 transition-all duration-300 flex items-center justify-center"
    //             >
    //               View All Categories
    //             </Link>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </section>
    // </main>
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
