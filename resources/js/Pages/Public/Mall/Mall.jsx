/* eslint-disable no-undef */
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import MainLayout from "../Shared/MainLayout";
import { Head, router } from "@inertiajs/react";
import FacilityIcon from "./Components/FacilityIcon";
import Lightbox from "./Components/LightBox";
import { Navbar } from "./Components/Navbar";
import { FloorDirectory } from "./Components/FloorDirectory";
import { DembelExtention } from "./Components/DembelExtention";

const Mall = ({ malls }) => {
  const [selectedMall, setSelectedMall] = useState(malls[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const heroRef = useRef(null);
  const [isHeaderTransparent, setIsHeaderTransparent] = useState(true);
  const dropdownRef = useRef(null); // for click outside detection
  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const heroBottom = heroRef.current.getBoundingClientRect().bottom;
      // Header is transparent only when hero is still visible at top
      setIsHeaderTransparent(heroBottom > 64); // 64px = header height
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <MainLayout>
      <Head title="Malls" />
      <div className="min-h-screen bg-white">
        <Navbar
          dropdownRef={dropdownRef}
          isDropdownOpen={isDropdownOpen}
          isHeaderTransparent={isHeaderTransparent}
          malls={malls}
          selectedMall={selectedMall}
          setIsDropdownOpen={setIsDropdownOpen}
          setSelectedMall={setSelectedMall}
        />
        <section
          ref={heroRef}
          className="relative h-screen overflow-hidden pt-16"
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-fixed"
            style={{
              backgroundImage: `url(https://images.pexels.com/photos/380768/pexels-photo-380768.jpeg?auto=compress&cs=tinysrgb&w=1200)`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70"></div>
          </div>
          <div className="relative h-full flex flex-col items-center justify-center text-white px-4">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up">
              {selectedMall.name}
            </h1>
            <p className="text-xl md:text-2xl font-light mb-8 animate-fade-in-up-delay">
              {selectedMall.name === "Dembel City Center"
                ? "Where Shopping Meets Lifestyle"
                : "Modern Retail. Elevated Experience."}
            </p>
            <button
              onClick={() => {
                router.visit(route("free-space.index"));
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg animate-fade-in-up-delay-2"
            >
              Explore Spaces
            </button>
          </div>
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronRight className="rotate-90 text-white" size={32} />
          </div>
        </section>

        <section className="py-8 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                About {selectedMall.name}
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {selectedMall.description}
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
            >
              {[
                { label: "Year Built", value: selectedMall.year_built },
                { label: "Floors", value: selectedMall.floors },
                {
                  label: "Total Area",
                  value: `${selectedMall.total_area_sqm.toLocaleString()} sqm`,
                },
                { label: "Shops", value: selectedMall.total_shops },
                { label: "Parking Spaces", value: "500+" },
                { label: "Operating Hours", value: "8AM - 10PM" },
                { label: "Anchor Tenants", value: "50+" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-white rounded-xl p-6 text-center shadow-lg border border-gray-100"
                >
                  <div className="text-2xl font-bold text-blue-600 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <FloorDirectory
          fadeInUp={fadeInUp}
          selectedMall={selectedMall}
          staggerContainer={staggerContainer}
        />
        {/* Amenities & Facilities */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Amenities & Facilities
              </h2>
              <p className="text-lg text-gray-600">
                Premium facilities designed for your comfort and convenience
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              {selectedMall.facilities.map((facility, index) => (
                <FacilityIcon key={index} facility={facility} />
              ))}
            </motion.div>
          </div>
        </section>

        {/* Photo Gallery */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Photo Gallery
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Experience {selectedMall.name} through our visual journey
              </p>
              <a
                href={selectedMall.virtual_tour_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <span>360° Virtual Tour</span>
                <span className="ml-2">↗</span>
              </a>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {selectedMall.gallery.map((image, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="relative group cursor-pointer overflow-hidden rounded-xl"
                  onClick={() => setSelectedImage(image)}
                >
                  <img
                    src={image}
                    alt={`${selectedMall.name} - View ${index + 1}`}
                    className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {selectedMall.slug === "dembel-extension" && (
          <DembelExtention
            fadeInUp={fadeInUp}
            malls={malls}
            staggerContainer={staggerContainer}
          />
        )}

        <Lightbox
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      </div>
    </MainLayout>
  );
};

export default Mall;
