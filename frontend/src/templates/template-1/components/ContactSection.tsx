import React, { FC } from "react";
import HoverEffect from "../../../globalUI/Site/HoverEffect";
import { ISectionProps } from "../template1.types";

const ContactSection: FC<ISectionProps> = ({ handleOpenMenu }) => {
  return (
    <section
      className="w-full grid grid-cols-3 py-16 min-h-screen border border-red-600 justify-center items-center"
      id="contact-section"
    >
      <div className="flex justify-center">
        <div className="h-full flex flex-col justify-start items-start p-10 pr-5 ">
          <h2 className="text-4xl leading-none text-center borderOnHover">
            <HoverEffect
              onClick={() => {
                handleOpenMenu(<div>location title</div>);
              }}
              elementName="Title"
            />
            Location
          </h2>
          <span className="my-6 borderOnHover">
            <HoverEffect
              onClick={() => {
                handleOpenMenu(<div>location content</div>);
              }}
              elementName="Description"
            />
            1533, Jalan Sri Hijau 11, Taman Sri Hijau, 48000 Rawang, Selangor,
            Malaysia
          </span>
          <div className="grid grid-cols-2 gap-4">
            <span>google map</span>
            <span>waze</span>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="h-full flex flex-col justify-start items-start p-10 px-5">
          <h2 className="text-4xl leading-none borderOnHover">
            <HoverEffect
              onClick={() => {
                handleOpenMenu(<div>active title</div>);
              }}
              elementName="Title"
            />
            Opening Hours
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-3 borderOnHover">
            <HoverEffect
              onClick={() => {
                handleOpenMenu(<div>active content</div>);
              }}
              elementName="Active hours"
            />

            <div>
              <div className="font-bold">Monday - Friday</div>
              <div>8am - 8pm</div>
            </div>
            <div>
              <div className="font-bold">Saturday - Sunday</div>
              <div>10am - 6pm</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="h-full flex flex-col justify-start items-start p-10 pl-5">
          <h2 className="text-4xl leading-none text-center borderOnHover">
            <HoverEffect
              onClick={() => {
                handleOpenMenu(<div>booking title </div>);
              }}
              elementName="Title"
            />
            Find a table
          </h2>
          <span className="my-6 borderOnHover">
            <HoverEffect
              onClick={() => {
                handleOpenMenu(<div>booking content</div>);
              }}
              elementName="Description"
            />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad quae
            repellat tempora assumenda, ipsam aliquid esse suscipit porro soluta
            dolores, voluptates deleniti rerum perspic
          </span>
          <a href="tel:0123456789" className="flex justify-center items-center">
            <i className="icon-inno icon-inno_phone mr-2" />
            <span>call 012-3456789</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
