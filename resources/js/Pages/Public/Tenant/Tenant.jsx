/* eslint-disable no-undef */
import React, { useState, useRef, useEffect } from "react";
import { Head, router } from "@inertiajs/react";
import { Search, ChevronLeft, ChevronRight, LayoutGrid, List, ChevronDown, Loader2 } from "lucide-react";
import MainLayout from "../Shared/MainLayout";
import TenantCard from "./TenantCard";

const Tenant = ({ initialTenants = [], pagination: initialPagination = {}, categories = [] }) => {
  // State for search and filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedBuilding, setSelectedBuilding] = useState("all");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'

  // Pagination state
  const [tenants, setTenants] = useState(initialTenants || []);
  const [pagination, setPagination] = useState(initialPagination || {
    current_page: 1,
    last_page: 1,
    per_page: 12,
    total: 0
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [perPageOptions] = useState([12, 24, 48, 96]);

  const safeCategories = Array.isArray(categories) ? categories : [];
  const catScrollRef = useRef(null);

  // Scroll categories horizontally
  const scrollByAmount = (dir) => {
    if (catScrollRef.current) {
      catScrollRef.current.scrollBy({ left: dir * 300, behavior: "smooth" });
    }
  };

  // Reset tenants when search or category changes
  useEffect(() => {
    setTenants(initialTenants);
    setPagination(initialPagination);
  }, [initialTenants, initialPagination]);

  const loadMoreTenants = async () => {
    if (isLoadingMore || !pagination.has_more) return;

    setIsLoadingMore(true);
    const nextPage = pagination.current_page + 1;

    try {
      const response = await fetch(route('tenant.load-more', {
        page: nextPage,
        per_page: pagination.per_page,
        category: selectedCategory,
        search: searchTerm
      }));

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      setTenants(prev => [...prev, ...data.data]);
      setPagination({
        ...pagination,
        current_page: data.current_page,
        last_page: data.last_page,
        total: data.total,
        has_more: data.has_more
      });
    } catch (error) {
      console.error('Error loading more tenants:', error);
    } finally {
      setIsLoadingMore(false);
    }
  };
  // Handle per page change
  const handlePerPageChange = async (newPerPage) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/tenant/load-more?page=1&per_page=${newPerPage}&category=${selectedCategory}&search=${searchTerm}`);
      const data = await response.json();

      setTenants(data.data);
      setPagination({
        current_page: data.current_page,
        last_page: data.last_page,
        per_page: parseInt(newPerPage),
        total: data.total
      });
    } catch (error) {
      console.error('Error changing items per page:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle search with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm !== '') {
        router.get(
          route('tenant.index'),
          {
            search: searchTerm,
            category: selectedCategory,
            building: selectedBuilding
          },
          {
            preserveState: true,   // keep current component state
            preserveScroll: true,  // keep scroll position
            onStart: () => { },     // optional: prevent loader
            onFinish: () => { },    // optional: prevent loader
            onSuccess: () => { },
          }
        );
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, selectedCategory, selectedBuilding]);

  // Handle category change
  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    router.get(
      route('tenant.index'),
      {
        category: categoryId,
        building: selectedBuilding,
        search: searchTerm
      },
      {
        preserveState: true,   // keep current component state
        preserveScroll: true,  // keep scroll position
        onStart: () => { },     // optional: prevent loader
        onFinish: () => { },    // optional: prevent loader
        onSuccess: () => { },
      }
    );
  };

  // Handle building change
  const handleBuildingChange = (building) => {
    setSelectedBuilding(building);
    router.get(
      route('tenant.index'),
      {
        category: selectedCategory,
        building: building,
        search: searchTerm
      },
      {
        preserveState: true,   // keep current component state
        preserveScroll: true,  // keep scroll position
        onStart: () => { },     // optional: prevent loader
        onFinish: () => { },    // optional: prevent loader
        onSuccess: () => { },
      }
    );
  };

  return (
    <MainLayout>
      <Head>
        <title>Our Tenants - Dembel City Center</title>
        <meta
          name="description"
          content="Discover a variety of shops and services at Dembel City Center"
        />
      </Head>

      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage:
              "url(https://images.pexels.com/photos/264507/pexels-photo-264507.jpeg?auto=compress&cs=tinysrgb&w=1600)",
          }}
        />
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Tenants</h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Discover a variety of shops and services at Dembel City Center
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </div>

      <div className="max-w-[89rem] mx-auto px-4 py-12">
        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto mb-12">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search for a shop..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-6 py-4 text-lg border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-lg"
          />
        </div>

        {/* Category Filters */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-3">Categories</h3>
          <div className="relative">
            <button
              type="button"
              onClick={() => scrollByAmount(-1)}
              aria-label="Scroll left"
              className="absolute -left-12 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white border border-gray-200 shadow hover:bg-gray-200"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div
              ref={catScrollRef}
              className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide"
            >
              {/* <button
                onClick={() => handleCategoryChange("all")}
                className={`px-4 py-2 rounded-full whitespace-nowrap ${selectedCategory === "all"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                  }`}
              >
                All Categories
              </button> */}
              {safeCategories.map((category) => (
                <button
                  key={category.id || category.name}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all duration-200 ${selectedCategory === category.id
                    ? "bg-blue-600 text-white shadow-lg scale-105"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                    }`}
                >
                  <span className="text-lg">{category.icon}</span>
                  <span>{category.name}</span>
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => scrollByAmount(1)}
              aria-label="Scroll right"
              className="absolute -right-12 border-2 border-gray-200 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow hover:bg-gray-200"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Building Filter */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-3">Buildings</h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleBuildingChange("all")}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${selectedBuilding === "all"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
            >
              All Buildings
            </button>

            <button
              onClick={() => handleBuildingChange('Dembel')}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${selectedBuilding === 'Dembel'
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
            >
              Dembel
            </button>
            <button
              onClick={() => handleBuildingChange('Dembel Extension')}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${selectedBuilding === 'Dembel Extension'
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
            >
              Dembel Extension
            </button>
          </div>
        </div>

        {/* View Toggle, Results Count, and Per Page Selector */}
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex-1">
            <p className="text-gray-600">
              Showing {tenants.length} of {pagination.total} stores
              {searchTerm && ` for "${searchTerm}"`}
              {selectedCategory !== 'all' &&
                safeCategories.find(c => c.id === selectedCategory) &&
                ` in ${safeCategories.find(c => c.id === selectedCategory)?.name}`}
              {selectedBuilding !== 'all' &&
                ` • Building: ${selectedBuilding}`}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
            {/* Items per page selector */}
            <div className="relative">
              <label htmlFor="perPage" className="text-sm text-gray-600 mr-2">Show:</label>
              <select
                id="perPage"
                value={pagination.per_page}
                onChange={(e) => handlePerPageChange(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-md py-1.5 pl-3 pr-8 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                disabled={isLoading}
              >
                {perPageOptions.map(option => (
                  <option key={option} value={option}>
                    {option} per page
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>

            {/* View toggle buttons */}
            <div className="flex items-center space-x-2 bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm' : 'text-gray-500 hover:bg-gray-200'
                  }`}
                title="Grid view"
                disabled={isLoading}
              >
                <LayoutGrid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm' : 'text-gray-500 hover:bg-gray-200'
                  }`}
                title="List view"
                disabled={isLoading}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Tenants Grid/List */}
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          </div>
        ) : tenants.length > 0 ? (
          <>
            <div className={viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'
              : 'space-y-4'}
            >
              {tenants.map((tenant) => (
                <TenantCard
                  key={tenant.id}
                  tenant={tenant}
                  viewMode={viewMode}
                />
              ))}
            </div>

            {/* Load More Button */}
            {pagination.current_page < pagination.last_page && (
              <div className="mt-12 text-center">
                <button
                  onClick={loadMoreTenants}
                  disabled={isLoadingMore}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoadingMore ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    'Load More'
                  )}
                </button>
                <p className="mt-2 text-sm text-gray-500">
                  Showing {tenants.length} of {pagination.total} tenants
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">
              {searchTerm || selectedCategory !== 'all' ? 'No matching stores found' : 'No stores available'}
            </h3>
            <p className="text-gray-500">
              {searchTerm || selectedCategory !== 'all'
                ? 'Try adjusting your search terms or category filters.'
                : 'Please check back later for updates.'}
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Tenant;
