import { getPublicURL } from "../../util/UrlUtils";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { getSingleProduct } from "../../util/ApiClient";
import { useDispatch, useSelector } from "react-redux";
import ImageHolder from "../../components/ImageHolder";
import Header from "../../components/Header";
import { CurrencyFormatter } from "../../util/StringUtil";
import { Home, Office, Others, RadioButton } from "../../components/svg";
import { makeRequest, placeOrder, placeCOD } from "../../util/ApiClient";
import Price from "../../components/Price";
import { cartClear, cartRemove } from "../../redux/slices/cartSlice";
import { addToCart, removeFromCart } from "../../util/ApiClient";
export default function OrderReview() {
  const router = useRouter();
  const cart = useSelector((x) => x.cart);
  const buyNow = router.query.productId;
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState({});
  const [Address1, setAddress1] = useState({});
  const Address = useSelector((x) => x.address);
  const [cod, setCod] = useState(false);
  const dispatch = useDispatch();
  const filteredList = {};
  useEffect(() => {
    setSelectedProducts(JSON.parse(localStorage.getItem("selectedProducts")));
    setSelectedAddress(JSON.parse(localStorage.getItem("SelectedAddress")));
    setAddress1(JSON.parse(localStorage.getItem("SelectedAddress")));
  }, []);
  let discount = 0;
  let Price = 0;
  const noOfItems = selectedProducts.length;
  selectedProducts.map((product, i) => {
    filteredList[product._id] = cart[product._id];
    if (cart[product._id]) {
      const quantity = cart[product._id].quantity;
      discount += quantity * (product.mrp - product.sellingPrice);
      Price += quantity * product.mrp;
    }
  });

  return (
    <div>
      <Header page="Review" />
      <div className="md:px-10">
        <div className="p-4 pb-0">
          <div className="md:text-lg font-bold ml-2">Review Your Order</div>
          {/* <div className="text-xs mt-[0.5rem]">
                    <input type="checkbox" />
                    By Placing Your Order, You Agree To Swasha's Privacy Notice And Conditions Of Use.
                </div> */}
        </div>
        <div className="md:flex flex-row items-start">
          <div className="grow md:mb-16">
            <div className="borderH-2 rounded-md m-4">
              <Heading text="Your Order Details" />
              <div className="divide-solid divide-x-0 divide-y divide-gray-1000 px-4">
                {selectedProducts.map((product, i) => {
                  return (
                    <OrderDetails
                      key={i}
                      item={cart[product._id]}
                      product={product}
                      selectedProducts={selectedProducts}
                      setSelectedProducts={setSelectedProducts}
                    />
                  );
                })}
              </div>
            </div>

            <div className="borderH-2 rounded-md m-4">
              <Heading text="Your Shipping Details" />
              <div className="divide-solid divide-x-0 divide-y divide-gray-1000 px-4">
                {[...Array(1).keys()].map((i) => {
                  return (
                    <ShippingDetails
                      key={i}
                      selectedAddress={Address1}
                      setSelectedAddress={setSelectedAddress}
                      Address={Address}
                    />
                  );
                })}
              </div>
            </div>

            {/* <div className="borderH-2 rounded-md m-4 md:mb-16">
                        <Heading text="Your Billing Details" />
                        <div className="divide-solid divide-x-0 divide-y divide-gray-1000 px-4">
                            <BillingDetails />
                        </div>
                    </div> */}
          </div>
          <div className="md:w-[25rem] flex flex-col items-center p-4 gap-2">
            {/* <div className="borderH-2  w-full p-3 rounded-lg">
                        <div className="text-sm font-bold ml-1">Support Us:</div>
                        <div className="w-full h-full flex flex-row text-sm py-2 gap-3 md:gap-5">
                            <div><input className="borderH-2 border-[#003C7A]" type="checkbox" /><span>10 Rs</span></div>
                            <div><input type="checkbox" /><span>50 Rs</span></div>
                            <div><input type="checkbox" /><span>100 Rs</span></div>
                            <div><input type="text" placeholder="Other" className="borderH-2 w-[97px] text-center text-gray-1500 rounded-full" /></div>
                        </div>
                        <div className="text-sm text-[#003C7A] ml-1">Know More</div>
                    </div> */}
            <div className="grow rounded-lg w-full">
              <PriceBlock
                Price={Price}
                discount={discount}
                noOfItems={noOfItems}
                cod={cod}
                setCod={setCod}
              />
            </div>
            <button
              style={{ fontSize: "1rem", padding: "0.5rem 0" }}
              className="yellow-btn w-full"
              onClick={() => {
                {
                  const filteredCart = { ...filteredList };
                  if (buyNow) {
                    Object.keys(filteredList).forEach((k) => {
                      if (k !== buyNow) delete filteredCart[k];
                    });
                  }
                  makeRequest(
                    cod ? placeCOD : placeOrder,
                    {
                      cart: filteredCart,
                      addressId: selectedAddress._id,
                    },
                    { loading : true,
                      onSuccess: (res) => {
                        // console.log("success");
                        // if (buyNow) {
                        //     dispatch(cartRemove(buyNow));
                        // } else {
                        //     dispatch(cartClear(filteredCart));
                        // }
                        Object.entries(filteredCart).forEach((item) => {
                          makeRequest(removeFromCart, item[0]);
                        });
                        window.sessionStorage.setItem(
                          "lastOrder",
                          JSON.stringify(res)
                        );
                        router.replace("/products/orderSuccessful");
                      },
                      onFailure: (error) => {
                        router.replace("/products/orderFailure");
                      },
                    }
                  );
                  return;
                }
              }}
            >
              Pay And Place Your Order
            </button>
            <div className="borderH-2 flex flex-row items-center p-2 mt-4 w-full mb-14 md:mb-0 rounded-lg">
              <img
                className="h-[5rem]"
                src={getPublicURL("/svg/payment.svg")}
              />
              <div className="w-full h-full flex flex-col ml-2 justify-center gap-[0.2rem]">
                <div className="text-sm font-bold">Secure Payment</div>
                <div className="text-xs">
                  Safe And Secure Payments. Easy Returns. 100% Authentic
                  Products.
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="fixed left-0 bottom-0 bg-white p-3 w-full text-center">
                <button className="yellow-btn">Continue</button>
            </div> */}
      </div>
    </div>
  );
}

function Heading({ text }) {
  const router = useRouter();
  return (
    <div className="flex justify-between">
      <div className="md:text-lg font-bold mt-4 ml-4">{text}</div>
      <button
        className="text-sm bg-gray-bg p-2 rounded-md"
        onClick={() =>
          text === "Your Shipping Details"
            ? router.push("../user/CartAddresses")
            : router.push("../user/cart")
        }
      >
        Change
      </button>
    </div>
  );
}

function OrderDetails({
  item,
  product,
  selectedProducts,
  setSelectedProducts,
}) {
  useEffect(() => {
    localStorage.setItem("selectedProducts", JSON.stringify(selectedProducts));
  }, [selectedProducts]);
  return (
    <div
      className="py-4 md:py-6"
      style={{
        display: "grid",
        columnGap: "0.75rem",
        gridTemplateColumns: "min-content auto",
      }}
    >
      <ImageHolder
        className="w-[6rem] h-[5rem] md:w-[12rem] md:h-[9rem] md:mr-8 md:rounded-lg rounded-md"
        style={{ gridRow: "1/8" }}
        src={product.productImagesUrl[0]}
      />
      <div className="self-start text-sm md:text-base font-bold mb-2 flex flex-row ">
        <span className="hidden md:block">{product.productTitle}</span>
        <span className="md:hidden">
          {product.productTitle.substring(0, 20).length === 20
            ? product.productTitle.substring(0, 20) + "..."
            : product.productTitle.substring(0, 20)}
        </span>
        <img
          className="w-3 ml-auto md:mr-4 cursor-pointer"
          src={getPublicURL("/svg/delete.svg")}
          onClick={() => {
            setSelectedProducts(
              selectedProducts.filter(
                (selectedProduct) => selectedProduct !== product
              )
            );
          }}
        />
      </div>
      <div className="mt-2 mb-1 flex-row text-xs md:text-sm items-center font-bold md:block hidden">
        <span className="font-bold mr-2">Delivery Date:</span>
        <span>22/01/23 (expected)</span>
      </div>
      <div className="flex flex-row mb-1 text-xs md:text-sm items-center font-bold">
        <span className="font-bold mr-2">Quantity:</span>
        <span>{item?.quantity}</span>
      </div>
      <div className="flex flex-row text-xs md:text-sm items-center font-bold">
        <span className="font-bold mr-2">Color:</span>
        <span>{product.colours[0]}</span>
      </div>
      <div className=" text-xs md:text-sm">
        <span className="font-bold mr-2">Price:</span>
        <Price
          className="text-base"
          price={product.mrp * item?.quantity}
          discount={((product.mrp - product.sellingPrice) * 100) / product.mrp}
        />
      </div>
      {product.mrp - product.sellingPrice !== 0 && (
        <div className="text-[#008D21] mt-2 font-semibold text-sm md:text-md">
          You got{" "}
          {(((product.mrp - product.sellingPrice) / product.mrp) * 100).toFixed(
            2
          )}
          % discount on this order
        </div>
      )}
    </div>
  );
}

function ShippingDetails({ selectedAddress, setSelectedAddress, Address }) {
  let address = [];
  let i = 0;
  Address
    ? Object.entries(Address).map((x, k) => {
        if (selectedAddress._id !== x[0]) {
          if (i < 2) {
            address[i] = x;
            i++;
          }
        }
      })
    : "";
  return (
    <form className="flex flex-col md:flex-row text-sm gap-5 my-3">
      <div>
        <input
          type="radio"
          name="address"
          defaultChecked
          onClick={() => setSelectedAddress(selectedAddress)}
        />
        <span>
          <Home /> {selectedAddress?.fullName}
        </span>
        <CardDetails Address={selectedAddress} />
      </div>
      {address.length > 0 && (
        <div>
          <input
            type="radio"
            name="address"
            onClick={() => setSelectedAddress(address[0][1])}
          />
          <span>
            <Home />
            {address[0][1]?.fullName}
          </span>
          <CardDetails Address={address[0][1]} />
        </div>
      )}
      {address.length > 1 && (
        <div>
          <input
            type="radio"
            name="address"
            onClick={() => setSelectedAddress(address[1][1])}
          />
          <span>
            <Home />
            {address[1][1]?.fullName}
          </span>
          <CardDetails Address={address[1][1]} />
        </div>
      )}
    </form>
  );
}

function CardDetails({ Address }) {
  return (
    <div className="ml-5 mt-2 ">
      <div className="flex flex-row ml-2 flex-wrap md:flex-col gap-1">
        <div>{Address?.addressLine1},</div>
        <div>{Address?.addressLine2},</div>
        <div>{Address?.landmark},</div>
        <div>Pin-{Address?.postalCode},</div>
        <div>
          {Address?.city}, {Address?.state}.
        </div>
      </div>
    </div>
  );
}

function BillingDetails() {
  return (
    <div>
      <div
        className="py-4 md:py-6"
        style={{
          display: "grid",
          columnGap: "0.75rem",
          gridTemplateColumns: "min-content auto",
        }}
      >
        <ImageHolder
          className="w-[8.5rem] md:w-[15rem] h-[6rem] md:mr-5 md:h-[10rem] mt-6 md:mt-0"
          style={{ gridRow: "1/5" }}
        />
        <div className="self-start text-sm md:text-base font-bold flex flex-row">
          <span>User Name</span>
        </div>
        <div className="text-xs md:text-sm font-bold">
          Card No. : 123456789012345
        </div>
        <div className="text-xs my-1 md:my-0 text-[#FD2E35]">
          The above number is from your last payment mode, If you like to change
          it{" "}
          <a className="text-[#FD2E35]" href="##">
            tap on change!
          </a>
        </div>
        <div className="text-xs flex flex-row flex-wrap md:flex-col md:text-sm">
          <div className="mt-1">Platinum Heights,</div>
          <div className="mt-1">Flat No 104,</div>
          <div className="mt-1">Bhagya Nagar, KPHP</div>
          <div className="mt-1">Pin-500024</div>
          <div className="mt-1">Hyderabad, TS.</div>
        </div>
      </div>
    </div>
  );
}

function PriceBlock({ Price, discount, noOfItems, cod, setCod }) {
  // selectedProducts.forEach((x) => {
  //     if (!cart[x._id]) return;
  //     Cart_price += cart[x._id].quantity * x.mrp;
  //     Cart_discount += cart[x._id].quantity * (x.sellingPrice-x.mrp) ;
  //   });
  let deliveryCharges = 50;
  const CODCharges = Math.max(22, 0.012 * (Price + deliveryCharges - discount));

  return (
    <div className="grow borderH-2 rounded-md w-full">
      <div className="bg-gray-400 md:text-lg font-bold p-4">Price Details:</div>
      <div
        className="p-4 text-sm md:text-base"
        style={{
          display: "grid",
          rowGap: "0.75rem",
          gridTemplateColumns: "auto min-content",
        }}
      >
        <div>Price ({noOfItems} items)</div>
        <div>{CurrencyFormatter.format(Price)}</div>
        <div>Discount</div>
        <div>{CurrencyFormatter.format(discount)}</div>
        <div>Delivery Charges</div>
        <div className="line-through">
          {CurrencyFormatter.format(deliveryCharges)}
        </div>
        {cod && <div>COD Charges</div>}
        {cod && <div className="line-through">
          {CurrencyFormatter.format(CODCharges)}
        </div>}
        <div
          style={{ gridColumn: "1/-1", borderTop: "1px dashed #707070" }}
        ></div>
        <div>Total Amount</div>
        <div>{CurrencyFormatter.format(Price - discount)}</div>
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
        <div className="py-2 flex flex-row px-2 justify-center  gap-4 col-span-2">
          <div className="flex flex-row items-center gap-2 text-sm bg-[#f8f9fa] py-1 px-4 rounded-full">
            <RadioButton
              checked={cod}
              diameter="1.2rem"
              onClick={(e) => setCod(true)}
            />
            COD
          </div>
          <div className="flex flex-row items-center gap-2 bg-[#f8f9fa] py-1 px-4 rounded-full">
            <RadioButton
              checked={!cod}
              diameter="1.2rem"
              onClick={(e) => setCod(false)}
            />
            Pay Now
          </div>
        </div>
      </div>
    </div>
  );
}
