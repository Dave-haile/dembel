import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function AboutHero({ hero }) {

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden ">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 opacity-20">
          {/* <div className={`absolute inset-0 bg-[url('${hero.image}')] bg-cover bg-center`}>
          </div> */}
          <img className="absolute inset-0 w-full h-full object-cover" src={hero.image_url} alt="" />
        </div>
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        />
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-7xl md:text-9xl font-bold text-white mb-6 tracking-tight">
            {hero.title}
          </h1>
        </motion.div>

        <motion.p
          className="text-3xl md:text-4xl text-gray-200 mb-8 font-light"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {hero.subtitle}
        </motion.p>

        <motion.p
          className="text-2xl md:text-3xl text-gray-200 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {hero.description}
        </motion.p>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          delay: 1,
          repeat: Infinity,
          repeatType: 'reverse',
          repeatDelay: 0.5,
        }}
      >
        <ChevronDown className="w-8 h-8 text-white" />
      </motion.div>
    </section>
  );
}
