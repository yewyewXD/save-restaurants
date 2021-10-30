import React, { useEffect, useState, FC } from "react";
import HoverEffect from "../../../globalUI/Site/HoverEffect";
import { ISectionProps } from "../template1.types";
import ImageUploader from "../../../globalUI/ImageUploader";

// Edit component - start
const HeaderEdit: FC = () => {
  return (
    <>
      <h1 className="mb-6 text-2xl">Header Section</h1>

      <div className="mb-8">
        <div className="mb-2 font-bold">Logo</div>
        <ImageUploader />
      </div>

      <div className="mb-2 font-bold">Navigation</div>
      <input
        className="mb-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        placeholder="Username"
        value="About Us"
      />

      <input
        className="mb-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        placeholder="Username"
        value="Menu"
      />

      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        placeholder="Username"
        value="Contact"
      />
    </>
  );
};
// Edit component - end

const HeaderSection: FC<ISectionProps> = ({ handleOpenMenu }) => {
  const [navBg, setNavBg] = useState("bg-white");
  useEffect(() => {
    function scrollListener(): void {
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
              handleOpenMenu(<HeaderEdit />);
            }}
            elementName={"Header Section"}
            showTextInner={true}
          />
          <div className="w-full grid grid-cols-5 text-center justify-center h-16">
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
          </div>
        </nav>
      </header>
    </div>
  );
};

export default HeaderSection;
