import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, Clock, Phone, Mail, Navigation } from 'lucide-react';
import { Map } from '../../Shared/Map';

export default function Location({ location }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const contactInfo = typeof location.extra_data === 'string' ? JSON.parse(location.extra_data) : location.extra_data;
  contactInfo.forEach((info) => {
    if (info.icon === 'MapPin') {
      info.icon = MapPin;
    } else if (info.icon === 'Clock') {
      info.icon = Clock;
    } else if (info.icon === 'Phone') {
      info.icon = Phone;
    } else if (info.icon === 'Mail') {
      info.icon = Mail;
    }
  });

  return (
    <section ref={ref} className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
            {location.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {location.description}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="flex gap-4 p-6 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors duration-300"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center">
                    <info.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-1">
                    {info.title}
                  </h3>
                  <p className="text-slate-700 font-medium">
                    {info.content.split(',').map((item) => (
                      <span key={item}>{item}<br /></span>
                    ))}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {info.subContent}
                  </p>
                </div>
              </motion.div>
            ))}

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.7 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-slate-900 text-white px-8 rounded-xl font-semibold text-lg hover:bg-slate-700 transition-colors duration-200 flex items-center justify-center gap-3"
            >
              <a href="https://www.google.com/maps/dir/?api=1&destination=Dembel+City+Center,+Addis+Ababa"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-slate-900 text-white py-4 px-8 rounded-xl font-semibold text-lg hover:bg-slate-700 transition-colors duration-200 flex items-center justify-center gap-3"
              >
                <Navigation className="w-5 h-5" />
                Get Directions
              </a>
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
              <Map />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
