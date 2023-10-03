import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { makeRequest, checkPincode } from "../util/ApiClient";
export default function CheckPincode({ className, setEstimatedDelDate }) {
  const addressObj = useSelector((x) => x.address);
  const addresses = Object.values(addressObj || {});
  const [addressDiv, setaddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(
    addresses ? Object.values(addresses)[0] : []
  );
  const [pincode, setPincode] = useState();
  // Get the current date
  const currentDate = new Date();

  // Calculate the estimated delivery date range
  const minDeliveryDate = new Date(currentDate);
  minDeliveryDate.setDate(currentDate.getDate() + 5);

  const maxDeliveryDate = new Date(currentDate);
  maxDeliveryDate.setDate(currentDate.getDate() + 8);

  // Format the dates as "Day, DD Mon" format
  const formatDate = (date) => {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const dayOfWeek = daysOfWeek[date.getDay()];
    const dayOfMonth = date.getDate();
    const month = months[date.getMonth()];

    return `${dayOfWeek}, ${dayOfMonth} ${month}`;
  };

  // Format the estimated delivery date range
  const formattedMinDeliveryDate = formatDate(minDeliveryDate);
  const formattedMaxDeliveryDate = formatDate(maxDeliveryDate);

  // Create the final estimated delivery date string
  const estimatedDeliveryDateRange = `${formattedMinDeliveryDate} - ${formattedMaxDeliveryDate}`;

  useEffect(() => {
    setPincode(selectedAddress?.postalCode);
  }, [selectedAddress]);
  useEffect(() => {
    // console.log(pincode);
  }, [pincode]);
  const Address = Object.values(addresses).map((address, i) => {
    return (
      <div
        onClick={() => {
          setaddress(!addressDiv);
          setSelectedAddress(address);
          // makeRequest(
          //   checkPincode,
          //   {
          //     Pincode: address.postalCode,
          //   },
          //   {
          //     onSuccess: (res) => {
          //       setEstimatedDelDate(res.estimatedTime);
          //     },
          //   }
          // );
          setEstimatedDelDate(estimatedDeliveryDateRange);
        }}
        className="text-xs px-4 py-1 truncate"
      >
        <span className="font-semibold"> {address.fullName},</span>
        {address.addressLine1},{address.city},{address.state},
        {address.postalCode}
      </div>
    );
  });
  return (
    <div className={`items-stretch h-[1.75rem] ${className}`}>
      <div
        onClick={() => setaddress(!addressDiv)}
        className="inline-flex justify-center gap-x-1.5 rounded-md md:w-80 w-40 bg-white px-3 py-1.5 text-xs  shadow-sm ring-1 ring-inset ring-gray-900 hover:bg-gray-50 "
      >
        {selectedAddress && (
          <div className="text-xs truncate">
            <span className="font-semibold"> {selectedAddress?.fullName},</span>
            {selectedAddress?.addressLine1},{selectedAddress?.city},
            {selectedAddress?.state},{selectedAddress?.postalCode}
          </div>
        )}

        <svg
          className="-mr-1 h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
      {AddressList(
        Address,
        addressDiv,
        setaddress,
        setPincode,
        setEstimatedDelDate,
        estimatedDeliveryDateRange
      )}
    </div>
  );
}
function AddressList(
  Address,
  addressDiv,
  setaddress,
  setPincode,
  setEstimatedDelDate,
  estimatedDeliveryDateRange
) {
  const [inputPincode, setInputPincode] = useState("");
  const handlePincodeChange = (event) => {
    setInputPincode(event.target.value);
  };
  if (addressDiv) {
    return (
      <div className="bg-white" onMouseLeave={() => setaddress(!addressDiv)}>
        <div className="overflow-y-auto no-scrollbar max-h-40 ">
          <div className="rounded-lg w-80 ">
            <div className="text-xs px-4 py-2 font-semibold">
              Select one delivery address
            </div>
            <div className="cursor-pointer">{Address}</div>
          </div>
        </div>
        <div className="w-80 pt-4 sticky">
          <div className="flex">
            <input
              placeholder="Enter Your Pincode"
              className="placeholder  font-semibold grow"
              style={{ paddingLeft: "0.5rem", fontSize: "0.85rem" }}
              value={inputPincode}
              onChange={handlePincodeChange}
            />
            <button
              className="px-2 text-sm font-semibold text-green-200 border-b-indigo-500"
              onClick={(e) => {
                setPincode(inputPincode);
                setaddress(!addressDiv);
                // makeRequest(
                //   checkPincode,
                //   {
                //     Pincode: inputPincode,
                //   },
                //   {
                //     onSuccess: (res) => {
                //       setEstimatedDelDate(res.estimatedTime);
                //     },
                //   }
                // )
                setEstimatedDelDate(estimatedDeliveryDateRange);
              }}
            >
              Check Now
            </button>
          </div>
          <div className="h-0.5 bg-slate-400 mx-2"> </div>
        </div>
      </div>
    );
  }
}
