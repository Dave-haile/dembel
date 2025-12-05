/* eslint-disable no-undef */
import { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import MainLayout from "../Shared/MainLayout";
import HeroSection from "./components/HeroSection";
import FilterTabs from "./components/FilterTabs";
import AnnouncementCard from "./components/AnnouncementCard";
import FooterNote from "./components/FooterNote";
import AnnouncementsGrid from "./components/AnnouncementsGrid";
import { Head, router, usePage } from "@inertiajs/react";

const shuffleArray = (array) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};
export default function AnnouncementsPage() {
  const { announcements } = usePage().props;
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredAnnouncements, setFilteredAnnouncements] = useState([]);
  const [displayCount, setDisplayCount] = useState(6);

  // Find featured (only one)
  const featuredAnnouncement = announcements.find((a) => a.featured);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    filterAnnouncements();
  }, [activeFilter, searchTerm]);

  const filterAnnouncements = () => {
    let filtered = [...announcements];

    if (activeFilter !== "all") {
      filtered = filtered.filter((a) => a.type === activeFilter);
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (a) =>
          a.title.toLowerCase().includes(term) ||
          a.description?.toLowerCase().includes(term)
      );
    }

    // 🔥 Shuffle only if showing "All"
    if (activeFilter === "all") {
      filtered = shuffleArray(filtered);
    }

    setFilteredAnnouncements(filtered);
    setDisplayCount(6);
  };
  const tabs = [
    { key: "all", label: "All", count: announcements.length },
    {
      key: "free_space",
      label: "Free Spaces",
      count: announcements.filter((a) => a.type === "free_space").length,
    },
    {
      key: "news",
      label: "News & Events",
      count: announcements.filter((a) => a.type === "news").length,
    },
    {
      key: "vacancy",
      label: "Vacancies",
      count: announcements.filter((a) => a.type === "vacancy").length,
    },
  ];

  const handleLoadMore = () => {
    setDisplayCount((prev) => prev + 6);
  };

  const handleAnnouncementClick = (announcement) => {
    if (announcement.type === "free_space") {
      router.visit(route("free-space.index"));
    }
    if (announcement.type === "vacancy") {
      router.visit(route("vacancies.index"));
    }
    if (announcement.type === "news") {
      router.visit(route("news.index"));
    }
  };

  return (
    <MainLayout>
      <Head title="Announcments" />
      <HeroSection />
      {featuredAnnouncement && (
        <AnnouncementsGrid
          featuredAnnouncement={featuredAnnouncement}
          handleAnnouncementClick={handleAnnouncementClick}
        />
      )}
      <FilterTabs
        activeFilter={activeFilter}
        searchTerm={searchTerm}
        setActiveFilter={setActiveFilter}
        setSearchTerm={setSearchTerm}
        tabs={tabs}
      />

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {filteredAnnouncements.length === 0 ? (
            <div className="text-center py-20">
              <Bell size={64} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                No announcements found
              </h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your filters or search terms
              </p>
              <button
                onClick={() => {
                  setActiveFilter("all");
                  setSearchTerm("");
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <p className="text-gray-600">
                  Showing {Math.min(displayCount, filteredAnnouncements.length)}{" "}
                  of {filteredAnnouncements.length} announcements
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredAnnouncements
                  .slice(0, displayCount)
                  .map((announcement, index) => (
                    <div
                      key={announcement.id}
                      className="animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <AnnouncementCard
                        announcement={announcement}
                        onClick={() => handleAnnouncementClick(announcement)}
                      />
                    </div>
                  ))}
              </div>

              {displayCount < filteredAnnouncements.length && (
                <div className="text-center mt-12">
                  <button
                    onClick={handleLoadMore}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-12 py-4 rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
                  >
                    Load More
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
      <FooterNote />
    </MainLayout>
  );
}
