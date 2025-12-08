// // src/components/SocialLinks.jsx
// import React from "react";
// import { Facebook, Instagram, Youtube, Send } from "lucide-react";
// import { motion } from "framer-motion";

// const SocialLinks = () => {
//   const socials = [
//     { icon: <Facebook size={24} />, href: "#" },
//     { icon: <Instagram size={24} />, href: "#" },
//     { icon: <Youtube size={24} />, href: "#" },
//     { icon: <Send size={24} />, href: "#" }, // Telegram icon (Send is close enough)
//   ];

//   return (
//     <div className="text-center">
//       <h3 className="text-xl font-semibold text-gray-800 mb-4">Follow Us</h3>
//       <div className="flex justify-center gap-6 mb-8">
//         {socials.map((s, idx) => (
//           <motion.a
//             key={idx}
//             href={s.href}
//             target="_blank"
//             rel="noopener noreferrer"
//             whileHover={{ scale: 1.2, color: "#F05A7E" }}
//             className="text-gray-600 transition-colors"
//           >
//             {s.icon}
//           </motion.a>
//         ))}
//       </div>

//       <div className="max-w-md mx-auto bg-blue-50 p-6 rounded-2xl">
//         <h4 className="font-medium text-gray-800 mb-3">
//           Stay Updated on Mall Events
//         </h4>
//         <div className="flex gap-2">
//           <input
//             type="email"
//             placeholder="Your email address"
//             className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
//           />
//           <motion.button
//             whileHover={{ backgroundColor: "#e04a6e" }}
//             className="bg-pink-500 hover:bg-pink-600 text-white px-4 rounded-lg font-medium transition"
//           >
//             Subscribe
//           </motion.button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SocialLinks;
// SocialLinks.jsx
// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { Facebook, Instagram, Twitter, Youtube, Mail } from "lucide-react";

// const SocialLinks = () => {
//   const [email, setEmail] = useState("");

//   const socialLinks = [
//     {
//       icon: Facebook,
//       href: "#",
//       color: "hover:text-blue-600",
//       name: "Facebook",
//     },
//     {
//       icon: Instagram,
//       href: "#",
//       color: "hover:text-pink-600",
//       name: "Instagram",
//     },
//     {
//       icon: Twitter,
//       href: "#",
//       color: "hover:text-blue-400",
//       name: "Twitter",
//     },
//     {
//       icon: Youtube,
//       href: "#",
//       color: "hover:text-red-600",
//       name: "YouTube",
//     },
//   ];

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Mock subscription
//     alert("Thank you for subscribing!");
//     setEmail("");
//   };

//   return (
//     <section className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
//       <div className="max-w-4xl mx-auto text-center">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//         >
//           <h2 className="text-3xl font-bold text-gray-800 mb-4">
//             Stay Connected With Us
//           </h2>
//           <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
//             Follow us on social media and subscribe to our newsletter for the
//             latest updates, events, and promotions.
//           </p>

//           {/* Social Media Icons */}
//           <div className="flex justify-center gap-6 mb-8">
//             {socialLinks.map((social, index) => (
//               <motion.a
//                 key={social.name}
//                 href={social.href}
//                 initial={{ opacity: 0, scale: 0.8 }}
//                 whileInView={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 0.4, delay: index * 0.1 }}
//                 whileHover={{ scale: 1.2 }}
//                 className={`w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg text-gray-600 ${social.color} transition-all duration-300`}
//                 aria-label={social.name}
//               >
//                 <social.icon size={24} />
//               </motion.a>
//             ))}
//           </div>

//           {/* Newsletter Subscription */}
//           <div className="bg-white rounded-2xl shadow-lg p-6 max-w-md mx-auto">
//             <div className="flex items-center gap-3 mb-4 justify-center">
//               <Mail className="w-6 h-6 text-pink-500" />
//               <h3 className="text-xl font-semibold text-gray-800">
//                 Stay Updated on Mall Events
//               </h3>
//             </div>

//             <form
//               onSubmit={handleSubmit}
//               className="flex flex-col sm:flex-row gap-3"
//             >
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Enter your email"
//                 className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
//                 required
//               />
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 type="submit"
//                 className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-300 whitespace-nowrap"
//               >
//                 Subscribe
//               </motion.button>
//             </form>
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default SocialLinks;
import { useState } from "react";
import { Facebook, Instagram, Youtube, Send, CheckCircle, Twitter, Linkedin } from "lucide-react";
import { FaTiktok } from "react-icons/fa";

export default function SocialLinks({ data }) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmail("");
    }, 3000);
  };

  const getSocialIcon = (title) => {
    switch (title) {
      case "facebook_url":
        return <Facebook size={28} />;
      case "instagram_url":
        return <Instagram size={28} />;
      case "youtube_url":
        return <Youtube size={28} />;
      case "telegram_url":
        return <Send size={28} />;
      case "twitter_url":
        return <Twitter size={28} />;
      case "linkedin_url":
        return <Linkedin size={28} />;
      case "tiktok_url":
        return <FaTiktok />

      default:
        return null;
    }
  };

  const getSocialColor = (title) => {
    switch (title) {
      case "facebook_url":
        return "hover:text-blue-600";
      case "instagram_url":
        return "hover:text-pink-600";
      case "youtube_url":
        return "hover:text-red-600";
      case "telegram_url":
        return "hover:text-blue-500";
      case "twitter_url":
        return "hover:text-blue-400";
      case "linkedin_url":
        return "hover:text-blue-700";
      case "tiktok_url":
        return "hover:text-black";
      default:
        return "";
    }
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-gray-900 via-blue-900 to-pink-900 text-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Stay Connected</h2>
          <p className="text-lg text-gray-300">
            Follow us on social media for the latest updates
          </p>
        </div>

        <div className="flex justify-center space-x-8 mb-16">
          {data.map((social, index) => (
            <a
              key={index}
              href={social.details[0]}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-white ${getSocialColor(social.title)} transition-all duration-300 hover:scale-125 animate-fade-in`}
              style={{ animationDelay: `${index * 100}ms` }}
              aria-label={social.title}
            >
              {getSocialIcon(social.title)}
            </a>
          ))}
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4 text-center">
              Stay Updated on Mall Events
            </h3>
            <p className="text-center text-gray-300 mb-6">
              Subscribe to our newsletter and never miss an event, promotion, or
              update
            </p>

            <form
              onSubmit={handleSubscribe}
              className="flex flex-col md:flex-row gap-4"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-pink-600 to-blue-600 hover:from-pink-700 hover:to-blue-700 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105 whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>

            {subscribed && (
              <div className="mt-4 bg-green-500/20 border-2 border-green-400 rounded-lg p-4 flex items-center space-x-3 animate-fade-in">
                <CheckCircle className="text-green-400" size={24} />
                <p className="font-semibold">
                  Successfully subscribed! Check your inbox.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
