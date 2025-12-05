import React, { useLayoutEffect, useRef, useState } from 'react';
import MainLayout from '../Shared/MainLayout';
import { Link, Head } from '@inertiajs/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, CheckCircle2, Send, Sparkles } from 'lucide-react';


gsap.registerPlugin(ScrollTrigger);
// New component for the old, commented-out services section
const OldServicesComponent = ({ services }) => {
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

                  <Link href={`/services/${service.id}`} className="group flex items-center gap-3 text-white font-bold tracking-wide border-b border-white/30 pb-1 hover:text-yellow-400 hover:border-yellow-400 transition-all">
                    <span>Learn More</span>
                    <ArrowRight className="w-5 h-5 transform group-hover:translate-x-2 transition-transform" />
                  </Link >
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


export default function Services({ services }) {
  const [showOldComponent, setShowOldComponent] = useState(false);

  return (
    <MainLayout>
      <Head title="Services - Dembel City Center" />

      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setShowOldComponent(!showOldComponent)}
          className="px-6 py-2 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors shadow-lg"
        >
          {showOldComponent ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>

      {showOldComponent ? (
        <OldServicesComponent services={services} />
      ) : (
        <>
      {/* Hero Section */}
      <div className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000" 
            alt="Services Hero" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70 mix-blend-multiply" />
        </div>
        
        <div className="relative z-10 container mx-auto px-6 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-accent/20 text-accent border border-accent/50 text-xs font-bold uppercase tracking-widest mb-4 backdrop-blur-sm">
            World Class Facilities
          </span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6">
            Our Premium Services
          </h1>
          <p className="text-xl text-slate-200 max-w-2xl mx-auto font-light leading-relaxed">
            Elevating your experience at Dembel City Center with comprehensive support, 
            security, and convenience tailored to your needs.
          </p>
        </div>
      </div>

      {/* Intro Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-serif font-bold text-slate-900 mb-4">Designed for Excellence</h2>
                <div className="w-24 h-1 bg-accent-700 mx-auto mb-6"></div>
            <p className="text-slate-600 leading-loose">
              Whether you are a tenant managing a growing business or a visitor enjoying our retail spaces, 
              our dedicated service teams work tirelessly behind the scenes to ensure smooth operations, 
              safety, and comfort.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {services.map((service) => (
              <div 
                key={service.id} 
                className="group relative bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 flex flex-col h-full"
              >
                {/* Image Area */}
                <div className="h-64 overflow-hidden relative">
                  <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/20 transition-all duration-500 z-10" />
                  <img 
                        src={service.image.startsWith('http') ? service.image : `/${service.image}`}
                    alt={service.title_en}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur text-slate-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Available
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-8 flex-1 flex flex-col">
                  <div className="mb-4">
                        <h3 className="text-2xl font-serif font-bold text-slate-900 group-hover:text-accent-700 transition-colors mb-2">
                      {service.title_en}
                    </h3>
                    <p className="text-sm font-medium text-slate-400 uppercase tracking-wide">
                      {service.title_am}
                    </p>
                  </div>
                  
                  <p className="text-slate-600 mb-8 line-clamp-2 leading-relaxed flex-grow">
                    {service.sub_title_en}
                  </p>

                  <div className="mt-auto">
                    <Link 
                      href={`/services/${service.id}`}
                      className="inline-flex items-center text-sm font-bold text-primary uppercase tracking-widest group/btn"
                    >
                          <span className="border-b-2 border-accent-700 pb-1 group-hover/btn:border-primary transition-colors">Learn More</span>
                      <svg 
                        className="w-4 h-4 ml-2 transform group-hover/btn:translate-x-1 transition-transform" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-900 relative overflow-hidden">
        {/* Abstract background shapes */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent-700/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-serif text-white mb-6">Need tailored support for your business?</h2>
          <p className="text-slate-400 mb-10 max-w-2xl mx-auto">
            Our management team is ready to discuss custom service packages for high-volume tenants and corporate partners.
          </p>
              <Link href="#" className="inline-block bg-white text-slate-900 hover:bg-accent-700 hover:text-white px-8 py-4 rounded-full font-bold transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(217,119,6,0.4)]">
            Contact Management
          </Link>
        </div>
      </section>
        </>
      )}
    </MainLayout>
  );
};