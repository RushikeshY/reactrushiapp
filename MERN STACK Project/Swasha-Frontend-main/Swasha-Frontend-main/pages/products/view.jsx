import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-toastify";
import CheckPincode from "../../components/CheckPincode";
import Counter from "../../components/Counter";
import ImageHolder from "../../components/ImageHolder";
import ImageViewer from "../../components/ImageViewer";
import Price from "../../components/Price";
import RatingBar, { RatingPercentBars } from "../../components/RatingBar";
import ReadMoreContainer from "../../components/ReadMoreText";
import WishlistButton from "../../components/buttons/WishlistButton";
import { store } from "../../redux/store";
import { fetchProduct } from "../../util/ProductClient";
import {
  FacebookShareButton,
  WhatsappShareButton,
  EmailShareButton,
  LinkedinShareButton,
} from "react-share";
import {
  FacebookIcon,
  WhatsappIcon,
  EmailIcon,
  LinkedinIcon,
} from "react-share";
import {
  HorizontalScroll,
  ScrollButtons,
} from "../../components/ScrollButtons";
import {
  addToCart,
  getProductReviews,
  getSingleProduct,
  getWishlistItems,
  makeRequest,
  getProductCategories,
  getProducts,
} from "../../util/ApiClient";
import Link from "next/link";
import { roundFloat } from "../../util/StringUtil";
import { goToLogin } from "../../util/UrlUtils";
import { isUserLoggedIn } from "../../util/data";
import { getPublicURL } from "../../util/UrlUtils";
import { LogoForHeader1, LogoForHeader2 } from "../../components/svg";
import { SearchBar } from "../../components/NavBar";
import ImageSlider from "../../components/Imageslider";

/**
 * IDs for products with more than 4 images:
  '6409b3170e1ad9fce5a7e241',
  '6409b3170e1ad9fce5a7e267',
  '6409b3170e1ad9fce5a7e266',
  '6409b3170e1ad9fce5a7e268',
  '6409b3170e1ad9fce5a7e269',
  '6409b3170e1ad9fce5a7e26d',
  '6409b3170e1ad9fce5a7e272'
 */

export default function () {
  const router = useRouter();
  const product = useSelector((x) => x.product[router.query.id]);
  const cartItem = useSelector((x) => x.cart[product?._id]);
  const [reviews, setReviews] = useState([]);
  const [count, setCount] = useState(1);
  const [added, setAdded] = useState(false);
  let requested = false;
  const [productCategories, setProductCategories] = useState();
  const [outOfStock, setOutOfStock] = useState(false);
  const [share, setShare] = useState("invisible");
  const [estimatedDelDate,setEstimatedDelDate] = useState("");
  const Url = "https://swasha.org/products/view/?id=";
  useEffect(() => {
    product?.stock === 0 ? setOutOfStock(true) : setOutOfStock(false);
  }, [product]);
  useEffect(() => {
    if (share === "visible") {
      const timer = setTimeout(() => {
        setShare("invisible");
      }, 2000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [share]);
  useEffect(() => {
    setAdded(cartItem !== undefined ? true : false);
  }, [cartItem]);

  useEffect(() => {
    if (requested) return;
    makeRequest(
      getProductCategories,
      {},
      {
        onSuccess: (res) => {
          setProductCategories(res.productCategories);
        },
      }
    );
    requested = true;
  }, []);

  useEffect(() => {
    if (!router.isReady) return;
    if (requested) return;
    requested = true;
    makeRequest(getSingleProduct, { productID: router.query.id, view: true });
    makeRequest(
      getProductReviews,
      { productId: router.query.id },
      {
        onSuccess: (res) => {},
      }
    );
    if (isUserLoggedIn()) makeRequest(getWishlistItems);
  }, [router.isReady]);
  const leftStyle = "font-semibold";
  const buynowButton = product?.stock === 0 ? "opacity-50 -z-10" : "";
  if (!product) return <></>;

  return (
    <div className="center-max">
      <div className="sticky top-0 z-50 bg-white">
       <div className="md:hidden flex justify-between  border-1 px-2 h-14 ">
      <img
          src={getPublicURL("/svg/blueback.svg")}
          className="h-[1.1rem] my-auto ml-2 cursor-pointer"
          onClick={(e) => {
            router.back();
          }}
        />
       <div className="flex items-center py-2 sticky top-0" onClick={()=>{router.push("/")}}>
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
        {/* <button
        className=" block md:hidden bg-gray-300 translate-x-2 top-12 right-1 m-2"
        onClick={toggleFilter}
      >
        
        <img src={getPublicURL("/svg/Filter-hamberger.svg")} className="bg-blue-100"/>
        
      </button> */}
      <div></div>

      </div>
      <div className="bg-white flex justify-center pt-1.5 h-[2.5rem] md:hidden">
        <SearchBar className="w-[20.25rem] h-[1.65rem] rounded text-xs grow-0 border-1" />
      </div>
      </div>
      <div className="flex flex-col md:flex-row md:pl-16  md:pr-0 md:pt-10">
        <div className="relative">
          <ImageViewer
            imgs={product.productImagesUrl}
            imgHeight="md:22rem"
            className="w-full md:w-[35rem] md:px-4 hidden md:block"
          />
          <WishlistButton
            productId={product._id}
            className="absolute top-[1.5rem] right-[1.5rem] w-[2.75rem] hidden md:block"
          />
        </div>
        <div className="md:hidden">
        <ImageSlider imgs={product.productImagesUrl}/>
        </div>
        <div className="md:ml-8 mt-4 md:mr-10 md:mt-0 px-3 md:px-0">
          <div className="flex">
            <div className="text-xl font-semibold grow">
              {product.productTitle}
            </div>
            {product.ratings != 0 ? (
              <div className="flex">
                <div className="text-lg font-semibold">
                  {product.ratings.toFixed(1)}
                </div>
                <img
                  className="h-4 mt-1 mr-2 px-2"
                  src={getPublicURL("/svg/star-green.svg")}
                />
              </div>
            ) : (
              <></>
            )}
            <div
              className="flex mt-1 mr-10 cursor-pointer relative"
              onClick={(e) => {
                setShare("visible");
              }}
            >
              <div className="text-slate-400 text-sm ">Share</div>
              <img
                className="w-5 ml-2 mb-1"
                src={getPublicURL("/svg/share.svg")}
              />
              <div
                className={`absolute rounded-full z-1 top-[0rem] right-[1.5rem] w-[8.2rem] h-[2.2rem] py-1 bg-opacity-50 backdrop-blur-3xl ${share}`}
              >
                <span className="pr-1 pl-1">
                <FacebookShareButton url={Url+product._id}>
                  <FacebookIcon size={28} round />
                </FacebookShareButton>
                </span>
                <span className="pr-1">
                <WhatsappShareButton url={Url+product._id}>
                  <WhatsappIcon size={28} round />
                </WhatsappShareButton>
                </span>
                <span className="pr-1">
                <EmailShareButton url={Url+product._id}>
                  <EmailIcon size={28} round />
                </EmailShareButton>
                </span>
                <span className="">
                <LinkedinShareButton url={Url+product._id}>
                  <LinkedinIcon size={28} round />
                </LinkedinShareButton>
                </span>
                <div
                  className="sharethis-inline-share-buttons p-1 rounded-sm"
                  onClick={(e) => {
                    setShare("visible");
                  }}
                />
              </div>
            </div>
          </div>
          <div className="my-2 text-sm">{product.productDecription}</div>
          {/* <RatingBar
            className="mt-[1.25rem]"
            rating={product.ratings}
            ratingCount={product.numOfReviews}
            distribution={[...product.numOfNStar]
              .reverse()
              .map((x) => x / product.numOfReviews)}
          /> */}
          <div className="bg-blue-btn-bg text-2sm text-white pl-3 pr-[1.5rem] pt-[0.2rem] pb-[0.33rem] w-fit my-3 slant-edge">
            Seller - Nirmaan Organization
          </div>
          <div
            className="mt-6"
            style={{
              display: "grid",
              gridTemplateColumns: "6rem auto",
              rowGap: "1rem",
              alignItems: "center",
            }}
          >
            <span className={leftStyle}>Price:</span>
            <Price
              className="ml-10"
              price={product.mrp}
              discount={
                ((product.mrp - product.sellingPrice) * 100) / product.mrp
              }
            />
            <span className={leftStyle}>Quantity:</span>
            <div className="ml-10">
              <Counter
                buttonHeight="2.5rem"
                buttonPadding="0.35rem"
                initValue={1}
                maxValue={product.stock}
                onChange={(v) => setCount(v)}
              />
            </div>
            <span className={leftStyle}>Delivery to:</span>
            <CheckPincode className="ml-10 z-1 relative" setEstimatedDelDate = {setEstimatedDelDate} />
            <div></div>
            <div className="ml-10 text-green-100 text-sm">{estimatedDelDate.length>5?estimatedDelDate:""}</div>
          </div>

          <div className="text-[1.2rem] mb-8 -z-1 flex justify-center">
            <button
              className="w-[11rem] py-2 rounded-full border border-solid border-gray-1700 font-bold md:mr-16 mr-4 mt-6  md:ml-0"
              onClick={(e) => {
                if (!isUserLoggedIn()) {
                  goToLogin(router);
                  return;
                }
                if (added) {
                  router.push(`/user/cart`);
                }
                const txt = cartItem
                  ? "You already have this item in your cart and we have increased the quantity by " +
                    count
                  : `Added ${count} items to cart`;
                makeRequest(
                  addToCart,
                  {
                    productId: product._id,
                    quantity: cartItem ? cartItem.quantity: count,
                  },
                  {
                    onSuccess: (res) => {
                      // toast.success(txt);
                      setAdded(true);
                    },
                    loading: true,
                  }
                );
              }}
            >
              {added ? "Go" : "Add"} To Cart
            </button>
            <div className={buynowButton}>
              <button
                className="bg-orange-300 w-[11rem] py-2 text-white rounded-full font-bold md:mr-16  mt-6"
                onClick={(e) => {
                  if (outOfStock) return;
                  if (!isUserLoggedIn()) {
                    goToLogin(router);
                    return;
                  }
                  makeRequest(
                    addToCart,
                    {
                      productId: product._id,
                      quantity: count,
                    },
                    {
                      onSuccess: (res) => {
                        let Product = [];
                        Product[0] = product;
                        localStorage.setItem(
                          "selectedProducts",
                          JSON.stringify(Product)
                        );
                        router.push(`/user/CartAddresses/`);
                      },
                      loading: true,
                    }
                  );
                }}
              >
                Buy Now
              </button>
            </div>
          </div>
          <FeaturedCard />
        </div>
      </div>
      <MoreInfo product={product} />
      {/* Try this product section */}
      {/* <TryTheseProducts added = {added}/> */}
      <RelatedProducts
        pvid={product._id}
        productCategories={productCategories}
        catId={product.category}
      />
    </div>
  );
}

function MoreInfo({ product }) {
  const [current, setCurrent] = useState(0);
  const selectedStyle = "text-white bg-black";

  return (
    <div className=" md:mx-4">
      {/* {product.ratings === 0 ? (
        <></>
      ) : (
        <div className="flex flex-row justify-center md:gap-[8rem] gap-4 mb-6">
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
          <button
            className={`w-[10rem] hidden md:block py-2 border border-solid border-black rounded-full font-semibold ${
              current === 1 ? selectedStyle : ""
            }`}
            // onClick={(e) => setCurrent(1)}
          >
            Related
          </button>
        </div>
      )} */}
      <Details product={product} />
      <Reviews pid={product._id} />
      {/* {current === 0 && <Details pid={product._id} />}
      {current === 1 && <Reviews pid={product._id} />} */}
    </div>
  );
}

function Details({ product }) {
  const generalDetails = product.generalDetails;
  return (
    <div className="p-4 md:grid md:grid-cols-2 mt-6 mr-10">
      <ImageHolder className="md:h-[13rem] w-full  mt-6 md:mt-0 md:ml-10 rounded-lg" src={getPublicURL("/png/BulkOrder_banner.png")} />
      <div className="md:ml-16">
        <div className="font-bold text-[1.8rem] mb-4">Product Details:</div>
        <div className="">
          {Object.entries(generalDetails).map(([k, v]) => {
            return (
              <React.Fragment key={k}>
                <div className="grid grid-cols-8 mb-2">
                  <span className="font-semibold col-span-3">{k}</span>
                  <span className="col-span-1">:</span>
                  <span className="col-span-4">{v}</span>
                </div>
              </React.Fragment>
            );
          })}
        </div>
        {/* <div className="mt-10">
        <span>Share your thought about this product</span>
        <button className="mx-5 py-1 px-6 rounded-md text-lg borderH-2 font-semibold">Rate Product</button>
      </div> */}
      </div>
    </div>
  );
}

function Reviews({ pid }) {
  const productReviews = useSelector((x) => x.productReview[pid]);
  const user = useSelector((x) => x.user);
  const product = useSelector((x) => x.product[pid]);
  const [display, setDisplay] = useState();
  useEffect(() => {
    if (!productReviews || !user) return;
    let myReview =
      store.getState().review[pid] ||
      productReviews.find((x) => x.userId?._id === user._id);
    if (myReview) {
      myReview = { ...myReview, _id: -1 };
      myReview.userId = {
        _id: user._id,
        name: "Your Review",
      };
    }
    let filteredReviews = productReviews;
    if (myReview) {
      filteredReviews = productReviews.filter(
        (x) => x.userId?._id !== user._id
      );
    }
    const tmp = [];
    if (myReview) tmp.push(myReview);
    tmp.push(...filteredReviews);
    setDisplay(tmp);
  }, [productReviews, user, pid]);
  if (!display || !Object.values(display).length) return;
  // return (
  //   <div className="flex flex-col items-center justify-center">
  //     <img
  //       src={getPublicURL("/gif/empty.gif")}
  //       style={{
  //         width: "15rem",
  //       }}
  //     />
  //     <div
  //       className="text-center max-w-[23rem]"
  //       style={{ transform: "translateY(-3rem)" }}
  //     >
  //       This product has not yet been reviewed.
  //     </div>
  //   </div>
  // );
  return (
    <div className="p-4 md:ml-10">
      <div className="font-bold text-[1.8rem] mb-4">Reviews:</div>
      <div className="flex md:flex-row flex-col">
        <div className="grow">
          <div style={{ marginRight: "6vw" }}>
            {display.map((x) => (
              <ReviewLI key={x._id} data={x} />
            ))}
            <div className="h-[0.1rem] bg-black mt-auto"></div>
          </div>
        </div>
        <div className="md:mr-16">
          <div className="flex flex-row items-center gap-2">
            <span className="font-bold text-[1.35rem]">Customer Ratings</span>
            <img
              src={getPublicURL("/svg/three-stars.svg")}
              className="h-[1.5rem]"
            />{" "}
          </div>
          <div className="text-xs mt-[0.2rem] mb-4">
            Total {display.length} ratings
          </div>
          <div className="flex flex-row">
            <RatingPercentBars
              className="text-sm "
              fractions={[...product.numOfNStar]
                .reverse()
                .map((x) => x / product.numOfReviews)}
              color="#3594AC"
            />
            <div
              style={{
                borderRight: "var(--border-1)",
                alignSelf: "stretch",
                margin: "0 2.5rem",
              }}
            ></div>
            <div className="flex flex-col items-center mr-6">
              <span className="font-bold text-[3.5rem]">
                {roundFloat(product.ratings)}
              </span>
              <span className="font-semibold">Out of 5</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReviewLI({ data }) {
  const rv = { ...data };
  if (!rv.userId) rv.userId = { name: "Anonymous" };
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
        <div className="font-semibold">{rv.userId.name}</div>
        <div className="flex flex-row items-center">
          <span className="font-semibold mr-[0.15rem]">{rv.rating}</span>
          <img className="h-[1rem]" src={getPublicURL("/svg/star-green.svg")} />
        </div>
        <div className="text-sm">{rv.createdAt.substring(0, 10)}</div>
      </div>
      <div className="p-2 text-sm">
        <div className="font-semibold">{rv.title}</div>
        <ReadMoreContainer text={rv.comment} />
      </div>
    </div>
  );
}

function FeaturedCard() {
  return (
    // <div className="flex justify-between gap-2 ">
    //   <div>
    //     <div className="flex justify-center">
    //       <img
    //         className="h-14 mt-1 px-2 mx-2"
    //         src={getPublicURL("/png/safe-delivery.png")}
    //       />
    //     </div>
    //     <div className="text-md font-bold text-center my-2">Safe Delivery</div>
    //     <div className=" ">Ensuring Secure Deliveries</div>
    //   </div>
    //   <div>
    //     <div className="flex justify-center">
    //       <img
    //         className="h-14 mt-1 px-2"
    //         src={getPublicURL("/png/return.png")}
    //       />
    //     </div>
    //     <div className="text-md font-bold text-center my-2">3 days return</div>
    //     <div>For all your orders</div>
    //   </div>
    //   <div>
    //     <div className="flex justify-center">
    //       <img
    //         className="h-14 mt-1 px-2"
    //         src={getPublicURL("/png/secure-payment.png")}
    //       />
    //     </div>
    //     <div className="text-md font-bold text-center my-2">Secure Payment</div>
    //     <div>PCI DSS security payment</div>
    //   </div>
    // </div>
    <div className="flex gap-10 mt-2 md:mr-6">
        <div className="hidden md:block" >
        <BenefitCard
          img= "/svg/free-delivery.svg"
          t1= "Free Delivery"
          t2= "No minimum order value"
        />
        </div>
        <div className="hidden md:block" >
        <BenefitCard
          img = "/svg/return.svg"
          t1= "5 days return"
          t2= "No minimum order value"
        />
        </div>
        <div className="hidden md:block" >
        <BenefitCard
          img="/svg/codsvg.svg"
          t1="Cash on Delivery"
          t2="No minimum order value"
        />
        </div>
        </div>
  );
}

function BenefitCard({ img, t1, t2 }) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-md">
      <img src={getPublicURL(img)} className="ml-2 w-[2.5rem] md:w-[6rem] bg-[#F2F2F2]" />
      <div>
        <div className="font-semibold flex justify-center text-[10px] md:text-[16px] md:mb-2">{t1}</div>
        <div className="text-[10px] md:text-[12px]">{t2}</div>
      </div>
    </div>
  );
}

function TryTheseProducts({ added }) {
  const Array = [1, 2, 3];
  return (
    <div className="md:mx-16 mx-6 my-10">
      <div className="mb-6 text-[1.5rem] font-bold">Try These Products:</div>
      <div className="grid md:grid-cols-3 gap-10">
        {Array.map((num) => (
          <div className="">
            <div className="flex borderH-2 shadow-sm rounded-md">
              <div className="p-2 mr-3">
                <ImageHolder className="w-[11rem] h-[18rem] rounded-sm" />
              </div>
              {/* <img className="p-5 w-3/5" src={getPublicURL("/png/candle.png")}/> */}
              <div className="px-2">
                <div className="font-bold text-[1.3rem] pt-10 pb-8">Holder</div>
                <div className="font-semibold pb-5 text-none">
                  Floral Jute charger pouch
                </div>
                <div className="font-semibold text-slate-500 pb-5">
                  Min 15% Off
                </div>
                <button
                  className="w-[7rem] py-2 px-3 bg-orange-300 text-sm rounded text-white font-bold"
                  onClick={(e) => {
                    if (added) {
                      router.push(`/user/cart`);
                    }
                    const txt = cartItem
                      ? "You already have this item in your cart and we have increased the quantity by " +
                        count
                      : `Added ${count} items to cart`;
                    makeRequest(
                      addToCart,
                      {
                        productId: product._id,
                        quantity: cartItem ? cartItem.quantity + count : count,
                      },
                      {
                        onSuccess: (res) => {
                          // toast.success(txt);
                          setAdded(true);
                        },
                        loading: true,
                      }
                    );
                  }}
                >
                  {added ? "Go" : "Add"} To Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// function relatedProducts(){
//   const Array = [1,2,3,4,5,6,7,8];
//   return(
//     <div className="mx-20 my-10">
//       <div className="text-[1.8rem] font-bold py-10">Related Products:</div>
//       <div className="bg-gray-300 rounded-lg ">
//         <div className="px-10">
//           <div className="font-semibold text-[1.2rem] py-5">Similar in this category:</div>
//           <div className="overflow-x-auto no-scrollbar">
//           <div className="flex pb-5 gap-10 text-center">
//           {Array.map((num) =>(
//             <div className="bg-gray-900 rounded-lg p-2">
//               <img className="object-contain w-full rounded-md" src={getPublicURL("/png/candle1.jpg")}/>
//             <div className="font-semibold mb-2">Product Name</div>
//             <div className="md:flex justify-center gap-2 mb-4">
//               <div className="font-bold">$ 70</div>
//               <div className=" text-gray-1500 line-through">$ 100</div>
//               <div className="pt-0.5 text-sm">30% off</div>
//             </div>
//             </div>
//             ))}
//           </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

function OurProductCard({ pid }) {
  const data = useSelector((x) => x.product[pid]);
  const router = useRouter();
  useEffect(() => {
    fetchProduct(pid);
  }, []);

  if (!data) return <></>;
  let imageURL;
  if (data.productImagesUrl?.length) {
    imageURL = data.productImagesUrl[0];
  }

  return (
    <div
      className="bg-gray-800 md:p-4 px-2 rounded-md flex flex-col items-center cursor-pointer w-[9rem] md:w-auto"
      //style={{ boxShadow: "var(--card-shadow-1)" }}
      onClick={(e) => {
        router.push(`/products/view?id=${data._id}`);
      }}
    >
      <ImageHolder className="md:w-[11rem] w-[9rem] md:h-[9rem] h-[5rem] rounded-md" src={imageURL} />
      <span className="md:w-[11rem] w-[9rem] text-center font-semibold mt-2 mb-1 one-line-max">
        {data.productTitle}
      </span>
      {/*
        <span className="w-[12rem] whitespace-normal text-center text-sm mb-2 two-lines-max">
          {description}
        </span>
      */}
      <Price
        className="mt-2"
        price={data.mrp}
        discount={((data.mrp - data.sellingPrice) * 100) / data.mrp}
      />
    </div>
  );
}
const filterNames = {
  // "ratings,-1": "Top Rated",
  "createdAt,-1": "New Arrival",
};
function RelatedProducts({ pvid, productCategories, catId }) {
  const [productCategory, setProductCategory] = useState(0);
  const [products, setProducts] = useState([]);
  const page = useRef(0);
  const [query, setQuery] = useState(Object.keys(filterNames)[0]);
  const lastLoadedPage = useRef(0);
  const nextPageAvailable = useRef(true);
  const [loading, setLoading] = useState(false);

  const resetProducts = () => {
    page.current = 0;
    lastLoadedPage.current = 0;
    nextPageAvailable.current = true;
    setProducts([]);
  };

  const loadNextPage = () => {
    if (!nextPageAvailable.current || lastLoadedPage.current !== page.current)
      return;
    page.current += 1;
    let q = {};
    if (query) {
      const tmp = query.split(",");
      q = { sortBy: tmp[0], sortOrder: tmp[1] };
    }
    setLoading(true);
    makeRequest(
      getProducts,
      {
        query: {
          category: catId,
          page: page.current,
          ...q,
        },
      },
      {
        onSuccess: (res) => {
          if (!res.products.length) nextPageAvailable.current = false;
          setProducts([...products, ...res.products]);
          lastLoadedPage.current += 1;
          setLoading(false);
        },
        onError: (e) => {
          page.current -= 1;
          setLoading(false);
        },
      }
    );
  };
  useEffect(() => {
    if (!productCategories) return;
    loadNextPage();
  }, [productCategory, query]);
  return (
    <div className="mb-10">
      <div className="flex flex-row my-2 md:mx-16 mx-4 items-center overflow-hidden">
        <div className="text-[1.8rem] font-bold pt-10 pb-5">
          Related Products:
        </div>
        {loadNextPage()}
      </div>
      <div className="md:mx-16 mx-4 bg-gray-200 rounded-md pt-4">
        {/* <div className="text-lg font-bold ml-4">Best Seller in this category:</div> */}
        {/* TODO: filter */}
        {
          <HorizontalScroll
            loading={loading}
            onScroll={(e) => {
              if (
                e.target.scrollWidth -
                  e.target.scrollLeft -
                  e.target.offsetWidth <
                20
              ) {
                loadNextPage();
              }
            }}
          >
            {products.map((x, i) =>
              pvid === x ? "" : <OurProductCard key={i} pid={x} />
            )}
          </HorizontalScroll>
        }
      </div>
    </div>
  );
}
