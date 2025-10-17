// components/FeaturedSection.jsx
import React from "react";

const FeaturedSection = ({ announcement }) => {
  const getCategoryInfo = (type) => {
    switch (type) {
      case "free-space":
        return { label: "Free Space", color: "bg-green-500" };
      case "news":
        return { label: "News & Events", color: "bg-blue-500" };
      case "vacancy":
        return { label: "Vacancy", color: "bg-purple-500" };
      default:
        return { label: "Announcement", color: "bg-gray-500" };
    }
  };

  const categoryInfo = getCategoryInfo(announcement.type);
  const date = announcement.created_at || announcement.posted_date;

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured</h2>
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
        <div className="md:flex">
          <div className="md:flex-shrink-0 md:w-1/3">
            <img
              className="h-64 w-full object-cover md:h-full"
              src={announcement.image || announcement.thumbnail}
              alt={announcement.title || announcement.name}
            />
          </div>
          <div className="p-8 md:w-2/3">
            <div className="flex items-center mb-4">
              <span
                className={`${categoryInfo.color} text-white px-3 py-1 rounded-full text-sm font-semibold`}
              >
                {categoryInfo.label}
              </span>
              <span className="ml-4 text-sm text-gray-500">
                {new Date(date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              {announcement.title || announcement.name}
            </h3>
            <p className="text-gray-600 mb-4 leading-relaxed">
              {announcement.excerpt_en ||
                announcement.short_description ||
                announcement.job_description?.substring(0, 200)}
            </p>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold">
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedSection;
