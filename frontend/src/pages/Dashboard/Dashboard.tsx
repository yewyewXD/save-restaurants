import React, { FC, useMemo, Fragment } from "react";

const Dashboard: FC = () => {
  const navItems = useMemo(() => {
    return ["ABOUT US", "MENU", "RESERVATION", "CONTACT"];
  }, []);

  const logo = "LOGO";

  return (
    <main>
      {/* Navbar */}
      <header>
        <nav className="w-full grid grid-cols-6 text-center">
          {navItems.map((navItem, index) => {
            return (
              <Fragment key={`navItem-${index}`}>
                <span className="py-6">{navItem}</span>
                {((navItems.length <= 2 && index === navItems.length - 1) ||
                  (navItems.length > 2 && index === 1)) && (
                  <div
                    className={`${
                      navItems.length < 2 ? "col-start-3" : ""
                    } col-span-2 py-6`}
                  >
                    {logo}
                  </div>
                )}
              </Fragment>
            );
          })}
        </nav>
      </header>

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
          <div className="border border-red-600">
            <h5 className="mb-6">Menu 1</h5>
            <div className="grid grid-cols-1 gap-3">
              <span>1</span>
              <span>2</span>
              <span>3</span>
            </div>
          </div>
          <div className="border border-red-600">
            <h5 className="mb-6">Menu 2</h5>
            <div className="grid grid-cols-1 gap-3">
              <span>1</span>
              <span>2</span>
              <span>3</span>
            </div>
          </div>
          <div className="border border-red-600">
            <h5 className="mb-6">Menu 3</h5>
            <div className="grid grid-cols-1 gap-3">
              <span>1</span>
              <span>2</span>
              <span>3</span>
            </div>
          </div>
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
            <h2 className="text-4xl leading-none text-center">Opening Hours</h2>
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
        <div className="flex w-full text-center justify-center mb-12">
          <span className="mr-6">facebook</span>
          <span className="mr-6">twitter</span>
          <span>instagram</span>
        </div>
        <div className="grid grid-cols-4 gap-6 text-center">
          <span>About Us</span>
          <span>Our Menu</span>
          <span>Reservation</span>
          <span>Contact</span>
        </div>
      </footer>
    </main>
  );
};

export default Dashboard;
