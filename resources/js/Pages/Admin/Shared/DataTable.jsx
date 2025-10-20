import React from "react";

const DataTable = ({
  columns,
  data,
  onEdit,
  onDelete,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-700">
            {columns.map((col, i) => (
              <th
                key={i}
                className="py-3 px-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300"
              >
                {col.header}
              </th>
            ))}
            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {data.map((row, i) => (
            <tr
              key={row.id || i}
              className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
            >
              {columns.map((col, j) => (
                <td
                  key={j}
                  className="py-3 px-4 text-sm text-gray-600 dark:text-gray-300"
                >
                  {col.render ? col.render(row) : row[col.accessor]}
                </td>
              ))}
              <td className="py-3 px-4">
                <button
                  onClick={() => onEdit(row)}
                  className="text-blue-600 hover:underline mr-3"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(row.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default DataTable;
