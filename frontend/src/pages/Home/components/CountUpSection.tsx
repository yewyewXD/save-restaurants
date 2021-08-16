import React, { useMemo, useRef } from "react";
import { useOnVisible } from "../../../utils/visibility.utils";
import CountUp from "react-countup";

const CountUpSection = () => {
  const sectionRef = useRef<any>();
  const isVisible = useOnVisible(sectionRef);
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
      <div
        className="container mx-auto grid grid-cols-5 gap-7"
        ref={sectionRef}
      >
        {progressions
          .sort((a, b) => a.id - b.id)
          .map((progression) => (
            <div
              className="flex justify-center items-center flex-col text-center"
              key={progression.id}
            >
              {isVisible && (
                <div className="font-bold text-5xl mb-5">
                  {progression.id === 5 && "RM"}
                  <CountUp duration={1.5} end={progression.count} />
                </div>
              )}
              <div>{progression.name}</div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default CountUpSection;
