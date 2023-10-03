import { getPublicURL } from "../util/UrlUtils";
import { useRef, useState } from "react";
import { roundFloat } from "../util/StringUtil";

export default function ({
  rating,
  hoverEnabled = true,
  starSide = "1.25rem",
  starGap = "0.2rem",
  ratingCount,
  distribution = [0, 0, 0, 0, 0],
  showCount = true,
  className,
}) {
  const dropdown = useRef();
  rating = Math.round(rating * 2) / 2;
  // if (!ratingCount) return <span style={{ height: starSide }}></span>;
  if (!rating) return <div></div>;
  return (
    <div
      className={`relative flex flex-row items-center w-min ${className}`}
      style={{ gap: starGap }}
      onMouseEnter={(e) => {
        if (dropdown.current) dropdown.current.style.opacity = 1;
      }}
      onMouseLeave={(e) => {
        if (dropdown.current) dropdown.current.style.opacity = 0;
      }}
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <img
          key={i}
          style={{ width: starSide, height: starSide }}
          src={getPublicURL(
            `/svg/${(() => {
              if (Math.abs(i + 0.5 - rating) < 0.1) return "star-half.svg";
              if (i < rating) return "star-full.svg";
              return "star-hollow.svg";
            })()}`
          )}
        />
      ))}
      {((ratingCount !== undefined && showCount) || undefined) && (
        <div className="hidden md:flex">
          <span className="text-sm mx-2 text-gray-1600 whitespace-nowrap">
            {ratingCount} ratings
          </span>
          <img
            className="w-[0.65rem] ml-[0.25rem] cursor-pointer"
            src={getPublicURL("/svg/down-chevron.svg")}
          />
        </div>
      )}
      {(ratingCount || undefined) && hoverEnabled && (
        <div
          ref={dropdown}
          className="text-gray-1600 text-xs py-4 px-8"
          style={{
            position: "absolute",
            backgroundColor: "white",
            boxShadow: "var(--card-shadow-1)",
            borderRadius: "10px",
            top: "calc(100% + 1rem)",
            left: "50%",
            opacity: 0,
            transform: "translate(-50%,0)",
            transition: "opacity 0.5s",
            zIndex: "25",
            pointerEvents: "none",
          }}
        >
          <RatingPercentBars fractions={distribution} />
        </div>
      )}
    </div>
  );
}

export function RatingPercentBars({ fractions, color = "#F0BB27", ...other }) {
  return (
    <div {...other}>
      {fractions.map((x, i) => {
        x ||= 0;
        const t = roundFloat(100 * x);
        return (
          <div className="flex flex-row items-center my-2 gap-4" key={i}>
            <span className="whitespace-nowrap">{5 - i} stars</span>
            <div className="relative w-[5rem] h-4 border-1">
              <div
                style={{ width: `${t}%`, backgroundColor: color }}
                className={`absolute h-full top-0 left-0`}
              ></div>
            </div>
            <span>{t}%</span>
          </div>
        );
      })}
    </div>
  );
}

export function AddRating({
  starSide = "1.25rem",
  starGap = "0.2rem",
  className,
  value = 1,
  setValue = () => {},
}) {
  const [tmp, setTmp] = useState();
  return (
    <div
      className={`relative flex flex-row items-center w-min ${className}`}
      style={{ gap: starGap }}
      onMouseLeave={(e) => {
        setTmp(undefined);
      }}
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <img
          key={i}
          style={{ width: starSide, height: starSide, cursor: "pointer" }}
          src={getPublicURL(
            `/svg/${i < (tmp || value) ? "star-full.svg" : "star-hollow.svg"}`
          )}
          onMouseEnter={(e) => {
            setTmp(i + 1);
          }}
          onClick={(e) => {
            setValue(i + 1);
          }}
        />
      ))}
    </div>
  );
}
