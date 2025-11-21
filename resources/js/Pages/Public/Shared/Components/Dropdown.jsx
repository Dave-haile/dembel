import { Link } from "@inertiajs/react";
import { useRef, useState } from "react";

export function Dropdown({ label, href, active, items }) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef(null);

  const show = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const hide = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 150);
  };

  return (
    <div className="relative" onMouseEnter={show} onMouseLeave={hide}>
      <Link
        href={href}
        className={`font-bold flex items-center transition duration-150 ${
          active
            ? "text-[#303890] border-b-2 border-accent-600 pb-1"
            : "text-[#3F49B8] hover:text-[#303890]"
        }`}
      >
        {label}
        <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
        </svg>
      </Link>

      <div
        className={`absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 py-1 transition-opacity duration-200 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {items.map((item, idx) => (
          <Link
            key={idx}
            href={item.href}
            className={`block px-4 py-2 text-sm transition duration-150 ${
              item.active
                ? "text-[#303890] font-semibold"
                : "text-[#3F49B8] hover:text-[#303890]"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
