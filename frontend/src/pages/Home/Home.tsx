import React, { FC } from "react";
import CountUpSection from "./components/CountUpSection";
import GetStartedSection from "./components/GetStartedSection";
import HeroSection from "./components/HeroSection";
import IntegrationSection from "./components/IntegrationSection";
import Navbar from "./components/Navbar";
import TestimonialSection from "./components/TestimonialSection";

const Home: FC = () => {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <TestimonialSection />
      <CountUpSection />
      <IntegrationSection />
      <GetStartedSection />
    </main>
  );
};

export default Home;
