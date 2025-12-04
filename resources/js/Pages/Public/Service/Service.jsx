// import React from "react";
// import { Head, Link, useForm } from "@inertiajs/react";
// import MainLayout from "../Shared/MainLayout";

// const Services = ({ services }) => {
//   console.log(services);
//   const { data, setData, post, processing, errors, recentlySuccessful } =
//     useForm({
//       name: "",
//       email: "",
//       subject: "",
//       message: "",
//     });

//   const submit = (e) => {
//     e.preventDefault();
//     // eslint-disable-next-line no-undef
//     post(route("services.contact"));
//   };

//   return (
//     <MainLayout>
//       <Head title="Services - Dembel City Center" />
//       <section className="bg-tertiary py-12 mt-16">
//         <div className="container mx-auto px-4">
//           <div className="flex justify-end">
//             <div className="w-full lg:w-10/12">
//               <div className="py-8 text-right">
//                 <h1 className="text-4xl lg:text-5xl font-light uppercase text-primary">
//                   Services
//                 </h1>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Main Content */}
//       <div className="container mx-auto px-4 py-8">
//         <div className="flex flex-col lg:flex-row gap-8">
//           {/* Sidebar */}
//           <aside className="lg:w-1/4">
//             <div className="bg-white rounded-lg shadow-lg p-6 sticky top-32">
//               {/* Services Navigation */}
//               <div className="mb-8">
//                 <h3 className="text-lg font-semibold text-gray-900 mb-4">
//                   Services
//                 </h3>
//                 <ul className="space-y-2">
//                   <li>
//                     <Link
//                       href="/services"
//                       className="block px-4 py-3 bg-primary text-white rounded-lg font-semibold"
//                     >
//                       Overview
//                     </Link>
//                   </li>
//                   {services.map((service) => (
//                     <li key={service.id}>
//                       <Link
//                         href={`/services/${service.id}`}
//                         className="block px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-primary rounded-lg transition duration-200"
//                       >
//                         {service.title_en}
//                       </Link>
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//               {/* Contact Form */}
//               <div className="border-t pt-6">
//                 <h4 className="text-lg font-semibold text-gray-900 mb-3">
//                   Contact Us
//                 </h4>
//                 <p className="text-gray-600 mb-6">
//                   Contact us or give us a call to discover how we can help.
//                 </p>

//                 <form onSubmit={submit} className="space-y-4">
//                   <div>
//                     <label
//                       htmlFor="name"
//                       className="block text-sm font-medium text-gray-700 mb-1"
//                     >
//                       Your name *
//                     </label>
//                     <input
//                       type="text"
//                       id="name"
//                       value={data.name}
//                       onChange={(e) => setData("name", e.target.value)}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
//                       required
//                     />
//                     {errors.name && (
//                       <p className="text-red-500 text-sm mt-1">{errors.name}</p>
//                     )}
//                   </div>

//                   <div>
//                     <label
//                       htmlFor="email"
//                       className="block text-sm font-medium text-gray-700 mb-1"
//                     >
//                       Your email address *
//                     </label>
//                     <input
//                       type="email"
//                       id="email"
//                       value={data.email}
//                       onChange={(e) => setData("email", e.target.value)}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
//                       required
//                     />
//                     {errors.email && (
//                       <p className="text-red-500 text-sm mt-1">
//                         {errors.email}
//                       </p>
//                     )}
//                   </div>

//                   <div>
//                     <label
//                       htmlFor="subject"
//                       className="block text-sm font-medium text-gray-700 mb-1"
//                     >
//                       Subject *
//                     </label>
//                     <input
//                       type="text"
//                       id="subject"
//                       value={data.subject}
//                       onChange={(e) => setData("subject", e.target.value)}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
//                       required
//                     />
//                     {errors.subject && (
//                       <p className="text-red-500 text-sm mt-1">
//                         {errors.subject}
//                       </p>
//                     )}
//                   </div>

//                   <div>
//                     <label
//                       htmlFor="message"
//                       className="block text-sm font-medium text-gray-700 mb-1"
//                     >
//                       Message *
//                     </label>
//                     <textarea
//                       id="message"
//                       rows="3"
//                       value={data.message}
//                       onChange={(e) => setData("message", e.target.value)}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
//                       required
//                     ></textarea>
//                     {errors.message && (
//                       <p className="text-red-500 text-sm mt-1">
//                         {errors.message}
//                       </p>
//                     )}
//                   </div>

//                   <div>
//                     <button
//                       type="submit"
//                       disabled={processing}
//                       className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark transition duration-200 disabled:opacity-50"
//                     >
//                       {processing ? "Sending..." : "Send Message"}
//                     </button>
//                   </div>

//                   {recentlySuccessful && (
//                     <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
//                       Message has been sent successfully.
//                     </div>
//                   )}
//                 </form>
//               </div>
//             </div>
//           </aside>

//           {/* Services Content */}
//           <div className="lg:w-3/4">
//             <div className="space-y-6">
//               {services.map((service) => (
//                 <div
//                   key={service.id}
//                   className="bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 p-6 border border-gray-100"
//                 >
//                   <div className="flex flex-col lg:flex-row lg:items-start space-y-4 lg:space-y-0 lg:space-x-6">
//                     {/* Icon */}
//                     <div className="flex-shrink-0">
//                       <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
//                         <svg
//                           className="w-8 h-8 text-white"
//                           fill="none"
//                           stroke="currentColor"
//                           viewBox="0 0 24 24"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
//                           />
//                         </svg>
//                       </div>
//                     </div>

//                     {/* Content */}
//                     <div className="flex-1">
//                       <h3 className="text-2xl font-bold text-gray-900 mb-3">
//                         {service.title_en}
//                       </h3>
//                       <p className="text-gray-700 leading-relaxed mb-4">
//                         {service.sub_title_en}
//                       </p>
//                       <Link
//                         href={`/services/${service.id}`}
//                         className="inline-flex items-center text-primary font-semibold hover:text-primary-dark transition duration-200"
//                       >
//                         Learn More
//                         <svg
//                           className="ml-2 w-4 h-4"
//                           fill="none"
//                           stroke="currentColor"
//                           viewBox="0 0 24 24"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M14 5l7 7m0 0l-7 7m7-7H3"
//                           />
//                         </svg>
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Empty State */}
//             {services.length === 0 && (
//               <div className="bg-white rounded-xl shadow-lg p-12 text-center">
//                 <svg
//                   className="w-16 h-16 text-gray-400 mx-auto mb-4"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
//                   />
//                 </svg>
//                 <h3 className="text-xl font-semibold text-gray-900 mb-2">
//                   No Services Available
//                 </h3>
//                 <p className="text-gray-600">
//                   Check back later for our service offerings.
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </MainLayout>
//   );
// };

// export default Services;

// import React, { useRef, useLayoutEffect } from 'react';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { ArrowRight, CheckCircle2 } from 'lucide-react';
// import MainLayout from '../Shared/MainLayout';
// import { Head } from '@inertiajs/react';

// gsap.registerPlugin(ScrollTrigger);

// const Services = ({ services = [] }) => {
//   const containerRef = useRef(null);

//   useLayoutEffect(() => {
//     const ctx = gsap.context(() => {
//       // 1. Header Animation
//       gsap.from('.service-header', {
//         y: 50,
//         opacity: 0,
//         duration: 1,
//         ease: 'power3.out'
//       });

//       // 2. Service Cards Animation (Alternating Sides)
//       const cards = gsap.utils.toArray('.service-card');
//       cards.forEach((card, i) => {
//         const isEven = i % 2 === 0;

//         gsap.fromTo(card,
//           {
//             x: isEven ? -100 : 100,
//             opacity: 0
//           },
//           {
//             x: 0,
//             opacity: 1,
//             duration: 1,
//             ease: 'power3.out',
//             scrollTrigger: {
//               trigger: card,
//               start: 'top 80%', // Reveal when top of card hits 80% viewport height
//               toggleActions: 'play none none reverse'
//             }
//           }
//         );
//       });

//       // 3. The Golden Thread (Vertical Line)
//       gsap.fromTo('.golden-thread',
//         { height: 0 },
//         {
//           height: '100%',
//           ease: 'none',
//           scrollTrigger: {
//             trigger: '.services-container',
//             start: 'top center',
//             end: 'bottom center',
//             scrub: 1
//           }
//         }
//       );

//     }, containerRef);

//     return () => ctx.revert();
//   }, [services]);

//   return (
//     <MainLayout>
//       <Head title="Services" />
//       <div ref={containerRef} className="w-full bg-slate-950 min-h-screen pt-32 pb-24 relative overflow-hidden">

//         {/* Background Ambience */}
//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_center,rgba(56,189,248,0.1),transparent_70%)] pointer-events-none" />
//         <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

//         <div className="container mx-auto px-6 relative z-10 services-container">

//           {/* Page Header */}
//           <div className="text-center mb-24 service-header">
//             <span className="inline-block py-1 px-3 border border-yellow-400/30 rounded-full bg-yellow-400/10 text-yellow-400 text-xs font-bold tracking-[0.2em] uppercase mb-6 backdrop-blur-md">
//               World Class Solutions
//             </span>
//             <h1 className="text-5xl md:text-7xl font-serif font-black text-white mb-6">
//               Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600">Services</span>
//             </h1>
//             <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
//               From comprehensive facility management to exclusive business support, we provide the infrastructure for your success.
//             </p>
//           </div>

//           {/* The Golden Thread (Center Line) */}
//           <div className="absolute left-1/2 top-48 bottom-0 w-px -translate-x-1/2 hidden lg:block">
//             <div className="w-full bg-slate-800 h-full absolute top-0 left-0"></div>
//             <div className="golden-thread w-full bg-gradient-to-b from-yellow-400 via-yellow-200 to-transparent absolute top-0 left-0"></div>
//           </div>

//           {/* Services List */}
//           <div className="flex flex-col gap-24 lg:gap-40">
//             {services.map((service, index) => {
//               const isEven = index % 2 === 0;
//               return (
//                 <div
//                   key={service.id}
//                   className={`service-card flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-24 relative`}
//                 >

//                   {/* Timeline Dot (Desktop Only) */}
//                   <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:flex items-center justify-center w-12 h-12 rounded-full bg-slate-950 border border-yellow-400/50 shadow-[0_0_15px_rgba(250,204,21,0.3)] z-20">
//                     <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
//                   </div>

//                   {/* Image Side */}
//                   <div className="w-full lg:w-1/2 group">
//                     <div className="relative rounded-[2rem] overflow-hidden aspect-[4/3] border border-white/10 shadow-2xl">
//                       <div className="absolute inset-0 bg-slate-800 animate-pulse" /> {/* Placeholder while loading */}
//                       <img
//                         src={service.image}
//                         alt={service.title_en}
//                         className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//                       />
//                       <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />

//                       {/* Floating Badge */}
//                       <div className={`absolute bottom-8 ${isEven ? 'right-8' : 'left-8'} bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl transform transition-transform duration-500 group-hover:-translate-y-2`}>
//                         <CheckCircle2 className="text-yellow-400 w-8 h-8 mb-2" />
//                         <span className="text-white font-bold text-sm">Verified Service</span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Content Side */}
//                   <div className="w-full lg:w-1/2 text-center lg:text-left">
//                     <div className="mb-4 overflow-hidden">
//                       <h3 className="text-yellow-500 font-bold text-lg mb-2">{service.title_am}</h3>
//                     </div>
//                     <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6 leading-tight">
//                       {service.title_en}
//                     </h2>
//                     <div className="h-1 w-24 bg-yellow-400/30 rounded-full mb-8 mx-auto lg:mx-0"></div>

//                     <h4 className="text-xl text-slate-200 font-medium mb-4">{service.sub_title_en}</h4>
//                     <p className="text-slate-400 text-lg leading-relaxed mb-8">
//                       {service.description_en}
//                     </p>

//                     <button className="inline-flex items-center gap-2 text-white font-bold border-b-2 border-yellow-400 pb-1 hover:text-yellow-400 transition-colors group">
//                       <span>Inquire Now</span>
//                       <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
//                     </button>
//                   </div>

//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </MainLayout>
//   );
// };

// export default Services;



import React, { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, CheckCircle2, Send, Sparkles } from 'lucide-react';
import MainLayout from '../Shared/MainLayout';
import { Head } from '@inertiajs/react';

gsap.registerPlugin(ScrollTrigger);

const Services = ({ services = [] }) => {
  const containerRef = useRef(null);

  // Animation setup
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Animate Service Sections
      const sections = gsap.utils.toArray('.service-item');
      sections.forEach((section, i) => {
        const image = section.querySelector('.service-img');
        const content = section.querySelector('.service-content');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 20%",
            toggleActions: "play none none reverse"
          }
        });

        tl.from(content, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out"
        })
          .from(image, {
            scale: 1.1,
            opacity: 0,
            duration: 1,
            ease: "power2.out"
          }, "-=0.6");
      });

      // Animate Form
      gsap.from('.contact-form-container', {
        y: 60,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: '.contact-form-container',
          start: "top 85%",
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, [services]);

  return (
    <MainLayout>
      <Head title="Services" />
      <div ref={containerRef} className="bg-slate-950 min-h-screen pt-24 pb-24 relative overflow-hidden">

        {/* Dynamic Background */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-yellow-400/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px]" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">

          {/* Page Header */}
          <div className="text-center max-w-4xl mx-auto mb-24 lg:mb-32">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 text-sm font-bold tracking-widest uppercase mb-6">
              <Sparkles size={14} />
              <span>World Class Services</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-black text-white mb-6">
              Excellence in <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600">
                Every Detail
              </span>
            </h1>
            <p className="text-slate-400 text-xl leading-relaxed max-w-2xl mx-auto">
              Discover a suite of premium services designed to elevate your business operations and enhance your lifestyle at Dembel City Center.
            </p>
          </div>

          {/* Services List */}
          <div className="flex flex-col gap-24 lg:gap-40 mb-32">
            {services.map((service, index) => (
              <div
                key={service.id}
                className={`service-item flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-24 items-center`}
              >

                {/* Image Side */}
                <div className="w-full lg:w-1/2 relative group">
                  <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 bg-slate-800 animate-pulse" /> {/* Loading Placeholder */}
                    <img
                      src={service.image}
                      alt={service.title_en}
                      className="service-img w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent opacity-60" />

                    {/* Floating Number */}
                    <div className="absolute -top-6 -left-6 w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-xl border-4 border-slate-950 z-20">
                      <span className="font-serif font-bold text-4xl text-slate-900">
                        {(index + 1).toString().padStart(2, '0')}
                      </span>
                    </div>
                  </div>

                  {/* Decorative Dot Pattern */}
                  <div className={`absolute -bottom-10 -z-10 w-full h-full border border-white/5 rounded-[2.5rem] ${index % 2 === 0 ? '-right-10' : '-left-10'}`}></div>
                </div>

                {/* Content Side */}
                <div className="service-content w-full lg:w-1/2">
                  <div className="mb-4">
                    <h3 className="text-lg font-medium text-yellow-400 mb-1 font-serif italic">
                      {service.title_am}
                    </h3>
                    <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
                      {service.title_en}
                    </h2>
                  </div>

                  <div className="h-1 w-20 bg-gradient-to-r from-yellow-400 to-transparent mb-8" />

                  <h4 className="text-xl text-slate-200 font-semibold mb-4">
                    {service.sub_title_en}
                  </h4>

                  <p className="text-slate-400 text-lg leading-relaxed mb-8">
                    {service.description_en}
                  </p>

                  <ul className="space-y-4 mb-10">
                    {[1, 2, 3].map((i) => (
                      <li key={i} className="flex items-center gap-3 text-slate-300">
                        <CheckCircle2 className="text-green-400" size={20} />
                        <span>Premium quality assurance and support</span>
                      </li>
                    ))}
                  </ul>

                  <button className="group flex items-center gap-3 text-white font-bold tracking-wide border-b border-white/30 pb-1 hover:text-yellow-400 hover:border-yellow-400 transition-all">
                    <span>Learn More</span>
                    <ArrowRight className="w-5 h-5 transform group-hover:translate-x-2 transition-transform" />
                  </button>
                </div>

              </div>
            ))}
          </div>

          {/* Contact / Concierge Form */}
          <div className="contact-form-container max-w-5xl mx-auto">
            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] p-8 md:p-16 overflow-hidden">

              <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400/10 rounded-full blur-[80px] -mr-32 -mt-32 pointer-events-none" />

              <div className="grid lg:grid-cols-2 gap-16 relative z-10">
                <div>
                  <h3 className="text-3xl font-serif font-bold text-white mb-6">
                    Concierge Request
                  </h3>
                  <p className="text-slate-400 mb-8 leading-relaxed">
                    Need assistance or interested in one of our services? Fill out the form below and our dedicated concierge team will get back to you immediately.
                  </p>

                  <div className="space-y-6">
                    <div className="flex items-center gap-4 text-slate-300">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                        <span className="font-bold">A</span>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 uppercase tracking-wider">Address</p>
                        <p>Africa Avenue, Addis Ababa</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-slate-300">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                        <span className="font-bold">E</span>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 uppercase tracking-wider">Email</p>
                        <p>service@dembel.com</p>
                      </div>
                    </div>
                  </div>
                </div>

                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Name</label>
                      <input type="text" className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-all" placeholder="John Doe" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Email</label>
                      <input type="email" className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-all" placeholder="john@company.com" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Service of Interest</label>
                    <select className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-all appearance-none">
                      <option className="bg-slate-900">General Inquiry</option>
                      {services.map(s => <option key={s.id} className="bg-slate-900" value={s.id}>{s.title_en}</option>)}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Message</label>
                    <textarea rows={4} className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-all resize-none" placeholder="How can we help you?"></textarea>
                  </div>

                  <button className="w-full bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-bold py-4 rounded-xl shadow-lg shadow-yellow-400/20 hover:shadow-yellow-400/40 transition-all flex items-center justify-center gap-2 group">
                    <span>Send Request</span>
                    <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </form>
              </div>

            </div>
          </div>

        </div>
      </div>
    </MainLayout>
  );
};

export default Services;
