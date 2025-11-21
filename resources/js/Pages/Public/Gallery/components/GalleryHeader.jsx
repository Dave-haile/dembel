import React from 'react';

const GalleryHeader = ({ isVisible }) => {
  return (
    <section className="relative h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage:
            "url(https://images.pexels.com/photos/1797161/pexels-photo-1797161.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60"></div>
      </div>

      <div
        className={`relative z-10 h-full flex items-center justify-center text-center transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 drop-shadow-2xl">
            Mall Gallery
          </h1>
          <p className="text-xl lg:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed drop-shadow-lg">
            Explore the beauty, lifestyle, and energy of Dembel City Center
          </p>
        </div>
      </div>
    </section>
  );
};

export default GalleryHeader;
