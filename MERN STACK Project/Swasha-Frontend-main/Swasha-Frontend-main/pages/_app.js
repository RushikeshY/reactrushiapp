import { getPublicURL } from "../util/UrlUtils";
import "../styles/globals.css";
import { store } from "../redux/store";
import { Provider, useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useEffect } from "react";
import { updateUser } from "../redux/slices/userSlice";
import Header from "../components/Header";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { getLoggedInUserData, makeRequest } from "../util/ApiClient";
import { isUserLoggedIn, saveUserInfoFromServerIntoStore } from "../util/data";
import Script from "next/script";
import { useState } from "react";
import { useRef } from "react";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import FooterMobile from "../components/FooterMobile";
import BottomNavbar from "../components/BottomNavbar";

const defaultPageInfo = {
  hasMobileNav:true,
  hasNav: false,
};
const pageInfo = {
  "/": {
    hasNav: true,
  },
  "/products/search/": {
    hasMobileNav: false,
    hasNav: true,
  },
  "/products/orderSuccessful/": {
    hasNav: false,
  },
  "/products/view/": {
    hasNav: true,
    hasMobileNav:false,
  },
  "/user/wishlist/": {
    hasNav: true,
    hasMobileNav: false,
  },
  "/user/cart/": {
    hasMobileNav: false,
    hasNav: true,
  },
  "/user/CartAddresses/": {
    hasNav: false,
  },
  "/user/profile/": {
    hasNav: true,
  },
  "/products/TermsConditions/": {
    hasNav: true,
  },
  "/products/PrivacyPolicy/": {
    hasNav: true,
  },
  "/products/ReturnRefundCancellation/": {
    hasNav: true,
  },
};

const logoutPages = [/^\/$/, /^\/auth\/.*/, /^\/products\/.*/];

function getPageInfo(path) {
  if (path[path.length - 1] !== "/") path += "/";
  if (!pageInfo[path]) return defaultPageInfo;
  return { ...defaultPageInfo, ...pageInfo[path] };
}

function MyApp({ Component, pageProps }) {
  // useEffect(() => console.log("app useEffect"), [])
  return (
    <Provider store={store}>
      <Script
        strategy="beforeInteractive"
        src="https://checkout.razorpay.com/v1/checkout.js"
        crossOrigin="anonymous"
      ></Script>
      <ToastContainer autoClose={2000} position="bottom-right" theme="dark" />
      <Tooltip style={{ zIndex: "2000" }} id="b-tooltip" place="bottom" />
      <Tooltip style={{ zIndex: "2000" }} id="t-tooltip" place="top" />
      <Main Component={Component} pageProps={pageProps} />
    </Provider>
  );
}

function Main({ Component, pageProps }) {
  const router = useRouter();
  const user = useSelector((s) => s.user);
  const dispatch = useDispatch();
  const currentPageInfo = getPageInfo(router.pathname);
  const loading = useSelector((x) => x.config.loading);
  const loadingRef = useRef();
  const loadingImgRef = useRef();

  // dont permit in user section without logging in
  useEffect(() => {
    if (!router || !router.isReady || window.localStorage.getItem("userData"))
      return;
    let isPermitted = false;
    logoutPages.forEach((x) => {
      if (x.test(router.pathname)) isPermitted = true;
    });
    if (!isPermitted) {
      console.log("Login to access: ", router.pathname);
      router.replace("/auth/login");
    }
  }, [router.pathname]);

  useEffect(() => {
    if (user && Object.keys(user).length > 0) {
      console.log("userData:", user);
      window.localStorage.setItem("userData", JSON.stringify(user));
    }
  }, [user]);
  // if user not in store, load from local storage.
  useEffect(() => {
    if (!user || Object.keys(user).length === 0) {
      const u = JSON.parse(window.localStorage.getItem("userData"));
      dispatch(updateUser(u));
    }
  }, []);
  let requested = false;
  // refresh user data if logged in.
  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem("userData"));
    if (!user?.email || requested) return;
    requested = true;
    console.log("refresh user data");
    makeRequest(
      getLoggedInUserData,
      {},
      {
        onSuccess: (res) => {
          saveUserInfoFromServerIntoStore(dispatch, res);
        },
      }
    );
  }, []);
  const loadDuration = 0.5;
  useEffect(() => {
    if (loading) {
      loadingRef.current.style["pointer-events"] = "all";
      loadingRef.current.style["opacity"] = 1;
      // loadingImgRef.current.style["animation"] =
      //   "spin 0.4s ease infinite alternate";
    } else {
      loadingRef.current.style["pointer-events"] = "none";
      loadingRef.current.style["opacity"] = 0;
      setTimeout(() => {
        loadingImgRef.current.style["animation"] = "";
      }, loadDuration * 1000);
    }
  }, [loading]);
  // useEffect(() => console.log("main useEffect"), []);
  return (
    <>
      {currentPageInfo.hasMobileNav?<div className="sticky top-0 z-10">{currentPageInfo.hasNav && <NavBar/>}</div>:<div className="hidden md:block">{currentPageInfo.hasNav && <NavBar/>}</div>}
      <div className="w-full" style={{ minHeight: "60vh" }}>
        <Component {...pageProps} />
        {
          <div
            ref={loadingRef}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "#000000aa",
              zIndex: "1000",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              userSelect: "none",
              transition: `opacity ${loadDuration}s`,
            }}
          >
            <img
              ref={loadingImgRef}
              style={{
                // width: "20rem",
              }}
              src={getPublicURL("/gif/Swasha_loading_animation.gif")}
            />
          </div>
        }
      </div>
      <div className="hidden md:block">
        {currentPageInfo.hasNav && <Footer />}
      </div>
      <div className="md:hidden">
        {currentPageInfo.hasNav && <FooterMobile />}
       
      </div>
      <BottomNavbar/>
    </>
  );
}

export default MyApp;
