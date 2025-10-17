// components/AnnouncementsGrid.jsx
import { ChevronRight } from "lucide-react";
import React from "react";

const AnnouncementsGrid = ({
  featuredAnnouncement,
  handleAnnouncementClick,
}) => {
  // const getCategoryInfo = (type) => {
  //   switch (type) {
  //     case "free-space":
  //       return { label: "Free Space", color: "bg-green-500" };
  //     case "news":
  //       return { label: "News & Events", color: "bg-blue-500" };
  //     case "vacancy":
  //       return { label: "Vacancy", color: "bg-purple-500" };
  //     default:
  //       return { label: "Announcement", color: "bg-gray-500" };
  //   }
  // };

  if (featuredAnnouncement.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No announcements found.</p>
      </div>
    );
  }

  return (
    // <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    //   {announcements.map((announcement) => {
    //     const categoryInfo = getCategoryInfo(announcement.type);
    //     const date = announcement.created_at || announcement.posted_date;

    //     return (
    //       <div
    //         key={`${announcement.type}-${announcement.id}`}
    //         className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
    //       >
    //         <img
    //           className="h-48 w-full object-cover"
    //           src={announcement.image || announcement.thumbnail}
    //           alt={announcement.title || announcement.name}
    //         />
    //         <div className="p-6">
    //           <div className="flex items-center justify-between mb-3">
    //             <span
    //               className={`${categoryInfo.color} text-white px-2 py-1 rounded-full text-xs font-semibold`}
    //             >
    //               {categoryInfo.label}
    //             </span>
    //             <span className="text-sm text-gray-500">
    //               {new Date(date).toLocaleDateString()}
    //             </span>
    //           </div>

    //           <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
    //             {announcement.title || announcement.name}
    //           </h3>

    //           <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3">
    //             {announcement.excerpt_en ||
    //               announcement.short_description ||
    //               announcement.job_description?.substring(0, 120)}
    //           </p>

    //           <button className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-semibold text-sm">
    //             View Details
    //           </button>
    //         </div>
    //       </div>
    //     );
    //   })}
    // </div>
    <section className="py-12 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="h-64 md:h-auto">
              <img
                src={featuredAnnouncement.thumbnail}
                alt={featuredAnnouncement.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="inline-block mb-4">
                <span className="bg-yellow-100 text-yellow-800 border border-yellow-300 px-4 py-1 rounded-full text-sm font-semibold">
                  Featured not
                </span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {featuredAnnouncement.title}
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {featuredAnnouncement.description}
              </p>
              <button
                onClick={() => handleAnnouncementClick(featuredAnnouncement)}
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105 w-fit"
              >
                <span>Learn More</span>
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnnouncementsGrid;
