import { getPublicURL } from "../../util/UrlUtils";
import { Fragment, useState } from "react";
import { useRouter } from "next/router";
import { makeRequest, resetPassword } from "../../util/ApiClient";
import ImageLabelInput from "../../components/ImageLabelInput";
import StringValidator from "../../util/StringValidator";
import SwashaContainer from "../../components/SwashaContainer";
import Link from "next/link";
import { toast } from "react-toastify";
export default function () {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const passwordValidator = new StringValidator({ minLength: 8 });

  return (
    <Fragment>
       <SwashaContainer>
    <div className="">
    <div className="self-start text-[1.5rem] mb-[1rem] font-semibold mt-16">
        Reset Password
      </div>
    <div className="w-[20rem] m-auto flex flex-col items-center">
      <ImageLabelInput
        imgsrc = {getPublicURL("/svg/lock.svg")}
        label="Password"
        placeholder="Atleast 8 characters"
        autoComplete="new-password"
        value={password}
        setValue={setPassword}
        stringValidator={passwordValidator}
        error={passwordError}
        setError={setPasswordError}
        type="password"
      ></ImageLabelInput>
      <ImageLabelInput
        imgsrc = {getPublicURL("/svg/lock.svg")}
        label="Confirm Password"
        placeholder="Atleast 8 characters"
        autoComplete="new-password"
        value={confirmPassword}
        setValue={setConfirmPassword}
        type="password"
        error={confirmPasswordError}
        setError={setConfirmPasswordError}
        onChange={(e) => {
          if (password === e.target.value) setConfirmPasswordError("");
          else setConfirmPasswordError("Passwords don't match");
        }}
      ></ImageLabelInput>
      <button
        className="mt-3 mb-1.5 block w-3/5 text-center text-white bg-blue-700 hover:bg-blue-900 px-2 py-1.5 rounded-2xl"
        onClick={(e) => {
          makeRequest(
            resetPassword,
            {
              token: router.query.token,
              password,
              confirmPassword,
            },
            {
              onSuccess: (x) => {
                toast("Password Reset sucessfully")
                router.push("/auth/login");
              },
            }
          );
        }}
      >
        Reset
      </button>
    </div>
      {/* <LoginBlock setVisible= {setVisible}/> */}
      {/* <div className="flex items-center justify-center w-full">
        <hr className="w-64 h-px my-6 bg-gray-800 border-spacing-1" />
        <span className="absolute px-3 font-medium text-black-200 -translate-x-1 bg-white">
          or
        </span>
      </div>
      <div className="text-center">
        Don't have an account? <Link href="/auth/signup">Sign up</Link>
      </div> */}
      </div>
    </SwashaContainer>
   
    </Fragment>
  );
}
