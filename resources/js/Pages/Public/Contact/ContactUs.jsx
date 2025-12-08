import { useEffect, useState } from "react";
import HeroSection from "./components/HeroSection";
import ContactInfoGrid from "./components/ContactInfoGrid";
import MapEmbed from "./components/MapEmbed";
import ContactForm from "./components/ContactForm";
import ManagementTeam from "./components/ManagementTeam";
import FAQSection from "./components/FAQSection";
import SocialLinks from "./components/SocialLinks";
import MainLayout from "../Shared/MainLayout";
import { Head } from "@inertiajs/react";

export default function ContactPage({ contact }) {
  const [heroSectionData, setHeroSectionData] = useState({});
  const [contactInfoGridData, setContactInfoGridData] = useState([]);
  const [mapEmbedData, setMapEmbedData] = useState({});
  const [faqSectionData, setFaqSectionData] = useState([]);
  const [socialLinksData, setSocialLinksData] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (contact && Array.isArray(contact)) {
      contact.forEach((item) => {
        try {
          const parsedData = JSON.parse(item.data);
          switch (item.component) {
            case "HeroSection":
              setHeroSectionData(parsedData);
              break;
            case "Get in Touch":
              if (Array.isArray(parsedData)) {
                setContactInfoGridData(parsedData);
              } else {
                console.warn("Get in Touch data is not an array:", parsedData);
                setContactInfoGridData([]);
              }
              break;
            case "MapEmbed":
              setMapEmbedData(parsedData);
              break;
            case "Frequently Asked Questions":
              if (Array.isArray(parsedData)) {
                setFaqSectionData(parsedData);
              } else {
                console.warn("FAQ Section data is not an array:", parsedData);
                setFaqSectionData([]);
              }
              break;
            case "Social Links":
              if (Array.isArray(parsedData)) {
                setSocialLinksData(parsedData);
              } else {
                console.warn("Social Links data is not an array:", parsedData);
                setSocialLinksData([]);
              }
              break;
            default:
              break;
          }
        } catch (error) {
          console.error("Error parsing contact data for component:", item.component, error);
        }
      });
    }
  }, [contact]);

  return (
    <MainLayout>
      <Head title="Contact Us" />
      <HeroSection data={heroSectionData} />
      <ContactInfoGrid data={contactInfoGridData} />
      <MapEmbed data={mapEmbedData} />
      <ContactForm />
      <ManagementTeam />
      <FAQSection data={faqSectionData} />
      <SocialLinks data={socialLinksData} />
    </MainLayout>
  );
}
