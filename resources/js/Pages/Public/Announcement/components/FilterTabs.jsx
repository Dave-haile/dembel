// components/FilterTabs.jsx
import { Search } from "lucide-react";
import React from "react";

const FilterTabs = ({
  tabs,
  activeFilter,
  setActiveFilter,
  searchTerm,
  setSearchTerm,
}) => {
  // const tabs = [
  //   { id: "all", label: "All" },
  //   { id: "free-spaces", label: "Free Spaces" },
  //   { id: "news", label: "News & Events" },
  //   { id: "vacancies", label: "Vacancies" },
  // ];

  return (
    // <div className="flex flex-wrap gap-2 mb-4">
    //   {tabs.map((tab) => (
    //     <button
    //       key={tab.id}
    //       onClick={() => onTabChange(tab.id)}
    //       className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
    //         activeTab === tab.id
    //           ? "bg-blue-600 text-white shadow-lg transform -translate-y-0.5"
    //           : "bg-gray-100 text-gray-700 hover:bg-gray-200"
    //       }`}
    //     >
    //       {tab.label}
    //     </button>
    //   ))}
    // </div>
    <section className="sticky top-16 z-30 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveFilter(tab.key)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  activeFilter === tab.key
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>

          <div className="relative flex-1 lg:max-w-md">
            <Search
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search announcements..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FilterTabs;
