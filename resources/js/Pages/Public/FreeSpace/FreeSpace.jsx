import React, { useState, useEffect } from "react";
import {
  Search,
  MapPin,
  Maximize,
  DollarSign,
  Phone,
  Mail,
  User,
  X,
  ChevronLeft,
  ChevronRight,
  Eye,
  Zap,
  Droplets,
  Wind,
  Square,
  ExternalLink,
  CheckCircle,
  Clock,
  XCircle,
  Loader2,
} from "lucide-react";
import { motion } from "framer-motion";
import { Head, usePage } from "@inertiajs/react";
import MainLayout from "../Shared/MainLayout";

const FreeSpaces = () => {
  const { spaces: initialSpaces, pagination: initialPagination } =
    usePage().props;
  const [spaces, setSpaces] = useState([]);
  const [filteredSpaces, setFilteredSpaces] = useState([]);
  const [selectedSpace, setSelectedSpace] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [sidebarWidth, setSidebarWidth] = useState(700);
  const [isResizing, setIsResizing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    availability: "all",
    floor: "all",
    minRent: "",
    maxRent: "",
  });

  // Pagination state
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    per_page: 3,
    total: 0,
    has_more: false,
  });
  const [loading, setLoading] = useState(false);
  const [loadingAmount, setLoadingAmount] = useState(null);

  useEffect(() => {
    setSpaces(initialSpaces);
    setFilteredSpaces(initialSpaces);
    if (initialPagination) {
      setPagination(initialPagination);
    }
  }, []);

  // Load more function with specific amount
  const loadMore = async (amount) => {
    if (loading || !pagination.has_more) return;

    setLoading(true);
    setLoadingAmount(amount);
    try {
      const response = await fetch(
        `/spaces/load?page=${pagination.current_page + 1}&per_page=${amount}`
      );
      const data = await response.json();

      if (data.data && data.data.length > 0) {
        setSpaces((prevSpaces) => [...prevSpaces, ...data.data]);
        setPagination({
          current_page: data.current_page,
          last_page: data.last_page,
          per_page: data.per_page,
          total: data.total,
          has_more: data.has_more,
        });
      }
    } catch (error) {
      console.error("Error loading more spaces:", error);
    } finally {
      setLoading(false);
      setLoadingAmount(null);
    }
  };

  // Filter and search logic
  useEffect(() => {
    let filtered = spaces;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (space) =>
          space.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          space.wing_or_zone.toLowerCase().includes(searchTerm.toLowerCase()) ||
          space.short_description
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
    }

    // Availability filter
    if (filters.availability !== "all") {
      filtered = filtered.filter(
        (space) => space.availability_status === filters.availability
      );
    }

    // Floor filter
    if (filters.floor !== "all") {
      filtered = filtered.filter(
        (space) => space.floor_id.toString() === filters.floor
      );
    }

    // Price range filter
    if (filters.minRent) {
      filtered = filtered.filter(
        (space) => parseFloat(space.monthly_rent) >= parseFloat(filters.minRent)
      );
    }
    if (filters.maxRent) {
      filtered = filtered.filter(
        (space) => parseFloat(space.monthly_rent) <= parseFloat(filters.maxRent)
      );
    }

    setFilteredSpaces(filtered);
  }, [searchTerm, filters, spaces]);

  const getAvailabilityBadge = (status) => {
    switch (status) {
      case "available":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle size={12} className="mr-1" />
            Available
          </span>
        );
      case "reserved":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <Clock size={12} className="mr-1" />
            Reserved
          </span>
        );
      case "occupied":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <XCircle size={12} className="mr-1" />
            Occupied
          </span>
        );
      default:
        return null;
    }
  };

  const parseJsonArray = (jsonString) => {
    try {
      return JSON.parse(jsonString);
    } catch {
      return [];
    }
  };

  const openModal = (space) => {
    setSelectedSpace(space);
    setCurrentImageIndex(0);
  };

  const closeModal = () => {
    setSelectedSpace(null);
    setCurrentImageIndex(0);
    setSidebarWidth(700); // Reset to default width
  };

  const nextImage = () => {
    if (selectedSpace && currentImageIndex < selectedSpace.gallery.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  // Handle sidebar resizing
  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsResizing(true);
  };

  const handleMouseMove = (e) => {
    if (!isResizing) return;

    const newWidth = window.innerWidth - e.clientX;
    const minWidth = 400;
    const maxWidth = window.innerWidth * 0.8;

    if (newWidth >= minWidth && newWidth <= maxWidth) {
      setSidebarWidth(newWidth);
    }
  };

  const handleMouseUp = () => {
    setIsResizing(false);
  };

  // Add event listeners for resizing
  useEffect(() => {
    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "ew-resize";
      document.body.style.userSelect = "none";
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isResizing]);

  // eslint-disable-next-line no-unused-vars
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const uniqueFloors = Array.from(
    new Set(spaces.map((space) => space.floor_id))
  )
    .map((floorId) => spaces.find((space) => space.floor_id === floorId)?.floor)
    .filter(Boolean);

  return (
    <MainLayout>
      <Head title="Free Spaces - Dembel City Center" />

      <section className="relative h-[40vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=1920&h=800&fit=crop')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center text-white px-4"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Available Spaces
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
            Discover premium retail, office, and commercial spaces at Dembel
            City Center
          </p>
        </motion.div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search
                size={20}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search spaces by name, zone, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Availability
                </label>
                <select
                  value={filters.availability}
                  onChange={(e) =>
                    setFilters({ ...filters, availability: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="available">Available</option>
                  <option value="reserved">Reserved</option>
                  <option value="occupied">Occupied</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Floor
                </label>
                <select
                  value={filters.floor}
                  onChange={(e) =>
                    setFilters({ ...filters, floor: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Floors</option>
                  {uniqueFloors.map((floor) => (
                    <option key={floor?.id} value={floor?.id.toString()}>
                      {floor?.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Min Rent (USD)
                </label>
                <input
                  type="number"
                  placeholder="0"
                  value={filters.minRent}
                  onChange={(e) =>
                    setFilters({ ...filters, minRent: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max Rent (USD)
                </label>
                <input
                  type="number"
                  placeholder="10000"
                  value={filters.maxRent}
                  onChange={(e) =>
                    setFilters({ ...filters, maxRent: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredSpaces.length} of {pagination.total} spaces
            {pagination.has_more && (
              <span className="text-blue-600 ml-2">
                ({spaces.length} loaded)
              </span>
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSpaces.map((space) => (
            <div
              key={space.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={space.thumbnail}
                  alt={space.name}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  {getAvailabilityBadge(space.availability_status)}
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
                    <div
                      className="flex items-center text-gray-600"
                      title="Window"
                    >
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
                    <div
                      className="flex items-center text-gray-600"
                      title="Plumbing"
                    >
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
                  onClick={() => openModal(space)}
                  className="w-full bg-blue-800 hover:bg-blue-900 text-white py-3 px-4 rounded-lg font-semibold transition-colors duration-200"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {pagination.has_more && (
          <div className="text-center mt-12">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Load More Spaces
              </h3>
              <p className="text-sm text-gray-600">
                Choose how many more spaces to load
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3 border-2">
              {[5, 10, 15].map((amount) => (
                <button
                  key={amount}
                  onClick={() => loadMore(amount)}
                  disabled={loading}
                  className={`inline-flex items-center px-2 py-1 font-semibold rounded-lg transition-all duration-200 ${
                    loading && loadingAmount === amount
                      ? "bg-blue-600 cursor-not-allowed"
                      : "bg-blue-800 hover:bg-blue-900 hover:scale-105"
                  } text-white disabled:cursor-not-allowed`}
                >
                  {loading && loadingAmount === amount ? (
                    <>
                      <Loader2 size={16} className="mr-2 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    <>
                      Load {amount} More
                      <ChevronRight size={16} className="ml-1" />
                    </>
                  )}
                </button>
              ))}

              <button
                onClick={() => loadMore("all")}
                disabled={loading}
                className={`inline-flex items-center px-6 py-3 font-semibold rounded-lg transition-all duration-200 ${
                  loading && loadingAmount === "all"
                    ? "bg-green-600 cursor-not-allowed"
                    : "bg-green-800 hover:bg-green-900 hover:scale-105"
                } text-white disabled:cursor-not-allowed`}
              >
                {loading && loadingAmount === "all" ? (
                  <>
                    <Loader2 size={16} className="mr-2 animate-spin" />
                    Loading All...
                  </>
                ) : (
                  <>
                    Load All Remaining
                    <ChevronRight size={16} className="ml-1" />
                  </>
                )}
              </button>
            </div>

            <p className="text-sm text-gray-500 mt-4">
              {pagination.total - spaces.length} spaces remaining
            </p>
          </div>
        )}

        {filteredSpaces.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Square size={64} className="mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No spaces found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search criteria or filters to find more spaces.
            </p>
          </div>
        )}
      </div>

      {selectedSpace && (
        <div className="fixed inset-0 z-50 flex scrollbar-hide">
          <div
            className="flex-1 bg-black bg-opacity-50 transition-opacity duration-100 scrollbar-hide"
            onClick={closeModal}
          ></div>

          <div
            className="bg-white shadow-2xl flex flex-col transition-all duration-100 ease-out transform translate-x-0 scrollbar-hide"
            style={{ width: `${sidebarWidth}px` }}
          >
            <div
              className={`scrollbar-hide absolute left-0 top-0 bottom-0 w-3 bg-gray-300 hover:bg-blue-500 cursor-ew-resize transition-colors duration-100 ${
                isResizing ? "bg-blue-500" : ""
              }`}
              onMouseDown={handleMouseDown}
            >
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-8 bg-gray-400 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-200"></div>
            </div>

            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-50">
              <h2 className="text-2xl font-bold text-gray-900 truncate pr-4">
                {selectedSpace.name}
              </h2>
              <button
                onClick={closeModal}
                className="flex-shrink-0 text-gray-400 hover:text-gray-600 hover:bg-gray-200 p-2 rounded-full transition-all duration-200"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              <div className="p-6">
                <div className="relative mb-6">
                  <img
                    src={selectedSpace.gallery[currentImageIndex]}
                    alt={selectedSpace.name}
                    className="w-full h-48 object-cover rounded-lg"
                  />

                  {selectedSpace.gallery.length > 1 && (
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
                        disabled={
                          currentImageIndex === selectedSpace.gallery.length - 1
                        }
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1.5 rounded-full hover:bg-opacity-75 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                      >
                        <ChevronRight size={16} />
                      </button>

                      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                        {selectedSpace.gallery.map((_, index) => (
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
                    {getAvailabilityBadge(selectedSpace.availability_status)}
                    {selectedSpace.virtual_tour_url && (
                      <a
                        href={selectedSpace.virtual_tour_url}
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
                        <div className="font-medium">
                          {selectedSpace.floor.name}
                        </div>
                        <div className="text-sm">
                          {selectedSpace.wing_or_zone}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Maximize size={16} className="mr-2" />
                      <div>
                        <div className="font-medium">
                          {selectedSpace.area_sqm} sqm
                        </div>
                        <div className="text-sm">
                          {selectedSpace.dimensions}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center mb-6">
                    <DollarSign size={24} className="text-green-600 mr-2" />
                    <div>
                      <div className="text-2xl font-bold text-gray-900">
                        {selectedSpace.monthly_rent}{" "}
                        {selectedSpace.rent_currency}
                      </div>
                      <div className="text-sm text-gray-600">
                        per month {selectedSpace.negotiable && "• Negotiable"}
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Description
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {selectedSpace.full_description}
                    </p>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Amenities
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedSpace.has_window && (
                        <div className="flex items-center text-gray-600">
                          <Eye size={16} className="mr-2 text-blue-600" />
                          Window View
                        </div>
                      )}
                      {selectedSpace.has_electricity && (
                        <div className="flex items-center text-gray-600">
                          <Zap size={16} className="mr-2 text-yellow-600" />
                          Electricity
                        </div>
                      )}
                      {selectedSpace.has_plumbing && (
                        <div className="flex items-center text-gray-600">
                          <Droplets size={16} className="mr-2 text-blue-600" />
                          Plumbing
                        </div>
                      )}
                      {selectedSpace.has_ventilation && (
                        <div className="flex items-center text-gray-600">
                          <Wind size={16} className="mr-2 text-gray-600" />
                          Ventilation
                        </div>
                      )}
                    </div>
                  </div>

                  {parseJsonArray(selectedSpace.features).length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        Features
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {parseJsonArray(selectedSpace.features).map(
                          (feature, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                            >
                              {feature}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  )}

                  {parseJsonArray(selectedSpace.rent_includes).length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        Rent Includes
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {parseJsonArray(selectedSpace.rent_includes).map(
                          (item, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                            >
                              {item}
                            </span>
                          )
                        )}
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
                            {selectedSpace.contact_person}
                          </div>
                          <div className="text-sm text-gray-600">
                            Leasing Agent
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center">
                        <Phone size={20} className="text-gray-600 mr-3" />
                        <a
                          href={`tel:${selectedSpace.contact_phone}`}
                          className="text-blue-800 hover:text-blue-900 transition-colors duration-200"
                        >
                          {selectedSpace.contact_phone}
                        </a>
                      </div>

                      <div className="flex items-center">
                        <Mail size={20} className="text-gray-600 mr-3" />
                        <a
                          href={`mailto:${selectedSpace.contact_email}`}
                          className="text-blue-800 hover:text-blue-900 transition-colors duration-200"
                        >
                          {selectedSpace.contact_email}
                        </a>
                      </div>
                    </div>

                    <div className="mt-6 space-y-3">
                      <button className="w-full bg-blue-800 hover:bg-blue-900 text-white py-3 px-4 rounded-lg font-semibold transition-colors duration-200">
                        Reserve Now
                      </button>
                      <button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-4 rounded-lg font-semibold transition-colors duration-200">
                        Schedule Viewing
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default FreeSpaces;
