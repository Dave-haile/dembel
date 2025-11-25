import React from "react";
import { Head } from "@inertiajs/react";
import MainLayout from "../Shared/MainLayout";
import Slider from "./Slider";
import WhoWeAre from "./WhoWeAre";
import DiningAndEntertainment from "./DiningAndEntertainment";
import Gallery from "./Gallery";
import Testimonials from "./Testimonials";
import MallHighlights from "./MallHighlights";
import FeaturedTenants from "./FeaturedTenants";
import VisitUs from "./VisitUs";
import EventsAndNews from "./EventsPromotions";

const Home = ({
  sliders,
  testimonials,
  services,
  gallery,
  event,
  tenants,
  restaurant,
  about,
}) => {

  return (
    <MainLayout services={services}>
      <Head title="Home" />
      <Slider slides={sliders} />
      <WhoWeAre about={about} />
      <FeaturedTenants tenants={tenants} />
      <DiningAndEntertainment restaurant={restaurant} />
      <EventsAndNews events={event} />
      <section className="panel h-screen">
        <Gallery galleries={gallery} />
      </section>
      <Testimonials testimonials={testimonials} />
      <MallHighlights />
      <VisitUs />
    </MainLayout>
  );
};

export default Home;
