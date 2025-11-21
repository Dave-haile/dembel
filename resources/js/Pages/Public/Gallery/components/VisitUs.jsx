import React from 'react';
import { MapPin, Clock } from 'lucide-react';
import { Link } from '@inertiajs/react';

const VisitUs = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Come Experience It Yourself
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            Visit Dembel City Center today and discover why we're the
            premier destination for shopping, dining, and entertainment
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=Dembel+City+Center,+Addis+Ababa"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-blue-800 hover:bg-blue-50 px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-1 inline-flex items-center justify-center"
            >
              <MapPin size={20} className="mr-2" />
              Get Directions
            </a>
            <Link 
              href={'/contact'} 
              className="bg-blue-700 hover:bg-blue-600 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-1 inline-flex items-center justify-center border-2 border-blue-600"
            >
              <Clock size={20} className="mr-2" />
              View Mall Hours
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisitUs;
