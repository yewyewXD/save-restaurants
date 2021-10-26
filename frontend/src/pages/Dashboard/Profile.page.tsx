import React from "react";
import DashboardLayout from "./DashboardLayout";

const Profile = () => {
  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-8">
        <div className="leading-none text-3xl">My Profile</div>

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

          <button className="flex items-center justify-center bg-primary px-6 py-3 rounded hover:text-white hover:bg-black transition duration-200 font-bold text-black hover:border-black">
            <i className="icon-inno icon-inno_plus mr-3" />
            <span>Add New Site</span>
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
