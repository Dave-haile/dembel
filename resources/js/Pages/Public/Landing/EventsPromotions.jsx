import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { Calendar, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const formatDate = (date) => {
  if (!date) return 'TBA';
  const d = new Date(date);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};


const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 10,
    },
  },
};

const EventsAndNews = ({ events }) => {
  const [lang, setLang] = useState('en');
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">

        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <h2
            className="text-4xl md:text-5xl font-extrabold text-[#303890] mb-4 tracking-tight"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Exclusive Events & Promotions <Calendar className="inline-block ml-2 text-accent-700" size={40} />

          </h2>
          <p
            className="text-gray-600 text-xl max-w-3xl mx-auto"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Stay updated with the latest happenings at Dembel City Center, from exciting product launches to seasonal sales.
          </p>
        </motion.div>

        <hr className="mb-12 border-t border-gray-100" />
        <div className="flex justify-end">
          <button className="px-4 py-2 text-sm bg-accent-800 text-white rounded-full -translate-y-4 hover:bg-primary-800 transition-colors" onClick={() => setLang(lang === 'en' ? 'am' : 'en')}>
            {lang === 'en' ? 'አማርኛ' : 'English'}
          </button>
        </div>
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {events.map((event) => (
            <motion.div
              key={event.id}
              variants={cardVariants}
              whileHover={{ scale: 1.03, zIndex: 1, transition: { duration: 0.3 } }}
              whileTap={{ scale: 0.98 }}
              className="group"
            >
              <Link
                href={event.url}
                className="block bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform"
              >
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 bg-[#fbee21] text-[#303890] px-4 py-2 rounded-full font-bold shadow-lg flex items-center gap-2 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                    <Calendar size={16} />
                    {formatDate(event.date)}
                  </div>
                </div>

                <div className="p-6">
                  <h3
                    className="text-2xl font-bold text-[#303890] mb-3 group-hover:text-amber-500 transition-colors"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    {lang === 'en' ? event.title_en : event.title_am}
                  </h3>
                  <p
                    className="text-gray-600 mb-4 leading-relaxed line-clamp-2"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {lang === 'en' ? event.description_en : event.description_am}
                  </p>
                  <div className="flex items-center gap-2 text-[#303890] font-semibold group-hover:gap-3 transition-all" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {lang === 'en' ? 'View Details' : 'መረጃ ይመልከቱ'}
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-16">
          <Link
            href="/events"
            className="inline-flex items-center gap-3 bg-[#303890] text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-[#4548b8] transition-all duration-300 hover:shadow-2xl shadow-lg hover:scale-105 active:scale-95"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            View All Events
            <Calendar size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default EventsAndNews;