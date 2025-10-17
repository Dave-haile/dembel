import React from "react";
import { Calendar, ArrowRight } from "lucide-react";
import { Link } from "@inertiajs/react";

const News = ({ news, language = "en" }) => {
  const defaultNews = [];
  const displayNews =
    news.length > 0 ? news.filter((item) => item.approval) : defaultNews;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Latest News & Events
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest happenings, events, and announcements
            from Dembel City Center Mall
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayNews.slice(0, 6).map((item) => (
            <article
              key={item.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:border-blue-100 transition-all duration-300 group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={
                    item.image.includes("https") ? item.image : `${item.image}`
                  }
                  alt={language === "am" ? item.title_am : item.title_en}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
              </div>

              <div className="p-6">
                <div className="flex items-center text-gray-500 text-sm mb-3">
                  <Calendar size={16} className="mr-2" />
                  {formatDate(item.created_at || new Date().toISOString())}
                </div>

                <div className="flex items-center mb-3">
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    {item.category}
                  </span>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-800 transition-colors duration-200">
                  {language === "am" ? item.title_am : item.title_en}
                </h3>

                {(language === "am"
                  ? item.sub_title_am
                  : item.sub_title_en) && (
                  <p className="text-sm text-blue-800 font-medium mb-2">
                    {language === "am" ? item.sub_title_am : item.sub_title_en}
                  </p>
                )}

                <p className="text-gray-600 leading-relaxed mb-6">
                  {language === "am" ? item.excerpt_am : item.excerpt_en}
                </p>

                <div className="flex items-center justify-between">
                  <Link
                    href={`/news-events`}
                    className="inline-flex items-center text-blue-800 hover:text-blue-900 font-medium group/link transition-colors duration-200"
                  >
                    {language === "am" ? "ተጨማሪ ያንብቡ" : "Read More"}
                    <ArrowRight
                      size={16}
                      className="ml-2 transform group-hover/link:translate-x-1 transition-transform duration-200"
                    />
                  </Link>
                  {item.pdf_file && (
                    <Link
                      href={`storage/${item.pdf_file}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-gray-700 text-sm"
                    >
                      PDF
                    </Link>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href={"/news-events"}
            className="bg-blue-800 hover:bg-blue-900 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
          >
            {language === "am" ? "ሁሉንም ዜናዎች ይመልከቱ" : "View All News"}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default News;
