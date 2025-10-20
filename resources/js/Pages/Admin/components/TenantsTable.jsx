import { useState } from "react";
import { Edit, Trash2, Eye, Search } from "lucide-react";

export default function TenantsTable({ tenants }) {
  const [searchTerm, setSearchTerm] = useState("");
  const filteredTenants =
    tenants?.filter(
      (tenant) =>
        tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tenant.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tenant.category.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 md:mb-0">
          Recent Tenants
        </h3>
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search tenants..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Horizontal scroll container for desktop */}
      <div className="hidden md:block overflow-x-auto">
        <div className="min-w-[800px]">
          {" "}
          {/* Minimum width to ensure horizontal scroll when needed */}
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 min-w-[150px]">
                  Name
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 min-w-[120px]">
                  Category
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 min-w-[150px]">
                  Location
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 min-w-[120px]">
                  Floor
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 min-w-[150px]">
                  Hours
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 min-w-[120px]">
                  Phone
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 min-w-[100px]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredTenants.map((tenant) => (
                <tr
                  key={tenant.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-3 px-4 text-sm text-gray-900 font-medium min-w-[150px]">
                    <div className="flex items-center">
                      {tenant.logo && (
                        <img
                          src={`/${tenant.logo}`}
                          alt={tenant.name}
                          className="w-8 h-8 rounded-full object-cover mr-3"
                        />
                      )}
                      <span>{tenant.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600 min-w-[120px]">
                    <div className="flex items-center">
                      <span className="mr-2">{tenant.category.icon}</span>
                      {tenant.category.name}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600 min-w-[150px]">
                    {tenant.location}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600 min-w-[120px]">
                    {tenant.floor}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600 min-w-[150px]">
                    {tenant.hours}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600 min-w-[120px]">
                    {tenant.phone}
                  </td>
                  <td className="py-3 px-4 min-w-[100px]">
                    <div className="flex items-center space-x-2">
                      <button
                        className="p-1 hover:bg-blue-100 rounded transition-colors"
                        title="View"
                      >
                        <Eye size={18} className="text-blue-600" />
                      </button>
                      <button
                        className="p-1 hover:bg-green-100 rounded transition-colors"
                        title="Edit"
                      >
                        <Edit size={18} className="text-green-600" />
                      </button>
                      <button
                        className="p-1 hover:bg-red-100 rounded transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={18} className="text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile view */}
      <div className="md:hidden space-y-4">
        {filteredTenants.map((tenant) => (
          <div
            key={tenant.id}
            className="border border-gray-200 rounded-lg p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                {tenant.logo && (
                  <img
                    src={`/${tenant.logo}`}
                    alt={tenant.name}
                    className="w-8 h-8 rounded-full object-cover mr-3"
                  />
                )}
                <h4 className="font-semibold text-gray-900">{tenant.name}</h4>
              </div>
            </div>
            <div className="space-y-1 text-sm text-gray-600 mb-3">
              <div className="flex items-center">
                <span className="mr-2">{tenant.category.icon}</span>
                <p>Category: {tenant.category.name}</p>
              </div>
              <p>Location: {tenant.location}</p>
              <p>Floor: {tenant.floor}</p>
              <p>Hours: {tenant.hours}</p>
              <p>Phone: {tenant.phone}</p>
              {tenant.email && <p>Email: {tenant.email}</p>}
              {tenant.website && <p>Website: {tenant.website}</p>}
            </div>
            <div className="flex items-center space-x-2">
              <button className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded transition-colors">
                <Eye size={16} />
                <span className="text-xs">View</span>
              </button>
              <button className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-green-100 hover:bg-green-200 text-green-600 rounded transition-colors">
                <Edit size={16} />
                <span className="text-xs">Edit</span>
              </button>
              <button className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-red-100 hover:bg-red-200 text-red-600 rounded transition-colors">
                <Trash2 size={16} />
                <span className="text-xs">Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* 
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <span className="text-sm text-gray-600">
            Showing {startIndex + 1} to{" "}
            {Math.min(startIndex + itemsPerPage, filteredTenants.length)} of{" "}
            {filteredTenants.length} tenants
          </span>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="p-2 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              disabled={currentPage === totalPages}
              className="p-2 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )} */}
    </div>
  );
}
