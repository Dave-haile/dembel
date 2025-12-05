import { motion } from "framer-motion";
import { Calendar, ChevronRight } from "lucide-react";
import { formatDate } from "./News";
const NewsCard = ({ news, onClick, category }) => {
  const categoryConfig = category.find((cat) => cat.id === category) || "all";

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
      onClick={() => onClick(news)}
    >
      <div className="relative overflow-hidden">
        <img
          src={news.image}
          alt={news.title_en}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-4 left-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${categoryConfig.color}`}
          >
            {categoryConfig.name}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <Calendar className="w-4 h-4 mr-2" />
          {formatDate(news.created_at)}
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-accent-600 transition-colors">
          {news.title_en}
        </h3>

        <p className="text-gray-600 mb-4 line-clamp-3">{news.excerpt_en}</p>

        <div className="flex items-center text-accent-600 font-medium group-hover:text-accent-700">
          Read More
          <ChevronRight className="w-4 h-4 ml-1" />
        </div>
      </div>
    </motion.div>
  );
};
export default NewsCard;
