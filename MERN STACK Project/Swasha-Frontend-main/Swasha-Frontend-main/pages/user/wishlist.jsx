import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import ImageHolder from "../../components/ImageHolder";
import Price_productlist from "../../components/Price_productlist";
import RatingBar from "../../components/RatingBar";
import {
  addToCart,
  getWishlistItems,
  makeRequest,
  removeFromWishlist,
} from "../../util/ApiClient";
import { fetchProduct } from "../../util/ProductClient";
import { getPublicURL } from "../../util/UrlUtils";
import { LogoForHeader1, LogoForHeader2 } from "../../components/svg";

export default function () {
  // const [section, setSection] = useState(0);
  // const sections = ["Recently purchased items", "Recently removed items"];
  const router = useRouter();
  const wishlist = useSelector((x) => x.wishlist);
  let requested = false;
  useEffect(() => {
    if (requested) return;
    requested = true;
    makeRequest(getWishlistItems);
  }, []);
  
  return (
    <div className="  center-max min-h-[81vh] md:min-h-[0] bg-[#FCFDFC]">
       <div className="md:hidden flex justify-between  border-1 sticky top-0 z-50 bg-white h-14 px-2">
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
      <div className="text-[0.75rem] pl-4 md:text-[1rem] font-bold my-3 ">
        Your Wishlist {"("+Object.keys(wishlist).length+")"}
      </div>
      <div className="py-4 px-4 grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-5">
        {!wishlist.default &&
          Object.entries(wishlist)
            .sort((a, b) => b[1] - a[1])
            .map((x) => <WishlistLI key={x[0]} pid={x[0]} />)}
        {Object.keys(wishlist).length === 0 && (
          <div className="col-span-4 items-center flex flex-col justify-center">
            <img
              src={getPublicURL("/gif/wishlist_empty.gif")}
              style={{
                width: "25rem",
              }}
            />
            <div className="flex flex-col items-center md:mb-20">
                <button className="yellow-btn" onClick={()=>{{
                  router.replace({
                    pathname: "/products/search",
                  });
                }}}>Continue Shopping</button>
            </div>
          </div>
        )}
      </div>
      {/* <div className="text-[1rem] md:text-[1.2rem] flex flex-row gap-4 p-4">
        {sections.map((x, i) => {
          return (
            <button
              key={i}
              className={`whitespace-nowrap border-0 border-solid border-blue-brd pb-2 md:pb-0 ${
                section === i ? "border-b-[3px] font-bold" : ""
              }`}
              style={{
                boxSizing: "content-box",
                width: "16rem",
                height: "2rem",
              }}
              onClick={(e) => {
                setSection(i);
              }}
            >
              {x}
            </button>
          );
        })}
      </div>
      <div className="border-1 rounded-md divide-solid px-4 py-2 divide-x-0 divide-y divide-gray-1000">
        {Object.keys(wishlist).map((x) => (
          <WishlistLI key={x} pid={x} deleteBtn={false} />
        ))}
      </div> */}
    </div>
  );
}

function WishlistLI({ pid, deleteBtn = true }) {
  const product = useSelector((x) => x.product[pid]);
  const cartItem = useSelector((x) => x.cart[pid]);
  const router = useRouter();
  function view() {
    router.push(`/products/view?id=${pid}`);
  }
  useEffect(() => {
    fetchProduct(pid);
  }, []);
  if (!product) return <></>;
  return (
    <div className="py-4 md:py-4 md:p-4">  
    <div>
    <div className="relative group">
      <ImageHolder
        className="w-full h-[10rem]  cursor-pointer rounded-t-sm"
        onClick={view}
        src={product.productImagesUrl?.[0]}
      />
      
      {product.stock === 0 && (
        <div className="absolute top-0 left-0 p-1 bg-white rounded-br-sm bg-opacity-50 backdrop-blur-3xl">
        <img className="h-[0.75rem] " src={getPublicURL("/png/outofstock.png")} />
        </div>
      )}
      
      <div className="absolute inset-0 flex items-center justify-center md:bg-black md:bg-opacity-50 md:opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="hidden md:block text-white text-md font-semibold cursor-pointer bg-black bg-opacity-50 px-4 py-1 rounded-md"
        onClick={(e) => {
              makeRequest(
                removeFromWishlist,
                { productId: pid },
                {
                  onSuccess: (res) => {
                    toast.success("Removed from wishlist");
                  },
                }
              );
            }}>Remove</span>
            <div className=" md:hidden   absolute top-0 right-0  cursor-pointer "
        onClick={(e) => {
              makeRequest(
                removeFromWishlist,
                { productId: pid },
                {
                  onSuccess: (res) => {
                    toast.success("Removed from wishlist");
                  },
                }
              );
            }}>
              <img className="text-black"
              src={getPublicURL("/svg/cancel.svg")}
              ></img>
            </div>
      </div>
      </div>
      <div className="relative">
      <div className="bg-black  flex rounded-sm h-1 blur-sm w-[95%] absolute left-1 top-1"></div>
      <div className="z-20 -mt-1 bg-opacity-50 backdrop-blur-3xl flex flex-col pl-2 pb-4">
      <div className="text-sm md:text-[0.9rem] truncate flex cursor-pointer">
        <div className="font-semibold truncate py-2" onClick={view}>
          {product.productTitle}
        </div>
      </div>
      {/* <RatingBar rating={product.ratings} ratingCount={50} reviewCount={10} /> */}
      <Price_productlist price={product.mrp} discount={((product.mrp - product.sellingPrice) * 100) / product.mrp} />
      <button
        className="border-2 mr-auto md:text-base text-xs md:p-1 p-0.5 mt-2 md:px-8 px-5  rounded-md text-[#F0BB27]"
        onClick={(e) => {
          if (cartItem) return;
          makeRequest(addToCart, { productId: pid, quantity: 1 });
          toast.success("Moved to Cart");
        }}
      >
        {cartItem ? "Added" : "Add"} to Cart
      </button>
      </div>
      </div>
      </div>
    </div>
  );
}
