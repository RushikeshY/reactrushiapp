import { useState } from "react";

export default function Tabs({ items }) {
  const [current, setCurrent] = useState(0);
  return (
    <div className="flex flex-row gap-8 borderH-2 rounded-lg text-center cursor-pointer text-sm md:text-base font-bold p-4 mb-4">
      {items.map((x, i) => {
        return (
          <div
            key={i}
            onClick={(e) => {
              setCurrent(i);
              x[1]();
            }}
            className={`mr-4 md:mr-0 border-0 border-solid ${
              current === i
                ? "border-b-[3px] border-black"
                : "text-gray-1300 border-b-[3px]"
            }`}
          >
            {x[0]}
          </div>
        );
      })}
    </div>
  );
}
