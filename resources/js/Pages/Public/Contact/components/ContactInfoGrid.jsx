// // src/components/ContactInfoGrid.jsx
// import React from "react";
// import { MapPin, Phone, Mail, Clock } from "lucide-react";
// import { motion } from "framer-motion";

// const cards = [
//   {
//     icon: <MapPin className="text-pink-500" size={28} />,
//     title: "Address",
//     details: ["Africa Avenue, Addis Ababa, Ethiopia"],
//     link: "https://maps.app.goo.gl/example",
//     linkText: "Get Directions",
//   },
//   {
//     icon: <Phone className="text-pink-500" size={28} />,
//     title: "Phone",
//     details: ["+251 11 123 4567", "+251 11 765 4321"],
//   },
//   {
//     icon: <Mail className="text-pink-500" size={28} />,
//     title: "Email",
//     details: ["info@dembelmall.et", "leasing@dembelmall.et"],
//   },
//   {
//     icon: <Clock className="text-pink-500" size={28} />,
//     title: "Hours",
//     details: ["Mon–Sun: 9:00 AM – 9:00 PM"],
//   },
// ];

// const ContactInfoGrid = () => {
//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//       {cards.map((card, idx) => (
//         <motion.div
//           key={idx}
//           whileHover={{ y: -8 }}
//           className="bg-gray-50 p-6 rounded-2xl shadow-sm border border-gray-100 transition-all"
//         >
//           <div className="flex items-start gap-4">
//             {card.icon}
//             <div>
//               <h3 className="font-semibold text-gray-800">{card.title}</h3>
//               <ul className="mt-2 text-gray-600 space-y-1">
//                 {card.details.map((line, i) => (
//                   <li key={i}>{line}</li>
//                 ))}
//               </ul>
//               {card.link && (
//                 <a
//                   href={card.link}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="mt-3 inline-block text-pink-500 hover:underline text-sm font-medium"
//                 >
//                   {card.linkText}
//                 </a>
//               )}
//             </div>
//           </div>
//         </motion.div>
//       ))}
//     </div>
//   );
// };

// export default ContactInfoGrid;
// ContactInfoGrid.jsx
// import React from "react";
// import { motion } from "framer-motion";
// import { MapPin, Phone, Mail, Clock } from "lucide-react";

// const ContactInfoGrid = () => {
//   const contactItems = [
//     {
//       icon: MapPin,
//       title: "Address",
//       details: "Africa Avenue, Addis Ababa, Ethiopia",
//       link: { text: "Get Directions", href: "#" },
//       color: "bg-blue-50 hover:bg-blue-100",
//     },
//     {
//       icon: Phone,
//       title: "Phone",
//       details: "+251 11 123 4567",
//       additional: "+251 11 765 4321",
//       color: "bg-green-50 hover:bg-green-100",
//     },
//     {
//       icon: Mail,
//       title: "Email",
//       details: "info@dembelmall.et",
//       additional: "leasing@dembelmall.et",
//       color: "bg-purple-50 hover:bg-purple-100",
//     },
//     {
//       icon: Clock,
//       title: "Hours",
//       details: "Mon–Sun: 9:00 AM – 9:00 PM",
//       color: "bg-orange-50 hover:bg-orange-100",
//     },
//   ];

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//       {contactItems.map((item, index) => (
//         <motion.div
//           key={item.title}
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: index * 0.1 }}
//           whileHover={{ y: -5 }}
//           className={`${item.color} p-6 rounded-2xl shadow-lg transition-all duration-300 cursor-pointer`}
//         >
//           <div className="flex flex-col items-center text-center">
//             <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md mb-4">
//               <item.icon className="w-6 h-6 text-pink-500" />
//             </div>
//             <h3 className="text-lg font-semibold text-gray-800 mb-2">
//               {item.title}
//             </h3>
//             <p className="text-gray-600 mb-1">{item.details}</p>
//             {item.additional && (
//               <p className="text-gray-600">{item.additional}</p>
//             )}
//             {item.link && (
//               <a
//                 href={item.link.href}
//                 className="text-pink-500 hover:text-pink-600 font-medium mt-2 transition-colors"
//               >
//                 {item.link.text}
//               </a>
//             )}
//           </div>
//         </motion.div>
//       ))}
//     </div>
//   );
// };

// export default ContactInfoGrid;
import { MapPin, Phone, Mail, Clock, Map, Facebook, Twitter, Linkedin, Instagram, Youtube, Send } from "lucide-react";

export default function ContactInfoGrid({ data }) {
  const needed = ["Address", "Phone", "Email", "Hours"];
  const filtered = data.filter(item => needed.includes(item.title));

  const getIcon = (title) => {
    switch (title) {
      case "Address":
        return <MapPin size={32} />;
      case "Phone":
        return <Phone size={32} />;
      case "Email":
        return <Mail size={32} />;
      case "Hours":
        return <Clock size={32} />;
      default:
        return null;
    }
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Get in Touch
          </h2>
          <p className="text-lg text-gray-600">
            We&apos;re available and ready to assist you
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((info, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl p-8 transition-all duration-300 hover:-translate-y-2 group animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-pink-600 group-hover:text-pink-700 mb-4 transition-colors">
                {getIcon(info.title)}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {info.title}
              </h3>
              <div className="space-y-2">
                {info.details.map((detail, idx) => (
                  <p key={idx} className="text-gray-600">
                    {detail}
                  </p>
                ))}
              </div>
              {info.link && (
                <a
                  href={JSON.parse(info.link).href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                >
                  {JSON.parse(info.link).text} →
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
