import React, { ReactElement, useEffect, useState } from "react";
import HoverEffect from "../../../globalUI/Site/HoverEffect";
import Scrollspy from "react-scrollspy";

interface IProps {
  handleOpenMenu: (content: ReactElement) => void;
}

const HeaderSection: React.FC<IProps> = ({ handleOpenMenu }) => {
  const [navBg, setNavBg] = useState("bg-white");
  useEffect(() => {
    function scrollListener() {
      const navBgClass = window.scrollY < 1 ? "bg-white" : "bg-primary z-30";
      setNavBg(navBgClass);
    }

    document.addEventListener("scroll", scrollListener);
    return () => {
      document.removeEventListener("scroll", scrollListener);
    };
  }, [navBg]);

  const navItems = [
    { name: "logo", link: "home-section", isLogo: true },
    { name: "About Us", link: "about-section" },
    { name: "Menu", link: "menu-section" },
    { name: "Contact", link: "contact-section" },
  ];

  return (
    <div className="relative h-16">
      <header
        className={`fixed flex justify-center items-center h-16 w-full top-0 ${navBg}`}
      >
        <nav className="borderOnHover w-full">
          <HoverEffect
            onClick={() => {
              handleOpenMenu(<div>navbar content</div>);
            }}
            elementName={"Navigation bar"}
            showTextInner={true}
          />
          <Scrollspy
            className="w-full grid grid-cols-5 text-center justify-center  h-16"
            items={navItems.map((navItem) => navItem.link)}
            currentClassName="underline"
          >
            {navItems.map((navItem) => (
              <li
                key={`navItem-${navItem.link}`}
                className="flex justify-center items-center h-16"
              >
                <a className="py-6" href={`#${navItem.link}`}>
                  {navItem.isLogo ? (
                    <img
                      src="/images/netlify.png"
                      alt=""
                      style={{ maxWidth: "40px" }}
                    />
                  ) : (
                    navItem.name
                  )}
                </a>
              </li>
            ))}
          </Scrollspy>
        </nav>
      </header>
    </div>
  );
};

export default HeaderSection;
