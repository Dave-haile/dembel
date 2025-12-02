// import { useRef, useEffect } from "react";
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { Link } from "@inertiajs/react";

// gsap.registerPlugin(ScrollTrigger);

// export default function FeaturedStores({ tenants = [] }) {
//   const sectionRef = useRef(null);
//   const wrapperRef1 = useRef(null);
//   const wrapperRef2 = useRef(null);

//   useEffect(() => {
//     if (sectionRef.current) {
//       gsap.to(sectionRef.current, {
//         scrollTrigger: {
//           trigger: sectionRef.current,
//           start: "top top",
//           end: "bottom top",
//           pin: true,
//           pinSpacing: false,
//           scrub: true,
//         },
//       });
//     }

//     return () => {
//       ScrollTrigger.getAll().forEach((trigger) => {
//         if (trigger.trigger === sectionRef.current) trigger.kill();
//       });
//     };
//   }, []);

//   if (!tenants || tenants.length === 0) return null;

//   const items = [...tenants, ...tenants, ...tenants];

//   const handleTouchStart1 = () => wrapperRef1.current?.classList.add("is-paused");
//   const handleTouchEnd1 = () => wrapperRef1.current?.classList.remove("is-paused");

//   const handleTouchStart2 = () => wrapperRef2.current?.classList.add("is-paused");
//   const handleTouchEnd2 = () => wrapperRef2.current?.classList.remove("is-paused");

//   return (
//     <section
//       ref={sectionRef}
//       className="relative min-h-screen py-16 overflow-hidden flex items-center mx-auto max-w-[80rem] rounded-3xl shadow-xl
//       bg-gradient-to-br from-[#303890] via-[#2a2f7a] to-[#1e2365]
//       "
//     >
//       <div className="w-full flex justify-center bg-[radial-gradient(circle_at_30%_70%,rgba(251,238,33,0.08),transparent_50%)]">
//         <div className="w-full max-w-[80rem] px-6">
//           <div className="flex items-end justify-between mb-12">
//             <div>
//               <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">Featured Tenants</h2>
//               <p className="text-blue-100 text-lg font-medium">Some of the top brands at Dembel City Center</p>
//             </div>
//             <Link
//               href="/tenants"
//               className="hidden md:inline-flex items-center gap-2 text-white hover:text-[#fbee21] font-semibold transition-colors duration-200 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg"
//               aria-label="View all tenants"
//             >
//               View all
//               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//               </svg>
//             </Link>
//           </div>

//           {/* First Slider - Right to Left */}
//           <div
//             ref={wrapperRef1}
//             className="featured-slider mb-8"
//             onTouchStart={handleTouchStart1}
//             onTouchEnd={handleTouchEnd1}
//           >
//             <div className="track-rtl flex gap-6 will-change-transform">
//               {items.map((t, idx) => (
//                 <Link
//                   key={`rtl-${t.id}-${idx}`}
//                   href={t.url ?? `/tenant/${t.id}`}
//                   className="tenant-card shrink-0 w-72 min-w-[18rem] group"
//                   aria-label={`${t.name} - ${t.category?.name}`}
//                 >
//                   <div className="bg-white border border-white/20 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2 shadow-lg">
//                     <div className="aspect-[4/3] w-full bg-gray-100 relative overflow-hidden">
//                       <img
//                         src={t.logo}
//                         alt={t.name}
//                         width="400"
//                         height="300"
//                         loading="lazy"
//                         decoding="async"
//                         className="w-full h-full object-cover block grayscale group-hover:grayscale-0 transition-all duration-300"
//                       />
//                       <div className="absolute inset-0 bg-gradient-to-br from-[#fbee21]/20 to-[#303890]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

//                       {/* Text overlay on image */}
//                       <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
//                         <div className="text-lg font-bold text-white group-hover:text-[#fbee21] transition-colors duration-200">
//                           {t.name}
//                         </div>
//                         <div className="text-sm text-gray-200 group-hover:text-white transition-colors duration-200 font-semibold">
//                           {t.category?.name}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           </div>

//           {/* Second Slider - Left to Right */}
//           <div
//             ref={wrapperRef2}
//             className="featured-slider"
//             onTouchStart={handleTouchStart2}
//             onTouchEnd={handleTouchEnd2}
//           >
//             <div className="track-ltr flex gap-6 will-change-transform">
//               {items.map((t, idx) => (
//                 <Link
//                   key={`ltr-${t.id}-${idx}`}
//                   href={t.url ?? `/tenant/${t.id}`}
//                   className="tenant-card shrink-0 w-72 min-w-[18rem] group"
//                   aria-label={`${t.name} - ${t.category?.name}`}
//                 >
//                   <div className="bg-white border border-white/20 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2 shadow-lg">
//                     <div className="aspect-[4/3] w-full bg-gray-100 relative overflow-hidden">
//                       <img
//                         src={t.logo}
//                         alt={t.name}
//                         width="400"
//                         height="300"
//                         loading="lazy"
//                         decoding="async"
//                         className="w-full h-full object-cover block grayscale group-hover:grayscale-0 transition-all duration-300"
//                       />
//                       <div className="absolute inset-0 bg-gradient-to-br from-[#fbee21]/20 to-[#303890]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

//                       {/* Text overlay on image */}
//                       <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
//                         <div className="text-lg font-bold text-white group-hover:text-[#fbee21] transition-colors duration-200">
//                           {t.name}
//                         </div>
//                         <div className="text-sm text-gray-200 group-hover:text-white transition-colors duration-200 font-semibold">
//                           {t.category?.name}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           </div>

//           <Link
//             href="/tenants"
//             className="md:hidden mt-8 inline-flex items-center gap-2 text-white hover:text-[#fbee21] font-semibold transition-colors duration-200 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg"
//             aria-label="View all tenants"
//           >
//             View all tenants
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//             </svg>
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// }


// import React, { useRef, useEffect } from "react";
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { Link as InertiaLink } from "@inertiajs/react";

// // Mocking Inertia Link for standalone React
// const Link = ({
//   href,
//   className,
//   ariaLabel,
//   children
// }) => {
//   return (
//     <InertiaLink href={href} className={className} aria-label={ariaLabel}>
//       {children}
//     </InertiaLink>
//   );
// };

// gsap.registerPlugin(ScrollTrigger);

// export default function FeaturedStores({ tenants = [] }) {
//   const containerRef = useRef(null);
//   const row1Ref = useRef(null);
//   const row2Ref = useRef(null);

//   // Refs for individual tweens to control pause/play independently
//   const tween1 = useRef(null);
//   const tween2 = useRef(null);

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       // Row 1 Animation (Right to Left)
//       if (row1Ref.current) {
//         // Increased duration to 80s (was 40) for slower speed
//         tween1.current = gsap.to(row1Ref.current, {
//           xPercent: -50, // Move half the width (assuming content is doubled/tripled)
//           ease: "none",
//           duration: 80,
//           repeat: -1,
//         });
//       }

//       // Row 2 Animation (Left to Right)
//       if (row2Ref.current) {
//         // Increased duration to 85s (was 45) for slower speed
//         tween2.current = gsap.fromTo(row2Ref.current,
//           { xPercent: -50 },
//           {
//             xPercent: 0,
//             ease: "none",
//             duration: 85,
//             repeat: -1,
//           }
//         );
//       }
//     }, containerRef);

//     return () => {
//       ctx.revert();
//       tween1.current = null;
//       tween2.current = null;
//     };
//   }, [tenants]);

//   if (!tenants || tenants.length === 0) return null;

//   // Quadruple items to ensure seamless loop on large screens
//   const items = [...tenants, ...tenants, ...tenants, ...tenants];

//   return (
//     <section className="w-full py-16 px-4 flex justify-center">
//       {/* Main Card Container restricted to 80rem */}
//       <div
//         ref={containerRef}
//         className="w-full max-w-[80rem] bg-primary rounded-[2.5rem] shadow-2xl overflow-hidden relative py-16"
//       >
//         {/* Background Decor */}
//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(251,238,33,0.15),transparent_50%)] pointer-events-none" />
//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.1),transparent_50%)] pointer-events-none" />

//         <div className="container mx-auto px-6 relative z-10">
//           {/* Header Section */}
//           <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
//             <div className="max-w-2xl">
//               <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
//                 Featured <span className="text-accent">Tenants</span>
//               </h2>
//               <p className="text-blue-200 text-lg mt-4 max-w-lg leading-relaxed">
//                 Explore some of the top brands and exclusive boutiques available at Dembel City Center.
//               </p>
//             </div>

//             <Link
//               href="/tenants"
//               className="group hidden md:inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 hover:bg-accent hover:text-primary border border-white/20 hover:border-accent transition-all duration-300 text-white font-semibold backdrop-blur-sm"
//               ariaLabel="View all tenants"
//             >
//               <span>View Directory</span>
//               <svg
//                 className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//               </svg>
//             </Link>
//           </div>
//         </div>

//         {/* Sliders Container */}
//         <div className="flex flex-col gap-8 w-full">
//           {/* Row 1: Right to Left */}
//           <div
//             className="w-full overflow-hidden -rotate-1 hover:rotate-0 transition-transform duration-500"
//             onMouseEnter={() => tween1.current?.pause()}
//             onMouseLeave={() => tween1.current?.play()}
//             onTouchStart={() => tween1.current?.pause()}
//             onTouchEnd={() => tween1.current?.play()}
//           >
//             <div ref={row1Ref} className="flex gap-6 w-max pl-6">
//               {items.map((t, idx) => (
//                 <TenantCard key={`r1-${t.id}-${idx}`} tenant={t} />
//               ))}
//             </div>
//           </div>

//           {/* Row 2: Left to Right */}
//           <div
//             className="w-full overflow-hidden rotate-1 hover:rotate-0 transition-transform duration-500"
//             onMouseEnter={() => tween2.current?.pause()}
//             onMouseLeave={() => tween2.current?.play()}
//             onTouchStart={() => tween2.current?.pause()}
//             onTouchEnd={() => tween2.current?.play()}
//           >
//             <div ref={row2Ref} className="flex gap-6 w-max pl-6">
//               {items.map((t, idx) => (
//                 <TenantCard key={`r2-${t.id}-${idx}`} tenant={t} />
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Mobile CTA */}
//         <div className="container mx-auto px-6 mt-12 md:hidden">
//           <Link
//             href="/tenants"
//             className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-accent text-primary font-bold shadow-lg hover:shadow-xl transition-shadow"
//             ariaLabel="View all tenants"
//           >
//             View Full Directory
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//             </svg>
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// }

// // Sub-component for cleaner code
// const TenantCard = ({ tenant }) => (
//   <Link
//     href={tenant.url ?? `/tenant/${tenant.id}`}
//     className="group relative flex-shrink-0 w-72 h-48 bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 block"
//     ariaLabel={`${tenant.name} - ${tenant.category?.name}`}
//   >
//     <img
//       src={tenant.logo}
//       alt={tenant.name}
//       loading="lazy"
//       className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0 opacity-90 group-hover:opacity-100"
//     />

//     {/* Gradient Overlay */}
//     <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

//     {/* Content */}
//     <div className="absolute bottom-0 left-0 w-full p-5 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
//       <div className="flex items-center justify-between">
//         <div>
//           <h3 className="text-xl font-bold text-white mb-1 drop-shadow-md">{tenant.name}</h3>
//           <p className="text-sm font-medium text-accent uppercase tracking-wider">{tenant.category?.name}</p>
//         </div>
//         <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
//           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//           </svg>
//         </div>
//       </div>
//     </div>

//     {/* Shine effect on hover */}
//     <div className="absolute inset-0 -translate-x-full group-hover:animate-[shine_1.5s_ease-in-out] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
//   </Link>
// );

// // Add custom shine animation via style injection for the card effect
// const styleSheet = document.createElement("style");
// styleSheet.innerText = `
//   @keyframes shine {
//     100% { transform: translateX(100%); }
//   }
// `;
// document.head.appendChild(styleSheet);

// import React, { useRef, useEffect } from "react";
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

// gsap.registerPlugin(ScrollTrigger);

// const Link = ({
//   href,
//   className,
//   ariaLabel,
//   children
// }) => {
//   return (
//     <a href={href} className={className} aria-label={ariaLabel}>
//       {children}
//     </a>
//   );
// };

// export default function FeaturedStores({ tenants = [] }) {
//   const containerRef = useRef(null);
//   const row1Ref = useRef(null);
//   const row2Ref = useRef(null);

//   const tween1 = useRef(null);
//   const tween2 = useRef(null);

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       // Row 1 Animation (Right to Left)
//       if (row1Ref.current) {
//         tween1.current = gsap.to(row1Ref.current, {
//           xPercent: -50,
//           ease: "none",
//           duration: 40, // Sped up slightly for demo
//           repeat: -1,
//         });
//       }

//       // Row 2 Animation (Left to Right)
//       if (row2Ref.current) {
//         tween2.current = gsap.fromTo(row2Ref.current,
//           { xPercent: -50 },
//           {
//             xPercent: 0,
//             ease: "none",
//             duration: 45, // Different duration to avoid syncing
//             repeat: -1,
//           }
//         );
//       }
//     }, containerRef);

//     return () => {
//       ctx.revert();
//     };
//   }, [tenants]);

//   // Ensure we have enough items to scroll
//   const items = tenants.length > 0 ? [...tenants, ...tenants, ...tenants, ...tenants] : [];

//   if (items.length === 0) return null;

//   return (
//     // SECTION STYLING: Sticky positioning for the paper stack effect.
//     // top-4 sets the stop position. z-10 puts it below the next section.
//     <section className="w-full py-8 px-4 flex justify-center sticky top-16 z-10 mb-12">
//       <div
//         ref={containerRef}
//         className="w-full max-w-[80rem] bg-[#1e293b] rounded-[2.5rem] shadow-2xl overflow-hidden relative py-16 border border-white/5"
//       >
//         {/* Background Decor */}
//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(250,204,21,0.1),transparent_50%)] pointer-events-none" />
//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.05),transparent_50%)] pointer-events-none" />

//         <div className="container mx-auto px-6 relative z-10">
//           {/* Header Section */}
//           <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
//             <div className="max-w-2xl">
//               <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
//                 Featured <span className="text-yellow-400">Tenants</span>
//               </h2>
//               <p className="text-slate-300 text-lg mt-4 max-w-lg leading-relaxed">
//                 Explore some of the top brands and exclusive boutiques available at Dembel City Center.
//               </p>
//             </div>

//             <Link
//               href="#"
//               className="group hidden md:inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 hover:bg-yellow-400 hover:text-slate-900 border border-white/20 hover:border-yellow-400 transition-all duration-300 text-white font-semibold backdrop-blur-sm"
//               ariaLabel="View all tenants"
//             >
//               <span>View Directory</span>
//               <svg
//                 className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//               </svg>
//             </Link>
//           </div>
//         </div>

//         {/* Sliders Container */}
//         <div className="flex flex-col gap-8 w-full">
//           {/* Row 1: Right to Left */}
//           <div
//             className="w-full overflow-hidden -rotate-1 hover:rotate-0 transition-transform duration-500"
//             onMouseEnter={() => tween1.current?.pause()}
//             onMouseLeave={() => tween1.current?.play()}
//             onTouchStart={() => tween1.current?.pause()}
//             onTouchEnd={() => tween1.current?.play()}
//           >
//             <div ref={row1Ref} className="flex gap-6 w-max pl-6">
//               {items.map((t, idx) => (
//                 <TenantCard key={`r1-${t.id}-${idx}`} tenant={t} />
//               ))}
//             </div>
//           </div>

//           {/* Row 2: Left to Right */}
//           <div
//             className="w-full overflow-hidden rotate-1 hover:rotate-0 transition-transform duration-500"
//             onMouseEnter={() => tween2.current?.pause()}
//             onMouseLeave={() => tween2.current?.play()}
//             onTouchStart={() => tween2.current?.pause()}
//             onTouchEnd={() => tween2.current?.play()}
//           >
//             <div ref={row2Ref} className="flex gap-6 w-max pl-6">
//               {items.map((t, idx) => (
//                 <TenantCard key={`r2-${t.id}-${idx}`} tenant={t} />
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Mobile CTA */}
//         <div className="container mx-auto px-6 mt-12 md:hidden">
//           <Link
//             href="#"
//             className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-yellow-400 text-slate-900 font-bold shadow-lg hover:shadow-xl transition-shadow"
//             ariaLabel="View all tenants"
//           >
//             View Full Directory
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//             </svg>
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// }

// const TenantCard = ({ tenant }) => (
//   <Link
//     href={tenant.url ?? `#`}
//     className="group relative flex-shrink-0 w-72 h-48 bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 block"
//     ariaLabel={`${tenant.name} - ${tenant.category?.name}`}
//   >
//     <img
//       src={tenant.logo}
//       alt={tenant.name}
//       loading="lazy"
//       className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0 opacity-90 group-hover:opacity-100"
//     />

//     {/* Gradient Overlay */}
//     <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

//     {/* Content */}
//     <div className="absolute bottom-0 left-0 w-full p-5 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
//       <div className="flex items-center justify-between">
//         <div>
//           <h3 className="text-xl font-bold text-white mb-1 drop-shadow-md">{tenant.name}</h3>
//           <p className="text-xs font-bold text-yellow-400 uppercase tracking-wider">{tenant.category?.name}</p>
//         </div>
//         <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
//           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//           </svg>
//         </div>
//       </div>
//     </div>
//   </Link>
// );

import React, { useRef, useEffect } from "react";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from "@inertiajs/react";

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedStores({ tenants = [] }) {
  const containerRef = useRef(null);
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);

  // Refs for individual tweens to control pause/play independently
  const tween1 = useRef(null);
  const tween2 = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin the entire section for the "paper on paper" effect
      gsap.to(containerRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          pin: true,
          pinSpacing: false,
          scrub: true,
        },
      });

      // Row 1 Animation (Right to Left)
      if (row1Ref.current) {
        tween1.current = gsap.to(row1Ref.current, {
          xPercent: -50,
          ease: "none",
          duration: 80,
          repeat: -1,
        });
      }

      // Row 2 Animation (Left to Right)
      if (row2Ref.current) {
        tween2.current = gsap.fromTo(row2Ref.current,
          { xPercent: -50 },
          {
            xPercent: 0,
            ease: "none",
            duration: 85,
            repeat: -1,
          }
        );
      }
    }, containerRef);

    return () => {
      ctx.revert();
      tween1.current = null;
      tween2.current = null;
    };
  }, [tenants]);

  if (!tenants || tenants.length === 0) return null;

  const items = [...tenants, ...tenants, ...tenants, ...tenants];

  return (
    <section className="w-full py-8 px-4 flex justify-center relative min-h-screen z-10">
      {/* Main Card Container - increased height */}
      <div
        ref={containerRef}
        className="w-full max-w-[80rem] bg-primary rounded-[2.5rem] shadow-2xl overflow-hidden relative h-screen flex flex-col justify-center"
      >
        {/* Background Decor */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(251,238,33,0.15),transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.1),transparent_50%)] pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10 h-full flex flex-col justify-center">
          {/* Header Section - moved up with pt-8 */}
          <div className="pt-8 md:pt-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div className="max-w-2xl">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
                  Featured <span className="text-accent">Tenants</span>
                </h2>
                <p className="text-blue-200 text-lg md:text-xl mt-6 max-w-lg leading-relaxed">
                  Explore some of the top brands and exclusive boutiques available at Dembel City Center.
                </p>
              </div>

              <Link
                href="/tenants"
                className="group hidden md:inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white/10 hover:bg-accent hover:text-primary border border-white/20 hover:border-accent transition-all duration-300 text-white font-semibold backdrop-blur-sm text-lg"
                aria-label="View all tenants"
              >
                <span>View Directory</span>
                <svg
                  className="w-6 h-6 transform group-hover:translate-x-2 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Sliders Container - increased gap and added more vertical spacing */}
          <div className="flex flex-col gap-12 w-full px-6 mb-8 flex-1 justify-center">
            {/* Row 1: Right to Left */}
            <div
              className="w-full overflow-hidden -rotate-1 hover:rotate-0 transition-transform duration-500"
              onMouseEnter={() => tween1.current?.pause()}
              onMouseLeave={() => tween1.current?.play()}
              onTouchStart={() => tween1.current?.pause()}
              onTouchEnd={() => tween1.current?.play()}
            >
              <div ref={row1Ref} className="flex gap-8 w-max pl-6">
                {items.map((t, idx) => (
                  <TenantCard key={`r1-${t.id}-${idx}`} tenant={t} />
                ))}
              </div>
            </div>

            {/* Row 2: Left to Right */}
            <div
              className="w-full overflow-hidden rotate-1 hover:rotate-0 transition-transform duration-500"
              onMouseEnter={() => tween2.current?.pause()}
              onMouseLeave={() => tween2.current?.play()}
              onTouchStart={() => tween2.current?.pause()}
              onTouchEnd={() => tween2.current?.play()}
            >
              <div ref={row2Ref} className="flex gap-8 w-max pl-6">
                {items.map((t, idx) => (
                  <TenantCard key={`r2-${t.id}-${idx}`} tenant={t} />
                ))}
              </div>
            </div>
          </div>

          {/* Mobile CTA - improved styling */}
          <div className="container mx-auto px-6 pb-8 md:hidden">
            <Link
              href="/tenants"
              className="flex items-center justify-center gap-3 w-full py-5 rounded-xl bg-accent text-primary font-bold text-lg shadow-2xl hover:shadow-3xl transition-all hover:scale-[1.02]"
              aria-label="View all tenants"
            >
              View Full Directory
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// Sub-component for cleaner code
const TenantCard = ({ tenant }) => (
  <Link
    href={`/tenant/${tenant.id}`}
    className="group relative flex-shrink-0 w-80 h-52 bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 block"
    aria-label={`${tenant.name} - ${tenant.category?.name}`}
  >
    <img
      src={tenant.logo}
      alt={tenant.name}
      loading="lazy"
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0 opacity-90 group-hover:opacity-100"
    />

    {/* Gradient Overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

    {/* Content */}
    <div className="absolute bottom-0 left-0 w-full p-6 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-white mb-2 drop-shadow-md">{tenant.name}</h3>
          <p className="text-sm font-medium text-accent uppercase tracking-wider">{tenant.category?.name}</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>

    {/* Shine effect on hover */}
    <div className="absolute inset-0 -translate-x-full group-hover:animate-[shine_1.5s_ease-in-out] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
  </Link>
);