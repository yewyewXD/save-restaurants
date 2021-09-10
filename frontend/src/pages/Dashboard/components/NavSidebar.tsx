import React, { FC } from "react";

const NavSidebar: FC = () => {
  return (
    <div
      className="p-4 h-screen fixed left-0 top-0 bg-black text-white"
      style={{ width: "25%" }}
    >
      <div>Eatery</div>

      <div className="mt-14">
        <div className="mb-3 border rounded-xl p-5 flex border-red-600 items-center">
          <i className="icon-inno icon-inno_clock mr-3" />
          Profile
        </div>

        <div className="mb-3 border rounded-xl p-5 flex border-red-600 items-center">
          <i className="icon-inno icon-inno_clock mr-3" />
          Sites
        </div>
      </div>
    </div>
  );
};

export default NavSidebar;
