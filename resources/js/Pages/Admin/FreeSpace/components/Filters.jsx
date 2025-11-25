import { Search } from 'lucide-react';

const Filters = ({
  searchTerm,
  setSearchTerm,
  filterStatus,
  setFilterStatus,
  fetchFreeSpaces,
  perPageCount,
  setIsColumnMenuOpen,
  isColumnMenuOpen,
  columnMenuRef,
  allColumns,
  selectedColumns,
  toggleColumn,
  loading,
  spaces,
  maxColumns
}) => {
  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search spaces..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">All Status &nbsp; &nbsp; &nbsp;</option>
          <option value="available">Available</option>
          <option value="reserved">Reserved</option>
          <option value="occupied">Occupied</option>
        </select>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Add more:</span>
          {[5, 10, 20].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => fetchFreeSpaces((perPageCount === 'all' ? spaces.length : (perPageCount || 0)) + n)}
              disabled={loading}
              className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
            >
              {n}
            </button>
          ))}
          <button
            type="button"
            onClick={() => fetchFreeSpaces('all')}
            disabled={loading}
            className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
          >
            Load all
          </button>
        </div>
        <div className="relative" ref={columnMenuRef}>
          <button
            type="button"
            onClick={() => setIsColumnMenuOpen((v) => !v)}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            title="Customize columns"
          >
            Columns
          </button>
          {isColumnMenuOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-10 p-2">
              <p className="px-2 py-1 text-xs text-gray-500">Select up to {maxColumns} columns</p>
              <div className="max-h-60 overflow-auto divide-y divide-gray-100">
                {allColumns.map((col) => (
                  <label key={col.key} className="flex items-center gap-2 px-2 py-2 cursor-pointer hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={selectedColumns.includes(col.key)}
                      onChange={() => toggleColumn(col.key)}
                      className="w-4 h-4 rounded text-green-600 focus:ring-green-500"
                    />
                    <span className="text-sm text-gray-700">{col.label}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Filters;
