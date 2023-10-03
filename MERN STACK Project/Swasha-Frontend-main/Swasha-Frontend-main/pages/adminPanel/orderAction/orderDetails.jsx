import { useEffect, useState } from "react";
import {
  updateOrder,
  getAllReturnsAdmin,
  handleRejectReturn,
  handleReturnRefundInitiated,
  handleApproveReturn,
  makeRequest,
} from "../../../util/ApiClient";
import Dialog from "../../../components/Dialog";

const OrderDetails = ({ setCurrent, order }) => {
  const [products, setProducts] = useState([]);
  const [orderDateAndTime, setOrderDateAndTime] = useState();
  const [isStatusUpdated, setStatusUpdated] = useState(false);

  useEffect(() => {
    if (!order) return;
    setProducts(order?.products);
    setOrderDateAndTime({
      Date: order?.createdAt.split("T")[0],
      Time: order?.createdAt.split("T")[1].split(".")[0],
    });
  }, [order]);
  // console.log(products);
  // console.log(order);

  return (
    <div>
      <div className="text-xl  font-bold mb-4 flex justify-center">
        Order Details
      </div>
      <div className="flex justify-evenly">
        <div className="  mb-4  flex ">
          <div className="font-semibold"> Order ID :</div>
          <div className="pl-2"> {order?.orderId}</div>
        </div>
        <div className="  mb-4 flex">
          <div className="font-semibold"> Order Status :</div>
          <div className="pl-2"> {order?.orderStatus}</div>
        </div>
      </div>
      {(order?.orderStatus == "delivered" ||
        order?.orderStatus == "shipped") && (
        <div className="  mb-4 flex justify-center ">
          <div className="font-semibold"> Tracking Id :</div>
          <a className="pl-2" href={order?.trackingLink} target="_blank">
            {order?.trackingLink}
          </a>
        </div>
      )}
      {order?.orderStatus == "returned" && (
        <div className="  mb-4 flex justify-center ">
          <div className="font-semibold"> Return Reason :</div>
          <div className="pl-2"> {order?.returnReason}</div>
        </div>
      )}
      {order?.orderStatus == "cancelled" && (
        <div className="  mb-4 flex justify-center ">
          <div className="font-semibold"> Cancellation Reason :</div>
          <div className="pl-2"> {order?.cancellationReason}</div>
        </div>
      )}
      {/* <div className="flex md:gap-1 gap-4 flex-row flex-wrap justify-between my-10 px-2">
          <div className="rounded-xl border-1 w-full md:w-60 h-28 text-gray-1700">
            <div className="bg-gray-50 p-2 text-center font-semibold rounded-t-xl">
              Customer:
            </div>
            <div className="p-4">
              {order?.user?.name}
            </div>
          </div>
          
          <div className="rounded-xl border-1 w-full md:w-60 h-28 text-gray-1700">
            <div className="bg-gray-50 p-2 text-center font-semibold rounded-t-xl">
              Payment Method:
            </div>
            <div className="p-4">
              {order?.paymentMethod}
            </div>
          </div>
          <div className="rounded-xl border-1 w-full md:w-60 h-28 text-gray-1700">
            <div className="bg-gray-50 p-2 text-center font-semibold rounded-t-xl">
              Order Date:
            </div>
            <div className="p-4">
              <div>Time : {order?.createdAt.split("T")[1].split(".")[0]}</div>
              <div>Date : {order?.createdAt.split("T")[0]}</div>
            </div>
          </div>
          <div className="rounded-xl border-1 w-full md:w-60 h-auto text-gray-1700">
            <div className="bg-gray-50 p-2 text-center font-semibold rounded-t-xl">
              Shipped To:
            </div>
            <div className="p-4">
            {order?.shippingAddress?.addressLine1}, {order?.shippingAddress?.addressLine2}, {order?.shippingAddress?.city} 
            , {order?.shippingAddress?.state}, {order?.shippingAddress?.country}, {order?.shippingAddress?.postalCode}
            </div>
          </div>
        </div> */}
      <div className="ml-2">
        <div className="flex justify-between bg-gray-50 rounded-t-xl">
          <div className="flex">
            <div className=" p-2 font-semibold">Customer:</div>
            <div className=" p-2  ">{order?.user?.name}</div>
          </div>
          <div className="flex">
            <div className=" p-2 font-semibold ">PaymentMethod :</div>
            <div className=" p-2 mr-3 ">{order?.paymentMethod}</div>
          </div>
        </div>
        <div className="flex justify-between rounded-t-xl">
          <div className="flex">
            <div className=" p-2 font-semibold ">Contact Number:</div>
            <div className=" p-2  ">{order?.user?.mobileNum}</div>
          </div>
          <div className="flex mr-16">
            <div className=" p-2 font-semibold ">PaymentStatus :</div>
            <div className=" p-2 mr-3 ">{order?.paymentStatus}</div>
          </div>
        </div>
        <div className="flex justify-between bg-gray-50 rounded-t-xl">
          <div className="flex">
            <div className=" p-2 font-semibold ">Address :</div>
            <div className=" p-2 w-5/12 ">
              {order?.shippingAddress?.addressLine1},{" "}
              {order?.shippingAddress?.addressLine2},{" "}
              {order?.shippingAddress?.city}, {order?.shippingAddress?.state},{" "}
              {order?.shippingAddress?.country},{" "}
              {order?.shippingAddress?.postalCode}
            </div>
          </div>
          <div className=" p-2 mr-20 mt-1 pr-14">
            <div className="flex">
              <div className="font-semibold ">Time : </div>
              <div className="pl-2">
                {order?.createdAt.split("T")[1].split(".")[0]}
              </div>
            </div>
            <div className="flex">
              <div className="font-semibold ">Date : </div>
              <div className="pl-2">{order?.createdAt.split("T")[0]}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-2  text-center mb-4 font-bold">Product Summary</div>
      <OrderSummary products={products} orderId={order?._id} order={order} />
      <PaymentDetails order={order} />
    </div>
  );
};

function Container({ head, data }) {
  useEffect(() => {
    // console.log(data,"Data")
    setTimeout(() => {
      console.log(data, "Data");
    }, 0);
    // console.log(Object.keys(data),"Data")
  }, []);
  return (
    <div className="rounded-xl border-1 w-full md:w-60 h-40 text-gray-1700">
      <div className="bg-gray-50 p-2 text-center font-semibold rounded-t-xl">
        {head}
      </div>
      <div className="p-4"></div>
    </div>
  );
}

function OrderSummary({ products, orderId, order }) {
  let returnItems = {};
  const [returnProducts, setReturnProducts] = useState([]);
  const [inputPopupVisible, setInputPopupVisible] = useState(false);
  const [inputPopupVisible1, setInputPopupVisible1] = useState(false);
  const [reasonForReject, setReasonForReject] = useState("");
  const [trackingLink, setTrackingLink] = useState("");
  const [fetch, setFetch] = useState("0");
  let allReturns = [];

  const rejectReturn = async (returnId, itemId, reasonForReject) => {
    try {
      const response = await makeRequest(
        handleRejectReturn,
        {
          returnId: returnId,
          itemId: itemId,
          reasonForReject: reasonForReject,
        },
        { loading: true }
      );
      console.log("API Response:", response);
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const approveReturn = async (returnId, itemId, trackingLink) => {
    try {
      const response = await makeRequest(
        handleApproveReturn,
        {
          returnId: returnId,
          itemId: itemId,
          trackingLink: trackingLink,
        },
        { loading: true }
      );
      console.log("API Response:", response);
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };
   
  const returnRefund = async (returnId, itemId) => {
    try {
      const response = await makeRequest(
        handleReturnRefundInitiated,
        {
          returnId: returnId,
          itemId: itemId,
        },
        { loading: true }
      );
      console.log("API Response:", response);
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const handleInputChange = (e) => {
    setReasonForReject(e.target.value);
  };

  const handleInputChange1 = (e) => {
    setTrackingLink(e.target.value);
  };

  const toggleInputPopup = () => {
    setInputPopupVisible(!inputPopupVisible);
  };

  const toggleInputPopup1 = () => {
    setInputPopupVisible1(!inputPopupVisible1);
  };

  useEffect(() => {
    setFetch("3");
    makeRequest(
      getAllReturnsAdmin,
      {},
      {
        loading: true,
        onSuccess: (res) => {
          allReturns = res.returns.filter(
            (returns) => returns.orderId === orderId
          );
          allReturns.map((Item) => {
            returnItems[Item.returnItems[0].productId] === undefined
              ? (returnItems[Item.returnItems[0].productId] = [
                  Item?._id,
                  Item.returnItems[0]._id,
                  Item.returnItems[0].status,
                ])
              : "";
          });
          setReturnProducts(returnItems);
        },
      }
    );
  }, [fetch]);

  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left">
        <thead className="text-xs uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-5 py-3">
              #
            </th>
            <th scope="col" className="px-5 py-3">
              Image
            </th>
            <th scope="col" className="px-5 py-3">
              Product
            </th>
            <th scope="col" className="px-5 py-3">
              Price/Unit
            </th>
            <th scope="col" className="px-5 py-3">
              Quantity
            </th>
            <th scope="col" className="px-5 py-3">
              Subtotal
            </th>
            <th scope="col" className="px-5 py-3 text-center">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product, i) => (
            <tr
              key={product?._id}
              className="bg-white border-b hover:bg-gray-50"
            >
              <th
                scope="row"
                className="px-5 py-4 font-medium  whitespace-nowrap"
              >
                {i + 1}
              </th>
              <td className="px-5 py-4">
                <div className="w-16">
                  {product?._id?.productImagesUrl && (
                    <img
                      src={product?._id?.productImagesUrl[0]}
                      alt="productImg"
                      width="100%"
                      className="rounded-md"
                      height="100%"
                    />
                  )}
                </div>
              </td>
              <td className="px-5 py-4">
                <div className="font-semibold mb-1">
                  {product?.id?.productTitle}
                </div>
                <ReadMore limit={100} text={product?.id?.productDecription} />
              </td>
              <td className="px-5 py-4">{product?.id?.sellingPrice}</td>
              <td className="px-5 py-4">{product?.quantity}</td>
              <td className="px-5 py-4">
                {product?.id?.sellingPrice * product?.quantity}
              </td>
              {/* <td className="px-5 py-4">
                    <div style={{ textTransform: 'uppercase' }} className={`${order?.orderStatus=="shipped" ? 'bg-blue-600 p-3 rounded-full' : order?.orderStatus=="processing" ? 'bg-yellow-400 p-3 rounded-full'  : order?.orderStatus=="created" ? 'bg-green-400 p-3 rounded-full'  : order?.orderStatus=="delivered" ? 'bg-sky-400 p-3 rounded-full' : order?.orderStatus=="cancelled" ? 'bg-rose-500 p-3 rounded-full' : ""}`}>
                      {(order.orderStatus !=="delivered" && order.orderStatus !=="cancelled") &&(
                        <div>{order.orderStatus}</div>
                      )}                   
                      
                      {(order.orderStatus ==="cancelled" && order.cancelRefundStatus) &&(
                        <div>Refund_Initiated</div>
                      )}
                      {(order.orderStatus ==="cancelled" && !order.cancelRefundStatus) &&(
                        <div>{order.orderStatus}</div>
                      )}
                    </div>
                  </td> */}

              <td className="px-5 py-4" style={{ textTransform: "uppercase" }}>
                {returnProducts[product?.id?._id] !== undefined ? (
                  returnProducts[product.id._id][2] === "return_requested" ? (
                    <div>
                      <div className="flex">
                        <button
                          className="green-button-1  mt-3 text-sm "
                          onClick={() => {
                            toggleInputPopup1();
                          }}
                        >
                          Approve
                        </button>

                        <button
                          className="red-button-1  mt-3 text-sm ml-3"
                          onClick={() => {
                            toggleInputPopup();
                          }}
                        >
                          Reject
                        </button>
                        {inputPopupVisible1 && (
                          <div className="overlay">
                            <Dialog
                              padding=""
                              visible="true"
                              setVisible={setInputPopupVisible1}
                            >
                              <div className="flex my-3 w-full">
                                <label className="p-2 bg-gray-50 font-bold">
                                  Tracking Link:
                                </label>
                                <input
                                  type="text"
                                  className="border-1 text-sm rounded-xl focus:ring-black focus:border-black block w-1/2 mb-3 px-3"
                                  placeholder="Enter Tracking ID"
                                  value={trackingLink}
                                  onChange={handleInputChange1}
                                />
                                <button
                                  className="text-white mb-3 mx-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-xl text-sm sm:w-auto px-3 text-center"
                                  onClick={() => {
                                    toggleInputPopup1();
                                    approveReturn(
                                      returnProducts[product.id._id][0],
                                      returnProducts[product.id._id][1],
                                      trackingLink
                                    );
                                    setFetch("1");
                                  }}
                                >
                                  Submit
                                </button>
                              </div>
                            </Dialog>
                          </div>
                        )}
                        {inputPopupVisible && (
                          <div className="overlay">
                            <Dialog
                              padding=""
                              visible="true"
                              setVisible={setInputPopupVisible}
                            >
                              <div className="flex my-3 w-full">
                                <label className="p-2 bg-gray-50 font-bold">
                                  Reject Reason:
                                </label>
                                <input
                                  type="text"
                                  className="border-1 text-sm rounded-xl focus:ring-black focus:border-black block w-1/2 mb-3 px-3"
                                  placeholder="Enter reason for rejecting"
                                  value={reasonForReject}
                                  onChange={handleInputChange}
                                />
                                <button
                                  className="text-white mb-3 mx-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-xl text-sm sm:w-auto px-3 text-center"
                                  onClick={() => {
                                    toggleInputPopup();
                                    rejectReturn(
                                      returnProducts[product.id._id][0],
                                      returnProducts[product.id._id][1],
                                      reasonForReject
                                    );
                                    setFetch("2");
                                  }}
                                >
                                  Submit
                                </button>
                              </div>
                            </Dialog>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (returnProducts[product.id._id][2] ==="return_approved"?(<div className="flex">
                    <button style={{ whiteSpace: 'nowrap' }} className=" blue-button-3 mt-3 text-sm cursor-pointer" onClick={()=>{returnRefund(returnProducts[product.id._id][0],returnProducts[product.id._id][1]);setFetch('7')}}>
                         <strong>Initiate Refund</strong> 
                    </button>
                    </div>
                    ):(returnProducts[product.id._id][2])
                    
                  )
                ) : (
                  <div className="text-center">
                  
                    {order.orderStatus !== "cancelled" && (
                      <div>{order.orderStatus}</div>
                    )}

                    {order.orderStatus === "cancelled" &&
                      order.cancelRefundStatus && <div>Refund_Initiated</div>}
                    {order.orderStatus === "cancelled" &&
                      !order.cancelRefundStatus && (
                        <div>{order.orderStatus}</div>
                      )}
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ReadMore({ limit, text }) {
  const [showDes, setShowDes] = useState(false);
  const style = {
    className: " font-bold underline text-xs cursor-pointer",
  };
  return (
    <>
      {!showDes ? (
        <div className="w-96">
          {text?.substring(0, limit)}...
          <span {...style} onClick={() => setShowDes(true)}>
            read more
          </span>
        </div>
      ) : (
        <div className="w-96">
          {text}
          <span {...style} onClick={() => setShowDes(false)}>
            read less
          </span>
        </div>
      )}
    </>
  );
}

function PaymentDetails({ order }) {
  const [total, setTotal] = useState(0);
  useEffect(() => {
    let totalPrice = order.products.reduce((a, b) => {
      return a + b.id?.sellingPrice * b.quantity;
    }, 0);
    setTotal(totalPrice);
  }, []);
  return (
    <div className="font-semibold text-right my-4">
      <div className="px-6 py-2">
        Taxes: <span className="font-normal">N/A</span>{" "}
      </div>
      <div className="bg-gray-50 px-6 py-2">
        Total: <span className="font-normal">{total}</span>{" "}
      </div>
    </div>
  );
}

export default OrderDetails;
