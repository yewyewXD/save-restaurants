import React, { FC } from "react";
import styles from "./NavSidebar.module.scss";
interface Props {
  currentTab: string;
  setCurrentTab: Function;
}

const NavSidebar: FC<Props> = ({ currentTab, setCurrentTab }) => {
  const sidebarTabs = [
    { name: "Profile", iconName: "person" },
    { name: "Sites", iconName: "form" },
  ];

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
              className={`${styles.Tab} ${
                currentTab === tab.name && styles["Tab--activated"]
              }`}
              key={`sidebar-${index}`}
            >
              <i className={`icon-inno icon-inno_${tab.iconName} mr-3`} />
              {tab.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavSidebar;
