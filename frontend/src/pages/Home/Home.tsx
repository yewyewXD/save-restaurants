import React, { FC } from "react";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";

const Home: FC = () => {
  return (
    <main>
      <Navbar />
      <HeroSection />
    </main>
  );
};

export default Home;
