import React from "react";
import { Link } from "@inertiajs/react";
import { MapPin, Clock } from "lucide-react";

const TenantCard = ({ tenant }) => {
  const getCategoryColor = (category) => {
    const colors = {
      fashion: "bg-pink-100 text-pink-800",
      jewelry: "bg-purple-100 text-purple-800",
      beauty: "bg-rose-100 text-rose-800",
      restaurants: "bg-orange-100 text-orange-800",
      electronics: "bg-blue-100 text-blue-800",
      home: "bg-green-100 text-green-800",
      entertainment: "bg-indigo-100 text-indigo-800",
      health: "bg-emerald-100 text-emerald-800",
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  // Use the correct route name
  const getTenantDetailUrl = (tenantId) => {
    try {
      return route("tenant.show", tenantId);
    } catch (error) {
      console.warn("Route not found, using fallback URL");
      return `/tenant/${tenantId}`;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden group">
      <div className="relative overflow-hidden">
        <img
          src={tenant.logo || "/images/default-tenant-logo.png"}
          alt={tenant.name}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
          onError={(e) => {
            e.target.src = "/images/default-tenant-logo.png";
          }}
        />
        <div className="absolute top-4 right-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(
              tenant.category
            )}`}
          >
            {tenant.category_name || "General"}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{tenant.name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {tenant.description}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="w-4 h-4 mr-2" />
            {tenant.floor}, {tenant.location}
          </div>
          {tenant.hours && (
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="w-4 h-4 mr-2" />
              {tenant.hours}
            </div>
          )}
        </div>

        <Link
          href={getTenantDetailUrl(tenant.id)}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 inline-block text-center"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default TenantCard;
