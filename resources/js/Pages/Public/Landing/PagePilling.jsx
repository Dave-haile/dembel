// import React, { useEffect } from "react";
// import $ from "jquery";
// import "pagepiling.js/dist/pagepiling.css";
// import "pagepiling.js";

// const PagePilingExample = () => {
//   useEffect(() => {
//     // init pagepiling when component mounts
//     ($("#pagepiling")).pagepiling({
//       direction: "vertical",
//       scrollingSpeed: 700,
//       loopBottom: false,
//       loopTop: false,
//     });

//     return () => {
//       // destroy on unmount
//       ($("#pagepiling")).pagepiling.destroy("all");
//     };
//   }, []);

//   return (
//     <div id="pagepiling">
//       <div className="section">Home</div>
//       <div className="section">About</div>
//       <div className="section">Blog</div>
//       <div className="section">Contact</div>
//     </div>
//   );
// };

// export default PagePilingExample;
// import React, { useEffect } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// const sections = ["Home", "About", "Blog", "Contact"];

// const OverlayScroll = () => {
//   useEffect(() => {
//     sections.forEach((_, i) => {
//       ScrollTrigger.create({
//         trigger: `.panel-${i}`,
//         start: "top top",
//         pin: true,
//         pinSpacing: false,
//         scrub: true,
//       });
//     });
//   }, []);

//   return (
//     <div>
//       {sections.map((title, i) => (
//         <section
//           key={i}
//           className={`panel panel-${i}`}
//           style={{
//             height: "100vh",
//             background: i % 2 === 0 ? "#222" : "#555",
//             color: "white",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             fontSize: "3rem",
//           }}
//         >
//           {title}
//         </section>
//       ))}
//     </div>
//   );
// };

// export default OverlayScroll;
// import React, { useEffect } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// const PagePilling = () => {
//   useEffect(() => {
//     // grab all panels
//     gsap.utils.toArray(".panel").forEach((panel) => {
//       ScrollTrigger.create({
//         trigger: panel,
//         start: "top top",
//         pin: true,
//         pinSpacing: false,
//         scrub: true,
//       });
//     });
//   }, []);

//   return (
//     <div>
//       <section className="panel" style={{ height: "100vh", background: "#222", color: "white" }}>
//         Home
//       </section>
//       <section className="panel" style={{ height: "100vh", background: "#444", color: "white" }}>
//         About
//       </section>
//       <section className="panel" style={{ height: "100vh", background: "#666", color: "white" }}>
//         Blog
//       </section>
//       <section className="panel" style={{ height: "100vh", background: "#888", color: "white" }}>
//         Contact
//       </section>
//     </div>
//   );
// };

// export default PagePilling;

import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const slides = [
  {
    id: 1,
    text: "SLIDE 1",
    bg: "https://cloud.bassta.bg/fullscreenslides/slide1bg.jpg",
    textColor: "text-white",
    position: "left-[10%] top-[40%]"
  },
  {
    id: 2,
    text: "SLIDE 2",
    bg: "https://cloud.bassta.bg/fullscreenslides/slide2bg.jpg",
    textColor: "text-white",
    position: "left-[5%] top-[40%]"
  },
  {
    id: 3,
    text: "SLIDE 3",
    bg: "https://cloud.bassta.bg/fullscreenslides/slide3bg.jpg",
    textColor: "text-white",
    position: "left-[10%] top-[20%]"
  },
  {
    id: 4,
    text: "SLIDE 4",
    bg: "https://cloud.bassta.bg/fullscreenslides/slide4bg.jpg",
    textColor: "text-white",
    position: "right-[10%] top-[10%]"
  },
  {
    id: 5,
    text: "SLIDE 5",
    bg: "https://cloud.bassta.bg/fullscreenslides/slide5bg.jpg",
    textColor: "text-white",
    position: "left-[50%] top-[5%]"
  },
  {
    id: 6,
    text: "SLIDE 6",
    bg: "https://cloud.bassta.bg/fullscreenslides/slide6bg.jpg",
    textColor: "text-white",
    position: "left-[10%] top-[10%]"
  }
];

const ScrollSlides = () => {
  useEffect(() => {
    // Pin each slide so it stacks on scroll
    gsap.utils.toArray(".slide").forEach((slide) => {
      ScrollTrigger.create({
        trigger: slide,
        start: "top top",
        pin: true,
        pinSpacing: false,
        scrub: true
      });
    });
  }, []);

  return (
    <div id="slides-holder" className="relative w-full">
      {slides.map((s, i) => (
        <section
          key={s.id}
          className="slide relative h-screen w-full flex items-center justify-center bg-cover bg-center"
          style={{ backgroundImage: `url(${s.bg})`, zIndex: 100 + i }}
        >
          <div
            className={`fade-text absolute text-6xl font-bold opacity-20 transition-all duration-500 ease-out ${s.textColor} ${s.position}`}
          >
            {s.text}
          </div>
        </section>
      ))}
    </div>
  );
};

export default ScrollSlides;
