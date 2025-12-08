// import React from 'react';

// const JobFilters = ({
//   filters,
//   departments,
//   employmentTypes,
//   locations,
//   onFilterChange,
//   onClearFilters
// }) => {
//   return (
//     <div className="max-w-6xl mx-auto px-4 mb-12">
//       <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
//         <div className="flex flex-col md:flex-row gap-4">
//           <select
//             name="department"
//             value={filters.department}
//             onChange={onFilterChange}
//             className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
//           >
//             <option value="">All Departments</option>
//             {departments.map((dept) => (
//               <option key={dept} value={dept}>
//                 {dept}
//               </option>
//             ))}
//           </select>

//           <select
//             name="employmentType"
//             value={filters.employmentType}
//             onChange={onFilterChange}
//             className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
//           >
//             <option value="">All Employment Types</option>
//             {employmentTypes.map((type) => (
//               <option key={type} value={type}>
//                 {type}
//               </option>
//             ))}
//           </select>

//           <select
//             name="location"
//             value={filters.location}
//             onChange={onFilterChange}
//             className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
//           >
//             <option value="">All Locations</option>
//             {locations.map((loc) => (
//               <option key={loc} value={loc}>
//                 {loc}
//               </option>
//             ))}
//           </select>

//           <button
//             onClick={onClearFilters}
//             className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
//           >
//             Clear Filters
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default JobFilters;
import React from 'react';
import { Filter, X } from 'lucide-react';

const JobFilters = ({
  filters,
  departments,
  employmentTypes,
  locations,
  onFilterChange,
  onClearFilters
}) => {
  const hasActiveFilters = filters.department || filters.employment_type || filters.location;

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-slate-100 mb-8 transition-all duration-300 hover:shadow-lg max-w-6xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-4 items-center">
        <div className="flex items-center gap-2 text-slate-500 min-w-fit">
            <Filter className="w-5 h-5" />
            <span className="font-medium text-sm uppercase tracking-wider">Filter By</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1 w-full">
          <div className="relative">
            <select
              name="department"
              value={filters.department || ''}
              onChange={onFilterChange}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:ring-2 focus:ring-gold-500 focus:border-gold-500 outline-none transition-all appearance-none cursor-pointer hover:bg-slate-100"
            >
              <option value="">All Departments</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>

          <div className="relative">
            <select
              name="employmentType"
              value={filters.employment_type || ''}
              onChange={onFilterChange}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:ring-2 focus:ring-gold-500 focus:border-gold-500 outline-none transition-all appearance-none cursor-pointer hover:bg-slate-100"
            >
              <option value="">All Employment Types</option>
              {employmentTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>

          <div className="relative">
            <select
              name="location"
              value={filters.location}
              onChange={onFilterChange}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:ring-2 focus:ring-gold-500 focus:border-gold-500 outline-none transition-all appearance-none cursor-pointer hover:bg-slate-100"
            >
              <option value="">All Locations</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
        </div>

        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="flex items-center justify-center px-5 py-3 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors font-medium whitespace-nowrap"
          >
            <X className="w-4 h-4 mr-2" />
            Clear
          </button>
        )}
      </div>
    </div>
  );
};

export default JobFilters;