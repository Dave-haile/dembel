import { motion } from "framer-motion";

const Lightbox = ({ image, onClose }) => {
  if (!image) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        className="relative max-w-4xl max-h-full"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={image}
          alt="Gallery"
          className="max-w-full max-h-full object-contain rounded-lg"
        />
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white text-2xl hover:text-gray-300 transition-colors"
        >
          ✕
        </button>
      </motion.div>
    </motion.div>
  );
};
export default Lightbox;
