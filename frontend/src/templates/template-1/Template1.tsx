import React, { FC, useEffect, useState } from "react";
import SideMenu from "./components/SideMenu";
import Scrollspy from "react-scrollspy";

const Template1: FC = () => {
  const [navBg, setNavBg] = useState("bg-white");
  useEffect(() => {
    function scrollListener() {
      const navBgClass = window.scrollY < 100 ? "bg-white" : "bg-primary";
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
    { name: "RESERVATION", link: "reservation-section" },
    { name: "CONTACT", link: "contact-section" },
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
    {
      title: "Menu 3",
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
      <header
        className={`fixed flex justify-center items-center h-20 w-full top-0 ${navBg}`}
      >
        <Scrollspy
          className="w-full grid grid-cols-5 text-center justify-center"
          offset={-30}
          items={navItems.map((navItem) => navItem.link)}
          currentClassName="bg-primary"
        >
          {navItems.map((navItem) => (
            <li key={`navItem-${navItem.link}`}>
              <a className="py-6" href={`#${navItem.link}`}>
                {navItem.isLogo ? "image" : navItem.name}
              </a>
            </li>
          ))}
        </Scrollspy>
      </header>

      {/* Hero */}
      <section
        style={{
          backgroundImage:
            "url(https://demo.kallyas.net/phaeton-restaurant-bar-pub/wp-content/uploads/sites/7/2016/06/slide1.jpg)",
        }}
        className="h-screen text-white w-full flex justify-center items-center border-t border-b border-red-700 bg-cover bg-no-repeat bg-center"
        id="home-section"
      >
        <div className="container flex justify-center items-center flex-col">
          <h1 className="text-5xl leading-none">Main home section text</h1>
          <p className="my-6 leading-none">Subtitle of home section</p>
          <button className="bg-yellow-400 px-9 py-3 rounded text-black hover:text-white hover:bg-black transition duration-200 font-bold">
            Button to Menu
          </button>
        </div>
      </section>

      {/* About Me  */}
      <section
        className="h-screen w-full grid grid-cols-2 border-t border-b border-red-700"
        id="about-section"
      >
        <div className="p-10 flex flex-col justify-center items-start h-full border border-red-600">
          <h1 className="text-4xl leading-none">About</h1>
          <p className="text-gray-700 mt-6">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid
            perferendis deleniti eum alias unde et minus laborum perspiciatis
            accusantium voluptatibus. Lorem ipsum, dolor sit amet consectetur
            adipisicing elit. Excepturi, vitae.
          </p>
        </div>

        <div
          className="w-full h-full flex justify-center items-center bg-cover bg-no-repeat bg-center"
          style={{
            backgroundImage:
              "url(https://demo.kallyas.net/phaeton-restaurant-bar-pub/wp-content/uploads/sites/7/2016/07/about-chefs.jpg)",
          }}
        ></div>
      </section>

      {/* Menu */}
      <section
        className="w-full border-t border-b border-red-700 py-16"
        id="menu-section"
      >
        <h1 className="text-4xl leading-none text-center mb-14">Menu</h1>
        <div className="grid grid-cols-3 gap-6 auto-rows-auto w-full text-center">
          {menuCategories.map((menu, index) => (
            <div key={`menu-${index}`} className="border border-red-600">
              <h5 className="mb-6">{menu.title}</h5>
              <div className="grid grid-cols-1 gap-3">
                {menu.items.map((item) => (
                  <span key={`menuItem-${item.name}-${item.price}`}>
                    {item.name} - {item.price}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section
        className="w-full border-t border-b grid grid-cols-3 border-red-700 py-16"
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
              className={index === socialMedias.length - 1 ? "" : "mr-6"}
              key={`social-${index}`}
            >
              {socialMedia.name}
            </a>
          ))}
        </div>
        <div className="grid grid-cols-4 gap-6 text-center">
          {navItems.map((navItem, index) => (
            <span key={`footerNav-${index}`}>{navItem.name}</span>
          ))}
        </div>
      </footer>
    </main>
  );
};

export default Template1;
