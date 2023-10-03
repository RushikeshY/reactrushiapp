import { getPublicURL } from "../../../util/UrlUtils";
import React, { useEffect, useState } from "react";
import ImageHolder from "../../../components/ImageHolder";
import ImageViewer from "../../../components/ImageViewer";
import Price from "../../../components/Price";
import RatingBar, { RatingPercentBars } from "../../../components/RatingBar";
import ReadMoreContainer from "../../../components/ReadMoreText";
import { getSingleProduct, makeRequest } from "../../../util/ApiClient";

const ProductDetail = ({ prodId, setCurrent }) => {
  const [prodDetails, setProdDetails] = useState({});
  useEffect(() => {
    makeRequest(
      getSingleProduct,
      { productID: prodId },
      {
        onSuccess: (res) => {
          setProdDetails(res);
        },
        onError: (e) => {
          console.log(e);
        },
      }
    );
  }, []);
  const leftStyle = "font-semibold";
  if (!prodDetails)
    return (
      <>
        <h1>Product is not present</h1>
      </>
    );
  return (
    <div className="center-max">
      <div className="flex justify-between">
        <div className="text-xl font-bold mb-4">Product Detail</div>
        <button
          className="text-white font-semibold bg-stone-400 rounded-xl text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          onClick={() => {
            setCurrent("products");
          }}
        >
          Close
        </button>
      </div>
      <div className="flex md:flex-row flex-col shrink-0 p-2">
        <div className="hidden md:block relative">
          <ImageViewer imgs={prodDetails.productImagesUrl} imgHeight="17rem" />
        </div>
        <div className="relative md:hidden mb-6">
          <ImageViewer
            imgs={prodDetails.productImagesUrl}
            imgHeight="17rem"
            width=""
          />
        </div>
        <div className="md:ml-8">
          <div>
            <div className="text-[1.35rem] font-semibold">
              {prodDetails.productTitle}
            </div>
          </div>
          <div className="my-2 text-sm">{prodDetails.productDecription}</div>
          <RatingBar
            className="mt-[1.25rem]"
            rating={2.5}
            ratingCount={10}
            reviewCount={5}
          />
          <div className="bg-blue-btn-bg text-2sm text-white pl-3 pr-[1.5rem] pt-[0.2rem] pb-[0.33rem] w-fit my-3 slant-edge">
            Seller - Nirmaan Organization
          </div>
          <div className="flex gap-3">
            {["purple", "green", "blue", "red"].map((color) => (
              <div
                key={color}
                className={`p-3 bg-${color}-600 rounded-full`}
              ></div>
            ))}
          </div>
          <div className="mt-4">
            <span className={leftStyle}>Price: </span>
            <Price
              className="mt-4 mb-2 text-lg"
              price={prodDetails.mrp}
              discount={((prodDetails.mrp - prodDetails.sellingPrice)/prodDetails.mrp)*100}
            />{" "}
          </div>
          <div className="font-semibold">
            Stock:{" "}
            <span className="font-bold mr-2 text-gray-1800">
              {prodDetails.stock}
            </span>
          </div>
          <div className="font-semibold">
            Product Code:{" "}
            <span className="font-bold mr-2 text-gray-1800">
              {prodDetails.stock}
            </span>
          </div>
        </div>
      </div>
      <MoreInfo />
    </div>
  );
};

function MoreInfo() {
  const [current, setCurrent] = useState(0);
  const selectedStyle = "text-white bg-black";

  return (
    <div className="border-0 border-t border-solid border-gray-900 my-4 mx-4 pt-6">
      <div className="flex flex-row justify-center gap-2">
        <button
          className={`w-[10rem] py-2 border border-solid border-black rounded-full font-semibold ${
            current === 0 ? selectedStyle : ""
          }`}
          onClick={(e) => setCurrent(0)}
        >
          Details
        </button>
        <button
          className={`w-[10rem] py-2 border border-solid border-black rounded-full font-semibold ${
            current === 1 ? selectedStyle : ""
          }`}
          onClick={(e) => setCurrent(1)}
        >
          Reviews
        </button>
      </div>
      {current === 0 && <Detail />}
      {current === 1 && <Reviews />}
    </div>
  );
}
const det = {
  ProductType: "Hand Made Easy washable bage",
  Material: "100% Cotton",
  Capacity: "Able to Carry 10 kg",
  Dimensions: "13*16.5*3",
  ReturnExchange: "3days return & exchange policy",
};

function Detail() {
  return (
    <div className="p-4">
      <div className="font-bold text-[1.8rem] mb-4"> Product Details</div>
      <div className="flex">
        <div className="font-semibold">Product Type : </div>
        <div className="pl-2"> {det.ProductType}</div>
      </div>
      <div className="flex">
        <div className="font-semibold">Material : </div>
        <div className="pl-2">{det.Material}</div>
      </div>
      <div className="flex">
        <div className="font-semibold">Capacity : </div>
        <div className="pl-2">{det.Capacity}</div>
      </div>
      <div className="flex">
        <div className="font-semibold">Dimensions : </div>
        <div className="pl-2">{det.Dimensions}</div>
      </div>
      <div className="flex">
        <div className="font-semibold">Return & Exchange :</div>
        <div className="pl-2">{det.ReturnExchange}</div>
      </div>
    </div>
  );
}

function Reviews() {
  return (
    <div className="p-4">
      <div className="font-bold text-[1.8rem] mb-4">Reviews:</div>
      <div className="flex flex-col-reverse md:flex-row">
        <div className="grow" style={{ marginRight: "6vw" }}>
          {[...Array(10).keys()].map((x) => (
            <ReviewLI key={x} />
          ))}
        </div>
        <div>
          <div className="flex flex-row items-center gap-2">
            <span className="font-bold text-[1.35rem]">Customer Ratings</span>
            <img
              src={getPublicURL("/svg/three-stars.svg")}
              className="h-[1.5rem]"
            />{" "}
          </div>
          <div className="text-xs mt-[0.2rem] md:mb-4">Total 150 ratings</div>
          <div className="flex flex-row">
            <RatingPercentBars
              className="text-sm hidden md:block"
              fractions={[0.6, 0.2, 0.1, 0.05, 0.15]}
              color="#3594AC"
            />
            <div
              className="hidden md:block"
              style={{
                borderRight: "var(--border-1)",
                alignSelf: "stretch",
                margin: "0 2.5rem",
              }}
            ></div>
            <div className="flex flex-row md:flex-col items-center mr-6 mb-4">
              <span className="font-bold text-[2rem] md:text-[3.5rem]">
                4.5
              </span>
              <span className="font-semibold">Out of 5</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReviewLI() {
  return (
    <div className="p-2">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "min-content auto min-content",
        }}
      >
        <ImageHolder
          style={{ gridRow: "1/3" }}
          className="rounded-full w-[3.5rem] h-[3.5rem] mr-4"
        />
        <div className="font-semibold">Name and Family Name</div>
        <div className="flex flex-row items-center">
          <span className="font-semibold mr-[0.15rem]">4.5</span>
          <img className="h-[1rem]" src={getPublicURL("/svg/star-green.svg")} />
        </div>
        <div className="text-sm">07/03/2023</div>
      </div>
      <div className="p-2 text-sm">
        <ReadMoreContainer
          text={
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet consequuntur temporibus nisi facilis, maiores accusamus aliquam quisquam possimus consequatur, nesciunt expedita et ea laudantium officiis perferendis culpa iste repudiandae qui. Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque vitae nesciunt asperiores modi obcaecati sed deserunt incidunt non animi, eum, praesentium eos reprehenderit consequuntur ullam. Odio exercitationem excepturi cum consequatur! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque, at nihil ea impedit earum debitis voluptatibus sunt ab voluptates, consequuntur necessitatibus laudantium ad sit deserunt corrupti perspiciatis ullam molestiae minus."
          }
        />
      </div>
    </div>
  );
}

export default ProductDetail;
