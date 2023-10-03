import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState,useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import ImageLabelInput from "../../components/ImageLabelInput";
import SwashaContainer from "../../components/SwashaContainer";
import ToggleButton from "../../components/ToggleButton";
import { login, makeRequest } from "../../util/ApiClient";
import { saveUserInfoFromServerIntoStore } from "../../util/data";
import { getPublicURL } from "../../util/UrlUtils";
import { toast } from "react-toastify";
import ForgetPassword from "./forget-password-popup";
const LoginPage = () => {
  const [visible,setVisible] = useState(false);
  const popupRef = useRef(null);
  // Handle click outside the popup
  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setVisible(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <Fragment>
    <SwashaContainer>
    <div className="h-max">
      <LoginBlock setVisible= {setVisible}/>
      <div className="flex items-center justify-center w-full">
        <hr className="w-64 h-px my-6 bg-gray-800 border-spacing-1" />
        <span className="absolute px-3 font-medium text-black-200 -translate-x-1 bg-white">
          or
        </span>
      </div>
      <div className="text-center">
        Don't have an account? <Link href="/auth/signup">Sign up</Link>
      </div>
      </div>
    </SwashaContainer>
    <div className={visible?"visible":"invisible"}>
    <ForgetPassword setVisible={setVisible}/></div>
    </Fragment>
  );
};
function LoginBlock({setVisible}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((s) => s.user);
  const dispatch = useDispatch();
  const router = useRouter();
  // const [state, setState] = useState("active");
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        handleLogin();
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [email, password]);
  const handleLogin = () => {
    makeRequest(
      login,
      { email, password },
      {
        onSuccess: (x) => {
          saveUserInfoFromServerIntoStore(dispatch, x);
          router.push(
            router.query.redirect
              ? decodeURIComponent(router.query.redirect)
              : "/"
          );
        },
        onError: (e) => {
          toast.error("Wrong email or password entered, please recheck");
        },
        loading: true,
      }
    );
  };
  return (
    <div
      className="flex flex-col items-center my-auto"
      style={{ width: "clamp(17rem, 30vw, 25rem)" }}
    >
      <div className="self-start text-[1.5rem] mb-[1rem] font-semibold">
        Login to Swasha
      </div>
      <ImageLabelInput
        imgsrc={getPublicURL("/png/email.png")}
        label="Email Address"
        placeholder="Enter your email address"
        autoComplete="email"
        type="email"
        value={email}
        setValue={setEmail}
      ></ImageLabelInput>
      <ImageLabelInput
        imgsrc={getPublicURL("/svg/lock.svg")}
        label="Password"
        placeholder="Atleast 8 characters"
        autoComplete="current-password"
        value={password}
        setValue={setPassword}
        type="password"
      ></ImageLabelInput>
      {/* <div className="flex flex-row items-center self-start ml-2 mt-1 mb-3">
        <ToggleButton className="mr-2" state={state} setState={setState} />
        <span className="text-sm">keep me signed in.</span>
      </div> */}
      <button className="blue-button-2 w-full my-2 " onClick={handleLogin}>
        Login
      </button>
      <button
        // href="/auth/forgot-password"
        className="self-end text-gray-1500 text-sm"
        onClick={() => setVisible(true)}
      >
        Forgot password?
      </button>
    </div>
  );
}
export default LoginPage;