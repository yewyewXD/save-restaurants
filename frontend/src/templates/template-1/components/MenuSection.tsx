import React, { useState } from "react";
import HoverEffect from "../../../globalUI/Site/HoverEffect";
import { ISectionProps } from "../template1.types";
import AutosizeInput from "react-input-autosize";

const MenuEdit: React.FC = () => {
  const [menuCategories, setMenuCategories] = useState([
    {
      id: "menu-category-1",
      title: "Menu 1",
      isEditingTitle: false,
      items: [
        { name: "food 1", price: "$1.00" },
        { name: "food 2", price: "$1.00" },
      ],
    },
    {
      id: "menu-category-2",
      title: "Menu 2",
      isEditingTitle: false,
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
        isEditingTitle: false,
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

  function toggleMenuTitleEdit(menuId: string) {
    setMenuCategories((prevMenus) =>
      prevMenus.map((menu) => {
        if (menu.id === menuId) {
          return {
            ...menu,
            isEditingTitle: !menu.isEditingTitle,
          };
        } else {
          return menu;
        }
      })
    );
  }

  function editMenuTitle(menuId: string, value: string | number) {
    setMenuCategories((prevMenus) =>
      prevMenus.map((menu) => {
        if (menu.id === menuId) {
          return {
            ...menu,
            title: value.toString(),
          };
        } else {
          return menu;
        }
      })
    );
  }

  return (
    <>
      <h1 className="mb-6 text-2xl">Menu Section</h1>

      <div className="mb-8">
        <div className="mb-2 font-bold">Title</div>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Username"
        />
      </div>

      <div>
        <div className="mb-2 flex items-center">
          <span className="font-bold">Menu Categories</span>

          <div
            className="ml-2 w-6 h-6 rounded-full cursor-pointer flex justify-center items-center border border-black hover:bg-blue-600 hover:border-blue-600 hover:text-white transition duration-200"
            onClick={handleAddMenu}
          >
            +
          </div>
        </div>

        {menuCategories.map((menu, index) => {
          return (
            <div
              key={menu.id}
              className="relative border-gray-700 border rounded p-4 mb-6"
            >
              <div
                className="ml-2 w-6 h-6 rounded-full cursor-pointer flex justify-center items-center border bg-red-600 border-red-600 hover:bg-red-400 hover:border-red-400 text-white transition duration-200 absolute right-3 top-3"
                onClick={() => {
                  handleRemoveMenu(menu.id);
                }}
              >
                -
              </div>

              <div className="flex justify-center items-center mb-6">
                {menu.isEditingTitle ? (
                  <AutosizeInput
                    autoFocus={true}
                    className="font-title"
                    value={menu.title}
                    onBlur={() => {
                      toggleMenuTitleEdit(menu.id);
                    }}
                    onChange={(e) => {
                      editMenuTitle(menu.id, e.target.value);
                    }}
                  />
                ) : (
                  <h5 className="relative flex justify-center items-center">
                    {menu.title}
                    <i
                      className="icon-inno icon-inno_edit ml-3 text-xs cursor-pointer hover:text-blue-600 transition duration-200 absolute -right-6"
                      onClick={() => {
                        toggleMenuTitleEdit(menu.id);
                      }}
                    />
                  </h5>
                )}
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
      </div>
    </>
  );
};

const MenuSection: React.FC<ISectionProps> = ({ handleOpenMenu }) => {
  // function handleAddMenuItem(menuId: string) {
  //   setMenuCategories((prevMenus) => {
  //     return prevMenus.map((menu) => {
  //       if (menu.id === menuId) {
  //         return {
  //           ...menu,
  //           items: [
  //             ...menu.items,
  //             { name: `food ${menu.items.length + 1}`, price: "$ 1.00" },
  //           ],
  //         };
  //       } else {
  //         return menu;
  //       }
  //     });
  //   });
  // }

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
