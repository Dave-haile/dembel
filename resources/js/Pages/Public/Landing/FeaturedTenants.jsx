// import { Link } from "@inertiajs/react";
// import React, { useRef } from "react";

// export default function FeaturedStores({ tenants = [] }) {
//   const wrapperRef = useRef(null);
//   if (!tenants || tenants.length === 0) return null;

//   const items = [...tenants, ...tenants];

//   const handleTouchStart = () => wrapperRef.current?.classList.add("is-paused");
//   const handleTouchEnd = () => wrapperRef.current?.classList.remove("is-paused");

//   return (
//     <section className="py-16 bg-white overflow-hidden">
//       <div className="container mx-auto px-4">
//         <div className="flex items-end justify-between mb-8">
//           <div>
//             <h2 className="text-3xl md:text-4xl font-bold text-primary mb-1">Featured Tenants</h2>
//             <p className="text-gray-500">Some of the top brands at Dembel City Center</p>
//           </div>
//           <Link
//             href="/tenants"
//             className="hidden md:inline-flex items-center gap-2 text-primary hover:text-accent font-semibold"
//             aria-label="View all tenants"
//           >
//             View all
//           </Link>
//         </div>

//         <div
//           ref={wrapperRef}
//           className="featured-slider relative -mx-4 px-4"
//           onTouchStart={handleTouchStart}
//           onTouchEnd={handleTouchEnd}
//         >
//           <div className="track flex gap-6 will-change-transform">
//             {items.map((t, idx) => (
//               <Link
//                 key={`${t.id}-${idx}`}
//                 href={t.url ?? `/tenant/${t.id}`}
//                 className="tenant-card shrink-0 w-72 min-w-[18rem] group"
//                 aria-label={`${t.name} - ${t.category?.name}`}
//               >
//                 <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-transform duration-300 group-hover:-translate-y-2">
//                   <div className="aspect-[4/3] w-full bg-black">
//                     <img
//                       src={t.logo}
//                       alt={t.name}
//                       width="400"
//                       height="300"
//                       loading="lazy"
//                       decoding="async"
//                       className="w-full h-full object-cover block grayscale transition-filter duration-200 ease-out"
//                     />
//                     <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-20 transition-opacity duration-300"
//                          style={{ background: "linear-gradient(180deg, rgba(243, 238, 33, 0.12), rgba(48,56,144,0.09))" }}
//                     />
//                   </div>

//                   <div className="p-5">
//                     <div className="text-lg font-bold text-gray-600 group-hover:text-primary-800">{t.name}</div>
//                     <div className="text-sm text-gray-700 group-hover:text-accent-700 font-bold mb-1">{t.category?.name}</div>
//                   </div>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
import { Link } from "@inertiajs/react";
import React, { useRef, useEffect } from "react";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedStores({ tenants = [] }) {
  const sectionRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (sectionRef.current) {
      gsap.to(sectionRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          pin: true,
          pinSpacing: false,
          scrub: true,
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === sectionRef.current) trigger.kill();
      });
    };
  }, []);

  if (!tenants || tenants.length === 0) return null;

  const items = [...tenants, ...tenants];

  const handleTouchStart = () => wrapperRef.current?.classList.add("is-paused");
  const handleTouchEnd = () => wrapperRef.current?.classList.remove("is-paused");

  return (
    <section ref={sectionRef} className="relative min-h-screen py-16 bg-white overflow-hidden flex items-center">
      <div className="container mx-auto px-4 w-full">
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

        <div
          ref={wrapperRef}
          className="featured-slider relative -mx-4 px-4"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="track flex gap-6 will-change-transform">
            {items.map((t, idx) => (
              <Link
                key={`${t.id}-${idx}`}
                href={t.url ?? `/tenant/${t.id}`}
                className="tenant-card shrink-0 w-72 min-w-[18rem] group"
                aria-label={`${t.name} - ${t.category?.name}`}
              >
                <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-transform duration-300 group-hover:-translate-y-2">
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
