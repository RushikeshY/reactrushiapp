import { getPublicURL } from "../util/UrlUtils";
// Import Swiper React components
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Pagination } from "swiper";
import ImageHolder from "./ImageHolder";
// Import Swiper styles
import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

// import required modules
import { Navigation, Autoplay } from "swiper";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";
import Link from "next/link";
import React from "react";
import {
  getProductCategories,
  getProducts,
  getViewHistory,
  makeRequest,
} from "../util/ApiClient";
import { useRouter } from "next/router";
import RatingBar from "./RatingBar";
import Price from "./Price";
import { GrayCardContainer } from "./GrayCard";
import { isUserLoggedIn } from "../util/data";
import { fetchProduct } from "../util/ProductClient";
import { HorizontalScroll, ScrollButtons } from "./ScrollButtons";
import TryBulkOrderButton from "./buttons/TryBulkOrder";
import Price_productlist from "../components/Price_productlist";


export default function HomeContent() {
  const user = useSelector((s) => s.user);
  const router = useRouter();

  const dispatch = useDispatch();
  const [productCategories, setProductCategories] = useState();
  let requested = false;
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

  return (
    <div className="h-full md:p-4 md:pl-16 md:pr-8 md:px-4 pt-2 center-max">
      <div className="flex flex-col md:flex-row">
        <ProductCategories productCategories={productCategories} />
        <div className="p-1 md:pl-8 grow w-full md:w-0 self-stretch " style={{ height: "25vw" }}>
          {/* carousel for banner to show upcoming offers  */}
          <Swiper
            style={{ height: "100%", flexGrow: 1, borderRadius: "0.5rem" }}
            // navigation={true}
            loop={true}
            modules={[Navigation, Pagination, Autoplay]}
            className="mySwiper"
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            // slidesPerView={2}
            // pagination={true}
          >
            
            <SwiperSlide>
              <ImageHolder
                className="w-full h-full cursor-pointer"
                src={"/jpeg/Banner_1.jpeg"}
                onClick={(e) => {
                  router.push({
                    pathname: "/products/search",
                     query: { category: '642678e0f4c353deff2c9dd6' },
                  });
                }}
              />
            </SwiperSlide>
            <SwiperSlide>
              <ImageHolder
                className="w-full h-full cursor-pointer"
                src={"/jpeg/Banner_2.png"}
                onClick={(e) => {
                  router.push({
                    pathname: "/products/search",
                     query: { category: '642678e0f4c353deff2c9e6f' },
                  });
                }}
              />
            </SwiperSlide>
            <SwiperSlide>
              <ImageHolder
                className="w-full h-full cursor-pointer"
                src={"/jpeg/Banner_3.jpeg"}
                onClick={(e) => {
                  router.push({
                    pathname: "/products/search",
                     query: { category: '642678e0f4c353deff2c9dd6' },
                  });
                }}
              />
            </SwiperSlide>
            <SwiperSlide>
              <ImageHolder
                className="w-full h-full cursor-pointer"
                src={"/jpeg/Banner_4.png"}
                onClick={(e) => {
                  router.push({
                    pathname: "/products/search",
                     query: { category: '642678e0f4c353deff2c9e6f' },
                  });
                }}
              />
            </SwiperSlide>
            <SwiperSlide>
              <ImageHolder
                className="w-full h-full cursor-pointer"
                src={"/jpeg/Banner_5.png"}
                onClick={(e) => {
                  router.push({
                    pathname: "/products/search",
                     query: { category: '642678e0f4c353deff2c9e61' },
                  });
                }}
              />
            </SwiperSlide>
            <SwiperSlide>
              <ImageHolder
                className="w-full h-full cursor-pointer"
                src={"/png/banner_1.png"}
                onClick={(e) => {
                  router.push({
                    pathname: "/products/search",
                     query: { category: '642678e0f4c353deff2c9dd6' },
                  });
                }}
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
      {/* {isUserLoggedIn() && (
        <div
          className="my-2 overflow-hidden flex flex-row"
          style={{ height: "14rem" }}
        >
          <div className="bg-[#FFD382] w-[20rem] mr-4 rounded-xl flex flex-row items-center p-4">
            <ImageHolder
              className="w-[8rem] mr-4"
              style={{ borderRadius: "999px" }}
              src="png/no-dp.png"
            />
            <div>
              <div className="font-semibold text-[1.1rem] mb-1">{`Hello ${
                user.name?.split(" ")?.[0]
              }`}</div>
              <div className="text-sm">
                Here are a few recommendations for you
              </div>
            </div>
          </div>
          <div className="flex flex-row pl-[3rem] rounded-xl grow" style={{ backgroundColor: "#FFF6E6" }}>
            <TopProductCard
              img="png/pen.png"
              name={`Product 1`}
              description={`Description 1`}
            />
            <TopProductCard
              img="png/oil.png"
              name={`Product 2`}
              description={`Description 2`}
            />
            <TopProductCard
              img="png/candle.png"
              name={`Product 3`}
              description={`Description 3`}
            />
          </div>
        </div>
      )} */}
      <div
        className="bg-[#FFF6E6] md:rounded-md border-1  md:p-12 flex  md:flex-row items-center md:justify-around mb-6 mt-6 md:overflow-hidden h-[3.4rem] md:h-[10rem] md:gap-[0.75rem]"
      >
        {[
          {
            img: "/svg/free-delivery.svg",
            t1: "Free Delivery",
            t2: "No minimum order value",
          },
          {
            img: "/svg/return.svg",
            t1: "5 days return",
            t2: "No minimum order value",
          },
          {
          img:"/svg/codsvg.svg",
          t1:"Cash on Delivery",
          t2:"No minimum order value"
          },
        ].map(({ img, t1, t2 }, i) => (
          <React.Fragment key={i}>
            <BenefitCard img={img} t1={t1} t2={t2} />
            <div
              style={{
                height: "100%",
                borderRight: "var(--border-1)",
              }}
            ></div>
          </React.Fragment>
        ))}
        {/* <div className="hidden md:block">
         <BenefitCard
          img={"/svg/codsvg.svg"}
          t1="Cash on Delivery"
          t2="No minimum order value"
        />
        </div> */}
        <div className="hidden md:block" >
        <BenefitCard
          img={"/svg/payment.svg"}
          t1="Secure Payment"
          t2="PCI DSS security payment"
        />
        </div>
      </div>
      {productCategories && (
        <OurProducts productCategories={productCategories} />
      )}
        <img
        className="w-full pt-2 md:hidden"
        src={getPublicURL("/svg/aboutusmobile.svg")}
      />
      <img
        className=" hidden w-full pt-2 md:block"
        src={getPublicURL("/svg/aboutusweb.svg")}
      />
      
      <div className="text-lg font-bold mb-2 mt-8">Bulk Orders</div>
      <div className=" border rounded-md">
      <img
        className="md:h-80 w-full rounded-md"
        src={getPublicURL("/png/BulkOrderBanner.png")}
      />
      </div>
      {isUserLoggedIn() && <ViewHistory />}
      <TryBulkOrderButton/>
    
    </div>
  );
}

function BenefitCard({ img, t1, t2 }) {
  return (
    <div className="flex flex-row items-center gap-1 ">
      <img src={getPublicURL(img)} className="ml-2 w-[2.5rem] md:w-[6rem] md:mr-6 bg-[#F2F2F2]" />
      <div>
        <div className="font-semibold text-[8px] md:text-[14px] md:mb-2">{t1}</div>
        <div className="text-[8px] md:text-[10px]">{t2}</div>
      </div>
    </div>
  );
}

function ViewHistory() {
  const historyItems = useSelector((x) => x.cache.viewHistory);
  let requested = false;
  useEffect(() => {
    if (requested) return;
    requested = true;
    makeRequest(getViewHistory);
  }, []);
  if (!historyItems?.length) return <></>;
  return (
    <GrayCardContainer
      className="mt-8"
      items={historyItems.map((x) => x.productId)}
      title="Products You Viewed"
    />
  );
}

const filterNames = {
  // "ratings,-1": "Top Rated",
  // "createdAt,-1": "New Arrival",
};

function OurProducts({ productCategories }) {
  const [productCategory, setProductCategory] = useState(0);
  const [products, setProducts] = useState([]);
  const page = useRef(0);
  const [query, setQuery] = useState(Object.keys(filterNames)[0]);
  const lastLoadedPage = useRef(0);
  const nextPageAvailable = useRef(true);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

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
          category: productCategories[productCategory]._id,
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
    console.log("loadPageNo", page.current);
  };
  useEffect(() => {
    if (!productCategories) return;
    loadNextPage();
  }, [productCategory, query]);
  return (
    <>
      <div className=" md:flex flex-row my-2">
        <span className="mr-auto mt-auto font-bold text-lg pr-4">Our Products</span>
        <button
          className="md:hidden absolute right-1 px-4 underline rounded-md text-indigo-700"
          onClick={toggleDropdown}
        >
          More
        </button>
        <div className="md:hidden absolute right-3 ">
        
        {showDropdown && (
          <div className=" bg-white p-3 z-50">
            {productCategories.map((x, i) => (
              <button
                key={i}
                className={`block w-full text-left py-1 ${
                  productCategory === i ? 'bg-gray-100' : ''
                }`}
                onClick={(e) => {
                  if (productCategory === i) return;
                  resetProducts();
                  setProductCategory(i);
                  toggleDropdown();
                }}
              >
                {x.name}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="hidden md:flex">
        {productCategories &&
          productCategories.map((x, i) => (
            <button
              key={i}
              style={{
                borderRadius: "10px",
                backgroundColor: productCategory === i ? "#e3e3e3" : "inherit",
              }}
              className="mr-4 py-2 px-4"
              onClick={(e) => {
                if (productCategory === i) return;
                resetProducts();
                setProductCategory(i);
              }}
            >
              {x.name}
            </button>
          ))}
        <Link href="/products/search" className="font-bold px-4 m-auto">
          More
        </Link>
      </div>
      </div>
      <div className="hidden md:block  rounded-md pt-3">
        {/* TODO: filter */}
        <div
          className="flex flex-row px-6 pb-2"
          style={{ borderBottom: "2px solid #e5e5e5" }}
        >
          {Object.entries(filterNames).map(([k, v]) => {
            return (
              <button
                className={`border-0 border-b-4 px-4 pb-1 border-solid ${
                  query === k ? "border-myellow" : "border-white"
                }`}
                key={k}
                onClick={(e) => {
                  resetProducts();
                  setQuery(k);
                }}
              >
                {v}
              </button>
            );
          })}
        </div>
        {products && (
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
            {products.map((x, i) => (
              <OurProductCard key={i} pid={x} />
            ))}
          </HorizontalScroll>
        )}
      </div>
      {/* mobile view */}
      <div className=" md:hidden pt-4 mx-1">
        {/* TODO: filter */}
        <div
          className="grid grid-cols-2 px-6 pb-2"
          style={{ borderBottom: "2px solid #e5e5e5" }}
        >
          {Object.entries(filterNames).map(([k, v]) => {
            return (
              <button
                className={`border-0 border-b-4 px-4 pb-1 border-solid ${
                  query === k ? "border-myellow" : "border-white"
                }`}
                key={k}
                onClick={(e) => {
                  resetProducts();
                  setQuery(k);
                }}
              >
                {v}
              </button>
            );
          })}
        </div>
        <div className="grid grid-cols-2 gap-1 ">
        {products && (
          
            products.map((x, i) => (
              <OurProductCard key={i} pid={x} />
            ))
          
        )}
        </div>
      </div>
    </>
  );
}

function OurProductCard({ pid }) {
  const data = useSelector((x) => x.product[pid]);
  const router = useRouter();
  useEffect(() => {
    fetchProduct(pid);
  }, []);

  if (!data) return <></>;
  let description = data.productDecription;
  let imageURL;
  if (data.productImagesUrl?.length) {
    imageURL = data.productImagesUrl[0];
  }

  return (
    <div
      className=" md:rounded-md rounded-t-md flex flex-col items-center cursor-pointer"
      style={{ boxShadow: "var(--card-shadow-1)" }}
      onClick={(e) => {
        router.push(`/products/view?id=${data._id}`);
      }}
    >
      <ImageHolder className="w-full md:w-[16rem]  h-[8.4rem] md:h-[12rem] rounded-t-md" src={imageURL} />
    
      
      {/*
        <span className="w-[12rem] whitespace-normal text-center text-sm mb-2 two-lines-max">
          {description}
        </span>
      */}
     <div className="flex">
     <span className="w-[8rem] md:w-[12rem] text-left font-semibold  one-line-max mt-5  md:mt-2 ">
        {data.productTitle}
      </span>
      {data.ratings?
      <span className="md:mt-2 mt-5 ml-2">
          {data.ratings.toFixed(1)}
          </span>:""}
          {data.ratings?<img className="h-4 md:mt-2.5 mt-5 mb-3  px-1" src={getPublicURL("/svg/star-green.svg")}/>:""}
          </div>
          <div className=" hidden md:block whitespace-normal px-2 mt-2">{data.productDecription.slice(0, 70)}
          {data.productDecription.length > 70 && (
            <button
              className="text-blue-500"
              onClick= {(e) => {
                router.push(`/products/view?id=${data._id}`);
              }}
              data-tip="Show more"
            >
              ...more
            </button>
            )}
            </div>
            <div className="mt-2 mb-3">
            <Price_productlist price={data.mrp} discount={((data.mrp - data.sellingPrice) * 100) / data.mrp}/>
            </div>    </div>
  );
}

function TopProductCard({ img, name, description }) {
  return (
    <div className="flex flex-row items-center pr-8 flex-grow">
      <ImageHolder className="w-[8rem] mr-4" src={img} />
      <div>
        <div className="font-bold mb-4">{name}</div>
        <div>Product</div>
        <div>{description}</div>
      </div>
    </div>
  );
}

function ProductCategories({ productCategories }) {
  const router = useRouter();
  return (
    <div className=" rounded-md border-3 cursor-pointer md:flex md:flex-col grid grid-cols-3 gap-3 p-2  md:h-auto  md:w-[14rem] md:grow-0">
      {productCategories &&
        productCategories.slice(0, 3).map((x, i) => {
          return (
            <CatBtn
              key={x._id}
              onClick={(e) => {
                router.push({
                  pathname: "/products/search",
                  query: { category: x._id },
                });
              }}
              txt={x.name}
            />
          );
        })}
    </div>
  );
}

function CatBtn({ onClick, txt }) {
  return (
    <div
      className="pt-16 relative rounded-lg w-full home-category-button md:overflow-hidden md:shrink-0 md:grow"
      style={{
        backgroundImage: `url('${getPublicURL("/jpeg/"+txt+".png")}')`,
        height: "0",
      }}
      onClick={onClick}
    >
      <button className="w-full">{txt}</button>
    </div>
  );
}
