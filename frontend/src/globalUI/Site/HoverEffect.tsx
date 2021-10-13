import React from "react";

interface Props {
  elementName: string;
  showTextInner?: boolean;
}

const HoverEffect: React.FC<Props> = ({ elementName, showTextInner }) => {
  return (
    <div className="HoverEffect flex justify-start items-start absolute h-full w-full border-green-400 border-dashed border-4">
      <span
        className={`text-xs px-5 py-1 bg-green-800 text-white absolute w-max z-20 ${
          showTextInner ? "top-0 left-0" : "-top-7 -left-1"
        }`}
      >
        {elementName}
      </span>
    </div>
  );
};

export default HoverEffect;
