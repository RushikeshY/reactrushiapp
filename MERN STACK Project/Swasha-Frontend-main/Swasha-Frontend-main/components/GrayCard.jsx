import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { getSingleProduct, makeRequest } from "../util/ApiClient";
import { fetchProduct } from "../util/ProductClient";
import { HorizontalScroll, ScrollButtons } from "./ScrollButtons";

const { default: ImageHolder } = require("./ImageHolder");
const { default: Price } = require("./Price");

export function GrayCardContainer({ title, items, className }) {
  return (
    <div className={`${className}`}>
      <div className="text-lg font-bold mb-2">{title}</div>
      <HorizontalScroll scrollClassName="rounded-md border-2">
        {items.map((x) => (
          <GrayCard key={x} id={x} />
        ))}
      </HorizontalScroll>
    </div>
  );
}

export function GrayCard({ id }) {
  const data = useSelector((x) => x.product[id]);
  const router = useRouter();
  useEffect(() => {
    fetchProduct(id);
  }, []);

  if (!data) return <></>;
  return (
    <div
      className="p-4 rounded-md flex flex-col items-center bg-gray-900 cursor-pointer"
      onClick={(e) => {
        router.push(`/products/view?id=${id}`);
      }}
      style={{ boxShadow: "var(--card-shadow-1)" }}
    >
      <ImageHolder
        className="w-[12rem] h-[12rem] rounded-md"
        style={{ backgroundColor: "#eee" }}
        src={data.productImagesUrl[0]}
      />
      <span className="w-[12rem] whitespace-normal text-center font-bold mt-4 one-line-max">
        {data.productTitle}
      </span>
      <Price className="mt-2" price={data.price} />
    </div>
  );
}
