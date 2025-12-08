// import React, { useState } from "react";
// import { motion } from "framer-motion";

// const faqs = [
//   {
//     question: "What are the mall’s opening hours?",
//     answer:
//       "We are open daily from 9:00 AM to 9:00 PM, including weekends and public holidays.",
//   },
//   {
//     question: "Where can I park my car?",
//     answer:
//       "Dembel City Center offers ample underground and surface parking with easy access from Africa Avenue.",
//   },
//   {
//     question: "Who do I contact for leasing opportunities?",
//     answer:
//       "Please reach out to our Leasing Department at leasing@dembelmall.et or call +251 11 765 4321.",
//   },
//   {
//     question: "Is the mall wheelchair accessible?",
//     answer:
//       "Yes, the entire mall is fully accessible with elevators, ramps, and accessible restrooms.",
//   },
//   {
//     question: "Do you host events or promotions?",
//     answer:
//       "Absolutely! Follow our social media or subscribe to our newsletter for updates on events and offers.",
//   },
// ];

// const FAQSection = () => {
//   const [openIndex, setOpenIndex] = useState(null);

//   const toggleFAQ = (index) => {
//     setOpenIndex(openIndex === index ? null : index);
//   };

//   return (
//     <div>
//       <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
//         Frequently Asked Questions
//       </h2>
//       <div className="space-y-4 max-w-3xl mx-auto">
//         {faqs.map((faq, idx) => (
//           <div key={idx} className="border-b border-gray-200 pb-4">
//             <button
//               className="flex justify-between items-center w-full text-left font-medium text-gray-800"
//               onClick={() => toggleFAQ(idx)}
//             >
//               {faq.question}
//               <span>{openIndex === idx ? "−" : "+"}</span>
//             </button>
//             {openIndex === idx && (
//               <motion.div
//                 initial={{ opacity: 0, height: 0 }}
//                 animate={{ opacity: 1, height: "auto" }}
//                 exit={{ opacity: 0, height: 0 }}
//                 className="mt-2 text-gray-600"
//               >
//                 {faq.answer}
//               </motion.div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default FAQSection;
// FAQSection.jsx
// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { ChevronDown } from "lucide-react";

// const FAQSection = () => {
//   const [openIndex, setOpenIndex] = useState(null);

//   const faqs = [
//     {
//       question: "What are the mall's opening hours?",
//       answer:
//         "Dembel City Center is open from 9:00 AM to 9:00 PM, Monday through Sunday, including holidays.",
//     },
//     {
//       question: "Where can I park my car?",
//       answer:
//         "We offer ample underground and surface parking with over 2,000 spaces. The first 3 hours are free for shoppers with validated parking tickets.",
//     },
//     {
//       question: "Who do I contact for leasing opportunities?",
//       answer:
//         "For leasing inquiries, please contact our Leasing Director at leasing@dembelmall.et or call +251 11 123 4568.",
//     },
//     {
//       question: "Do you have facilities for people with disabilities?",
//       answer:
//         "Yes, we are fully accessible with ramps, elevators, accessible restrooms, and designated parking spaces close to all entrances.",
//     },
//     {
//       question: "Are there any events happening at the mall?",
//       answer:
//         "We host regular events throughout the year. Check our website or follow us on social media for the latest updates on upcoming events and promotions.",
//     },
//   ];

//   const toggleFAQ = (index) => {
//     setOpenIndex(openIndex === index ? null : index);
//   };

//   return (
//     <section className="mt-16">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="text-center mb-12"
//       >
//         <h2 className="text-4xl font-bold text-gray-800 mb-4">
//           Frequently Asked Questions
//         </h2>
//         <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//           Find quick answers to common questions about Dembel City Center.
//         </p>
//       </motion.div>

//       <div className="max-w-4xl mx-auto">
//         {faqs.map((faq, index) => (
//           <motion.div
//             key={index}
//             initial={{ opacity: 0, y: 10 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.4, delay: index * 0.1 }}
//             className="mb-4 bg-white rounded-2xl shadow-lg overflow-hidden"
//           >
//             <button
//               onClick={() => toggleFAQ(index)}
//               className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
//             >
//               <span className="text-lg font-semibold text-gray-800">
//                 {faq.question}
//               </span>
//               <motion.div
//                 animate={{ rotate: openIndex === index ? 180 : 0 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 <ChevronDown className="w-5 h-5 text-pink-500" />
//               </motion.div>
//             </button>

//             <AnimatePresence>
//               {openIndex === index && (
//                 <motion.div
//                   initial={{ height: 0, opacity: 0 }}
//                   animate={{ height: "auto", opacity: 1 }}
//                   exit={{ height: 0, opacity: 0 }}
//                   transition={{ duration: 0.3 }}
//                   className="overflow-hidden"
//                 >
//                   <div className="px-6 pb-4">
//                     <p className="text-gray-600 leading-relaxed">
//                       {faq.answer}
//                     </p>
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </motion.div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default FAQSection;
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQSection({ data }) {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = data;

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-pink-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600">
            Find quick answers to common questions
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-900 text-lg pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  size={24}
                  className={`text-pink-600 flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
