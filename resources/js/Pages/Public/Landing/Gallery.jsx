import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Icons
const ZoomIn = ({ className }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    <line x1="11" y1="8" x2="11" y2="14"></line>
    <line x1="8" y1="11" x2="14" y2="11"></line>
  </svg>
);

const Gallery = ({ galleries }) => {
  const [filter, setFilter] = useState('All');
  const [hoveredId, setHoveredId] = useState(null);

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = galleries.map(i => i.category);
    return ['All', ...Array.from(new Set(cats))];
  }, [galleries]);

  const filteredItems = useMemo(() => {
    if (filter === 'All') return galleries;
    return galleries.filter(item => item.category === filter);
  }, [galleries, filter]);

  // Determine grid span based on index/id for that "Bento" look
  const getSpanClass = (index) => {
    // Pattern: Big, Small, Tall, Small, Wide, Small
    const pattern = index % 6;
    switch (pattern) {
      case 0: return 'md:col-span-2 md:row-span-2'; // Big Square
      case 2: return 'md:row-span-2'; // Tall
      case 4: return 'md:col-span-2'; // Wide
      default: return 'md:col-span-1 md:row-span-1'; // Standard
    }
  };

  return (
    // SECTION STYLING:
    // sticky top-4: Stacks on top of previous cards.
    // z-40: Higher than Events (z-30).
    <section className="w-full py-8 px-4 flex justify-center sticky top-4 z-40 mb-24">
      <div className="w-full max-w-[80rem] bg-[#0f172a] rounded-[2.5rem] shadow-2xl overflow-hidden relative isolate border border-slate-800">

        {/* Background Gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.1),transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(250,204,21,0.05),transparent_50%)] pointer-events-none" />

        <div className="relative z-10 p-8 md:p-12 lg:p-16 min-h-[50rem]">

          {/* Header & Filter */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 gap-8">
            <div className="max-w-xl">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
                Visual <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Showcase</span>
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed">
                Immerse yourself in the architectural beauty and vibrant atmosphere of Dembel City Center.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border ${filter === cat
                    ? 'bg-white text-slate-900 border-white shadow-[0_0_15px_rgba(255,255,255,0.3)]'
                    : 'bg-slate-800/50 text-slate-400 border-slate-700 hover:border-slate-500 hover:text-white'
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Animated Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-4 auto-rows-[200px] gap-4"
          >
            <AnimatePresence mode='popLayout'>
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  layoutId={`gallery-${item.id}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, type: 'spring' }}
                  className={`relative group rounded-2xl overflow-hidden cursor-pointer bg-slate-800 ${getSpanClass(index)}`}
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  {/* Image */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Overlay Gradient (Always visible but subtle) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                  {/* Hover Reveal Content */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <motion.div
                      initial={false}
                      animate={{ y: hoveredId === item.id ? 0 : 20, opacity: hoveredId === item.id ? 1 : 0.8 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex justify-between items-end">
                        <div>
                          <span className="inline-block px-2 py-1 mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-900 bg-yellow-400 rounded-sm">
                            {item.category}
                          </span>
                          <h3 className="text-white text-xl font-bold font-serif leading-tight drop-shadow-md">
                            {item.title}
                          </h3>
                          {hoveredId === item.id && (
                            <motion.p
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              className="text-slate-300 text-sm mt-2 line-clamp-2"
                            >
                              {item.description}
                            </motion.p>
                          )}
                        </div>

                        <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                          <ZoomIn className="w-5 h-5" />
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Footer of Card */}
          <div className="mt-8 flex justify-end">
            <p className="text-slate-500 text-sm italic">Showing {filteredItems.length} of {galleries.length} captures</p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Gallery;
