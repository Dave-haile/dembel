import React, { useState, useMemo } from "react";
import { Head } from "@inertiajs/react";
import { Search } from "lucide-react";
import MainLayout from "../Shared/MainLayout";
import TenantCard from "./TenantCard";

const Tenant = ({ tenants, categories }) => {
  console.log(tenants, categories);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredTenants = useMemo(() => {
    if (!tenants || !Array.isArray(tenants)) {
      return [];
    }

    return tenants.filter((tenant) => {
      if (!tenant) return false;

      const matchesSearch =
        tenant.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tenant.description?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" || tenant.category?.id === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory, tenants]);

  // Ensure categories is an array
  const safeCategories = Array.isArray(categories) ? categories : [];
  const safeTenants = Array.isArray(tenants) ? tenants : [];

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

      <div className="max-w-7xl mx-auto px-4 py-12">
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
        <div className="mb-12">
          <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
            {safeCategories.map((category) => (
              <button
                key={category.id || category.name}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium whitespace-nowrap transition-all duration-200 ${
                  selectedCategory === category.id
                    ? "bg-blue-600 text-white shadow-lg scale-105"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                <span className="text-lg">{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-8">
          <p className="text-gray-600">
            Showing {filteredTenants.length} of {safeTenants.length} stores
          </p>
        </div>

        {/* Tenants Grid */}
        {filteredTenants.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredTenants.map((tenant) => (
              <TenantCard key={tenant.id} tenant={tenant} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">
              No stores found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search terms or category filters.
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Tenant;
