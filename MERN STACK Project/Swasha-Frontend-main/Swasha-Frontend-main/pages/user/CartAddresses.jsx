import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { DeliveryAddress } from "../../components/DeliveryAddress";
import Header from "../../components/Header";
import { getPublicURL } from "../../util/UrlUtils";
import { CurrencyFormatter } from "../../util/StringUtil";
import { Router } from "next/router";

export default function () {
  const router = useRouter();

  // const storedData = localStorage.getItem('selectedProducts');
  // const selectedProducts = JSON.parse(storedData);
  // console.log(selectedProducts);
  return (
    <div>
      <Header page="Address" />
      <div className="center-max md:flex flex-row items-start ">
        <div className="grow borderH-2 md:mb-16 mb-4 truncate md:ml-16 mx-4 mt-10 rounded-md">
          <DeliveryAddress />
        </div>
        <div className="md:w-[25rem]  mt-6 flex flex-col items-center p-4 gap-2">
          <PriceBlock />
          <button
            style={{ fontSize: "1rem", padding: "0.5rem 0" }}
            className="yellow-btn w-full"
            onClick={() => router.push("../products/orderReview")}
          >
            Pay And Place Your Order
          </button>
          <div className="borderH-2 flex flex-row items-center p-2 rounded-[15px]">
            <img className="h-[5rem]" src={getPublicURL("/svg/payment.svg")} />
            <div className="w-full h-full flex flex-col ml-2 justify-center gap-[0.2rem]">
              <div className="text-sm font-bold">Secure Payment</div>
              <div className="text-xs">
                Safe And Secure Payments. Easy Returns. 100% Authentic Products.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PriceBlock({}) {
  const [discount, setDiscount] = useState();
  const [totalPrice, setTotalPrice] = useState();
  const [noOfItems, setNoOfItems] = useState();
  const [Price, setPrice] = useState();

  useEffect(() => {
    // Save the data in local storage

    // const Price = window ? window.localStorage.getItem("price_details") : "";

    setPrice(localStorage.getItem("price_details"));

    if (Price) {
      const price_details = JSON.parse(Price);
      price_details.length > 3
        ? setDiscount(price_details[2] * price_details[3])
        : setDiscount(price_details[2]);
      price_details.length > 3
        ? setTotalPrice(price_details[1] * price_details[3])
        : setTotalPrice(price_details[1]);
      setNoOfItems(price_details[0]);
    }
  }, [Price]);
  // let deliveryCharges = totalPrice >= 500 ? 0 : 50;
  const deliveryCharges = 50;
  return (
    <div className="grow borderH-2 rounded-md w-full">
      <div className="bg-gray-400 md:text-lg text-sm font-bold p-4">
        Price Details:
      </div>
      <div
        className="p-4 text-sm md:text-base"
        style={{
          display: "grid",
          rowGap: "0.75rem",
          gridTemplateColumns: "auto min-content",
        }}
      >
        <div>Price ({noOfItems} items)</div>
        <div>{CurrencyFormatter.format(totalPrice)}</div>
        <div>Discount</div>
        <div>{CurrencyFormatter.format(discount)}</div>
        <div>Delivery Charges</div>
        <div className="line-through">
          {CurrencyFormatter.format(deliveryCharges)}
        </div>
        <div
          style={{ gridColumn: "1/-1", borderTop: "1px dashed #707070" }}
        ></div>
        <div>Total Amount</div>
        <div>{CurrencyFormatter.format(totalPrice - discount)}</div>
        <div
          style={{ gridColumn: "1/-1", borderTop: "1px dashed #707070" }}
        ></div>
        {discount > 0 && (
          <div
            className="text-green-txt text-sm mt-2"
            style={{ gridColumn: "1/-1" }}
          >
            You will save {CurrencyFormatter.format(discount)} on this order
          </div>
        )}
      </div>
    </div>
  );
}
