import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ArrowRight, ArrowLeft } from "lucide-react";

const Testimonials = ({ testimonials = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Filter only approved testimonials if that flag exists, otherwise use all
  const items = testimonials.filter(t => t.approval !== 0);

  useEffect(() => {
    if (items.length <= 1) return;
    const timer = setInterval(() => {
      nextTestimonial();
    }, 8000);
    return () => clearInterval(timer);
  }, [currentIndex, items.length]);

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  // Generate a consistent color based on the name string
  const getAvatarColor = (name) => {
    const colors = [
      "from-blue-500 to-cyan-500",
      "from-emerald-500 to-teal-500",
      "from-orange-500 to-amber-500",
      "from-purple-500 to-pink-500",
      "from-rose-500 to-red-500",
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  const currentItem = items[currentIndex];

  if (!items.length) return null;

  return (
    // SECTION STYLING:
    // sticky top-4: Stacks on top of previous cards (Gallery).
    // z-50: Highest stack index so far.
    <section className="w-full py-8 px-4 flex justify-center sticky top-4 z-50 mb-24">
      <div className="w-full max-w-[80rem] bg-white rounded-[2.5rem] shadow-2xl overflow-hidden relative isolate border border-slate-100 min-h-[40rem] flex flex-col justify-center">

        {/* Background Decor */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400"></div>
        <div className="absolute -top-24 -right-24 text-slate-50 opacity-[0.03] pointer-events-none transform rotate-12">
          <Quote size={400} />
        </div>
        <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_bottom_left,rgba(0,0,0,0.02),transparent_70%)] pointer-events-none"></div>

        <div className="relative z-10 px-8 md:px-16 lg:px-24 py-16">

          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold tracking-[0.2em] text-slate-400 uppercase mb-4">
              Community Voices
            </h2>
            <h3 className="text-3xl md:text-5xl font-serif font-black text-slate-900">
              Trusted by <span className="text-yellow-500 underline decoration-4 decoration-yellow-200 underline-offset-4">Visionaries</span>
            </h3>
          </div>

          <div className="max-w-4xl mx-auto relative">

            {/* Quote Icon */}
            <div className="absolute -top-8 -left-8 md:-left-12 text-yellow-400 opacity-20">
              <Quote size={80} />
            </div>

            <div className="relative min-h-[200px] flex items-center justify-center">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentItem.id}
                  custom={direction}
                  initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="text-center"
                >
                  <p className="text-2xl md:text-3xl lg:text-4xl leading-relaxed font-serif text-slate-800 italic mb-10">
                    "{currentItem.testimonial}"
                  </p>

                  {/* Author Info */}
                  <div className="flex flex-col items-center justify-center gap-4">
                    {/* Generated Avatar */}
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${getAvatarColor(currentItem.name)} p-0.5 shadow-lg`}>
                      <div className="w-full h-full rounded-full bg-white flex items-center justify-center border-2 border-transparent">
                        <span className="text-xl font-bold text-slate-700">
                          {currentItem.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                        </span>
                      </div>
                    </div>

                    <div className="text-center">
                      <h4 className="text-lg font-bold text-slate-900">{currentItem.name}</h4>
                      <p className="text-slate-500 font-medium text-sm tracking-wide uppercase">{currentItem.position}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between mt-16 max-w-xs mx-auto">
              <button
                onClick={prevTestimonial}
                className="group p-3 rounded-full border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all active:scale-95"
                aria-label="Previous testimonial"
              >
                <ArrowLeft className="w-5 h-5 text-slate-400 group-hover:text-slate-900 transition-colors" />
              </button>

              <div className="flex gap-2">
                {items.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-8 bg-yellow-400' : 'w-1.5 bg-slate-200'}`}
                  />
                ))}
              </div>

              <button
                onClick={nextTestimonial}
                className="group p-3 rounded-full border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all active:scale-95"
                aria-label="Next testimonial"
              >
                <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-slate-900 transition-colors" />
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
