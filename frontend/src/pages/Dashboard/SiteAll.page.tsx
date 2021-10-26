import React from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "./DashboardLayout";

const SiteAll = () => {
  const sites = [
    {
      id: 1,
      name: "site 1",
      updated: new Date().toDateString(),
      image: null,
    },
    {
      id: 2,
      name: "site 2",
      updated: new Date().toDateString(),
      image: null,
    },
    {
      id: 3,
      name: "site 3",
      updated: new Date().toDateString(),
      image: null,
    },
  ];
  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-8">
        <div className="leading-none text-3xl">My Sites</div>

        <div className="flex">
          <div className="bg-white shadow px-2 mr-3 flex">
            <span className="w-auto flex justify-end items-center text-gray-500 p-2">
              <i className="icon-inno icon-inno_search" />
            </span>

            <input
              className="w-full rounded p-2 outline-none"
              type="text"
              placeholder="Search"
            />
          </div>

          <Link
            to="/dashboard/sites/new"
            className="flex items-center justify-center bg-primary px-6 py-3 rounded hover:text-white hover:bg-black transition duration-200 font-bold text-black hover:border-black"
          >
            <i className="icon-inno icon-inno_plus mr-3" />
            <span>Add New Site</span>
          </Link>
        </div>
      </div>

      {/* switch view depending on publish status */}
      {/* <div className="mb-8 grid grid-cols-10 text-center">
        <div className="flex flex-col justify-center items-center font-bold cursor-pointer transition duration-200">
          <span>test</span>
          <hr className={`border-black border-t w-6 mt-2`} />
        </div>
      </div> */}

      <div className="grid grid-cols-3 gap-x-6 auto-rows-auto">
        {sites.map((site, index) => (
          <Link
            to={`/dashboard/sites/${site.id}`}
            key={`site-${index}`}
            className="shadow-md rounded w-full h-full flex justify-center items-center flex-col transition transform duration-200 hover:-translate-y-3 hover:scale-105 hover:shadow-lg"
          >
            <div className="py-2 px-3 flex justify-start w-full text-gray-500">
              <span className="mr-2">L</span>
              <span>https://www.google.com</span>
            </div>

            <div
              className="h-28 w-full bg-cover bg-center bg-no-repeat border-t border-b border-gray-400 relative"
              style={{
                backgroundImage: `url(/images/publish-template.png)`,
              }}
            ></div>

            <div className="py-2 px-3 flex justify-center items-start w-full flex-col">
              <div className="flex items-center">
                <i className="icon-inno icon-inno_globe-fill mr-2 text-blue-700" />
                <span className="font-bold">{site.name}</span>
              </div>
              <div className="text-xs mt-1">Last update: {site.updated}</div>
            </div>
          </Link>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default SiteAll;
