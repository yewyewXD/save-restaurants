import React, { useMemo, useRef } from "react";
import { useOnVisible } from "../../../utils/visibility.utils";
import CountUp from "react-countup";

const CountUpSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useOnVisible(sectionRef);
  const progressions = useMemo(() => {
    return [
      {
        id: 1,
        name: "Websites Created",
        count: 673,
        image: "/images/web-icon.png",
      },
      {
        id: 2,
        name: "Orders Processed",
        count: 2571,
        image: "/images/order-icon.png",
      },

      {
        id: 3,
        name: "Reviews Generated",
        count: 400,
        image: "/images/review-icon.png",
      },
      {
        id: 4,
        name: "Cost Saved",
        count: 20400,
        image: "/images/cost-icon.png",
      },
    ];
  }, []);

  return (
    <section className="text-center w-full py-16 bg-primary">
      <div
        className="container mx-auto grid grid-cols-4 gap-7"
        ref={sectionRef}
      >
        {progressions
          .sort((a, b) => a.id - b.id)
          .map((progression) => (
            <div
              className="flex justify-center items-center flex-col text-center"
              key={progression.id}
            >
              {progression?.image && (
                <img src={progression.image} alt="" className="w-12 mb-3" />
              )}
              {isVisible && (
                <div className="font-semibold text-6xl mb-3">
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
