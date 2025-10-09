import React, { useRef } from "react";
import {
  ShoppingBag,
  Coffee,
  Car,
  MapPin,
  Film,
  Gift,
  Shield,
  Leaf,
} from "lucide-react";

const MallHighlights = () => {
  const highlights = [
    {
      icon: <ShoppingBag size={48} />,
      number: "200+",
      label: "Shops",
      description: "Premium retail stores",
    },
    {
      icon: <Coffee size={48} />,
      number: "30+",
      label: "Restaurants & Cafes",
      description: "Diverse dining options",
    },
    {
      icon: <Film size={48} />,
      number: "5+",
      label: "Entertainment Zones",
      description: "Cinemas, play areas & arcades",
    },
    {
      icon: <Gift size={48} />,
      number: "Seasonal",
      label: "Events & Sales",
      description: "Exciting offers year-round",
    },
    {
      icon: <Car size={48} />,
      number: "1,000+",
      label: "Parking Spaces",
      description: "Secure parking facility",
    },
    {
      icon: <Shield size={48} />,
      number: "24/7",
      label: "Security",
      description: "Safe and family-friendly",
    },
    {
      icon: <Leaf size={48} />,
      number: "Eco",
      label: "Green Spaces",
      description: "Relaxing, eco-friendly areas",
    },
    {
      icon: <MapPin size={48} />,
      number: "Prime",
      label: "Location in Addis",
      description: "Heart of the city",
    },
  ];

  const handleMouseMove = (e, cardRef) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    cardRef.current?.style.setProperty("--xPos", `${x}px`);
    cardRef.current?.style.setProperty("--yPos", `${y}px`);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-blue-100 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Mall Highlights
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover what makes Dembel City Center Mall the premier destination
            for shopping and entertainment
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {highlights.map((highlight, index) => {
            const cardRef = useRef(null);

            return (
              <div
                key={index}
                ref={cardRef}
                onMouseMove={(e) => handleMouseMove(e, cardRef)}
                className="highlight-card relative bg-white p-8 rounded-2xl shadow-lg text-center overflow-hidden group"
              >
                <div className="relative z-10">
                  <div className="text-blue-600 mb-6 flex justify-center">
                    {highlight.icon}
                  </div>
                  <div className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
                    {highlight.number}
                  </div>
                  <div className="text-xl font-semibold text-gray-800 mb-2">
                    {highlight.label}
                  </div>
                  <div className="text-gray-600">{highlight.description}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MallHighlights;
