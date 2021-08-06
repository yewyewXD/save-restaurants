import React from "react";

const NotificationBar = () => {
  return (
    <div className="fixed flex items-center justify-center bottom-6 right-6">
      <div className="NotificationBar bg-red-600 p-3 rounded-lg shadow-lg relative hover:shadow-2xl transition duration-500">
        <div className="text-xs text-white">Error occurred, please refresh</div>
        <div>
          <span className="absolute py-1 px-2 text-xs top-0 right-0 bg-white rounded-md transform translate-x-1 -translate-y-2 cursor-pointer shadow-xl border-gray-300 hover:bg-gray-300 transition duration-150 border">
            &#10005;
          </span>
        </div>
      </div>
    </div>
  );
};

export default NotificationBar;
