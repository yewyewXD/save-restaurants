import React, { FC } from "react";
import CountUpSection from "./components/CountUpSection";
import HeroSection from "./components/HeroSection";
import IntegrationSection from "./components/IntegrationSection";
import Navbar from "./components/Navbar";

const Home: FC = () => {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <CountUpSection />
      <IntegrationSection />
    </main>
  );
};

export default Home;
