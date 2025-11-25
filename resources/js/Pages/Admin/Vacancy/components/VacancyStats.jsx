import React from "react";

const VacancyStats = ({ counts, items = [] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <p className="text-sm text-gray-600 mb-1">Total Vacancies</p>
        <p className="text-3xl font-bold text-gray-800">
          {counts?.total ?? items.length}
        </p>
      </div>
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <p className="text-sm text-gray-600 mb-1">Open Positions</p>
        <p className="text-3xl font-bold text-orange-600">
          {counts?.open_positions ?? items.reduce((sum, v) => sum + v.number_of_positions, 0)}
        </p>
      </div>
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <p className="text-sm text-gray-600 mb-1">Full-time</p>
        <p className="text-3xl font-bold text-blue-600">
          {counts?.full_time ?? items.filter((v) => v.employment_type === "Full-time").length}
        </p>
      </div>
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <p className="text-sm text-gray-600 mb-1">Part-time</p>
        <p className="text-3xl font-bold text-green-600">
          {counts?.part_time ?? items.filter((v) => v.employment_type === "Part-time").length}
        </p>
      </div>
    </div>
  );
};

export default VacancyStats;
