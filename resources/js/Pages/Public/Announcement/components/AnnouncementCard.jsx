import { Calendar, MapPin, DollarSign, Tag } from "lucide-react";

function AnnouncementCard({ announcement, onClick }) {
  const getBadgeColor = (type) => {
    switch (type) {
      case "free_space":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "news":
        return "bg-green-100 text-green-800 border-green-300";
      case "vacancy":
        return "bg-purple-100 text-purple-800 border-purple-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case "free_space":
        return "Free Space";
      case "news":
        return "News & Events";
      case "vacancy":
        return "Vacancy";
      default:
        return type;
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer h-full flex flex-col">
      <div className="relative h-56 overflow-hidden">
        <img
          src={
            announcement.thumbnail ||
            "https://placehold.co/600x400?text=No+Image"
          }
          alt={announcement.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            e.currentTarget.src =
              "https://placehold.co/600x400?text=No+Store+Logo";
          }}
        />
        <div className="absolute top-4 left-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold border ${getBadgeColor(
              announcement.type
            )}`}
          >
            {getTypeLabel(announcement.type)}
          </span>
        </div>
      </div>

      {/* Flex container to push button to bottom */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
          {announcement.title}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
          {announcement.description}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <Calendar size={16} className="mr-2 flex-shrink-0" />
            <span>
              {formatDate(announcement.date || announcement.created_at)}
            </span>
          </div>

          {announcement.category && (
            <div className="flex items-center text-sm text-gray-500">
              <Tag size={16} className="mr-2 flex-shrink-0" />
              <span>{announcement.category}</span>
            </div>
          )}

          {announcement.location && (
            <div className="flex items-center text-sm text-gray-500">
              <MapPin size={16} className="mr-2 flex-shrink-0" />
              <span>{announcement.location}</span>
            </div>
          )}

          {announcement.price && (
            <div className="flex items-center text-sm font-semibold text-blue-600">
              <DollarSign size={16} className="mr-2 flex-shrink-0" />
              <span>{announcement.price}</span>
            </div>
          )}
        </div>

        {/* Button sticks to bottom */}
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent card click if needed
            onClick();
          }}
          className="w-full mt-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 hover:scale-[1.02]"
        >
          View Details
        </button>
      </div>
    </div>
  );
}

export default AnnouncementCard;
