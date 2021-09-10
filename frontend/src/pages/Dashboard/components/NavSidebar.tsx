import React, { FC } from "react";

interface Props {
  currentTab: string;
  setCurrentTab: React.SetStateAction<any>;
}

const NavSidebar: FC<Props> = ({ currentTab, setCurrentTab }) => {
  const sidebarTabs = [{ name: "Profile" }, { name: "Sites" }];

  return (
    <div className="relative min-h-screen h-full w-60">
      <div className="p-4 h-screen fixed left-0 top-0 bg-black text-white w-60">
        <div>Eatery</div>

        <div className="mt-8">
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
