import React, { useState } from "react";
import HoverEffect from "../../HoverEffect";

const MenuSection = () => {
  const [menuCategories, setMenuCategories] = useState([
    {
      id: "menu-category-1",
      title: "Menu 1",
      items: [
        { name: "food 1", price: "$1.00" },
        { name: "food 2", price: "$1.00" },
      ],
    },
    {
      id: "menu-category-2",
      title: "Menu 2",
      items: [
        { name: "food 1", price: "$1.00" },
        { name: "food 2", price: "$1.00" },
      ],
    },
  ]);

  function handleAddMenu() {
    setMenuCategories((prevMenus) => [
      ...prevMenus,
      {
        id: `menu-category-${prevMenus.length + 2}`,
        title: `New Menu`,
        items: [
          { name: "food 1", price: "$1.00" },
          { name: "food 2", price: "$1.00" },
        ],
      },
    ]);
  }

  function handleRemoveMenu(id: string) {
    setMenuCategories((prevMenus) =>
      prevMenus.filter((menu) => menu.id !== id)
    );
  }

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
            <div key={menu.id} className="relative hover:bg-gray-200">
              <span
                className="absolute top-0 right-0 cursor-pointer text-xl h-5 w-5 flex justify-center items-center hover:text-red-600 transition duration-200"
                title="remove"
                onClick={() => {
                  handleRemoveMenu(menu.id);
                }}
              >
                <b>&#10005;</b>
              </span>

              <div className="flex justify-center items-center">
                <h5 className="mb-6 borderOnHover w-max">
                  <HoverEffect elementName={`Title ${index + 1} `} />
                  {menu.title}
                </h5>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {menu.items.map((item) => (
                  <div
                    key={`${menu.id}-${item.name}`}
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
          <div
            className="flex justify-center items-center mt-3 border border-black rounded p-2 cursor-pointer h-36 w-full transition duration-200 hover:bg-gray-200"
            onClick={handleAddMenu}
          >
            <i className="icon-inno icon-inno_plus" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MenuSection;
