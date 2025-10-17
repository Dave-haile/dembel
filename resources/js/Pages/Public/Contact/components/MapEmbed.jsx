// // src/components/MapEmbed.jsx
// import React from "react";

// const MapEmbed = () => {
//   const mapSrc =
//     "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.1234567890123!2d38.7654321!3d9.0123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwMDAnNDQuNCJOIDM4wrA0NSc1NS42IkU!5e0!3m2!1sen!2set!4v1234567890123!5m2!1sen!2set";

//   return (
//     <div className="flex flex-col items-center">
//       <h2 className="text-2xl font-bold text-gray-800 mb-6">Our Location</h2>
//       <div className="w-full max-w-4xl h-[400px] rounded-2xl overflow-hidden shadow-lg border border-gray-200">
//         <iframe
//           title="Dembel City Center Map"
//           src={mapSrc}
//           width="100%"
//           height="100%"
//           style={{ border: 0 }}
//           allowFullScreen=""
//           loading="lazy"
//           referrerPolicy="no-referrer-when-downgrade"
//         ></iframe>
//       </div>
//       <a
//         href="https://maps.app.goo.gl/example"
//         target="_blank"
//         rel="noopener noreferrer"
//         className="mt-4 text-pink-500 font-medium hover:underline"
//       >
//         Open in Google Maps
//       </a>
//     </div>
//   );
// };

// export default MapEmbed;
// MapEmbed.jsx
// import React from "react";
// import { motion } from "framer-motion";
// import { ExternalLink } from "lucide-react";

// const MapEmbed = () => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, x: 20 }}
//       animate={{ opacity: 1, x: 0 }}
//       transition={{ duration: 0.6 }}
//       id="map-section"
//       className="lg:order-2"
//     >
//       <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
//         <div className="h-96 md:h-[400px]">
//           <iframe
//             src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.231715668842!2d38.76321537569636!3d9.022299988123637!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85e2c3e37c29%3A0x4e9d5c1e5a1e3f8e!2sDembel%20City%20Center!5e0!3m2!1sen!2set!4v1690000000000!5m2!1sen!2set"
//             width="100%"
//             height="100%"
//             style={{ border: 0 }}
//             allowFullScreen=""
//             loading="lazy"
//             referrerPolicy="no-referrer-when-downgrade"
//             title="Dembel City Center Location"
//           ></iframe>
//         </div>
//         <div className="p-6 bg-gray-50">
//           <a
//             href="https://goo.gl/maps/your-map-link"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="inline-flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-full font-semibold transition-colors duration-300"
//           >
//             Open in Google Maps
//             <ExternalLink size={16} />
//           </a>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default MapEmbed;
import { ExternalLink } from "lucide-react";

export default function MapEmbed() {
  const mapUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.3175539799893!2d38.7577605!3d9.0320009!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwMDEnNTUuMiJOIDM4wrA0NSczNS45IkU!5e0!3m2!1sen!2set!4v1234567890";
  const googleMapsLink =
    "https://www.google.com/maps/search/?api=1&query=9.032001,38.757761";

  return (
    <section id="map-section" className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Find Us</h2>
          <p className="text-lg text-gray-600">
            Visit us at Dembel City Center
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            <iframe
              src={mapUrl}
              className="absolute inset-0 w-full h-full"
              style={{ border: 0, minHeight: "400px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Dembel City Center Location"
            ></iframe>
          </div>

          <div className="p-6 bg-gradient-to-r from-blue-50 to-pink-50 text-center">
            <a
              href={googleMapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
            >
              <span>Open in Google Maps</span>
              <ExternalLink size={20} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
