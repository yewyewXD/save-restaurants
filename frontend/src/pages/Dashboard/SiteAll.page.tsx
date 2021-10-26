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
      name: "site 1",
      updated: new Date().toDateString(),
      image: null,
    },
    {
      id: 3,
      name: "site 1",
      updated: new Date().toDateString(),
      image: null,
    },
  ];
  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-8">
        <div className="leading-none text-3xl">All My Sites</div>

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
            <span>Create New </span>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-16 auto-rows-auto">
        {sites.map((site, index) => (
          <Link
            to={`/dashboard/sites/${site.id}`}
            key={`site-${index}`}
            className="border h-50 w-50 flex justify-center items-center flex-col border-red-600"
          >
            <div className="h-28 w-full bg-black"></div>
            <div className="p-3 flex justify-center items-center flex-col">
              <div>{site.name}</div>
              <div>{site.updated}</div>
            </div>
          </Link>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default SiteAll;
