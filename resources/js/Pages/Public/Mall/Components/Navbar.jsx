import React from "react";
import { motion } from "framer-motion";

export const Navbar = ({
  isHeaderTransparent,
  dropdownRef,
  setIsDropdownOpen,
  isDropdownOpen,
  selectedMall,
  malls,
  setSelectedMall,
}) => {
  return (
    <nav
      className={`fixed top-16 w-full z-50 transition-all duration-300 ${
        isHeaderTransparent
          ? "bg-transparent shadow-none text-white hover:text-gray-400"
          : "bg-white shadow-sm text-gray-600 hover:text-gray-800"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="text-xl font-bold text-gray-800"></div>
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2 font-medium text-lg transition-colors focus:outline-none"
              aria-haspopup="listbox"
              aria-expanded={isDropdownOpen}
            >
              <span>{selectedMall.name}</span>
              <span
                className={`transform transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              >
                ▼
              </span>
            </button>

            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                role="listbox"
              >
                {malls.map((mall) => (
                  <button
                    key={mall.slug}
                    onClick={() => {
                      setSelectedMall(mall);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full text-left px-5 py-3 hover:bg-blue-50 transition-colors ${
                      selectedMall.slug === mall.slug
                        ? "bg-blue-50 text-blue-700 font-medium"
                        : "text-gray-800"
                    }`}
                    role="option"
                    aria-selected={selectedMall.slug === mall.slug}
                  >
                    <div className="font-medium">{mall.name}</div>
                    <div className="text-sm text-gray-500 mt-0.5">
                      {mall.year_built} • {mall.floors} Floors
                    </div>
                  </button>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
