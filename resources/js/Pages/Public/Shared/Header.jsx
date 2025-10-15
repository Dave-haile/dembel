import { useRef, useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import { MobileDropdown } from "./Components/MobileDropDown";
import MobileNavLink from "./Components/MobileNavLink";
import { Dropdown } from "./Components/Dropdown";
import { useClickOutside } from "./Components/ClickOutside";

export default function Header() {
  const { url, props } = usePage();
  const services = props.services || [];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const headerRef = useRef(null);

  // Close mobile menu when clicking outside
  useClickOutside(headerRef, () => {
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  });
  // Close mobile menu when clicking a link
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <div ref={headerRef}>
      <header className="bg-white shadow-sm sticky top-0 z-50 h-[4.5rem]">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" onClick={closeMobileMenu}>
                <img
                  className="hidden md:block h-16 w-auto"
                  src="/img/logo-construction.png"
                  alt="Dembel City Center"
                />
                <img
                  className="md:hidden h-12 w-auto"
                  src="/img/logo-construction-small.png"
                  alt="DCC"
                />
              </Link>
            </div>

            {/* Desktop Navigation - Hidden on mobile */}
            <nav className="hidden lg:flex items-center space-x-6">
              <NavLink href="/" active={url === "/"}>
                Home
              </NavLink>
              <NavLink href="/about" active={url === "/about"}>
                About Us
              </NavLink>

              {/* Services Dropdown */}
              <Dropdown
                label="Services"
                href="/services"
                active={url === "/services"}
                items={services.map((service) => ({
                  label: service.title_en,
                  href: `/services/${service.id}`,
                  active: url === `/services/${service.id}`,
                }))}
              />

              <NavLink href="/tenant" active={url === "/tenant"}>
                Tenants
              </NavLink>
              <NavLink href="/gallery" active={url === "/gallery"}>
                Gallery
              </NavLink>

              {/* Mall Dropdown */}
              <Dropdown
                label="Mall"
                href="/mall"
                active={url === "/mall"}
                items={[
                  {
                    label: "Dembel",
                    href: "/building?building=dembel",
                    active: url === "/building?building=dembel",
                  },
                  {
                    label: "Dembel Extension",
                    href: "/building?building=extension",
                    active: url === "/building?building=extension",
                  },
                ]}
              />

              {/* Announcement Dropdown */}
              <Dropdown
                label="Announcement"
                href="/announcement"
                active={url === "/announcement"}
                items={[
                  {
                    label: "Free Space",
                    href: "/space",
                    active: url === "/space",
                  },
                  {
                    label: "News and Events",
                    href: "/news-events",
                    active: url === "/news-events",
                  },
                  {
                    label: "Vacancy",
                    href: "/vacancies",
                    active: url === "/vacancies",
                  },
                ]}
              />

              <NavLink href="/contact" active={url === "/contact"}>
                Contact Us
              </NavLink>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-md text-gray-700 hover:text-[#F05A7E] transition duration-150 focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
          {mobileMenuOpen && (
            <div className="lg:hidden fixed inset-x-0 top-[4.5rem] bottom-0 z-40 bg-white border-t border-gray-200 overflow-hidden">
              <div
                className="h-full overflow-y-auto overscroll-contain"
                style={{ maxHeight: "calc(100vh - 4.5rem)" }}
              >
                <div className="container mx-auto px-4 py-4 space-y-4">
                  <MobileNavLink
                    href="/"
                    active={url === "/"}
                    onClick={closeMobileMenu}
                  >
                    Home
                  </MobileNavLink>
                  <MobileNavLink
                    href="/about"
                    active={url === "/about"}
                    onClick={closeMobileMenu}
                  >
                    About Us
                  </MobileNavLink>

                  <MobileDropdown
                    label="Services"
                    href="/services"
                    active={url === "/services"}
                    items={services.map((service) => ({
                      label: service.title_en,
                      href: `/services/${service.id}`,
                      active: url === `/services/${service.id}`,
                    }))}
                    onClose={closeMobileMenu}
                  />

                  <MobileNavLink
                    href="/tenant"
                    active={url === "/tenant"}
                    onClick={closeMobileMenu}
                  >
                    Tenants
                  </MobileNavLink>
                  <MobileNavLink
                    href="/gallery"
                    active={url === "/gallery"}
                    onClick={closeMobileMenu}
                  >
                    Gallery
                  </MobileNavLink>

                  <MobileDropdown
                    label="Mall"
                    href="/mall"
                    active={url === "/mall"}
                    items={[
                      {
                        label: "Dembel",
                        href: "/building?building=dembel",
                        active: url === "/building?building=dembel",
                      },
                      {
                        label: "Dembel Extension",
                        href: "/building?building=extension",
                        active: url === "/building?building=extension",
                      },
                    ]}
                    onClose={closeMobileMenu}
                  />

                  <MobileDropdown
                    label="Announcement"
                    href="/announcement"
                    active={url === "/announcement"}
                    items={[
                      {
                        label: "Free Space",
                        href: "/space",
                        active: url === "/space",
                      },
                      {
                        label: "News and Events",
                        href: "/news-events",
                        active: url === "/news-events",
                      },
                      {
                        label: "Vacancy",
                        href: "/vacancies",
                        active: url === "/vacancies",
                      },
                    ]}
                    onClose={closeMobileMenu}
                  />

                  <MobileNavLink
                    href="/contact"
                    active={url === "/contact"}
                    onClick={closeMobileMenu}
                  >
                    Contact Us
                  </MobileNavLink>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

// Reusable Desktop Nav Link
function NavLink({ href, active, children }) {
  return (
    <Link
      href={href}
      className={`font-medium transition duration-150 hover:text-[#F05A7E] ${
        active
          ? "text-[#F05A7E] border-b-2 border-[#F05A7E] pb-1"
          : "text-gray-700"
      }`}
    >
      {children}
    </Link>
  );
}

// Reusable Desktop Dropdown
// function Dropdown({ label, href, active, items }) {
//   const [open, setOpen] = useState(false);

//   return (
//     <div className="relative">
//       <Link
//         href={href}
//         className={`font-medium flex items-center transition duration-150 hover:text-[#F05A7E] ${
//           active
//             ? "text-[#F05A7E] border-b-2 border-[#F05A7E] pb-1"
//             : "text-gray-700"
//         }`}
//         onMouseEnter={() => setOpen(true)}
//         onMouseLeave={() => setOpen(false)}
//       >
//         {label}
//         <svg
//           className="ml-1 w-4 h-4"
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M19 9l-7 7-7-7"
//           />
//         </svg>
//       </Link>
//       {open && (
//         <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 py-1 animate-fadeIn">
//           {items.map((item, idx) => (
//             <Link
//               key={idx}
//               href={item.href}
//               className={`block px-4 py-2 text-sm text-gray-700 hover:text-[#F05A7E] transition duration-150 ${
//                 item.active ? "text-[#F05A7E]" : ""
//               }`}
//             >
//               {item.label}
//             </Link>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// Mobile Nav Link
// function MobileNavLink({ href, active, children, onClick }) {
//   return (
//     <Link
//       href={href}
//       onClick={onClick}
//       className={`block font-medium py-2 px-3 rounded-md transition ${
//         active ? "text-[#F05A7E] bg-pink-50" : "text-gray-700 hover:bg-gray-100"
//       }`}
//     >
//       {children}
//     </Link>
//   );
// }

// Mobile Dropdown (Accordion-style)
// function MobileDropdown({ label, href, active, items, onClose }) {
//   const [open, setOpen] = useState(false);

//   return (
//     <div className="border-b border-gray-100 pb-3">
//       <button
//         onClick={() => setOpen(!open)}
//         className={`flex justify-between items-center w-full font-medium py-2 px-3 text-left rounded-md transition ${
//           active ? "text-[#F05A7E]" : "text-gray-700"
//         }`}
//       >
//         {label}
//         <svg
//           className={`w-5 h-5 transform transition-transform ${
//             open ? "rotate-180" : ""
//           }`}
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M19 9l-7 7-7-7"
//           />
//         </svg>
//       </button>
//       {open && (
//         <div className="mt-2 ml-4 space-y-2">
//           {items.map((item, idx) => (
//             <Link
//               key={idx}
//               href={item.href}
//               onClick={onClose}
//               className={`block py-1.5 px-3 rounded-md text-sm ${
//                 item.active
//                   ? "text-[#F05A7E] font-medium"
//                   : "text-gray-600 hover:text-[#F05A7E]"
//               }`}
//             >
//               {item.label}
//             </Link>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
