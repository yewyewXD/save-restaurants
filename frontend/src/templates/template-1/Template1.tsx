import React, { FC, ReactElement, useState } from "react";
import HoverEffect from "../../globalUI/Site/HoverEffect";
import SideMenu from "../../globalUI/Site/SideMenu";
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

      {/* Navbar */}
      <HeaderSection handleOpenMenu={handleOpenMenu} />

      {/* Hero */}
      <HeroSection handleOpenMenu={handleOpenMenu} />

      {/* About Me  */}
      <section
        className="min-h-screen w-full grid grid-cols-2 "
        id="about-section"
      >
        <div className="p-10 flex flex-col justify-center items-start h-full ">
          <h1 className="text-4xl leading-none borderOnHover">
            <HoverEffect onClick={handleOpenMenu} elementName="Title" />
            About
          </h1>
          <p className="text-gray-700 mt-6 borderOnHover">
            <HoverEffect onClick={handleOpenMenu} elementName="Description" />
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
          <HoverEffect onClick={handleOpenMenu} elementName="Image" />
        </div>
      </section>

      {/* Menu */}
      <MenuSection handleOpenMenu={handleOpenMenu} />

      {/* Contact */}
      <section
        className="w-full grid grid-cols-3 py-16 min-h-screen border border-red-600 justify-center items-center"
        id="contact-section"
      >
        <div className="flex justify-center">
          <div className="h-full flex flex-col justify-start items-start p-10 pr-5 ">
            <h2 className="text-4xl leading-none text-center borderOnHover">
              <HoverEffect onClick={handleOpenMenu} elementName="Title" />
              Location
            </h2>
            <p className="my-6 borderOnHover">
              <HoverEffect onClick={handleOpenMenu} elementName="Description" />
              1533, Jalan Sri Hijau 11, Taman Sri Hijau, 48000 Rawang, Selangor,
              Malaysia
            </p>
            <div className="grid grid-cols-2 gap-4">
              <span>google map</span>
              <span>waze</span>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="h-full flex flex-col justify-start items-start p-10 px-5">
            <h2 className="text-4xl leading-none borderOnHover">
              <HoverEffect onClick={handleOpenMenu} elementName="Title" />
              Opening Hours
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-3 borderOnHover">
              <HoverEffect
                onClick={handleOpenMenu}
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
              <HoverEffect onClick={handleOpenMenu} elementName="Title" />
              Find a table
            </h2>
            <p className="my-6 borderOnHover">
              <HoverEffect onClick={handleOpenMenu} elementName="Description" />
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad quae
              repellat tempora assumenda, ipsam aliquid esse suscipit porro
              soluta dolores, voluptates deleniti rerum perspic
            </p>
            <a
              href="tel:0123456789"
              className="flex justify-center items-center"
            >
              <i className="icon-inno icon-inno_phone mr-2" />
              <span>call 012-3456789</span>
            </a>
          </div>
        </div>
      </section>

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
