// import React from "react";
// import { Clock, MapPin, Phone, Navigation } from "lucide-react";

// const VisitUs = () => {
//   const openingHours = [
//     { day: "Monday - Thursday", hours: "10:00 AM - 10:00 PM" },
//     { day: "Friday - Saturday", hours: "10:00 AM - 11:00 PM" },
//     { day: "Sunday", hours: "11:00 AM - 9:00 PM" },
//   ];

//   return (
//     <section className="py-20 bg-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-16">
//           <h2 className="text-4xl lg:text-5xl font-bold text-primary-600 mb-6">
//             Visit Us
//           </h2>
//           <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//             Plan your visit to Dembel City Center Mall with our location details
//             and opening hours
//           </p>
//         </div>

//         <div className="grid lg:grid-cols-2 gap-12 items-start">
//           {/* Contact Information */}
//           <div className="space-y-8">
//             {/* Opening Hours */}
//             <div className="bg-gray-50 p-8 rounded-xl">
//               <div className="flex items-center mb-6">
//                 <Clock size={24} className="text-accent-600 mr-3" />
//                 <h3 className="text-2xl font-semibold text-primary-600">
//                   Opening Hours
//                 </h3>
//               </div>
//               <div className="space-y-4">
//                 {openingHours.map((schedule, index) => (
//                   <div
//                     key={index}
//                     className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0"
//                   >
//                     <span className="text-gray-700 font-medium">
//                       {schedule.day}
//                     </span>
//                     <span className="text-gray-900 font-semibold">
//                       {schedule.hours}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Address */}
//             <div className="bg-gray-50 p-8 rounded-xl">
//               <div className="flex items-center mb-4">
//                 <MapPin size={24} className="text-accent-600 mr-3" />
//                 <h3 className="text-2xl font-semibold text-primary-600">
//                   Address
//                 </h3>
//               </div>
//               <p className="text-gray-700 text-lg leading-relaxed">
//                 Africa Avenue on the road to the Air Port of Addis Ababa.
//                 <br />
//                 Addis Ababa, Ethiopia
//               </p>
//             </div>

//             {/* Contact Phone */}
//             <div className="bg-gray-50 p-8 rounded-xl">
//               <div className="flex items-center mb-4">
//                 <Phone size={24} className="text-accent-600 mr-3" />
//                 <h3 className="text-2xl font-semibold text-primary-600">
//                   Contact
//                 </h3>
//               </div>
//               <div className="space-y-2">
//                 <p className="text-gray-700 text-lg">+251 11 123 4567</p>
//                 <p className="text-gray-700 text-lg">+251 11 987 6543</p>
//                 <p className="text-gray-700 text-lg">info@dembelmall.com</p>
//               </div>
//             </div>

//             {/* Get Directions Button */}
//             <a
//               href="https://www.google.com/maps/dir/?api=1&destination=Dembel+City+Center,+Addis+Ababa"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="w-full bg-primary-800 hover:bg-primary-900 text-white px-8 py-4 rounded-lg font-semibold transition-colors duration-200 inline-flex items-center justify-center group"
//             >
//               <Navigation size={20} className="mr-3 text-accent-400" />
//               Get Directions
//             </a>
//           </div>

//           {/* Google Map */}
//           <div className="lg:sticky lg:top-8">
//             <div className="bg-gray-200 rounded-xl overflow-hidden shadow-lg">
//               <div className="aspect-w-16 aspect-h-12 h-96 lg:h-[500px]">
//                 <div className="bg-card rounded-lg overflow-hidden border-4 border-gray-300 h-[500px]">
//                   <iframe
//                     src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.8642529724483!2d38.764230775805525!3d9.00508869087026!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85b039c25bc1%3A0x941677a8f60160fe!2sDembel%20City%20Center!5e0!3m2!1sen!2set!4v1696434677829!5m2!1sen!2set"
//                     width="100%"
//                     height="100%"
//                     style={{ border: 0 }}
//                     allowFullScreen=""
//                     loading="lazy"
//                     referrerPolicy="no-referrer-when-downgrade"
//                     title="Dembel City Center Location"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default VisitUs;

import React, { useRef, useLayoutEffect } from "react";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Clock, MapPin, Phone, Navigation, Mail, ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const VisitUs = () => {
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // Animate content elements when they come into view
      const elements = contentRef.current?.querySelectorAll('.reveal-item');
      if (elements) {
        gsap.fromTo(elements,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: container,
              start: "top 60%",
            }
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const openingHours = [
    { day: "Mon - Thu", hours: "10:00 AM - 10:00 PM" },
    { day: "Fri - Sat", hours: "10:00 AM - 11:00 PM" },
    { day: "Sunday", hours: "11:00 AM - 9:00 PM" },
  ];

  return (
    // SECTION STYLING:
    // sticky top-4: Stacks on top of Testimonials.
    // z-60: Highest stack index (Testimonials was z-50).
    <section className="w-full py-8 px-4 flex justify-center sticky top-4 z-[60] mb-24">
      <div
        ref={containerRef}
        className="w-full max-w-[80rem] bg-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden relative isolate border border-slate-800"
      >
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(250,204,21,0.1),transparent_40%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]" />

        <div className="relative z-10 p-8 md:p-12 lg:p-16" ref={contentRef}>

          <div className="grid lg:grid-cols-2 gap-12 items-start">

            {/* Left Column: Info */}
            <div className="space-y-8">
              <div className="reveal-item">
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
                  Plan Your <span className="text-yellow-400">Visit</span>
                </h2>
                <p className="text-slate-400 text-lg leading-relaxed max-w-md">
                  Experience the heart of Addis Ababa. We are conveniently located on Africa Avenue with ample parking.
                </p>
              </div>

              {/* Hours Card */}
              <div className="reveal-item bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 hover:bg-white/10 transition-colors duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-yellow-400 rounded-lg text-slate-900">
                    <Clock size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-white">Opening Hours</h3>
                </div>
                <div className="space-y-4">
                  {openingHours.map((schedule, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                      <span className="text-slate-400 font-medium">{schedule.day}</span>
                      <span className="text-white font-bold tracking-wide">{schedule.hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Grid */}
              <div className="reveal-item grid sm:grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-3 text-yellow-400">
                    <Phone size={20} />
                    <span className="font-bold text-sm uppercase tracking-wider">Phone</span>
                  </div>
                  <p className="text-white font-semibold">+251 11 123 4567</p>
                  <p className="text-slate-400 text-sm mt-1">Guest Services</p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-3 text-yellow-400">
                    <Mail size={20} />
                    <span className="font-bold text-sm uppercase tracking-wider">Email</span>
                  </div>
                  <p className="text-white font-semibold">info@dembelmall.com</p>
                  <p className="text-slate-400 text-sm mt-1">General Inquiries</p>
                </div>
              </div>

              {/* CTA Button */}
              <div className="reveal-item pt-4">
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=Dembel+City+Center,+Addis+Ababa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-full flex items-center justify-between bg-yellow-400 hover:bg-yellow-300 text-slate-900 p-5 rounded-2xl font-bold text-lg transition-all duration-300 shadow-[0_0_20px_rgba(250,204,21,0.3)] hover:shadow-[0_0_30px_rgba(250,204,21,0.5)] transform hover:-translate-y-1"
                >
                  <div className="flex items-center gap-3">
                    <Navigation size={24} />
                    <span>Get Directions</span>
                  </div>
                  <ArrowUpRight className="w-6 h-6 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
              </div>
            </div>

            {/* Right Column: Map */}
            <div className="reveal-item lg:sticky lg:top-8">
              <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl h-[500px] group">

                {/* Map Overlay Gradient (Fade on hover) */}
                <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors z-10 pointer-events-none" />

                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.8642529724483!2d38.764230775805525!3d9.00508869087026!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85b039c25bc1%3A0x941677a8f60160fe!2sDembel%20City%20Center!5e0!3m2!1sen!2set!4v1696434677829!5m2!1sen!2set"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'grayscale(0.2) contrast(1.1)' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Dembel City Center Location"
                  className="w-full h-full"
                />

                {/* Custom Address Card Overlay */}
                <div className="absolute bottom-6 left-6 right-6 bg-slate-900/90 backdrop-blur-md p-4 rounded-xl border border-white/10 z-20 flex items-start gap-3">
                  <MapPin className="text-yellow-400 shrink-0 mt-1" size={20} />
                  <div>
                    <p className="text-white font-semibold text-sm">Africa Avenue (Bole Road)</p>
                    <p className="text-slate-400 text-xs mt-0.5">Addis Ababa, Ethiopia</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default VisitUs;
