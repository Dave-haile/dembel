import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { TrendingUp, Store, Users, Award } from 'lucide-react';

function Counter({ value, suffix = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, { duration: 2, ease: 'easeOut' });
      return controls.stop;
    }
  }, [isInView, count, value]);

  return (
    <span ref={ref}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

export default function Stats({ stats }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const extra_data = typeof stats.extra_data === 'string' ? JSON.parse(stats.extra_data) : stats.extra_data;
  extra_data.forEach((stat) => {
    if (stat.icon === 'TrendingUp') {
      stat.icon = TrendingUp;
    } else if (stat.icon === 'Store') {
      stat.icon = Store;
    } else if (stat.icon === 'Users') {
      stat.icon = Users;
    } else if (stat.icon === 'Award') {
      stat.icon = Award;
    }
  });

  return (
    <section ref={ref} className="py-24 px-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            {stats.title}
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {stats.description}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {extra_data.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group"
              >
                <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                    className="w-16 h-16 bg-gradient-to-br from-white/20 to-white/5 rounded-xl flex items-center justify-center mb-6 group-hover:shadow-lg"
                  >
                    <IconComponent className="w-8 h-8 text-white" />
                  </motion.div>

                  <div className="text-5xl font-bold mb-2">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </div>

                  <h3 className="text-xl font-semibold mb-2 text-white">
                    {stat.label}
                  </h3>

                  <p className="text-gray-400">
                    {stat.desc}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  );
}
