import React, { useEffect, useRef, useState } from "react";
import SwashaContainer from "../../components/SwashaContainer";
import {
  makeRequest,
  requestOTPVerification,
  verifyOTP,
} from "../../util/ApiClient";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setMobileVerified } from "../../redux/slices/userSlice";

export default function VerifyOTP() {
  const router = useRouter();
    
  return (
      <OTPBox
        className="fixed inset-0 justify-end md:justify-center items-center bg-opacity-25 backdrop-blur-[0.1rem]"
        skip={true}
        verifyText="Next"
        titleSize="1.8rem"
        onSuccess={() => router.push("/")}/>
  );
}

export function OTPBox({
  skip = false,
  verifyText = "Verify",
  titleSize = "1.5rem",
  showTitle = true,
  onSuccess = () => {},
  className = "",
}) {
  const dispatch = useDispatch();
  const inputGroupRef = useRef();
  const [inputs, setInputs] = useState([]);

  function request() {
    makeRequest(
      requestOTPVerification,
      {},
      {
        onSuccess: (res) => {
          toast.info("OTP sent to your registered mobile number");
        },
        loading: true,
      }
    );
  }
  let requested = false;
  useEffect(() => {
    if (requested) return;
    requested = true;
    request();
  }, []);

  useEffect(() => {
    let nBoxes = 6;
    let l = [];
    for (let i = 0; i < nBoxes; i++) {
      let e = React.createElement("input", {
        key: i,
        id: `ip${i}`,
        onFocus: (e) => {
          e.target.value = "";
          if (i > 0) {
            let pe = inputGroupRef.current.querySelector(`#ip${i - 1}`);
            if (pe.value === "") pe.focus();
          }
        },
        onChange: (e) => {
          let ne = inputGroupRef.current.querySelector(
            `#ip${(i + 1) % nBoxes}`
          );
          if (i < nBoxes - 1 && ne.value === "") {
            ne.focus();
          } else {
            e.target.blur();
          }
        },
        onKeyDown: (e) => {
          // console.log(
          //   e.charCode + "," + e.keyCode + "," + e.key + "," + e.code
          // );
          if (e.key === "Backspace" && i > 0) {
            inputGroupRef.current
              .querySelector(`#ip${(i - 1 + nBoxes) % nBoxes}`)
              .focus();
            return false;
          }
          if (e.key.length === 1 && (e.key < "0" || e.key > "9")) {
            setTimeout(() => {
              e.target.value = "";
            }, 50);
          }
        },
        type: "number",
      });
      l.push(e);
    }
    setInputs(l);
  }, [inputGroupRef]);
  // useEffect(() => {
  //   inputGroupRef.current.childNodes.forEach((x) => {
  //     x.value = "9";
  //   });
  // }, [inputs]);
  return (
    <div className={`flex flex-col ${className}`}>
    <div className="bg-gray-100 py-10 px-16 rounded-lg">
      
      {showTitle && (
        <>
        <div className={`text-[${titleSize}] mb-[1rem] font-semi`}>
          Enter OTP
        </div>
        <p>We sent a OTP to your registered mobile Number</p>
        </>
        
      )}
      <div id="otp">
        <div id="input-group" ref={inputGroupRef}>
          {inputs}
        </div>
        <button
          className="blue-button-2 mt-4 w-full"
          onClick={(e) => {
            e.target.classList.add("disabled-green-button");
            let otp = "";
            inputGroupRef.current.childNodes.forEach((x) => {
              otp += x.value;
            });
            makeRequest(
              verifyOTP,
              { otp },
              {
                onSuccess: (res) => {
                  toast.success("Mobile number verified successfully");
                  dispatch(setMobileVerified(true));
                  onSuccess();
                },
                loading: true,
              }
            );
          }}
        >
          {verifyText}
        </button>
        <div className="flex mt-2">
          {skip && (
            <Link className="text-sm" href="/">
              Skip for now
            </Link>
          )}
          <span
            className="text-sm ml-auto link-style"
            onClick={(e) => {
              request();
            }}
          >
            Resend OTP
          </span>
        </div>
      </div>
      </div>
    </div>
  );
}
