import React, { FC, useEffect, useState } from "react";
import SideMenu from "./components/SideMenu";
import Scrollspy from "react-scrollspy";
import HoverEffect from "../HoverEffect";

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
    { name: "ABOUT US", link: "about-section" },
    { name: "MENU", link: "menu-section" },
    { name: "logo", link: "home-section", isLogo: true },
    { name: "CONTACT", link: "contact-section" },
    { name: "LOCATION", link: "location-section" },
  ];

  const menuCategories = [
    {
      title: "Menu 1",
      items: [
        { name: "food 1", price: "$1.00" },
        { name: "food 2", price: "$1.00" },
      ],
    },
    {
      title: "Menu 2",
      items: [
        { name: "food 1", price: "$1.00" },
        { name: "food 2", price: "$1.00" },
      ],
    },
  ];

  const socialMedias = [
    { name: "Facebook", link: "www.facebook.com" },
    { name: "Facebook", link: "www.facebook.com" },
    { name: "Facebook", link: "www.facebook.com" },
  ];

  return (
    <main>
      <SideMenu />

      {/* Navbar */}
      <div className="relative h-16">
        <header
          className={`fixed flex justify-center items-center h-16 w-full top-0 ${navBg}`}
        >
          <Scrollspy
            className="w-full grid grid-cols-5 text-center justify-center"
            items={navItems.map((navItem) => navItem.link)}
            currentClassName="underline"
          >
            {navItems.map((navItem) => (
              <li
                key={`navItem-${navItem.link}`}
                className="flex justify-center items-center"
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
      <section
        className="w-full flex justify-center items-center flex-col py-16 min-h-screen"
        id="menu-section"
      >
        <h1 className="text-4xl leading-none text-center mb-14 borderOnHover">
          <HoverEffect elementName="Title" />
          Menu
        </h1>
        <div className="grid grid-cols-3 gap-10 px-10 auto-rows-auto w-full text-center">
          {menuCategories.map((menu, index) => {
            return (
              <div key={`menu-${index}`}>
                <div className="flex justify-center items-center">
                  <h5 className="mb-6 borderOnHover w-max">
                    <HoverEffect elementName={`Title ${index + 1} `} />
                    {menu.title}
                  </h5>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {menu.items.map((item) => (
                    <div
                      key={`menuItem-${item.name}-${item.price}`}
                      className="flex align-baseline mt-3"
                    >
                      <b>{item.name}</b>
                      <span className="flex-1 overflow-hidden">
                        .........................................................................................................................
                      </span>
                      <b>{item.price}</b>
                    </div>
                  ))}

                  <div className="flex justify-center items-center mt-3 border border-black rounded p-2 cursor-pointer transition duration-200 hover:bg-gray-200">
                    <i className="icon-inno icon-inno_plus" />
                  </div>
                </div>
              </div>
            );
          })}

          <div className="flex items-center">
            <div className="flex justify-center items-center mt-3 border border-black rounded p-2 cursor-pointer h-36 w-full transition duration-200 hover:bg-gray-200">
              <i className="icon-inno icon-inno_plus" />
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section
        className="w-full grid grid-cols-3 py-16 min-h-screen border border-red-600 justify-center items-center"
        id="contact-section"
      >
        <div className="flex justify-center">
          <div className="h-full flex flex-col justify-start items-start p-10 pr-5 ">
            <h2 className="text-4xl leading-none text-center">Location</h2>
            <p className="my-6">
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
            <h2 className="text-4xl leading-none">Opening Hours</h2>
            <div className="mt-6 grid grid-cols-1 gap-3">
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
            <h2 className="text-4xl leading-none text-center">Find a table</h2>
            <p className="my-6">
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

      {/* Location */}
      <section
        className="w-full flex py-16 min-h-screen border border-red-600 justify-center items-center"
        id="location-section"
      >
        <div className="flex justify-center">
          <div className="h-full flex flex-col justify-start items-start p-10 pr-5 ">
            <h2 className="text-4xl leading-none text-center">Location</h2>
            <p className="my-6">
              1533, Jalan Sri Hijau 11, Taman Sri Hijau, 48000 Rawang, Selangor,
              Malaysia
            </p>
            <div className="grid grid-cols-2 gap-4">
              <span>google map</span>
              <span>waze</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-32 pb-24 w-100 justify-center items-center flex-col bg-black text-white">
        <div
          className={`w-full flex justify-center items-center text-center mb-12`}
        >
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
        <div className="text-center">
          {navItems
            .filter((navItem) => !navItem.isLogo)
            .map((navItem, index) => (
              <span key={`footerNav-${index}`} className="mx-4">
                {navItem.name}
              </span>
            ))}
        </div>
      </footer>
    </main>
  );
};

export default Template1;
