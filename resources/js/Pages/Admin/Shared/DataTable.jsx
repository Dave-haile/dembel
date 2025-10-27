import React from "react";
import { Edit, Trash2, ChevronLeft, ChevronRight } from "lucide-react";

const DataTable = ({
  columns,
  data,
  onEdit,
  onDelete,
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  filteredCount,
}) => {
  const hasCounts = typeof itemsPerPage === "number" && typeof filteredCount === "number";
  const startIndex = hasCounts ? (currentPage - 1) * itemsPerPage + 1 : null;
  const endIndex = hasCounts ? Math.min(currentPage * itemsPerPage, filteredCount) : null;
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full rounded-lg bg-white">
        <thead>
          <tr className="border-b border-gray-200 text-gray-600">
            {columns.map((col, i) => (
              <th
                key={i}
                className="h-12 px-4 text-left text-sm font-semibold"
              >
                {col.header}
              </th>
            ))}
            <th className="h-12 px-4 text-right text-sm font-semibold">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((row, i) => (
            <tr
              key={row.id || i}
              className="bg-white odd:bg-gray-50/60 hover:bg-gray-50"
            >
              {columns.map((col, j) => (
                <td
                  key={j}
                  className="py-4 px-4 text-sm text-gray-700"
                >
                  {col.render ? col.render(row) : row[col.accessor]}
                </td>
              ))}
              <td className="py-4 px-4 text-right">
                <div className="ml-auto flex items-center justify-end gap-2">
                  <button
                    onClick={() => onEdit(row)}
                    title="Edit"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-700 shadow-sm hover:bg-gray-50"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onDelete(row.id)}
                    title="Delete"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 bg-white text-red-600 shadow-sm hover:bg-gray-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            {hasCounts
              ? `Showing ${startIndex} to ${endIndex} of ${filteredCount} entries`
              : `Page ${currentPage} of ${totalPages}`}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-700 shadow-sm hover:bg-gray-50 disabled:opacity-50"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-700 shadow-sm hover:bg-gray-50 disabled:opacity-50"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
