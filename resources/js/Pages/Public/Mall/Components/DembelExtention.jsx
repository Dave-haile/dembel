import React from "react";
import { motion } from "framer-motion";

export const DembelExtention = ({ fadeInUp, staggerContainer, malls }) => {
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
            Twin Buildings Excellence
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Dembel Extension, built as an expansion to the original Dembel City
            Center, continues the legacy of modern retail and office excellence
            while offering upgraded facilities and contemporary design.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
        >
          {malls.map((mall) => (
            <motion.div
              key={mall.slug}
              variants={fadeInUp}
              className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8 shadow-xl border border-blue-200"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                {mall.name}
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-blue-200">
                  <span className="font-semibold text-gray-700">
                    Year Built
                  </span>
                  <span className="font-bold text-blue-600">
                    {mall.year_built}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-blue-200">
                  <span className="font-semibold text-gray-700">Floors</span>
                  <span className="font-bold text-blue-600">{mall.floors}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-blue-200">
                  <span className="font-semibold text-gray-700">
                    Total Area
                  </span>
                  <span className="font-bold text-blue-600">
                    {mall.total_area_sqm.toLocaleString()} sqm
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-blue-200">
                  <span className="font-semibold text-gray-700">
                    Number of Shops
                  </span>
                  <span className="font-bold text-blue-600">
                    {mall.total_shops}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="font-semibold text-gray-700">
                    Daily Foot Traffic
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
