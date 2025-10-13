import React from "react";
import { Calendar, ArrowRight } from "lucide-react";
import { Link } from "@inertiajs/react";

const EventsPromotions = ({ events = [], locale = "en" }) => {
  const getLocaleCode = locale === "am" ? "am-ET" : "en-US";

  const getText = (item, enKey, amKey) => {
    if (!item) return "";
    return locale === "am"
      ? item[amKey] || item[enKey] || ""
      : item[enKey] || item[amKey] || "";
  };

  const getImage = (item) => {
    if (item && item.image) return item.image;
    return "https://placehold.co/1200x800?text=No+Image";
  };
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const d = new Date(dateString);
    if (Number.isNaN(d.getTime())) return "";
    return d.toLocaleDateString(getLocaleCode, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Events & Promotions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don&apos;t miss out on exciting events and exclusive promotions
            happening at our mall
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:border-blue-100 transition-all duration-300 group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={getImage(event)}
                  alt={getText(event, "title_en", "title_am") || "Event image"}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
              </div>

              <div className="p-6">
                <div className="flex items-center text-gray-500 text-sm mb-3">
                  <Calendar size={16} className="mr-2" />
                  {formatDate(event.event_date)}
                </div>

                <h3 className="text-2xl font-semibold text-gray-900 mb-1 group-hover:text-blue-800 transition-colors duration-200">
                  {getText(event, "title_en", "title_am") || "Untitled Event"}
                </h3>
                {getText(event, "sub_title_en", "sub_title_am") && (
                  <p className="text-gray-700 mb-3">
                    {getText(event, "sub_title_en", "sub_title_am")}
                  </p>
                )}

                {getText(event, "description_en", "description_am") && (
                  <p className="text-gray-600 leading-relaxed mb-6 line-clamp-4">
                    {getText(event, "description_en", "description_am")}
                  </p>
                )}

                <Link
                  href={`/event/${event.id}`}
                  className="inline-flex items-center text-blue-800 hover:text-blue-900 font-medium group/link transition-colors duration-200"
                >
                  Learn More
                  <ArrowRight
                    size={16}
                    className="ml-2 transform group-hover/link:translate-x-1 transition-transform duration-200"
                  />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button className="bg-blue-800 hover:bg-blue-900 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 inline-flex items-center group">
            See All Events
            <ArrowRight
              size={20}
              className="ml-2 transform group-hover:translate-x-1 transition-transform duration-200"
            />
          </button>
        </div>
      </div>
    </section>
  );
};

export default EventsPromotions;
