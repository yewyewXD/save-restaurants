import React, { useState } from "react";
import { slide as Menu } from "react-burger-menu";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const SideMenu = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <Menu
        right={true}
        onStateChange={({ isOpen }) => {
          setIsSidebarOpen(isOpen);
        }}
        customBurgerIcon={
          isSidebarOpen ? (
            false
          ) : (
            <i className="icon-inno icon-inno_edit text-white" />
          )
        }
      >
        <Tabs>
          <TabList>
            <Tab>Title 1</Tab>
            <Tab>Title 2</Tab>
          </TabList>

          <TabPanel>
            <div className="flex flex-col">
              <a id="home" href="/">
                Home
              </a>
              <a id="about" href="/about">
                About
              </a>
              <a id="contact" href="/contact">
                Contact
              </a>
            </div>
          </TabPanel>
          <TabPanel>
            <h2>Any content 2</h2>
          </TabPanel>
        </Tabs>
      </Menu>
    </>
  );
};

export default SideMenu;
