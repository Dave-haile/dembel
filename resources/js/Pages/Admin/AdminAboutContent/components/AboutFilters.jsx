import React from "react";

const AboutFilters = ({ perPageCount = 10, onPerPageChange }) => {
  return (
    <div className="w-full md:w-48">
      <select
        className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 sm:text-sm rounded-md"
        value={perPageCount}
        onChange={(e) => onPerPageChange && onPerPageChange(e.target.value === "all" ? "all" : parseInt(e.target.value))}
      >
        <option value={5}>5 per page</option>
        <option value={10}>10 per page</option>
        <option value={25}>25 per page</option>
        <option value={50}>50 per page</option>
        <option value="all">Show all</option>
      </select>
    </div>
  );
};

export default AboutFilters;
