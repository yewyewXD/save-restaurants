import React, { FC } from "react";
import ImageUploader from "../../../globalUI/ImageUploader";
import HoverEffect from "../../../globalUI/Site/HoverEffect";
import { ISectionProps } from "../template1.types";

const AboutEdit: FC = () => (
  <>
    <h1 className="mb-6 text-2xl">About Section</h1>

    <div className="mb-8">
      <div className="mb-2 font-bold">Image</div>
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
  </>
);

const AboutSection: FC<ISectionProps> = ({ handleOpenMenu }) => {
  return (
    <section
      className="min-h-screen w-full grid grid-cols-2 borderOnHover"
      id="about-section"
    >
      <HoverEffect
        onClick={() => {
          handleOpenMenu(<AboutEdit />);
        }}
        elementName="About section"
      />
      <div className="p-10 flex flex-col justify-center items-start h-full ">
        <h1 className="text-4xl leading-none ">About</h1>
        <span className="text-gray-700 mt-6 ">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid
          perferendis deleniti eum alias unde et minus laborum perspiciatis
          accusantium voluptatibus. Lorem ipsum, dolor sit amet consectetur
          adipisicing elit. Excepturi, vitae.
        </span>
      </div>

      <div
        className="w-full h-full flex justify-center items-center bg-cover bg-no-repeat bg-center "
        style={{
          backgroundImage:
            "url(https://demo.kallyas.net/phaeton-restaurant-bar-pub/wp-content/uploads/sites/7/2016/07/about-chefs.jpg)",
        }}
      ></div>
    </section>
  );
};

export default AboutSection;
