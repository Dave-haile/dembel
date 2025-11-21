import React from 'react';

const Hero = () => {
  return (
    <div className="relative h-96 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-black bg-opacity-40" />
      <div className="relative z-10 flex items-center justify-center h-full px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
          Join Our Team at Dembel City Center
        </h1>
      </div>
    </div>
  );
};

export default Hero;
