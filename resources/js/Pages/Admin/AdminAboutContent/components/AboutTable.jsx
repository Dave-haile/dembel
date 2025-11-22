import React, { useMemo, useState } from "react";
import { Eye, Edit, Trash2 } from "lucide-react";

const renderContentPreview = (item) => {
  if (!item.extra_data) return "No data";
  try {
    const extraData = typeof item.extra_data === "string" ? JSON.parse(item.extra_data) : item.extra_data;
    if (Array.isArray(extraData)) return `${extraData.length} items`;
    if (typeof extraData === "object" && extraData !== null)
      return Object.keys(extraData).length > 0 ? `${Object.keys(extraData).length} properties` : "Empty object";
    return String(extraData).substring(0, 50) + "...";
  } catch (e) {
    console.error(e);
    return "Invalid JSON data";
  }
};

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const options = { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const AboutTable = ({ items = [], searchTerm = "", onView, onEdit, onDelete }) => {
  // eslint-disable-next-line no-unused-vars
  const [perPageCount, setPerPageCount] = useState(10);

  const filtered = useMemo(() => {
    const t = (searchTerm || "").toLowerCase();
    return (items || []).filter((item) => {
      return (
        (item.component || "").toLowerCase().includes(t) ||
        (item.title || "").toLowerCase().includes(t) ||
        (item.subtitle || "").toLowerCase().includes(t) ||
        (item.position || "").toString().includes(t) ||
        (item.description || "").toLowerCase().includes(t)
      );
    });
  }, [items, searchTerm]);

  const visible = filtered.slice(0, perPageCount === "all" ? filtered.length : perPageCount);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Position</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Component</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Content Preview</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Updated</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {visible.length > 0 ? (
            visible.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.position || "N/A"}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.component}</td>
                <td className="px-6 py-4 whitespace-normal text-sm text-gray-900">
                  {item.title || "Untitled"}
                  {item.subtitle && <p className="text-xs text-gray-500 mt-1">{item.subtitle}</p>}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  <div className="line-clamp-2">{renderContentPreview(item)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(item.updated_at)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center gap-2 justify-center">
                    <button onClick={() => onView && onView(item)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button onClick={() => onEdit && onEdit(item)} className="p-2 text-green-600 hover:bg-green-50 rounded-lg">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete && onDelete(item);
                      }}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                No content found. {searchTerm ? "Try a different search term." : "Create your first content item."}
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {perPageCount !== "all" && filtered.length > perPageCount && (
        <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to <span className="font-medium">{Math.min(perPageCount, filtered.length)}</span> of{" "}
            <span className="font-medium">{filtered.length}</span> results
          </div>
          <div className="flex space-x-2">
            <button disabled className="px-4 py-2 border rounded-md text-sm">
              Previous
            </button>
            <button disabled={filtered.length <= perPageCount} className="px-4 py-2 border rounded-md text-sm">
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutTable;
