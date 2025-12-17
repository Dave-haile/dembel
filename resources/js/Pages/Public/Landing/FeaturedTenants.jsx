// import React, { useRef, useMemo } from "react";
// import { Link } from "@inertiajs/react";


// function FeaturedTenants({ tenants = [] }) {
//   const containerRef = useRef(null);
//   const items = useMemo(() => [...tenants, ...tenants], [tenants]);

//   if (!tenants || tenants.length === 0) return null;

//   return (
//     <section className="w-full py-8 px-4 flex justify-center relative min-h-screen z-10">
//       <div
//         ref={containerRef}
//         className="w-full max-w-[80rem] bg-primary rounded-[2.5rem] shadow-2xl overflow-hidden relative h-screen flex flex-col justify-center"
//         style={{ transform: "translateZ(0)" }}
//       >
//         {/* Background */}
//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(251,238,33,0.15),transparent_50%)] pointer-events-none" />
//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.1),transparent_50%)] pointer-events-none" />

//         <div className="container mx-auto px-6 relative z-10 h-full flex flex-col justify-center">
//           {/* Header */}
//           <div className="pt-8 md:pt-12">
//             <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
//               <div className="max-w-2xl">
//                 <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mt-24">
//                   Featured <span className="text-accent">Tenants</span>
//                 </h2>
//                 <p className="text-blue-200 text-lg md:text-xl mt-6 max-w-lg leading-relaxed">
//                   Explore some of the top brands and exclusive boutiques available at Dembel City Center.
//                 </p>
//               </div>
//               <Link
//                 href="/tenants"
//                 className="group hidden md:inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white/10 hover:bg-accent hover:text-primary border border-white/20 hover:border-accent transition-all duration-300 text-white font-semibold backdrop-blur-sm text-lg"
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

//           {/* Scrolling Rows */}
//           <div className="flex flex-col gap-6 w-full px-6 mb-8 flex-1 justify-center">
//             <div className="overflow-visible w-full transition-transform duration-500 py-8">
//               <div className="flex min-w-max animate-marquee-left gap-8">
//                 {items.map((t, idx) => (
//                   <TenantCard
//                     key={`r1-${t.id}-${idx}`}
//                     tenant={t}
//                   />
//                 ))}
//               </div>
//             </div>

//             {/* Row 2: Left to Right */}
//             <div className="overflow-visible w-full transition-transform duration-500 py-8">
//               <div className="flex min-w-max animate-marquee-right gap-8">
//                 {items.map((t, idx) => (
//                   <TenantCard
//                     key={`r2-${t.id}-${idx}`}
//                     tenant={t}
//                   />
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Mobile CTA */}
//           <div className="container mx-auto px-6 pb-8 md:hidden">
//             <Link
//               href="/tenants"
//               className="flex items-center justify-center gap-3 w-full py-5 rounded-xl bg-accent text-primary font-bold text-lg shadow-2xl hover:shadow-3xl transition-all hover:scale-[1.02]"
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

//       {/* CSS Animations */}
//       <style>{`
//         @keyframes marquee-left {
//           0% { transform: translateX(0%); }
//           100% { transform: translateX(-50%); }
//         }
//         @keyframes marquee-right {
//           0% { transform: translateX(-50%); }
//           100% { transform: translateX(0%); }
//         }
//         .animate-marquee-left {
//           animation: marquee-left 25s linear infinite;
//         }
//         .animate-marquee-right {
//           animation: marquee-right 25s linear infinite;
//         }
//         .animate-marquee-left:hover, .animate-marquee-right:hover {
//           animation-play-state: paused;
//         }
//       `}</style>
//     </section>
//   );
// }

// // Tenant Card without staggered offset
// const TenantCard = React.memo(({ tenant }) => {
//   return (
//     <Link
//       href={`/tenant/${tenant.id}`}
//       className="group relative flex-shrink-0 w-80 h-52 bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 block"
//       aria-label={`${tenant.name} - ${tenant.category?.name}`}
//     >
//       <img
//         src={tenant.logo}
//         alt={tenant.name}
//         loading="lazy"
//         width="320"
//         height="208"
//         className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0 opacity-90 group-hover:opacity-100"
//       />
//       <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
//       <div className="absolute bottom-0 left-0 w-full p-6 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
//         <div className="flex items-center justify-between">
//           <div>
//             <h3 className="text-xl font-bold text-white mb-2 drop-shadow-md">{tenant.name}</h3>
//             <p className="text-sm font-medium text-accent uppercase tracking-wider">{tenant.category?.name}</p>
//           </div>
//           <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//             </svg>
//           </div>
//         </div>
//       </div>
//       <div className="absolute inset-0 -translate-x-full group-hover:animate-[shine_1.5s_ease-in-out] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
//     </Link>
//   );
// });
// TenantCard.displayName = "TenantCard";

// export default FeaturedTenants;

import React, { useRef, useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "@inertiajs/react";


const FeaturedTenants = ({ tenants = [] }) => {
  const containerRef = useRef(null);
  // Duplicate items to ensure smooth infinite scrolling
  const items = useMemo(() => [...tenants, ...tenants, ...tenants], [tenants]);

  if (!tenants || tenants.length === 0) return null;

  return (
    <section className="w-full py-8 px-4 flex justify-center relative min-h-screen z-10 bg-white">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        ref={containerRef}
        className="w-full max-w-[85rem] bg-primary rounded-[2.5rem] shadow-2xl overflow-hidden relative flex flex-col justify-center py-20"
        style={{ transform: "translateZ(0)" }}
      >
        {/* Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(250,194,78,0.15),transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.05),transparent_50%)] pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10 h-full flex flex-col justify-center">
          {/* Header */}
          <div className="mb-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="max-w-3xl">
                <motion.h2 
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-4xl md:text-5xl lg:text-7xl font-serif font-extrabold text-white tracking-tight leading-tight"
                >
                  Featured <span className="text-accent">Tenants</span>
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-slate-300 text-lg md:text-xl mt-6 max-w-lg leading-relaxed font-light"
                >
                  Explore some of the top brands and exclusive boutiques available at Dembel City Centre.
                </motion.p>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <a
                  href="#"
                  className="group hidden md:inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white/10 hover:bg-accent hover:text-primary border border-white/20 hover:border-accent transition-all duration-300 text-white font-semibold backdrop-blur-sm text-lg"
                  aria-label="View all tenants"
                >
                  <span>View Directory</span>
                  <ArrowRight className="w-6 h-6 transform group-hover:translate-x-2 transition-transform" />
                </a>
              </motion.div>
            </div>
          </div>

          {/* Scrolling Rows */}
          <div className="flex flex-col gap-8 w-full mb-8 relative">
            {/* Fade edges for marquee */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-primary to-transparent z-20 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-primary to-transparent z-20 pointer-events-none" />

            {/* Row 1: Left to Right */}
            <div className="overflow-hidden w-full">
              <div className="flex min-w-max animate-marquee-left gap-6 hover:[animation-play-state:paused]">
                {items.map((t, idx) => (
                  <TenantCard
                    key={`r1-${t.id}-${idx}`}
                    tenant={t}
                  />
                ))}
              </div>
            </div>

            {/* Row 2: Right to Left */}
            <div className="overflow-hidden w-full">
              <div className="flex min-w-max animate-marquee-right gap-6 hover:[animation-play-state:paused]">
                {items.map((t, idx) => (
                  <TenantCard
                    key={`r2-${t.id}-${idx}`}
                    tenant={t}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Mobile CTA */}
          <div className="container mx-auto mt-8 md:hidden">
            <a
              href="#"
              className="flex items-center justify-center gap-3 w-full py-5 rounded-2xl bg-accent text-primary font-bold text-lg shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02]"
              aria-label="View all tenants"
            >
              View Full Directory
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </motion.div>

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
          animation: marquee-left 40s linear infinite;
        }
        .animate-marquee-right {
          animation: marquee-right 40s linear infinite;
        }
      `}</style>
    </section>
  );
};

// Tenant Card
const TenantCard = React.memo(({ tenant }) => {
  return (
    <Link
      href={`/tenant/${tenant.id}`}
      className="group relative flex-shrink-0 w-72 h-48 sm:w-80 sm:h-52 bg-white rounded-2xl overflow-hidden shadow-xl border border-white/5 transition-all duration-300 hover:-translate-y-2 block"
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
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300" />
      
      {/* Content */}
      <div className="absolute bottom-0 left-0 w-full p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-white mb-1 drop-shadow-md">{tenant.name}</h3>
            <p className="text-xs font-bold text-accent uppercase tracking-widest">{tenant.category?.name}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
             <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
      
      {/* Shine Effect */}
      <div className="absolute inset-0 -translate-x-full group-hover:animate-[shine_1.5s_ease-in-out] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
    </Link>
  );
});
TenantCard.displayName = "TenantCard";

export default FeaturedTenants;