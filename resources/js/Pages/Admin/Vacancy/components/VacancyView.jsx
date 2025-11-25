import React from "react";
import { X } from "lucide-react";

const VacancyView = ({ selectedVacancy, onClose, isClosingSoon }) => {
  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="absolute right-0 top-0 h-full w-full max-w-xl bg-white shadow-2xl overflow-y-auto transition-all delay-75">
        <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white">
          <h2 className="text-xl font-semibold text-gray-800">Vacancy Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex items-start gap-4 pb-4 border-b">
            <img
              src={`/${selectedVacancy.thumbnail}`}
              alt={selectedVacancy.title}
              className="w-24 h-24 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-800">
                {selectedVacancy.title}
              </h3>
              <p className="text-gray-600 mt-1">
                {selectedVacancy.department} • {selectedVacancy.employment_type}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="px-3 py-1 bg-orange-50 text-orange-700 rounded text-sm font-medium">
                  {selectedVacancy.number_of_positions} positions
                </span>
                {isClosingSoon(selectedVacancy.closing_date) && (
                  <span className="px-3 py-1 bg-red-50 text-red-700 rounded text-sm font-medium">
                    Closing Soon
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Salary Range</p>
              <p className="text-gray-800 font-medium">
                {selectedVacancy.salary_min} - {selectedVacancy.salary_max}{" "}
                {selectedVacancy.currency}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Location</p>
              <p className="text-gray-800 font-medium">{selectedVacancy.work_location}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Posted Date</p>
              <p className="text-gray-800 font-medium">
                {new Date(selectedVacancy.posted_date).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Closing Date</p>
              <p className="text-gray-800 font-medium">
                {new Date(selectedVacancy.closing_date).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t">
            <div>
              <p className="text-sm text-gray-500 font-medium mb-2">Job Description</p>
              <p className="text-gray-800">{selectedVacancy.job_description}</p>
            </div>

            {selectedVacancy.requirements && (
              <div>
                <p className="text-sm text-gray-500 font-medium mb-2">Requirements</p>
                <p className="text-gray-800">{selectedVacancy.requirements}</p>
              </div>
            )}

            {selectedVacancy.benefits && (
              <div>
                <p className="text-sm text-gray-500 font-medium mb-2">Benefits</p>
                <p className="text-gray-800">{selectedVacancy.benefits}</p>
              </div>
            )}

            {selectedVacancy.how_to_apply && (
              <div>
                <p className="text-sm text-gray-500 font-medium mb-2">How to Apply</p>
                <p className="text-gray-800">{selectedVacancy.how_to_apply}</p>
              </div>
            )}
          </div>

          <div className="pt-4 border-t">
            <p className="text-sm text-gray-500 font-medium mb-2">Contact Information</p>
            <div className="space-y-1">
              <p className="text-gray-800">
                <strong>Email:</strong> {selectedVacancy.contact_email}
              </p>
              <p className="text-gray-800">
                <strong>Phone:</strong> {selectedVacancy.contact_phone}
              </p>
              {selectedVacancy.address && (
                <p className="text-gray-800">
                  <strong>Address:</strong> {selectedVacancy.address}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VacancyView;
