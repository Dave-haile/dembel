import React from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import { Link } from "@inertiajs/react";

const Footer = () => {
  const sisterCompanies = [
    { name: "Yencomad Construction", target: "https://www.yencomad.com" },
    {
      name: "Dembel Real Estate",
      target: "https://www.yencomad.com/dembel-real-estate",
    },
    {
      name: "Abaya-Gelna Agricultural Development",
      target:
        "https://www.yencomad.com/abaya-gelna-agricultural-development-project",
    },
    { name: "One Engineering", target: "#" },
  ];

  const date = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Tagline */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <img
                src="/img/logo-construction-small.png"
                alt="Dembel City Center"
                className="h-12 mb-4"
              />
            </div>
            <p className="text-gray-300 leading-relaxed">
              Your premier destination for shopping, dining, and entertainment
              in the heart of the city.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-6 ml-10">Quick Links</h3>
            <div className="flex gap-16">
              <ul className="space-y-3">
                {/* {navigationLinks.slice(0, 5).map((link) => (
                  <li key={link}>
                    <a
                      href={`/${link.toLowerCase().replace(" ", "-")}`}
                      className="text-gray-300 hover:text-white transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))} */}
                <li>
                  <Link
                    href="/"
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    href="/gallery"
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    Gallery
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tenant"
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    Tenants
                  </Link>
                </li>
              </ul>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/vacancy"
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    Vacancy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/news-events"
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    News & Events
                  </Link>
                </li>
                <li>
                  <Link
                    href="/space"
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    Free Space
                  </Link>
                </li>
                <li>
                  <Link
                    href="/announcement"
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    Announcements
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Sister Companies */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-6">Sister Companies</h3>
            <ul className="space-y-3">
              {sisterCompanies.map((company) => (
                <li key={company.name}>
                  <a
                    href={company.target}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {company.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <Phone
                  size={20}
                  className="text-blue-400 mt-1 mr-3 flex-shrink-0"
                />
                <div>
                  <p className="text-gray-300">+251 11 123 4567</p>
                </div>
              </div>

              <div className="flex items-start">
                <Mail
                  size={20}
                  className="text-blue-400 mt-1 mr-3 flex-shrink-0"
                />
                <div>
                  <p className="text-gray-300">info@dembelmall.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <MapPin
                  size={20}
                  className="text-blue-400 mt-1 mr-3 flex-shrink-0"
                />
                <p className="text-gray-300">
                  Addis Ababa, Ethiopia
                  <br />
                  Africa Avenue on the road to the Air Port of Addis Ababa.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="bg-gray-800 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
            <p className="text-gray-400 text-sm">
              © {date} Dembel City Center Mall. All Rights Reserved.
            </p>
            <p className="text-gray-400 text-sm">
              Designed & Developed by{" "}
              <span className="text-blue-400 font-semibold hover:text-blue-300 transition-colors duration-200">
                Dawit Haile
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
