import { Link } from "@inertiajs/react";
import { useState } from "react";

export function MobileDropdown({ label, active, items, onClose }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-100 pb-3">
      <button
        onClick={() => setOpen(!open)}
        className={`flex justify-between items-center w-full font-medium py-2 px-3 text-left rounded-md transition ${
          active ? "text-[#F05A7E]" : "text-gray-700"
        }`}
      >
        {label}
        <svg
          className={`w-5 h-5 transform transition-transform ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {open && (
        <div className="mt-2 ml-4 space-y-2">
          {items.map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              onClick={onClose}
              className={`block py-1.5 px-3 rounded-md text-sm ${
                item.active
                  ? "text-[#F05A7E] font-medium"
                  : "text-gray-600 hover:text-[#F05A7E]"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
