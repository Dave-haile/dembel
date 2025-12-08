import { ChevronDown } from "lucide-react";

export default function HeroSection({ data }) {
  const scrollToMap = () => {
    const mapSection = document.getElementById("map-section");
    if (mapSection) {
      mapSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${data.image || "https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg?auto=compress&cs=tinysrgb&w=1600"})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-blue-800/60 to-pink-600/50"></div>
      </div>

      <div className="relative h-full flex flex-col items-center justify-center text-white px-4">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-center animate-fade-in-up">
          {data.title || "We're Here to Help"}
        </h1>
        <p className="text-lg md:text-2xl font-light mb-8 text-center max-w-2xl animate-fade-in-up-delay">
          {data.description || "Visit, call, or write to us anytime — we'd love to hear from you."}
        </p>
        <button
          onClick={scrollToMap}
          className="bg-white text-blue-900 hover:bg-gray-100 px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg animate-fade-in-up-delay-2"
        >
          {data.buttonText || "View Our Location"}
        </button>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="text-white" size={32} />
      </div>
    </section>
  );
}
