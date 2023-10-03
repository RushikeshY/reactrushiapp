import React, { useState,useEffect } from "react";
import { makeRequest,createReturn } from "../util/ApiClient";
function ReturnReason({setReturnVisible,order,setfetch,setText,setConfirmationPopup}) {
  const [reason, setReason] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const handleReasonChange = (event) => {
    setReason(event.target.value);
  };
  return (
    <div className="w-[25rem] text-black">
    <div className="sticky top-0 bg-white">
      <div className="px-6 py-4 font-semibold text-lg">
        Select Your Reason To Return
      </div>
      <div className="h-[1px] bg-[#e3e2e2]"></div>
      </div>
      <div className="px-6 pt-8 pb-4">
        <div className="font-semibold mb-2">
          Select Reason<span className="text-red-100">*</span>
        </div>
        <RadioGroup
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        ></RadioGroup>
      </div>
      {selectedOption === "Others" && (
        <div>
          <div className="h-[1px] bg-[#e3e2e2]"></div>
          <div className="px-6 py-4">
            <div className="font-semibold mb-2">
              Write Your Reason<span className="text-red-100">*</span>
            </div>
            <textarea
              id="text-input"
              name="text-input"
              className="w-full borderB-1 rounded px-3 py-2 h-32 resize-none"
              placeholder="Write your reason here..."
              value={reason}
              onChange={handleReasonChange}
            />
          </div>
        </div>
      )}
      <div className="flex justify-center gap-6 my-4">
        <button className="py-1 px-8 borderB-1 rounded-full" onClick={()=>{setReturnVisible(false)}}>Cancel</button>
        <button className="py-1 px-8 bg-indigo-200 text-white rounded-full" onClick={()=>{
           makeRequest(
            createReturn,
            {
              orderId : order.orderId,
              returnItems:{
                  "productId":order.id,
                  "quantity":order.quantity,
                  "reasonForReturn": selectedOption!=="Others"?selectedOption:reason
              }
            },
            {onSuccess: () => {
              setConfirmationPopup(true);
              setText("We have initiated your refund for this order, we will notify you regarding the pickup of the order.");
              setfetch('2');
            },
            onError: (res) => {
              setConfirmationPopup(true);
              setText(res.response.data.message);
            }
            },
          )
          setReturnVisible(false);
        }}>Submit</button>
      </div>
    </div>
  );
}

const RadioGroup = ({selectedOption, setSelectedOption}) => {
  const options = [
    {
      value: "Received Defective/Damaged Product",
      label: "Received Defective/Damaged Product",
    },
    { value: "Received Wrong Product", label: "Received Wrong Product" },
    { value: "Size Issues", label: "Size Issues" },
    { value: "Late Delivery", label: "Late Delivery" },
    {
      value: "It Did Not Meet My Expectations",
      label: "It Did Not Meet My Expectations",
    },
    { value: "I feel it is overpriced", label: "I feel it is overpriced" },
    { value: "Incomplete Order Received", label: "Incomplete Order Received" },
    { value: "Others", label: "Others" },
  ];

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="flex flex-col space-y-2">
      {options.map((option) => (
        <label key={option.value} className="inline-flex items-center">
          <input
            type="radio"
            value={option.value}
            checked={selectedOption === option.value}
            onChange={handleOptionChange}
            className="form-radio text-indigo-600  w-4 h-4"
          />
          <span className="ml-2 text-sm">{option.label}</span>
        </label>
      ))}
    </div>
  );
};

export default ReturnReason;
