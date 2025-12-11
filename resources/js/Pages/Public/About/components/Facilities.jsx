import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import getIcon from './GetIcons';

export default function Facilities({ facilities }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // const extra_data = typeof facilities.extra_data === 'string' ? JSON.parse(facilities.extra_data) : facilities.extra_data;
  const extra_data = facilities?.extra_data ? JSON.parse(facilities.extra_data) : [];

  return (
    <section ref={ref} className="py-24 px-4 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            {facilities.title}
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {facilities.description}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {extra_data.map((facility, index) => {

            return (
              <motion.div
                key={facility.title}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative group cursor-pointer overflow-hidden rounded-2xl h-80"
              >
                <div className="absolute inset-0">
                  <img
                    src={facility.image}
                    alt={facility.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
                </div>

                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <motion.div
                    animate={{
                      y: hoveredIndex === index ? -10 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* {IconComponent && <IconComponent className="w-10 h-10 mb-3 text-white" />} */}
                    {getIcon(facility.icon)}
                    <h3 className="text-2xl font-bold mb-2">{facility.title}</h3>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: hoveredIndex === index ? 1 : 0.8,
                      }}
                      className="text-gray-200"
                    >
                      {facility.desc}
                    </motion.p>
                  </motion.div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  );
}
