import React from "react";
import { motion } from "framer-motion";
import { router } from "@inertiajs/react";

export const FloorDirectory = ({
  fadeInUp,
  staggerContainer,
  selectedMall,
}) => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Explore Our Floors
          </h2>
          <p className="text-lg text-gray-600">
            Discover the perfect space for your needs across our carefully
            designed floors
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
        >
          {selectedMall.floors_directory.map((floor, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6 shadow-lg border border-blue-200"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {floor.floor}
              </h3>
              <ul className="space-y-2">
                {floor.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-center text-gray-700">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    {highlight}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button
            onClick={() => {
              // eslint-disable-next-line no-undef
              router.visit(route("free-space.index"));
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            View Available Spaces
          </button>
        </motion.div>
      </div>
    </section>
  );
};
