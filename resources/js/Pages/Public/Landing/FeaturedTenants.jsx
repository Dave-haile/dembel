// import React, { useRef } from 'react';
// import { motion, useInView } from 'framer-motion';
// import { Link } from '@inertiajs/inertia-react';
// import { ArrowRight } from 'lucide-react';

// const FeaturedStores = ({ tenants = [] }) => {
//   const sectionRef = useRef(null);
//   const sliderRef = useRef(null);
//   const isInView = useInView(sectionRef, { once: true, threshold: 0.3 });

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//         delayChildren: 0.2
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         type: 'spring',
//         stiffness: 100
//       }
//     }
//   };

//   const getLogo = (tenant) => {
//     if (tenant?.logo) return tenant.logo;
//     return "https://placehold.co/600x400?text=No+Store+Logo";
//   };
//                   </div>
//                 )}

//                 <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-800 transition-colors duration-200">
//                   {tenant?.name || "Unnamed Tenant"}
//                 </h3>

//                 {tenant?.description && (
//                   <p className="text-gray-600 mb-4">{tenant.description}</p>
//                 )}

//                 <Link
//                   href={`/tenant/${tenant.id}`}
//                   className="inline-flex items-center text-blue-800 hover:text-blue-900 font-medium group/link transition-colors duration-200"
//                 >
//                   Visit Store
//                   <ArrowRight
//                     size={16}
//                     className="ml-2 transform group-hover/link:translate-x-1 transition-transform duration-200"
//                   />
//                 </Link>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="text-center">
//           <Link
//             href={"/tenant"}
//             className="bg-blue-800 hover:bg-blue-900 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 inline-flex items-center group"
//           >
//             View All Tenants
//             <ArrowRight
//               size={20}
//               className="ml-2 transform group-hover:translate-x-1 transition-transform duration-200"
//             />
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FeaturedTenants;


// import React, { useRef, useEffect, useState } from 'react';
// import { Link } from '@inertiajs/react';
// import { motion, useAnimation, useMotionValue, useSpring, animate } from 'framer-motion';
// import { useInView } from 'framer-motion';

// const FeaturedTenants = ({ tenants = [] }) => {
//     const sectionRef = useRef(null);
//     const sliderRef = useRef(null);
//     const isInView = useInView(sectionRef, { once: true, threshold: 0.3 });
//     const controls = useAnimation();
    
//     // State for hover effects and auto-scroll
//     const [isHovered, setIsHovered] = useState(false);
//     const [activeTenant, setActiveTenant] = useState(null);
//     const x = useMotionValue(0);
//     const springX = useSpring(x, { damping: 30, stiffness: 100 });

//     // Duplicate tenants for seamless loop
//     const duplicatedTenants = [...tenants, ...tenants, ...tenants];

//     // Auto-scroll animation
//     useEffect(() => {
//         if (!sliderRef.current || tenants.length === 0 || isHovered) return;

//         const sliderWidth = sliderRef.current.scrollWidth / 3; // Since we duplicated 3 times
//         const animation = animate(x, [-sliderWidth, 0], {
//             duration: 40,
//             ease: "linear",
//             repeat: Infinity,
//             repeatType: "loop"
//         });

//         return animation.stop;
//     }, [x, tenants.length, isHovered]);

//     // Section entrance animation
//     useEffect(() => {
//         if (isInView) {
//             controls.start("visible");
//         }
//     }, [isInView, controls]);

//     // Extract dominant color from image (simplified - you might want to use a proper color extraction library)
//     const getDominantColor = (imageUrl) => {
//         // This is a simplified version. In production, you might want to:
//         // 1. Pre-calculate dominant colors in the backend
//         // 2. Use a proper color extraction library
//         // 3. Store the color in your tenant data
//         const colors = [
//             '#dc2626', '#ea580c', '#d97706', '#ca8a04', '#65a30d',
//             '#16a34a', '#059669', '#0d9488', '#0891b2', '#0284c7',
//             '#2563eb', '#4f46e5', '#7c3aed', '#9333ea', '#c026d3'
//         ];
//         return colors[Math.floor(Math.random() * colors.length)];
//     };

//     const containerVariants = {
//         hidden: { opacity: 0 },
//         visible: {
//             opacity: 1,
//             transition: {
//                 staggerChildren: 0.1
//             }
//         }
//     };

//     const itemVariants = {
//         hidden: { opacity: 0, y: 30 },
//         visible: {
//             opacity: 1,
//             y: 0,
//             transition: { duration: 0.6, ease: "easeOut" }
//         }
//     };

//     return (
//         <section ref={sectionRef} className="py-20 bg-black relative overflow-hidden">
//             {/* Background gradient */}
//             <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-gray-900" />
            
//             <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//                 {/* Section Header */}
//                 <motion.div
//                     initial="hidden"
//                     animate={controls}
//                     variants={containerVariants}
//                     className="text-center mb-16"
//                 >
//                     <motion.h2 
//                         variants={itemVariants}
//                         className="text-5xl font-bold text-white mb-6"
//                     >
//                         Featured <span className="text-amber-600">Tenants</span>
//                     </motion.h2>
//                     <motion.p 
//                         variants={itemVariants}
//                         className="text-xl text-gray-300 max-w-2xl mx-auto"
//                     >
//                         Discover the finest brands and stores at Dembel City Center
//                     </motion.p>
//                 </motion.div>

//                 {/* Slider Container */}
//                 <div className="relative">
//                     <motion.div
//                         ref={sliderRef}
//                         style={{ x: springX }}
//                         className="flex space-x-8 cursor-grab active:cursor-grabbing"
//                         onMouseEnter={() => setIsHovered(true)}
//                         onMouseLeave={() => setIsHovered(false)}
//                         onHoverStart={() => setIsHovered(true)}
//                         onHoverEnd={() => setIsHovered(false)}
//                     >
//                         {duplicatedTenants.map((tenant, index) => (
//                             <motion.div
//                                 key={`${tenant.id}-${index}`}
//                                 className="flex-shrink-0 w-80"
//                                 whileHover={{ 
//                                     scale: 1.05,
//                                     transition: { duration: 0.3 }
//                                 }}
//                                 onHoverStart={() => {
//                                     setActiveTenant(tenant);
//                                     setIsHovered(true);
//                                 }}
//                                 onHoverEnd={() => {
//                                     setActiveTenant(null);
//                                     setIsHovered(false);
//                                 }}
//                             >
//                                 <TenantCard 
//                                     tenant={tenant} 
//                                     isActive={activeTenant?.id === tenant.id}
//                                     dominantColor={getDominantColor(tenant.logo)}
//                                 />
//                             </motion.div>
//                         ))}
//                     </motion.div>

//                     {/* Gradient overlays for smooth edges */}
//                     <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-black to-transparent z-20" />
//                     <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-black to-transparent z-20" />
//                 </div>

//                 {/* View All CTA */}
//                 <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={controls}
//                     transition={{ delay: 0.6 }}
//                     className="text-center mt-12"
//                 >
//                     <Link
//                         href="/tenants"
//                         className="inline-flex items-center gap-2 bg-transparent border-2 border-amber-600 hover:bg-amber-600 text-amber-600 hover:text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105"
//                     >
//                         View All Tenants
//                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//                         </svg>
//                     </Link>
//                 </motion.div>
//             </div>
//         </section>
//     );
// };

// const TenantCard = ({ tenant, isActive, dominantColor }) => {
//     const [imageLoaded, setImageLoaded] = useState(false);

//     return (
//         <motion.div
//             className={`relative group rounded-2xl overflow-hidden shadow-2xl ${
//                 isActive ? 'ring-2 ring-white ring-opacity-50' : ''
//             }`}
//             whileHover="hover"
//             initial="initial"
//             animate={isActive ? "hover" : "initial"}
//         >
//             {/* Background with color transition */}
//             <motion.div
//                 className="absolute inset-0 z-0"
//                 variants={{
//                     initial: { backgroundColor: '#1f2937' }, // gray-800
//                     hover: { backgroundColor: dominantColor }
//                 }}
//                 transition={{ duration: 0.4 }}
//             />
            
//             {/* Content */}
//             <div className="relative z-10 p-6 h-48 flex flex-col justify-between">
//                 {/* Category Badge */}
//                 <motion.div
//                     className="self-start"
//                     variants={{
//                         initial: { opacity: 0.7, scale: 1 },
//                         hover: { opacity: 1, scale: 1.1 }
//                     }}
//                 >
//                     <span className="inline-block bg-black bg-opacity-50 text-white text-sm font-medium px-3 py-1 rounded-full backdrop-blur-sm">
//                         {tenant.category.name}
//                     </span>
//                 </motion.div>

//                 {/* Logo and Name */}
//                 <div className="text-center">
//                     <motion.div
//                         className="mb-4"
//                         variants={{
//                             initial: { scale: 1, filter: 'grayscale(0.3)' },
//                             hover: { scale: 1.1, filter: 'grayscale(0)' }
//                         }}
//                         transition={{ duration: 0.3 }}
//                     >
//                         {tenant.logo && (
//                             <div className="relative w-16 h-16 mx-auto mb-3">
//                                 <motion.img
//                                     src={`/${tenant.logo}`}
//                                     alt={tenant.name}
//                                     className="w-full h-full object-contain"
//                                     onLoad={() => setImageLoaded(true)}
//                                     variants={{
//                                         initial: { opacity: 0.8 },
//                                         hover: { opacity: 1 }
//                                     }}
//                                 />
//                                 {!imageLoaded && (
//                                     <div className="absolute inset-0 bg-gray-300 animate-pulse rounded" />
//                                 )}
//                             </div>
//                         )}
//                         <motion.h3
//                             className="text-xl font-bold text-white truncate"
//                             variants={{
//                                 initial: { color: '#ffffff' },
//                                 hover: { color: '#000000' }
//                             }}
//                         >
//                             {tenant.name}
//                         </motion.h3>
//                     </motion.div>

//                     {/* Location */}
//                     <motion.p
//                         className="text-sm font-medium"
//                         variants={{
//                             initial: { color: '#9ca3af' }, // gray-400
//                             hover: { color: '#000000' }
//                         }}
//                     >
//                         {tenant.building} • {tenant.location}
//                     </motion.p>
//                 </div>

//                 {/* Hover overlay with quick info */}
//                 <motion.div
//                     className="absolute inset-0 bg-black bg-opacity-0 flex items-center justify-center opacity-0"
//                     variants={{
//                         initial: { opacity: 0 },
//                         hover: { 
//                             opacity: 1,
//                             backgroundColor: 'rgba(0, 0, 0, 0.8)'
//                         }
//                     }}
//                     transition={{ duration: 0.3 }}
//                 >
//                     <div className="text-center p-4">
//                         <motion.p
//                             initial={{ opacity: 0, y: 10 }}
//                             whileHover={{ opacity: 1, y: 0 }}
//                             className="text-white text-sm mb-2"
//                         >
//                             Floor {tenant.floor_id} • {tenant.room_no}
//                         </motion.p>
//                         <motion.div
//                             initial={{ opacity: 0 }}
//                             whileHover={{ opacity: 1 }}
//                             transition={{ delay: 0.1 }}
//                         >
//                             <Link
//                                 href={`/tenants/${tenant.id}`}
//                                 className="inline-flex items-center gap-1 text-amber-400 hover:text-amber-300 text-sm font-semibold transition-colors"
//                             >
//                                 View Details
//                                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
//                                 </svg>
//                             </Link>
//                         </motion.div>
//                     </div>
//                 </motion.div>
//             </div>
//         </motion.div>
//     );
// };

// export default FeaturedTenants;
// FeaturedStores.tsx
// import React, { useState } from "react";
// import { Link } from "@inertiajs/react";
// import { ArrowRight } from "lucide-react";

// const FeaturedStores = ({ tenants }) => {
//   const [paused, setPaused] = useState(false);

//   if (!tenants || tenants.length === 0) return null;

//   // Duplicate for infinite loop
//   const items = [...tenants, ...tenants];

//   return (
//     <section className="py-16 md:py-24 bg-white">
//       <div className="container mx-auto px-4">

//         {/* Header */}
//         <div className="flex items-end justify-between mb-12">
//           <div>
//             <h2 className="text-4xl md:text-5xl font-bold text-[#303890] mb-3">
//               Featured Stores
//             </h2>
//             <p className="text-gray-600 text-lg">
//               Discover your favorite brands
//             </p>
//           </div>

//           <Link
//             href="/tenants"
//             className="hidden md:flex items-center gap-2 text-[#303890] hover:text-[#fbee21] font-semibold transition-colors group"
//           >
//             View All Stores
//             <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
//           </Link>
//         </div>

//         {/* SLIDER */}
//         <div
//           className="relative overflow-hidden -mx-4 px-4"
//           onMouseEnter={() => setPaused(true)}
//           onMouseLeave={() => setPaused(false)}
//         >
//           <div
//             className={`flex gap-6 whitespace-nowrap will-change-transform ${
//               paused ? "animate-none" : "animate-scroll"
//             }`}
//           >
//             {items.map((tenant, idx) => (
//               <Link
//                 key={`${tenant.id}-${idx}`}
//                 href={`/tenant/${tenant.id}`}
//                 className="w-72 shrink-0 group"
//               >
//                 <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  
//                   {/* LOGO */}
//                   <div className="aspect-[4/3] overflow-hidden bg-black">
//                     <img
//                       src={tenant.logo}
//                       className="
//                         w-full h-full object-cover 
//                         grayscale 
//                         group-hover:grayscale-0 
//                         transition-all duration-300 ease-out
//                       "
//                       alt={tenant.name}
//                     />
//                   </div>

//                   {/* NAME + CATEGORY */}
//                   <div className="p-6">
//                     <h3 className="text-xl font-semibold text-[#303890]">
//                       {tenant.name}
//                     </h3>
//                     <p className="text-gray-500 text-sm">
//                       {tenant?.category?.name}
//                     </p>
//                   </div>

//                 </div>
//               </Link>
//             ))}
//           </div>
//         </div>

//         {/* Mobile View All */}
//         <div className="mt-8 text-center md:hidden">
//           <Link
//             href="/tenants"
//             className="inline-flex items-center gap-2 text-[#303890] hover:text-[#fbee21] font-semibold transition-colors"
//           >
//             View All Stores
//             <ArrowRight size={20} />
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FeaturedStores;
import { Link } from "@inertiajs/react";
import React, { useRef } from "react";

/**
 * Optimized FeaturedStores slider
 * - Pure CSS scrolling (hardware accelerated)
 * - Pause-on-hover with CSS (instant)
 * - Touch support (toggles class .is-paused)
 * - Fixed card sizing to prevent layout jumps
 *
 * Expected tenants prop shape:
 * [{ id, name, logo, category: { name } , url? }]
 *
 * NOTE: I used <a> tags for stability. Replace with Inertia Link if needed (see notes below).
 */

export default function FeaturedStores({ tenants = [] }) {
  const wrapperRef = useRef(null);
  if (!tenants || tenants.length === 0) return null;

  // duplicate list for seamless loop
  const items = [...tenants, ...tenants];

  // Touch support: toggle .is-paused class on touchstart/end
  const handleTouchStart = () => wrapperRef.current?.classList.add("is-paused");
  const handleTouchEnd = () => wrapperRef.current?.classList.remove("is-paused");

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-1">Featured Tenants</h2>
            <p className="text-gray-500">Some of the top brands at Dembel City Center</p>
          </div>
          <Link
            href="/tenants"
            className="hidden md:inline-flex items-center gap-2 text-primary hover:text-accent font-semibold"
            aria-label="View all tenants"
          >
            View all
          </Link>
        </div>

        {/* Slider wrapper */}
        <div
          ref={wrapperRef}
          className="featured-slider relative -mx-4 px-4"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* track: animated transform (translateX) */}
          <div className="track flex gap-6 will-change-transform">
            {items.map((t, idx) => (
              // using Link for inertia support
              <Link
                key={`${t.id}-${idx}`}
                href={t.url ?? `/tenant/${t.id}`}
                className="tenant-card shrink-0 w-72 min-w-[18rem] group"
                aria-label={`${t.name} - ${t.category?.name}`}
              >
                <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-transform duration-300 group-hover:-translate-y-2">
                  {/* image area with fixed aspect to avoid layout shift */}
                  <div className="aspect-[4/3] w-full bg-black">
                    <img
                      src={t.logo}
                      alt={t.name}
                      width="400"
                      height="300"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover block grayscale transition-filter duration-200 ease-out"
                    />
                    {/* color tint overlay (visible on hover) */}
                    <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                         style={{ background: "linear-gradient(180deg, rgba(243, 238, 33, 0.12), rgba(48,56,144,0.09))" }}
                    />
                  </div>

                  <div className="p-5">
                    <div className="text-lg font-bold text-gray-600 group-hover:text-primary-800">{t.name}</div>
                    <div className="text-sm text-gray-700 group-hover:text-accent-700 font-bold mb-1">{t.category?.name}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
