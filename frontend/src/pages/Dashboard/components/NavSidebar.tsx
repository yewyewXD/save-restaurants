import React, { FC } from "react";
import styles from "./NavSidebar.module.scss";
import { Link, useLocation } from "react-router-dom";

const NavSidebar: FC = () => {
  const { pathname } = useLocation();
  const sidebarTabs = [
    // { name: "Profile", iconName: "person", link: "/dashboard/profile" },
    { name: "Sites", iconName: "form", link: "/dashboard/sites" },
  ];

  return (
    //  w-52 xl:w-64 2xl:w-80
    <div className="relative min-h-screen h-full w-64">
      <div className="h-screen fixed left-0 top-0 bg-black text-white w-64">
        <div className="h-20 p-8 pb-0">
          <Link
            to="/"
            className="font-bold text-4xl tracking-tight leading-none block text-left"
          >
            <span className="text-primary">e</span>atery
          </Link>
        </div>

        <div className="p-4">
          {sidebarTabs.map((tab, index) => (
            <Link
              to={tab.link}
              className={`${styles.Tab} ${
                pathname === tab.link && styles["Tab--activated"]
              }`}
              key={`sidebar-${index}`}
            >
              <i className={`icon-inno icon-inno_${tab.iconName} mr-3`} />
              {tab.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavSidebar;
