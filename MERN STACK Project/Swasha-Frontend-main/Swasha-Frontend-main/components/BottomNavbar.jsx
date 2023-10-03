import React from 'react'
import { useRouter } from "next/router";
import { CartSVG, HeartWithNumber, Home, Person } from './svg';
import DropdownHeader from './DropdownHeader';
import { isUserLoggedIn } from '../util/data';
import { useSelector } from 'react-redux';
import { getPublicURL } from '../util/UrlUtils';

const BottomNavbar = () => {
  const router = useRouter();

  function NavIcon({ className, children, count = 0, label, ...other }) {
    return (
      <div
        className={`p-3 flex flex-col items-center ${className} mt-[3px] bg-transparent  box-content cursor-pointer select-none relative`}
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
  const iconSize = "1.25rem";
  const wishlist = useSelector((x) => x.wishlist);
  const cart = useSelector((x) => x.cart);


   
  return (
    <>
    {isUserLoggedIn() && (
    <div className='flex md:hidden bg-white justify-evenly sticky bottom-0 z-50 '>
       {isUserLoggedIn() && (
            <NavIcon
              label="Home"
              onClick={(e) => {
                router.push("/");
              }}
              
            >
               <img src={getPublicURL("/svg/newhome.svg")}/>
            </NavIcon>
          )}
        <NavIcon
          className="relative"
          // label="Profile"
          onClick={(e) => {
            router.push("/user/profile");
          }}
        >
           <img src={getPublicURL("/svg/newprofile.svg")}/>
{/* 
          <DropdownHeader
            items={Object.keys(dropdownItems)}
            visible={profileDropdownVisible}
            setVisible={setProfileDropdownVisible}
            onSelect={(i) => Object.values(dropdownItems)[i]()}
            style={{ maxWidth: "15rem", left: "0" }}
          /> */}
        </NavIcon>
          {isUserLoggedIn() && (
            <NavIcon
              label={"Wishlist"}
              onClick={(e) => {
                router.push("/user/wishlist");
              }}
              count={Object.keys(wishlist).length}
            >
              {/* <HeartWithNumber size={iconSize} /> */}
              <img src={getPublicURL("/svg/wishlist.svg")}/>
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
              {/* <CartSVG size={iconSize} /> */}
              <img src={getPublicURL("/svg/newcart.svg")}/>
            </NavIcon>
          )}
        

    </div>
    )
     }
     </>
  )
}

export default BottomNavbar