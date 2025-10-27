import { Eye, Edit, Trash2 } from "lucide-react";

export default function TenantsTable({
  selectedColumns = [],
  allColumns = [],
  items = [],
  onView,
  onEdit,
  onDelete,
  currentPage,
  totalPages,
  itemsPerPage,
  onPrevPage,
  onNextPage,
  totalCount = 0,
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-b">
          <tr>
            {selectedColumns.map((key) => {
              const col = allColumns.find((c) => c.key === key);
              return (
                <th key={key} className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  {col?.label}
                </th>
              );
            })}
            <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {items.length > 0 ? (
            items.map((tenant) => (
              <tr key={tenant.id} className="hover:bg-gray-50 transition-colors">
                {selectedColumns.map((key) => {
                  const col = allColumns.find((c) => c.key === key);
                  return (
                    <td key={key} className="px-4 py-4 text-sm text-gray-800">
                      {col?.render ? col.render(tenant) : '—'}
                    </td>
                  );
                })}
                <td className="px-4 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onView?.(tenant)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="View"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onEdit?.(tenant)}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete?.(tenant)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={selectedColumns.length + 1} className="px-4 py-8 text-center text-gray-500">
                No tenants found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4 pt-4 border-t">
          <p className="text-sm text-gray-600">
            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, totalCount)} of {totalCount} tenants
          </p>
          <div className="flex gap-2">
            <button
              onClick={onPrevPage}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            <button
              onClick={onNextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
