// // src/components/ManagementTeam.jsx
// import React from "react";
// import { motion } from "framer-motion";

// const team = [
//   {
//     name: "Abebe Kebede",
//     role: "Mall Director",
//     img: "https://i.pravatar.cc/150?img=1",
//   },
//   {
//     name: "Selamawit Tadesse",
//     role: "Leasing Manager",
//     img: "https://i.pravatar.cc/150?img=2",
//   },
//   {
//     name: "Daniel Bekele",
//     role: "Operations Head",
//     img: "https://i.pravatar.cc/150?img=3",
//   },
//   {
//     name: "Hiwot Assefa",
//     role: "Customer Experience Lead",
//     img: "https://i.pravatar.cc/150?img=4",
//   },
// ];

// const ManagementTeam = () => {
//   return (
//     <div>
//       <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
//         Meet Our Management Team
//       </h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         {team.map((member, idx) => (
//           <motion.div
//             key={idx}
//             whileHover={{ y: -5, scale: 1.02 }}
//             className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 text-center"
//           >
//             <img
//               src={member.img}
//               alt={member.name}
//               className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
//             />
//             <h3 className="font-semibold text-gray-800">{member.name}</h3>
//             <p className="text-sm text-gray-600">{member.role}</p>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ManagementTeam;
// ManagementTeam.jsx
// import React from "react";
// import { motion } from "framer-motion";
// import { Mail, Phone } from "lucide-react";

// const ManagementTeam = () => {
//   const teamMembers = [
//     {
//       name: "Alemayehu Kebede",
//       position: "Mall Manager",
//       email: "alemayehu@dembelmall.et",
//       phone: "+251 11 123 4567",
//       image:
//         "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
//     },
//     {
//       name: "Sara Mohammed",
//       position: "Leasing Director",
//       email: "sara@dembelmall.et",
//       phone: "+251 11 123 4568",
//       image:
//         "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
//     },
//     {
//       name: "Michael Tesfaye",
//       position: "Operations Manager",
//       email: "michael@dembelmall.et",
//       phone: "+251 11 123 4569",
//       image:
//         "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
//     },
//     {
//       name: "Hana Girma",
//       position: "Marketing Director",
//       email: "hana@dembelmall.et",
//       phone: "+251 11 123 4570",
//       image:
//         "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
//     },
//   ];

//   return (
//     <section className="mt-16">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="text-center mb-12"
//       >
//         <h2 className="text-4xl font-bold text-gray-800 mb-4">
//           Meet Our Management Team
//         </h2>
//         <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//           Our dedicated team is here to ensure your experience at Dembel City
//           Center is exceptional.
//         </p>
//       </motion.div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//         {teamMembers.map((member, index) => (
//           <motion.div
//             key={member.name}
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: index * 0.1 }}
//             whileHover={{ y: -8 }}
//             className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
//           >
//             <div className="h-48 overflow-hidden">
//               <img
//                 src={member.image}
//                 alt={member.name}
//                 className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
//               />
//             </div>
//             <div className="p-6">
//               <h3 className="text-xl font-semibold text-gray-800 mb-1">
//                 {member.name}
//               </h3>
//               <p className="text-pink-500 font-medium mb-4">
//                 {member.position}
//               </p>
//               <div className="space-y-2">
//                 <div className="flex items-center gap-2 text-gray-600">
//                   <Mail size={16} />
//                   <span className="text-sm">{member.email}</span>
//                 </div>
//                 <div className="flex items-center gap-2 text-gray-600">
//                   <Phone size={16} />
//                   <span className="text-sm">{member.phone}</span>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default ManagementTeam;
import { Mail, Phone } from "lucide-react";

export default function ManagementTeam() {
  const team = [
    {
      name: "Abebe Kebede",
      position: "General Manager",
      email: "a.kebede@dembelmall.et",
      phone: "+251 11 123 4567",
      photo:
        "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      name: "Meron Tadesse",
      position: "Leasing Manager",
      email: "m.tadesse@dembelmall.et",
      phone: "+251 11 234 5678",
      photo:
        "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      name: "Samuel Haile",
      position: "Operations Manager",
      email: "s.haile@dembelmall.et",
      phone: "+251 11 345 6789",
      photo:
        "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      name: "Tigist Alemayehu",
      position: "Customer Relations",
      email: "t.alemayehu@dembelmall.et",
      phone: "+251 11 456 7890",
      photo:
        "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Meet Our Management Team
          </h2>
          <p className="text-lg text-gray-600">
            Dedicated professionals ready to assist you
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-pink-600 font-semibold mb-4">
                  {member.position}
                </p>

                <div className="space-y-2">
                  <a
                    href={`mailto:${member.email}`}
                    className="flex items-center space-x-2 text-sm text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <Mail size={16} />
                    <span className="truncate">{member.email}</span>
                  </a>

                  <a
                    href={`tel:${member.phone}`}
                    className="flex items-center space-x-2 text-sm text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <Phone size={16} />
                    <span>{member.phone}</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
