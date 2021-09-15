import React, { Fragment, FC, useState } from "react";
import { slide as Menu } from "react-burger-menu";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const SiteNew: FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = [
    { name: "ABOUT US", link: "#about" },
    { name: "MENU", link: "#menu" },
    { name: "RESERVATION", link: "#reservation" },
    { name: "CONTACT", link: "#contact" },
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
      {/* edit button */}
      <Menu
        right={true}
        onStateChange={({ isOpen }) => {
          setIsSidebarOpen(isOpen);
        }}
        customBurgerIcon={
          isSidebarOpen ? (
            false
          ) : (
            <i className="icon-inno icon-inno_edit text-white" />
          )
        }
      >
        <Tabs>
          <TabList>
            <Tab>Title 1</Tab>
            <Tab>Title 2</Tab>
          </TabList>

          <TabPanel>
            <div className="flex flex-col">
              <a id="home" href="/">
                Home
              </a>
              <a id="about" href="/about">
                About
              </a>
              <a id="contact" href="/contact">
                Contact
              </a>
            </div>
          </TabPanel>
          <TabPanel>
            <h2>Any content 2</h2>
          </TabPanel>
        </Tabs>
      </Menu>

      {/* Navbar */}
      <div className="relative h-20 w-full">
        <header className="fixed flex justify-center items-center h-20 w-full top-0">
          <nav className="w-full grid grid-cols-6 text-center">
            {navItems.map((navItem, index) => {
              return (
                <Fragment key={`navItem-${index}`}>
                  <a href={navItem.link} className="py-6">
                    {navItem.name}
                  </a>
                  {((navItems.length <= 2 && index === navItems.length - 1) ||
                    (navItems.length > 2 && index === 1)) && (
                    <div
                      className={`${
                        navItems.length < 2 ? "col-start-3" : ""
                      } col-span-2 py-6`}
                    >
                      LOGO
                    </div>
                  )}
                </Fragment>
              );
            })}
          </nav>
        </header>
      </div>

      {/* Hero */}
      <section className="h-screen w-full flex justify-center items-center border-t border-b border-red-700">
        <div className="container flex justify-center items-center flex-col">
          <h1 className="text-5xl leading-none">Main home section text</h1>
          <p className="text-gray-700 my-6 leading-none">
            Subtitle of home section
          </p>
          <button className="px-9 py-3 rounded border border-black">
            Button to Menu
          </button>
        </div>
      </section>

      {/* About Me  */}
      <section className="h-screen w-full grid grid-cols-2 border-t border-b border-red-700">
        <div className="p-10 flex flex-col justify-center items-start h-full border border-red-600">
          <h1 className="text-4xl leading-none">About</h1>
          <p className="text-gray-700 mt-6">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid
            perferendis deleniti eum alias unde et minus laborum perspiciatis
            accusantium voluptatibus. Lorem ipsum, dolor sit amet consectetur
            adipisicing elit. Excepturi, vitae.
          </p>
        </div>

        <div className="flex justify-center items-center">image</div>
      </section>

      {/* Menu */}
      <section className="w-full border-t border-b border-red-700 py-16">
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
      <section className="w-full border-t border-b grid grid-cols-3 border-red-700 py-16">
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
export default SiteNew;
