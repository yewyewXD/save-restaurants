import React, { useMemo } from "react";

const CountUpSection = () => {
  const progressions = useMemo(() => {
    return [
      { id: 1, name: "Websites Created", count: 100 },
      {
        id: 2,
        name: "Orders Delivered",
        count: 100,
      },
      {
        id: 3,
        name: "Leads Generated",
        count: 100,
      },
      {
        id: 4,
        name: "Reviews Generated",
        count: 100,
      },
      {
        id: 5,
        name: "Cost Saved",
        count: 100,
      },
    ];
  }, []);

  return (
    <section className="text-center w-full py-16 bg-yellow-400">
      <div className="container mx-auto grid grid-cols-5 gap-8">
        {progressions
          .sort((a, b) => a.id - b.id)
          .map((progression) => (
            <div
              className="cursor-pointer flex justify-center items-center flex-col p-3 text-center"
              key={progression.id}
            >
              <div className="font-bold text-5xl mb-5">{progression.count}</div>
              <div>{progression.name}</div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default CountUpSection;
