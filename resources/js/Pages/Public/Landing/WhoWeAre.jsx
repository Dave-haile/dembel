// import React, { useEffect, useRef } from 'react';
// import { Link } from '@inertiajs/react';
// import { motion, useInView } from 'framer-motion';
// import { Building2, Store, MapPinned, Award } from 'lucide-react';

// const WhoWeAre = ({ about }) => {
//     const containerRef = useRef(null);
//     const headlineRef = useRef(null);
//     const featuresRef = useRef(null);
//     const storyRef = useRef(null);
//     const ctaRef = useRef(null);

//    const isHeadlineInView = useInView(headlineRef, { once: true, threshold: 0.3 });
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

//     const featureItem = {
//         hidden: { opacity: 0, y: 30, scale: 0.9 },
//         visible: {
//             opacity: 1,
//             y: 0,
//             scale: 1,
//             transition: { duration: 0.6, ease: "easeOut" }
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
//                 }, 1000); // 1s stay
//                 resetMap.set(letter, t);
//             });
//         });

//         return () => {
//             letters.forEach(letter => {
//                 letter.replaceWith(letter.cloneNode(true)); // cleanup
//             });
//         };
//     }, []);

//     const headerText = [
//         "The Premier Shopping",
//         "Destination in",
//         "Addis Ababa",
//     ];
//     return (
//         <section ref={containerRef} className="py-20 bg-gradient-to-br from-gray-50 to-white">
//             <div className="container mx-auto px-4 sm:px-6 lg:px-8">

//                <motion.div
//                     ref={headlineRef}
//                     initial="hidden"
//                     animate={isHeadlineInView ? "visible" : "hidden"}
//                     variants={fadeInUp}
//                     className="text-center mb-16"
//                 >

//                     <h2 className="coolors-title text-center font-extrabold text-6xl md:text-7xl lg:text-8xl tracking-[18px] leading-snug" style={{ fontFamily: "'Poppins', sans-serif" }}>
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
//                         <motion.div
//                             key={index}
//                             variants={featureItem}
//                             whileHover={{
//                                 y: -8,
//                                 scale: 1.02,
//                                 transition: { duration: 0.3 }
//                             }}
//                             className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
//                         >
//                             <div className="relative z-10 text-center p-6">
//                                 <motion.div
//                                     whileHover={{ rotate: 5, scale: 1.1 }}
//                                     className="inline-flex items-center justify-center w-20 h-20 bg-secondary group-hover:bg-accent-500 rounded-2xl mb-6 transition-colors duration-300"
//                                 >
//                                     <item.icon className="w-20 h-20 text-primary group-hover:text-white transition-colors duration-300" />
//                                 </motion.div>
//                                 <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-accent-700 transition-colors duration-300">
//                                     {item.title}
//                                 </h3>
//                                 <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
//                                     {item.desc}
//                                 </p>
//                             </div>
//                             <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//                         </motion.div>
//                     ))}
//                 </motion.div>

//                 <div ref={storyRef} className="flex flex-col lg:flex-row items-center gap-16 mb-20">
//                     <motion.div
//                         initial="hidden"
//                         animate={isStoryInView ? "visible" : "hidden"}
//                         variants={slideInLeft}
//                         className="lg:w-1/2"
//                     >
//                         <motion.h3
//                             variants={slideInLeft}
//                             className="text-4xl font-bold text-gray-800 mb-8"
//                         >
//                             {about.title.split('Excellence')[0]}
//                             <span className="text-primary-600">{about.title.split('of')[1]}</span>
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
//                                 src={`/${about.image_url || 'storage/img/dembel.jpg'}`}
//                                 alt="Dembel City Center Building"
//                                 className="w-full h-96 object-cover transform hover:scale-105 transition-transform duration-700"
//                             />
//                             <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
//                         </motion.div>
//                         <motion.div
//                             initial={{ opacity: 0, scale: 0 }}
//                             animate={isStoryInView ? { opacity: 1, scale: 1 } : {}}
//                             transition={{ delay: 0.5, duration: 0.6 }}
//                             className="absolute -top-4 -right-4 w-24 h-24 bg-primary-700 rounded-full opacity-20"
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
//                                 className="inline-block bg-primary-600 hover:bg-accent-600 text-white font-bold py-4 px-12 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
//                             >
//                                 Explore Our Stores
//                             </Link>
//                         </motion.div>
//                         <motion.div variants={scaleIn}>
//                             <Link
//                                 href="/contact"
//                                 className="inline-block border-2 border-gray-800 hover:bg-accent-600 text-gray-800 hover:text-white hover:border-white font-bold py-4 px-12 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
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


import React, { useEffect, useRef } from 'react';
import { Link } from '@inertiajs/react';
import { motion, useInView } from 'framer-motion';
import { Building2, Store, MapPinned, Award } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const WhoWeAre = ({ about }) => {
    const sectionRef = useRef(null);
    const containerRef = useRef(null);
    const headlineRef = useRef(null);
    const featuresRef = useRef(null);
    const storyRef = useRef(null);
    const ctaRef = useRef(null);

    const isHeadlineInView = useInView(headlineRef, { once: true, threshold: 0.3 });
    const isFeaturesInView = useInView(featuresRef, { once: true, threshold: 0.2 });
    const isStoryInView = useInView(storyRef, { once: true, threshold: 0.3 });
    const isCtaInView = useInView(ctaRef, { once: true, threshold: 0.4 });

    const fadeInUp = {
        hidden: { opacity: 0, y: 60 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const featureItem = {
        hidden: { opacity: 0, y: 30, scale: 0.9 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    const slideInLeft = {
        hidden: { opacity: 0, x: -80 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    const slideInRight = {
        hidden: { opacity: 0, x: 80 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    const scaleIn = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    // GSAP ScrollTrigger for stacking effect
    // useEffect(() => {
    //     if (sectionRef.current) {
    //         gsap.to(sectionRef.current, {
    //             scrollTrigger: {
    //                 trigger: sectionRef.current,
    //                 start: "top top",
    //                 end: "bottom top",
    //                 pin: true,
    //                 pinSpacing: false,
    //                 scrub: true,
    //             },
    //         });
    //     }

    //     return () => {
    //         ScrollTrigger.getAll().forEach((trigger) => {
    //             if (trigger.trigger === sectionRef.current) trigger.kill();
    //         });
    //     };
    // }, []);

    useEffect(() => {
        const letters = document.querySelectorAll(".coolors-title span span");

        function randomBrightColor() {
            return `hsl(${Math.floor(Math.random() * 360)}, 95%, 60%)`;
        }

        const resetMap = new Map();

        letters.forEach(letter => {
            letter.addEventListener("mouseenter", () => {
                const prev = resetMap.get(letter);
                if (prev) clearTimeout(prev);

                const c1 = randomBrightColor();
                const c2 = randomBrightColor();

                letter.style.background = `linear-gradient(90deg, ${c1}, ${c2})`;
                letter.style.webkitBackgroundClip = "text";
                letter.style.backgroundClip = "text";
                letter.style.color = "transparent";
                letter.style.animation = "moveGradient 1.5s linear infinite";
            });

            letter.addEventListener("mouseleave", () => {
                const t = setTimeout(() => {
                    letter.style.animation = "none";
                    letter.style.background = "none";
                    letter.style.color = "black";
                }, 1000);
                resetMap.set(letter, t);
            });
        });

        return () => {
            letters.forEach(letter => {
                letter.replaceWith(letter.cloneNode(true));
            });
        };
    }, []);

    const headerText = [
        "The Premier Shopping",
        "Destination in",
        "Addis Ababa",
    ];
    return (
        <section ref={sectionRef} className="relative min-h-screen py-20 bg-gradient-to-br from-gray-50 to-white overflow-hidden flex items-center">
            <div ref={containerRef} className="container mx-auto px-4 sm:px-6 lg:px-8 w-full">

                <motion.div
                    ref={headlineRef}
                    initial="hidden"
                    animate={isHeadlineInView ? "visible" : "hidden"}
                    variants={fadeInUp}
                    className="text-center mb-16"
                >

                    <h2 className="coolors-title text-center font-extrabold text-6xl md:text-7xl lg:text-8xl tracking-[18px] leading-snug" style={{ fontFamily: "'Poppins', sans-serif" }}>
                        {headerText.map((line, i) => (
                            <div key={i} className="flex justify-center flex-wrap">
                                {line.split(" ").map((word, wi) => (
                                    <span key={wi} className="inline-flex mx-1">
                                        {word.split("").map((char, ci) => (
                                            <span key={ci} className="inline-block">
                                                {char}
                                            </span>
                                        ))}
                                    </span>
                                ))}
                            </div>
                        ))}
                    </h2>
                    <motion.p
                        variants={fadeInUp}
                        className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
                    >
                        Dembel City Centre is more than just a mall; it's a landmark of progress and a community hub since 2002.
                    </motion.p>
                </motion.div>

                <motion.div
                    ref={featuresRef}
                    initial="hidden"
                    animate={isFeaturesInView ? "visible" : "hidden"}
                    variants={staggerContainer}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
                >
                    {[
                        { icon: Building2, title: "Two Majestic Buildings", desc: "Dembel & Dembel Extension" },
                        { icon: Store, title: "700+ Shops & Offices", desc: "Everything you need in one place" },
                        { icon: MapPinned, title: "40,000m² of Space", desc: "World-class retail and business area" },
                        { icon: Award, title: "A Historic Pioneer", desc: "One of Ethiopia's first malls" }
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            variants={featureItem}
                            whileHover={{
                                y: -8,
                                scale: 1.02,
                                transition: { duration: 0.3 }
                            }}
                            className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
                        >
                            <div className="relative z-10 text-center p-6">
                                <motion.div
                                    whileHover={{ rotate: 5, scale: 1.1 }}
                                    className="inline-flex items-center justify-center w-20 h-20 bg-secondary group-hover:bg-accent-500 rounded-2xl mb-6 transition-colors duration-300"
                                >
                                    <item.icon className="w-20 h-20 text-primary group-hover:text-white transition-colors duration-300" />
                                </motion.div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-accent-700 transition-colors duration-300">
                                    {item.title}
                                </h3>
                                <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                                    {item.desc}
                                </p>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </motion.div>
                    ))}
                </motion.div>

                <div ref={storyRef} className="flex flex-col lg:flex-row items-center gap-16 mb-20">
                    <motion.div
                        initial="hidden"
                        animate={isStoryInView ? "visible" : "hidden"}
                        variants={slideInLeft}
                        className="lg:w-1/2"
                    >
                        <motion.h3
                            variants={slideInLeft}
                            className="text-4xl font-bold text-gray-800 mb-8"
                        >
                            {about.title.split('Excellence')[0]}
                            <span className="text-primary-600">{about.title.split('of')[1]}</span>
                        </motion.h3>
                        <motion.div
                            variants={staggerContainer}
                            className="space-y-6"
                        >
                            <motion.p
                                variants={slideInLeft}
                                className="text-lg text-gray-600 leading-relaxed"
                            >
                                {about.description}
                            </motion.p>
                            <motion.p
                                variants={slideInLeft}
                                className="text-lg text-gray-600 leading-relaxed"
                            >
                                {about.subtitle}
                            </motion.p>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        animate={isStoryInView ? "visible" : "hidden"}
                        variants={slideInRight}
                        className="lg:w-1/2 relative"
                    >
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                            className="relative overflow-hidden rounded-2xl shadow-2xl"
                        >
                            <img
                                src={`/${about.image_url || 'storage/img/dembel.jpg'}`}
                                alt="Dembel City Center Building"
                                className="w-full h-96 object-cover transform hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={isStoryInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ delay: 0.5, duration: 0.6 }}
                            className="absolute -top-4 -right-4 w-24 h-24 bg-primary-700 rounded-full opacity-20"
                        />
                    </motion.div>
                </div>

                <motion.div
                    ref={ctaRef}
                    initial="hidden"
                    animate={isCtaInView ? "visible" : "hidden"}
                    variants={scaleIn}
                    className="text-center"
                >
                    <motion.div
                        variants={staggerContainer}
                        className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                    >
                        <motion.div variants={scaleIn}>
                            <Link
                                href="/tenant"
                                className="inline-block bg-primary-600 hover:bg-accent-600 text-white font-bold py-4 px-12 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                            >
                                Explore Our Stores
                            </Link>
                        </motion.div>
                        <motion.div variants={scaleIn}>
                            <Link
                                href="/contact"
                                className="inline-block border-2 border-gray-800 hover:bg-accent-600 text-gray-800 hover:text-white hover:border-white font-bold py-4 px-12 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                            >
                                View Mall Map
                            </Link>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default WhoWeAre;