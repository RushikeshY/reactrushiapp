import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { updateReview } from "../redux/slices/reviewSlice";
import { makeRequest, rateProduct } from "../util/ApiClient";
import ImageHolder from "./ImageHolder";
import { AddRating } from "./RatingBar";

export default function RateReview({ product, onCancel, onSubmit, fill }) {
  const dispatch = useDispatch();
  const [overall, setOverall] = useState(0);
  const [valueForMoney, setValueForMoney] = useState(0);
  const [quality, setQuality] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [delivery, setDelivery] = useState(0);
  const [comment, setComment] = useState("");
  useEffect(() => {
    if (!fill) return;
    setOverall(fill.rating);
    setValueForMoney(fill.valueForMoney);
    setQuality(fill.quality);
    setShipping(fill.shipping);
    setDelivery(fill.delivery);
    setComment(fill.comment);
  }, [fill]);
  return (

    <div className="md:w-[30rem] w-80 text-black">
      <div className="flex flex-row items-stretch gap-4">
        <ImageHolder
          className="h-[4rem] w-[5rem] rounded-md"
          src={product?.productImagesUrl?.[0]}
        />
        <div className="overflow-hidden grow flex flex-col justify-center whitespace-nowrap">
          <div className="font-semibold md:text-[1.3rem] text-[1rem] text-ellipsis overflow-hidden">
            {product.productTitle}
          </div>
          <div className="md:text-sm text-xs text-ellipsis overflow-hidden">
            {product.productDecription}
          </div>
        </div>
      </div>
      <div>
        <div
          className="w-fit p-3 rounded-md"
          style={{
            display: "grid",
            width: "100%",
            gridTemplateColumns: "min-content 1fr",
            columnGap: "1rem",
            rowGap: "0.25rem",
            margin: "1rem auto",
            whiteSpace: "nowrap",
          }}
        >
          <span className="font-semibold">Overall Rating</span>
          <AddRating value={overall} setValue={setOverall} />

          <div className="dashed-sep my-1" style={{ gridColumn: "1/-1" }}></div>

          <span className="font-semibold" style={{ gridColumn: "1/-1" }}>
            Rate Feature
          </span>
          <span className="text-sm">Value for Money</span>
          <AddRating
            starSide="1.15rem"
            value={valueForMoney}
            setValue={setValueForMoney}
          />
          <span className="text-sm">Quality</span>
          <AddRating
            starSide="1.15rem"
            value={quality}
            setValue={setQuality}
          />
          <span className="text-sm">Shipping</span>
          <AddRating
            starSide="1.15rem"
            value={shipping}
            setValue={setShipping}
          />
          <span className="text-sm">Delivery</span>
          <AddRating starSide="1.15rem" value={delivery} setValue={setDelivery} />

          <div className="dashed-sep my-1" style={{ gridColumn: "1/-1" }}></div>
          <div className="font-semibold" style={{ gridColumn: "1/-1" }}>
            Write Your Review
          </div>
          {/* <input
            className="border-1 border-1 rounded-md px-3 py-1 my-[0.2rem]"
            placeholder="Title"
            style={{ gridColumn: "1/-1" }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          /> */}
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="border-1 rounded-md p-3 w-full"
            style={{ gridColumn: "1/-1", resize: "none" }}
            placeholder="Enter your review..."
          />
        </div>
      </div>
      <div className="flex flex-row mx-auto gap-4 w-full justify-center">
        <button className="hollow-button" onClick={onCancel}>
          Cancel
        </button>
        <button
          className="blue-button-2"
          onClick={(e) => {
            const rev = {
              productId: product?._id,
              rating: overall,
              valueForMoney,
              quality,
              shipping,
              delivery,
              comment,
            };
            makeRequest(rateProduct, rev, {
              loading: true,
              onSuccess: () => {
                toast.success("Review submitted");
                onSubmit();
              },
            });
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
