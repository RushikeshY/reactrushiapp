import { useEffect,useState } from "react";
import { getPublicURL } from "../util/UrlUtils";

export default function Counter({
  buttonHeight,
  buttonPadding,
  initValue = 1,
  minValue = 1,
  maxValue,
  onChange = () => {},
  style,
}) {
  const [ct, setCt] = useState(initValue);
  const [outOfStock,setOutOfStock] = useState("hidden");
  useEffect(() => {
    if (outOfStock === "") {
      const timer = setTimeout(() => {
        setOutOfStock("hidden");
      }, 2000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [outOfStock])

  function setCount(n) {
    onChange(n);
    setCt(n);
  }
  return (
    <div>
    <div
      className="flex flex-row items-center rounded-md overflow-hidden"
      style={style}
    >
    <div className={`flex flex-row md:space-x-4 space-x-3  items-center borderH-2 md:p-1 p-0.5 rounded-full`}>
      <img
        className="bg-gray-400  box-content rounded-full cursor-pointer md:h-full h-3"
        style={{padding: buttonPadding }}
        onClick={(e) => setCount(Math.max(ct - 1, minValue))}
        src = {getPublicURL("/svg/minus.svg")}
        alt=""
      />
      <span className="font-semibold ">
        {ct < 10 ? "0" + ct : ct}
      </span>
      <img
        className={`bg-black box-content rounded-full cursor-pointer md:h-full h-3`}
        style={{ padding: buttonPadding }}
        onClick={(e) => {setCount(ct>=maxValue? maxValue===0?ct:maxValue:ct+1);
        if(maxValue<=ct)setOutOfStock("")}}
        src = {getPublicURL("/svg/plus.svg")}
        alt=""
      />
      </div>
      
    </div>
    <div className={outOfStock}>
      {maxValue===0?<div className="ml-2 mt-2 text-xs text-red-100">Out of stock.</div>:<div className="ml-2 mt-2 text-xs text-red-100">Only {maxValue} left in stock.</div>}
      </div>
    </div>
  );
}
