import React from "react";

interface Props {
  elementName: string;
}

const HoverEffect: React.FC<Props> = ({ elementName }) => {
  return (
    <div className="HoverEffect justify-start items-start absolute h-full w-full border-green-400 border-dashed border-4">
      <span className="px-5 bg-black text-white">{elementName}</span>
    </div>
  );
};

export default HoverEffect;
