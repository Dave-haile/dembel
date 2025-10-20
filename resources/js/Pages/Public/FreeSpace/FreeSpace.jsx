import React, { useState, useEffect } from "react";
import { Square } from "lucide-react";
import { motion } from "framer-motion";
import { Head, usePage } from "@inertiajs/react";
import MainLayout from "../Shared/MainLayout";
import FiltersBar from "./components/FiltersBar";
import SpaceCard from "./components/SpaceCard";
import LoadMoreControls from "./components/LoadMoreControls";
import SpaceDetailsSidebar from "./components/SpaceDetailsSidebar";

const FreeSpaces = () => {
  const { spaces: initialSpaces, pagination: initialPagination } =
    usePage().props;
  console.log(initialSpaces);
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

  // Helper moved into child component where used

  const openModal = (space) => {
    setSelectedSpace(space);
    setCurrentImageIndex(0);
  };

  const closeModal = () => {
    setSelectedSpace(null);
    setCurrentImageIndex(0);
    setSidebarWidth(700); // Reset to default width
  };

  // Image navigation handled inside sidebar component

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
        <FiltersBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filters={filters}
          setFilters={setFilters}
          uniqueFloors={uniqueFloors}
        />

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
            <SpaceCard key={space.id} space={space} onOpen={openModal} />
          ))}
        </div>

        <LoadMoreControls
          hasMore={pagination.has_more}
          loading={loading}
          loadingAmount={loadingAmount}
          onLoadMore={loadMore}
          remaining={pagination.total - spaces.length}
          loadedCount={spaces.length}
        />

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
        <SpaceDetailsSidebar
          space={selectedSpace}
          currentImageIndex={currentImageIndex}
          setCurrentImageIndex={setCurrentImageIndex}
          sidebarWidth={sidebarWidth}
          isResizing={isResizing}
          onMouseDown={handleMouseDown}
          onClose={closeModal}
        />
      )}
    </MainLayout>
  );
};

export default FreeSpaces;
