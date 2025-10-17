// // src/components/ContactForm.jsx
// import React, { useState } from "react";
// import { motion } from "framer-motion";

// const ContactForm = () => {
//   const [isSubmitted, setIsSubmitted] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setIsSubmitted(true);
//     setTimeout(() => setIsSubmitted(false), 3000);
//   };

//   return (
//     <div className="max-w-2xl mx-auto bg-gray-50 p-8 rounded-2xl shadow-sm">
//       <h2 className="text-2xl font-bold text-gray-800 mb-6">
//         Send Us a Message
//       </h2>

//       {isSubmitted && (
//         <motion.div
//           initial={{ opacity: 0, y: -10 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="mb-6 p-3 bg-green-100 text-green-800 rounded-lg"
//         >
//           Thank you! Your message has been sent.
//         </motion.div>
//       )}

//       <form onSubmit={handleSubmit} className="space-y-5">
//         <div>
//           <label className="block text-gray-700 mb-1">Full Name</label>
//           <input
//             type="text"
//             required
//             className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
//           />
//         </div>
//         <div>
//           <label className="block text-gray-700 mb-1">Email Address</label>
//           <input
//             type="email"
//             required
//             className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
//           />
//         </div>
//         <div>
//           <label className="block text-gray-700 mb-1">Phone (Optional)</label>
//           <input
//             type="tel"
//             className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
//           />
//         </div>
//         <div>
//           <label className="block text-gray-700 mb-1">Subject</label>
//           <input
//             type="text"
//             required
//             className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
//           />
//         </div>
//         <div>
//           <label className="block text-gray-700 mb-1">Message</label>
//           <textarea
//             rows="5"
//             required
//             className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
//           ></textarea>
//         </div>
//         <motion.button
//           whileHover={{ scale: 1.03 }}
//           whileTap={{ scale: 0.98 }}
//           type="submit"
//           className="w-full bg-pink-500 hover:bg-pink-600 text-white font-medium py-3 rounded-lg transition"
//         >
//           Send Message
//         </motion.button>
//       </form>
//     </div>
//   );
// };

// export default ContactForm;
// ContactForm.jsx
// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { Send, CheckCircle } from "lucide-react";

// const ContactForm = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     subject: "",
//     message: "",
//   });
//   const [isSubmitted, setIsSubmitted] = useState(false);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Mock form submission
//     setIsSubmitted(true);
//     setTimeout(() => setIsSubmitted(false), 5000);
//     setFormData({
//       name: "",
//       email: "",
//       phone: "",
//       subject: "",
//       message: "",
//     });
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, x: -20 }}
//       animate={{ opacity: 1, x: 0 }}
//       transition={{ duration: 0.6 }}
//       className="lg:order-1"
//     >
//       <div className="bg-white rounded-2xl shadow-lg p-8">
//         <h2 className="text-3xl font-bold text-gray-800 mb-2">
//           Send Us a Message
//         </h2>
//         <p className="text-gray-600 mb-8">
//           Have questions? We're here to help. Send us a message and we'll
//           respond as soon as possible.
//         </p>

//         {isSubmitted && (
//           <motion.div
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3"
//           >
//             <CheckCircle className="w-5 h-5 text-green-500" />
//             <span className="text-green-700 font-medium">
//               Thank you! Your message has been sent successfully.
//             </span>
//           </motion.div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label
//                 htmlFor="name"
//                 className="block text-sm font-medium text-gray-700 mb-2"
//               >
//                 Full Name *
//               </label>
//               <input
//                 type="text"
//                 id="name"
//                 name="name"
//                 required
//                 value={formData.name}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
//                 placeholder="Enter your full name"
//               />
//             </div>

//             <div>
//               <label
//                 htmlFor="email"
//                 className="block text-sm font-medium text-gray-700 mb-2"
//               >
//                 Email Address *
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 required
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
//                 placeholder="Enter your email"
//               />
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label
//                 htmlFor="phone"
//                 className="block text-sm font-medium text-gray-700 mb-2"
//               >
//                 Phone Number
//               </label>
//               <input
//                 type="tel"
//                 id="phone"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
//                 placeholder="Optional"
//               />
//             </div>

//             <div>
//               <label
//                 htmlFor="subject"
//                 className="block text-sm font-medium text-gray-700 mb-2"
//               >
//                 Subject *
//               </label>
//               <input
//                 type="text"
//                 id="subject"
//                 name="subject"
//                 required
//                 value={formData.subject}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
//                 placeholder="What is this regarding?"
//               />
//             </div>
//           </div>

//           <div>
//             <label
//               htmlFor="message"
//               className="block text-sm font-medium text-gray-700 mb-2"
//             >
//               Message *
//             </label>
//             <textarea
//               id="message"
//               name="message"
//               required
//               rows="6"
//               value={formData.message}
//               onChange={handleChange}
//               className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 resize-none"
//               placeholder="Tell us how we can help you..."
//             ></textarea>
//           </div>

//           <motion.button
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             type="submit"
//             className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white py-4 px-6 rounded-xl font-semibold flex items-center justify-center gap-3 transition-all duration-300 shadow-lg hover:shadow-xl"
//           >
//             <Send size={20} />
//             Send Message
//           </motion.button>
//         </form>
//       </div>
//     </motion.div>
//   );
// };

// export default ContactForm;
import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    }, 3000);
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-pink-50 to-blue-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h2>
          <p className="text-lg text-gray-600">
            We&apos;ll get back to you within 24 hours
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl hover:shadow transition delay-100 overflow-hidden">
          <div className="grid md:grid-cols-2">
            {/* Contact Form */}
            <div className="p-8 md:p-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Send Us a Message
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="relative">
                    <input
                      type="text"
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      required
                      className="peer w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-pink-600 transition-colors"
                      placeholder=" "
                    />
                    <label
                      htmlFor="fullName"
                      className="absolute left-4 -top-2.5 bg-white px-2 text-sm font-medium text-gray-600 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-pink-600 transition-all"
                    >
                      Full Name
                    </label>
                  </div>

                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                      className="peer w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-pink-600 transition-colors"
                      placeholder=" "
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-4 -top-2.5 bg-white px-2 text-sm font-medium text-gray-600 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-pink-600 transition-all"
                    >
                      Email Address
                    </label>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="relative">
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="peer w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-pink-600 transition-colors"
                      placeholder=" "
                    />
                    <label
                      htmlFor="phone"
                      className="absolute left-4 -top-2.5 bg-white px-2 text-sm font-medium text-gray-600 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-pink-600 transition-all"
                    >
                      Phone (Optional)
                    </label>
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      id="subject"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      required
                      className="peer w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-pink-600 transition-colors"
                      placeholder=" "
                    />
                    <label
                      htmlFor="subject"
                      className="absolute left-4 -top-2.5 bg-white px-2 text-sm font-medium text-gray-600 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-pink-600 transition-all"
                    >
                      Subject
                    </label>
                  </div>
                </div>

                <div className="relative">
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    required
                    rows={6}
                    className="peer w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-pink-600 transition-colors resize-none"
                    placeholder=" "
                  ></textarea>
                  <label
                    htmlFor="message"
                    className="absolute left-4 -top-2.5 bg-white px-2 text-sm font-medium text-gray-600 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-pink-600 transition-all"
                  >
                    Message
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-pink-600 to-blue-600 hover:from-pink-700 hover:to-blue-700 text-white font-semibold py-4 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center justify-center space-x-2"
                >
                  <span>Send Message</span>
                  <Send size={20} />
                </button>
              </form>

              {showSuccess && (
                <div className="mt-6 bg-green-50 border-2 border-green-500 rounded-lg p-4 flex items-center space-x-3 animate-fade-in">
                  <CheckCircle className="text-green-600" size={24} />
                  <div>
                    <p className="font-semibold text-green-900">
                      Message sent successfully!
                    </p>
                    <p className="text-sm text-green-700">
                      We&apos;ll get back to you shortly.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Headquarters Info */}
            <div className="bg-gradient-to-b from-pink-50 to-blue-50 p-8 md:p-12 flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Headquarters
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900">Address</h4>
                  <p className="text-gray-600">
                    123 Business Avenue, Suite 100
                  </p>
                  <p className="text-gray-600">New York, NY 10001</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Phone</h4>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Fax</h4>
                  <p className="text-gray-600">+1 (555) 123-4568</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Email</h4>
                  <p className="text-gray-600">info@company.com</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Hours</h4>
                  <p className="text-gray-600">Monday-Friday: 9AM - 6PM EST</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
