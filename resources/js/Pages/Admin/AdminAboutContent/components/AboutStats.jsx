import React from "react";

const AboutStats = ({ counts }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <p className="text-sm text-gray-600 mb-1">Total Content</p>
        <p className="text-3xl font-bold text-gray-800">{counts?.total}</p>
      </div>
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <p className="text-sm text-gray-600 mb-1">Component</p>
        <p className="text-3xl font-bold text-orange-600">{counts?.components}</p>
      </div>
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <p className="text-sm text-gray-600 mb-1">Position</p>
        <p className="text-3xl font-bold text-blue-600">{counts?.positions}</p>
      </div>
    </div>
  );
};

export default AboutStats;
