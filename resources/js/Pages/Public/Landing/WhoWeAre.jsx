// import React, { useEffect, useRef } from 'react';
// import { Link } from '@inertiajs/react';
// import { motion, useInView } from 'framer-motion';
// import { Building2, Store, MapPinned, Award } from 'lucide-react';

// const WhoWeAre = ({ about }) => {
//     const sectionRef = useRef(null);
//     const containerRef = useRef(null);
//     const headlineRef = useRef(null);
//     const featuresRef = useRef(null);
//     const storyRef = useRef(null);
//     const ctaRef = useRef(null);

//     const isHeadlineInView = useInView(headlineRef, { once: true, threshold: 0.3 });
//     const isFeaturesInView = useInView(featuresRef, { once: true, threshold: 0.2 });
//     const isStoryInView = useInView(storyRef, { once: true, threshold: 0.3 });
//     const isCtaInView = useInView(ctaRef, { once: true, threshold: 0.4 });

//     const fadeInUp = {
//         hidden: { opacity: 0, y: 60 },
//         visible: {
//             opacity: 1,
//             y: 0,
//             transition: { duration: 0.8, ease: "easeOut" }
//         }
//     };

//     const staggerContainer = {
//         hidden: { opacity: 0 },
//         visible: {
//             opacity: 1,
//             transition: {
//                 staggerChildren: 0.2
//             }
//         }
//     };

//     const slideInLeft = {
//         hidden: { opacity: 0, x: -80 },
//         visible: {
//             opacity: 1,
//             x: 0,
//             transition: { duration: 0.8, ease: "easeOut" }
//         }
//     };

//     const slideInRight = {
//         hidden: { opacity: 0, x: 80 },
//         visible: {
//             opacity: 1,
//             x: 0,
//             transition: { duration: 0.8, ease: "easeOut" }
//         }
//     };

//     const scaleIn = {
//         hidden: { opacity: 0, scale: 0.8 },
//         visible: {
//             opacity: 1,
//             scale: 1,
//             transition: { duration: 0.6, ease: "easeOut" }
//         }
//     };


//     useEffect(() => {
//         const letters = document.querySelectorAll(".coolors-title span span");

//         function randomBrightColor() {
//             return `hsl(${Math.floor(Math.random() * 360)}, 95%, 60%)`;
//         }

//         const resetMap = new Map();

//         letters.forEach(letter => {
//             letter.addEventListener("mouseenter", () => {
//                 const prev = resetMap.get(letter);
//                 if (prev) clearTimeout(prev);

//                 const c1 = randomBrightColor();
//                 const c2 = randomBrightColor();

//                 letter.style.background = `linear-gradient(90deg, ${c1}, ${c2})`;
//                 letter.style.webkitBackgroundClip = "text";
//                 letter.style.backgroundClip = "text";
//                 letter.style.color = "transparent";
//                 letter.style.animation = "moveGradient 1.5s linear infinite";
//             });

//             letter.addEventListener("mouseleave", () => {
//                 const t = setTimeout(() => {
//                     letter.style.animation = "none";
//                     letter.style.background = "none";
//                     letter.style.color = "black";
//                 }, 1000);
//                 resetMap.set(letter, t);
//             });
//         });

//         return () => {
//             letters.forEach(letter => {
//                 letter.replaceWith(letter.cloneNode(true));
//             });
//         };
//     }, []);

//     const headerText = [
//         "The Premier Shopping",
//         "Destination in",
//         "Addis Ababa",
//     ];
//     return (
//         <section ref={sectionRef} className="relative min-h-screen py-20 bg-gradient-to-br from-gray-50 to-white overflow-hidden flex items-center">
//             <div ref={containerRef} className="container mx-auto px-4 sm:px-6 lg:px-8 w-full">

//                 <motion.div
//                     ref={headlineRef}
//                     initial="hidden"
//                     animate={isHeadlineInView ? "visible" : "hidden"}
//                     variants={fadeInUp}
//                     className="text-center mb-16"
//                 >
//                     <span className="inline-block py-1 px-3 rounded-full bg-slate-50 border border-slate-100 text-slate-900 text-xs font-bold tracking-[0.2em] uppercase mb-6">
//                         Established 2002
//                     </span>

//                     <h2 className="coolors-title text-slate-950 font-serif text-center font-extrabold text-6xl md:text-7xl lg:text-8xl tracking-[18px] leading-snug">
//                         {headerText.map((line, i) => (
//                             <div key={i} className="flex justify-center flex-wrap">
//                                 {line.split(" ").map((word, wi) => (
//                                     <span key={wi} className="inline-flex mx-1">
//                                         {word.split("").map((char, ci) => (
//                                             <span key={ci} className="inline-block">
//                                                 {char}
//                                             </span>
//                                         ))}
//                                     </span>
//                                 ))}
//                             </div>
//                         ))}
//                     </h2>
//                     <motion.p
//                         variants={fadeInUp}
//                         className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
//                     >
//                         Dembel City Centre is more than just a mall; it's a landmark of progress and a community hub since 2002.
//                     </motion.p>
//                 </motion.div>

//                 <motion.div
//                     ref={featuresRef}
//                     initial="hidden"
//                     animate={isFeaturesInView ? "visible" : "hidden"}
//                     variants={staggerContainer}
//                     className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
//                 >
//                     {[
//                         { icon: Building2, title: "Two Majestic Buildings", desc: "Dembel & Dembel Extension" },
//                         { icon: Store, title: "700+ Shops & Offices", desc: "Everything you need in one place" },
//                         { icon: MapPinned, title: "40,000m² of Space", desc: "World-class retail and business area" },
//                         { icon: Award, title: "A Historic Pioneer", desc: "One of Ethiopia's first malls" }
//                     ].map((item, index) => (
//                         <div key={index} className="feature-card group p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:border-gold-300/30 transition-all duration-300 flex flex-col items-center text-center relative overflow-hidden">
//                             {/* Hover Gradient */}
//                             <div className="absolute inset-0 bg-gradient-to-br from-gold-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

//                             <motion.div
//                                 whileHover={{ rotate: 5, scale: 1.1 }}
//                             >
//                                 <div className="w-16 h-16 rounded-xl bg-slate-950 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg relative z-10">
//                                     <item.icon className="w-8 h-8 text-gold-400" />
//                                 </div>
//                             </motion.div>
//                             <h3 className="text-xl font-serif font-bold text-slate-950 mb-3 relative z-10">
//                                 {item.title}
//                             </h3>
//                             <p className="text-sm text-gray-500 leading-relaxed relative z-10">
//                                 {item.desc}
//                             </p>
//                         </div>

//                     ))
//                         //     .map((item, index) => (
//                         //     <motion.div
//                         //         key={index}
//                         //         variants={featureItem}
//                         //         whileHover={{
//                         //             y: -8,
//                         //             scale: 1.02,
//                         //             transition: { duration: 0.3 }
//                         //         }}
//                         //         className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
//                         //     >
//                         //         <div className="relative z-10 text-center p-6">
//                         //             <motion.div
//                         //                 whileHover={{ rotate: 5, scale: 1.1 }}
//                         //                 className="inline-flex items-center justify-center w-20 h-20 bg-secondary group-hover:bg-accent-500 rounded-2xl mb-6 transition-colors duration-300"
//                         //             >
//                         //                 <item.icon className="w-20 h-20 text-primary group-hover:text-white transition-colors duration-300" />
//                         //             </motion.div>
//                         //             <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-accent-700 transition-colors duration-300">
//                         //                 {item.title}
//                         //             </h3>
//                         //             <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
//                         //                 {item.desc}
//                         //             </p>
//                         //         </div>
//                         //         <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//                         //     </motion.div>
//                         // ))
//                     }
//                 </motion.div>

//                 <div ref={storyRef} className="flex flex-col lg:flex-row items-center gap-16 mb-20 font-serif">
//                     <motion.div
//                         initial="hidden"
//                         animate={isStoryInView ? "visible" : "hidden"}
//                         variants={slideInLeft}
//                         className="lg:w-1/2"
//                     >
//                         <motion.h3
//                             variants={slideInLeft}
//                             className="text-4xl font-bold text-slate-950 mb-8"
//                         >
//                             {about.title.split('Excellence')[0]}
//                             <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-600 to-gold-400">
//                                 {about.title.split('of')[1]}
//                             </span>
//                         </motion.h3>
//                         <motion.div
//                             variants={staggerContainer}
//                             className="space-y-6"
//                         >
//                             <motion.p
//                                 variants={slideInLeft}
//                                 className="text-lg text-gray-600 leading-relaxed"
//                             >
//                                 {about.description}
//                             </motion.p>
//                             <motion.p
//                                 variants={slideInLeft}
//                                 className="text-lg text-gray-600 leading-relaxed"
//                             >
//                                 {about.subtitle}
//                             </motion.p>
//                         </motion.div>
//                     </motion.div>

//                     <motion.div
//                         initial="hidden"
//                         animate={isStoryInView ? "visible" : "hidden"}
//                         variants={slideInRight}
//                         className="lg:w-1/2 relative"
//                     >
//                         <motion.div
//                             whileHover={{ scale: 1.02 }}
//                             transition={{ duration: 0.3 }}
//                             className="relative overflow-hidden rounded-2xl shadow-2xl"
//                         >
//                             <img
//                                 src={`/${about.image_url || 'img/dembel.jpg'}`}
//                                 alt="Dembel City Center Building"
//                                 className="w-full h-96 object-cover transform hover:scale-105 transition-transform duration-700"
//                             />
//                             <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
//                         </motion.div>
//                         <motion.div
//                             initial={{ opacity: 0, scale: 0 }}
//                             animate={isStoryInView ? { opacity: 1, scale: 1 } : {}}
//                             transition={{ delay: 0.5, duration: 0.6 }}
//                             className="absolute -top-4 -right-4 w-24 h-24 bg-slate-950 rounded-full opacity-20"
//                         />
//                     </motion.div>
//                 </div>

//                 <motion.div
//                     ref={ctaRef}
//                     initial="hidden"
//                     animate={isCtaInView ? "visible" : "hidden"}
//                     variants={scaleIn}
//                     className="text-center"
//                 >
//                     <motion.div
//                         variants={staggerContainer}
//                         className="flex flex-col sm:flex-row gap-6 justify-center items-center"
//                     >
//                         <motion.div variants={scaleIn}>
//                             <Link
//                                 href="/tenant"
//                                 className="inline-block bg-slate-950 hover:bg-slate-800 text-white font-bold py-4 px-12 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
//                             >
//                                 Explore Our Stores
//                             </Link>
//                         </motion.div>
//                         <motion.div variants={scaleIn}>
//                             <Link
//                                 href="/contact"
//                                 className="inline-block border-2 border-gray-800 hover:bg-slate-950 text-gray-800 hover:text-white hover:border-white font-bold py-4 px-12 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
//                             >
//                                 View Mall Map
//                             </Link>
//                         </motion.div>
//                     </motion.div>
//                 </motion.div>
//             </div>
//         </section>
//     );
// };

// export default WhoWeAre;
import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { Building2, Store, MapPinned, Award } from 'lucide-react';
import { router } from '@inertiajs/react';

const InteractiveLetter = ({ char }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [colorStyle, setColorStyle] = useState({});

  const handleMouseEnter = () => {
    setIsHovered(true);
    const hue1 = Math.floor(Math.random() * 360);
    const hue2 = (hue1 + 40) % 360;
    
    // We use standard CSS for the gradient text effect as it's performant
    setColorStyle({
      backgroundImage: `linear-gradient(90deg, hsl(${hue1}, 95%, 60%), hsl(${hue2}, 95%, 60%))`,
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      color: 'transparent',
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Delay resetting the color slightly to allow the exit animation to finish smoothly
    setTimeout(() => {
        setColorStyle({});
    }, 500);
  };

  return (
    <motion.span
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={isHovered ? colorStyle : undefined}
      animate={isHovered ? {
        y: -10,
        scale: 1.2,
        rotate: Math.random() * 10 - 5
      } : {
        y: 0,
        scale: 1,
        rotate: 0
      }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      className={`inline-block cursor-default select-none transition-colors duration-300 ${isHovered ? 'animate-gradient-text' : 'text-slate-950'}`}
    >
      {char}
    </motion.span>
  );
};

const InteractiveTitle = ({ textLines }) => {
  // Stagger effect for the initial load
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const child = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  };

  return (
    <h2 className="font-serif text-center font-extrabold text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[1.1]">
      {textLines.map((line, i) => (
        <motion.div 
            key={i} 
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            className="flex justify-center flex-wrap gap-x-4 md:gap-x-6 mb-2"
        >
          {line.split(" ").map((word, wi) => (
            <span key={wi} className="inline-flex whitespace-nowrap">
              {word.split("").map((char, ci) => (
                <motion.span key={ci} variants={child}>
                    <InteractiveLetter char={char} />
                </motion.span>
              ))}
            </span>
          ))}
        </motion.div>
      ))}
    </h2>
  );
};

const WhoWeAre = ({ about }) => {
    console.log('who we are', about)
    const sectionRef = useRef(null);
    const storyRef = useRef(null);
    const isStoryInView = useInView(storyRef, { once: true, margin: "-100px" });

    // Parallax effect for the background or elements
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const yBackground = useTransform(scrollYProgress, [0, 1], [0, 100]);
    const smoothY = useSpring(yBackground, { stiffness: 100, damping: 20 });

    const headerText = [
        "The Premier",
        "Shopping Destination",
        "in Addis Ababa",
    ];

    const fadeInUp = {
        hidden: { opacity: 0, y: 60 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
        }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    const featureItemVariant = {
        hidden: { opacity: 0, y: 30 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { type: "spring", stiffness: 50 }
        }
    };

    return (
        <section ref={sectionRef} className="relative py-24 bg-white overflow-hidden">
            {/* Decorative Background Elements */}
            <motion.div 
                style={{ y: smoothY }}
                className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-b from-gold-50/50 to-transparent rounded-full blur-3xl -z-10 opacity-60 pointer-events-none"
            />
            <motion.div 
                style={{ y: useTransform(scrollYProgress, [0, 1], [0, -50]) }}
                className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-slate-50 rounded-full blur-3xl -z-10 opacity-80 pointer-events-none"
            />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-7xl">

                {/* Header Section */}
                <div className="text-center mb-24 relative">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-block py-1.5 px-4 rounded-full bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold tracking-[0.2em] uppercase mb-8 shadow-sm">
                            Established 2002
                        </span>
                    </motion.div>

                    <InteractiveTitle textLines={headerText} />
                    
                    <motion.p
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-xl md:text-2xl text-slate-500 max-w-3xl mx-auto leading-relaxed mt-8 font-light"
                    >
                        Dembel City Centre is more than just a mall; it's a landmark of progress and a thriving community hub.
                    </motion.p>
                </div>

                {/* Features Grid */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={staggerContainer}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32"
                >
                    {[
                        { icon: Building2, title: "Two Majestic Buildings", desc: "Dembel & Dembel Extension" },
                        { icon: Store, title: "700+ Shops & Offices", desc: "Everything you need in one place" },
                        { icon: MapPinned, title: "40,000m² of Space", desc: "World-class retail and business area" },
                        { icon: Award, title: "A Historic Pioneer", desc: "One of Ethiopia's first malls" }
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            variants={featureItemVariant}
                            whileHover={{ y: -10 }}
                            className="group relative p-8 rounded-3xl bg-white border border-slate-100 shadow-[0_4px_20px_-12px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.1)] transition-all duration-500 flex flex-col items-center text-center overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-gold-50/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            
                            <div className="relative z-10 w-16 h-16 rounded-2xl bg-slate-950 flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 group-hover:bg-gold-500 transition-all duration-500">
                                <item.icon className="w-8 h-8 text-gold-400 group-hover:text-white transition-colors duration-500" />
                            </div>
                            
                            <h3 className="relative z-10 text-lg font-serif font-bold text-slate-900 mb-2 group-hover:text-slate-950">
                                {item?.title}
                            </h3>
                            <p className="relative z-10 text-sm text-slate-500 leading-relaxed group-hover:text-slate-700">
                                {item?.desc}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Story Section */}
                <div ref={storyRef} className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24 mb-24">
                    <motion.div
                        className="lg:w-1/2"
                        initial={{ opacity: 0, x: -50 }}
                        animate={isStoryInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <h3 className="text-4xl md:text-5xl font-serif font-bold text-slate-950 mb-8 leading-tight whitespace-nowrap">
                            {about?.title.split('Excellence')[0]}
                            <span className="inline text-transparent bg-clip-text bg-gradient-to-r from-gold-600 to-gold-400">
                            {about?.title.split('of')[1]}
                            </span>
                        </h3>
                        
                        <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                            <p>{about?.description}</p>
                            <p className="font-medium text-slate-800">{about?.subtitle}</p>
                        </div>

                        <div className="mt-10 flex gap-4">
                            <div className="h-px flex-1 bg-slate-200 my-auto"></div>
                            <span className="text-slate-400 text-sm tracking-widest uppercase cursor-pointer" onClick={()=>{
                                router.visit('/about')
                            }}>Learn More</span>
                        </div>
                    </motion.div>

                    <motion.div
                        className="lg:w-1/2 relative"
                        initial={{ opacity: 0, x: 50 }}
                        animate={isStoryInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    >
                        {/* Image Container with Hover Effect */}
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="relative rounded-3xl overflow-hidden shadow-2xl aspect-square group"
                        >
                            <img
                                src={about?.image_url}
                                alt="Dembel City Center"
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-60" />
                            
                            {/* Floating Badge */}
                            <motion.div 
                                initial={{ y: 20, opacity: 0 }}
                                animate={isStoryInView ? { y: 0, opacity: 1 } : {}}
                                transition={{ delay: 0.8 }}
                                className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-sm p-6 rounded-2xl border border-white/20 shadow-xl"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-gold-100 flex items-center justify-center text-gold-600 font-bold">
                                        20+
                                    </div>
                                    <div>
                                        <p className="text-slate-950 font-bold text-lg">Years of Service</p>
                                        <p className="text-slate-500 text-sm">Serving the community with pride</p>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Decorative Circle */}
                        <motion.div
                            animate={{ 
                                rotate: 360,
                                scale: [1, 1.1, 1] 
                            }}
                            transition={{ 
                                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                                scale: { duration: 5, repeat: Infinity, ease: "easeInOut" }
                            }}
                            className="absolute -top-12 -right-12 w-48 h-48 border border-dashed border-slate-300 rounded-full -z-10 opacity-50"
                        />
                    </motion.div>
                </div>

            </div>
        </section>
    );
};

export default WhoWeAre;