import { Link } from "@inertiajs/react";
import React from "react";

const Services = ({ restaurant }) => {
  const image = restaurant.map((restaurant) => restaurant.logo);
  return (
    // <section className="py-20 bg-white">
    //   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    //     <div className="text-center mb-16">
    //       <h2 className="text-4xl lg:text-5xl font-bold text-[#125B9A] mb-6">
    //         Our Services
    //       </h2>
    //       <p className="text-xl text-gray-600 max-w-3xl mx-auto">
    //         Comprehensive facilities and services designed to enhance your
    //         shopping and business experience
    //       </p>
    //     </div>

    //     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
    //       {services.map((service) => (
    //         <div
    //           key={service.id}
    //           className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-blue-100 transition-all duration-300 group"
    //         >
    //           <div className="w-64 h-44 bg-gray-200 mb-4 mx-auto flex items-center justify-center overflow-hidden">
    //             <img
    //               src={`${service.image}`}
    //               className="object-cover w-full h-full transform group-hover:scale-110 transition duration-300 rounded-lg hover:rounded-xl"
    //               alt=""
    //             />
    //           </div>

    //           <h3 className="text-xl font-semibold text-gray-900 mb-4">
    //             {language === "am" ? service.title_am : service.title_en}
    //           </h3>
    //           {(language === "am"
    //             ? service.sub_title_am
    //             : service.sub_title_en) && (
    //             <p className="text-sm text-blue-800 font-medium mb-3">
    //               {language === "am"
    //                 ? service.sub_title_am
    //                 : service.sub_title_en}
    //             </p>
    //           )}
    //           <p className="text-gray-600 mb-6 leading-relaxed">
    //             {language === "am"
    //               ? service.description_am
    //               : service.description_en}
    //           </p>
    //           <a
    //             href={`/services/${service.id}`}
    //             className="inline-flex items-center text-blue-800 hover:text-blue-900 font-medium group/link transition-colors duration-200"
    //           >
    //             {language === "am" ? "ተጨማሪ ይመልከቱ" : "Learn More"}
    //             <ArrowRight
    //               size={16}
    //               className="ml-2 transform group-hover/link:translate-x-1 transition-transform duration-200"
    //             />
    //           </a>
    //         </div>
    //       ))}
    //     </div>
    //     <div className="text-center mt-12">
    //       <Link
    //         href={"/services"}
    //         className="bg-blue-800 hover:bg-blue-900 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
    //       >
    //         {language === "am" ? "ሁሉንም አግልግሎት ይመልከቱ" : "View All Servies"}
    //       </Link>
    //     </div>
    //   </div>
    // </section>
     <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Mosaic */}
          <div className="grid grid-cols-2 gap-4">
            <img
              src={image[0] || `https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=600&fit=crop`}
              alt="Restaurant interior"
              className="rounded-2xl object-cover w-full h-64 card-shadow"
            />
            <img
              src={image[1] || `https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=600&fit=crop`}
              alt="Fine dining"
              className="rounded-2xl object-cover w-full h-64 card-shadow mt-8"
            />
            <img
              src={image[2] || `https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=600&h=600&fit=crop`}
              alt="Cuisine"
              className="rounded-2xl object-cover w-full h-64 card-shadow col-span-2"
            />
          </div>

          {/* Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Dining & Entertainment
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Experience culinary excellence from around the world. From fine dining to casual bites, we have something for every taste.
            </p>

            <div className="space-y-4 mb-8">
              <h3 className="text-2xl font-semibold text-foreground">Top Restaurants</h3>
              <ul className="space-y-3">
                {restaurant.map((restaurant, index) => (
                  <li key={index} className="flex items-center gap-3 text-muted-foreground">
                    <div className="w-2 h-2 rounded-full bg-accent flex-shrink-0" />
                    <span>{restaurant.name}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Link href={'/tenant?building=all&category=7&search='}
              className="bg-primary-600 w-40 text-center text-white px-8 py-4 rounded-2xl font-semibold
             hover:bg-accent-600 transition-all duration-200 hover:shadow-xl 
             hover:scale-105 active:scale-95 flex items-center gap-2"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              View All
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;