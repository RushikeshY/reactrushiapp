import React, { useState } from "react";
import { getPublicURL } from "../util/UrlUtils";
import Link from "next/link";
import { bulkOrder, makeRequest, postContactUsData } from "../util/ApiClient";
import StringValidator, {
  EmailValidator,
  MobileNumberValidator,
} from "../util/StringValidator";
import { store } from "../redux/store";
import { toast } from "react-toastify";
import ImageLabelInput, { SuggestionInput } from "./ImageLabelInput";
import StateCity from "../util/StateCity.json";
import { RadioButton } from "./svg";
const inputStyle = { padding: "0.2rem 0" };
const inputFullStyle = { ...inputStyle, gridColumn: "1/3" };

const BulkOrder = ({ setShowPopupbulk, onBackClick }) => {
  const [name, setName] = useState(store.getState().user.name || "");
  const [mobile, setMobile] = useState(store.getState().user.mobileNum || "");
  const [email, setEmail] = useState(store.getState().user.email || "");
  const [query, setQuery] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [popupVisible, setPopupVisible] = useState(false);
  const [city, setCity] = useState("");
  const [cities, setCities] = useState([]);
  const [state, setState] = useState("");
  const [alternativeMobileNum, setAlternativeMobileNum] = useState("");
  const [alternativeMobileNumError, setalternativeMobileNumError] =
    useState("");
  const [pincode, setPincode] = useState("");
  const [pincodeError, setPincodeError] = useState("");
  const [locality, setLocality] = useState("");
  const [contactTime, setContactTime] = useState("");

  const nameValidator = new StringValidator({ minLength: 1 });
  const mobileValidator = MobileNumberValidator;
  const emailValidator = EmailValidator;
  const pincodeValidator = new StringValidator({ minLength: 6 });
  return (
    <div className="scrollable-content">
      <span className="flex gap-3 md:ml-6">
        {" "}
        <img
          className="max-w-[20px]"
          src={getPublicURL("/png/bulkorder.png")}
          alt=""
        />{" "}
        <span className="font-semibold text-[1.3rem]">Bulk Order Form</span>
      </span>
      <p className="text-xs text-red-100 -mt-0.5 md:ml-6 ">
        The minimum quantity is twenty pieces(20).
      </p>
      <style jsx>{`
        .scrollable-content {
          max-height: 480px; /* Set the desired max height for the scrollable area */
          overflow-y: scroll;
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* Internet Explorer 10+ */
        }

        .scrollable-content::-webkit-scrollbar {
          width: 0; /* Make the scrollbar invisible */
          height: 0;
        }
      `}</style>

      <div
        className=" w-[17rem] md:w-[40rem] flex flex-col items-center  md:grid md:grid-cols-2 md:p-7 md:gap-3 md:[&>*:nth-child(11)]:col-span-2 md:[&>*:nth-child(10)]:col-span-2 md:[&>*:nth-child(12)]:col-span-2 "
        //  style={{ width: "clamp(17rem, 38vw, 60rem)" }}
      >
        <ImageLabelInput
          label="Name *"
          placeholder="Enter your Full Name"
          autocomplete="given-name"
          type="text"
          value={name}
          setValue={setName}
          error={nameError}
          setError={setNameError}
          stringValidator={nameValidator}
          // style={inputStyle}
        ></ImageLabelInput>

        <ImageLabelInput
          label="Email ID *"
          placeholder="Enter Your Email Id"
          type="email"
          autocomplete="email"
          value={email}
          setValue={setEmail}
          error={emailError}
          setError={setEmailError}
          stringValidator={emailValidator}
        ></ImageLabelInput>

        <ImageLabelInput
          label="Phone Number *"
          placeholder="Enter Your Phone Number"
          type="text"
          value={mobile}
          setValue={setMobile}
          error={mobileError}
          setError={setMobileError}
          stringValidator={mobileValidator}
        ></ImageLabelInput>

        <ImageLabelInput
          label="Alternative Number *"
          placeholder="Enter Your Alternative Phone Number"
          type="text"
          value={alternativeMobileNum}
          setValue={setAlternativeMobileNum}
          error={alternativeMobileNumError}
          setError={setalternativeMobileNumError}
          stringValidator={mobileValidator}
        ></ImageLabelInput>

        <ImageLabelInput
          label="Locality/D.No *"
          placeholder="Enter Your Locality/door No"
          type="text"
          value={locality}
          setValue={setLocality}
          // error={mobileError}
          // setError={setMobileError}
          // stringValidator={mobileValidator}
        ></ImageLabelInput>

        <ImageLabelInput
          label="Pin Code *"
          placeholder="Enter Your pin code"
          type="text"
          value={pincode}
          setValue={setPincode}
          error={pincodeError}
          setError={setPincodeError}
          stringValidator={pincodeValidator}
        ></ImageLabelInput>

        <ImageLabelInput
          value={state}
          setValue={setState}
          // style={inputStyle}
          label="State"
        >
          <SuggestionInput
            placeholder="Select State"
            autoComplete="nope"
            value={state}
            setValue={setState}
            items={Object.keys(StateCity)}
            onSelect={(i, v) => {
              setCities(StateCity[v] || []);
              setCity("");
            }}
          />
        </ImageLabelInput>

        <ImageLabelInput label="Town/City/District">
          <SuggestionInput
            placeholder="Select City"
            autoComplete="nope"
            value={city}
            setValue={setCity}
            items={cities}
            onFocus={(e) => {
              setCities(StateCity[state] || []);
            }}
          />
        </ImageLabelInput>
        <p className="font-bold text-base mr-28">Preferable time *</p>
        <div className="flex flex-col md:flex-row mr-24 ">
          <div className="flex flex-row items-center gap-2 text-sm py-1 md:px-4 rounded-full">
            <span className=" hidden md:flex gap-3 ">
              {" "}
              <svg
                version="1.0"
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="26"
                viewBox="-6 -5 38 24"
                preserveAspectRatio="xMidYMid meet"
              >
                <g
                  transform="translate(0.000000,26.000000) scale(0.100000,-0.100000)"
                  fill="#000000"
                  stroke="none"
                >
                  <path
                    d="M65 195 c-27 -26 -29 -33 -16 -54 10 -15 20 -10 80 37 l24 20 -21 11
c-30 16 -40 14 -67 -14z"
                  />
                  <path
                    d="M140 169 c-13 -9 -13 -11 -1 -16 22 -9 64 -53 57 -60 -3 -4 -16 3
-29 15 -48 45 -117 18 -117 -46 0 -50 28 -62 141 -62 80 0 99 3 112 18 28 30
20 53 -38 109 -56 54 -91 66 -125 42z"
                  />
                </g>
              </svg>{" "}
            </span>
            <RadioButton
              checked={contactTime === "9 am - 12 pm"}
              diameter="1.2rem"
              onClick={(e) => setContactTime("9 am - 12 pm")}
            />
            9am-12pm
          </div>

          <span className="hidden md:flex gap-3">
            {" "}
            <svg
              version="1.0"
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="-6 -5 38 24"
              preserveAspectRatio="xMidYMid meet"
            >
              <g
                transform="translate(0.000000,26.000000) scale(0.100000,-0.100000)"
                fill="#000000"
                stroke="none"
              >
                <path
                  d="M178 243 c-30 -19 -53 -64 -45 -87 3 -8 18 -16 34 -18 19 -2 32 -12
41 -30 17 -37 54 -45 90 -22 l27 18 -39 7 c-22 3 -45 15 -53 25 -20 27 -16 75
9 101 l21 23 -29 0 c-16 0 -41 -8 -56 -17z"
                />
                <path
                  d="M63 137 c-13 -5 -23 -15 -23 -22 0 -7 -9 -20 -20 -30 -25 -23 -26
-47 -2 -68 23 -21 181 -24 200 -5 19 19 14 45 -10 62 -12 9 -19 16 -15 16 4 0
3 9 -3 21 -7 13 -19 19 -33 17 -12 -1 -26 0 -32 3 -24 14 -42 16 -62 6z"
                />
              </g>
            </svg>
          </span>

          <div className="flex flex-row items-center gap-2 text-sm py-1  md:px-2 rounded-full">
            <RadioButton
              checked={contactTime === "01 pm - 06 pm"}
              diameter="1.2rem"
              onClick={(e) => setContactTime("01 pm - 06 pm")}
            />
            1pm-6pm
          </div>

          <div className="flex flex-row items-center gap-2 text-sm py-1 md:px-4 rounded-full">
            <RadioButton
              checked={contactTime === "Anytime Between 09 am to 06 pm"}
              diameter="1.2rem"
              onClick={(e) => setContactTime("Anytime Between 09 am to 06 pm")}
            />
            9am-6pm
          </div>
        </div>

        <ImageLabelInput
          label="Write Your Query? *"
          placeholder="Write your own query in 1000 characters"
          autocomplete="given-name"
          type="text-area"
        >
          {" "}
          <textarea
            className="w-full p-3 rounded-md border-1"
            style={{ gridColumn: "1/-1", resize: "none" }}
            placeholder="Write your own query in 1000 characters"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </ImageLabelInput>

        <div className="flex flex-row items-center justify-between w-full">
          <div className="flex row-auto">
            <button
              className="flex flex-row items-center"
              onClick={onBackClick}
            >
              <img
                src={getPublicURL("/svg/back.svg")}
                className="h-[0.7rem] mr-1 cursor-pointer"
              />
              <span className="text-[1rem]">Back</span>
            </button>
          </div>

          <button
            className="w-fit blue-button-2 "
            onClick={(e) => {
              makeRequest(
                bulkOrder,
                {
                  fullname: name,
                  email: email,
                  mobileNum: mobile,
                  alternativeMobileNum: alternativeMobileNum,
                  fullAddress: locality,
                  pinCode: pincode,
                  city: city,
                  state: state,
                  preferableTimeForContact: contactTime,
                  queryMessage: query,
                },
                {
                  onSuccess: () => {
                    setShowPopupbulk(true);
                    toast.success("Query submitted.");
                    setPopupVisible(true);
                    onBackClick();
                  },
                  loading: true,
                }
              );
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default BulkOrder;
