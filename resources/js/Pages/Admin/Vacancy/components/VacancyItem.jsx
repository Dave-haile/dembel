import React from "react";
import { Eye, Edit, Trash2, Users, Calendar } from "lucide-react";

const VacancyItem = ({ vacancy, isClosingSoon, onView, onEdit, onDelete }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        <img
          src={`/${vacancy.thumbnail}`}
          alt={vacancy.title}
          className="w-20 h-20 rounded-lg object-cover"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800">
                {vacancy.title}
              </h3>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium">
                  {vacancy.department}
                </span>
                <span className="px-2 py-1 bg-green-50 text-green-700 rounded text-xs font-medium">
                  {vacancy.employment_type}
                </span>
                {isClosingSoon(vacancy.closing_date) && (
                  <span className="px-2 py-1 bg-red-50 text-red-700 rounded text-xs font-medium">
                    Closing Soon
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <button
                onClick={() => onView(vacancy)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="View"
              >
                <Eye className="w-4 h-4" />
              </button>
              <button
                onClick={() => onEdit(vacancy)}
                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                title="Edit"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDelete(vacancy)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            <div className="flex items-center gap-1 text-gray-600">
              <Users className="w-4 h-4" />
              <span>{vacancy.number_of_positions} positions</span>
            </div>
            <div className="flex items-center gap-1 text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>Posted: {new Date(vacancy.posted_date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>Closes: {new Date(vacancy.closing_date).toLocaleDateString()}</span>
            </div>
            <div className="text-gray-800 font-medium">
              {vacancy.salary_min} - {vacancy.salary_max} {vacancy.currency}
            </div>
          </div>

          <p className="mt-2 text-sm text-gray-600 line-clamp-2">
            {vacancy.job_description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VacancyItem;
