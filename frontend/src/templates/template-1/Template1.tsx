import React, { FC, ReactElement, useCallback } from "react";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import FooterSection from "./components/FooterSection";
import HeaderSection from "./components/HeaderSection";
import HeroSection from "./components/HeroSection";
import MenuSection from "./components/MenuSection";
import { useModal } from "../../context/modal/ModalState";

const Template1: FC = () => {
  const { handleShowModal } = useModal();

  const handleOpenMenu = useCallback((content: ReactElement) => {
    handleShowModal(content);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main>
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
