import React from "react";
import { Head } from "@inertiajs/react";
import MainLayout from "../Shared/MainLayout";
import WhoWeAre from "./WhoWeAre";
import DiningAndEntertainment from "./DiningAndEntertainment";
import Gallery from "./Gallery";
import Testimonials from "./Testimonials";
import MallHighlights from "./MallHighlights";
import FeaturedTenants from "./FeaturedTenants";
import VisitUs from "./VisitUs";
import EventsAndNews from "./EventsPromotions";
import HeroSlider from "./Slider";

const Home = ({
  sliders,
  testimonials,
  services,
  gallery,
  event,
  tenants,
  restaurant,
  about,
  aboutDine,
}) => {
  return (
    <MainLayout services={services}>
      <Head title="Home" />
      <HeroSlider slides={sliders} />
      <div className="section-wrapper" data-gsap-safe>
        <WhoWeAre about={about} />
      </div>

      <div className="section-wrapper" data-gsap-safe>
        <FeaturedTenants tenants={tenants} />
      </div>

      <div className="section-wrapper" data-gsap-safe>
        <DiningAndEntertainment restaurant={restaurant} aboutDine={aboutDine} />
      </div>

      <div className="section-wrapper" data-gsap-safe>
        <EventsAndNews events={event} />
      </div>

      <div className="section-wrapper" data-gsap-safe>
        <Gallery galleries={gallery} />
      </div>

      <div className="section-wrapper" data-gsap-safe>
        <Testimonials testimonials={testimonials} />
      </div>

      <div className="section-wrapper" data-gsap-safe>
        <MallHighlights />
      </div>

      <div className="section-wrapper" data-gsap-safe>
        <VisitUs />
      </div>

    </MainLayout>
  );
};

export default Home;
