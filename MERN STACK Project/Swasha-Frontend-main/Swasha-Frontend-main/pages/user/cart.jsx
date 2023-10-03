import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState, React } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { LogoForHeader1, LogoForHeader2, SquareRadioButton } from "../../components/svg";
import Counter from "../../components/Counter";
import Dialog from "../../components/Dialog";
import ImageHolder from "../../components/ImageHolder";
import Price from "../../components/Price";
import { cartClear, cartRemove } from "../../redux/slices/cartSlice";
import {
  addToCart,
  getSingleProduct,
  makeRequest,
  placeOrder,
} from "../../util/ApiClient";
import { CurrencyFormatter } from "../../util/StringUtil";
import { OTPBox } from "../auth/verify-otp-popup";
import { getPublicURL } from "../../util/UrlUtils";

let selectedProducts = [];

function CartPrice({
  cart,
  setSelectedProductsPrice,
  setSelectedProductsDiscount,
}) {
  let Cart_price = 0;
  let Cart_discount = 0;
  selectedProducts.forEach((x) => {
    if (!cart[x._id]) return;
    Cart_price += cart[x._id].quantity * x.mrp;
    Cart_discount += x.sellingPrice - x.mrp;
  });
  setSelectedProductsPrice(Cart_price);
  setSelectedProductsDiscount(
    Cart_discount < 0 ? Cart_discount * -1 : Cart_discount
  );
}

export default function CartPage() {
  const cart = useSelector((x) => x.cart);
  const user = useSelector((x) => x.user);
  const Addresses = useSelector((x) => x.address);
  const [selectedProductsPrice, setSelectedProductsPrice] = useState(0);
  const [selectedProductsDiscount, setSelectedProductsDiscount] = useState(0);
  const [products, setProducts] = useState([]);
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupType, setPopupType] = useState(0);
  const [reviewOrder, setReviewOrder] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState();
  const dispatch = useDispatch();
  const router = useRouter();
  const buyNow = router.query.productId;
  const [selected, setSelected] = useState(1);
  useEffect(() => {
    if (cart.default || !router.isReady) return;
    Promise.all(
      Object.entries(cart).map(([k, v]) => getSingleProduct({ productID: k }))
    ).then((res) => {
      let prods = res.map((x) => x.data);
      if (router.query.productId)
        prods = prods.filter((x) => x._id === router.query.productId);
      setProducts(prods);
    });
  }, [cart]);
  useEffect(() => {
    if (!user) return;
    if (user.mobileVerified) setPopupType(1);
    else setPopupType(0);
  }, [user]);

  let PriceCol = (
    <div className="md:w-[25rem] flex flex-col items-center p-4 gap-2">
      <PriceBlock
        buyNow={buyNow}
        selectedProductsPrice={selectedProductsPrice}
        selectedProductsDiscount={selectedProductsDiscount}
      />
      <button
        style={{ fontSize: "1.25rem", padding: "0.5rem 0" }}
        className="yellow-btn w-full"
        onClick={(e) => {
          localStorage.setItem(
            "selectedProducts",
            JSON.stringify(selectedProducts)
          );
          localStorage.setItem(
            "price_details",
            JSON.stringify([
              selectedProducts.length,
              selectedProductsPrice,
              selectedProductsDiscount,
            ])
          );
          if (buyNow) {
            const filteredCart = { ...cart };

            if (reviewOrder) {
              Object.keys(cart).forEach((k) => {
                if (k !== buyNow) delete filteredCart[k];
              });
            }
            makeRequest(
              placeOrder,

              {
                cart: filteredCart,
                addressId: selectedAddress,
              },
              { loading:true,
                onSuccess: (res) => {
                  if (buyNow) {
                    dispatch(cartRemove(buyNow));
                  } else {
                    dispatch(cartClear());
                  }
                  window.sessionStorage.setItem(
                    "lastOrder",
                    JSON.stringify(res)
                  );
                  router.replace("/products/orderSuccessful");
                },
              }
            );
            return;
          }
          if (!Object.keys(cart).length) {
            toast.error("Cart is empty");
            return;
          }
          router.push(`../user/CartAddresses`);
          // setPopupVisible(true);
        }}
      >
        {reviewOrder ? "Pay And Place Your Order" : "Place Your Order"}
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
  );

  if (reviewOrder)
    return (
      <>
      <div className="md:hidden flex justify-between  border-1 px-2 h-14">
      <img
          src={getPublicURL("/svg/blueback.svg")}
          className="h-[1.1rem] my-auto ml-2 cursor-pointer"
          onClick={(e) => {
            router.back();
          }}
        />
       <div className="flex items-center" onClick={()=>{router.push("/")}}>
  {/* <div className="mr-2">
    <LogoForHeader1 width="20" height="37" />
   
  </div>
  <div className="">
    <LogoForHeader2 width="120" height="25" />
  </div> */}
   <img
          src={getPublicURL("/svg/Logoblue.svg")}
          onClick={(e) => router.push("/")}
          className="h-44  mx-auto  cursor-pointer"
          
        />
</div>
     

      </div>
      <div className="center-max">
        <div className="mt-4 mx-4">
          <div className="text-[1.3rem] font-semibold">Review Your Order</div>
          <div className="flex flex-row mt-1">
            <input type="checkbox" />
            <span className="text-sm ml-1">
              By placing your order, you agree to Swasha's privacy notice and
              terms of use.
            </span>
          </div>
        </div>
        <div className="md:flex flex-row items-start">
          <div className="grow pt-4 pl-4">
            <div className="borderH-2 rounded-md">
              <div className="bg-gray-bg p-4">
                <div className="md:text-lg font-bold">Your Order Details</div>
              </div>
              <div className="divide-solid divide-x-0 divide-y divide-gray-1000 md:px-4">
                {products.map((x) => {
                  return (
                    <ReviewLI key={x._id} product={x} item={cart[x._id]} />
                  );
                })}
              </div>
            </div>
            <div className="borderH-2 p-4 rounded-md my-4">
              <AddressManager
                className=""
                onSelect={(a) => setSelectedAddress(a)}
                preSelect={selectedAddress}
                grid="grid"
              ></AddressManager>
            </div>
          </div>
          {PriceCol}
        </div>
      </div>
      </>
    );
  return (
    <div className="relative bg-[#FCFDFC]">
      <div className="md:hidden flex justify-between  sticky top-0 border-1 mb-2 py-2 bg-white px-2 h-14 z-50">
      <img
          src={getPublicURL("/svg/back.svg")}
          className="h-[1.1rem] my-auto ml-2 cursor-pointer"
          onClick={(e) => {
            router.back();
          }}
        />
       <div className="flex items-center" onClick={()=>{router.push("/")}}>
  {/* <div className="mr-2">
    <LogoForHeader1 width="20" height="37" />
   
  </div>
  <div className="">
    <LogoForHeader2 width="120" height="25" />
  </div> */}
        <img
          src={getPublicURL("/svg/Logoblue.svg")}
          onClick={(e) => router.push("/")}
          className="h-44  mx-auto  cursor-pointer"
          
        />
</div>
<div></div>
       

      </div>
      {popupVisible && popupType === 0 && (
        <Dialog
          padding="1.5rem"
          visible={popupVisible}
          setVisible={setPopupVisible}
        >
          {/* <div className="flex flex-col items-center"> */}
          <div className="text-[1.3rem]">Verify Mobile</div>
          <OTPBox
            titleSize="1.3rem"
            className="w-fit"
            onSuccess={(e) => {
              setPopupType(1);
            }}
          />
          {/* </div> */}
        </Dialog>
      )}
      {popupVisible && popupType === 1 && (
        <AddressDialog
          popupVisible={popupVisible}
          setPopupVisible={setPopupVisible}
          initiatePayment={(addressId) => {
            setReviewOrder(true);
            setSelectedAddress(addressId);
          }}
        />
      )}
      <div className=" center-max md:flex flex-row items-start">
        <div className="grow borderH-2 md:ml-16 md:my-10 md:mr-6 rounded-md ">
          <div className="bg-gray-bg p-4 flex justify-between">
            <div className="md:text-lg font-bold">
              {buyNow ? "Buy Now" : "Shopping Cart:"}
            </div>
            {Object.keys(cart).length !== 0 && <div
              className="text-sm cursor-pointer mt-[0.5rem] mr-3 text-[#019696]"
              onClick={() => {
                setSelected(!selected);
              }}
            >
              {selected == 0 ? "Select All" : "Deselect All"}
            </div>}
          </div>
          <div className="divide-solid divide-x-0 divide-y divide-gray-1000 md:px-4">
            {products.map((x) => {
              return (
                <CartLI
                  key={x._id}
                  product={x}
                  item={cart[x._id]}
                  selectAll={selected}
                  cart={cart}
                  setSelectedProductsPrice={setSelectedProductsPrice}
                  setSelectedProductsDiscount={setSelectedProductsDiscount}
                  deselectAll = {(e)=>{setSelected(e)}}
                />
              );
            })}
          </div>
          {Object.keys(cart).length === 0 && (
            <div className="flex flex-col items-center justify-center">
              <img
                src={getPublicURL("/gif/cart_empty.gif")}
                style={{
                  width: "22rem",
                }}
              />
              <div className="flex flex-col items-center md:mb-8 mb-6 mt-6 md:mt-10">
                <button className="yellow-btn" onClick={()=>{{
                  router.replace({
                    pathname: "/products/search",
                  });
                }}}>Continue Shopping</button>
            </div>
            </div>
          )}
        </div>
        {Object.keys(cart).length !== 0 && PriceCol}
      </div>
      {/* <RecentlyRemoved /> */}
    </div>
  );
}

function AddressDialog({ popupVisible, setPopupVisible, initiatePayment }) {
  const address = useRef();
  return (
    <Dialog visible={popupVisible} setVisible={setPopupVisible}>
      <AddressManager onSelect={(a) => (address.current = a)}>
        <button
          className="blue-button-2 mt-4"
          onClick={() => {
            setPopupVisible(false);
            initiatePayment(address.current);
          }}
        >
          Proceed to pay
        </button>
      </AddressManager>
    </Dialog>
  );
}
function PriceBlock({
  buyNow,
  selectedProductsPrice,
  selectedProductsDiscount,
}) {
  const cart = useSelector((x) => x.cart);
  const address = useSelector((x) => x.address);
  let discount = selectedProductsDiscount;
  let deliveryCharges = 50;

  return (
    <div className="grow borderH-2 mt-6 rounded-md w-full">
      <div className="bg-gray-bg md:text-lg font-bold p-4">Price Details:</div>
      <div
        className="p-4 text-sm md:text-base"
        style={{
          display: "grid",
          rowGap: "0.75rem",
          gridTemplateColumns: "auto min-content",
        }}
      >
        <div>Price ({buyNow ? 1 : selectedProducts.length} items)</div>
        <div>{CurrencyFormatter.format(selectedProductsPrice)}</div>
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
        <div>{CurrencyFormatter.format(selectedProductsPrice - discount)}</div>
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

// function RecentlyRemoved() {
//   return (
//     <div className="borderH-2 m-4 rounded-md">
//       <div className="bg-gray-bg p-4">
//         <div className="md:text-lg font-bold">Recently removed items</div>
//       </div>
//       <div className="p-4 no-scrollbar overflow-x-scroll flex flex-row gap-[0.7rem] md:gap-[1.3rem]">
//         {[...Array(10).keys()].map((x, i) => (
//           <RecentlyRemovedCard key={i} />
//         ))}
//       </div>
//     </div>
//   );
// }

// function RecentlyRemovedCard() {
//   return (
//     <div
//       style={{ boxShadow: "var(--card-shadow-1)" }}
//       className="rounded-lg overflow-hidden shrink-0 w-[10rem] md:w-[15rem]"
//     >
//       <div className="flex flex-col w-full p-3 gap-2">

//         <ImageHolder className="w-full h-[8.5rem] md:h-[12rem]" />
//         <div className="whitespace-normal two-lines-max text-xs md:text-sm font-bold">
//           Women Multicolor Handbag - Extra Spacious
//         </div>
//         <div className="text-xs md:text-sm flex flex-row items-center font-bold">
//           <span className="font-bold mr-2">Price:</span>
//           <span className="text-green-300 mr-[0.5rem]">${100}</span>
//           <s className="text-gray-1400">
//             <span>${100}</span>
//           </s>
//         </div>
//       </div>
//       <button className="bg-yellow-btn text-white text-center w-full px-4 py-2 text-xs md:text-sm font-bold">
//         Add to Wishlist
//       </button>
//     </div>
//   );
// }

function ReviewLI({ product, item }) {
  const router = useRouter();
  function goToProductDetails() {
    router.push(`/products/view?id=${product._id}`);
  }
  if (!product || !item) return <></>;
  return (
    <div
      className="py-4 md:py-6"
      style={{
        display: "grid",
        columnGap: "1rem",
        gridTemplateColumns: "min-content auto",
      }}
    >
      <div style={{ gridRow: "1/6" }} className="relative">
        <ImageHolder
          className="w-[4rem] md:w-[10rem] h-[8rem] rounded-md cursor-pointer"
          src={product.productImagesUrl[0]}
          onClick={goToProductDetails}
        />
        <div className="absolute top-[0rem] left-[0rem] px-1 rounded-br-md bg-white">
          {product.stock === 0 ? (
            <img
              className="self-start h-[0.75rem]"
              src={getPublicURL("/png/outofstock.png")}
            />
          ) : (
            <div></div>
          )}
        </div>
      </div>
      <div className="self-start text-sm md:text-base font-bold flex flex-row">
        <span className="cursor-pointer" onClick={goToProductDetails}>
          {product.productTitle}
        </span>
        <img
          className="w-4 ml-auto mr-4 cursor-pointer"
          src={getPublicURL("/svg/delete.svg")}
          onClick={(e) => {
            makeRequest(addToCart, { productId: item.productId, quantity: 0 },{loading:true});
            
          }}
        />
      </div>
      <div className="text-2sm">
        <span>seller - </span>
        <span>Nirmaan Organization</span>
      </div>
      <span className="font-semibold mr-2">Price:</span>
      <Price
        className="mt-4 mb-2 text-lg"
        price={product.mrp * item.quantity}
        discount={((product.mrp - product.sellingPrice) / product.mrp)*100}
      />
      <div className="flex flex-row text-xs md:text-sm items-center font-bold">
        <span className="font-bold mr-2">Quantity:</span>
        <Counter
          buttonHeight="2rem"
          buttonPadding="0.2rem"
          initValue={item.quantity}
          onChange={(n) => {
            makeRequest(addToCart, {
              productId: item.productId,
              quantity: n,
            },{loading:true,});
          }}
        />
      </div>
      {/* <button
        className="yellow-btn w-[10rem] self-end"
        style={{ height: "min-content" }}
      >
        Buy Now
      </button> */}
    </div>
  );
}

function CartLI({
  product,
  item,
  selectAll,
  cart,
  setSelectedProductsPrice,
  setSelectedProductsDiscount,
  deselectAll
}) {
  const router = useRouter();
  const [selected, setSelected] = useState(0);
  const [outOfStock, setOutOfStock] = useState(!(product.stock === 0));
  const opacityBuyNow = !outOfStock ? "opacity-50" : "";
  function goToProductDetails() {
    router.push(`/products/view?id=${product._id}`);
  }
  if (!product || !item) return <></>;
  if (selectAll && outOfStock && !selectedProducts.includes(product))
    selectedProducts.push(product);
  CartPrice({ cart, setSelectedProductsPrice, setSelectedProductsDiscount });
  if (!selectAll && selectedProducts.includes(product) && !selected) {
    selectedProducts = selectedProducts.filter((item) => item !== product);
    CartPrice({ cart, setSelectedProductsPrice, setSelectedProductsDiscount });
  }

  return (
    <div className="flex">
      <div className="grow-y flex items-center">
        <SquareRadioButton
          diameter="1rem"
          className="p-0.5"
          checked={(selected || selectAll) && outOfStock}
          onClick={(e) => {
            if(selectAll && outOfStock){
              deselectAll(0);
              setSelected(1);
              selectedProducts = [product];
            }
             else if (selected === 0 && outOfStock) {
              setSelected(1);
              if (!selectedProducts.includes(product)) {
                selectedProducts.push(product);
              }
            } else {
              setSelected(0);
              if (selectedProducts.includes(product))
                selectedProducts = selectedProducts.filter(
                  (item) => item !== product
                );
            }
            CartPrice({
              cart,
              setSelectedProductsPrice,
              setSelectedProductsDiscount,
            });
          }}
        />
      </div>
      <div
        className="py-4 md:py-6 grow"
        style={{
          display: "grid",
          columnGap: "1rem",
          gridTemplateColumns: "min-content auto",
        }}
      >
        <div style={{ gridRow: "1/6" }} className="relative">
          <ImageHolder
            className="w-[7.5rem] md:w-[10rem] h-[8rem] rounded-md cursor-pointer"
            src={product.productImagesUrl[0]}
            onClick={goToProductDetails}
          />
          <div className="absolute top-[0rem] left-[0rem] px-1 rounded-br-md bg-white">
            {product.stock === 0 ? (
              <img
                className="self-start h-[0.75rem]"
                src={getPublicURL("/png/outofstock.png")}
              />
            ) : (
              <div></div>
            )}
          </div>
        </div>
        <div className="self-start text-sm md:text-base font-bold flex flex-row justify-between grow">
          <span className="cursor-pointer" onClick={goToProductDetails}>
            {product.productTitle}
          </span>
          <img
            className="w-4 ml-auto mr-4 cursor-pointer"
            src={getPublicURL("/svg/delete.svg")}
            onClick={(e) => {
              makeRequest(addToCart, {
                productId: item.productId,
                quantity: 0,
              },{loading:true});
              selectedProducts = selectedProducts.filter(
                  (item) => item !== product
                );
            }}
          />
        </div>
        <div className="text-2sm">
          <span>seller - </span>
          <span>Nirmaan Organization</span>
        </div>
        <div className="mt-4 mb-2 ">
          <span className="font-semibold mr-2">Price:</span>
          <Price
            className="text-base"
            price={product.mrp * item.quantity}
            discount={
              ((product.mrp - product.sellingPrice) * 100) / product.mrp
            }
          />
        </div>
        <div className="flex md:gap-10 gap-2 mt-2">
          <div className="flex flex-row text-xs md:text-sm items-center font-bold">
            <Counter
              buttonHeight="2rem"
              buttonPadding="0.2rem"
              initValue={item.quantity}
              maxValue={product.stock}
              onChange={(n) => {
                makeRequest(addToCart, {
                  productId: item.productId,
                  quantity: n,
                },{loading:true});
              }}
            />
          </div>
          <div className={opacityBuyNow}>
            <button
              className="yellow-btn w-[5rem] md:w-[8rem] self-end"
              style={{ height: "min-content" }}
              onClick={(e) => {
                if (outOfStock) {
                  makeRequest(
                    addToCart,
                    {
                      productId: product._id,
                      quantity: cart[product._id].quantity,
                    },
                    { loading:true,
                      onSuccess: (res) => {
                        let Product = [];
                        Product[0] = product;
                        localStorage.setItem(
                          "selectedProducts",
                          JSON.stringify(Product)
                        );
                        localStorage.setItem(
                          "price_details",
                          JSON.stringify([
                            1,
                            product.mrp,
                            product.mrp - product.sellingPrice,
                            cart[product._id].quantity,
                          ])
                        );
                        router.push(`../user/CartAddresses`);
                      },
                      loading: true,
                    }
                  );
                }
              }}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
