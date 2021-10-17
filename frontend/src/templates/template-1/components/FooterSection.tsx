import React, { FC } from "react";
import HoverEffect from "../../../globalUI/Site/HoverEffect";
import { ISectionProps } from "../template1.types";

const FooterSection: FC<ISectionProps> = ({ handleOpenMenu }) => {
  const navItems = [
    { name: "logo", link: "home-section", isLogo: true },
    { name: "About Us", link: "about-section" },
    { name: "Menu", link: "menu-section" },
    { name: "Contact", link: "contact-section" },
  ];

  const socialMedias = [
    { name: "Facebook", link: "www.facebook.com" },
    { name: "Facebook", link: "www.facebook.com" },
    { name: "Facebook", link: "www.facebook.com" },
  ];

  return (
    <footer className="pt-32 pb-24 w-100 justify-center items-center flex-col bg-black text-white">
      <div
        className={`flex justify-center items-center text-center mb-12 w-full`}
      >
        <div className="w-max borderOnHover">
          <HoverEffect
            onClick={() => {
              handleOpenMenu(<div>social medias</div>);
            }}
            elementName="Social medias"
          />
          {socialMedias.map((socialMedia, index) => (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={socialMedia.link}
              className={"mx-6"}
              key={`social-${index}`}
            >
              {socialMedia.name}
            </a>
          ))}
        </div>
      </div>

      <div className={`flex justify-center items-center text-center w-full`}>
        <div className="borderOnHover w-max">
          <HoverEffect
            onClick={() => {
              handleOpenMenu(<div>nav content</div>);
            }}
            elementName="Navigation bar"
          />
          {navItems
            .filter((navItem) => !navItem.isLogo)
            .map((navItem, index) => (
              <span key={`footerNav-${index}`} className="mx-4">
                {navItem.name}
              </span>
            ))}
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
