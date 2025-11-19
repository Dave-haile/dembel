import React from "react";
import { Clock, MapPin, Phone, Navigation } from "lucide-react";

const VisitUs = () => {
  const openingHours = [
    { day: "Monday - Thursday", hours: "10:00 AM - 10:00 PM" },
    { day: "Friday - Saturday", hours: "10:00 AM - 11:00 PM" },
    { day: "Sunday", hours: "11:00 AM - 9:00 PM" },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-primary-600 mb-6">
            Visit Us
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Plan your visit to Dembel City Center Mall with our location details
            and opening hours
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Information */}
          <div className="space-y-8">
            {/* Opening Hours */}
            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="flex items-center mb-6">
                <Clock size={24} className="text-accent-600 mr-3" />
                <h3 className="text-2xl font-semibold text-primary-600">
                  Opening Hours
                </h3>
              </div>
              <div className="space-y-4">
                {openingHours.map((schedule, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0"
                  >
                    <span className="text-gray-700 font-medium">
                      {schedule.day}
                    </span>
                    <span className="text-gray-900 font-semibold">
                      {schedule.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Address */}
            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="flex items-center mb-4">
                <MapPin size={24} className="text-accent-600 mr-3" />
                <h3 className="text-2xl font-semibold text-primary-600">
                  Address
                </h3>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">
                Africa Avenue on the road to the Air Port of Addis Ababa.
                <br />
                Addis Ababa, Ethiopia
              </p>
            </div>

            {/* Contact Phone */}
            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="flex items-center mb-4">
                <Phone size={24} className="text-accent-600 mr-3" />
                <h3 className="text-2xl font-semibold text-primary-600">
                  Contact
                </h3>
              </div>
              <div className="space-y-2">
                <p className="text-gray-700 text-lg">+251 11 123 4567</p>
                <p className="text-gray-700 text-lg">+251 11 987 6543</p>
                <p className="text-gray-700 text-lg">info@dembelmall.com</p>
              </div>
            </div>

            {/* Get Directions Button */}
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=Dembel+City+Center,+Addis+Ababa"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-primary-800 hover:bg-primary-900 text-white px-8 py-4 rounded-lg font-semibold transition-colors duration-200 inline-flex items-center justify-center group"
            >
              <Navigation size={20} className="mr-3 text-accent-400" />
              Get Directions
            </a>
          </div>

          {/* Google Map */}
          <div className="lg:sticky lg:top-8">
            <div className="bg-gray-200 rounded-xl overflow-hidden shadow-lg">
              <div className="aspect-w-16 aspect-h-12 h-96 lg:h-[500px]">
                <div className="bg-card rounded-lg overflow-hidden border-4 border-gray-300 h-[500px]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.8642529724483!2d38.764230775805525!3d9.00508869087026!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85b039c25bc1%3A0x941677a8f60160fe!2sDembel%20City%20Center!5e0!3m2!1sen!2set!4v1696434677829!5m2!1sen!2set"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Dembel City Center Location"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisitUs;
