import React from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section
      className="flex w-full justify-center items-center"
      style={{ minHeight: "80vh" }}
    >
      <div className="grid md:grid-cols-5 grid-cols-1 container">
        <div className="flex md:col-span-2 col-span-full flex-col md:items-start items-center md:text-left text-center justify-center">
          <h1 className="leading-none md:text-6xl text-5xl font-bold">
            Your Restaurant
          </h1>
          <h1 className="leading-none md:text-6xl text-5xl font-bold">
            Our Care
          </h1>
          <div className="text-gray-700 my-4">
            We've programmed our very own IT system for restaurant businesses to
            go online effortlessly
          </div>
          <Link
            to="/dashboard"
            className="bg-blue-600 text-white px-9 py-3 rounded hover:text-white hover:bg-black transition duration-200 font-bold"
          >
            Get Free Forever
          </Link>
        </div>

        <div className="col-span-3 flex justify-end items-center">
          <img src="/images/hero-img.svg" className="w-96" alt="" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
