// import React from 'react';

// const Hero = () => {
//   return (
//     <div className="relative h-96 overflow-hidden">
//       <div
//         className="absolute inset-0 bg-cover bg-center bg-no-repeat"
//         style={{
//           backgroundImage:
//             "url('https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
//         }}
//       />
//       <div className="absolute inset-0 bg-black bg-opacity-40" />
//       <div className="relative z-10 flex items-center justify-center h-full px-4">
//         <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
//           Join Our Team at Dembel City Center
//         </h1>
//       </div>
//     </div>
//   );
// };

// export default Hero;
import React from 'react';

const Hero = () => {
  return (
    <div className="relative h-[500px] overflow-hidden group pt-16">
      {/* Background Image with Zoom Effect */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 group-hover:scale-105"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
        }}
      />
      
      {/* Gradient Overlay for Readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/50 to-slate-50/0" />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-3xl animate-fade-in-up">
            <span className="inline-block py-1 px-3 rounded-full bg-gold-500/20 border border-gold-500/30 text-gold-300 text-sm font-semibold mb-6 backdrop-blur-sm">
                Join the Dembel Family
            </span>
            <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6">
            Build Your Career <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-gold-500">
                Where Excellence Meets Opportunity
            </span>
            </h1>
            <p className="text-xl text-slate-200 max-w-2xl font-light">
            Discover a workplace that values innovation, dedication, and your personal growth within the heart of Addis Ababa.
            </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;