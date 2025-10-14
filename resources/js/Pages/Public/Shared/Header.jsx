import { Link, usePage } from "@inertiajs/react";

export default function Header() {
  const { url, props } = usePage();
  const services = props.services || [];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 h-[4.5rem]">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
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

          {/* Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link
              href="/"
              className={` hover:text-[#F05A7E] font-medium transition duration-150 ${
                url === "/"
                  ? "text-[#F05A7E] border-[#F05A7E] border-b-2 pb-1"
                  : "text-gray-700"
              }`}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={` hover:text-[#F05A7E] font-medium transition duration-150 ${
                url === "/about"
                  ? "text-[#F05A7E] border-[#F05A7E] border-b-2 pb-1"
                  : "text-gray-700"
              }`}
            >
              About Us
            </Link>
            {/* Services Dropdown */}
            <div className="relative group">
              <Link
                href="/services"
                className={` hover:text-[#F05A7E] font-medium flex items-center transition duration-150 ${
                  url === "/services"
                    ? "text-[#F05A7E] border-[#F05A7E] border-b-2 pb-1"
                    : "text-gray-700"
                }`}
              >
                Services
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
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="py-1">
                  {services.map((service) => (
                    <Link
                      key={service.id}
                      href={`/services/${service.id}`}
                      className={`block px-4 py-2 text-sm text-gray-700 hover:text-[#F05A7E] transition duration-150 ${
                        url === `/services/${service.id}`
                          ? "text-[#F05A7E] border-[#F05A7E] border-b-2 pb-1"
                          : "text-gray-700"
                      }`}
                    >
                      {service.title_en}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <Link
              href="/tenant"
              className={` hover:text-[#F05A7E] font-medium transition duration-150 ${
                url === "/tenant"
                  ? "text-[#F05A7E] border-[#F05A7E] border-b-2 pb-1"
                  : "text-gray-700"
              }`}
            >
              Tenants
            </Link>
            <Link
              href="/gallery"
              className={` hover:text-[#F05A7E] font-medium transition duration-150 ${
                url === "/gallery"
                  ? "text-[#F05A7E] border-[#F05A7E] border-b-2 pb-1"
                  : "text-gray-700"
              }`}
            >
              Gallery
            </Link>

            {/* Mall Dropdown */}
            <div className="relative group">
              <Link
                href="/mall"
                className={` hover:text-[#F05A7E] font-medium flex items-center transition duration-150 ${
                  url === "/mall"
                    ? "text-[#F05A7E] border-[#F05A7E] border-b-2 pb-1"
                    : "text-gray-700"
                }`}
              >
                Mall
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
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="py-1">
                  <Link
                    href="/building?building=dembel"
                    className={`block px-4 py-2 text-sm text-gray-700 hover:text-[#F05A7E] transition duration-150 ${
                      url === "/building?building=dembel"
                        ? "text-[#F05A7E] border-[#F05A7E] border-b-2 pb-1"
                        : "text-gray-700"
                    }`}
                  >
                    Dembel
                  </Link>
                  <Link
                    href="/building?building=extension"
                    className={`block px-4 py-2 text-sm text-gray-700 hover:text-[#F05A7E] transition duration-150 ${
                      url === "/building?building=extension"
                        ? "text-[#F05A7E] border-[#F05A7E] border-b-2 pb-1"
                        : "text-gray-700"
                    }`}
                  >
                    Dembel Extension
                  </Link>
                </div>
              </div>
            </div>

            {/* Announcement Dropdown */}
            <div className="relative group">
              <Link
                href="/announcement"
                className={` hover:text-[#F05A7E] font-medium flex items-center transition duration-150 ${
                  url === "/announcement"
                    ? "text-[#F05A7E] border-[#F05A7E] border-b-2 pb-1"
                    : "text-gray-700"
                }`}
              >
                Announcement
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
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="py-1">
                  <Link
                    href="/space"
                    className={`block px-4 py-2 text-sm text-gray-700 hover:text-[#F05A7E] transition duration-150 ${
                      url === "/space"
                        ? "text-[#F05A7E] border-[#F05A7E] border-b-2 pb-1"
                        : "text-gray-700"
                    }`}
                  >
                    Free Space
                  </Link>
                  <Link
                    href="/news-events"
                    className={`block px-4 py-2 text-sm text-gray-700 hover:text-[#F05A7E] transition duration-150 ${
                      url === "/news-events"
                        ? "text-[#F05A7E] border-[#F05A7E] border-b-2 pb-1"
                        : "text-gray-700"
                    }`}
                  >
                    News and Events
                  </Link>
                  <Link
                    href="/vacancy"
                    className={`block px-4 py-2 text-sm text-gray-700 hover:text-[#F05A7E] transition duration-150 ${
                      url === "/vacancy"
                        ? "text-[#F05A7E] border-[#F05A7E] border-b-2 pb-1"
                        : "text-gray-700"
                    }`}
                  >
                    Vacancy
                  </Link>
                </div>
              </div>
            </div>

            <Link
              href="/contact"
              className={`text-gray-700 hover:text-[#F05A7E] font-medium transition duration-150 ${
                url === "/contact"
                  ? "text-[#F05A7E] border-[#F05A7E] border-b-2 pb-1"
                  : "text-gray-700"
              }`}
            >
              Contact Us
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => {
              const nav = document.querySelector("nav");
              if (nav) {
                nav.classList.toggle("hidden");
              }
            }}
            className="lg:hidden p-2 rounded-md text-gray-700 hover:text-[#F05A7E] transition duration-150"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16  M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
