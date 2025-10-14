import React from "react";
import {
  MapPin,
  Maximize,
  DollarSign,
  Eye,
  Zap,
  Droplets,
  Wind,
  ChevronRight,
} from "lucide-react";
import AvailabilityBadge from "./AvailabilityBadge";

const SpaceCard = ({ space, onOpen }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
      <div className="relative overflow-hidden">
        <img
          src={space.thumbnail}
          alt={space.name}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4">
          <AvailabilityBadge status={space.availability_status} />
        </div>
        {space.virtual_tour_url && (
          <div className="absolute top-4 right-4">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
              <Eye size={12} className="mr-1" />
              Virtual Tour
            </span>
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-800 transition-colors duration-200">
          {space.name}
        </h3>

        <div className="flex items-center text-gray-600 text-sm mb-2">
          <MapPin size={16} className="mr-1" />
          {space.floor.name} • {space.wing_or_zone}
        </div>

        <div className="flex items-center text-gray-600 text-sm mb-4">
          <Maximize size={16} className="mr-1" />
          {space.area_sqm} sqm • {space.dimensions}
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {space.short_description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <DollarSign size={20} className="text-green-600 mr-1" />
            <span className="text-xl font-bold text-gray-900">
              {space.monthly_rent}
            </span>
            <span className="text-gray-600 ml-1">
              {space.rent_currency}/month
            </span>
          </div>
          {space.negotiable && (
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
              Negotiable
            </span>
          )}
        </div>

        <div className="flex items-center space-x-3 mb-4">
          {space.has_window && (
            <div className="flex items-center text-gray-600" title="Window">
              <Eye size={16} />
            </div>
          )}
          {space.has_electricity && (
            <div
              className="flex items-center text-gray-600"
              title="Electricity"
            >
              <Zap size={16} />
            </div>
          )}
          {space.has_plumbing && (
            <div className="flex items-center text-gray-600" title="Plumbing">
              <Droplets size={16} />
            </div>
          )}
          {space.has_ventilation && (
            <div
              className="flex items-center text-gray-600"
              title="Ventilation"
            >
              <Wind size={16} />
            </div>
          )}
        </div>

        <button
          onClick={() => onOpen(space)}
          className="w-full bg-blue-800 hover:bg-blue-900 text-white py-3 px-4 rounded-lg font-semibold transition-colors duration-200 inline-flex items-center justify-center"
        >
          View Details
          <ChevronRight size={16} className="ml-1" />
        </button>
      </div>
    </div>
  );
};

export default SpaceCard;
