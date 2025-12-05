import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Heart, Users, Leaf, Star, Shield, Zap } from 'lucide-react';

export default function MissionValues({ missionValues }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const values = typeof missionValues.extra_data === 'string' ? JSON.parse(missionValues.extra_data) : missionValues.extra_data;
  values.forEach((value) => {
    if (value.title === 'Customer First') {
      value.icon = Heart;
      value.color = 'from-rose-500 to-pink-500';
    } else if (value.title === 'Community') {
      value.icon = Users;
      value.color = 'from-blue-500 to-cyan-500';
    } else if (value.title === 'Sustainability') {
      value.icon = Leaf;
      value.color = 'from-green-500 to-emerald-500';
    } else if (value.title === 'Excellence') {
      value.icon = Star;
      value.color = 'from-amber-500 to-yellow-500';
    } else if (value.title === 'Safety') {
      value.icon = Shield;
      value.color = 'from-slate-600 to-slate-800';
    } else if (value.title === 'Innovation') {
      value.icon = Zap;
      value.color = 'from-purple-500 to-indigo-500';
    }
  });

  return (
    <section ref={ref} className="py-24 px-4 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
            {missionValues.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {missionValues.description}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => {
            const IconComponent = value.icon;
            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 group"
              >
                <motion.div
                  className={`w-16 h-16 rounded-xl bg-gradient-to-br ${value.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  {IconComponent && <IconComponent className="w-8 h-8 text-white" />}
                </motion.div>

                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
