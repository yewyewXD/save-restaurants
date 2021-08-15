import React, { FC } from "react";
import HeroSection from "./components/HeroSection";
import IntegrationSection from "./components/IntegrationSection";
import Navbar from "./components/Navbar";

const Home: FC = () => {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <IntegrationSection />
    </main>
  );
};

export default Home;
