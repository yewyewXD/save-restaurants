import React, { useState } from "react";
import HoverEffect from "../../../globalUI/Site/HoverEffect";
import { ISectionProps } from "../template1.types";
import AutosizeInput from "react-input-autosize";
import uniqid from "uniqid";

const MenuEdit: React.FC = () => {
  const [menuCategories, setMenuCategories] = useState([
    {
      id: uniqid(),
      title: "Menu 1",
      isEditingTitle: false,
      items: [
        { id: uniqid(), name: "food 1", price: "$1.00", isEditing: false },
        { id: uniqid(), name: "food 2", price: "$1.00", isEditing: false },
      ],
    },
    {
      id: uniqid(),
      title: "Menu 2",
      isEditingTitle: false,
      items: [
        { id: uniqid(), name: "food 1", price: "$1.00", isEditing: false },
        { id: uniqid(), name: "food 2", price: "$1.00", isEditing: false },
      ],
    },
  ]);

  function handleAddMenu() {
    setMenuCategories((prevMenus) => [
      ...prevMenus,
      {
        id: uniqid(),
        title: `New Menu`,
        isEditingTitle: false,
        items: [
          { id: uniqid(), name: "food 1", price: "$1.00", isEditing: false },
          { id: uniqid(), name: "food 2", price: "$1.00", isEditing: false },
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

  function handleEditMenuTitle(menuId: string, value: string | number) {
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

  function handleAddMenuItem(menuId: string) {
    setMenuCategories((prevMenus) => {
      return prevMenus.map((menu) => {
        if (menu.id === menuId) {
          return {
            ...menu,
            items: [
              ...menu.items,
              {
                id: uniqid(),
                name: `new food`,
                price: "$ 1.00",
                isEditing: false,
              },
            ],
          };
        } else {
          return menu;
        }
      });
    });
  }

  function handleRemoveMenuItem(menuId: string, itemId: string) {
    setMenuCategories((prevMenus) => {
      return prevMenus.map((menu) => {
        if (menu.id === menuId) {
          return {
            ...menu,
            items: menu.items.filter((item) => item.id !== itemId),
          };
        } else {
          return menu;
        }
      });
    });
  }

  function toggleEditMenuItem(menuId: string, itemId: string) {
    setMenuCategories((prevMenus) =>
      prevMenus.map((menu) => {
        if (menu.id !== menuId) return menu;

        return {
          ...menu,
          items: menu.items.map((item) => {
            if (item.id !== itemId) return item;

            return {
              ...item,
              isEditing: !item.isEditing,
            };
          }),
        };
      })
    );
  }

  function handleEditMenuItemTitle(
    menuId: string,
    itemId: string,
    value: string | number
  ) {
    setMenuCategories((prevMenus) =>
      prevMenus.map((menu) => {
        if (menu.id !== menuId) return menu;

        return {
          ...menu,
          items: menu.items.map((item) => {
            if (item.id !== itemId) return item;

            return {
              ...item,
              name: value.toString(),
            };
          }),
        };
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
                className="w-6 h-6 rounded-full cursor-pointer flex justify-center items-center border bg-red-600 border-red-600 hover:bg-red-400 hover:border-red-400 text-white transition duration-200 absolute right-3 top-3"
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
                      handleEditMenuTitle(menu.id, e.target.value);
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
                    key={item.id}
                    className="flex align-baseline mt-3 relative max-w-xl"
                  >
                    <div
                      className="w-4 h-4 rounded-full cursor-pointer flex justify-center items-center border bg-red-600 border-red-600 hover:bg-red-400 hover:border-red-400 text-white transition duration-200 absolute -left-2 top-1"
                      onClick={() => {
                        handleRemoveMenuItem(menu.id, item.id);
                      }}
                    >
                      -
                    </div>

                    <div>
                      {item.isEditing ? (
                        <AutosizeInput
                          autoFocus={true}
                          className="font-bold ml-3 border rounded border-black"
                          value={item.name}
                          onChange={(e) => {
                            handleEditMenuItemTitle(
                              menu.id,
                              item.id,
                              e.target.value
                            );
                          }}
                        />
                      ) : (
                        <b className="ml-3">{item.name}</b>
                      )}
                    </div>

                    <span className="flex-1 overflow-hidden">
                      .........................................................................................................................................................................................................................................................................................
                    </span>
                    <b className="mr-3">{item.price}</b>

                    <i
                      className={`icon-inno icon-inno_${
                        item.isEditing ? "check-bold text-blue-600" : "edit"
                      } text-xs -right-2 top-1 absolute cursor-pointer hover:text-blue-600 transition duration-200`}
                      onClick={() => {
                        toggleEditMenuItem(menu.id, item.id);
                      }}
                    />
                  </div>
                ))}

                <div className="px-3 flex justify-center items-center">
                  <div
                    className="rounded border border-black text-2xl text-center w-full py-1 hover:border-blue-600 hover:bg-blue-600 hover:text-white cursor-pointer transition duration-200"
                    onClick={() => {
                      handleAddMenuItem(menu.id);
                    }}
                  >
                    +
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

const MenuSection: React.FC<ISectionProps> = ({ handleOpenMenu }) => {
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
