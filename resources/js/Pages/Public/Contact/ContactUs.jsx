// import React from "react";
// import HeroSection from "./components/HeroSection";
// import ContactInfoGrid from "./components/ContactInfoGrid";
// import MapEmbed from "./components/MapEmbed";
// import ContactForm from "./components/ContactForm";
// import ManagementTeam from "./components/ManagementTeam";
// import FAQSection from "./components/FAQSection";
// import SocialLinks from "./components/SocialLinks";

// const ContactUs = () => {
//   return (
//     <div className="bg-white">
//       <HeroSection />
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
//         <ContactInfoGrid />
//         <div className="mt-20" id="map">
//           <MapEmbed />
//         </div>
//         <div className="mt-20">
//           <ContactForm />
//         </div>
//         <div className="mt-20">
//           <ManagementTeam />
//         </div>
//         <div className="mt-20">
//           <FAQSection />
//         </div>
//         <div className="mt-20">
//           <SocialLinks />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContactUs;
// ContactUs.jsx
// import React from "react";
// import HeroSection from "./components/HeroSection";
// import ContactInfoGrid from "./components/ContactInfoGrid";
// import MapEmbed from "./components/MapEmbed";
// import ContactForm from "./components/ContactForm";
// import ManagementTeam from "./components/ManagementTeam";
// import FAQSection from "./components/FAQSection";
// import SocialLinks from "./components/SocialLinks";

// const ContactUs = () => {
//   return (
//     <div className="min-h-screen bg-gray-50">
//       <HeroSection />
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
//         <ContactInfoGrid />
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-16">
//           <ContactForm />
//           <MapEmbed />
//         </div>
//         <ManagementTeam />
//         <FAQSection />
//         <SocialLinks />
//       </div>
//     </div>
//   );
// };

// export default ContactUs;
import { useEffect } from "react";
import HeroSection from "./components/HeroSection";
import ContactInfoGrid from "./components/ContactInfoGrid";
import MapEmbed from "./components/MapEmbed";
import ContactForm from "./components/ContactForm";
import ManagementTeam from "./components/ManagementTeam";
import FAQSection from "./components/FAQSection";
import SocialLinks from "./components/SocialLinks";
import MainLayout from "../Shared/MainLayout";
import { Head } from "@inertiajs/react";

export default function ContactPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <MainLayout>
      <Head title="Contact Us" />
      <HeroSection />
      <ContactInfoGrid />
      <MapEmbed />
      <ContactForm />
      <ManagementTeam />
      <FAQSection />
      <SocialLinks />
    </MainLayout>
  );
}
