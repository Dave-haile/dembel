import { Head, usePage } from "@inertiajs/react";
import MainLayout from "../Shared/MainLayout";
import AboutHero from "./components/AboutHero";
import MallStory from "./components/MallStory";
import MissionValues from "./components/MissionValues";
import Facilities from "./components/Facilities";
import Team from "./components/Team";
import Stats from "./components/Stats";
import Testimonials from "./components/Testimonials";
import Location from "./components/Location";

const About = () => {
  const { aboutContent, testimonials } = usePage().props;
  const aboutHero = aboutContent.find((item) => item.component === "AboutHero");
  const aboutMallStory = aboutContent.find((item) => item.component === "MallStory");
  const aboutMissionValues = aboutContent.find((item) => item.component === "MissionValues");
  const aboutFacilities = aboutContent.find((item) => item.component === "Facilities");
  const aboutTeam = aboutContent.find((item) => item.component === "Team");
  const aboutStats = aboutContent.find((item) => item.component === "Stats");
  const aboutLocation = aboutContent.find((item) => item.component === "Location");
  const aboutWhoWeAre = aboutContent.find((item) => item.component === "WhoWeAre");
  return (
    <MainLayout>
      <Head title="About" />
      <AboutHero hero={aboutHero} />
      <MallStory mallStory={aboutMallStory} whoWeAre={aboutWhoWeAre} />
      <MissionValues missionValues={aboutMissionValues} />
      <Facilities facilities={aboutFacilities} />
      <Team team={aboutTeam} />
      <Stats stats={aboutStats} />
      <Testimonials testimonials={testimonials} />
      <Location location={aboutLocation} />
    </MainLayout>
  );
};

export default About;