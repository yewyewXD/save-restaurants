import React, { PropsWithChildren, FC } from "react";

interface IProps {
  isOpened: boolean;
  onCloseMenu: () => void;
}

const SideMenu: FC<PropsWithChildren<IProps>> = ({
  isOpened,
  onCloseMenu,
  children,
}) => {
  return (
    <>
      {isOpened && (
        <div
          onClick={onCloseMenu}
          className="bg-black w-full fixed h-full z-40 bg-opacity-30"
        ></div>
      )}

      <div
        className={`h-screen w-72 transition duration-200 transform translate-x-${
          isOpened ? "0" : "72"
        } fixed top-0 right-0 z-50`}
      >
        <div className="relative w-full h-full p-6 pt-10 bg-white">
          <span
            className="absolute top-3 right-3 cursor-pointer"
            onClick={onCloseMenu}
          >
            &#10005;
          </span>
          testing
        </div>
      </div>
    </>
  );
};

export default SideMenu;
