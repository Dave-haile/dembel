import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';

export default function Testimonials({ testimonials }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  testimonials.forEach((testimonial) => {
    testimonial.rating = 5;
  });

  return (
    <section ref={ref} className="py-24 px-4 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
            What Our Guests Say
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Real experiences from the people who make Dembel City Center special
          </p>
        </motion.div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-10 md:p-16 rounded-3xl shadow-2xl relative"
            >
              <Quote className="absolute top-8 left-8 w-16 h-16 text-slate-200" />

              <div className="relative z-10">
                <div className="flex gap-1 mb-6 justify-center">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-2xl text-gray-700 leading-relaxed mb-8 text-center italic">
                  "{testimonials[currentIndex].testimonial}"
                </p>

                <div className="flex items-center justify-center gap-4">
                  {/* <img
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-slate-200"
                  /> */}
                  <div>
                    <h4 className="text-xl font-bold text-slate-900">
                      {testimonials[currentIndex].name}
                    </h4>
                    <p className="text-gray-600">
                      {testimonials[currentIndex].position}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="p-3 bg-slate-900 text-white rounded-full hover:bg-slate-700 transition-colors duration-200"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="flex gap-2 items-center">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex ? 'w-8 bg-slate-900' : 'w-2 bg-slate-300'
                    }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="p-3 bg-slate-900 text-white rounded-full hover:bg-slate-700 transition-colors duration-200"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
