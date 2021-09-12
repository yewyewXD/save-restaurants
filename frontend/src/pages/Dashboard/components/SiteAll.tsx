import React from "react";

const SiteAll = () => {
  const sites = [
    {
      name: "site 1",
      updated: new Date().toDateString(),
      image: null,
    },
    {
      name: "site 1",
      updated: new Date().toDateString(),
      image: null,
    },
    {
      name: "site 1",
      updated: new Date().toDateString(),
      image: null,
    },
  ];
  return (
    <>
      <div className="leading-none text-2xl">All My Sites</div>

      <div className="mt-6 grid grid-cols-3 gap-16 auto-rows-auto">
        {sites.map((site, index) => (
          <div
            key={`site-${index}`}
            className="border h-50 w-50 flex justify-center items-center flex-col border-red-600"
          >
            <div className="h-28 w-full bg-black"></div>
            <div className="p-3 flex justify-center items-center flex-col">
              <div>{site.name}</div>
              <div>{site.updated}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SiteAll;
