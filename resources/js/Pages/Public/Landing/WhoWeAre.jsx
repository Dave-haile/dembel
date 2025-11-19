// import React from "react";
// import { ArrowRight } from "lucide-react";
// import { Link } from "@inertiajs/react";

// const WhoWeAre = () => {
//   return (
//     <section className="py-20 bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="grid lg:grid-cols-2 gap-12 items-center">
//           <div>
//             <h2 className="text-4xl lg:text-5xl font-bold text-[#125B9A] mb-6">
//               Who We Are
//             </h2>
//             <p className="text-xl text-gray-600 leading-relaxed">
//               Dembel City Center Mall stands as the premier shopping and
//               entertainment destination, offering world-class facilities and
//               experiences.
//             </p>
//           </div>

//           <div>
//             <p className="text-gray-700 leading-relaxed mb-8 text-lg">
//               Dembel City Centre (DCC) is a beautiful flowery-yellow multi story
//               building, located at Africa Avenue on the road to the Air Port of
//               Addis Ababa. It is one of the first Western-style shopping malls
//               in Ethiopia built in 2002. It is covering about 40,000m² of floor
//               area with basement ground floor and 12 stories, is one of the best
//               buildings in Ethiopia.
//             </p>
//             <p className="text-gray-700 leading-relaxed mb-8 text-lg">
//               Located in the heart of the city, our mall features
//               state-of-the-art retail spaces, dining options, and entertainment
//               facilities. We are committed to providing an exceptional shopping
//               experience that brings together local and international brands
//               under one modern, sophisticated roof.
//             </p>
//             <Link
//               href="/about"
//               className="inline-flex items-center text-[#0B8494] hover:text-[#0b8494d5] font-semibold text-lg group transition-colors duration-200"
//             >
//               Learn More
//               <ArrowRight
//                 size={20}
//                 className="ml-2 transform group-hover:translate-x-1 transition-transform duration-200"
//               />
//             </Link>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default WhoWeAre;


// import React from 'react';
// import { Link } from '@inertiajs/react'; // If you're using Inertia's Link component

// const WhoWeAre = () => {
//     return (
//         <section className="py-16 bg-white">
//             <div className="container mx-auto px-4 sm:px-6 lg:px-8">

//                 {/* Headline and Sub-headline */}
//                 <div className="text-center mb-12">
//                     <h2 className="text-4xl font-bold text-gray-800 mb-4">
//                         The Premier Shopping Destination in Addis Ababa
//                     </h2>
//                     <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//                         Dembel City Centre is more than just a mall; it's a landmark of progress and a community hub since 2002.
//                     </p>
//                 </div>

//                 {/* Key Features Grid */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
//                     <div className="text-center">
//                         <div className="text-4xl mb-4">🏢</div>
//                         <h3 className="text-lg font-semibold text-gray-700">Two Majestic Buildings</h3>
//                         <p className="text-gray-500">Dembel & Dembel Extension</p>
//                     </div>
//                     <div className="text-center">
//                         <div className="text-4xl mb-4">🛍️</div>
//                         <h3 className="text-lg font-semibold text-gray-700">700+ Shops & Offices</h3>
//                         <p className="text-gray-500">Everything you need in one place</p>
//                     </div>
//                     <div className="text-center">
//                         <div className="text-4xl mb-4">🌍</div>
//                         <h3 className="text-lg font-semibold text-gray-700">40,000m² of Space</h3>
//                         <p className="text-gray-500">World-class retail and business area</p>
//                     </div>
//                     <div className="text-center">
//                         <div className="text-4xl mb-4">⭐</div>
//                         <h3 className="text-lg font-semibold text-gray-700">A Historic Pioneer</h3>
//                         <p className="text-gray-500">One of Ethiopia's first malls</p>
//                     </div>
//                 </div>

//                 {/* The Story - Two Columns */}
//                 <div className="flex flex-col lg:flex-row items-center gap-12">
//                     {/* Text Content */}
//                     <div className="lg:w-1/2">
//                         <h3 className="text-3xl font-bold text-gray-800 mb-6">A Legacy of Excellence</h3>
//                         <p className="text-gray-600 mb-6 leading-relaxed">
//                             Dembel City Centre (DCC) is a beautiful flowery-yellow multi-story building, located at Africa Avenue on the road to the Air Port of Addis Ababa. As one of the first Western-style shopping malls in Ethiopia, built in 2002, it has become an integral part of the city's identity—so much so that the area around it bears its name.
//                         </p>
//                         <p className="text-gray-600 leading-relaxed">
//                             Covering about 40,000m² of floor area with a basement, ground floor, and 12 stories, DCC stands as one of the finest and most recognized buildings in Ethiopia, offering an unparalleled blend of shopping, dining, and business services.
//                         </p>
//                     </div>
//                     {/* Image */}
//                     <div className="lg:w-1/2">
//                         {/* Replace this div with an actual image of Dembel City Center */}
//                         {/* It's CRUCIAL to use a high-quality, professional image here */}
//                         <img 
//                             src="storage/img/dembel.jpg" // Update this path
//                             alt="Dembel City Center Building" 
//                             className="rounded-lg shadow-xl w-full h-80 object-cover"
//                         />
//                         <p className="text-sm text-gray-500 text-center mt-2">
//                             The iconic Dembel City Center building.
//                         </p>
//                     </div>
//                 </div>

//                 {/* Call to Action Buttons */}
//                 <div className="text-center mt-12">
//                     <Link 
//                         href="/directory" // Update this to your actual route
//                         className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg mr-4 transition duration-300"
//                     >
//                         Explore Our Stores
//                     </Link>
//                     <Link 
//                         href="/map" // Update this to your actual route
//                         className="border border-gray-800 hover:bg-gray-800 text-gray-800 hover:text-white font-bold py-3 px-8 rounded-lg transition duration-300"
//                     >
//                         View Mall Map
//                     </Link>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default WhoWeAre;

// WhoWeAreSection.jsx

// import { motion } from "framer-motion";
// import { Link } from "@inertiajs/react";

// /**
//  * WhoWeAre component
//  * - Uses your Tailwind theme classes: `text-primary`, `bg-accent`
//  * - Framer Motion drives scroll-triggered slide & fade animations
//  * - Replace image paths with your real production images
//  */

// const stats = [
//   { label: "Tenants", value: "700+" },
//   { label: "Floor Area", value: "40,000 m²" },
//   { label: "Floors", value: "Basement · G · 12 floors" },
//   { label: "Buildings", value: "2 (Dembel & Extension)" },
// ];

// const containerVariant = {
//   hidden: {},
//   show: {
//     transition: {
//       staggerChildren: 0.12,
//     },
//   },
// };

// const cardVariant = {
//   hidden: { opacity: 0, y: 18 },
//   show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 200, damping: 20 } },
// };

// export default function WhoWeAre() {
//   return (
//     <section
//       id="who-we-are"
//       aria-labelledby="who-we-are-title"
//       className="relative bg-white py-16 lg:py-24"
//     >
//       <div className="container mx-auto px-4">
//         {/* Header / Title */}
//         <div className="max-w-3xl mx-auto text-center mb-10">
//           <h2 id="who-we-are-title" className="text-3xl md:text-4xl font-extrabold text-primary leading-tight">
//             Who We Are
//           </h2>
//           <p className="mt-3 text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
//             A landmark of commerce, culture, and community — Dembel City Center has been shaping
//             modern retail in Ethiopia since 2002.
//           </p>
//         </div>

//         {/* Content Row */}
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
//           {/* Text Column */}
//           <motion.div
//             className="lg:col-span-6"
//             initial={{ opacity: 0, x: -64 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.7, ease: "easeOut" }}
//             viewport={{ once: true, amount: 0.35 }}
//           >
//             <p className="text-lg md:text-xl text-gray-700 mb-6">
//               <strong className="text-primary">Dembel City Center (DCC)</strong> is a beautiful
//               flower-yellow, multi-story building located on Africa Avenue en route to the airport.
//               Opened in <strong>2002</strong>, DCC was one of the first Western-style shopping malls
//               in Ethiopia and remains one of the country's most recognizable commercial landmarks.
//             </p>

//             <p className="text-base text-gray-600 mb-6">
//               With <strong>two buildings</strong> — <em>Dembel</em> and <em>Dembel Extension</em> —
//               the complex hosts more than <strong>700 tenants</strong> across retail, banking,
//               jewelry, fashion, footwear, services and corporate offices. The mall serves as both
//               a bustling shopping destination and a major business hub for Addis Ababa.
//             </p>

//             <div className="flex flex-wrap gap-3 items-center">
//               <Link
//                 href="/about"
//                 className="inline-flex items-center gap-3 px-6 py-3 rounded-full font-semibold text-sm shadow-md
//                            bg-accent text-black hover:brightness-95 transition"
//                 aria-label="Learn more about Dembel City Center"
//               >
//                 Learn More
//               </Link>

//               <Link
//                 href="/mall"
//                 className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm
//                            border-2 border-primary text-primary hover:bg-primary/5 transition"
//                 aria-label="See buildings and tenants"
//               >
//                 View Buildings & Tenants
//               </Link>
//             </div>
//           </motion.div>

//           {/* Image Column */}
//           <motion.div
//             className="lg:col-span-6 flex justify-center lg:justify-end"
//             initial={{ opacity: 0, x: 64 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8, ease: "easeOut" }}
//             viewport={{ once: true, amount: 0.35 }}
//           >
//             {/* Image container: replace source with your hero/collage */}
//             <div
//               className="w-full max-w-md lg:max-w-lg rounded-2xl overflow-hidden shadow-xl ring-1 ring-black/5"
//               role="img"
//               aria-label="Dembel City Center buildings"
//             >
//               <picture>
//                 {/* Different sizes for responsiveness */}
//                 <source media="(min-width:1024px)" srcSet="storage/img/dembel.jpg" />
//                 <source media="(min-width:640px)" srcSet="storage/img/dembel.jpg" />
//                 <img
//                   src="storage/img/dembel.jpg"
//                   alt="Dembel City Center — Dembel and Dembel Extension buildings"
//                   className="w-full h-auto object-cover"
//                 />
//               </picture>
//               {/* subtle caption */}
//               <div className="p-4 bg-white">
//                 <div className="text-sm text-gray-500">Dembel & Dembel Extension — Africa Avenue</div>
//               </div>
//             </div>
//           </motion.div>
//         </div>

//         {/* Stats Row (staggered reveal) */}
//         <motion.div
//           className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
//           variants={containerVariant}
//           initial="hidden"
//           whileInView="show"
//           viewport={{ once: true, amount: 0.2 }}
//         >
//           {stats.map((s, i) => (
//             <motion.div
//               key={i}
//               variants={cardVariant}
//               className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
//             >
//               <div className="text-3xl md:text-4xl font-extrabold text-primary leading-none">
//                 {s.value}
//               </div>
//               <div className="mt-2 text-sm text-gray-600">{s.label}</div>
//             </motion.div>
//           ))}
//         </motion.div>

//         {/* Optional paragraph or quote */}
//         <motion.blockquote
//           className="mt-10 max-w-3xl mx-auto text-center italic text-gray-700"
//           initial={{ opacity: 0, y: 24 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           viewport={{ once: true, amount: 0.3 }}
//         >
//           “One of the earliest modern shopping destinations in Ethiopia, Dembel City Center
//           continues to bring communities together through retail, services, and experiences.”
//         </motion.blockquote>
//       </div>
//     </section>
//   );
// }

import React, { useEffect, useRef } from 'react';
import { Link } from '@inertiajs/react';
import { motion, useInView } from 'framer-motion';
import { Building2, Store, MapPinned, Award } from 'lucide-react';

const WhoWeAre = ({ about }) => {
    console.log('About content:', about);
    // Refs for scroll-triggered animations
    const containerRef = useRef(null);
    const headlineRef = useRef(null);
    const featuresRef = useRef(null);
    const storyRef = useRef(null);
    const ctaRef = useRef(null);

    // Check if elements are in view
    const isHeadlineInView = useInView(headlineRef, { once: true, threshold: 0.3 });
    const isFeaturesInView = useInView(featuresRef, { once: true, threshold: 0.2 });
    const isStoryInView = useInView(storyRef, { once: true, threshold: 0.3 });
    const isCtaInView = useInView(ctaRef, { once: true, threshold: 0.4 });

    // Animation variants
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
                }, 1000); // 1s stay
                resetMap.set(letter, t);
            });
        });

        return () => {
            letters.forEach(letter => {
                letter.replaceWith(letter.cloneNode(true)); // cleanup
            });
        };
    }, []);

    const headerText = [
        "The Premier Shopping",
        "Destination in",
        "Addis Ababa",
    ];
    return (
        <section ref={containerRef} className="py-20 bg-gradient-to-br from-gray-50 to-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">

                {/* Headline and Sub-headline */}
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

                {/* Key Features Grid */}
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
                            {/* Background gradient on hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </motion.div>
                    ))}
                </motion.div>

                {/* The Story - Two Columns */}
                <div ref={storyRef} className="flex flex-col lg:flex-row items-center gap-16 mb-20">
                    {/* Text Content */}
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

                    {/* Image */}
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
                            {/* Replace with your actual image */}
                            <img
                                src={`/${about.image_url || 'storage/img/dembel.jpg'}`}
                                alt="Dembel City Center Building"
                                className="w-full h-96 object-cover transform hover:scale-105 transition-transform duration-700"
                            />
                            {/* Overlay gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        </motion.div>
                        {/* Decorative element */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={isStoryInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ delay: 0.5, duration: 0.6 }}
                            className="absolute -top-4 -right-4 w-24 h-24 bg-primary-700 rounded-full opacity-20"
                        />
                    </motion.div>
                </div>

                {/* Call to Action Buttons */}
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