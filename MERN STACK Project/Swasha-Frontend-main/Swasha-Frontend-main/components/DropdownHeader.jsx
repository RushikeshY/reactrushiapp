import { useRef } from "react";
import { useSelector } from 'react-redux';
import React, { useState,useEffect } from 'react';
import PopupHolder, { popupChildStyle } from "./PopupHolder";
import { getPublicURL } from "../util/UrlUtils";
import {
    getAllAddresses,
    getCartItems,
    getWishlistItems,
    logout,
    makeRequest,
    requestEmailVerification,
  } from "../util/ApiClient";

// remember to make parent's position relative
export default function ({
  items,
  visible,
  setVisible,
  onSelect,
  hideOnFocusBG = true,
  bgColor,
  style = {},
    }) {
  const [status,setStatus] = useState("Log Out");
  
  const user = useSelector((s) => s.user);

  useEffect(() => {
        if (!user.email) {
        setStatus("Login");
        } else {
        setStatus("Log Out");
        }
    }, [user]);

  return (
    <PopupHolder
      visible={visible}
      setVisible={setVisible}
      hideOnFocusBG={hideOnFocusBG}
      bgColor={bgColor}
    >
      <div
        className="no-scrollbar rounded-md"
        style={{
          backgroundColor: "white",
          // borderRadius: "10px",
          minWidth: "100%",
          maxHeight: "15rem",
          transform: "translate(-50%,0)",
          position: "absolute",
          left: "50%",
          top: "100%",
          overflowX: "hidden",
          overflowY: "scroll",
          whiteSpace: "nowrap",
          ...style,
          ...popupChildStyle,
        }}
      >
        {items.map((x, i) => {
          
          return (
            <div>
            <button
              className="w-full block text-start px-4 pr-14 py-2 text-[0.9rem] hover:bg-gray-500"
              key={x}
              onClick={(e) => {
                onSelect(i)
              }}
            >
              {x}
            </button>
            </div>
          );
        })}
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
        }} className="flex px-4 justify-center py-1 mx-2 my-4 rounded-md bg-[#FF5555]">
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
        }} className="flex px-4 justify-center py-1 rounded-md bg-yellow-500">
            <img className="h-[1rem] my-auto" style={{ fill: "white" }} src={getPublicURL("/png/logout.png")}/>
            <div className=" ml-2 text-white text-[0.9rem]">Sign In</div>
        </div>}
      </div>
    </PopupHolder>
  );
}
