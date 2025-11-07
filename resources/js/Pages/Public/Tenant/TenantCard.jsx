import React from "react";
import { router } from "@inertiajs/react";
import { MapPin, Clock, ArrowRight } from "lucide-react";

const TenantCard = ({ tenant, viewMode = 'grid' }) => {
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
      // eslint-disable-next-line no-undef
      return route("tenant.show", tenantId);
    } catch (error) {
      console.warn("Route not found, using fallback URL", error);
      return `/tenant/${tenantId}`;
    }
  };

  if (viewMode === 'list') {
    return (
      <div
        onClick={() => {
          router.visit(getTenantDetailUrl(tenant.id));
        }}
        className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 overflow-hidden group flex items-stretch h-40 cursor-pointer"
      >
        <div className="w-1/3 md:w-1/4 lg:w-1/5 relative overflow-hidden">
          <img
            src={tenant.logo || "https://placehold.co/1200x800?text=No+Image"}
            alt={tenant.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              e.target.src = "https://placehold.co/1200x800?text=No+Image";
            }}
          />
          <div className="absolute top-2 right-2">
            <span
              className={`px-2 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(
                tenant.category
              )}`}
            >
              {tenant.category?.name || "General"}
            </span>
          </div>
        </div>

        <div className="flex-1 p-4 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-bold text-gray-900 mb-1">{tenant.name}</h3>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
            </div>
            <p className="text-gray-600 text-sm line-clamp-2 mb-2">
              {tenant.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-600">
            <div className="flex items-center">
              <MapPin className="w-3.5 h-3.5 mr-1.5 text-gray-400 flex-shrink-0" />
              <span className="text-sm">
                {tenant.room_no && `Room ${tenant.room_no} • `}
                {tenant.floor?.name || tenant.floor}
                {tenant.location && `, ${tenant.location}`}
              </span>
            </div>
            {tenant.hours && (
              <div className="flex items-center">
                <Clock className="w-3.5 h-3.5 mr-1.5 text-gray-400" />
                <span className="text-sm">{tenant.hours}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Default grid view
  return (
    <div
      onClick={() => {
        router.visit(getTenantDetailUrl(tenant.id));
      }}
      className="bg-white rounded-2xl shadow-lg hover:cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden group h-full flex flex-col"
    >
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={tenant.logo || "https://placehold.co/1200x800?text=No+Image"}
          alt={tenant.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          onError={(e) => {
            e.target.src = "https://placehold.co/1200x800?text=No+Image";
          }}
        />
        <div className="absolute top-3 right-3">
          <span
            className={`px-2.5 py-1 rounded-full text-xs font-medium ${getCategoryColor(
              tenant.category
            )}`}
          >
            {tenant.category?.name || "General"}
          </span>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">{tenant.name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1">
          {tenant.description}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex items-start text-sm text-gray-600">
            <MapPin className="w-4 h-4 mt-0.5 mr-2 flex-shrink-0 text-gray-400" />
            <div>
              {tenant.room_no && <div className="font-medium">Room: {tenant.room_no}</div>}
              <div>{tenant.floor?.name || tenant.floor}{tenant.location && `, ${tenant.location}`}</div>
            </div>
          </div>
          {tenant.hours && (
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="w-4 h-4 mr-2 text-gray-400" />
              <span>{tenant.hours}</span>
            </div>
          )}
        </div>

        <div className="mt-auto pt-2">
          <div className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2.5 px-4 rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 text-center text-sm">
            View Details
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenantCard;
