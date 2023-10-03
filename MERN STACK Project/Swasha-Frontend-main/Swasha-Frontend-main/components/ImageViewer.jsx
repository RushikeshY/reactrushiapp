import { useState } from "react";
import { getPublicURL } from "../util/UrlUtils";

export default function ImageViewer({
  imgs,
  imgHeight = "25rem",
  smallImgSide = "5rem",
  className,
}) {
  if (!imgs) imgs = [];
  const [current, setCurrent] = useState(0);
  return (
    <div className={`${className}`}>
      <img
        src={getPublicURL(imgs[current])}
        className="object-cover rounded-md block md:h-[30rem] w-full md:w-[34rem] mx-auto" 
        // style={{ width: "100%"}}
      />
      <div className="overflow-hidden relative mt-2 rounded-md">
        <div className="overflow-x-scroll flex flex-row gap-8 md:mx-14 mx-6 no-scrollbar">
          {imgs.map((x, i) => {
            return (
              <img
                className="rounded-xl cursor-pointer"
                style={{ width: smallImgSide, height: smallImgSide }}
                key={i}
                src={getPublicURL(x)}
                onClick={() => setCurrent(i)}
              />
            );
          })}
        </div>
        {/* <div className="absolute left-0 top-1/2 transform -translate-y-1/2 flex items-center">
          <button
            className="bg-gray-200 rounded-full font-bold p-2 mr-2 md:ml-6"
            onClick={() => scrollGallery(-1)}
          >
            &lt;
          </button>
        </div> */}
        {/* <div className="absolute right-0 top-1/2 transform -translate-y-1/2 flex items-center">
          <button
            className="bg-gray-200 rounded-full font-bold p-2 ml-2 md:mr-6"
            onClick={() => scrollGallery(1)}
          >
            &gt;
          </button>
        </div> */}
      </div>

    </div>
  );
}

function scrollGallery(direction) {
  const container = document.querySelector(".overflow-x-scroll");
  const scrollAmount = direction * 100; 
  container.scrollBy({
    left: scrollAmount,
    behavior: "smooth",
  });
}
