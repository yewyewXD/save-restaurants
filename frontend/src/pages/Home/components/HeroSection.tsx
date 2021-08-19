import React from "react";

const HeroSection = () => {
  return (
    <section
      className="flex w-full justify-center items-center"
      style={{ height: "80vh" }}
    >
      <div className="grid grid-cols-5 container">
        <div className="flex col-span-2 flex-col items-start">
          <h1 className="leading-none text-6xl font-bold">Your Restaurant</h1>
          <h1 className="leading-none text-6xl font-bold">Our Care</h1>
          <div className="text-gray-500 my-4">
            We've programmed our very own IT system for restaurant businesses to
            go online effortlessly
          </div>
          <button className="bg-yellow-400 px-9 py-3 rounded text-black hover:text-white hover:bg-black transition duration-200 font-bold">
            Get Free Forever
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
