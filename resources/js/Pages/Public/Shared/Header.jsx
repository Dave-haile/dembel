
import { useRef, useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import { MobileDropdown } from "./Components/MobileDropDown";
import MobileNavLink from "./Components/MobileNavLink";
import { Dropdown } from "./Components/Dropdown";
import { useClickOutside } from "./Components/ClickOutside";

export default function Header() {
  const { url, props } = usePage();
  const services = props.services || [];
  const auth = props.auth || {};
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const headerRef = useRef(null);

  useClickOutside(headerRef, () => {
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  });
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <div ref={headerRef} className="sticky top-0 z-50 bg-white shadow-sm">
      <header className="h-[4.5rem]">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
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

            <nav className="hidden lg:flex items-center space-x-6">
              <NavLink href="/" active={url === "/"}>Home</NavLink>
              <NavLink href="/about" active={url === "/about"}>About Us</NavLink>

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

              <NavLink href="/tenant" active={url === "/tenant"}>Tenants</NavLink>
              <NavLink href="/gallery" active={url === "/gallery"}>Gallery</NavLink>

              <Dropdown
                label="Mall"
                href="/mall"
                active={url === "/mall"}
                items={[
                  {
                    label: "Dembel",
                    href: "/mall?mall=dembel",
                    active: url === "/mall?mall=dembel",
                  },
                  {
                    label: "Dembel Extension",
                    href: "/mall?mall=dembel-extension",
                    active: url === "/mall?mall=dembel-extension",
                  },
                ]}
              />

              <Dropdown
                label="Announcement"
                href="/announcement"
                active={url === "/announcement"}
                items={[
                  { label: "Free Space", href: "/space", active: url === "/space" },
                  { label: "News and Events", href: "/news-events", active: url === "/news-events" },
                  { label: "Vacancy", href: "/vacancies", active: url === "/vacancies" },
                ]}
              />

              <NavLink href="/contact" active={url === "/contact"}>Contact Us</NavLink>

              {auth?.user?.role === "admin" &&
                <NavLink href="/admin" active={url === "/admin"}>Admin</NavLink>
              }
            </nav>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-md text-[#303890] hover:text-[#262C72] transition duration-150 focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[4.5rem] bottom-0 z-40 bg-white border-t border-gray-200 overflow-hidden">
          <div className="h-full overflow-y-auto overscroll-contain" style={{ maxHeight: "calc(100vh - 4.5rem)" }}>
            <div className="container mx-auto px-4 py-4 space-y-4">
              <MobileNavLink href="/" active={url === "/"} onClick={closeMobileMenu}>Home</MobileNavLink>
              <MobileNavLink href="/about" active={url === "/about"} onClick={closeMobileMenu}>About Us</MobileNavLink>

              <MobileDropdown
                label="Services"
                active={url === "/services"}
                items={services.map((service) => ({
                  label: service.title_en,
                  href: `/services/${service.id}`,
                  active: url === `/services/${service.id}`,
                }))}
                onClose={closeMobileMenu}
              />

              <MobileNavLink href="/tenant" active={url === "/tenant"} onClick={closeMobileMenu}>Tenants</MobileNavLink>
              <MobileNavLink href="/gallery" active={url === "/gallery"} onClick={closeMobileMenu}>Gallery</MobileNavLink>

              <MobileDropdown
                label="Mall"
                active={url === "/mall"}
                items={[
                  { label: "Dembel", href: "/mall?mall=dembel", active: url === "/mall?mall=dembel" },
                  { label: "Dembel Extension", href: "/mall?mall=dembel-extension", active: url === "/mall?mall=dembel-extension" },
                ]}
                onClose={closeMobileMenu}
              />

              <MobileDropdown
                label="Announcement"
                active={url === "/announcement"}
                items={[
                  { label: "Free Space", href: "/space", active: url === "/space" },
                  { label: "News and Events", href: "/news-events", active: url === "/news-events" },
                  { label: "Vacancy", href: "/vacancies", active: url === "/vacancies" },
                ]}
                onClose={closeMobileMenu}
              />

              <MobileNavLink href="/contact" active={url === "/contact"} onClick={closeMobileMenu}>Contact Us</MobileNavLink>

              {auth?.user?.role === "admin" &&
                <MobileNavLink href="/admin" active={url === "/admin"} onClick={closeMobileMenu}>Admin</MobileNavLink>
              }
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function NavLink({ href, active, children }) {
  return (
    <Link
      href={href}
      className={`font-bold transition duration-150 ${
        active
          ? "text-[#303890] border-b-2 border-accent-700 pb-1"
          : "text-[#3F49B8] hover:text-[#303890]"
      }`}
    >
      {children}
    </Link>
  );
}
