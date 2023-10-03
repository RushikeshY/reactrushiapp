import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import ImageLabelInput from "../../components/ImageLabelInput";
import SwashaContainer from "../../components/SwashaContainer";
import VerifyOtp from "./verify-otp-popup";
import { makeRequest, signup } from "../../util/ApiClient";
import StringValidator, {
  EmailValidator,
  MobileNumberValidator,
} from "../../util/StringValidator";
import { getPublicURL } from "../../util/UrlUtils";
import { saveUserInfoFromServerIntoStore } from "../../util/data";
// import loginImg from "../../login.svg";

const SignUpPage = () => {
  const router = useRouter();
  const [visible,setVisible] = useState(false);
  
  return (
    <Fragment>
    <div>
    <SwashaContainer>
      <SignupBlock setState = {setVisible} />
      <div className="flex items-center justify-center w-full">
        <hr className="w-full h-px my-6 mx-2 bg-gray-800 border-spacing-1" />
        <span className="absolute px-3 font-medium text-black-200 -translate-x-1 bg-white">
          or
        </span>
      </div>
      <div className="text-center mb-10">
        Already have an account? <Link href="/auth/login">Sign In Here</Link>
      </div>
    </SwashaContainer>
    </div>
    <div className={visible?"visible":"invisible"}><VerifyOtp/></div>
    </Fragment>
  );
};

const PASS_DONT_MATCH = "Passwords don't match";

function SignupBlock({setState}) {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [nameError, setNameError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const nameValidator = new StringValidator({ minLength: 1 });
  const mobileValidator = MobileNumberValidator;
  const emailValidator = EmailValidator;
  const passwordValidator = new StringValidator({ minLength: 8 });

  const user = useSelector((s) => s.user);
  const dispatch = useDispatch();
  const router = useRouter();
  return (
    <div
      className="flex flex-col items-center"
      style={{ width: "clamp(18rem, 40vw, 25rem)" }}
    >
      <div className="self-start text-[1.5rem] mb-[1rem] font-semibold">
        Create Account
      </div>
      <ImageLabelInput
        imgsrc = {getPublicURL("/svg/person.svg")}
        label="Your Name"
        placeholder="Enter your first name and last name"
        value={name}
        setValue={setName}
        error={nameError}
        setError={setNameError}
        stringValidator={nameValidator}
      ></ImageLabelInput>
      <ImageLabelInput
        imgsrc = {getPublicURL("/svg/phone.svg")}
        label="Mobile Number"
        placeholder="Enter your mobile number"
        type="tel"
        value={mobile}
        setValue={setMobile}
        stringValidator={mobileValidator}
        error={mobileError}
        setError={setMobileError}
      ></ImageLabelInput>
      <ImageLabelInput
        imgsrc = {getPublicURL("/png/email.png")}
        label="Email Address"
        placeholder="Enter your email address"
        autoComplete="email"
        value={email}
        setValue={setEmail}
        stringValidator={emailValidator}
        error={emailError}
        setError={setEmailError}
      ></ImageLabelInput>
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
        error={confirmPasswordError}
        setError={setConfirmPasswordError}
        type="password"
        onChange={(e) => {
          if (password === e.target.value) setConfirmPasswordError("");
          else setConfirmPasswordError(PASS_DONT_MATCH);
        }}
      ></ImageLabelInput>
      <button
        className="blue-button-2 w-full mt-4"
        onClick={(e) => {
          let _nameError = nameValidator.error(name);
          let _emailError = emailValidator.error(email);
          let _mobileError = mobileValidator.error(mobile);
          let _passwordError = passwordValidator.error(password);
          let _confirmPasswordError =
            confirmPassword === password ? "" : PASS_DONT_MATCH;
          setNameError(_nameError);
          setEmailError(_emailError);
          setMobileError(_mobileError);
          setPasswordError(_passwordError);
          setConfirmPasswordError(_confirmPasswordError);
          if (
            _nameError ||
            _emailError ||
            _mobileError ||
            _passwordError ||
            _confirmPasswordError
          )
            return;
          makeRequest(
            signup,
            { name, email, mobile, password },
            {
              onSuccess: (x) => {
                saveUserInfoFromServerIntoStore(dispatch, x);
                toast.info(
                  "Verification link sent to your registered email address"
                );
                // router.push("/auth/verify-otp");
                setState(true);
              },
              loading: true,
            }
          );
        }}
      >
        Continue
      </button>
    </div>
  );
}

export default SignUpPage;
