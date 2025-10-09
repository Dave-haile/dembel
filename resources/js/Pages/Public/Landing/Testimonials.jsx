import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const Testimonials = ({ testimonials, language = "en" }) => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const defaultTestimonials = [];
  const displayTestimonials =
    testimonials.length > 0
      ? testimonials.filter((t) => t.approval)
      : defaultTestimonials;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % displayTestimonials.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [displayTestimonials.length]);

  const goToTestimonial = (index) => {
    setCurrentTestimonial(index);
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % displayTestimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) =>
        (prev - 1 + displayTestimonials.length) % displayTestimonials.length
    );
  };

  if (displayTestimonials.length === 0) {
    return (
      <section className="relative py-20 bg-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8">
            {language === "am" ? "የአጋሮቻችን አስተያየት" : "What Our Partners Say"}
          </h2>
          <p className="text-gray-500">
            No testimonials available at the moment.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-20 overflow-hidden mt-[40rem] ">
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage:
            "url(https://images.pexels.com/photos/1797161/pexels-photo-1797161.jpeg?auto=compress&cs=tinysrgb&w=1920)",
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-16">
          {language === "am" ? "የአጋሮቻችን አስተያየት" : "What Our Partners Say"}
        </h2>

        <div className="relative">
          <div className="flex items-center justify-center mb-8">
            <Quote size={48} className="text-amber-400" />
          </div>

          <div className="mb-12">
            <p className="text-xl lg:text-2xl text-white leading-relaxed mb-8 italic">
              &quot;{displayTestimonials[currentTestimonial].testimonial}&quot;
            </p>

            <div className="flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center mr-4">
                <span className="text-white font-bold text-xl">
                  {displayTestimonials[currentTestimonial].name.charAt(0)}
                </span>
              </div>
              <div className="text-left">
                <div className="text-white font-semibold text-lg">
                  {displayTestimonials[currentTestimonial].name}
                </div>
                <div className="text-amber-400">
                  {displayTestimonials[currentTestimonial].position}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={prevTestimonial}
              className="text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors duration-200"
            >
              <ChevronLeft size={24} />
            </button>

            <div className="flex space-x-2">
              {displayTestimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial
                      ? "bg-amber-400"
                      : "bg-white/50"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors duration-200"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
