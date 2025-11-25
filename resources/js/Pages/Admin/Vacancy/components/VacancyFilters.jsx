import React from "react";
import { Search } from "lucide-react";

const VacancyFilters = ({
  searchTerm,
  setSearchTerm,
  filterType,
  setFilterType,
  filterDepartment,
  setFilterDepartment,
  departments,
  employmentTypes,
  fetchVacancies,
  items,
  perPageCount,
  loading,
}) => {
  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search vacancies..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <select
          value={filterType}
          onChange={(e) => {
            setFilterType(e.target.value);
          }}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          <option value="">All Types &nbsp; &nbsp;</option>
          {employmentTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <select
          value={filterDepartment}
          onChange={(e) => {
            setFilterDepartment(e.target.value);
          }}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          <option value="">All Departments</option>
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Add more:</span>
          {[5, 10, 20].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() =>
                fetchVacancies((perPageCount === "all" ? items.length : perPageCount || 0) + n)
              }
              disabled={loading}
              className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
            >
              {n}
            </button>
          ))}
          <button
            type="button"
            onClick={() => fetchVacancies("all")}
            disabled={loading}
            className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
          >
            Load all
          </button>
        </div>
      </div>
    </div>
  );
};

export default VacancyFilters;
