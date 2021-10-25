import React, { FC, useState } from "react";
import NavSidebar from "./components/NavSidebar";
import SiteAll from "./components/SiteAll";

const Dashboard: FC = () => {
  const [currentTab, setCurrentTab] = useState("Sites");

  return (
    <div className="flex">
      <NavSidebar currentTab={currentTab} setCurrentTab={setCurrentTab} />

      <div className="flex-grow">
        <div className="h-20"></div>

        <div className="py-4 px-8 w-full h-full">
          <SiteAll />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
