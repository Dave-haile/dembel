// const News = () => {
//   const [selectedCategory, setSelectedCategory] = useState < string > "All";
//   const [selectedNews, setSelectedNews] =
//     (useState < typeof mockNewsData[0]) | (null > null);
//   const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);

//   const categories = ["All", "Event", "Offer", "Announcement", "Lifestyle"];

//   const filteredNews = useMemo(() => {
//     if (selectedCategory === "All") return mockNewsData;
//     return mockNewsData.filter((news) => news.category === selectedCategory);
//   }, [selectedCategory]);

//   const featuredNews = mockNewsData[0];

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     });
//   };

//   const getCategoryColor = (category) => {
//     const colors = {
//       Event: "bg-accent text-accent-foreground",
//       Offer: "bg-primary text-primary-foreground",
//       Announcement: "bg-secondary text-secondary-foreground",
//       Lifestyle: "bg-muted text-muted-foreground",
//     };
//     return colors[category] || "bg-muted text-muted-foreground";
//   };

//   return (
//     <div className="min-h-screen bg-background">
//       <section className="relative h-[600px] overflow-hidden">
//         <div className="absolute inset-0">
//           <img
//             src={featuredNews.image}
//             alt={featuredNews.title_en}
//             className="w-full h-full object-cover"
//           />
//           <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
//         </div>

//         <div className="relative h-full container mx-auto px-4 flex items-end pb-16">
//           <div className="max-w-3xl space-y-6">
//             <Badge className={getCategoryColor(featuredNews.category)}>
//               {featuredNews.category}
//             </Badge>

//             <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
//               {featuredNews.title_en}
//             </h1>

//             {featuredNews.sub_title_en && (
//               <p className="text-xl text-muted-foreground">
//                 {featuredNews.sub_title_en}
//               </p>
//             )}

//             <p className="text-lg text-foreground/80">
//               {featuredNews.excerpt_en}
//             </p>

//             <button
//               onClick={() => {
//                 setSelectedNews(featuredNews);
//                 setCurrentGalleryIndex(0);
//               }}
//               className="btn-outline group"
//             >
//               Read More
//               <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* Filter Bar */}
//       <section className="border-b border-border bg-card">
//         <div className="container mx-auto px-4 py-6">
//           <div className="flex flex-wrap gap-3">
//             {categories.map((category) => (
//               <button
//                 key={category}
//                 onClick={() => setSelectedCategory(category)}
//                 className={`px-6 py-2 rounded-full font-medium transition-all ${
//                   selectedCategory === category
//                     ? "bg-primary text-primary-foreground shadow-sm"
//                     : "bg-muted text-muted-foreground hover:bg-muted/80"
//                 }`}
//               >
//                 {category}
//               </button>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* News Grid */}
//       <section className="py-16 lg:py-24">
//         <div className="container mx-auto px-4">
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//             <AnimatePresence mode="popLayout">
//               {filteredNews.map((news, index) => (
//                 <motion.article
//                   key={news.id}
//                   layout
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, scale: 0.9 }}
//                   transition={{ duration: 0.3, delay: index * 0.1 }}
//                   className="card-elegant overflow-hidden group cursor-pointer"
//                   onClick={() => {
//                     setSelectedNews(news);
//                     setCurrentGalleryIndex(0);
//                   }}
//                 >
//                   {/* Image */}
//                   <div className="relative overflow-hidden aspect-video">
//                     <img
//                       src={news.image}
//                       alt={news.title_en}
//                       className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//                     />
//                     <div className="absolute top-4 left-4">
//                       <Badge className={getCategoryColor(news.category)}>
//                         {news.category}
//                       </Badge>
//                     </div>
//                   </div>

//                   {/* Content */}
//                   <div className="p-6 space-y-4">
//                     {/* Date */}
//                     <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                       <Calendar className="w-4 h-4" />
//                       {formatDate(news.created_at)}
//                     </div>

//                     {/* Title */}
//                     <h3 className="text-xl font-semibold text-foreground group-hover:text-accent transition-colors duration-300 leading-tight line-clamp-2">
//                       {news.title_en}
//                     </h3>

//                     {/* Excerpt */}
//                     <p className="text-muted-foreground leading-relaxed line-clamp-3">
//                       {news.excerpt_en}
//                     </p>

//                     {/* Read More */}
//                     <div className="pt-2">
//                       <div className="inline-flex items-center gap-2 text-accent font-medium group-hover:gap-4 transition-all duration-300">
//                         Read More
//                         <ArrowRight className="w-4 h-4" />
//                       </div>
//                     </div>
//                   </div>
//                 </motion.article>
//               ))}
//             </AnimatePresence>
//           </div>
//         </div>
//       </section>

//       {/* News Detail Sheet */}
//       <Sheet open={!!selectedNews} onOpenChange={() => setSelectedNews(null)}>
//         <SheetContent
//           side="right"
//           className="w-full sm:max-w-2xl overflow-y-auto p-0"
//         >
//           {selectedNews && (
//             <div className="relative">
//               {/* Close Button */}
//               <button
//                 onClick={() => setSelectedNews(null)}
//                 className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors"
//               >
//                 <X className="w-5 h-5" />
//               </button>

//               {/* Cover Image */}
//               <div className="relative h-80 overflow-hidden">
//                 <img
//                   src={selectedNews.image}
//                   alt={selectedNews.title_en}
//                   className="w-full h-full object-cover"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
//               </div>

//               {/* Content */}
//               <div className="p-8 space-y-6">
//                 {/* Category & Date */}
//                 <div className="flex items-center gap-4">
//                   <Badge className={getCategoryColor(selectedNews.category)}>
//                     {selectedNews.category}
//                   </Badge>
//                   <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                     <Calendar className="w-4 h-4" />
//                     {formatDate(selectedNews.created_at)}
//                   </div>
//                 </div>

//                 {/* Title & Subtitle */}
//                 <div className="space-y-3">
//                   <h2 className="text-3xl font-bold text-foreground">
//                     {selectedNews.title_en}
//                   </h2>
//                   {selectedNews.sub_title_en && (
//                     <p className="text-lg text-muted-foreground">
//                       {selectedNews.sub_title_en}
//                     </p>
//                   )}
//                 </div>

//                 {/* PDF Download */}
//                 {selectedNews.pdf_file && (
//                   <a
//                     href={selectedNews.pdf_file}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors"
//                   >
//                     <Download className="w-4 h-4" />
//                     Download PDF
//                   </a>
//                 )}

//                 {/* Content */}
//                 <div className="prose prose-lg max-w-none text-foreground">
//                   {selectedNews.content_en
//                     .split("\n\n")
//                     .map((paragraph, idx) => (
//                       <p key={idx} className="mb-4 leading-relaxed">
//                         {paragraph}
//                       </p>
//                     ))}
//                 </div>

//                 {/* Gallery */}
//                 {selectedNews.gallery && selectedNews.gallery.length > 0 && (
//                   <div className="space-y-4">
//                     <h3 className="text-xl font-semibold text-foreground">
//                       Gallery
//                     </h3>

//                     {/* Main Gallery Image */}
//                     <div className="relative aspect-video overflow-hidden rounded-lg">
//                       <img
//                         src={selectedNews.gallery[currentGalleryIndex]}
//                         alt={`Gallery ${currentGalleryIndex + 1}`}
//                         className="w-full h-full object-cover"
//                       />
//                     </div>

//                     {/* Thumbnails */}
//                     {selectedNews.gallery.length > 1 && (
//                       <div className="flex gap-2 overflow-x-auto pb-2">
//                         {selectedNews.gallery.map((img, idx) => (
//                           <button
//                             key={idx}
//                             onClick={() => setCurrentGalleryIndex(idx)}
//                             className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden ${
//                               currentGalleryIndex === idx
//                                 ? "ring-2 ring-accent"
//                                 : "opacity-60 hover:opacity-100"
//                             } transition-all`}
//                           >
//                             <img
//                               src={img}
//                               alt={`Thumbnail ${idx + 1}`}
//                               className="w-full h-full object-cover"
//                             />
//                           </button>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}
//         </SheetContent>
//       </Sheet>

//       <Footer />
//     </div>
//   );
// };

// export default News;

import React, { useState, useMemo, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { ChevronRight, Loader2 } from "lucide-react";
import MainLayout from "../Shared/MainLayout";
import NewsCard from "./NewsCard";
import NewsDetailModal from "./NewsDetailModal";
import { Head } from "@inertiajs/react";

// export const categories = [
//   { id: "all", name: "All News", color: "bg-gray-100 text-gray-800" },
//   { id: "Event", name: "Events", color: "bg-purple-100 text-purple-800" },
//   { id: "Offer", name: "Offers", color: "bg-pink-100 text-pink-800" },
//   {
//     id: "Announcement",
//     name: "Announcements",
//     color: "bg-blue-100 text-blue-800",
//   },
//   { id: "Lifestyle", name: "Lifestyle", color: "bg-green-100 text-green-800" },
// ];

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
  const [selectedNews, setSelectedNews] = useState(null);
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
