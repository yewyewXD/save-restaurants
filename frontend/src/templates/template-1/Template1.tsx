import React, { FC, useEffect, useState } from "react";
import Scrollspy from "react-scrollspy";
import HoverEffect from "../HoverEffect";
import MenuSection from "./components/MenuSection";

const Template1: FC = () => {
  const [navBg, setNavBg] = useState("bg-white");
  useEffect(() => {
    function scrollListener() {
      const navBgClass = window.scrollY < 1 ? "bg-white" : "bg-primary z-10";
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

  const socialMedias = [
    { name: "Facebook", link: "www.facebook.com" },
    { name: "Facebook", link: "www.facebook.com" },
    { name: "Facebook", link: "www.facebook.com" },
  ];

  return (
    <main>
      {/* Navbar */}
      <div className="relative h-16">
        <header
          className={`fixed flex justify-center items-center h-16 w-full top-0 ${navBg}`}
        >
          <div className="borderOnHover w-full">
            <HoverEffect elementName={"Navigation bar"} showTextInner={true} />
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
          </div>
        </header>
      </div>

      {/* Hero */}
      <section
        style={{
          backgroundImage:
            "url(https://demo.kallyas.net/phaeton-restaurant-bar-pub/wp-content/uploads/sites/7/2016/06/slide1.jpg)",
        }}
        className="h-screen text-white w-full flex justify-center items-center bg-cover bg-no-repeat bg-center borderOnHover cursor-pointer"
        id="home-section"
      >
        <HoverEffect elementName="Background" />
        <div className="container flex justify-center items-center flex-col">
          <h1 className="text-5xl leading-none borderOnHover">
            <HoverEffect elementName="Title" />
            Main home section text
          </h1>
          <p className="my-6 leading-none borderOnHover">
            <HoverEffect elementName="Subtitle" />
            Subtitle of home section
          </p>

          <div className="borderOnHover">
            <HoverEffect elementName="Button" />
            <button className="bg-yellow-400 px-9 py-3 rounded text-black hover:text-white hover:bg-black transition duration-200 font-bold">
              Button to Menu
            </button>
          </div>
        </div>
      </section>

      {/* About Me  */}
      <section
        className="min-h-screen w-full grid grid-cols-2 "
        id="about-section"
      >
        <div className="p-10 flex flex-col justify-center items-start h-full ">
          <h1 className="text-4xl leading-none borderOnHover">
            <HoverEffect elementName="Title" />
            About
          </h1>
          <p className="text-gray-700 mt-6 borderOnHover">
            <HoverEffect elementName="Description" />
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
          <HoverEffect elementName="Image" />
        </div>
      </section>

      {/* Menu */}
      <MenuSection />

      {/* Contact */}
      <section
        className="w-full grid grid-cols-3 py-16 min-h-screen border border-red-600 justify-center items-center"
        id="contact-section"
      >
        <div className="flex justify-center">
          <div className="h-full flex flex-col justify-start items-start p-10 pr-5 ">
            <h2 className="text-4xl leading-none text-center borderOnHover">
              <HoverEffect elementName="Title" />
              Location
            </h2>
            <p className="my-6 borderOnHover">
              <HoverEffect elementName="Description" />
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
              <HoverEffect elementName="Title" />
              Opening Hours
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-3 borderOnHover">
              <HoverEffect elementName="Active hours" />

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
              <HoverEffect elementName="Title" />
              Find a table
            </h2>
            <p className="my-6 borderOnHover">
              <HoverEffect elementName="Description" />
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
            <HoverEffect elementName="Social medias" />
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
            <HoverEffect elementName="Navigation bar" />
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
