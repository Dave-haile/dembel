import React from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Eye,
  ExternalLink,
  MapPin,
  Maximize,
  DollarSign,
  Zap,
  Droplets,
  Wind,
  User,
  Phone,
  Mail,
} from "lucide-react";
import AvailabilityBadge from "./AvailabilityBadge";

const parseJsonArray = (jsonString) => {
  try {
    return JSON.parse(jsonString);
  } catch {
    return [];
  }
};

const SpaceDetailsSidebar = ({
  space,
  currentImageIndex,
  setCurrentImageIndex,
  sidebarWidth,
  isResizing,
  onMouseDown,
  onClose,
}) => {
  if (!space) return null;

  const nextImage = () => {
    if (space && currentImageIndex < space.gallery.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex scrollbar-hide mt-[4.3rem]">
      <div
        className="flex-1 bg-black bg-opacity-50 transition-opacity duration-100 scrollbar-hide"
        onClick={onClose}
      ></div>

      <div
        className="bg-white shadow-2xl flex flex-col transition-all duration-100 ease-out transform translate-x-0 scrollbar-hide"
        style={{ width: `${sidebarWidth}px` }}
      >
        <div
          className={`scrollbar-hide absolute left-0 top-0 bottom-0 w-3 bg-gray-300 hover:bg-blue-500 cursor-ew-resize transition-colors duration-100 ${
            isResizing ? "bg-blue-500" : ""
          }`}
          onMouseDown={onMouseDown}
        >
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-8 bg-gray-400 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-200"></div>
        </div>

        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-50">
          <h2 className="text-2xl font-bold text-gray-900 truncate pr-4">
            {space.name}
          </h2>
          <button
            onClick={onClose}
            className="flex-shrink-0 text-gray-400 hover:text-gray-600 hover:bg-gray-200 p-2 rounded-full transition-all duration-200"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            <div className="relative mb-6">
              <img
                src={space.gallery[currentImageIndex]}
                alt={space.name}
                className="w-full h-48 object-cover rounded-lg"
              />

              {space.gallery.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    disabled={currentImageIndex === 0}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1.5 rounded-full hover:bg-opacity-75 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={nextImage}
                    disabled={currentImageIndex === space.gallery.length - 1}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1.5 rounded-full hover:bg-opacity-75 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    <ChevronRight size={16} />
                  </button>

                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                    {space.gallery.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                          index === currentImageIndex
                            ? "bg-white"
                            : "bg-white bg-opacity-50"
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between mb-4">
                <AvailabilityBadge status={space.availability_status} />
                {space.virtual_tour_url && (
                  <a
                    href={space.virtual_tour_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium hover:bg-purple-200 transition-colors duration-200"
                  >
                    <Eye size={14} className="mr-1" />
                    Virtual Tour
                    <ExternalLink size={14} className="ml-1" />
                  </a>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="flex items-center text-gray-600">
                  <MapPin size={16} className="mr-2" />
                  <div>
                    <div className="font-medium">{space.floor.name}</div>
                    <div className="text-sm">{space.wing_or_zone}</div>
                  </div>
                </div>
                <div className="flex items-center text-gray-600">
                  <Maximize size={16} className="mr-2" />
                  <div>
                    <div className="font-medium">{space.area_sqm} sqm</div>
                    <div className="text-sm">{space.dimensions}</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center mb-6">
                <DollarSign size={24} className="text-green-600 mr-2" />
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {space.monthly_rent} {space.rent_currency}
                  </div>
                  <div className="text-sm text-gray-600">
                    per month {space.negotiable && "• Negotiable"}
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Description
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {space.full_description}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Amenities
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {space.has_window && (
                    <div className="flex items-center text-gray-600">
                      <Eye size={16} className="mr-2 text-blue-600" />
                      Window View
                    </div>
                  )}
                  {space.has_electricity && (
                    <div className="flex items-center text-gray-600">
                      <Zap size={16} className="mr-2 text-yellow-600" />
                      Electricity
                    </div>
                  )}
                  {space.has_plumbing && (
                    <div className="flex items-center text-gray-600">
                      <Droplets size={16} className="mr-2 text-blue-600" />
                      Plumbing
                    </div>
                  )}
                  {space.has_ventilation && (
                    <div className="flex items-center text-gray-600">
                      <Wind size={16} className="mr-2 text-gray-600" />
                      Ventilation
                    </div>
                  )}
                </div>
              </div>

              {parseJsonArray(space.features).length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Features
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {parseJsonArray(space.features).map((feature, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {parseJsonArray(space.rent_includes).length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Rent Includes
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {parseJsonArray(space.rent_includes).map((item, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Contact Information
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <User size={20} className="text-gray-600 mr-3" />
                    <div>
                      <div className="font-medium text-gray-900">
                        {space.contact_person}
                      </div>
                      <div className="text-sm text-gray-600">Leasing Agent</div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Phone size={20} className="text-gray-600 mr-3" />
                    <a
                      href={`tel:${space.contact_phone}`}
                      className="text-blue-800 hover:text-blue-900 transition-colors duration-200"
                    >
                      {space.contact_phone}
                    </a>
                  </div>

                  <div className="flex items-center">
                    <Mail size={20} className="text-gray-600 mr-3" />
                    <a
                      href={`mailto:${space.contact_email}`}
                      className="text-blue-800 hover:text-blue-900 transition-colors duration-200"
                    >
                      {space.contact_email}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpaceDetailsSidebar;
