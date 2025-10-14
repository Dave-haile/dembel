import React, { useState, useMemo, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { ChevronRight, Loader2 } from "lucide-react";
import MainLayout from "../Shared/MainLayout";
import NewsCard from "./NewsCard";
import NewsDetailModal from "./NewsDetailModal";
import { Head } from "@inertiajs/react";

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export default function News({ news: newss, pagination: initialPagination }) {
  useEffect(() => {
    setNews(newss);
    if (initialPagination) {
      setPagination(initialPagination);
    }
  }, []);

  const [news, setNews] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedNews, setSelectedNews] = useState(null); // This controls the modal

  // Add scroll locking effect
  useEffect(() => {
    if (selectedNews) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [selectedNews]);

  const approvedNews = news.filter((news) => news.approval);
  const featuredNews = approvedNews[0];
  const [loading, setLoading] = useState(false);

  const filteredNews = useMemo(() => {
    if (selectedCategory === "all") {
      return approvedNews;
    }
    return approvedNews.filter((news) => news.category === selectedCategory);
  }, [selectedCategory, approvedNews]);

  const getRelatedNews = (currentNews) => {
    return approvedNews
      .filter(
        (news) =>
          news.id !== currentNews.id && news.category === currentNews.category
      )
      .slice(0, 2);
  };

  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    per_page: 3,
    total: 0,
    has_more: false,
  });

  const handleNewsClick = (news) => {
    setSelectedNews(news);
  };

  const closeModal = () => {
    setSelectedNews(null);
  };

  // Generate unique categories from news data
  let color = "";
  newss.map((n) => {
    if (!n.category) return;
    if (n.category === "Event") {
      color = "bg-purple-100 text-purple-800";
    }
    if (n.category === "Offer") {
      color = "bg-pink-100 text-pink-800";
    }
    if (n.category === "Announcement") {
      color = "bg-blue-100 text-blue-800";
    }
    if (n.category === "Lifestyle") {
      color = "bg-green-100 text-green-800";
    }
  });

  const categories = [
    { id: "all", name: "All", color: "bg-gray-100 text-gray-800" },
    ...Array.from(new Set(newss.map((n) => n.category)))
      .filter((cat) => !!cat)
      .map((cat) => ({
        id: cat,
        name: cat,
        color: color || "bg-gray-100 text-gray-800",
      })),
  ];

  const loadMore = async (amount) => {
    if (loading || !pagination.has_more) return;

    setLoading(true);
    try {
      const response = await fetch(
        `/news/load?page=${pagination.current_page + 1}&per_page=${amount}`
      );
      const data = await response.json();

      if (data.data && data.data.length > 0) {
        setNews((prevNews) => [...prevNews, ...data.data]);
        setPagination({
          current_page: data.current_page,
          last_page: data.last_page,
          per_page: data.per_page,
          total: data.total,
          has_more: data.has_more,
        });
      }
    } catch (error) {
      console.error("Error loading more spaces:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <Head title="News" />
      {featuredNews && (
        <section className="relative h-96 md:h-[500px] overflow-hidden">
          <img
            src={featuredNews.image}
            alt={featuredNews.title_en}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 text-white">
            <div className="max-w-4xl mx-auto">
              <span className="px-4 py-2 bg-orange-600 text-white rounded-full text-sm font-medium mb-4 inline-block">
                Featured News
              </span>
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                {featuredNews.title_en}
              </h1>
              <p className="text-lg md:text-xl mb-6 max-w-2xl opacity-90">
                {featuredNews.excerpt_en}
              </p>
              <button
                onClick={() => handleNewsClick(featuredNews)}
                className="inline-flex items-center px-6 py-3 bg-white text-orange-600 font-medium rounded-lg hover:bg-gray-100 transition-colors"
              >
                Read Full Story
                <ChevronRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
        </section>
      )}

      <div className="container mx-auto px-4 py-12">
        {/* Filter Bar */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? `${category.color} shadow-md scale-105`
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* News Grid */}
        {filteredNews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNews.map((news) => (
              <NewsCard
                key={news.id}
                news={news}
                category={categories}
                onClick={handleNewsClick}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📰</div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">
              No news found
            </h3>
            <p className="text-gray-500">Try selecting a different category.</p>
          </div>
        )}
      </div>
      <div className="mb-8 text-center">
        <p className="text-gray-600">
          Showing {filteredNews.length} of {pagination.total} news article
          {filteredNews.length !== 1 ? "s" : ""}
        </p>
      </div>
      {pagination.has_more && filteredNews.length != 0 && (
        <div className="text-center py-8">
          <button
            onClick={() => loadMore(5)}
            disabled={loading}
            className={`inline-flex items-center text-xl px-2 py-1 font-semibold rounded-lg transition-all duration-200 ${
              loading
                ? "bg-blue-600 cursor-not-allowed"
                : "bg-blue-800 hover:bg-blue-900 hover:scale-105"
            } text-white disabled:cursor-not-allowed`}
          >
            {loading ? (
              <>
                <Loader2 size={16} className="mr-2 animate-spin" />
                Loading...
              </>
            ) : (
              <>
                Load 5 More
                <ChevronRight size={16} className="ml-1" />
              </>
            )}
          </button>
        </div>
      )}

      {/* News Detail Modal */}
      <AnimatePresence>
        {selectedNews && (
          <NewsDetailModal
            news={selectedNews}
            onClose={closeModal}
            relatedNews={getRelatedNews(selectedNews)}
            category={categories}
          />
        )}
      </AnimatePresence>
    </MainLayout>
  );
}
