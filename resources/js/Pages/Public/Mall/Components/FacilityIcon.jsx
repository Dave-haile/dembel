import { motion } from "framer-motion";

const FacilityIcon = ({ facility }) => {
  const icons = {
    Parking: "🚗",
    Elevators: "🛗",
    "24/7 Security": "👮",
    "Wi-Fi": "📶",
    "Power Backup": "⚡",
    Accessibility: "♿",
    "Smart HVAC": "❄️",
    "EV Charging": "🔋",
  };

  return (
    <motion.div
      className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 group"
      whileHover={{ y: -5 }}
    >
      <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
        {icons[facility] || "🏢"}
      </div>
      <h3 className="font-semibold text-gray-800">{facility}</h3>
    </motion.div>
  );
};
export default FacilityIcon;
