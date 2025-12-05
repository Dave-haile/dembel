import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Linkedin, Mail } from 'lucide-react';

export default function Team({ team }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hovered, setHovered] = useState(false);

  const teamData = typeof team.extra_data === 'string' ? JSON.parse(team.extra_data) : team.extra_data;

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
            {team.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {team.description}
          </p>
        </motion.div>

        <div className={`grid md:grid-cols-2 lg:grid-cols-4 gap-8 `}>
          {teamData.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, rotateY: -20 }}
              animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -10 }}
              onHoverStart={() => setHovered(true)}
              onHoverEnd={() => setHovered(false)}
              className="group"
            >
              <div className="relative overflow-hidden rounded-2xl mb-4 shadow-lg group/card">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-80 object-cover transition-transform duration-500 group-hover/card:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60 group-hover/card:opacity-80 transition-opacity duration-300"></div>

                <motion.div
                  className="absolute inset-0 flex items-end justify-center p-6"
                  initial={{ y: '100%' }}
                  animate={hovered ? { y: '0%' } : { y: '100%' }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex gap-4">
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-white/90 rounded-full hover:bg-white transform translate-y-10 opacity-0 group-hover/card:opacity-100 group-hover/card:translate-y-0 transition-all duration-300 hover:scale-110"
                      >
                        <Linkedin className="w-5 h-5 text-slate-900" />
                      </a>
                    )}
                    <a
                      href={`mailto:${member.email || '#'}`}
                      className="p-3 bg-white/90 rounded-full hover:bg-white transform translate-y-10 opacity-0 group-hover/card:opacity-100 group-hover/card:translate-y-0 transition-all duration-300 delay-100 hover:scale-110"
                    >
                      <Mail className="w-5 h-5 text-slate-900" />
                    </a>
                  </div>
                </motion.div>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-slate-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-slate-600 font-semibold mb-2">
                  {member.role}
                </p>
                <p className="text-gray-600 text-sm">
                  {member.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section >
  );
}
