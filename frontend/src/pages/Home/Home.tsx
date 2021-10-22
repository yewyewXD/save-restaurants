import React, { FC } from "react";
import CountUpSection from "./components/CountUpSection";
import Footer from "./components/Footer";
import GetStartedSection from "./components/GetStartedSection";
import HeroSection from "./components/HeroSection";
import HowItWorksSection from "./components/HowItWorksSection";
import IntegrationSection from "./components/IntegrationSection";
import Navbar from "./components/Navbar";
// import TestimonialSection from "./components/TestimonialSection";

const Home: FC = () => {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <CountUpSection />
      <HowItWorksSection />
      <GetStartedSection />
      <IntegrationSection />
      {/* <TestimonialSection /> */}
      <Footer />
    </main>
  );
};

export default Home;
