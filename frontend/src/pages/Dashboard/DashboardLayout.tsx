import React, { FC } from "react";
import NavSidebar from "./components/NavSidebar";

const DashboardLayout: FC = ({ children }) => {
  return (
    <main className="flex">
      <NavSidebar />

      <div className="flex-grow">
        <div className="h-20"></div>

        <div className="py-4 px-8 w-full h-full">{children}</div>
      </div>
    </main>
  );
};

export default DashboardLayout;
