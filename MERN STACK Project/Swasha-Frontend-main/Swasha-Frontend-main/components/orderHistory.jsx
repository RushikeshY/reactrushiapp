import { getPublicURL } from "../util/UrlUtils";
import { useEffect, useState,useRef } from "react";
import { fetchMyReviews, getMyOrders, makeRequest,getAllReturnsUser } from "../util/ApiClient";
import ImageHolder from "./ImageHolder";
import { useSelector } from "react-redux";
import { fetchProduct } from "../util/ProductClient";
import { CurrencyFormatter } from "../util/StringUtil";
import Link from "next/link";
import Dialog from "./Dialog";
import RateReview from "./RateReview";
import ReturnReason from "./ReturnReason";
import RefundStatus from "./RefundStatus";
import CancelReason from "./CancelReason";
import { goToProduct } from "../util/UrlUtils";
import { useRouter } from "next/router";
import Tabs from "./Tabs";

export default function OrderHistory({handleBack , orderStatus="All"}) {
  const user = useSelector((x) => x.user);
  let [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  let requested = false;
  const [fetch,setfetch] = useState('0');
  let returnedProducts = {};
  const [orderstatus,setOrderstats] = useState(orderStatus);
 
  useEffect(() => {
    setfetch('0');
    if (requested) return;
    makeRequest(getAllReturnsUser, {id: user._id}, {
      loading:true,
      onSuccess: (res) => {
        const Returned = res.userReturns.reduce((result, x) => {
          const key = x.orderId + x.returnItems[0].productId;

          if (!result[key]) {
            result[key] = [];
          }

          x.returnItems.forEach((y) => {
            const tmp = { ...y };
            tmp.returnId = x._id;
            tmp.returnedDate = x.createdAt;
            tmp.orderId = x.orderId;            
            result[key].push(tmp);
          });

          return result;
        }, {});
        returnedProducts = Returned;
        makeRequest(
          getMyOrders,
          {},
          { loading:true,
            onSuccess: (res) => {
              let ord = [];
              res.orders.forEach((x) => {
                ord.push(
                  ...x.products.map((y) => {
                    const tmp = { ...y };
                    tmp.orderId = x._id;
                    tmp.orderStatus = x.orderStatus;
                    tmp.paymentStatus = x.paymentStatus;
                    tmp.isDelivered = x.isDelivered;
                    tmp.isCancelledRequestRaise = x.isCancelledRequestRaise;
                    tmp.isReturnRequestRaise = x.isDelivered?returnedProducts[x._id+y.id]?true:false:false;
                    x.isDelivered?returnedProducts[x._id+y.id]?(tmp.returnedDate = returnedProducts[x._id+y.id][0].returnedDate,tmp.reasonForReturn = returnedProducts[x._id+y.id][0].reasonForReturn):"":"";
                    tmp.trackingLink = x.trackingLink;
                    tmp.orderDate = x.createdAt;
                    tmp.shippingAddressId = x.shippingAddress;
                    x.isCancelledRequestRaise && (tmp.cancelledDate = x.cancelledAt, tmp.cancellationReason = x.cancellationReason,x.cancelRefundInitiatedAt ? tmp.cancelRefundInitiatedDate = x.cancelRefundInitiatedAt:"");
                    return tmp;
                  })
                );
              });
              orders = ord;
              setOrders(ord);
              loadSection(orderstatus);
            },
            loading: true,
          }
        );
      },
    });
    makeRequest(fetchMyReviews);
    requested = true;
  }, [fetch]);

  
  function loadSection(status) {
    orderStatus!=="All"
    if(status==="All") setFilteredOrders(orders);
    else if(status ==="Current Orders") {
      setFilteredOrders(orders.filter((order) => (!order.isDelivered && !order.isReturnRequestRaise && !order.isCancelledRequestRaise )));
    }
    else if(status === "Delivered") {
      setFilteredOrders(orders.filter((order) => (order.isDelivered && !order.isReturnRequestRaise )));
    }
    else if(status ==="Cancelled") {
      setFilteredOrders(orders.filter((order) => order.isCancelledRequestRaise));
    }
    else if(status === "Returned") {
      setFilteredOrders(orders.filter((order) => order.isReturnRequestRaise));
    }
  }

  return (
    <div className="overflow-y-auto md:h-screen max-h-screen no-scrollbar">
    <div className="flex justify-between text-[1.2rem] borderH-2 sticky top-0 z-0 bg-white rounded-t-lg py-2 mb-4 px-4">
    <div className="flex">
    <button onClick={handleBack} className="pr-2 pb-2 md:hidden">
                <img className="w-4" src={getPublicURL("/svg/back.svg")} />
              </button>
      <div className="font-semibold">
        My Order History
      </div>
      </div>
      <div className="text-base borderC-1 rounded-md cursor-pointer"><FilterButton loadSection={loadSection} orderStatus={orderStatus} setOrderstats={setOrderstats}/></div>
      </div>
      <div className="grow borderB-1 text-[#dbd9d9] rounded-xl">
        <div>
          {filteredOrders.length > 0 ? (
            (() => {
              return filteredOrders.map((x) => (
                <ProductCard
                  key={x.orderId + x.id}
                  order={x}
                  deliveryStatus={x.isDelivered}
                  cancelStatus = {x.isCancelledRequestRaise}
                  returnStatus = {x.isReturnRequestRaise}
                  setfetch={setfetch}
                />
              ));
            })()
          ) : (
            <div className="flex flex-col items-center justify-center">
              <img
                src={getPublicURL("/gif/empty.gif")}
                style={{
                  width: "15rem",
                }}
              />
              <div
                className="text-center max-w-[23rem] text-black"
                style={{ transform: "translateY(-3rem)" }}
              >
                Nothing here!<br></br>
                <Link href="/">Shop Now</Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterButton({ loadSection,orderStatus,setOrderstats }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(orderStatus);
  const dropdownRef = useRef(null);
  
  const options = ['All','Current Orders', 'Delivered', 'Cancelled', 'Returned'];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setOrderstats(option)
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    // Add a click event listener to the document
    document.addEventListener('click', handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (selectedOption !== null) {
      loadSection(selectedOption);
    }
  }, [selectedOption]);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        className={`group rounded-md shadow-sm md:px-16 px-12 py-1 font-medium`}
        onClick={toggleDropdown}
      >
        Filter
      </button>
      {isOpen && (
        <div className="origin-top-righ text-black absolute right-0 mt-2 md:w-40 rounded-md shadow-lg bg-white">
          <div className="py-2">
            {options.map((option) => (
              <div
                key={option}
                className={`flex items-center text-[0.5rem] text-black px-2 py-2 cursor-pointer hover:bg-gray-100`}
                onClick={() => handleOptionClick(option)}
              >
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className={`w-4 h-4 border optionborder-gray-300  rounded`}
                    checked={selectedOption === option}
                    onChange={() => handleOptionClick(option)}
                  />
                  <span className="ml-2 text-[0.75rem] md:text-sm font-medium">{option}</span>
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}



export function MyReviews() {
  const [rated, setRated] = useState(false);

  return (
    <div>
      <div className="font-semibold text-[1.3rem] mb-4">My Products</div>
      <Tabs
        items={[
          [
            "Unrated Products",
            () => {
              setRated(false);
            },
          ],
          [
            "Rated Products",
            () => {
              setRated(true);
            },
          ],
        ]}
      />
      {rated ? <Rated /> : <Unrated />}
    </div>
  );
}

export function Rated() {
  const reviews = useSelector((x) => x.review);
  let requested = false;
  useEffect(() => {
    if (requested) return;
    requested = true;
    makeRequest(fetchMyReviews);
  }, []);
  return (
    <div className="p-4 borderH-2 rounded-md divide-x-0 divide-y divide-solid divide-[#00000033]">
      {reviews &&
        Object.values(reviews).map((x) => {
          return <ReviewLI data={x} key={x._id} />;
        })}
    </div>
  );
}

export function Unrated() {
  const [orders, setOrders] = useState();
  const [filtered, setFiltered] = useState();
  const review = useSelector((x) => x.review);
  let requested = false;
  useEffect(() => {
    if (requested) return;
    makeRequest(
      getMyOrders,
      {},
      { loading:true,
        onSuccess: (res) => {
          let ord = [];
          res.orders.forEach((x) => {
            {x.isDelivered &&
              ord.push(
                ...x.products.map((y) => {
                  const tmp = { ...y };
                  tmp.orderId = x.orderId;
                  tmp.isDelivered = x.isDelivered;
                  tmp.createdAt = x.createdAt;
                  return tmp;
                })
              )}
            
          });
          setOrders(ord);
        },
        loading: true,
      }
    );
    makeRequest(fetchMyReviews);
    requested = true;
  }, []);
  useEffect(() => {
    if (!review || !orders) return;
    const reviewedProds = new Set();
    const prods = new Set();
    Object.values(review).forEach((x) => {
      reviewedProds.add(x.productId);
    });
    orders.forEach((x) => {
      if (!reviewedProds.has(x.id)) prods.add(x.id);
    });
    setFiltered(Array.from(prods));
  }, [review, orders]);
  return (
    <div className="p-4 borderH-2 rounded-md divide-x-0 divide-y divide-solid divide-[#00000033]">
      {filtered &&
        filtered.map((x, i) => {
          return (
            <UnratedLI
              key={i}
              pid={x}
              deleteSelf={() => {
                setFiltered(filtered.filter((pid) => pid !== x));
              }}
            ></UnratedLI>
          );
        })}
    </div>
  );
}

function UnratedLI({ pid, deleteSelf }) {
  const router = useRouter();
  const product = useSelector((x) => x.product[pid]);
  const [popupVisible, setPopupVisible] = useState(false);
  useEffect(() => {
    fetchProduct(pid);
  }, []);
  if (!product) return <></>;
  return (
    <div className="px-2 py-4 flex flex-row gap-3">
      {product && popupVisible && (
        <Dialog
          visible={popupVisible}
          setVisible={setPopupVisible}
          padding="1.5rem"
        >
          <RateReview
            product={product}
            onCancel={(e) => setPopupVisible(false)}
            onSubmit={(e) => {
              setPopupVisible(false);
              deleteSelf();
            }}
          />
        </Dialog>
      )}
      <ImageHolder
        className="w-[5rem] h-[4rem] rounded-md cursor-pointer"
        src={product?.productImagesUrl?.[0]}
        style={{ gridRow: "1/5" }}
        onClick={(e) => goToProduct(router, product._id)}
      />
      <div className="flex flex-col justify-between pb-2">
        <div className="font-semibold cursor-pointer" onClick={(e) => setPopupVisible(true)}>{product?.productTitle}</div>
        <div className="flex flex-row items-center mt-2">
          <img
            className="w-[1.2rem] h-[1.2rem] mr-2"
            src={getPublicURL("/png/star.png")}
          ></img>
          <span className="text-[0.9rem]">Rate & Review Product</span>
        </div>
      </div>
      <div className="ml-auto flex flex-row items-center h-fit gap-4">
        <span className="font-semibold">
          {CurrencyFormatter.format(product.sellingPrice)}
        </span>
        <img
          src={getPublicURL("/png/down-triangle.png")}
          className="h-[1rem] cursor-pointer"
          style={{ transform: !open ? "" : "rotate(-90deg)" }}
          onClick={(e) => setPopupVisible(true)}
        />
      </div>
    </div>
  );
}

function ReviewLI({ data }) {
  const router = useRouter();
  const product = useSelector((x) => x.product[data.productId]);
  const [popupVisible, setPopupVisible] = useState(false);
  useEffect(() => {
    fetchProduct(data.productId);
  }, []);
  if (!product) return;
  return (
    <div className="px-2 py-4 flex flex-row gap-3">
      {product && popupVisible && (
        <Dialog
          visible={popupVisible}
          setVisible={setPopupVisible}
          padding="1.5rem"
        >
          <RateReview
            product={product}
            onCancel={(e) => setPopupVisible(false)}
            onSubmit={(e) => {
              setPopupVisible(false);
            }}
            fill={data}
          />
        </Dialog>
      )}
      <ImageHolder
        className="w-[5rem] h-[4rem] rounded-md cursor-pointer"
        src={product?.productImagesUrl?.[0]}
        style={{ gridRow: "1/5" }}
        onClick={(e) => goToProduct(router, product._id)}
      />
      <div className="grow flex flex-col justify-between pb-2">
        <div className="w-full flex flex-row items-center self-start">
          <div className="font-semibold">{product?.productTitle}</div>
          <img
            className="w-[1rem] h-[1rem] ml-4 mr-1"
            src={getPublicURL("/png/star.png")}
          ></img>
          <span className="font-semibold text-[0.95rem]">{data.rating}</span>
          <img
            src={getPublicURL("/png/down-triangle.png")}
            className="h-[1rem] cursor-pointer ml-auto"
            style={{ transform: !open ? "" : "rotate(-90deg)" }}
            onClick={(e) => setPopupVisible(true)}
          />
        </div>
        <div className="mt-1 font-semibold">{data.title}</div>
        <div className="text-[0.95rem]">{data.comment}</div>
      </div>
    </div>
  );
}

function ProductCard({ order, deliveryStatus,cancelStatus,returnStatus,setfetch }) {
  const router = useRouter();
  const oid = order.id;
  const product = useSelector((x) => x.product[oid]);
  const review = useSelector((x) => x.review[oid]);
  const [popupVisible, setPopupVisible] = useState(false);
  const [returnVisible, setReturnVisible] = useState(false);
  const [cancelVisible, setCancelVisible] = useState(false);
  const [cancelPopup, setCancelPopup] = useState(false);
  const [conformationPopup,setConfirmationPopup] = useState(false);
  const [text,setText] = useState("");
  const [refundStatus,setRefundStatus] = useState(false);

  function formatDate(dateString) {
    const options = {month: 'short', day: 'numeric' };
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString(undefined, options);
    return formattedDate;
  }

  function isDateLessThan24Hours(dateString) {
    const providedDate = new Date(dateString);
    const currentDate = new Date();
    const hoursDifference = (currentDate - providedDate) / (1000 * 60 * 60);
    return hoursDifference < 24;
  }

  useEffect(() => {
    fetchProduct(oid);
  });
  useEffect(() => {
    if (conformationPopup) {
      const timer = setTimeout(() => {
        setConfirmationPopup(false);
        setText("");
      }, 2000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [conformationPopup]);
  return (
    <div className="grow mb-4 borderB-1 text-[#dbd9d9] rounded-xl">

        {<Dialog
          visible={popupVisible}
          setVisible={setPopupVisible}
          padding="1.5rem"
        >
          <RateReview
            product={product}
            onCancel={(e) => setPopupVisible(false)}
            onSubmit={(e) => setPopupVisible(false)}
            fill={review}
          />
        </Dialog>
        }
      {
        <Dialog
          visible={returnVisible}
          setVisible={setReturnVisible}
          padding="0"
        >
          <ReturnReason setReturnVisible={setReturnVisible} order={order} setfetch={setfetch} setText={setText} setConfirmationPopup={setConfirmationPopup}></ReturnReason>
        </Dialog>
      }
      {
        <Dialog
          visible={cancelVisible}
          setVisible={setCancelVisible}
          padding="0"
        >
          <CancelReason setCancelVisible={setCancelVisible} orderId={order.orderId} setfetch={setfetch} setText={setText} setConfirmationPopup={setConfirmationPopup}></CancelReason>
        </Dialog>
      }
      {
        <Dialog
          visible={cancelPopup}
          setVisible={setCancelPopup}
          padding="0"
        >
          {order.orderStatus!=="shipped" && isDateLessThan24Hours(order.orderDate) ?<div className="bg-white w-fit text-black rounded-2xl">
          <div className="font-semibold mt-6 mx-10 flex justify-center">You cannot cancel the single product.</div>
            <div className="font-semibold mx-10">Are you sure you want to cancel the entire order?</div>
            <div className="flex gap-10 justify-center mt-5 mb-10 px-24">
            <button className="py-1 px-6 borderC-1 text-red-100 hover:bg-red-100 rounded-full" onClick={(e) => {setCancelVisible(true);setCancelPopup(false);
            }}><span className="text-black">Yes</span></button>
            <button className="py-1 px-6 borderC-1 text-green-100 hover:bg-green-100 rounded-full"
            onClick={()=>{setCancelPopup(false)}}><span className="text-black">No</span></button>
            </div>
            </div>:
            <div className="bg-white w-fit text-black rounded-2xl flex flex-col justify-center">
            <div className="font-semibold my-6 mx-10">You cannot cancel at this stage.</div>
            <button className="py-1 px-6 borderC-1 text-green-100 hover:bg-green-100 rounded-full mx-auto mb-6" onClick={(e) => {setCancelPopup(false);
            }}><span className="text-black">Ok</span></button>
            </div>}
        </Dialog>
      }
      {
        <Dialog
          visible={conformationPopup}
          setVisible={setConfirmationPopup}
          padding="0"
        >
        <div className="w-fit rounded-2xl text-black">
          <div className="font-semibold my-6 mx-10 flex justify-center">{text}</div>
        </div>
        </Dialog>
      }
      {
        <Dialog
          visible={refundStatus}
          setVisible={setRefundStatus}
          padding="0"
        >
        <RefundStatus shippingAddressId={order.shippingAddressId} order={order}></RefundStatus>
        </Dialog>
      }
      {/* <div className="flex flex-row text-sm justify-between p-3 px-5">
        <div className="text-gray-1300">
          Order ID -{" "}
          <span className="text-black font-bold">
            {order.orderId.split("_")[1]}
          </span>
        </div>
        <div className="text-gray-1300">
          Order Date -{" "}
          <span className="text-black font-bold">
            {new Date(order.createdAt).toLocaleDateString("en-GB")}
          </span>
        </div>
        <div className="text-[#FD2E35]">
          Delivery date - <span className="font-bold">14/03/2023</span>
        </div>
      </div> */}
      <div>
        <div
          className="md:p-4 py-4  text-black"
          style={{
            display: "grid",
            columnGap: "0.5rem",
            gridTemplateColumns: "min-content auto",
          }}
        >
          <ImageHolder
            className="w-[6rem] md:w-[8rem] h-[4rem] object-fill rounded-md cursor-pointer"
            src={product?.productImagesUrl?.[0]}
            style={{ gridRow: "1/5" }}
            onClick={(e) => goToProduct(router, product._id)}
          />
          <div className="self-start text-xs md:text-[0.9rem] flex flex-row justify-between">
          <span className="md:hidden">
            <span className="font-bold ">{product?.productTitle.substring(0,20) || "..."}</span>
            <span className="font-bold">{product?.productTitle.length>20?"...":""}</span>
            </span>
            <span className="font-bold hidden md:block">{product?.productTitle || "..."}</span>
            <div className="md:ml-15 -z-10 text-[0.5rem] md:text-[0.9rem] font-semibold">
              {deliveryStatus ? !returnStatus? (
                <div className="flex mb-2 mr-6 ">
                  <div  className="bg-[#0DB700] blur-[4px] md:w-4 md:h-4 w-2 h-2 rounded-full mt-1 mr-2"></div>
                  <div className="">Delivered On Sep 07</div>
                </div>) : (
                  <div className="flex mb-2 mr-6">
                  <div className="bg-[#d7201c] blur-[3px] md:w-4 md:h-4 w-2 h-2 rounded-full mt-1 mr-2"></div>
                  <div className="">Returned On {formatDate(order.returnedDate)}</div>
                </div>)
                 : !cancelStatus ? (
                <div className="flex mb-2 mr-6">
                  <div className="bg-[#EAD300] blur-[3px] md:w-4 md:h-4 w-2 h-2 rounded-full mt-1 mr-2"></div>
                  <div className="">Ordered On {formatDate(order.orderDate)}</div>
                </div>
              ) : (
                <div className="flex mb-2 mr-6">
                  <div className="bg-[#d7201c] blur-[3px] md:w-4 md:h-4 w-2 h-2 rounded-full mt-1 mr-2"></div>
                  <div className="">cancelled On {formatDate(order.cancelledDate)}</div>
                </div>
              )}
            </div>
          </div>
          <div className="self-end flex text-xs md:text-sm flex-row justify-between items-center mt-2">
            <div className="mb-auto">
              <span className=" font-bold mr-2">Price:</span>
              <span className="mr-[0.5rem]">
                {CurrencyFormatter.format(order.price)}
              </span>
            </div>
            {deliveryStatus ? !returnStatus? (
              <div className="md:flex mr-2 items-center">
                <div className="flex flex-row text-[0.6rem] borderB-1 md:mb-0 mb-2 text-indigo-200 hover:bg-indigo-200  rounded-full  md:text-xs">
                  <button
                    className="w-[6rem] md:w-[8rem] p-1 font-semibold text-black hover:text-white"
                    onClick={(e) => setPopupVisible((v) => !v)}
                  >
                    {review ? "Edit your review" : "Rate and Review"}
                  </button>
                </div>
                <div className="flex flex-row text-[0.6rem] borderB-1 md:ml-4 justify-center text-indigo-200 hover:bg-indigo-200  rounded-full  md:text-xs">
                  <button
                    className="w-[5rem] md:w-[8rem] text-black hover:text-white font-semibold p-1 self-end"
                    onClick={() => {
                      setReturnVisible(true);
                    }}
                  >
                    Return Order
                  </button>
                </div>
              </div>
            ):(<div className="flex items-center mr-6">
                <div className="flex flex-row">
                  <button className="text-[0.6rem] md:text-sm" onClick={()=>setRefundStatus(true)}>More →</button>
                </div>
              </div>) : !cancelStatus ? (
              <div className="md:flex mr-2 items-center">
                {order.trackingLink && <div className="flex flex-row md:mb-0 mb-2 text-[0.6rem] borderB-1 text-indigo-200 hover:bg-indigo-200  rounded-full  md:text-xs">
                <Link href={`${order.trackingLink?order.trackingLink:""}`} target="_blank">
                  <button className="w-[6rem] md:w-[8rem] p-1 font-semibold text-black hover:text-white">
                    Track orders
                  </button>
                  </Link>
                </div>}
                <div className="flex flex-row text-[0.6rem] borderB-1 md:ml-4 text-indigo-200 hover:bg-indigo-200  rounded-full  md:text-xs">
                  <button
                    className="w-[6rem] md:w-[8rem] text-black hover:text-white font-semibold p-1 self-end"
                    onClick={() => {
                      setCancelPopup(true);
                    }}
                  >
                    Cancel Order
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center  mr-6">
                <div className="flex flex-row">
                  <button className="text-[0.6rem] md:text-sm" onClick={()=>setRefundStatus(true)}>More →</button>
                </div>
              </div>
            )}
          </div>
        </div>
        {false && (
          <div>
            <div className="h-[1px] bg-[#e3e2e2]"></div>
            <div className="px-6 py-2 text-black">
              <div className="flex text-sm">
                <div className="font-semibold text-[#0DB700] mr-10">
                  Refund Completed
                </div>
                <div>{"(Refund ID - 123456)"}</div>
              </div>
              <div className="flex justify-between mt-2">
                <div>
                  Refund of ₹300 initiated to your account ending in ****3421{" "}
                </div>
                <button className="mr-2 text-[0.6rem] md:text-sm">More →</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}