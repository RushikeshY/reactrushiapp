import { useRouter } from "next/router";
import { useEffect, useState, useCallback, useRef } from "react";
import { useSelector } from "react-redux";
import CheckPincode from "../../components/CheckPincode";
import ImageHolder from "../../components/ImageHolder";
import { SuggestionInput } from "../../components/ImageLabelInput";
import Price_productlist from "../../components/Price_productlist";
import WishlistButton from "../../components/buttons/WishlistButton";
import ShareButton from "../../components/buttons/ShareButton";
import {
  CancelIcon,
  HamIcon,
  LogoForHeader1,
  LogoForHeader2,
  SquareRadioButton,
} from "../../components/svg";
import classnames from "classnames";
import { Helmet } from "react-helmet";
import PropTypes from "prop-types";
import {
  getProductCategories,
  getSubCategory,
  makeRequest,
  searchProducts,
} from "../../util/ApiClient";
import { fetchProduct } from "../../util/ProductClient";
import { CurrencyFormatter } from "../../util/StringUtil";
import { getPublicURL } from "../../util/UrlUtils";
import Price from "../../components/Price";
import { SearchBar } from "../../components/NavBar";
import Dialog from "../../components/Dialog";

export const getStaticProps = async () => {
  return { props: {} };
};

export default function () {
  const router = useRouter();
  const [products, setProducts] = useState();
  const [nProducts, setNProducts] = useState(0);
  const [productCategories, setProductCategories] = useState();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  function resultsPerPage() {
    return parseInt(router.query.resultsPerPage) || 12;
  }
  function currentPage() {
    return parseInt(router.query.page) || 1;
  }

  const toggleFilter = () => {
    setFilterOpen(!filterOpen);
  };

  let requested = false;
  useEffect(() => {
    if (!router.isReady || requested) return;
    requested = true;
    makeRequest(
      searchProducts,
      { query: router.query },
      {
        // loading: true,
        onSuccess: (res) => {
          setProducts(res.products);
          setNProducts(res.productCount);
        },
      }
    );
  }, [router.isReady, router.query]);
  let reqCat = false;
  useEffect(() => {
    if (reqCat) return;
    reqCat = true;
    makeRequest(
      getProductCategories,
      {},
      {
        // loading: true,
        onSuccess: (res) => {
          setProductCategories(res.productCategories);
        },
      }
    );
  }, []);

  const handleOutOfStock = (event) => {
    let q = { ...router.query };
    delete q.stock;
    if (event.target.checked) {
      q.stock=0;
    }
    router.replace(
      {
        pathname: router.pathname,
        query: q,
      },
    )
  };

  return (
    <div className="bg-[#FCFDFC]">
      <div className="md:hidden flex justify-between  border-1 px-2 h-14 sticky top-0 bg-white z-50">
        <img
          src={getPublicURL("/svg/blueback.svg")}
          className="h-[1.1rem] my-auto ml-2 cursor-pointer"
          onClick={(e) => {
            router.back();
          }}
        />
        <div className="flex items-center py-2 sticky top-0">
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
        <button
          className=" block md:hidden bg-white translate-x-2 top-12 right-2 mr-4"
          onClick={toggleFilter}
        >
          {/* <HamIcon/> */}
          <img
            src={getPublicURL("/svg/Filterhambereger.svg")}
            className="bg-white"
          />
        </button>
      </div>
      <div className="bg-white flex justify-center pt-1.5 h-[2.5rem] md:hidden sticky top-14 z-50">
        <SearchBar className="w-[20.25rem] h-[1.65rem] rounded text-xs grow-0 border-1" />
      </div>
      <div
        className="hidden md:flex flex-row items-center md:pl-16 pr-4 md:font-semibold"
        style={{ boxShadow: "0 1px 5px 2px #ddd" }}
      >
        <img
          src={getPublicURL("/svg/back.svg")}
          className="h-[1.1rem] mr-4 cursor-pointer"
          onClick={(e) => {
            router.back();
          }}
        />
        {products && (
          <span className="hidden md:block">
            {(currentPage() - 1) * resultsPerPage() + 1}-
            {(currentPage() - 1) * resultsPerPage() + products.length} of{" "}
            {nProducts}{" "}
            {router.query.keyword ? (
              <>
                results for{" "}
                <span className="text-red-txt">“{router.query.keyword}”</span>
              </>
            ) : (
              "products"
            )}
          </span>
        )}
        <SortDropDown />
      </div>
      <div className="center-max flex flex-row">
        <div className="hidden md:block pt-2 pr-8 ml-16">
          <Closeable title="Category" initiallyOpen="false">
            {productCategories && (
              <ProductCategories
                productCategories={[
                  { name: "All", _id: undefined },
                  ...productCategories,
                ]}
              />
            )}
          </Closeable>
          {/* <Closeable title="Colors"></Closeable> */}
          <Closeable title="Price">
            <PriceFilter/>
          </Closeable>
          <Closeable title="Availablility">
            {["Include out of stock"].map((x, i) => {
              return (  
                <div key={i} className="flex flex-row items-center mb-[0.3rem]">
                  <input className="mr-2" type="checkbox" onChange={handleOutOfStock} defaultChecked={router.query.stock?true:false}/>
                  <span className="whitespace-nowrap text-sm">{x}</span>
                </div>
              );
            })}
          </Closeable>
        </div>
        {/* mobile view */}
        <div className="pt-2 ">
          {filterOpen && (
            <div className="fixed left-0 top-14 h-[100vh] pt-6  bg-white p-4 md:hidden z-50">
              <button className="absolute top-0 right-0" onClick={toggleFilter}>
                <CancelIcon />
              </button>
              <Closeable title="Category" initiallyOpen="false">
                {productCategories && (
                  <ProductCategories
                    productCategories={[
                      { name: "All", _id: undefined },
                      ...productCategories,
                    ]}
                  />
                )}
              </Closeable>
              {/* <Closeable title="Colors"></Closeable> */}
              <Closeable title="Price">
                <PriceFilter />
              </Closeable>
              <Closeable title="Availablility">
                {["Include out of stock"].map((x, i) => {
                  return (
                    <div
                      key={i}
                      className="flex flex-row items-center mb-[0.3rem]"
                    >
                      <input className="mr-2" type="checkbox" />
                      <span className="whitespace-nowrap text-sm">{x}</span>
                    </div>
                  );
                })}
              </Closeable>
            </div>
          )}
        </div>

        <div className="grow">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 pt-6 md:mr-10 md:ml-10 min-h-[70vh] md:min-h-[0]">
            {products && products.map((x, i) => <ProductLI key={x} pid={x} />)}
            {!products?.length && (
              <div className="flex flex-col items-center col-span-3">
                <img
                  src={getPublicURL("/gif/search.gif")}
                  className="w-[20rem]"
                />
                {/* <div className="max-w-[15rem] text-center -translate-y-[2rem]">
                  Sorry, no results found!
                </div> */}
              </div>
            )}
            {/* <PageNoBlock nPages={Math.ceil(nProducts / resultsPerPage())} /> */}
          </div>
          <div className="flex justify-center">
            <PageNoBlock nPages={Math.ceil(nProducts / resultsPerPage())} />
          </div>
        </div>
      </div>
    </div>
  );
}

const sortOptions = new Map();
sortOptions.set("", "Featured");
sortOptions.set("price:asc", "Price: Low to High");
sortOptions.set("price:desc", "Price: High to Low");
sortOptions.set("createdAt:desc", "Newest First");
sortOptions.set("ratings:desc", "Rating");
function SortDropDown() {
  const values = Array.from(sortOptions.values());
  const keys = Array.from(sortOptions.keys());
  const router = useRouter();
  const [value, setValue] = useState(values[0]);

  useEffect(() => {
    if (router.isReady && router.query.sort) {
      setValue(sortOptions.get(router.query.sort));
    }
  }, [router.isReady, router.query]);

  // return (
  //   <SuggestionInput
  //     className="ml-auto py-2"
  //     style={{ width: "13rem", height: "1.8rem", fontSize: "0.8rem" }}
  //     value={value}
  //     setValue={setValue}
  //     readOnly={false}
  //     placeholder="Sort By"
  //     items={[
  //       "Featured",
  //       "Price: High to Low",
  //       "Price: Low to High",
  //       "Newest First",
  //       "Rating",
  //     ]}
  //   />
  // );
  return (
    <SuggestionInput
      className="ml-auto my-[0.4rem] mr-16"
      value={value}
      setValue={setValue}
      items={Array.from(sortOptions.values())}
      prefix="Sort by: "
      onSelect={(i, v) => {
        if (i === 0) {
          let q = { ...router.query };
          delete q.sort;
          delete q.page;
          router.replace(
            {
              pathname: router.pathname,
              query: q,
            },
            undefined,
            { shallow: true }
          );
          return;
        }
        let q = { ...router.query };
        delete q.page;
        router.replace(
          {
            pathname: router.pathname,
            query: { ...q, sort: keys[i] },
          },
          undefined,
          { shallow: true }
        );
      }}
      allowEdit={false}
      style={{ width: "15rem", height: "2.2rem", fontSize: "0.9rem" }}
    />
  );
  return (
    <select
      value={value}
      className="ml-auto"
      onChange={(e) => {
        if (!e.target.value) {
          let q = { ...router.query };
          delete q.sortBy;
          delete q.sortOrder;
          router.replace(
            {
              pathname: router.pathname,
              query: q,
            },
            undefined,
            { shallow: true }
          );
          return;
        }
        const t = e.target.value.split(",");
        setValue(e.target.value);
        router.replace(
          {
            pathname: router.pathname,
            query: { ...router.query, sortBy: t[0], sortOrder: t[1] },
          },
          undefined,
          { shallow: true }
        );
      }}
    >
      <option value="">Sort By: Featured</option>
      <option value="price,-1">Sort By: Price: High to Low</option>
      <option value="price,1">Sort By: Price: Low to High</option>
      <option value="createdAt,-1">Sort By: Newest First</option>
      <option value="ratings,-1">Sort By: Rating</option>
    </select>
  );
}

function PriceFilter() {
  const min = 0;
  const max = 1000;
  const router = useRouter();
  // const inputStyle = "small-placeholder rounded-md border-1 py-1 px-2 w-[4rem]";
  // const [min, setMin] = useState("");
  // const [max, setMax] = useState("");
  // useEffect(() => {
  //   if (router.isReady) {
  //     if (router.query["minPrice"]) setMinVal(router.query["minPrice"]);
  //     if (router.query["maxPrice"]) setMaxVal(router.query["maxPrice"]);
  //   }
  // }, [router.isReady]);
  // return (
  //   <div className="flex flex-row items-center gap-2">
  //     <input
  //       value={min}
  //       onChange={(e) => setMin(e.target.value)}
  //       className={inputStyle}
  //       placeholder="Min"
  //     />
  //     <input
  //       value={max}
  //       onChange={(e) => setMax(e.target.value)}
  //       className={inputStyle}
  //       placeholder="Max"
  //     />
  // <button
  //   className="bg-blue-btn-bg  font-bold rounded-md px-2 py-1"
  //   onClick={(e) => {
  //     const q = { ...router.query };
  //     delete q["minPrice"];
  //     delete q["maxPrice"];
  //     delete q.page;
  //     if (min) q["minPrice"] = min;
  //     if (max) q["maxPrice"] = max;
  //     router.replace(
  //       {
  //         pathname: router.query.pathname,
  //         query: q,
  //       },
  //       undefined,
  //       { shallow: true }
  //     );
  //   }}
  // >
  //   Go
  // </button>
  //   </div>
  // );
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef(null);
  const maxValRef = useRef(null);
  const range = useRef(null);

  // Convert to percentage
  const getPercent = useCallback(
    (value) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  useEffect(() => {
    if (router.isReady) {
      if (router.query["minPrice"]) setMinVal(router.query["minPrice"]);
      if (router.query["maxPrice"]) setMaxVal(router.query["maxPrice"]);
    }
  }, [router.isReady]);
  // Set width of the range to decrease from the left side
  useEffect(() => {
    if (maxValRef.current) {
      const minPercent = getPercent(minVal);
      const maxPercent = getPercent(+maxValRef.current.value); // Preceding with '+' converts the value from type string to type number

      if (range.current) {
        range.current.style.left = `${minPercent}%`;
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    if (minValRef.current) {
      const minPercent = getPercent(+minValRef.current.value);
      const maxPercent = getPercent(maxVal);

      if (range.current) {
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [maxVal, getPercent]);

  // Get min and max values when their state changes

  return (
    <div className="flex">
      <div className="container">
        <input
          type="range"
          min={min}
          max={max}
          value={minVal}
          ref={minValRef}
          onChange={(event) => {
            const value = Math.min(+event.target.value, maxVal - 1);
            setMinVal(value);
            event.target.value = value.toString();
          }}
          className={classnames("thumb thumb--zindex-3", {
            "thumb--zindex-5": minVal > max - 100,
          })}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={maxVal}
          ref={maxValRef}
          onChange={(event) => {
            const value = Math.max(+event.target.value, minVal + 1);
            setMaxVal(value);
            event.target.value = value.toString();
          }}
          className="thumb thumb--zindex-4"
        />

        <div className="slider">
          <div className="slider__track" />
          <div ref={range} className="slider__range" />
          <div className="slider__left-value">{minVal}</div>
          <div className="slider__right-value">{maxVal}</div>
        </div>
      </div>
      <button
        className="bg-blue-btn-bg text-xs  font-semibold rounded-md px-2 my-4 ml-1"
        onClick={(e) => {
          const q = { ...router.query };
          delete q["minPrice"];
          delete q["maxPrice"];
          delete q.page;
          if (minVal) {
            q["minPrice"] = minVal;
          }
          if (maxVal) q["maxPrice"] = maxVal;
          router.replace(
            {
              pathname: router.query.pathname,
              query: q,
            },
            undefined,
            { shallow: true }
          );
        }}
      >
        Go
      </button>
    </div>
  );
}

function RatingFilter() {
  const min = 0;
  const max = 5;
  const router = useRouter();
  // const inputStyle = "small-placeholder rounded-md border-1 py-1 px-2 w-[4rem]";
  // const [min, setMin] = useState("");
  // const [max, setMax] = useState("");
  // useEffect(() => {
  //   if (router.isReady) {
  //     if (router.query["minPrice"]) setMinVal(router.query["minPrice"]);
  //     if (router.query["maxPrice"]) setMaxVal(router.query["maxPrice"]);
  //   }
  // }, [router.isReady]);
  // return (
  //   <div className="flex flex-row items-center gap-2">
  //     <input
  //       value={min}
  //       onChange={(e) => setMin(e.target.value)}
  //       className={inputStyle}
  //       placeholder="Min"
  //     />
  //     <input
  //       value={max}
  //       onChange={(e) => setMax(e.target.value)}
  //       className={inputStyle}
  //       placeholder="Max"
  //     />
  // <button
  //   className="bg-blue-btn-bg  font-bold rounded-md px-2 py-1"
  //   onClick={(e) => {
  //     const q = { ...router.query };
  //     delete q["minPrice"];
  //     delete q["maxPrice"];
  //     delete q.page;
  //     if (min) q["minPrice"] = min;
  //     if (max) q["maxPrice"] = max;
  //     router.replace(
  //       {
  //         pathname: router.query.pathname,
  //         query: q,
  //       },
  //       undefined,
  //       { shallow: true }
  //     );
  //   }}
  // >
  //   Go
  // </button>
  //   </div>
  // );
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef(null);
  const maxValRef = useRef(null);
  const range = useRef(null);

  // Convert to percentage
  const getPercent = useCallback(
    (value) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  useEffect(() => {
    if (router.isReady) {
      if (router.query["minRating"]) setMinVal(router.query["minRating"]);
      if (router.query["maxRating"]) setMaxVal(router.query["maxRating"]);
    }
  }, [router.isReady]);
  // Set width of the range to decrease from the left side
  useEffect(() => {
    if (maxValRef.current) {
      const minPercent = getPercent(minVal);
      const maxPercent = getPercent(+maxValRef.current.value); // Preceding with '+' converts the value from type string to type number

      if (range.current) {
        range.current.style.left = `${minPercent}%`;
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    if (minValRef.current) {
      const minPercent = getPercent(+minValRef.current.value);
      const maxPercent = getPercent(maxVal);

      if (range.current) {
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [maxVal, getPercent]);

  // Get min and max values when their state changes

  return (
    <div className="flex">
      <div className="container">
        <input
          type="range"
          min={min}
          max={max}
          value={minVal}
          ref={minValRef}
          onChange={(event) => {
            const value = Math.min(+event.target.value, maxVal - 1);
            setMinVal(value);
            event.target.value = value.toString();
          }}
          className={classnames("thumb thumb--zindex-3", {
            "thumb--zindex-5": minVal > max - 100,
          })}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={maxVal}
          ref={maxValRef}
          onChange={(event) => {
            const value = Math.max(+event.target.value, minVal + 1);
            setMaxVal(value);
            event.target.value = value.toString();
          }}
          className="thumb thumb--zindex-4"
        />

        <div className="slider">
          <div className="slider__track" />
          <div ref={range} className="slider__range" />
          <div className="slider__left-value">{minVal}</div>
          <div className="slider__right-value">{maxVal}</div>
        </div>
      </div>
      <button
        className="bg-blue-btn-bg text-xs  font-semibold rounded-md px-2 my-4 ml-1"
        onClick={(e) => {
          const q = { ...router.query };
          delete q["minRating"];
          delete q["maxRating"];
          delete q.page;
          if (minVal) {
            q["minRating"] = minVal;
          }
          if (maxVal) q["maxRating"] = maxVal;
          router.replace(
            {
              pathname: router.query.pathname,
              query: q,
            },
            undefined,
            { shallow: true }
          );
        }}
      >
        Go
      </button>
    </div>
  );
}

function ProductCategories({ productCategories }) {
  const [selected, setSelected] = useState(0);
  const router = useRouter();
  const [subCategories, setSubCategories] = useState();
  let reqSubCat = false;
  useEffect(() => {
    if (reqSubCat) return;
    reqSubCat = true;
    makeRequest(
      getSubCategory,
      { id: "642678e0f4c353deff2c9dd6" },
      { 
        // loading:true,
        onSuccess: (res) => {
          setSubCategories(res.productSubCategories);
        },
      }
    );
  }, []);

  useEffect(() => {
    if (!router.query.category) setSelected(0);
    if (router.isReady && router.query.category) {
      setSelected(
        productCategories.findIndex((x) => x._id === router.query.category)
      );
    }
  }, [router.isReady, router.query]);
  return productCategories.map((x, i) => {
    return (
      <div key={i} className="flex flex-row">
        <div>
          <div className="flex flex-row items-center">
            <SquareRadioButton
              checked={selected === i}
              diameter="1rem"
              className="p-0.5"
              onClick={(e) => {
                let q = { ...router.query };
                delete q.category;
                delete q.subCategory;
                delete q.page;
                delete q.keyword;
                if (selected !== i) {
                  if (productCategories[i]._id)
                    q.category = productCategories[i]._id;
                  setSelected(i);
                } else {
                  setSelected(0);
                }
                router.replace(
                  {
                    pathname: router.pathname,
                    query: q,
                  },
                  undefined,
                  { shallow: true }
                );
              }}
            />
            <span className="whitespace-nowrap text-sm ml-2">{x.name}</span>
          </div>
          {subCategories && i === 1 && selected === 1 && (
            <div className="center-max flex flex-row">
              <div className="pt-2 pr-8 ml-3">
                <ProductSubCategories
                  ProductSubCategories={[
                    { name: "All", _id: undefined },
                    ...subCategories,
                  ]}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  });
}

function ProductSubCategories({ ProductSubCategories }) {
  const [selectedSubCat, setSelectedSubCat] = useState(0);
  const router = useRouter();
  return ProductSubCategories.map((x, i) => {
    if(x.name==="Multi Purpose Storage Bag") return;
    return (
      <div key={i} className="flex flex-row items-center mb-[0.3rem]">
        <SquareRadioButton
          checked={selectedSubCat === i}
          diameter="1rem"
          className="p-0.5"
          onClick={(e) => {
            let q = { ...router.query };
            delete q.subCategory;
            delete q.page;
            delete q.keyword;
            if (selectedSubCat !== i) {
              if (ProductSubCategories[i]._id)
                q.subCategory = ProductSubCategories[i]._id;
              setSelectedSubCat(i);
            } else {
              setSelectedSubCat(0);
            }
            router.replace(
              {
                pathname: router.pathname,
                query: q,
              },
              undefined,
              { shallow: true }
            );
          }}
        />
        <span className="whitespace-nowrap text-sm ml-2">{x.name}</span>
      </div>
    );
  });
}

function ProductLI({ pid }) {
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
  function goToProductDetails() {
    router.push(`/products/view?id=${data._id}`);
  }
  return (
    <div
      className="cursor-pointer"
      // style={{ borderBottom: "var(--border-1)" }}
    >
      <div className="relative">
        <ImageHolder
          className="w-[11.25rem] h-[7.5rem] md:w-[18rem] md:h-[12rem] rounded-sm block object-cover"
          src={imageURL}
          onClick={goToProductDetails}
        />
        <WishlistButton
          productId={data._id}
          className="absolute top-[0.5rem] right-[0.5rem] w-[2.4rem]"
        />
        <ShareButton
          productId={data._id}
          className="hidden md:block absolute top-[2.7rem] right-[0.8rem] w-[1.7rem]"
        />
        <div className="absolute top-[0rem] left-[0rem] px-1 rounded-br-md bg-white">
          {data.stock === 0 && (
            <img
              className="self-start md:h-[1rem] h-[0.75rem]"
              src={getPublicURL("/png/outofstock.png")}
            />
          )}
        </div>
      </div>
      <div className="relative">
        <div className="bg-black rounded-sm h-1 blur-sm w-[10rem] md:w-[17rem] absolute left-[0.5rem] top-1"></div>
        {/* glassy */}
        <div className="flex flex-col w-[11.25rem] md:w-[18rem] rounded-sm z-20 p-2 gap-1 bg-opacity-50 backdrop-blur-3xl -mt-1">
          <div
            className="font-semibold flex justify-between"
            onClick={goToProductDetails}
          >
            <div className="truncate">{data.productTitle}</div>
            {data.ratings > 0 && (
              <div className="flex ml-4">
                {data.ratings.toFixed(1)}
                <img
                  className="h-4 mt-0.5 px-1"
                  src={getPublicURL("/svg/star-green.svg")}
                />
              </div>
            )}
          </div>
          <div className="text-xs line-clamp-2">{data.productDecription}</div>
          {/* <div className="font-semibold text-xs">
            Delivery by <span>25th June,friday</span>
          </div> */}
          <Price_productlist
            price={data.mrp}
            discount={((data.mrp - data.sellingPrice) * 100) / data.mrp}
          />
          {/* <div className="ribbon-end mt-1 mb-2 text-sm font-semibold">
          Swasha Recommendation
        </div> */}
          {/* <div className="font-bold text-sm ">Price</div> */}

          {/* <RatingBar
          className="my-3"
          rating={data.ratings}
          ratingCount={data.numOfReviews}
          distribution={[...data.numOfNStar]
            .reverse()
            .map((x) => x / data.numOfReviews)}
        /> */}
          {/* <div className="flex flex-row items-center">
          <img className="h-[1.3rem] mr-[4px]" src = {getPublicURL("/svg/pin-blue.svg")} />
          <span className="font-bold text-sm -translate-y-[2px]">
            Delivery To
          </span>
        </div>
        <CheckPincode className="mt-[0.1rem] mb-[0.25rem]" />
        <div className="text-sm">
          <span
            className="font-semibold pr-2 mr-2"
            style={{ borderRight: "var(--border-1)" }}
          >
            Delivery by 17th Jan, Friday
          </span>
          <span className="text-green-price font-semibold mr-2">Free</span>
          <s>{CurrencyFormatter.format(40)}</s>
        </div> */}
        </div>
      </div>
    </div>
  );
}

function goToPage(router, page) {
  router.push(
    {
      pathname: router.pathname,
      query: { ...router.query, page: page },
    },
    undefined,
    { shallow: true }
  );
}
function range(s, e) {
  return [...Array(e - s).keys()].map((x) => x + s);
}

/** Range of page numbers to display
 * @param {Number} nPages
 * @param {Number} currentPage
 * @param {Number} n number of blocks to show
 * */
function pageRange(nPages, currentPage, n) {
  let s1 = Math.max(currentPage - Math.floor(n / 2), 1);
  let s2 = Math.min(currentPage + Math.floor(n / 2), nPages);
  if (s1 + n - 1 <= nPages) return range(s1, s1 + n);
  if (s2 - n + 1 >= 1) return range(s2 - n + 1, s2 + 1);
  return range(1, nPages + 1);
}

function PageNoBlock({ nPages }) {
  const btnStyle =
    "cursor-pointer bg-blue rounded-full shrink-0 w-[2.5rem] h-[2.5rem]";
  const router = useRouter();
  let [currentPage, setCurrentPage] = useState(router.query.page || 1);
  useEffect(() => setCurrentPage(router.query.page), [router.query.page]);
  if (!nPages) return <></>;
  currentPage ||= 1;
  const rng = pageRange(nPages, currentPage, 5);
  return (
    <div className="w-fit m-auto my-6 flex flex-row justify-center items-center gap-2">
      <img
        className={`${btnStyle} rotate-180 p-[0.6rem] bg-[#EFEFEF]`}
        src={getPublicURL("/png/double-right.png")}
        onClick={(e) => {
          goToPage(router, 1);
        }}
      />
      {rng.map((i) => {
        return (
          <button
            className={`${btnStyle}`}
            style={{
              backgroundColor: currentPage == i ? "#000000" : "#EFEFEF",
              color: currentPage == i ? "white" : "black",
            }}
            key={i}
            onClick={(e) => goToPage(router, i)}
          >
            {i}
          </button>
        );
      })}
      <img
        className={`${btnStyle} p-[0.6rem] bg-[#EFEFEF]`}
        src={getPublicURL("/png/double-right.png")}
        onClick={(e) => {
          goToPage(router, nPages);
        }}
      />
    </div>
  );
}

function Closeable({ title, items, initiallyOpen = false, children }) {
  const [open, setOpen] = useState(initiallyOpen);
  return (
    <div className="w-[10rem] mt-4">
      <div className="font-semibold flex text-sm flex-row items-center mb-2">
        {title}
        <img
          src={getPublicURL("/png/down-triangle.png")}
          className="ml-auto h-[0.8rem] cursor-pointer"
          style={{ transform: !open ? "" : "rotate(180deg)" }}
          onClick={(e) => setOpen(!open)}
        />
      </div>
      {open && children}
    </div>
  );
}
