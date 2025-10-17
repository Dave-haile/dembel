// // src/components/HeroSection.jsx
// import React from "react";
// import { motion } from "framer-motion";
// import { ArrowDown } from "lucide-react";

// const HeroSection = () => {
//   return (
//     <div className="relative h-[500px] w-full overflow-hidden">
//       <div
//         className="absolute inset-0 bg-cover bg-center"
//         style={{
//           backgroundImage:
//             "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
//         }}
//       />
//       <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
//       <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
//         <motion.h1
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="text-4xl md:text-5xl font-bold"
//         >
//           We’re Here to Help
//         </motion.h1>
//         <motion.p
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.2 }}
//           className="mt-4 text-lg md:text-xl max-w-2xl"
//         >
//           Visit, call, or write to us anytime — we’d love to hear from you.
//         </motion.p>
//         <motion.a
//           href="#map"
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.4 }}
//           className="mt-8 inline-flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white font-medium px-6 py-3 rounded-full transition"
//         >
//           View Our Location
//           <ArrowDown size={18} />
//         </motion.a>
//       </div>
//     </div>
//   );
// };

// export default HeroSection;
// HeroSection.jsx
// import React from "react";
// import { motion } from "framer-motion";
// import { ChevronDown } from "lucide-react";

// const HeroSection = () => {
//   const scrollToMap = () => {
//     document.getElementById("map-section").scrollIntoView({
//       behavior: "smooth",
//     });
//   };

//   return (
//     <section className="relative h-96 bg-gradient-to-r from-blue-600 to-purple-700">
//       {/* Background Image with Overlay */}
//       <div
//         className="absolute inset-0 bg-cover bg-center"
//         style={{
//           backgroundImage:
//             'url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")',
//         }}
//       >
//         <div className="absolute inset-0 bg-black bg-opacity-40"></div>
//       </div>

//       {/* Content */}
//       <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-4">
//         <motion.h1
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="text-4xl md:text-6xl font-bold mb-4"
//         >
//           We're Here to Help
//         </motion.h1>

//         <motion.p
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.2 }}
//           className="text-xl md:text-2xl mb-8 max-w-2xl"
//         >
//           Visit, call, or write to us anytime — we'd love to hear from you.
//         </motion.p>

//         <motion.button
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.5, delay: 0.4 }}
//           onClick={scrollToMap}
//           className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-full font-semibold flex items-center gap-2 transition-all duration-300 transform hover:scale-105"
//         >
//           View Our Location
//           <ChevronDown size={20} />
//         </motion.button>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;
import { ChevronDown } from "lucide-react";

export default function HeroSection() {
  const scrollToMap = () => {
    const mapSection = document.getElementById("map-section");
    if (mapSection) {
      mapSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg?auto=compress&cs=tinysrgb&w=1600)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-blue-800/60 to-pink-600/50"></div>
      </div>

      <div className="relative h-full flex flex-col items-center justify-center text-white px-4">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-center animate-fade-in-up">
          We&apos;re Here to Help
        </h1>
        <p className="text-lg md:text-2xl font-light mb-8 text-center max-w-2xl animate-fade-in-up-delay">
          Visit, call, or write to us anytime — we&apos;d love to hear from you.
        </p>
        <button
          onClick={scrollToMap}
          className="bg-white text-blue-900 hover:bg-gray-100 px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg animate-fade-in-up-delay-2"
        >
          View Our Location
        </button>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="text-white" size={32} />
      </div>
    </section>
  );
}
