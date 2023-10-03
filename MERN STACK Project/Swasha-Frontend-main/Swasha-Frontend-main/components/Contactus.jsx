import React, { useState } from "react";
import ImageLabelInput, { SuggestionInput } from "./ImageLabelInput";
import { getPublicURL } from "../util/UrlUtils";
import Link from "next/link";
import { makeRequest, postContactUsData } from "../util/ApiClient";
import StringValidator, {
  EmailValidator,
  MobileNumberValidator,
} from "../util/StringValidator";
import { store } from "../redux/store";
import { toast } from "react-toastify";
import ContactUsPopUp from "./buttons/ContactUsPopUp";
import Dialog from "./Dialog";

const queryTypes = [
  "Order Tracking",
  "Order Return",
  "Order Cancellation",
  "Refund",
  "Wrong/Defective Product",
  "Business Enquiry",
  "Others",
];

const Contactus = ({setShowPopup, onBackClick }) => {
  const [queryType, setQueryType] = useState(queryTypes[0]);
  const [name, setName] = useState(store.getState().user.name || "");
  const [mobile, setMobile] = useState(store.getState().user.mobileNum || "");
  const [email, setEmail] = useState(store.getState().user.email || "");
  const [query, setQuery] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [popupVisible, setPopupVisible] = useState(false);
  

  const nameValidator = new StringValidator({ minLength: 1 });
  const mobileValidator = MobileNumberValidator;
  const emailValidator = EmailValidator;
  return (
    <div className="z-50">
      <span className="flex gap-3 ">
        {" "}
        <img
          className="max-w-[20px]"
          src={getPublicURL("/svg/Phone.svg")}
          alt=""
        />{" "}
        <span className="font-semibold text-[1.3rem]">Contact Us</span>
      </span>
      <p className="text-xs">
        Please fill the below form to send your query to us
      </p>

      <div
        className="flex flex-col items-center"
        style={{ width: "clamp(17rem, 32vw, 40rem)" }}
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
          
          
        ></ImageLabelInput>

        <ImageLabelInput
          label="Phone Number *"
          placeholder="Enter Your Phone Number with Country code"
          type="text"
          value={mobile}
          setValue={setMobile}
          error={mobileError}
          setError={setMobileError}
          stringValidator={mobileValidator}
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
          label="What is your Query about? *"
          placeholder="Select Your Query"
          type="text"
        >
          <SuggestionInput
            value={queryType}
            setValue={setQueryType}
            items={queryTypes}
            allowEdit={false}
          />
        </ImageLabelInput>

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
                postContactUsData,
                {
                  fullname: name,
                  email,
                  mobileNum: mobile,
                  queryType: queryType,
                  queryMessage: query,
                },
                {
                  onSuccess: () => {
                    setShowPopup(true);
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

export default Contactus;
