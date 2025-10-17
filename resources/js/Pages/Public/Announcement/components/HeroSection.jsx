// components/HeroSection.jsx
import { Bell } from "lucide-react";
import React from "react";

const HeroSection = () => {
  return (
    // <section className="relative bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20 lg:py-28">
    //   <div
    //     className="absolute inset-0 bg-black/20"
    //     style={{
    //       backgroundImage:
    //         'url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2070&q=80")',
    //       backgroundSize: "cover",
    //       backgroundPosition: "center",
    //       backgroundBlendMode: "overlay",
    //     }}
    //   />
    //   <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    //     <h1 className="text-4xl lg:text-6xl font-bold mb-6 tracking-tight">
    //       Latest Announcements
    //     </h1>
    //     <p className="text-xl lg:text-2xl opacity-90 max-w-3xl mx-auto leading-relaxed">
    //       Stay up to date with new vacancies, free spaces, and mall news.
    //     </p>
    //   </div>
    // </section>
    <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1600)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-purple-800/70 to-pink-600/60"></div>
      </div>

      <div className="relative h-full flex flex-col items-center justify-center text-white px-4">
        <Bell size={64} className="mb-6 animate-fade-in-up" />
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 text-center animate-fade-in-up-delay">
          Latest Announcements
        </h1>
        <p className="text-lg md:text-2xl font-light text-center max-w-3xl animate-fade-in-up-delay-2">
          Stay up to date with new vacancies, free spaces, and mall news.
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
