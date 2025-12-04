
// import { useRef, useState } from "react";
// import { Link, usePage } from "@inertiajs/react";
// import { MobileDropdown } from "./Components/MobileDropDown";
// import MobileNavLink from "./Components/MobileNavLink";
// import { Dropdown } from "./Components/Dropdown";
// import { useClickOutside } from "./Components/ClickOutside";

// export default function Header() {
//   const { url, props } = usePage();
//   const services = props.services || [];
//   const auth = props.auth || {};
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   const headerRef = useRef(null);

//   useClickOutside(headerRef, () => {
//     if (mobileMenuOpen) {
//       setMobileMenuOpen(false);
//     }
//   });
//   const closeMobileMenu = () => setMobileMenuOpen(false);

//   return (
//     <div ref={headerRef} className="sticky top-0 z-50 bg-white shadow-sm">
//       <header className="h-[4.5rem]">
//         <div className="container mx-auto px-4">
//           <div className="flex justify-between items-center py-4">
//             <div className="flex items-center">
//               <Link href="/" onClick={closeMobileMenu}>
//                 <img
//                   className="hidden md:block h-16 w-auto"
//                   src="/img/logo-construction.png"
//                   alt="Dembel City Center"
//                 />
//                 <img
//                   className="md:hidden h-12 w-auto"
//                   src="/img/logo-construction-small.png"
//                   alt="DCC"
//                 />
//               </Link>
//             </div>

//             <nav className="hidden lg:flex items-center space-x-6">
//               <NavLink href="/" active={url === "/"}>Home</NavLink>
//               <NavLink href="/about" active={url === "/about"}>About Us</NavLink>

//               <Dropdown
//                 label="Services"
//                 href="/services"
//                 active={url === "/services"}
//                 items={services.map((service) => ({
//                   label: service.title_en,
//                   href: `/services/${service.id}`,
//                   active: url === `/services/${service.id}`,
//                 }))}
//               />

//               <NavLink href="/tenant" active={url === "/tenant"}>Tenants</NavLink>
//               <NavLink href="/gallery" active={url === "/gallery"}>Gallery</NavLink>

//               <Dropdown
//                 label="Mall"
//                 href="/mall"
//                 active={url === "/mall"}
//                 items={[
//                   {
//                     label: "Dembel",
//                     href: "/mall?mall=dembel",
//                     active: url === "/mall?mall=dembel",
//                   },
//                   {
//                     label: "Dembel Extension",
//                     href: "/mall?mall=dembel-extension",
//                     active: url === "/mall?mall=dembel-extension",
//                   },
//                 ]}
//               />

//               <Dropdown
//                 label="Announcement"
//                 href="/announcement"
//                 active={url === "/announcement"}
//                 items={[
//                   { label: "Free Space", href: "/space", active: url === "/space" },
//                   { label: "News and Events", href: "/news-events", active: url === "/news-events" },
//                   { label: "Vacancy", href: "/vacancies", active: url === "/vacancies" },
//                 ]}
//               />

//               <NavLink href="/contact" active={url === "/contact"}>Contact Us</NavLink>

//               {auth?.user?.role === "admin" &&
//                 <NavLink href="/admin" active={url === "/admin"}>Admin</NavLink>
//               }
//             </nav>

//             <button
//               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//               className="lg:hidden p-2 rounded-md text-[#303890] hover:text-[#262C72] transition duration-150 focus:outline-none"
//               aria-label="Toggle menu"
//             >
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 {mobileMenuOpen ? (
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
//                 ) : (
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
//                 )}
//               </svg>
//             </button>
//           </div>
//         </div>
//       </header>

//       {mobileMenuOpen && (
//         <div className="lg:hidden fixed inset-x-0 top-[4.5rem] bottom-0 z-40 bg-white border-t border-gray-200 overflow-hidden">
//           <div className="h-full overflow-y-auto overscroll-contain" style={{ maxHeight: "calc(100vh - 4.5rem)" }}>
//             <div className="container mx-auto px-4 py-4 space-y-4">
//               <MobileNavLink href="/" active={url === "/"} onClick={closeMobileMenu}>Home</MobileNavLink>
//               <MobileNavLink href="/about" active={url === "/about"} onClick={closeMobileMenu}>About Us</MobileNavLink>

//               <MobileDropdown
//                 label="Services"
//                 active={url === "/services"}
//                 items={services.map((service) => ({
//                   label: service.title_en,
//                   href: `/services/${service.id}`,
//                   active: url === `/services/${service.id}`,
//                 }))}
//                 onClose={closeMobileMenu}
//               />

//               <MobileNavLink href="/tenant" active={url === "/tenant"} onClick={closeMobileMenu}>Tenants</MobileNavLink>
//               <MobileNavLink href="/gallery" active={url === "/gallery"} onClick={closeMobileMenu}>Gallery</MobileNavLink>

//               <MobileDropdown
//                 label="Mall"
//                 active={url === "/mall"}
//                 items={[
//                   { label: "Dembel", href: "/mall?mall=dembel", active: url === "/mall?mall=dembel" },
//                   { label: "Dembel Extension", href: "/mall?mall=dembel-extension", active: url === "/mall?mall=dembel-extension" },
//                 ]}
//                 onClose={closeMobileMenu}
//               />

//               <MobileDropdown
//                 label="Announcement"
//                 active={url === "/announcement"}
//                 items={[
//                   { label: "Free Space", href: "/space", active: url === "/space" },
//                   { label: "News and Events", href: "/news-events", active: url === "/news-events" },
//                   { label: "Vacancy", href: "/vacancies", active: url === "/vacancies" },
//                 ]}
//                 onClose={closeMobileMenu}
//               />

//               <MobileNavLink href="/contact" active={url === "/contact"} onClick={closeMobileMenu}>Contact Us</MobileNavLink>

//               {auth?.user?.role === "admin" &&
//                 <MobileNavLink href="/admin" active={url === "/admin"} onClick={closeMobileMenu}>Admin</MobileNavLink>
//               }
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// function NavLink({ href, active, children }) {
//   return (
//     <Link
//       href={href}
//       className={`font-bold transition duration-150 ${
//         active
//           ? "text-[#303890] border-b-2 border-accent-700 pb-1"
//           : "text-[#3F49B8] hover:text-[#303890]"
//       }`}
//     >
//       {children}
//     </Link>
//   );
// }

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  MapPin,
  Phone,
  ShieldCheck,
  LayoutGrid,
  Megaphone,
  Building2
} from "lucide-react";
import { Link, usePage } from "@inertiajs/react";


// --- Mock Navigation Data ---

export default function Header({ user }) {
  const { url, props } = usePage();
  const services = props.services || [];
  const auth = props.auth || {};
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const NAV_ITEMS = [
    { label: "Home", href: "/", active: url === "/" },
    { label: "About Us", href: "/about", active: url === "/about" },
    {
      label: "Services",
      href: "/services",
      active: url === "/services",
      icon: <LayoutGrid size={16} />,
      children: services.map((service) => ({ label: service.title_en, href: `/services/${service.id}`, active: url === `/services/${service.id}` })),
    },
    { label: "Tenants", href: "/tenant", active: url === "/tenant" },
    { label: "Gallery", href: "/gallery", active: url === "/gallery" },
    {
      label: "The Mall",
      href: "/mall",
      icon: <Building2 size={16} />,
      active: url === "/mall",
      children: [
        { label: "Dembel Main", href: "/mall?mall=dembel", active: url === "/mall?mall=dembel" },
        { label: "Dembel Extension", href: "/mall?mall=dembel-extension", active: url === "/mall?mall=dembel-extension" },
      ],
    },
    {
      label: "Updates",
      href: "/announcement",
      icon: <Megaphone size={16} />,
      children: [
        { label: "Available Spaces", href: "/space", active: url === "/space" },
        { label: "News & Events", href: "/news-events", active: url === "/news-events" },
        { label: "Vacancies", href: "/vacancies", active: url === "/vacancies" },
      ],
    },
  ];

  // Handle Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "circOut" }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 border-b ${isScrolled
          ? "bg-slate-950/80 backdrop-blur-md border-white/10 py-3 shadow-2xl"
          : "bg-transparent border-transparent py-6"
          }`}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between">

            {/* --- Logo Area --- */}
            <Link href="/" className="relative z-50 flex items-center gap-3 group">
              <div className={`relative transition-all duration-300 ${isScrolled ? 'w-10 h-10' : 'w-12 h-12 md:w-14 md:h-14'}`}>
                {/* Logo Container - Using the one provided in context or fallback */}
                <div className="bg-white rounded-full p-1 w-full h-full flex items-center justify-center overflow-hidden shadow-lg group-hover:shadow-yellow-400/50 transition-shadow">
                  <img
                    src="/img/logo-construction.png"
                    onError={(e) => {
                      // Fallback if image fails
                      e.target.src = "https://ui-avatars.com/api/?name=DC&background=0f172a&color=facc15&font-size=0.5";
                    }}
                    alt="Dembel Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              <div className={`flex flex-col text-white transition-opacity duration-300 ${isScrolled ? 'opacity-0 w-0 hidden md:flex md:opacity-100 md:w-auto' : 'opacity-100'}`}>
                <span className="font-serif font-bold text-lg leading-none tracking-tight">Dembel</span>
                <span className="text-[0.65rem] font-bold text-yellow-400 uppercase tracking-[0.2em]">City Center</span>
              </div>
            </Link>

            {/* --- Desktop Navigation --- */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <div
                  key={item.label}
                  className="relative px-3 py-2"
                  onMouseEnter={() => setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className="relative z-10 flex items-center gap-1 text-sm font-semibold text-slate-300 hover:text-white transition-colors group"
                  >
                    {item.icon && <span className="text-yellow-400 opacity-70 group-hover:opacity-100 transition-opacity">{item.icon}</span>}
                    {item.label}
                    {item.children && <ChevronDown size={12} className={`transition-transform duration-300 ${activeDropdown === item.label ? 'rotate-180' : ''}`} />}
                  </Link>

                  {/* Desktop Dropdown */}
                  <AnimatePresence>
                    {item.children && activeDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-56"
                      >
                        <div className="bg-slate-900 border border-white/10 rounded-xl shadow-2xl overflow-hidden p-2 backdrop-blur-xl">
                          {item.children.map((child) => (
                            <Link
                              key={child.label}
                              href={child.href}
                              className="block px-4 py-2.5 rounded-lg text-sm text-slate-300 hover:bg-white/10 hover:text-yellow-400 transition-all"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* --- Right Actions --- */}
            <div className="hidden lg:flex items-center gap-4">
              {auth.user && (
                <Link href="/admin" className="flex items-center gap-2 text-xs font-bold text-slate-900 bg-yellow-400 hover:bg-yellow-300 px-4 py-2 rounded-full transition-colors">
                  <ShieldCheck size={14} />
                  ADMIN
                </Link>
              )}
              <Link
                href="/contact"
                className="px-6 py-2.5 rounded-full border border-white/20 bg-white/5 hover:bg-white hover:text-slate-950 text-white text-sm font-bold transition-all duration-300 backdrop-blur-sm"
              >
                Contact Us
              </Link>
            </div>

            {/* --- Mobile Menu Button --- */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden relative z-50 p-2 text-white hover:text-yellow-400 transition-colors"
            >
              <Menu size={28} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* --- Mobile Menu Overlay --- */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] lg:hidden"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-slate-900 border-l border-white/10 shadow-2xl p-6 overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-8">
                <span className="text-xl font-serif font-bold text-white">Menu</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 bg-white/5 rounded-full text-white hover:bg-white/20 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-2">
                {NAV_ITEMS.map((item) => (
                  <MobileNavItem key={item.label} item={item} />
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-white/10 space-y-4">
                {user?.role === "admin" && (
                  <Link href="/admin" className="flex items-center justify-center gap-2 w-full py-3 bg-yellow-400 text-slate-900 font-bold rounded-xl">
                    <ShieldCheck size={18} /> Admin Dashboard
                  </Link>
                )}
                <Link href="/contact" className="flex items-center justify-center gap-2 w-full py-3 bg-white/10 text-white font-bold rounded-xl border border-white/10">
                  <Phone size={18} /> Contact Support
                </Link>
              </div>

              <div className="mt-8 text-center text-slate-500 text-xs uppercase tracking-widest">
                <p>Addis Ababa, Ethiopia</p>
                <div className="flex items-center justify-center gap-1 mt-2">
                  <MapPin size={12} /> Africa Avenue
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Helper for Mobile Dropdowns
function MobileNavItem({ item }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!item.children) {
    return (
      <Link
        href={item.href}
        className="block py-3 px-4 text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-all font-medium text-lg"
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div className="overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-3 px-4 text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-all font-medium text-lg text-left group"
      >
        <span className="flex items-center gap-3">
          {item.label}
        </span>
        <ChevronDown
          size={18}
          className={`text-slate-500 transition-transform duration-300 ${isOpen ? 'rotate-180 text-yellow-400' : ''}`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pl-4 pr-2 py-2 space-y-1 border-l border-white/10 ml-4">
              {item.children.map((child) => (
                <Link
                  key={child.label}
                  href={child.href}
                  className="block py-2 px-4 text-slate-400 hover:text-yellow-400 hover:bg-white/5 rounded-lg text-sm transition-colors"
                >
                  {child.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
