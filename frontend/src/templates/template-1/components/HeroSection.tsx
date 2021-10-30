import React, { FC, useCallback } from "react";
import ImageUploader from "../../../globalUI/forms/ImageUploader";
import HoverEffect from "../../../globalUI/Site/HoverEffect";
import { ISectionProps } from "../template1.types";

const HeroSection: FC<ISectionProps> = ({ handleOpenMenu }) => {
  const HeroEdit = useCallback(() => {
    return (
      <>
        <div className="mb-8">
          <div className="mb-2 font-bold">Background</div>
          <ImageUploader />
        </div>

        <div className="mb-8">
          <div className="mb-2 font-bold">Title</div>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Username"
          />
        </div>

        <div className="mb-8">
          <div className="mb-2 font-bold">Description</div>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Username"
          />
        </div>

        <div className="mb-8">
          <div className="mb-2 font-bold">Button</div>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Username"
          />
        </div>
      </>
    );
  }, []);

  return (
    <section
      style={{
        backgroundImage:
          "url(https://demo.kallyas.net/phaeton-restaurant-bar-pub/wp-content/uploads/sites/7/2016/06/slide1.jpg)",
      }}
      className="h-screen text-white w-full flex justify-center items-center bg-cover bg-no-repeat bg-center borderOnHover cursor-pointer"
      id="home-section"
    >
      <HoverEffect
        onClick={() => {
          handleOpenMenu(<HeroEdit />);
        }}
        elementName="Hero section"
      />
      <div className="container flex justify-center items-center flex-col">
        <h1 className="text-5xl leading-none ">Main home section text</h1>
        <span className="my-6 leading-none ">Subtitle of home section</span>

        <button className="bg-primary px-9 py-3 rounded text-black hover:text-white hover:bg-black transition duration-200 font-bold">
          Button to Menu
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
