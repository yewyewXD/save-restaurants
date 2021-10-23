import React, { FC } from "react";

interface Props {
  currentTab: string;
  setCurrentTab: Function;
}

const NavSidebar: FC<Props> = ({ currentTab, setCurrentTab }) => {
  const sidebarTabs = [{ name: "Profile" }, { name: "Sites" }];

  return (
    //  w-52 xl:w-64 2xl:w-80
    <div className="relative min-h-screen h-full w-64">
      <div className="h-screen fixed left-0 top-0 bg-black text-white w-64">
        <div className="h-12"></div>

        <div className="p-4">
          {sidebarTabs.map((tab, index) => (
            <div
              onClick={() => {
                setCurrentTab(tab.name);
              }}
              className={`mb-3 border rounded-xl p-4 flex items-center ${
                currentTab === tab.name ? "border-red-600" : ""
              }`}
              key={`sidebar-${index}`}
            >
              <i className="icon-inno icon-inno_clock mr-3" />
              {tab.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavSidebar;
