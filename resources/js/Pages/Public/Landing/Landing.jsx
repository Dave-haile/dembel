import React from "react";
import { Head } from "@inertiajs/react";
import MainLayout from "../Shared/MainLayout";
import Slider from "./Slider";
import WhoWeAre from "./WhoWeAre";
import Services from "./Services";
import Gallery from "./Gallery";
import Testimonials from "./Testimonials";
import News from "./News";
import MallHighlights from "./MallHighlights";
import FeaturedTenants from "./FeaturedTenants";
import VisitUs from "./VisitUs";
import EventsPromotions from "./EventsPromotions";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

const Home = ({
  sliders,
  testimonials,
  news,
  services,
  gallery,
  event,
  tenants,
}) => {
  // useEffect(() => {
  //   gsap.utils.toArray(".panel").forEach((panel) => {
  //     ScrollTrigger.create({
  //       trigger: panel,
  //       start: "top top",
  //       pin: true,
  //       pinSpacing: false,
  //       scrub: true,
  //     });
  //   });
  // }, []);

  return (
    <MainLayout services={services}>
      <Head title="Home" />
      <Slider slides={sliders} />

      {/* <section className="panel h-screen"> */}
      <WhoWeAre />
      {/* </section> */}
      {/* <section className="panel h-screen"> */}
      <Services services={services} />
      {/* </section> */}
      <section className="panel h-screen">
        <Gallery galleries={gallery} />
      </section>
      {/* <section className="panel h-screen"> */}
      <Testimonials testimonials={testimonials} />
      {/* </section> */}
      {/* <section className="panel h-screen"> */}
      <News news={news} />
      {/* </section> */}
      {/* <section className="panel h-screen"> */}
      <MallHighlights />
      {/* </section> */}
      {/* <section className="panel h-screen"> */}
      <FeaturedTenants tenants={tenants} />
      {/* </section> */}
      {/* <section className="panel h-screen"> */}
      <EventsPromotions events={event} />
      {/* </section> */}
      {/* <section className="panel h-screen"> */}
      <VisitUs />
      {/* </section> */}
    </MainLayout>
  );
};

export default Home;
