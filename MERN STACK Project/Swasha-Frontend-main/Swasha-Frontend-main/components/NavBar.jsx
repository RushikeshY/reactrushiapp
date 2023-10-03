import { getPublicURL } from "../util/UrlUtils";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { CartSVG, Hamburger, HeartWithNumber, Person, SearchIcon } from "./svg";
import DropdownHeader from "./DropdownHeader";
import {
  getAllAddresses,
  getCartItems,
  getWishlistItems,
  logout,
  makeRequest,
  requestEmailVerification,
} from "../util/ApiClient";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../redux/slices/userSlice";
import { toast } from "react-toastify";
import { isUserLoggedIn } from "../util/data";
import wishlist from "../pages/user/wishlist";

const catUrl = {
  "Shop All": "/products/search",
  Bags: "/products/search?category=642678e0f4c353deff2c9dd6",
  Jewellery: "/products/search?category=642678e0f4c353deff2c9e6f",
  "Home Decor": "/products/search?category=642678e0f4c353deff2c9ea2",
};


function Navbar() {
  const router = useRouter();
  const [profileDropdownVisible, setProfileDropdownVisible] = useState(false);
  const user = useSelector((s) => s.user);
  const hamburgerRef = useRef();
  const sideBarVisible = useRef(false);
  const sideBar = useRef();
  const rightSideBarVisible = useRef(false);
  const rightSideBar = useRef();
  const rightHamburgerRef = useRef();
  const [status,setStatus] = useState("Log Out");


  let requested = false;
  const wishlist = useSelector((x) => x.wishlist);
  const cart = useSelector((x) => x.cart);
  useEffect(() => {
    if (requested) return;
    requested = true;
    if (isUserLoggedIn()) {
      makeRequest(getCartItems);
      makeRequest(getAllAddresses);
      makeRequest(getWishlistItems);
    }
    if (!user.email) {
      setStatus("Login");
      } else {
      setStatus("Log Out");
      }
    }, [user]);

  let hamWidth = 30;
  let hamThickness = 3;
  let hamSpacing = 7;
  
  const dropdownItemsOrder = ["My Account", "My Order", "Delivery Address", "My Reviews"];
  const dropdownItems = {};
  const rightDropdownItemsOrder = ["Contact Us", "Terms & Conditions", "FAQ's", "About Us","Help"];
  const rightDropdownItems = {};
  
  if (isUserLoggedIn()) {
    dropdownItems["My Account"] = () => {
      router.push("/user/profile#Profile");
    };
    dropdownItems["My Order"] = () => {
      router.push("/user/profile/#My%20Orders");
    };
    dropdownItems["Delivery Address"] = () => {
      router.push("/user/profile/#Delivery%20Address");
    };
    dropdownItems["My Reviews"] = () => {
      router.push("/user/profile/#My%20Reviews");
    };
    // Check user's role and adding Dashboard option if role is admin or vendor
    if (user.role === "admin" || user.role === "vendor") {
      dropdownItems["Dashboard"] = () => {
        router.push("/adminPanel/admin");
      };
    }
    // dropdownItems["Payment Methods"] = () => {
    //   router.push("/user/profile/#My%20Orders");
    // };
    // dropdownItems["Add Delivery Address"] = () => {
    //   router.push("/user/profile/#Delivery%20Address");
    // };

    // dropdownItems["Notifications"] = () => {
    // router.push("/user/profile#Profile");
    // };
  }
    rightDropdownItems["My Account"] = () => {
      router.push("/user/profile#Profile");
    };
    dropdownItems["My Order"] = () => {
      router.push("/user/profile/#My%20Orders");
    };
    dropdownItems["Delivery Address"] = () => {
      router.push("/user/profile/#Delivery%20Address");
    };
    dropdownItems["My Reviews"] = () => {
      router.push("/user/profile/#My%20Reviews");
    };
    // Check user's role and adding Dashboard option if role is admin or vendor
    if (user.role === "admin" || user.role === "vendor") {
      dropdownItems["Dashboard"] = () => {
        router.push("/adminPanel/admin");
      };
    }
  
  const toggleSidebar = () => {
    if (sideBarVisible.current) {
      sideBar.current.classList.remove("openSideBar");
      sideBar.current.classList.add("closeSideBar");
      hamburgerRef.current.classList.remove("hamburgerActive");
      sideBarVisible.current = false;
    } else {
      sideBar.current.classList.remove("closeSideBar");
      sideBar.current.classList.add("openSideBar");
      hamburgerRef.current.classList.add("hamburgerActive");
      sideBarVisible.current = true;
    }
  };
  const toggleRightSidebar = () => {
    if (rightSideBarVisible.current) {
      rightSideBar.current.classList.remove("openSideBar");
      rightSideBar.current.classList.add("closeRightSideBar");
      rightHamburgerRef.current.classList.remove("hamburgerActive");
      rightSideBarVisible.current = false;
    } else {
      rightSideBar.current.classList.remove("closeRightSideBar");
      rightSideBar.current.classList.add("openSideBar");
      rightHamburgerRef.current.classList.add("hamburgerActive");
      rightSideBarVisible.current = true;
    }
  };
  const iconSize = "1.25rem";
  return (
    <nav className="sticky top-0 z-40">
      <div className="flex flex-row h-[3.43rem] md:h-[5rem] justify-between items-center bg-indigo-200 px-3 md:px-8">
        <svg
          className="hamburger md:hidden"
          ref={hamburgerRef}
          viewBox={`0 0 ${hamWidth} ${hamThickness * 3 + hamSpacing * 2}`}
          onClick={() => {toggleSidebar()}}
          width={hamWidth}
          height={hamThickness * 3 + hamSpacing * 2}
        >
          <rect y="0" width={hamWidth} height={hamThickness}></rect>
          <rect
            y={hamThickness + hamSpacing}
            width={hamWidth}
            height={hamThickness}
          ></rect>
          <rect
            y={hamThickness * 2 + hamSpacing * 2}
            width={hamWidth}
            height={hamThickness}
          ></rect>
        </svg>

        <div className="side-bar" ref={sideBar}>
          <div className="side-list">
            {dropdownItemsOrder.map((k) => {
              return (
                <div key={k} className="side-tab" onClick={()=>{ toggleSidebar();dropdownItems[k]();}}>
                  {k}
                </div>
              );
            })}
          </div>
          <div
              className="side-tab"
              onClick={(e) => {
                toggleSidebar();
                router.push("/user/wishlist");
              }}
            >
              My Wishlist
            </div>
            <div
              className="side-tab"
              onClick={(e) => {
                toggleSidebar()
                router.push("/user/cart");
              }}
            >
              My Cart
            </div>
            {status==="Log Out" && <div onClick={()=> {
            if(status === "Log in"){
                router.push("/auth/login");
            }
            else{
                makeRequest(
                logout,
                {},
                {
                onSuccess: () => {
                    window.localStorage.removeItem("userData");
                    window.location.href = "/auth/login";
                },
                loading: true,
                }
            );
            }
        }} className="flex px-4 justify-center py-1 mx-6 my-4 mt-2 rounded-md bg-[#FF5555]">
            <img className="h-[1rem] my-auto" style={{ fill: "white" }} src={getPublicURL("/png/logout.png")}/>
            <div className=" ml-2 text-white text-[0.9rem]">{status}</div>
            </div>}
            {status ==="Login" && <div onClick={()=> {
                if(status === "Log in"){
                    router.push("/auth/login");
                }
                else{
                    makeRequest(
                    logout,
                    {},
                    {
                    onSuccess: () => {
                        window.localStorage.removeItem("userData");
                        window.location.href = "/auth/login";
                    },
                    loading: true,
                    }
                );
                }
            }} className="flex px-4 justify-center py-1 rounded-md mx-6 mt-2 bg-yellow-500">
                <img className="h-[1rem] my-auto" style={{ fill: "white" }} src={getPublicURL("/png/logout.png")}/>
                <div className=" ml-2 text-white text-[0.9rem]">Sign In</div>
            </div>}
        </div>
        <img
            src={getPublicURL("/svg/Logo_NoBG.svg")}
            onClick={(e) => router.push("/")}
            className="h-10 md:h-12 mx-auto md:mr-auto md:ml-6 cursor-pointer pr-10 md:pr-0"
          />
        {/* <svg
          className="hamburger md:hidden"
          ref={rightHamburgerRef}
          viewBox={`0 0 ${hamWidth} ${hamThickness * 3 + hamSpacing * 2}`}
          onClick={() => {toggleRightSidebar()}}
          width={hamWidth}
          height={hamThickness * 3 + hamSpacing * 2}
        >
          <rect y="0" width={hamWidth} height={hamThickness}></rect>
          <rect
            y={hamThickness + hamSpacing}
            width={hamWidth}
            height={hamThickness}
          ></rect>
          <rect
            y={hamThickness * 2 + hamSpacing * 2}
            width={hamWidth}
            height={hamThickness}
          ></rect>
        </svg> */}
        {/* <div className="right-side-bar" ref={rightSideBar}>
          <div className="side-list">
            {rightDropdownItemsOrder.map((k) => {
              return (
                <div key={k} className="side-tab" onClick={()=>{ toggleRightSidebar();rightDropdownItems[k]();}}>
                  {k}
                </div>
              );
            })}
          </div>
        </div> */}
        <SearchBar className="hidden mx-auto md:flex h-[1.8rem] w-3/4 mr-[2rem]" />
        <NavIcon
          className="relative hidden md:block"
          // label="Profile"
          onClick={(e) => {
            setProfileDropdownVisible(!profileDropdownVisible);
          }}
        >
          <Person size={iconSize} />
          <DropdownHeader
            items={Object.keys(dropdownItems)}
            visible={profileDropdownVisible}
            setVisible={setProfileDropdownVisible}
            onSelect={(i) => Object.values(dropdownItems)[i]()}
            style={{ maxWidth: "10rem", left: "0" }}
          />
        </NavIcon>
        <div className="flex-row items-end hidden md:flex">
          {isUserLoggedIn() && (
            <NavIcon
              label={"Wishlist"}
              onClick={(e) => {
                router.push("/user/wishlist");
              }}
              count={Object.keys(wishlist).length}
            >
              <HeartWithNumber size={iconSize} />
            </NavIcon>
          )}

          {isUserLoggedIn() && (
            <NavIcon
              label="Cart"
              onClick={(e) => {
                router.push("/user/cart");
              }}
              count={Object.keys(cart).length}
            >
              <CartSVG size={iconSize} />
            </NavIcon>
          )}
        </div>
      </div>
      <div className="bg-[#295A8C] flex justify-center pt-1.5 h-[2.5rem] md:hidden">
        <SearchBar className="w-[20.25rem] h-[1.65rem] rounded text-xs grow-0" />
      </div>
    </nav>
    
  );
}

function NavIcon({ className, children, count = 0, label, ...other }) {
  return (
    <div
      className={`p-3 flex flex-col items-center ${className} mt-[3px] border-0 border-b-[3px] hover:border-white border-indigo-200 border-solid box-content cursor-pointer select-none relative`}
      style={{ flexGrow: 0, flexShrink: 0 }}
      data-tooltip-id={label && "t-tooltip"}
      data-tooltip-content={label}
      {...other}
    >
      {children}
      {/* <span className="mt-1 text-xs font-light text-white">{label}</span> */}
      {count > 0 && (
        <span
          className="font-semibold text-white bg-red-200"
          style={{
            borderRadius: "999px",
            position: "absolute",
            top: "100%",
            left: "100%",
            transform: "translate(-1.1rem, -1.3rem)",
            width: "1.2rem",
            height: "1.2rem",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            zIndex: "10",
            fontSize: "0.65rem",
          }}
        >
          {count}
        </span>
      )}
    </div>
  );
}

export function SearchBar({ className }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setQuery(router.query.keyword || "");
  }, [router.isReady, router.query]);

  return (
    <form
      data-open={open}
      className={`flex items-stretch rounded-full max-w-[30rem] grow-0 overflow-hidden text-sm bg-white ${className}`}
      onSubmit={(e) => {
        e.preventDefault();
        const q = { ...router.query, keyword: query };
        delete q.page;
        router.push(
          {
            pathname: "/products/search",
            query: q,
          },
          undefined,
          { shallow: true }
        );
      }}
    >
      <input
        type="text"
        className="pl-4 rounded-full grow small-placeholder"
        placeholder="Enter your search here..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        type="submit"
        className="flex items-center"
        onClick={(e) => {
          setOpen(!open);
        }}
      >
        <div className="p-2 border-1 md:hidden">
        <SearchIcon/>
        </div>
        <div className="hidden md:block p-4 font-semibold bg-yellow-500 ">search</div> 
         {/* <img src={getPublicURL("/svg/search.svg")} className="w-[1.25rem]" /> */}
      </button>
    </form>
  );
}

export default Navbar;
