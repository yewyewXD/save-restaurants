import React, { FC } from "react";
import HoverEffect from "../../../globalUI/Site/HoverEffect";
import { ISectionProps } from "../template1.types";

const HeroSection: FC<ISectionProps> = ({ handleOpenMenu }) => {
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
          handleOpenMenu(<div>hero background</div>);
        }}
        elementName="Background"
      />
      <div className="container flex justify-center items-center flex-col">
        <h1 className="text-5xl leading-none borderOnHover">
          <HoverEffect
            onClick={() => {
              handleOpenMenu(<div>hero title</div>);
            }}
            elementName="Title"
          />
          Main home section text
        </h1>
        <span className="my-6 leading-none borderOnHover">
          <HoverEffect
            onClick={() => {
              handleOpenMenu(<div>hero subtitle</div>);
            }}
            elementName="Subtitle"
          />
          Subtitle of home section
        </span>

        <div className="borderOnHover">
          <HoverEffect
            onClick={() => {
              handleOpenMenu(<div>Hero CTA button</div>);
            }}
            elementName="Button"
          />
          <button className="bg-primary px-9 py-3 rounded text-black hover:text-white hover:bg-black transition duration-200 font-bold">
            Button to Menu
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
