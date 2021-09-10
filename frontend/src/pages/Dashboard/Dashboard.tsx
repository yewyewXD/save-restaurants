import React, { FC, useState } from "react";
import NavSidebar from "./components/NavSidebar";

const Dashboard: FC = () => {
  const [currentTab, setCurrentTab] = useState("Sites");

  return (
    <>
      <NavSidebar currentTab={currentTab} setCurrentTab={setCurrentTab} />
    </>
  );
};

export default Dashboard;
