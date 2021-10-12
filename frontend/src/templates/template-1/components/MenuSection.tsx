import React from "react";
import HoverEffect from "../../HoverEffect";

const MenuSection = () => {
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

  return (
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
  );
};

export default MenuSection;
