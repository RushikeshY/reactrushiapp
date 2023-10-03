import { useEffect, useRef, useState } from "react";
import { getPublicURL } from "../util/UrlUtils";

const PADDING = "0.5rem";
const scrollSlowFactor = 1.2;

function Button({ style, ...other }) {
  return (
    <img
      src={getPublicURL("/svg/right-chevron.svg")}
      style={{
        cursor: "pointer",
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        boxShadow: "0 0 5px 1px #33333355",
        backgroundColor: "white",
        borderRadius: "999px",
        padding: "0.6rem",
        height: "2rem",
        width: "2rem",
        ...style,
      }}
      {...other}
    />
  );
}

function LeftButton({ containerRef }) {
  return (
    <Button
      style={{ left: PADDING, transform: "translateY(-50%) rotate(180deg)" }}
      onClick={(e) => {
        containerRef.current.scrollBy(
          -containerRef.current.offsetWidth / scrollSlowFactor,
          0
        );
      }}
    />
  );
}

function RightButton({ containerRef }) {
  return (
    <Button
      style={{ right: PADDING }}
      onClick={(e) => {
        containerRef.current.scrollBy(
          containerRef.current.offsetWidth / scrollSlowFactor,
          0
        );
      }}
    />
  );
}

export function HorizontalScroll({
  children,
  className,
  scrollClassName = "",
  onScroll,
  loading,
  ...other
}) {
  const scrollRef = useRef();
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);
  const showHideBtns = (e) => {
    if (scrollRef.current?.scrollLeft === 0 && showLeft) {
      setShowLeft(false);
    }
    if (scrollRef.current?.scrollLeft > 0 && !showLeft) {
      setShowLeft(true);
    }
    if (
      scrollRef.current?.scrollWidth -
        scrollRef.current?.scrollLeft -
        scrollRef.current?.offsetWidth <=
        1 &&
      showRight
    ) {
      setShowRight(false);
    }
    if (
      scrollRef.current?.scrollWidth -
        scrollRef.current?.scrollLeft -
        scrollRef.current?.offsetWidth >
        0 &&
      !showRight
    ) {
      setShowRight(true);
    }
  };
  useEffect(() => {
    scrollRef.current?.addEventListener("scroll", showHideBtns);
    return () =>
      scrollRef.current?.removeEventListener("scroll", showHideBtns);
  }, [showLeft, showRight, loading]);
  return (
    <div className={`relative ${className}`} {...other}>
      {showLeft && <LeftButton containerRef={scrollRef} />}
      {showRight && <RightButton containerRef={scrollRef} />}
      <div
        onScroll={onScroll}
        className={`overflow-x-scroll no-scrollbar scroll-smooth flex flex-row items-start md:gap-9 gap-2 p-4 ${scrollClassName}`}
        ref={scrollRef}
      >
        {children}
        {loading && (
          <img
            src={getPublicURL("/png/loading.png")}
            className="w-[2rem] self-center"
            style={{ animation: "rotate 0.8s linear infinite" }}
          />
        )}
      </div>
    </div>
  );
}
