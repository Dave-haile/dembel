import React from "react";
import { ArrowRight } from "lucide-react";

const Services = ({ services, language = "en" }) => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#125B9A] mb-6">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive facilities and services designed to enhance your
            shopping and business experience
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-blue-100 transition-all duration-300 group"
            >
              <div className="w-64 h-44 bg-gray-200 mb-4 mx-auto flex items-center justify-center overflow-hidden">
                <img
                  src={`${service.image}`}
                  className="object-cover w-full h-full transform group-hover:scale-110 transition duration-300 rounded-lg hover:rounded-xl"
                  alt=""
                />
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {language === "am" ? service.title_am : service.title_en}
              </h3>
              {(language === "am"
                ? service.sub_title_am
                : service.sub_title_en) && (
                <p className="text-sm text-blue-800 font-medium mb-3">
                  {language === "am"
                    ? service.sub_title_am
                    : service.sub_title_en}
                </p>
              )}
              <p className="text-gray-600 mb-6 leading-relaxed">
                {language === "am"
                  ? service.description_am
                  : service.description_en}
              </p>
              <a
                href={`#service-${service.id}`}
                className="inline-flex items-center text-blue-800 hover:text-blue-900 font-medium group/link transition-colors duration-200"
              >
                {language === "am" ? "ተጨማሪ ይመልከቱ" : "Learn More"}
                <ArrowRight
                  size={16}
                  className="ml-2 transform group-hover/link:translate-x-1 transition-transform duration-200"
                />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
