import { Link } from "@inertiajs/react";
import { useRef, useState } from "react";

export // Reusable Desktop Dropdown (with hover delay)
  function Dropdown({ label, href, active, items, className }) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef(null);

  const show = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const hide = () => {
    timeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, 150); // 150ms delay before closing
  };

  return (
    <div className={`relative ${className}`} onMouseEnter={show} onMouseLeave={hide}>
      <Link
        href={href}
        className={`font-bold flex items-center transition duration-150 hover:text-accent-700 ${active
            ? "text-accent-800 border-b-2 border-accent-700 pb-1"
            : "text-primary-700"
          }`}
      >
        {label}
        <svg
          className="ml-1 w-4 h-4"
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
      </Link>
      <div
        className={`absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 py-1 transition-opacity duration-200 ${open ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        onMouseEnter={show}
        onMouseLeave={hide}
      >
        {items.map((item, idx) => (
          <Link
            key={idx}
            href={item.href}
            className={`block px-4 py-2 text-sm text-primary-700 hover:text-accent-800 transition duration-150 ${item.active ? "text-accent-800" : ""
              }`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
