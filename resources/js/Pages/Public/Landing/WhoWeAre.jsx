import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "@inertiajs/react";

const WhoWeAre = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#125B9A] mb-6">
              Who We Are
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Dembel City Center Mall stands as the premier shopping and
              entertainment destination, offering world-class facilities and
              experiences.
            </p>
          </div>

          <div>
            <p className="text-gray-700 leading-relaxed mb-8 text-lg">
              Dembel City Centre (DCC) is a beautiful flowery-yellow multi story
              building, located at Africa Avenue on the road to the Air Port of
              Addis Ababa. It is one of the first Western-style shopping malls
              in Ethiopia built in 2002. It is covering about 40,000m² of floor
              area with basement ground floor and 12 stories, is one of the best
              buildings in Ethiopia.
            </p>
            <p className="text-gray-700 leading-relaxed mb-8 text-lg">
              Located in the heart of the city, our mall features
              state-of-the-art retail spaces, dining options, and entertainment
              facilities. We are committed to providing an exceptional shopping
              experience that brings together local and international brands
              under one modern, sophisticated roof.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center text-[#0B8494] hover:text-[#0b8494d5] font-semibold text-lg group transition-colors duration-200"
            >
              Learn More
              <ArrowRight
                size={20}
                className="ml-2 transform group-hover:translate-x-1 transition-transform duration-200"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;
