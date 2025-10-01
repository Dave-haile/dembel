import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  const navigationLinks = [
    'Home', 'About', 'Services', 'Gallery', 'Tenants', 
    'News', 'Events', 'Vacancy', 'Free Space', 'Contact'
  ];

  const sisterCompanies = [
    'Yencomad Construction',
    'Dembel Real Estate',
    'Abaya-Gelna Agricultural Development',
    'One Engineering'
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Tagline */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <div className="text-3xl font-bold text-white mb-2">
                DCC
              </div>
              <div className="text-sm text-gray-400">MALL</div>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Your premier destination for shopping, dining, and entertainment in the heart of the city.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {navigationLinks.map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase().replace(' ', '-')}`}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Sister Companies */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-6">Sister Companies</h3>
            <ul className="space-y-3">
              {sisterCompanies.map((company) => (
                <li key={company}>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {company}
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
                <Phone size={20} className="text-blue-400 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">+1 (555) 123-4567</p>
                  <p className="text-gray-300">+1 (555) 987-6543</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Mail size={20} className="text-blue-400 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">info@dembelmall.com</p>
                  <p className="text-gray-300">leasing@dembelmall.com</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <MapPin size={20} className="text-blue-400 mt-1 mr-3 flex-shrink-0" />
                <p className="text-gray-300">
                  123 City Center Drive<br />
                  Downtown District<br />
                  City, State 12345
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
              © 2024 Dembel City Center Mall. All Rights Reserved.
            </p>
            <p className="text-gray-400 text-sm">
              Designed & Developed by{' '}
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