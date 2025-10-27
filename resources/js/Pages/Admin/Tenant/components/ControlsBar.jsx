import { useEffect, useRef } from "react";
import { Search } from "lucide-react";

export default function ControlsBar({
  searchTerm,
  onSearchChange,
  filterCategory,
  onCategoryChange,
  categories = [],
  selectedColumns = [],
  maxColumns = 5,
  toggleColumn,
  isColumnMenuOpen,
  setIsColumnMenuOpen,
  allColumns = [],
  perPage,
  loading,
  onFetchTenants,
}) {
  const columnMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isColumnMenuOpen && columnMenuRef.current && !columnMenuRef.current.contains(e.target)) {
        setIsColumnMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isColumnMenuOpen, setIsColumnMenuOpen]);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search tenants..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select
          value={filterCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.icon} {cat.name}
            </option>
          ))}
        </select>

        <div className="relative" ref={columnMenuRef}>
          <button
            type="button"
            onClick={() => setIsColumnMenuOpen((v) => !v)}
            className="px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 focus:outline-none"
          >
            Columns ({selectedColumns.length}/{maxColumns})
          </button>
          {isColumnMenuOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-10 p-2">
              <div className="max-h-64 overflow-auto">
                {allColumns.map((c) => {
                  const checked = selectedColumns.includes(c.key);
                  const atLimit = selectedColumns.length >= maxColumns;
                  const disableAdd = !checked && atLimit;
                  return (
                    <label
                      key={c.key}
                      className={`flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-50 ${disableAdd ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        disabled={disableAdd}
                        onChange={() => toggleColumn(c.key)}
                      />
                      <span className="text-sm text-gray-800">{c.label}</span>
                    </label>
                  );
                })}
              </div>
              <div className="pt-2 text-xs text-gray-500 px-2">Select up to {maxColumns} columns</div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Show:</span>
          {[10, 20, 100].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => onFetchTenants(n)}
              className={`px-3 py-1.5 rounded border ${perPage === n ? 'bg-gray-800 text-white border-gray-800' : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'}`}
              disabled={loading && perPage === n}
            >
              {n}
            </button>
          ))}
          <button
            type="button"
            onClick={() => onFetchTenants('all')}
            className={`px-3 py-1.5 rounded border ${perPage === 'all' ? 'bg-gray-800 text-white border-gray-800' : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'}`}
            disabled={loading && perPage === 'all'}
          >
            Load all
          </button>
          {loading && <span className="text-sm text-gray-500">Loading...</span>}
        </div>
      </div>

      
    </div>
  );
}
