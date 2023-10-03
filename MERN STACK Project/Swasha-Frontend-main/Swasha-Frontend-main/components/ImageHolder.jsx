import { getPublicURL } from "../util/UrlUtils";

export default function ImageHolder({ src, style, className, ...other }) {
  if (!src)
    return (
      <div
        className={`inline-block border-[2px] border-dashed border-[#d3d3d3] rounded-md bg-[#eaeaea] shrink-0 ${
          className || ""
        }`}
        style={style}
        {...other}
      ></div>
    );
  return (
    <img
      src={getPublicURL(src)}
      style={{ objectFit: "cover", ...style }}
      className={`${className} bg-[#f7f7f7]`}
      {...other}
    />
  );
}
