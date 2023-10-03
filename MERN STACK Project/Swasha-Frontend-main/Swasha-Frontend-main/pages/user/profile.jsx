import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { AddressManager } from "../../components/Addresses";
import Dialog from "../../components/Dialog";
import ImageLabelInput, {
  SuggestionInput,
} from "../../components/ImageLabelInput";
import MyReturn from "../../components/myReturn";
import OrderHistory, {
  MyReviews,
  Rated,
  Unrated,
} from "../../components/orderHistory";
import {
  setEmailVerified,
  setMobileVerified,
} from "../../redux/slices/userSlice";
import { store } from "../../redux/store";
import { getPublicURL } from "../../util/UrlUtils";

import {
  changeLoggedInUserPassword,
  makeDefaultAddress,
  makeRequest,
  requestEmailVerification,
  updateLoggedInUserData,
} from "../../util/ApiClient";
import StringValidator, {
  EmailValidator,
  MobileNumberValidator,
} from "../../util/StringValidator";
import { OTPBox } from "../auth/verify-otp-popup";
import Link from "next/link";
import RateReview from "../../components/RateReview";

const names = {
  delivery: "Delivery Address",
  profile: "Profile",
  password: "Password",
  orders: "My Orders",
  reviews: "My Reviews",
  rated: "Rated Reviews",
  unrated: "Unrated Reviews",
  returns: "My Returns",
};

const sidepanelItems = [
  names.profile,
  names.orders,
  // names.returns,
  // "Payment Methods",
  names.delivery,
  names.reviews,
  // "Notifications",
  // "About Us",
];

export default function ProfilePage() {
  const [current, setCurrent] = useState(names.profile);
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [ratedshow,setRatedshow] = useState();
  const [unratedshow,setUnratedshow] = useState();
  const [currentSection, setCurrentSection] = useState("");
  const [one, setOne] = useState(false);
  const [defaultAddress, setDefaultAddress] = useState();
  const addressObj = useSelector((x) => x.address);

  const[orderStatus,setOrderStatus] = useState("");

  // consol(e.log("addressObj",addressObj)
  useEffect(() => {
    Object.keys(addressObj).forEach((key) => {
      const obj = addressObj[key];
      if (obj.isDefault) {
        // console.log(`${key} has isDefault set to true`);
        // console.log(obj);
        setDefaultAddress(obj);
      } else {
        // console.log(`${key} does not have isDefault set to true`);
      }
    });
  }, [addressObj]);
  // console.log(defaultAddress);

  // console.log(currentSection)

  const handleBack = () => {
    // window.location.reload();

    setOne(true);
  };

  useEffect(() => {
    setCurrentSection("");
    setOne(false);
    setShow(false);
  }, [one]);

  const handleOpen = () => {
    // if(show==false){
    //   setCurrentSection("")
    //   console.log("shhow", show)
    // }

    setShow(!show);
    if (show == true) {
      setCurrentSection("");
      console.log("show", show);
    }
  };
  useEffect(() => {
    if (!router.isReady) return;
    setCurrent(decodeURIComponent(router.asPath.split("#")[1]));
  }, [router.asPath, router.isReady]);

  const pankhSide = "1rem";
  return (
    <>
      <div
        className="hidden md:flex flex-row items-stretch"
        style={{ minHeight: "inherit" }}
      >
        <div
          className="bg-indigo-200 w-fit py-12 pl-[4rem] z-15 flex flex-col items-stretch gap-2 shrink-0"
          style={{
            background:
              "linear-gradient(153deg, #003C7A 0%, #1B7FE7 80%) 0% 0% no-repeat",
            minHeight: "50vh",
          }}
        >
          {sidepanelItems.map((x, i) => {
            return (
              <button
                key={x}
                className={`pr-8 pl-8 h-[3.5rem] text-[1.4rem] relative text-left whitespace-nowrap ${
                  current === x ? "bg-white rounded-l-full" : "text-white"
                }`}
                onClick={(e) => {
                  setCurrent(x);
                  router.replace(
                    router.asPath.split("#")[0] + "#" + x,
                    undefined,
                    { shallow: true }
                  );
                }}
              >
                {x}
                {current === x && (
                  <>
                    <svg
                      height="100"
                      width="100"
                      viewBox="0 0 100 100"
                      style={{
                        width: pankhSide,
                        height: pankhSide,
                        position: "absolute",
                        top: "100%",
                        left: "100%",
                        transform: "translate(-100%,0)",
                      }}
                    >
                      <defs>
                        <mask id="cut-br">
                          <rect
                            x="0"
                            y="0"
                            width="100"
                            height="100"
                            fill="white"
                          />
                          <circle cx="0" cy="100" r="100" fill="black" />
                        </mask>
                      </defs>
                      <rect
                        x="0"
                        y="0"
                        width="100"
                        height="100"
                        fill="white"
                        mask="url(#cut-br)"
                      />
                    </svg>
                    <svg
                      height="100"
                      width="100"
                      viewBox="0 0 100 100"
                      style={{
                        width: pankhSide,
                        height: pankhSide,
                        position: "absolute",
                        top: "0",
                        left: "100%",
                        transform: "translate(-100%,-100%)",
                      }}
                    >
                      <defs>
                        <mask id="cut-tl">
                          <rect
                            x="0"
                            y="0"
                            width="100"
                            height="100"
                            fill="white"
                          />
                          <circle cx="0" cy="0" r="100" fill="black" />
                        </mask>
                      </defs>
                      <rect
                        x="0"
                        y="0"
                        width="100"
                        height="100"
                        fill="white"
                        mask="url(#cut-tl)"
                      />
                    </svg>
                  </>
                )}
              </button>
            );
          })}
        </div>
        <div className="inline-block w-0 p-12 grow">
          {current === names.delivery && <DefaultAddress />}
          {current === names.profile && <UserData />}
          {current === names.orders && <OrderHistory />}
          {current === names.reviews && <MyReviews />}
          {current === names.returns && <MyReturn />}
        </div>
      </div>

      <div className="md:hidden  items-stretch flex flex-col  gap-2 bg-blue-100  py-4 min-h-[70vh] ">
        {currentSection == "Account" ? (
          <>
            <div
              className="border-2 bg-white px-3"
              onClick={() => setCurrentSection("Account")}
            >
              <>
                <button onClick={handleBack} className="w-10 pt-2">
                  <img className="w-4" src={getPublicURL("/svg/back.svg")} />
                </button>
                <b onClick={handleBack}>My Account Details</b>

                <p
                  className="cursor-pointer"
                  onClick={(e) => {
                    setCurrent("Profile");
                    setShow(!show);
                    // handleOpen();

                    // openModal("Profile")
                    router.replace(
                      router.asPath.split("#")[0] + "#" + "Profile",
                      undefined,
                      { shallow: true }
                    );
                  }}
                >
                  Personal information
                </p>
                {current === "Profile" && show ? <UserData /> : ""}
                <p
                  className="cursor-pointer"
                  onClick={(e) => {
                    setCurrent("Password");
                    // openModal("Password")
                    setShow(!show);

                    // handleOpen();
                    router.replace(
                      router.asPath.split("#")[0] + "#" + "Password",
                      undefined,
                      { shallow: true }
                    );
                  }}
                >
                  Change Password
                </p>
                {current === "Password" && show ? <ChangePassword /> : ""}
                {/* <p
                    className="cursor-pointer"
                    onClick={(e) => {
                      setCurrent("Delivery Address");
                      openModal("Delivery Address");
                      router.replace(
                        router.asPath.split("#")[0] + "#" + "Delivery Address",
                        undefined,
                        { shallow: true }
                      );
                    }}
                  >
                    Delivery Address
                  </p> */}
              </>
            </div>
          </>
        ) : currentSection == "Order" ? (
          <>
            {" "}
            <div
              className="border-2 grow bg-white"
              onClick={() => setCurrentSection("Order")}
            >
              {/* <button onClick={handleBack} className="w-10 pt-2">
                <img className="w-4" src={getPublicURL("/svg/back.svg")} />
              </button> */}
              {/* <b onClick={handleBack}>My Orders</b> */}
              { <OrderHistory handleBack={handleBack} orderStatus = {orderStatus}/>}
              {/* <p>Current Orders</p> */}
              {/* <p>Delivered Products</p>
              <p>Returned Orders</p>
              <p>Cancelled Orders</p> */}
            </div>
          </>
        ) : currentSection == "Delivery Address" ? (
          <>
            <div className="border-2 bg-white overflow-scroll ">
              <button onClick={handleBack} className="w-10 pt-2">
                <img className="w-4" src={getPublicURL("/svg/back.svg")} />
              </button>
              <b onClick={handleBack}>Delivery Address</b>
              <p
                className="cursor-pointer"
                onClick={(e) => {
                  setCurrent("Delivery Address");
                  setCurrentSection("Delivery Address");
                  // openModal("Delivery Address")
                  setShow(!show);
                  router.replace(
                    router.asPath.split("#")[0] + "#" + "Delivery Address",
                    undefined,
                    { shallow: true }
                  );
                }}
              >
                {/* Default Address */}
              </p>
              {current === "Delivery Address" && show ? <DefaultAddress /> : ""}
            </div>
          </>
        ) : currentSection == "Review" ? (
          <>
            <div
              className="border-2 bg-white px-3"
              onClick={() => setCurrentSection("Review")}
            >
              <button onClick={handleBack} className="w-10 pt-2">
                <img className="w-4" src={getPublicURL("/svg/back.svg")} />
              </button>
              <b onClick={handleBack} bg-blue-100>
                My Product Review
              </b>
              <div className="flex flex-row justify-between bg-blue-100 px-2">
                <p
                  onClick={(e) => {
                    setCurrent("Unrated Reviews");
                    setShow(!show);
                    setUnratedshow(true);
                    setRatedshow(false);
                    router.replace(
                      router.asPath.split("#")[0] + "#" + "Unrated Reviews",
                      undefined,
                      { shallow: true }
                    );
                  }}
                  className={`p-2 hover:bg-white ${current === "Unrated Reviews" ? 'bg-white' : ''}`}

                >
                  Unrated Products
                </p>

                <p
                  onClick={(e) => {
                    setCurrent("Rated Reviews");
                    setShow(!show);
                    setUnratedshow(false);
                    setRatedshow(true);
                    router.replace(
                      router.asPath.split("#")[0] + "#" + "Rated Reviews",
                      undefined,
                      { shallow: true }
                    );
                  }}
                  
                  className={`p-2 hover:bg-white ${current === "Rated Reviews" ? 'bg-white' : ''}`}
                >
                  Rated Products
                </p>
              </div>
              {current === "Unrated Reviews" && unratedshow ? <Unrated /> : ""}
              {current === "Rated Reviews" && ratedshow ? <Rated /> : ""}
            </div>
          </>
        ) : currentSection == "" ? (
          <>
            <div
              className="border-2 bg-white px-3"
              onClick={() => setCurrentSection("Account")}
            >
              {/* {currentSection === "Account" && ( */}
              <>
                <b>My Account Details</b>
                <p
                  className="cursor-pointer"
                  onClick={(e) => {
                    setCurrent("Profile");
                    setShow(!show);
                    // openModal("Profile")
                    router.replace(
                      router.asPath.split("#")[0] + "#" + "Profile",
                      undefined,
                      { shallow: true }
                    );
                  }}
                >
                  Personal information
                </p>
                {current === "Profile" && show ? <UserData /> : ""}
                <p
                  className="cursor-pointer"
                  onClick={(e) => {
                    setCurrent("Password");
                    // openModal("Password")
                    setShow(!show);
                    router.replace(
                      router.asPath.split("#")[0] + "#" + "Password",
                      undefined,
                      { shallow: true }
                    );
                  }}
                >
                  Change Password
                </p>
                {current === "Password" && show ? <ChangePassword /> : ""}
                {/* <p
                  className="cursor-pointer"
                  onClick={(e) => {
                    setCurrent("Delivery Address");
                    openModal("Delivery Address");
                    router.replace(
                      router.asPath.split("#")[0] + "#" + "Delivery Address",
                      undefined,
                      { shallow: true }
                    );
                  }}
                >
                  Delivery Address
                </p> */}
              </>
              {/* )} */}
            </div>
            <div
              className="border-2 bg-white px-3"
              onClick={() => setCurrentSection("Order")}
            >
              <b onClick={()=>{setOrderStatus("All");}}>My Orders</b>
              <p onClick={()=>{setOrderStatus("Current Orders")}}>Current Orders</p>
              <p onClick={()=>{setOrderStatus("Delivered")}}>Delivered Products</p>
              <p onClick={()=>{setOrderStatus("Returned")}}>Returned Orders</p>
              <p onClick={()=>{setOrderStatus("Cancelled")}}>Cancelled Orders</p>
            </div>
            <div
              className="border-2 bg-white px-3"
              onClick={(e) => {
                setCurrent("Delivery Address");
                setCurrentSection("Delivery Address");
                // openModal("Delivery Address")
                setShow(!show);
                router.replace(
                  router.asPath.split("#")[0] + "#" + "Delivery Address",
                  undefined,
                  { shallow: true }
                );
              }}
            >
              <b>Delivery Address</b>

              {defaultAddress && (
                <>
                  <p className="cursor-pointer text-base font-semibold">
                    {defaultAddress.fullName}
                    <span className="ml-2 border-1 p-1 text-sm opacity-75 border-blue-50">
                      default
                    </span>
                  </p>
                  {/* <p>{defaultAddress.phoneNumber}</p> */}
                  <p className="mb-2 truncate ">
                    {defaultAddress.addressLine1 +
                      " " +
                      defaultAddress.addressLine2 +
                      " " +
                      defaultAddress.city +
                      " " +
                      defaultAddress.country}
                  </p>
                </>
              )}
              {current === "Delivery Address" && show ? <DefaultAddress /> : ""}
            </div>
            <div
              className="border-2 bg-white px-3"
              onClick={() => setCurrentSection("Review")}
            >
              <b onClick={handleBack}>My Product Review</b>
              <p
                onClick={(e) => {
                  setCurrent("Unrated Reviews");
                  setShow(!show);
                  setUnratedshow(true);
                  setRatedshow(false);
                  router.replace(
                    router.asPath.split("#")[0] + "#" + "Unrated Reviews",
                    undefined,
                    { shallow: true }
                  );
                }}
              >
                Unrated Products
              </p>
              {current === "Unrated Reviews" && show ? <Unrated /> : ""}

              <p
                onClick={(e) => {
                  setCurrent("Rated Reviews");
                  setShow(!show);
                  setUnratedshow(false);
                    setRatedshow(true);
                  router.replace(
                    router.asPath.split("#")[0] + "#" + "Rated Reviews",
                    undefined,
                    { shallow: true }
                  );
                }}
              >
                Rated Products
              </p>
              {current === "Rated Reviews" && show ? <Rated /> : ""}
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

function UserData() {
  const dispatch = useDispatch();
  const user = useSelector((x) => x.user);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");

  const [nameError, setNameError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [emailError, setEmailError] = useState("");

  const [dialogVisible, setDialogVisible] = useState(false);

  const [editing, setEditing] = useState(false);

  const nameValidator = new StringValidator({ minLength: 1 });
  const mobileValidator = MobileNumberValidator;
  const emailValidator = EmailValidator;

  const inputStyle = {};

  function copyFromStore() {
    if (!user) return;
    setName(user.name || "");
    setMobile(user.mobileNum || "");
    setEmail(user.email || "");
    setGender(user.gender || "");
  }

  useEffect(() => {
    copyFromStore();
  }, [user]);

  return (
    <div>
      <Dialog
        padding="1.5rem"
        visible={dialogVisible}
        setVisible={setDialogVisible}
      >
        <OTPBox
          onSuccess={(e) => {
            setDialogVisible(false);
          }}
        />
      </Dialog>
      <div
        className="flex flex-row px-6 py-2 mb-6 text-lg font-semibold"
        style={{ borderBottom: "var(--border-1)" }}
      >
        <span>Account Information</span>
        {!editing && (
          <button
            className="ml-auto text-red-txt"
            onClick={(e) => setEditing(true)}
          >
            Edit
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-8 gap-y-4 md:p-3 w-full md:max-w-[50rem]">
        <ImageLabelInput
          readOnly={!editing}
          style={inputStyle}
          imgsrc={getPublicURL("/svg/person.svg")}
          label="Your Name"
          placeholder="Enter your first name and last name"
          value={name}
          setValue={setName}
          error={nameError}
          setError={setNameError}
          stringValidator={nameValidator}
        ></ImageLabelInput>
        <ImageLabelInput
          readOnly={!editing}
          style={inputStyle}
          imgsrc={getPublicURL("/svg/phone.svg")}
          label="Mobile Number"
          placeholder="Enter your mobile number"
          type="tel"
          value={mobile}
          setValue={setMobile}
          stringValidator={mobileValidator}
          error={mobileError}
          setError={setMobileError}
          topRightChild={
            user.mobileVerified ? (
              <></>
            ) : (
              <button
                className="ml-auto text-sm text-red-txt"
                onClick={(e) => {
                  setDialogVisible(true);
                }}
              >
                (verify now)
              </button>
            )
          }
        ></ImageLabelInput>
        <ImageLabelInput
          readOnly={!editing}
          style={inputStyle}
          imgsrc={getPublicURL("/png/email.png")}
          label="Email Address"
          placeholder="Enter your email address"
          autoComplete="email"
          value={email}
          setValue={setEmail}
          stringValidator={emailValidator}
          error={emailError}
          setError={setEmailError}
          topRightChild={
            user.emailVerified ? (
              <></>
            ) : (
              <button
                className="ml-auto text-sm text-red-txt"
                onClick={(e) => {
                  makeRequest(
                    requestEmailVerification,
                    {},
                    {
                      onSuccess: (res) => {
                        toast.info(
                          "Email verification link sent to your registered email address"
                        );
                      },
                      loading: true,
                    }
                  );
                }}
              >
                (verify now)
              </button>
            )
          }
        ></ImageLabelInput>
        <ImageLabelInput
          imgsrc={getPublicURL("/png/gender.png")}
          label="Gender"
          placeholder="Select Gender"
          value={gender}
          setValue={setGender}
          style={inputStyle}
        >
          <SuggestionInput
            readOnly={!editing}
            value={gender}
            setValue={setGender}
            placeholder="Select Gender"
            items={["Male", "Female", "Other"]}
          />
        </ImageLabelInput>
      </div>
      {editing && (
        <div className="flex flex-row gap-3 mt-4 w-full max-w-[50rem] justify-center">
          <button
            className="hollow-button w-[12rem]"
            onClick={(e) => {
              copyFromStore();
              setEditing(false);
            }}
          >
            Cancel
          </button>
          <button
            className="blue-button-2 w-[12rem]"
            onClick={(e) => {
              const xmobile = user.mobileNum;
              const xemail = user.email;
              makeRequest(
                updateLoggedInUserData,
                {
                  data: { name, email, mobileNum: mobile, gender },
                },
                {
                  onSuccess: (r) => {
                    if (mobile !== xmobile) {
                      console.log("mobile changed", xmobile, mobile);
                      dispatch(setMobileVerified(false));
                    }
                    if (email !== xemail) {
                      console.log("email changed", xemail, email);
                      dispatch(setEmailVerified(false));
                    }
                    toast.success("Update data successfully");
                    setEditing(false);
                  },
                  loading: "true",
                }
              );
            }}
          >
            Save
          </button>
        </div>
      )}
      <div className="hidden md:block">
        <ChangePassword />
      </div>
    </div>
  );
}

const PASS_DONT_MATCH = "Passwords don't match";

function ChangePassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");

  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [currentPasswordError, setCurrentPasswordError] = useState("");

  const passwordValidator = new StringValidator({ minLength: 8 });
  return (
    <div className="mt-8">
      <div
        className="font-semibold  text-lg md:px-6 py-2 mb-3]"
        style={{ borderBottom: "var(--border-1)" }}
      >
        Change Password
      </div>
      <div className="max-w-[24.625rem] md:p-3">
        <div className="flex flex-col items-center">
          <ImageLabelInput
            imgsrc={getPublicURL("/svg/lock.svg")}
            label="Current Password"
            placeholder="Atleast 8 characters"
            autoComplete="new-password"
            value={currentPassword}
            setValue={setCurrentPassword}
            stringValidator={passwordValidator}
            error={currentPasswordError}
            setError={setCurrentPasswordError}
            type="password"
          ></ImageLabelInput>
          <ImageLabelInput
            imgsrc={getPublicURL("/svg/lock.svg")}
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
            imgsrc={getPublicURL("/svg/lock.svg")}
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
            className="blue-button-2 w-[7rem] mt-4"
            onClick={(e) => {
              if (currentPassword === password) {
                toast.error("New password same as current password.");
                return;
              }
              let _currentPasswordError = passwordValidator.error(password);
              let _passwordError = passwordValidator.error(password);
              let _confirmPasswordError =
                confirmPassword === password ? "" : PASS_DONT_MATCH;

              setPasswordError(_passwordError);
              setCurrentPasswordError(_currentPasswordError);
              setConfirmPasswordError(_confirmPasswordError);
              if (
                _passwordError ||
                _confirmPasswordError ||
                _currentPasswordError
              )
                return;

              makeRequest(
                changeLoggedInUserPassword,
                {
                  data: {
                    oldPassword: currentPassword,
                    newPassword: password,
                    confirmPassword,
                  },
                },
                {
                  onSuccess: () => {
                    toast.success("Password changed");
                  },
                  loading: true,
                }
              );
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

function DefaultAddress() {
  const requested = useRef();
  return (
    <AddressManager
      grid
      title="Organize Addresses"
      titleStyle={{ fontSize: "1.5rem" }}
      onSelect={(address) => {
        if (
          !address ||
          address === requested.current ||
          store.getState().address[address].isDefault
        )
          return;
        requested.current = address;
        makeRequest(
          makeDefaultAddress,
          { aid: address },
          {
            onSuccess: (r) => {
              // toast.success("Updated default address");
            },
          }
        );
      }}
    />
  );
}
