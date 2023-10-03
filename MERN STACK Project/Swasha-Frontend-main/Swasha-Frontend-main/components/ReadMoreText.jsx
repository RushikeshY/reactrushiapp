import { useState } from "react";

export default function ReadMoreContainer({ limit = 300, text }) {
  const p1 = text.slice(0, limit);
  const p2 = text.slice(limit);
  const [expanded, setExpanded] = useState(false);
  const spanProps = {
    className: "text-red-txt ml-4 cursor-pointer font-semibold",
    onClick: (e) => setExpanded(!expanded),
  };
  return (
    <>
      {p1}
      {p2 &&
        (expanded ? (
          <>
            {p2}
            <span {...spanProps}>Read Less</span>
          </>
        ) : (
          <span {...spanProps}>Read More</span>
        ))}
    </>
  );
}
