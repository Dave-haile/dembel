import React, { useRef, useEffect, useMemo, useCallback } from "react";
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

  const createInfiniteScroll = useCallback((ref, duration, direction) => {
    const toValue = direction === 'right' ? -50 : 0;
    const fromValue = direction === 'right' ? 0 : -50;

    return gsap.fromTo(ref.current,
      { xPercent: fromValue },
      {
        xPercent: toValue,
        ease: "none",
        duration: duration,
        repeat: -1,
      }
    );
  }, []);

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
        tween1.current = createInfiniteScroll(row1Ref, 80, 'right');
      }

      // Row 2 Animation (Left to Right)
      if (row2Ref.current) {
        tween2.current = createInfiniteScroll(row2Ref, 85, 'left');
      }
    }, containerRef);

    return () => {
      ctx.revert();
      tween1.current = null;
      tween2.current = null;
    };
  }, [tenants, createInfiniteScroll]);

  if (!tenants || tenants.length === 0) return null;

  const items = useMemo(() => [...tenants, ...tenants, ...tenants, ...tenants], [tenants]);

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
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mt-4">
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
              className="w-full -rotate-1 hover:rotate-0 transition-transform duration-500"
              onMouseEnter={() => tween1.current?.pause()}
              onMouseLeave={() => tween1.current?.play()}
              onTouchStart={() => tween1.current?.pause()}
              onTouchEnd={() => tween1.current?.play()}
            >
              <div ref={row1Ref} className="flex gap-8 pl-6 min-w-max">
                {items.map((t, idx) => (
                  <TenantCard key={`r1-${t.id}-${idx}`} tenant={t} />
                ))}
              </div>
            </div>

            {/* Row 2: Left to Right */}
            <div
              className="w-full rotate-1 hover:rotate-0 transition-transform duration-500"
              onMouseEnter={() => tween2.current?.pause()}
              onMouseLeave={() => tween2.current?.play()}
              onTouchStart={() => tween2.current?.pause()}
              onTouchEnd={() => tween2.current?.play()}
            >
              <div ref={row2Ref} className="flex gap-8 pl-6 min-w-max">
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
const TenantCard = React.memo(({ tenant }) => (
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
));