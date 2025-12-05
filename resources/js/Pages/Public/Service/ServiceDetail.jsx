// import React from "react";
// import { Head, Link, useForm } from "@inertiajs/react";
// import MainLayout from "../Shared/MainLayout";

// const ServiceDetail = ({ service, allServices }) => {
//   const { data, setData, post, processing, errors, recentlySuccessful } =
//     useForm({
//       name: "",
//       email: "",
//       subject: `Inquiry about ${service.title_en}`,
//       message: "",
//     });

//   const submit = (e) => {
//     e.preventDefault();
//     // eslint-disable-next-line no-undef
//     post(route("services.contact"));
//   };

//   return (
//     <MainLayout>
//       <Head title={`${service.title_en} - Dembel City Center`} />
//       <section className="bg-tertiary py-12 mt-16">
//         <div className="container mx-auto px-4">
//           <div className="flex justify-end">
//             <div className="w-full lg:w-10/12">
//               <div className="py-8 text-right">
//                 <h1 className="text-4xl lg:text-5xl font-light uppercase text-primary">
//                   {service.title_en}
//                 </h1>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Main Content */}
//       <div className="container mx-auto px-4 py-8">
//         <div className="flex flex-col lg:flex-row gap-8">
//           {/* Sidebar */}
//           <aside className="lg:w-1/4">
//             <div className="bg-white rounded-lg shadow-lg p-6 sticky top-32">
//               {/* Services Navigation */}
//               <div className="mb-8">
//                 <h3 className="text-lg font-semibold text-gray-900 mb-4">
//                   Services
//                 </h3>
//                 <ul className="space-y-2">
//                   <li>
//                     <Link
//                       href="/services"
//                       className="block px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-primary rounded-lg transition duration-200"
//                     >
//                       Overview
//                     </Link>
//                   </li>
//                   {allServices.map((serv) => (
//                     <li key={serv.id}>
//                       <Link
//                         href={`/services/${serv.id}`}
//                         className={`block px-4 py-3 rounded-lg transition duration-200 ${
//                           serv.id === service.id
//                             ? "bg-primary text-white font-semibold"
//                             : "text-gray-700 hover:bg-gray-100 hover:text-primary"
//                         }`}
//                       >
//                         {serv.title_en}
//                       </Link>
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//               {/* Contact Form */}
//               <div className="border-t pt-6">
//                 <h4 className="text-lg font-semibold text-gray-900 mb-3">
//                   Contact Us
//                 </h4>
//                 <p className="text-gray-600 mb-6">
//                   Interested in this service? Contact us for more information.
//                 </p>

//                 <form onSubmit={submit} className="space-y-4">
//                   <div>
//                     <label
//                       htmlFor="name"
//                       className="block text-sm font-medium text-gray-700 mb-1"
//                     >
//                       Your name *
//                     </label>
//                     <input
//                       type="text"
//                       id="name"
//                       value={data.name}
//                       onChange={(e) => setData("name", e.target.value)}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
//                       required
//                     />
//                     {errors.name && (
//                       <p className="text-red-500 text-sm mt-1">{errors.name}</p>
//                     )}
//                   </div>

//                   <div>
//                     <label
//                       htmlFor="email"
//                       className="block text-sm font-medium text-gray-700 mb-1"
//                     >
//                       Your email address *
//                     </label>
//                     <input
//                       type="email"
//                       id="email"
//                       value={data.email}
//                       onChange={(e) => setData("email", e.target.value)}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
//                       required
//                     />
//                     {errors.email && (
//                       <p className="text-red-500 text-sm mt-1">
//                         {errors.email}
//                       </p>
//                     )}
//                   </div>

//                   <div>
//                     <label
//                       htmlFor="subject"
//                       className="block text-sm font-medium text-gray-700 mb-1"
//                     >
//                       Subject *
//                     </label>
//                     <input
//                       type="text"
//                       id="subject"
//                       value={data.subject}
//                       onChange={(e) => setData("subject", e.target.value)}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
//                       required
//                     />
//                     {errors.subject && (
//                       <p className="text-red-500 text-sm mt-1">
//                         {errors.subject}
//                       </p>
//                     )}
//                   </div>

//                   <div>
//                     <label
//                       htmlFor="message"
//                       className="block text-sm font-medium text-gray-700 mb-1"
//                     >
//                       Message *
//                     </label>
//                     <textarea
//                       id="message"
//                       rows="3"
//                       value={data.message}
//                       onChange={(e) => setData("message", e.target.value)}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
//                       required
//                     ></textarea>
//                     {errors.message && (
//                       <p className="text-red-500 text-sm mt-1">
//                         {errors.message}
//                       </p>
//                     )}
//                   </div>

//                   <div>
//                     <button
//                       type="submit"
//                       disabled={processing}
//                       className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark transition duration-200 disabled:opacity-50"
//                     >
//                       {processing ? "Sending..." : "Send Message"}
//                     </button>
//                   </div>

//                   {recentlySuccessful && (
//                     <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
//                       Message has been sent successfully.
//                     </div>
//                   )}
//                 </form>
//               </div>
//             </div>
//           </aside>

//           {/* Service Detail Content */}
//           <div className="lg:w-3/4">
//             <div className="bg-white rounded-xl shadow-lg p-8">
//               {/* Service Header */}
//               <div className="flex items-center mb-6">
//                 <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mr-6">
//                   <svg
//                     className="w-8 h-8 text-white"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
//                     />
//                   </svg>
//                 </div>
//                 <div>
//                   <h2 className="text-3xl font-bold text-gray-900">
//                     {service.title_en}
//                   </h2>
//                   <p className="text-gray-600 mt-2">{service.sub_title_en}</p>
//                 </div>
//               </div>

//               {/* Service Image */}
//               {service.image && (
//                 <div className="mb-8">
//                   <img
//                     src={
//                       service.image.startsWith("http")
//                         ? service.image
//                         : `/${service.image.replace(/^\/+/, "")}`
//                     }
//                     alt={service.title_en}
//                     className="w-full h-64 object-cover rounded-lg"
//                   />
//                 </div>
//               )}

//               {/* Service Description */}
//               <div className="prose max-w-none">
//                 <p className="text-gray-700 leading-relaxed mb-6">
//                   {service.description ||
//                     "Detailed information about this service will be available soon."}
//                 </p>

//                 {/* Additional service details can be added here */}
//                 <div className="bg-gray-50 rounded-lg p-6 mt-8">
//                   <h3 className="text-xl font-semibold text-gray-900 mb-4">
//                     Service Highlights
//                   </h3>
//                   <ul className="space-y-2 text-gray-700">
//                     <li className="flex items-center">
//                       <svg
//                         className="w-5 h-5 text-primary mr-3"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M5 13l4 4L19 7"
//                         />
//                       </svg>
//                       Professional and reliable service
//                     </li>
//                     <li className="flex items-center">
//                       <svg
//                         className="w-5 h-5 text-primary mr-3"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M5 13l4 4L19 7"
//                         />
//                       </svg>
//                       Experienced and trained staff
//                     </li>
//                     <li className="flex items-center">
//                       <svg
//                         className="w-5 h-5 text-primary mr-3"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M5 13l4 4L19 7"
//                         />
//                       </svg>
//                       Customer satisfaction guaranteed
//                     </li>
//                   </ul>
//                 </div>
//               </div>

//               {/* Call to Action */}
//               <div className="mt-8 p-6 bg-primary rounded-lg text-center">
//                 <h3 className="text-xl font-semibold text-white mb-2">
//                   Ready to Get Started?
//                 </h3>
//                 <p className="text-white mb-4">
//                   Contact us today to learn more about this service
//                 </p>
//                 <Link
//                   href="/contact"
//                   className="inline-flex items-center bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-200"
//                 >
//                   Contact Us
//                   <svg
//                     className="ml-2 w-4 h-4"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M14 5l7 7m0 0l-7 7m7-7H3"
//                     />
//                   </svg>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </MainLayout>
//   );
// };

// export default ServiceDetail;
import React from 'react';
import MainLayout from '../Shared/MainLayout';
import { ContactForm } from './components/ContactForm';
import { Link, Head } from '@inertiajs/react';

export const ServiceDetail = ({ service, allServices }) => {

  return (
    <MainLayout>
      <Head title={`${service.title_en}`} />
      <div className="relative h-[50vh] min-h-[400px]">
        <img 
          src={`/${service.image}`} 
          alt={service.title_en} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-900/60" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-6">
            <Link href="/services" className="inline-flex items-center text-white/80 hover:text-white mb-6 text-sm font-medium transition-colors">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
              Back to Services
            </Link>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-2">{service.title_en}</h1>
            <h2 className="text-2xl text-accent font-serif mb-6">{service.title_am}</h2>
            <p className="text-xl text-gray-200 max-w-2xl font-light">{service.sub_title_en}</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 min-h-screen py-16">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Main Content (Left on desktop) */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100">
                <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-slate-900 prose-p:text-slate-600 prose-a:text-accent">
                  <h3 className="text-2xl font-bold mb-6">Overview</h3>
                  <p className="leading-loose mb-8">
                    {service.description_en}
                  </p>
                  
                  <div className="bg-slate-50 p-6 rounded-xl border-l-4 border-accent my-8">
                    <p className="text-slate-700 italic m-0">
                      "{service.description_am}"
                    </p>
                  </div>

                  <h3 className="text-2xl font-bold mb-6">Key Benefits</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 not-prose">
                     {[
                        { title: 'Expert Team', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0z' },
                        { title: '24/7 Availability', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
                        { title: 'Premium Quality', icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z' },
                        { title: 'Tailored Solutions', icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' },
                     ].map((benefit, idx) => (
                       <div key={idx} className="flex items-center p-4 bg-white border border-gray-100 rounded-lg shadow-sm">
                         <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center mr-4 text-primary">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={benefit.icon} /></svg>
                         </div>
                         <span className="font-semibold text-slate-800">{benefit.title}</span>
                       </div>
                     ))}
                  </div>

                  <p>
                    Contact us today to learn more about how our {service.title_en} can be customized to fit your specific requirements. 
                    We are dedicated to providing the highest level of service excellence.
                  </p>
                </div>
              </div>
            </div>

            {/* Sidebar (Right on desktop) */}
            <aside className="lg:w-1/3 space-y-8">
              {/* Navigation Card */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Other Services</h3>
                <nav className="space-y-1">
                  {allServices.map(s => (
                    <Link
                      key={s.id}
                      href={`/services/${s.id}`}
                      className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                        s.id === service.id 
                        ? 'bg-slate-900 text-white shadow-lg transform scale-105' 
                        : 'text-slate-600 hover:bg-slate-50 hover:text-accent-700'
                      }`}
                    >
                      {s.title_en}
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Contact Form Card */}
              <div className="sticky top-24">
                 <ContactForm initialSubject={`Inquiry: ${service.title_en}`} />
              </div>
            </aside>

          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ServiceDetail;