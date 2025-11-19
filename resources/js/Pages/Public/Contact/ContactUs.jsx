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
