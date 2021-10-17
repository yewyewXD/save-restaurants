import React, { FC, ReactElement, useState } from "react";
import SideMenu from "../../globalUI/Site/SideMenu";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import FooterSection from "./components/FooterSection";
import HeaderSection from "./components/HeaderSection";
import HeroSection from "./components/HeroSection";
import MenuSection from "./components/MenuSection";

const Template1: FC = () => {
  const [menuIsOpened, setMenuIsOpened] = useState(false);
  const [menuContent, setMenuContent] = useState(<div></div>);

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

      <ContactSection handleOpenMenu={handleOpenMenu} />

      <FooterSection handleOpenMenu={handleOpenMenu} />
    </main>
  );
};

export default Template1;
