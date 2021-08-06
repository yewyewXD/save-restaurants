import React from "react";

const HeroSection = () => {
  return (
    <section className="flex w-full h-screen justify-center items-center">
      <div>
        <h1>welcome to this website</h1>
        <div className="flex">
          <button>Login</button>
          <button className="ml-2">Register</button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
