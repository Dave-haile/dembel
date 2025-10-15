import { Link } from "@inertiajs/react";

function MobileNavLink({ href, active, children, onClick }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`block font-medium py-2 px-3 rounded-md transition ${
        active ? "text-[#F05A7E] bg-pink-50" : "text-gray-700 hover:bg-gray-100"
      }`}
    >
      {children}
    </Link>
  );
}
export default MobileNavLink;
