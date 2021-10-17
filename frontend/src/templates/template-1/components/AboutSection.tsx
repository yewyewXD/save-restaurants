import React, { FC } from "react";
import HoverEffect from "../../../globalUI/Site/HoverEffect";
import { ISectionProps } from "../template1.types";

const AboutSection: FC<ISectionProps> = ({ handleOpenMenu }) => {
  return (
    <section
      className="min-h-screen w-full grid grid-cols-2 "
      id="about-section"
    >
      <div className="p-10 flex flex-col justify-center items-start h-full ">
        <h1 className="text-4xl leading-none borderOnHover">
          <HoverEffect
            onClick={() => {
              handleOpenMenu(<div>about title</div>);
            }}
            elementName="Title"
          />
          About
        </h1>
        <p className="text-gray-700 mt-6 borderOnHover">
          <HoverEffect
            onClick={() => {
              handleOpenMenu(<div>about Description</div>);
            }}
            elementName="Description"
          />
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid
          perferendis deleniti eum alias unde et minus laborum perspiciatis
          accusantium voluptatibus. Lorem ipsum, dolor sit amet consectetur
          adipisicing elit. Excepturi, vitae.
        </p>
      </div>

      <div
        className="w-full h-full flex justify-center items-center bg-cover bg-no-repeat bg-center borderOnHover"
        style={{
          backgroundImage:
            "url(https://demo.kallyas.net/phaeton-restaurant-bar-pub/wp-content/uploads/sites/7/2016/07/about-chefs.jpg)",
        }}
      >
        <HoverEffect
          onClick={() => {
            handleOpenMenu(<div>about image</div>);
          }}
          elementName="Image"
        />
      </div>
    </section>
  );
};

export default AboutSection;
