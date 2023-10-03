import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RadioButton } from "./svg";
import { useRouter } from "next/router";
import { getPublicURL } from "../util/UrlUtils";
import { MobileNumberValidator } from "../util/StringValidator";
import Dialog from "./Dialog";
import {
  addAddress,
  deleteAddress,
  makeRequest,
  updateAddress,
} from "../util/ApiClient";
import ImageLabelInput, { SuggestionInput } from "./ImageLabelInput";
import StateCity from "../util/StateCity.json";

export function DeliveryAddress() {
  const router = useRouter();
  const [editing, setEditing] = useState(undefined);
  const addressObj = useSelector((x) => x.address);

  // useEffect(() => {
  // localStorage.setItem("address",JSON.stringify(addressObj));
  // },[]);
  let addresses = Object.values(addressObj || {});
  let defaultAddress = addresses?.[0]?._id;
  if (addresses) {
    defaultAddress =
      Object.values(addresses).find((x) => x.isDefault)?._id || defaultAddress;
  }
  const [selected, setSelected] = useState(defaultAddress);
  // useEffect(() => {
  //   onSelect(selected);
  // }, [selected]);
  useEffect(() => {
    // if (preSelect) return;
    addresses = Object.values(addressObj);
    let defaultAddress = addresses?.[0]?._id;
    if (addresses) {
      defaultAddress =
        Object.values(addresses).find((x) => x.isDefault)?._id ||
        defaultAddress;
    }
    setSelected(defaultAddress);
  }, [addressObj]);

  return (
    <div>
      <div className="overflow-y-auto max-h-screen no-scrollbar">
        <div className="flex justify-between bg-gray-400 sticky top-0  font-bold text-sm md:text-lg py-4 px-6">
          <div className="">Select The Delivery Address</div>
          <div
            className="cursor-pointer"
            onClick={(e) => {
              setEditing("");
            }}
          >
            Add
          </div>
        </div>
        {/* {localStorage.setItem("SelectedAddress", JSON.stringify(addressObj[selected]))} */}
        {Object.values(addresses).map((x, i) => (
          <AddressCard
            key={x._id}
            isSelected={selected === x._id}
            select={() => {
              setSelected(x._id);
              localStorage.setItem("SelectedAddress", JSON.stringify(x));
            }}
            editAction={() => setEditing(x._id)}
            data={x}
          />
        ))}
        {/* <div className="flex bg-white" style={{ position: 'sticky', bottom: 0 }}>
            <button style={{ fontSize: "1rem", padding: "0.5rem 2rem" }} className="bg-yellow-btn rounded-md text-white font-bold mx-auto px-4 my-4" onClick={()=> router.push("../products/orderReview")} >
                Deliver Here
            </button>
        </div> */}
      </div>
      {editing !== undefined && (
        <Dialog
          visible={true}
          setVisible={() => setEditing(undefined)}
          padding=""
        >
          <div className=" sticky top-0 bg-white rounded-t-2xl z-20">
            <div className="text-[1.1rem] font-semibold py-4  flex flex-row items-center">
              <div className="ml-6">
                {editing === "" ? "Add New" : "Edit Current"} Delivery Address
              </div>
            </div>
            <div className="h-[0.1rem] bg-gray-900 mb-4"></div>
          </div>
          <AddressEditor editing={editing} setEditing={setEditing} />
        </Dialog>
      )}
    </div>
  );
}

function AddressCard({ isSelected, select, data, editAction }) {
  isSelected? localStorage.setItem("SelectedAddress", JSON.stringify(data)):"";
  const iconStyle = "h-[1.2rem] cursor-pointer";
  return (
    <div
      className="p-2 flex flex-row items-start border-t-1 hover:bg-gray-700"
      onClick={(e) => {
        select();
      }}
    >
      <div></div>
      <div className="md:text-sm text-xs pl-4 cursor-pointer grow  overflow-hidden ...">
        <div className="flex mb-2   justify-between items-center gap-3">
          <RadioButton checked={isSelected} diameter="1.25rem" />
          <span className="font-semibold grow">
            {data.fullName} {isSelected && <span className="group"></span>}
          </span>
          <div className="px-4">
            <img
              src={getPublicURL("/png/edit.png")}
              className={iconStyle}
              onClick={editAction}
            />
          </div>
        </div>
        <div className="my-[0.3rem] ml-8 truncate">
          <span className="">
            {`${data.addressLine1}, ${data.addressLine2}, ${data.city}, ${data.state}, ${data.country}, Phone number: ${data.phoneNumber}`}
          </span>
        </div>
      </div>
    </div>
  );
}

const ADDRESS_HOME = "Home";
const ADDRESS_OFFICE = "Office";

export function AddressEditor({ editing, setEditing }) {
  const address = useSelector((x) => x.address[editing]);
  const [fullname, setFullName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [pincode, setPincode] = useState("");
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [landmark, setLandmark] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("India");

  const [cities, setCities] = useState([]);
  const [addressType, setAddressType] = useState(ADDRESS_HOME);

  useEffect(() => {
    if (!address) return;
    setFullName(address.fullName);
    setMobileNumber(address.phoneNumber);
    setPincode(address.postalCode);
    setLine1(address.addressLine1);
    setLine2(address.addressLine2);
    setLandmark(address.landmark);
    setCity(address.city);
    setState(address.state);
    setCountry(address.country);
    setAddressType(address.addressType);
  }, [address]);

  const mobileValidator = MobileNumberValidator;
  const inputStyle = { padding: "0.2rem 0" };
  const inputFullStyle = { ...inputStyle, gridColumn: "1/3" };

  function bundle() {
    return {
      fullName: fullname,
      phoneNumber: mobileNumber,
      addressLine1: line1,
      addressLine2: line2,
      landmark: landmark,
      city: city,
      state: state,
      postalCode: pincode,
      country: country,
      addressType,
    };
  }

  return (
    <div className="md:w-[45rem] w-[23rem] md:px-0 px-4 h-auto">
      <div
        className=" md:px-16"
        style={{
          display: "grid",
          gridTemplateColumns: "auto auto",
          columnGap: "1.5rem",
        }}
      >
        <div className="md:col-span-1 col-span-2">
          <ImageLabelInput
            value={fullname}
            setValue={setFullName}
            style={inputFullStyle}
            label="Full Name"
          />
        </div>
        <div className="md:col-span-1 col-span-2">
          <ImageLabelInput
            type="tel"
            value={mobileNumber}
            setValue={setMobileNumber}
            stringValidator={mobileValidator}
            error={mobileError}
            setError={setMobileError}
            style={inputFullStyle}
            label="Mobile Number"
          />
        </div>
        <div className="md:col-span-1 col-span-2">
          <ImageLabelInput
            value={pincode}
            setValue={setPincode}
            style={inputFullStyle}
            label="Pincode"
          />
        </div>
        <div className="md:col-span-1 col-span-2">
          <ImageLabelInput
            value={landmark}
            setValue={setLandmark}
            style={inputFullStyle}
            label="Landmark"
          />
        </div>
        <div className="col-span-2">
          <ImageLabelInput
            value={line1}
            setValue={setLine1}
            style={inputFullStyle}
            label="Address"
          />
        </div>
        <div className="md:col-span-1 col-span-2">
          <ImageLabelInput
            value={state}
            setValue={setState}
            style={inputFullStyle}
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
        </div>
        <div className="md:col-span-1 col-span-2">
          <ImageLabelInput style={inputFullStyle} label="Town/City/District">
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
        </div>
        <div className="col-span-2">
          <ImageLabelInput
            value={line2}
            setValue={setLine2}
            style={inputFullStyle}
            label="Area, Street, Sector, Village"
          />
        </div>
        {/* <div className="md:col-span-2">
            <div style={{ gridColumn: "1/-1", height: "1rem" }}></div>
          </div> */}
      </div>
      <div className="md:px-16">
        <div className="font-bold text-sm ml-2 mt-3">Address Type</div>
        <div className="py-2 flex flex-row px-2  gap-4">
          <div className="flex flex-row items-center gap-2 text-sm bg-[#f1f4f7] py-1 px-4 rounded-full">
            <RadioButton
              checked={addressType === ADDRESS_HOME}
              diameter="1.2rem"
              onClick={(e) => setAddressType(ADDRESS_HOME)}
            />
            Home
          </div>
          <div className="flex flex-row items-center gap-2 bg-[#f1f4f7] py-1 px-4 rounded-full">
            <RadioButton
              checked={addressType === ADDRESS_OFFICE}
              diameter="1.2rem"
              onClick={(e) => setAddressType(ADDRESS_OFFICE)}
            />
            Office
          </div>
        </div>
        {addressType === ADDRESS_HOME && (
          <div className="text-[0.7rem] ml-2 text-red-500">
            Delivery between 8 AM to 9 PM only
          </div>
        )}
        {addressType === ADDRESS_OFFICE && (
          <div className="text-[0.7rem] ml-2 text-red-500">
            Delivery between 9 AM to 6 PM only
          </div>
        )}
      </div>

      <div className="mt-3 flex gap-16 pb-10">
        <div className="flex mx-auto">
          <button
            className="white-button mr-10 border-1 px-6 mt-3 text-sm"
            onClick={(e) => setEditing(undefined)}
          >
            Back
          </button>
          <button
            className="blue-button-1 px-6 mt-3 text-sm"
            onClick={(e) => {
              if (address) {
                makeRequest(
                  updateAddress,
                  {
                    address: { ...address, ...bundle() },
                  },
                  {
                    onSuccess: () => {
                      // toast.success("Address updated successfully");
                      setEditing(undefined);
                    },
                    loading: true,
                  }
                );
              } else {
                makeRequest(
                  addAddress,
                  {
                    address: bundle(),
                  },
                  {
                    onSuccess: () => {
                      // toast.success("Address added successfully");
                      setEditing(undefined);
                    },
                    loading: true,
                  }
                );
              }
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
