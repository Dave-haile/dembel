import React from 'react';
import { motion } from 'framer-motion';

const InstagramFeed = ({ instagram = [] }) => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            #DembelMoments
          </h2>
          <p className="text-lg text-slate-600">
            Experience the latest vibes from our Instagram community.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
          initial={{ opacity: 1 }}
        >
          {instagram.map((item, index) => (
            <motion.div
              key={item.id || index}
              className="relative overflow-hidden rounded-2xl aspect-square shadow-lg cursor-pointer group"
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.2, delay: index * 0.0006 }}
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={item.image}
                alt={item.caption}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700"
              />

              <div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black/80 via-black/30 to-transparent transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                <h3 className="text-white text-lg font-semibold">
                  {item.caption}
                </h3>
                <p className="text-pink-300 text-sm">{item.hashtags}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default InstagramFeed;
