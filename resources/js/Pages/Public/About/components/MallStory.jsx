import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Sparkles, TrendingUp, Award } from 'lucide-react';

export default function MallStory({ mallStory, whoWeAre }) {

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const milestones = mallStory.extra_data;
  const parsedMilestones = typeof milestones === 'string' ? JSON.parse(milestones) : milestones;
  // push icons to parsedMilestones
  parsedMilestones.forEach((milestone) => {
    if (milestone.title === 'The Beginning') {
      milestone.icon = Sparkles;
    } else if (milestone.title === 'Grand Opening') {
      milestone.icon = TrendingUp;
    } else if (milestone.title === 'Excellence Awarded') {  // Fixed typo here
      milestone.icon = Award;
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
            {mallStory.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {mallStory.description}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img
              src={mallStory.image_url}
              alt="Mall interior"
              className="rounded-2xl shadow-2xl w-full h-[400px] object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-bold text-slate-900">
              {whoWeAre.title}
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              {whoWeAre.description.slice(0, whoWeAre.description.indexOf("offices. ") + "offices. ".length)}
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              {whoWeAre.description.slice(whoWeAre.description.indexOf("offices. ") + "offices. ".length)}
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {parsedMilestones.map((milestone, index) => {
            const IconComponent = milestone.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.2 }}
                className="bg-gradient-to-br from-slate-50 to-gray-100 p-8 rounded-xl hover:shadow-xl transition-shadow duration-300"
              >
                {milestone.icon && <IconComponent className="w-12 h-12 text-slate-700 mb-4" />}
                <h4 className="text-4xl font-bold text-slate-900 mb-2">{milestone.year}</h4>
                <h5 className="text-xl font-semibold text-slate-800 mb-2">{milestone.title}</h5>
                <p className="text-gray-600">{milestone.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
