import React, { FC, ReactElement, useState } from "react";
import HoverEffect from "../../globalUI/Site/HoverEffect";
import SideMenu from "../../globalUI/Site/SideMenu";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import HeaderSection from "./components/HeaderSection";
import HeroSection from "./components/HeroSection";
import MenuSection from "./components/MenuSection";

const Template1: FC = () => {
  const [menuIsOpened, setMenuIsOpened] = useState(false);
  const [menuContent, setMenuContent] = useState(<div></div>);

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

  function handleOpenMenu(content: ReactElement) {
    setMenuIsOpened(true);
    setMenuContent(content);
  }

  return (
    <main>
      <SideMenu
        content={menuContent}
        isOpened={menuIsOpened}
        onCloseMenu={() => {
          setMenuIsOpened(false);
        }}
      />

      <HeaderSection handleOpenMenu={handleOpenMenu} />

      <HeroSection handleOpenMenu={handleOpenMenu} />

      <AboutSection handleOpenMenu={handleOpenMenu} />

      <MenuSection handleOpenMenu={handleOpenMenu} />

      {/* Contact */}
      <ContactSection handleOpenMenu={handleOpenMenu} />

      {/* Footer */}
      <footer className="pt-32 pb-24 w-100 justify-center items-center flex-col bg-black text-white">
        <div
          className={`flex justify-center items-center text-center mb-12 w-full`}
        >
          <div className="w-max borderOnHover">
            <HoverEffect onClick={handleOpenMenu} elementName="Social medias" />
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
              onClick={handleOpenMenu}
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
    </main>
  );
};

export default Template1;
