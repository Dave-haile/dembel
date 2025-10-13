import React, { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";
import MainLayout from "../Shared/MainLayout";
import { Mail, Phone } from "lucide-react";

const About = () => {
  const defaultManagementTeam = [
    {
      name: "Yemiru Nega",
      role: "Managing Director / Founder",
      email: "yencomad.plc1@ethio.net.et",
      phone: "+251 115 51 40 87 / +251 115 53 75 85",
      image: "/img/default.jpg",
    },
    {
      name: "Abebe Mengesha",
      role: "Mall Manager",
      email: "1206abebe@gmail.com",
      phone: "+251 115 53 75 89",
      image: "/img/default.jpg",
    },
    {
      name: "Tarekegn Wakishum",
      role: "Head, HR & General Service Section",
      email: "tarekegnwakishum@gmail.com",
      phone: "+251 115 54 78 24",
      image: "/img/default.jpg",
    },
    {
      name: "Demelash Fegessa",
      role: "Head, Finance",
      email: "denblu2007@gmail.com",
      phone: "+251 115 52 52 67",
      image: "/img/default.jpg",
    },
    {
      name: "Col. Denekew Abebe",
      role: "Head, Security & Safety",
      email: "-----",
      phone: "+251 115 15 00 55",
      image: "/img/default.jpg",
    },
  ];

  const [activeSection, setActiveSection] = useState("who-we-are");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["who-we-are", "mission-vision", "org", "leadership"];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: "smooth",
      });
    }
  };

  const slides = [
    "/about/image011.jpg",
    "/about/image013.jpg",
    "/about/image014.jpg",
    "/about/image039.jpg",
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const values = [
    {
      title: "Mission",
      content:
        "To create eco-friendly and unique shopping and offices experience for customers with unmatched value in terms of quality of services, while continuously exploring new market opportunities and adding value to all its business associates.",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
    },
    {
      title: "Vision",
      content:
        "To be the leading eco-friendly for entirely with fine shopping experience and professional management services excellence in Africa.",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
      ),
    },
    {
      title: "Core Values",
      content:
        "Caring and Committed to the community, Creative in saving the environment, Honest and Integrity in conducting business, Provide a pleasant, safe and comfortable business experience, Responsible through commitment and respect and Listen and act our tenants, customers, employees and business partners",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      ),
    },
    {
      title: "Business Principle",
      content: "Sharing a sense of lively business participation",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
    },
    {
      title: "Commitment",
      content:
        "Dembel City Center always strives to follow ethical business practices in all spheres of activities right from attracting of tenants, customers, employees and business partners around the world and ensuring satisfaction and bringing happiness to all.",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      title: "Strategic Direction",
      content:
        "The strategic direction of Dembel City Center is that we would be building on the basic idea of interdependence between the Mall and the stakeholders. It focuses on the mutual business benefits that can accrue out of formal collaborated business management between the DCC and the stakeholders.",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
          />
        </svg>
      ),
    },
  ];

  return (
    <MainLayout>
      <Head>
        <title>About Us - Dembel City Center</title>
        <meta
          name="description"
          content="Learn about Dembel City Center - Our mission, vision, values, and management team"
        />
      </Head>

      {/* Hero Section */}
      <section className="bg-tertiary py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-end">
            <div className="w-full lg:w-10/12">
              <div className="py-8 text-right">
                <h1 className="text-4xl lg:text-5xl font-light uppercase text-primary">
                  About Us
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <aside className="lg:w-1/4">
            <div className="sticky top-32 bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Quick Navigation
              </h3>
              <ul className="space-y-2">
                {[
                  { id: "who-we-are", label: "Who We Are" },
                  { id: "mission-vision", label: "Mission Vision" },
                  { id: "org", label: "Organizational Structure" },
                  { id: "leadership", label: "Management Teams" },
                ].map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition duration-200 ${
                        activeSection === item.id
                          ? "bg-primary text-white shadow-md"
                          : "text-gray-700 hover:bg-gray-100 hover:text-primary"
                      }`}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Who We Are Section */}
            <section id="who-we-are" className="mb-12 scroll-mt-24">
              {/* Image Slider */}
              <div className="relative h-96 rounded-xl overflow-hidden mb-8">
                {slides.map((slide, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ${
                      index === currentSlide ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <img
                      src={slide}
                      alt={`Slide ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}

                {/* Slider Indicators */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-3 h-3 rounded-full transition duration-300 ${
                        index === currentSlide
                          ? "bg-white"
                          : "bg-white bg-opacity-50"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Who We Are
              </h2>
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p className="text-xl text-gray-600">
                  Dembel City Centre (DCC) is a beautiful flowery-yellow multi
                  story building, located at Africa Avenue on the road to the
                  Air Port of Addis Ababa. It is one of the first Western-style
                  shopping malls in Ethiopia built in 2002. It is covering about
                  40,000m² of floor area with basement ground floor and 12
                  stories, is one of the best buildings in Ethiopia. The
                  twelve-floor structure has more than 123 spaces for shops and
                  offices.
                </p>

                <p>
                  It has a modern well- secured double deck parking with a
                  capacity of 500 vehicles at a time. The City Centre is
                  embracing a mosaic of shops and markets under one roof
                  providing most of the services required by customers at
                  reasonable price. This building is planned to accommodate
                  additional shops, gymnasiums, conference halls and other
                  businesses. Dembel City Centre is known for its well-trained,
                  efficient round the clock security guards and assisted by
                  surveillance camera. The professional attendants are always
                  there for the safety of customers.
                </p>
              </div>
            </section>

            <hr className="border-gray-300 my-12" />

            {/* Mission & Vision Section */}
            <section id="mission-vision" className="mb-12 scroll-mt-24">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {values.map((value) => (
                  <div
                    key={value.title}
                    className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition duration-300 border border-gray-100"
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-white mb-6">
                        {value.icon}
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        {value.title}
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {value.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <hr className="border-gray-300 my-12" />

            {/* Organizational Structure Section */}
            <section id="org" className="mb-12 scroll-mt-24">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Organizational Structure
              </h2>
              <div className="bg-white rounded-xl shadow-lg p-8">
                <img
                  src="/storage/about/org.png"
                  alt="Organizational Structure"
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </section>

            {/* Management Team Section */}
            <section id="management-team" className="scroll-mt-24">
              <h2 className="text-3xl font-semibold text-black mb-8">
                Management Team
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {defaultManagementTeam.map((member, index) => (
                  <div
                    key={index}
                    className=" rounded-lg border bg-card text-card-foreground shadow-sm card-elegant overflow-hidden"
                  >
                    <div className="aspect-square bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                      <div className="w-32 h-32 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-5xl font-bold text-primary">
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                    </div>
                    <div className="p-6 pt-0">
                      <h3 className="text-xl font-semibold mb-1">
                        {member.name}
                      </h3>
                      <p className="text-accent font-medium mb-4">
                        {member.role}
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Mail className="w-4 h-4" />
                          <a
                            href={`mailto:${member.email}`}
                            className="hover:text-accent transition-colors"
                          >
                            {member.email}
                          </a>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Phone className="w-4 h-4" />
                          <a
                            href={`tel:${member.phone}`}
                            className="hover:text-accent transition-colors"
                          >
                            {member.phone}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
            <hr className="border-gray-300 my-12" />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default About;
