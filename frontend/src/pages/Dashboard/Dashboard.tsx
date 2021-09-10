import React, { FC, useState } from "react";
import NavSidebar from "./components/NavSidebar";
import SiteAll from "./components/SiteAll";

const Dashboard: FC = () => {
  const [currentTab, setCurrentTab] = useState("Sites");

  return (
    <div className="flex">
      <NavSidebar currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <SiteAll />
    </div>
  );
};

export default Dashboard;
