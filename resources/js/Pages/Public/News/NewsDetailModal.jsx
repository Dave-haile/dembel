import { AnimatePresence, motion } from "framer-motion";
import { Download, Calendar, X } from "lucide-react";
import { formatDate } from "./News";

const NewsDetailModal = ({ news, onClose, relatedNews, category }) => {
  const categoryConfig = category.find((cat) => cat.id === category) || "all";
  const gallery = news.gallery ? JSON.parse(news.gallery) : [];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>

          {/* Hero image */}
          <div className="relative h-64 md:h-80 overflow-hidden">
            <img
              src={news.image}
              alt={news.title_en}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${categoryConfig.color} mb-2`}
              >
                {categoryConfig.name}
              </span>
              <h1 className="text-2xl md:text-3xl font-bold text-white">
                {news.title_en}
              </h1>
              <div className="flex items-center text-white text-sm mt-2">
                <Calendar className="w-4 h-4 mr-2" />
                {formatDate(news.created_at)}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            {news.sub_title_en && (
              <h2 className="text-xl text-gray-600 mb-6 font-medium">
                {news.sub_title_en}
              </h2>
            )}

            <div className="prose prose-lg max-w-none mb-8">
              {news.content_en.split("\n\n").map((paragraph, index) => (
                <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Gallery */}
            {gallery.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Gallery
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {gallery.map((image, index) => (
                    <img
                      key={index}
                      src={image.trim()}
                      alt={`Gallery ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg border"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* PDF Download */}
            {news.pdf_file && (
              <a
                href={news.pdf_file.trim()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-accent-700 text-white rounded-lg hover:bg-accent-700 transition-colors"
              >
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </a>
            )}
          </div>

          {/* Related News */}
          {relatedNews.length > 0 && (
            <div className="border-t border-gray-200 p-6 md:p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Related News
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {relatedNews.slice(0, 2).map((related) => (
                  <div key={related.id} className="flex items-start space-x-3">
                    <img
                      src={related.image}
                      alt={related.title_en}
                      className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                    />
                    <div>
                      <h4 className="font-medium text-gray-900 line-clamp-2">
                        {related.title_en}
                      </h4>
                      <p className="text-sm text-gray-500 mt-1">
                        {formatDate(related.created_at)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default NewsDetailModal;
