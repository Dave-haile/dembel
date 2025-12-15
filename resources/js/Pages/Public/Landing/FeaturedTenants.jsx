// import React, { useRef, useEffect, useMemo, useCallback } from "react";
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

// // Since we are not using Inertia in this standalone demo, we mock Link
// // In your real project, keep: import { Link } from "@inertiajs/react";
// const Link = ({ href, className, children, ...props }) => (
//   <a href={href} className={className} {...props}>{children}</a>
// );

// gsap.registerPlugin(ScrollTrigger);
// function FeaturedTenants({ tenants = [] }) {
//   const row1Ref = useRef(null);
//   const row2Ref = useRef(null);

//   // Refs for individual tweens to control pause/play independently
//   const tween1 = useRef(null);
//   const tween2 = useRef(null);

//   const createInfiniteScroll = useCallback((ref, duration, direction) => {
//     if (!ref.current) return null;
    
//     const toValue = direction === 'right' ? -50 : 0;
//     const fromValue = direction === 'right' ? 0 : -50;

//     // PERFORMANCE: force3D: true ensures GPU acceleration
//     return gsap.fromTo(ref.current,
//       { xPercent: fromValue },
//       {
//         xPercent: toValue,
//         ease: "none",
//         duration: duration,
//         repeat: -1,
//         force3D: true, 
//       }
//     );
//   }, []);

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       // Row 1 Animation (Right to Left)
//       if (row1Ref.current) {
//         tween1.current = createInfiniteScroll(row1Ref, 80, 'right');
//       }

//       // Row 2 Animation (Left to Right)
//       if (row2Ref.current) {
//         tween2.current = createInfiniteScroll(row2Ref, 85, 'left');
//       }
//     });

//     return () => {
//       ctx.revert();
//       tween1.current = null;
//       tween2.current = null;
//     };
//   }, [tenants, createInfiniteScroll]);

//   if (!tenants || tenants.length === 0) return null;

//   // Quadruple items to ensure seamless loop
//   const items = useMemo(() => [...tenants, ...tenants, ...tenants, ...tenants], [tenants]);

//   return (
//     // CHANGE: The section itself is now sticky. This is crucial for the "Paper on Paper" effect.
//     // When this sticks, the next component (Dining) will slide over it.
//     // z-10 ensures it is below the next component (which will be z-20).
//     <section className="w-full py-4 px-4 flex justify-center sticky top-4 z-10 pointer-events-none">
//       <div
//         className="w-full max-w-[80rem] bg-[#1a202c] rounded-[2.5rem] shadow-2xl overflow-hidden relative h-[90vh] flex flex-col justify-center pointer-events-auto transform-gpu translate-z-0"
//       >
//         {/* Background Decor */}
//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(251,238,33,0.15),transparent_50%)] pointer-events-none" />
//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.1),transparent_50%)] pointer-events-none" />

//         <div className="container mx-auto px-6 relative z-10 h-full flex flex-col justify-center">
//           {/* Header Section */}
//           <div className="pt-4 md:pt-8 flex-shrink-0">
//             <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
//               <div className="max-w-2xl">
//                 <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mt-4">
//                   Featured <span className="text-yellow-400">Tenants</span>
//                 </h2>
//                 <p className="text-blue-200 text-lg md:text-xl mt-4 max-w-lg leading-relaxed">
//                   Explore some of the top brands and exclusive boutiques available at Dembel City Center.
//                 </p>
//               </div>

//               <Link
//                 href="/tenants"
//                 className="group hidden md:inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white/10 hover:bg-yellow-400 hover:text-gray-900 border border-white/20 hover:border-yellow-400 transition-all duration-300 text-white font-semibold backdrop-blur-sm text-lg"
//                 aria-label="View all tenants"
//               >
//                 <span>View Directory</span>
//                 <svg
//                   className="w-6 h-6 transform group-hover:translate-x-2 transition-transform"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//                 </svg>
//               </Link>
//             </div>
//           </div>

//           {/* Sliders Container */}
//           <div className="flex flex-col gap-8 w-full px-2 mb-8 flex-1 justify-center overflow-hidden">
//             {/* Row 1: Right to Left */}
//             <div
//               className="w-full -rotate-1 hover:rotate-0 transition-transform duration-500 will-change-transform"
//               onMouseEnter={() => tween1.current?.pause()}
//               onMouseLeave={() => tween1.current?.play()}
//               onTouchStart={() => tween1.current?.pause()}
//               onTouchEnd={() => tween1.current?.play()}
//             >
//               <div ref={row1Ref} className="flex gap-8 pl-6 min-w-max will-change-transform">
//                 {items.map((t, idx) => (
//                   <TenantCard key={`r1-${t.id}-${idx}`} tenant={t} />
//                 ))}
//               </div>
//             </div>

//             {/* Row 2: Left to Right */}
//             <div
//               className="w-full rotate-1 hover:rotate-0 transition-transform duration-500 will-change-transform"
//               onMouseEnter={() => tween2.current?.pause()}
//               onMouseLeave={() => tween2.current?.play()}
//               onTouchStart={() => tween2.current?.pause()}
//               onTouchEnd={() => tween2.current?.play()}
//             >
//               <div ref={row2Ref} className="flex gap-8 pl-6 min-w-max will-change-transform">
//                 {items.map((t, idx) => (
//                   <TenantCard key={`r2-${t.id}-${idx}`} tenant={t} />
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Mobile CTA */}
//           <div className="container mx-auto px-6 pb-8 md:hidden flex-shrink-0">
//             <Link
//               href="/tenants"
//               className="flex items-center justify-center gap-3 w-full py-5 rounded-xl bg-yellow-400 text-gray-900 font-bold text-lg shadow-2xl hover:shadow-3xl transition-all hover:scale-[1.02]"
//               aria-label="View all tenants"
//             >
//               View Full Directory
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//               </svg>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// // Sub-component for cleaner code
// const TenantCard = React.memo(({ tenant }) => {
//   return (
//   <Link
//     href={`/tenant/${tenant.id}`}
//     // PERFORMANCE: Added will-change-transform
//     className="group relative flex-shrink-0 w-80 h-52 bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 block transform-gpu backface-hidden"
//     aria-label={`${tenant.name} - ${tenant.category?.name}`}
//   >
//     <img
//       src={tenant.logo}
//       alt={tenant.name}
//       loading="lazy"
//       // PERFORMANCE: Reduced duration slightly for snappier feel
//       className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0 opacity-90 group-hover:opacity-100"
//     />

//     {/* Gradient Overlay */}
//     <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

//     {/* Content */}
//     <div className="absolute bottom-0 left-0 w-full p-6 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
//       <div className="flex items-center justify-between">
//         <div>
//           <h3 className="text-xl font-bold text-white mb-2 drop-shadow-md">{tenant.name}</h3>
//           <p className="text-sm font-medium text-yellow-400 uppercase tracking-wider">{tenant.category?.name}</p>
//         </div>
//         <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
//           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//           </svg>
//         </div>
//       </div>
//     </div>
//   </Link>
//   );
// });
// TenantCard.displayName = 'TenantCard';
// export default FeaturedTenants;

import React, { useRef, useEffect, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "@inertiajs/react";

gsap.registerPlugin(ScrollTrigger);

function FeaturedTenants({ tenants = [] }) {
  const containerRef = useRef(null);

  // Prepare items for scrolling rows
  const items = useMemo(() => [...tenants, ...tenants], [tenants]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        pin: true,
        pinSpacing: false,
        scrub: 0.5,
      });
    }, containerRef);

    return () => ctx.revert();
  }, [tenants]);

  if (!tenants || tenants.length === 0) return null;

  return (
    <section className="w-full py-8 px-4 flex justify-center relative min-h-screen z-10">
      <div
        ref={containerRef}
        className="w-full max-w-[80rem] bg-primary rounded-[2.5rem] shadow-2xl overflow-hidden relative h-screen flex flex-col justify-center"
        style={{ transform: "translateZ(0)" }}
      >
        {/* Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(251,238,33,0.15),transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.1),transparent_50%)] pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10 h-full flex flex-col justify-center">
          {/* Header */}
          <div className="pt-8 md:pt-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div className="max-w-2xl">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mt-24">
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

          {/* Scrolling Rows with staggered offset */}
          <div className="flex flex-col gap-6 w-full px-6 mb-8 flex-1 justify-center">
            <div className="overflow-visible w-full  transition-transform duration-500 py-8">
              <div className="flex min-w-max animate-marquee-left gap-8">
                {items.map((t, idx) => (
                  <TenantCard
                    key={`r1-${t.id}-${idx}`}
                    tenant={t}
                    staggerOffset={idx * 6} // slightly smaller offset
                  />
                ))}
              </div>
            </div>

            {/* Row 2: Left to Right */}
            <div className="overflow-visible w-full transition-transform duration-500 py-8">
              <div className="flex min-w-max animate-marquee-right gap-8">
                {items.map((t, idx) => (
                  <TenantCard
                    key={`r2-${t.id}-${idx}`}
                    tenant={t}
                    staggerOffset={idx * 6}
                  />
                ))}
              </div>
            </div>

          </div>

          {/* Mobile CTA */}
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

      {/* CSS Animations */}
      <style>{`
        @keyframes marquee-left {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
        .animate-marquee-left {
          animation: marquee-left 25s linear infinite;
        }
        .animate-marquee-right {
          animation: marquee-right 25s linear infinite;
        }
        .animate-marquee-left:hover, .animate-marquee-right:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}

// Tenant Card with stagger offset for paper-on-paper effect
const TenantCard = React.memo(({ tenant, staggerOffset = 0 }) => {
  return (
    <Link
      href={`/tenant/${tenant.id}`}
      className="group relative flex-shrink-0 w-80 h-52 bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 block"
      style={{
        transform: `translateZ(0) translateY(${staggerOffset}px)`,
        willChange: "transform",
      }}
      aria-label={`${tenant.name} - ${tenant.category?.name}`}
    >
      <img
        src={tenant.logo}
        alt={tenant.name}
        loading="lazy"
        width="320"
        height="208"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0 opacity-90 group-hover:opacity-100"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
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
      <div className="absolute inset-0 -translate-x-full group-hover:animate-[shine_1.5s_ease-in-out] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
    </Link>
  );
});
TenantCard.displayName = "TenantCard";

export default FeaturedTenants;
