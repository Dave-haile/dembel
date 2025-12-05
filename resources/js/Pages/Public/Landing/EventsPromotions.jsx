import React, { useRef, useState, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from '@inertiajs/react';

gsap.registerPlugin(ScrollTrigger);

// Icons
const CalendarIcon = ({ className }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

const ArrowRight = ({ className }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

// Helper for date formatting
const formatDate = (dateString) => {
  if (!dateString) return { day: '00', month: 'TBA' };
  const d = new Date(dateString);
  return {
    day: d.getDate().toString().padStart(2, '0'),
    month: d.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
    full: d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  };
};

const EventsAndNews = ({ events = [] }) => {
  const [lang, setLang] = useState('en');
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // Stagger animation for cards when they come into view
      const cards = contentRef.current?.querySelectorAll('.event-card');

      if (cards) {
        gsap.fromTo(cards,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: container,
              start: "top 70%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    });

    return () => ctx.revert();
  }, [events]);

  const toggleLang = () => setLang(prev => prev === 'en' ? 'am' : 'en');

  // Logic to separate the "Feature" event from the list
  const featuredEvent = events.length > 0 ? events[0] : null;
  const standardEvents = events.length > 0 ? events.slice(1) : [];

  return (
    // SECTION STYLING:
    // sticky top-4: Hits the same stop point as previous sections.
    // z-30: Higher than Dining (z-20) so it slides ON TOP.
    <section className="w-full py-8 px-4 flex justify-center sticky top-4 z-30 mb-24">
      <div
        ref={containerRef}
        className="w-full max-w-[80rem] bg-[#f8fafc] rounded-[2.5rem] shadow-2xl overflow-hidden relative isolate border border-slate-200"
      >
        {/* Paper Texture Effect */}
        <div className="absolute inset-0 opacity-[0.4] pointer-events-none mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-slate-100 opacity-80 pointer-events-none" />

        <div className="relative z-10 p-8 md:p-12 lg:p-16">

          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6 border-b border-slate-200 pb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-yellow-400 text-slate-900 text-xs font-bold px-2 py-1 uppercase tracking-widest rounded-sm">
                  {lang === 'en' ? 'Updates' : 'ዜና'}
                </span>
                <span className="text-slate-400 text-sm font-medium">Dembel City Center</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif font-black text-slate-900 tracking-tight">
                {lang === 'en' ? 'Events & News' : 'ዝግጅቶች እና ዜናዎች'}
              </h2>
            </div>

            <button
              onClick={toggleLang}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-yellow-400 transition-all group"
            >
              <span className={`text-sm font-bold ${lang === 'en' ? 'text-slate-900' : 'text-slate-400'}`}>ENG</span>
              <div className="w-px h-4 bg-slate-300"></div>
              <span className={`text-sm font-bold ${lang === 'am' ? 'text-slate-900' : 'text-slate-400'}`}>አማ</span>
            </button>
          </div>

          <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* Featured Event (Left / Top) */}
            {featuredEvent && (
              <div className="lg:col-span-7 event-card group cursor-pointer">
                <div className="relative h-full bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                  <div className="relative h-64 md:h-80 lg:h-full overflow-hidden">
                    <img
                      src={featuredEvent.image || 'https://placehold.co/600x400?text=No+Image'}
                      alt={featuredEvent.title_en}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>

                    {/* Allign it right in mobile view and left in desktop view */}
                    <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-lg text-center min-w-[4.5rem]">
                      <span className="block text-xs font-bold text-slate-500 uppercase">{formatDate(featuredEvent.event_date).month}</span>
                      <span className="block text-2xl font-black text-slate-900 leading-none">{formatDate(featuredEvent.event_date).day}</span>
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 w-full p-6 md:p-8">
                    <span className="inline-block text-yellow-400 font-bold text-sm mb-2 uppercase tracking-wide">
                      {lang === 'en' ? featuredEvent.sub_title_en : featuredEvent.sub_title_am}
                    </span>
                    <h3 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4 leading-tight">
                      {lang === 'en' ? featuredEvent.title_en : featuredEvent.title_am}
                    </h3>
                    <p className="text-slate-300 line-clamp-2 md:line-clamp-3 mb-6 max-w-xl">
                      {lang === 'en' ? featuredEvent.description_en : featuredEvent.description_am}
                    </p>
                    <Link href={'/news-events'} className="inline-flex items-center gap-2 text-white font-semibold group-hover:gap-4 transition-all">
                      {lang === 'en' ? 'Read Full Story' : 'ሙሉውን ያንብቡ'}
                      <ArrowRight className="w-5 h-5 text-yellow-400" />
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Side Grid for Standard Events */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {standardEvents.map((event) => (
                <div key={event.id} className="event-card group cursor-pointer flex-1">
                  <div className="bg-white rounded-2xl p-4 shadow-md border border-slate-100 flex gap-4 transition-all duration-300 hover:shadow-xl hover:-translate-x-1 hover:border-yellow-400/30 h-full">

                    {/* Image Thumbnail */}
                    <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 rounded-xl overflow-hidden relative">
                      <img
                        src={event.image || 'https://placehold.co/600x400?text=No+Image'}
                        alt={event.title_en}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors"></div>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col justify-center flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5 text-xs font-semibold text-slate-500">
                        <CalendarIcon className="w-3.5 h-3.5" />
                        <span>{formatDate(event.event_date).full}</span>
                      </div>
                      <h4 className="text-lg font-serif font-bold text-slate-900 mb-2 leading-tight group-hover:text-yellow-600 transition-colors line-clamp-2">
                        {lang === 'en' ? event.title_en : event.title_am}
                      </h4>
                      <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">
                        {lang === 'en' ? event.description_en : event.description_am}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {/* View All Button (Only shows if there are items) */}
              {events.length > 0 && (
                <div className="event-card mt-auto pt-2">
                  <Link href="/news-events" className="group w-full flex items-center justify-between p-5 rounded-2xl bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow-lg">
                    <span className="font-bold text-lg">
                      {lang === 'en' ? 'View Calendar' : 'ቀን መቁጠሪያ ይመልከቱ'}
                    </span>
                    <div className="bg-white/10 rounded-full p-2 group-hover:bg-yellow-400 group-hover:text-slate-900 transition-all">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </Link>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsAndNews;

// import React, { useRef, useState, useLayoutEffect } from 'react';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger'; 
// import { ArrowRight, Calendar } from 'lucide-react';
// import { Link } from '@inertiajs/react';

// gsap.registerPlugin(ScrollTrigger);

// // Helper for date formatting
// const formatDate = (dateString) => {
//   if (!dateString) return { day: '00', month: 'TBA', full: 'Date TBA' };
//   const d = new Date(dateString);
//   return {
//     day: d.getDate().toString().padStart(2, '0'),
//     month: d.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
//     full: d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
//   };
// };

//   const EventsAndNews = ({ events = [] }) => {
//   const [lang, setLang] = useState('en');
//   const sectionRef = useRef(null);
//   const trackRef = useRef(null);
//   const headerRef = useRef(null);

//   useLayoutEffect(() => {
//     const ctx = gsap.context(() => {
//       // HEADER ANIMATION (Fade in up)
//       gsap.from(headerRef.current, {
//         y: 50,
//         opacity: 0,
//         duration: 1,
//         ease: "power3.out",
//         scrollTrigger: {
//           trigger: sectionRef.current,
//           start: "top 80%",
//         }
//       });

//       // HORIZONTAL SCROLL LOGIC
//       // We use matchMedia to only apply the pinning/scrubbing effect on Desktop (min-width: 768px).
//       // On Mobile, we let it be a native horizontal scroll container for better UX.
//       ScrollTrigger.matchMedia({
//         "(min-width: 768px)": function() {
//           const track = trackRef.current;
//           const section = sectionRef.current;
          
//           if (!track || !section) return;

//           // Calculate how much we need to scroll horizontally
//           // (Track Width) - (Viewport Width) + (Padding Buffer)
//           const getScrollAmount = () => -(track.scrollWidth - window.innerWidth + 100);

//           const tween = gsap.to(track, {
//             x: getScrollAmount,
//             ease: "none", // Linear ease is crucial for scrub syncing
//           });

//           ScrollTrigger.create({
//             trigger: section,
//             start: "top top",
//             // The duration of the pinned scroll is proportional to the width of the content
//             end: () => `+=${track.scrollWidth - window.innerWidth}`,
//             pin: true,
//             scrub: 1,
//             animation: tween,
//             invalidateOnRefresh: true, // Recalculate on window resize
//           });
//         }
//       });

//     }, sectionRef);

//     return () => ctx.revert();
//   }, [events]);

//   const toggleLang = () => setLang(prev => prev === 'en' ? 'am' : 'en');

//   // If no events, render nothing or a placeholder
//   if (!events || events.length === 0) return null;

//   return (
//     <section 
//       ref={sectionRef} 
//       className="relative w-full bg-[#f8fafc] overflow-hidden"
//     >
//       {/* Container specifically for the pinned height on desktop */}
//       <div className="w-full h-full min-h-screen flex flex-col justify-center py-20 md:py-0">
        
//         {/* HEADER SECTION */}
//         <div ref={headerRef} className="container mx-auto px-6 md:px-12 mb-12 md:mb-16 md:absolute md:top-20 md:left-0 md:right-0 md:z-10">
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-slate-200 pb-6">
//             <div className="max-w-2xl">
//               <span className="text-yellow-500 font-bold tracking-[0.2em] text-xs uppercase mb-2 block">
//                 {lang === 'en' ? 'Latest Updates' : 'የቅርብ ጊዜ ዜናዎች'}
//               </span>
//               <h2 className="text-4xl md:text-6xl font-serif font-black text-slate-900 leading-tight">
//                 {lang === 'en' ? 'Events & News' : 'ዝግጅቶች እና ዜናዎች'}
//               </h2>
//             </div>

//             <button 
//               onClick={toggleLang}
//               className="flex items-center gap-3 px-6 py-3 rounded-full bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-yellow-400 transition-all group"
//             >
//               <span className={`text-sm font-bold ${lang === 'en' ? 'text-slate-900' : 'text-slate-400'}`}>ENG</span>
//               <div className="w-px h-4 bg-slate-300"></div>
//               <span className={`text-sm font-bold ${lang === 'am' ? 'text-slate-900' : 'text-slate-400'}`}>አማ</span>
//             </button>
//           </div>
//         </div>

//         {/* HORIZONTAL TRACK */}
//         {/* On mobile: overflow-x-auto enables native swipe. On desktop: overflow-visible (controlled by GSAP) */}
//         <div className="w-full md:pl-12 overflow-x-auto md:overflow-visible no-scrollbar">
//           <div 
//             ref={trackRef} 
//             className="flex gap-8 px-6 md:px-0 w-max pb-8 md:pb-0 items-center h-full"
//           >
//             {/* Intro / Spacer Card for Desktop alignment */}
//             <div className="w-0 md:w-1 shrink-0" /> 

//             {events.map((event) => (
//               <div 
//                 key={event.id} 
//                 className="group relative w-[20rem] md:w-[30rem] shrink-0 bg-white rounded-3xl shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-slate-300/50 transition-all duration-500 hover:-translate-y-2 overflow-hidden flex flex-col"
//               >
//                 {/* Image Container */}
//                 <div className="relative h-60 md:h-80 overflow-hidden">
//                   <img 
//                     src={event.image} 
//                     alt={event.title_en}
//                     className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  
//                   {/* Date Badge */}
//                   <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-lg text-center min-w-[4rem]">
//                     <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">{formatDate(event.event_date).month}</span>
//                     <span className="block text-2xl font-black text-slate-900 leading-none">{formatDate(event.event_date).day}</span>
//                   </div>
//                 </div>

//                 {/* Content Container */}
//                 <div className="p-6 md:p-8 flex flex-col flex-1 relative bg-white">
                  
//                   {/* Category Tag */}
//                   <div className="flex items-center gap-2 mb-4">
//                     <span className="px-3 py-1 bg-yellow-400/10 text-yellow-600 text-xs font-bold uppercase tracking-wider rounded-full">
//                        {lang === 'en' ? event.sub_title_en : event.sub_title_am}
//                     </span>
//                   </div>

//                   {/* Title */}
//                   <h3 className="text-xl md:text-2xl font-serif font-bold text-slate-900 mb-3 line-clamp-2 leading-tight group-hover:text-yellow-600 transition-colors">
//                     {lang === 'en' ? event.title_en : event.title_am}
//                   </h3>

//                   {/* Description */}
//                   <p className="text-slate-500 text-sm md:text-base leading-relaxed line-clamp-3 mb-6 flex-1">
//                     {lang === 'en' ? event.description_en : event.description_am}
//                   </p>

//                   {/* Footer Link */}
//                   <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between text-slate-900 font-bold text-sm">
//                     <span className="flex items-center gap-2 group-hover:gap-3 transition-all">
//                       {lang === 'en' ? 'Read More' : 'ተጨማሪ ያንብቡ'}
//                       <ArrowRight size={16} className="text-yellow-500" />
//                     </span>
//                     <span className="text-slate-300 group-hover:text-slate-400 transition-colors">
//                        <Calendar size={16} />
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             ))}

//             {/* "View All" Final Card */}
//             <div className="w-[18rem] md:w-[22rem] shrink-0 h-[28rem] md:h-[32rem] flex items-center justify-center">
//                <a 
//                  href="/events" 
//                  className="group relative w-full h-full bg-slate-900 rounded-3xl overflow-hidden flex flex-col items-center justify-center text-center p-8 hover:bg-slate-800 transition-colors"
//                >
//                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
//                  <div className="relative z-10">
//                    <div className="w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center text-slate-900 mb-6 mx-auto group-hover:scale-110 transition-transform">
//                       <ArrowRight size={32} />
//                    </div>
//                    <h3 className="text-3xl font-serif font-bold text-white mb-2">
//                      {lang === 'en' ? 'View All' : 'ሁሉንም ይመልከቱ'}
//                    </h3>
//                    <p className="text-slate-400">
//                      {lang === 'en' ? 'Check our full calendar' : 'የእኛን ሙሉ የቀን መቁጠሪያ ይመልከቱ'}
//                    </p>
//                  </div>
//                </a>
//             </div>

//             {/* End Spacer */}
//             <div className="w-6 md:w-20 shrink-0" />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default EventsAndNews;
