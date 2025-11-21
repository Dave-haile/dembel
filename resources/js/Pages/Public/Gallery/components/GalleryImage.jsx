import React from 'react';

const GalleryImage = ({ image, onClick, onMouseMove }) => {
  return (
    <div
      className="break-inside-avoid relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
      onClick={onClick}
      onMouseMove={onMouseMove}
      onMouseEnter={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        e.currentTarget.style.setProperty("--x", `${x}px`);
        e.currentTarget.style.setProperty("--y", `${y}px`);
      }}
      style={{
        "--x": "50%",
        "--y": "50%",
      }}
    >
      <img
        src={`${image.image}`}
        alt={image.title}
        className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
        loading="lazy"
      />

      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out"
        style={{
          background: `radial-gradient(circle 300px at var(--x) var(--y), rgba(59, 130, 246, 0.8) 0%, rgba(0, 0, 0, 0.7) 40%, rgba(0, 0, 0, 0.9) 100%)`,
        }}
      ></div>

      <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
        <div className="text-center px-4 max-w-full">
          <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 mb-3">
            <span className="text-white text-xs font-medium uppercase tracking-wider">
              {image.category}
            </span>
          </div>
          <h3 className="text-white text-xl font-bold mb-2 drop-shadow-2xl leading-tight">
            {image.title}
          </h3>
          <p className="text-white/90 text-sm drop-shadow-lg mb-2 leading-relaxed">
            {image.description}
          </p>
          <div className="flex items-center justify-center space-x-4 text-white/70 text-xs">
            <span className="flex items-center">
              <svg
                className="w-3 h-3 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              Floor {image.floor_id}
            </span>
            <span>•</span>
            <span>{image.sector}</span>
          </div>
          <div className="mt-4 w-12 h-0.5 bg-white/50 mx-auto rounded-full"></div>
        </div>
      </div>

      <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 delay-200 transform scale-0 group-hover:scale-100">
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-3 h-3 bg-white rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default GalleryImage;
