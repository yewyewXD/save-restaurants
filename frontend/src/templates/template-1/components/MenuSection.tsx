import React, { useState } from "react";
import HoverEffect from "../../../globalUI/Site/HoverEffect";
import { ISectionProps } from "../template1.types";

const MenuEdit: React.FC = () => <div>something</div>;

const MenuSection: React.FC<ISectionProps> = ({ handleOpenMenu }) => {
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
        id: `menu-category-${prevMenus.length + 1}`,
        title: `New Menu`,
        items: [
          { name: "food 1", price: "$1.00" },
          { name: "food 2", price: "$1.00" },
        ],
      },
    ]);
  }

  function handleRemoveMenu(menuId: string) {
    setMenuCategories((prevMenus) =>
      prevMenus.filter((menu) => menu.id !== menuId)
    );
  }

  function handleAddMenuItem(menuId: string) {
    setMenuCategories((prevMenus) => {
      return prevMenus.map((menu) => {
        if (menu.id === menuId) {
          return {
            ...menu,
            items: [
              ...menu.items,
              { name: `food ${menu.items.length + 1}`, price: "$ 1.00" },
            ],
          };
        } else {
          return menu;
        }
      });
    });
  }

  return (
    <section
      className="w-full flex justify-center items-center flex-col py-20 borderOnHover"
      id="menu-section"
    >
      <HoverEffect
        onClick={() => {
          handleOpenMenu(<MenuEdit />);
        }}
        elementName="Menu Section"
      />
      <h1 className="text-4xl leading-none text-center mb-10">Menu</h1>
      <div className="grid grid-cols-3 gap-10 px-10 auto-rows-auto w-full text-center">
        {menuCategories.map((menu, index) => {
          return (
            <div
              key={menu.id}
              className="relative border-gray-700 border rounded p-4"
            >
              <div className="flex justify-center items-center">
                <h5 className="mb-6 w-max">{menu.title}</h5>
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
              </div>
            </div>
          );
        })}

        {/* <div className="flex items-center">
          <div
            className="flex justify-center items-center mt-3 border border-black rounded p-2 cursor-pointer h-36 w-full transition duration-200 hover:bg-gray-200"
            onClick={handleAddMenu}
          >
            <i className="icon-inno icon-inno_plus" />
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default MenuSection;
