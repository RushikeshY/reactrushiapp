import React, { useState, useEffect } from "react";
import { makeRequest } from "../util/ApiClient";
import { getPublicURL } from "../util/UrlUtils";
import { useSelector } from "react-redux";
import ImageHolder from "./ImageHolder";
import Price from "./Price";

function RefundStatus({ shippingAddressId, order }) {
  const address = useSelector((x) => x.address[shippingAddressId]);
  const product = useSelector((x) => x.product[order.id]);

  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString(undefined, options);
  
    return formattedDate;
  }

  return (
    <div className="p-4">
      <div className="borderC-1 text-[#dbd9d9] p-6 mb-4 rounded-lg ">
        <div className="grid md:grid-cols-2 grid-cols-1  md:w-[60rem] text-black">
          <div className="cols-span-1 flex">
            <div className="md:text-base text-xs">
              <div className="font-bold text-sm md:text-lg mb-4">Delivery Address:</div>
              <div className="font-semibold mb-1">
                {address?.fullName} - {address?.addressType}
              </div>
              <div className="mb-1">
                {address?.addressLine1},{address?.addressLine2},Pin-
                {address?.postalCode},{address?.city},{address?.state}
              </div>
              <div className="font-semibold">
                Ph Number - {address?.phoneNumber}
              </div>
            </div>
            {/* <div className="w-[0.1rem] h-auto bg-black my-2"></div> */}
          </div>
          {/* <div className="cols-span-1 ml-10">
            <div className="font-bold text-lg mb-4">Refund Payment Method</div>
            <div className="mb-1">"Experience the convenience of paynig"</div>
          </div> */}
        </div>
      </div>
      <div className="borderC-1 text-[#dbd9d9] p-6 rounded-lg ">
        <div className="text-black">
          <div className="font-bold text-sm md:text-lg mb-4">
            Your Current Order Status
          </div>
          <div className="flex gap-5">
            <div>
              <ImageHolder
                className="md:h-[7rem] h-[4rem] object-fill rounded-md cursor-pointer"
                src={product?.productImagesUrl?.[0]}
              />
              <div className="font-bold md:text-base text-xs">{product?.productTitle}</div>
              <Price
                className="whitespace-nowrap md:text-base text-xs"
                price={product.mrp}
                discount={
                  ((product.mrp - product.sellingPrice) * 100) / product.mrp
                }
              />
            </div>
            {order.isCancelledRequestRaise && <div className="md:grid grid-cols-3 items-center md:ml-16 grow">
            <div className="flex md:flex-col">
            <div className="md:flex">
                <div className="p-2 flex bg-blue-50 rounded-full  md:w-[8rem] md:h-[5rem]">
                <img
                    src={getPublicURL("/png/orderPlaced.png")}
                    className="m-auto md:w-10 w-4"
                />
                </div>
                <div className="h-5 w-1 bg-red-100 mx-auto md:hidden"></div>
                <div className="h-2 w-full bg-red-100 my-auto hidden md:block"></div>
            </div>
            <div className="mt-2 ml-2 md:ml-0 text-[0.5rem] md:text-base">
            <div className="font-semibold"> Order Placed</div>
            <div>{formatDate(order.orderDate)}</div>
            </div>
            </div>
            <div className="flex md:flex-col">
            <div className="md:flex">
                <div className="p-2 flex bg-blue-50 rounded-full md:w-[8rem] md:h-[5rem]">
                <img
                    src={getPublicURL("/png/orderPlaced.png")}
                    className="m-auto md:w-10 w-4"
                />
                </div>
                {console.log(order.cancelRefundInitiatedDate,order)}
                {order.paymentStatus === "paid" && <div className={`h-5 w-1 mx-auto md:hidden ${order.cancelRefundInitiatedDate?'bg-green-100':'bg-gray-800'}`}></div>}
                {order.paymentStatus === "paid" ? <div className={`h-2 w-full my-auto hidden md:block ${order.cancelRefundInitiatedDate?"bg-green-100":"bg-gray-800"}`}></div>:<div className="h-2 w-full bg-white my-auto hidden md:block"></div>}
            </div>
            <div className="mt-2 ml-2 md:ml-0 text-[0.5rem] md:text-base">
            <div className="font-semibold"> Order cancelled</div>
            <div>{formatDate(order.cancelledDate)}</div>
            </div>
            </div>
            {/* <div className="flex md:flex-col">
            <div className="md:flex">
                <div className="p-2 flex bg-blue-50 rounded-full md:w-[8rem] md:h-[5rem]">
                <img
                    src={getPublicURL("/png/RefundProcessing.png")}
                    className="my-auto md:w-6 w-3 h-3.5 md:h-9  mx-auto"
                />
                </div>
                <div className="h-5 w-1 bg-gray-800 mx-auto md:hidden"></div>
                <div className="h-2 w-full bg-gray-800 my-auto hidden md:block"></div>
            </div>
            <div className="mt-2 ml-2 md:ml-0 text-[0.5rem] md:text-base">
            <div className="font-semibold whitespace-nowrap">Refund Processing</div>
            <div>...</div>
            </div>
            </div> */}
            {order.paymentStatus === "paid" && <div className="flex md:flex-col">
            <div className="md:flex">
                <div className="p-2 flex bg-blue-50 rounded-full md:w-[8rem] md:h-[5rem]">
                <img
                    src={getPublicURL("/png/RefundCompleted.png")}
                    className="my-auto md:w-10 w-4 mx-auto"
                />
                </div>
                <div className="w-full"></div>
            </div>
            <div className="mt-2 ml-2 md:ml-0 text-[0.5rem] md:text-base">
            <div className="font-semibold whitespace-nowrap">Refund initiated</div>
            <div>{order.cancelRefundInitiatedDate?formatDate(order.cancelRefundInitiatedDate):"..."}</div>
            </div>
            </div>}
            </div>}
            {order.isReturnRequestRaise &&
              <div className="md:grid grid-cols-3 items-center md:ml-16 grow">
              <div className="flex md:flex-col">
            <div className="md:flex">
                <div className="p-2 flex bg-blue-50 rounded-full  md:w-[8rem] md:h-[5rem]">
                <img
                    src={getPublicURL("/png/Initiation.png")}
                    className="m-auto md:w-10 w-4"
                />
                </div>
                <div className="h-5 w-1 bg-green-100 mx-auto md:hidden"></div>
                <div className="h-2 w-full bg-green-100 my-auto hidden md:block"></div>
            </div>
            <div className="mt-2 ml-2 md:ml-0 text-[0.5rem] md:text-base">
            <div className="font-semibold">Return Requested</div>
            <div>{formatDate(order.returnedDate)}</div>
            </div>
            </div>
            <div className="flex md:flex-col">
            <div className="md:flex">
                <div className="p-2 flex bg-blue-50 rounded-full md:w-[8rem] md:h-[5rem]">
                <img
                    src={getPublicURL("/png/Pickup.png")}
                    className="m-auto md:w-10 w-4"
                />
                </div>
                <div className="h-5 w-1 bg-gray-800 mx-auto md:hidden"></div>
                <div className="h-2 w-full bg-gray-800 my-auto hidden md:block"></div>
            </div>
            <div className="md:mt-2 ml-2 md:ml-0 text-[0.5rem] md:text-base">
            <div className="font-semibold">Pickup & Verification</div>
            <div>sep 3rd 2023</div>
            </div>
            </div>
            {/* <div className="flex md:flex-col">
            <div className="md:flex">
                <div className="p-2 flex bg-blue-50 rounded-full md:w-[8rem] md:h-[5rem]">
                <img
                    src={getPublicURL("/png/RefundProcessing.png")}
                    className="my-auto md:w-6 w-3 h-3.5 md:h-9 mx-auto"
                />
                </div>
                <div className="h-5 w-1 bg-gray-800 mx-auto md:hidden"></div>
                <div className="h-2 w-full bg-gray-800 my-auto hidden md:block"></div>
            </div>
            <div className="mt-2 ml-2 md:ml-0 text-[0.5rem] md:text-base">
            <div className="font-semibold whitespace-nowrap">Refund Processing</div>
            <div>...</div>
            </div>
            </div> */}
            <div className="flex md:flex-col">
            <div className="md:flex">
                <div className="p-2 flex bg-blue-50 rounded-full md:w-[8rem] md:h-[5rem]">
                <img
                    src={getPublicURL("/png/RefundCompleted.png")}
                    className="my-auto md:w-10 w-4 mx-auto"
                />
                </div>
                <div className="w-full"></div>
            </div>
            <div className="mt-2 ml-2 md:ml-0 text-[0.5rem] md:text-base">
            <div className="font-semibold whitespace-nowrap">Refund initiated</div>
            <div>...</div>
            </div>
            </div>
            </div>
            }
          </div>
          <div className="flex justify-center md:text-base text-sm text-red-100 mt-4 "><span className="font-semibold whitespace-nowrap">{order.isReturnRequestRaise?"Return":"Cancel"} Reason &nbsp;: </span>&nbsp;<span>{order.isReturnRequestRaise?order.reasonForReturn:order.cancellationReason}</span></div>
        </div>
      </div>
    </div>
  );
}

export default RefundStatus;