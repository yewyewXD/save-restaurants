import React from "react";
import { Link } from "react-router-dom";

const GetStartedSection = () => {
  return (
    <section className="text-center w-full py-16 bg-primary">
      <h1 className="leading-none text-6xl font-bold mb-8">
        Ready to get started?
      </h1>
      <div className="flex justify-center items-center">
        <Link
          to="/dashboard"
          className="bg-blue-600 px-11 py-3 rounded text-white hover:bg-black  transition duration-200 font-bold mr-4 border-2 border-blue-600 hover:border-black"
        >
          Get Free Forever
        </Link>

        <Link
          to="/login"
          className=" text-black px-11 py-3 rounded  hover:bg-black transition duration-200 font-bold mr-4  hover:text-white border-2 border-black"
        >
          Login
        </Link>
      </div>
    </section>
  );
};

export default GetStartedSection;
