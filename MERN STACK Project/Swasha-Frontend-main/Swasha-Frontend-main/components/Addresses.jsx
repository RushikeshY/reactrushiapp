import { getPublicURL } from "../util/UrlUtils";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Dialog from "./Dialog";
import {
  addAddress,
  deleteAddress,
  makeRequest,
  updateAddress,
} from "../util/ApiClient";
import { MobileNumberValidator } from "../util/StringValidator";
import ImageLabelInput, { SuggestionInput } from "./ImageLabelInput";
import { BackButton, RadioButton } from "./svg";

import StateCity from "../util/StateCity.json";
// constructor(){
//   super();
//   this.state = {isHovered: false};
// }
// toggleHover(){
//   this.setState(prevState => ({isHovered: !prevState.isHovered}))
// }

export default function Addresses({
  className,
  onSelect = () => {},
  setEditing,
  setEditingPopup,
  grid = false,
  preSelect,
  radio,
  setRadio,
  setDefaultaddress
}) {
  const addressObj = useSelector((x) => x.address);
  let addresses = Object.values(addressObj || {});
  let defaultAddress = addresses?.[0]?._id;
  if (addresses) {
    defaultAddress =
      Object.values(addresses).find((x) => x.isDefault)?._id || defaultAddress;
  }
  const [selected, setSelected] = useState(preSelect || defaultAddress);
  useEffect(() => {
    onSelect(selected);
  }, [selected]);
  useEffect(() => {
    if (preSelect) return;
    addresses = Object.values(addressObj || {});
    let defaultAddress = addresses?.[0]?._id;
    if (addresses) {
      defaultAddress =
        Object.values(addresses).find((x) => x.isDefault)?._id ||
        defaultAddress;
    }
    setSelected(defaultAddress);
  }, [addressObj]);
  if (!addresses) return <></>;
  return (
    <div>
      <div
        className=""
      >
        {Object.values(addresses).map((x, i) => (
          <AddressCard
            key={x._id}
            isSelected={selected === x._id}
            select ={() => setSelected(x._id)}
            editAction={() => {setEditing(x._id);setEditingPopup(true)}}
            radio={radio}
            setRadio={setRadio}
            data={x}
            setDefault={()=> setDefaultaddress(true)}
          />
        ))}
      </div>
    </div>
  );
}
// Chinmay jain Lakshmi Srinivasa Pg For Gents, Doctor's Layout, Whitefield, Bengaluru, KARNATAKA, 560066, India, Phone number: 9630767679
function AddressCard({ isSelected, select, editAction,radio,setRadio, data,setDefault }) {
  const iconStyle = "md:h-[1.2rem] h-[1rem] cursor-pointer";
  const [Hover,setHover] = useState({Hover:true});
  const [DeletePopup,setDeletePopup] = useState(false);
  const [link,setlink] = useState({link:"/png/trash.png"});
  function handleHover(){
    (Hover.Hover)?setHover({Hover:false}):setHover({Hover:true});
    changeLink();
  }
  function changeLink(){
    (Hover.Hover)?setlink({link:"/png/open-trash.png"}):setlink({link:"/png/trash.png"});
  }
  let V = "";
  if(radio==="visible") V = "invisible"
  else V = "visible"
  return (
    <div className="py-2 px-2 flex flex-row items-start border-t-1 hover:bg-gray-400" onClick={(e) => {
      if(radio==="visible") select();
    }} >
      <div>
      {radio === "visible" && <RadioButton  
        checked={isSelected}
        
        diameter="1.25rem"
      />}
      </div>
      {/* <div className="pl-4 ">
      {data.addressType === ADDRESS_HOME ? (
            <img
              data-tooltip-id="t-tooltip"
              data-tooltip-content="Home address (7 AM - 9 PM delivery)"
              src={getPublicURL("/png/home.png")}
              className={`${iconStyle} ml-auto h-8 w-8 bg-gray-900 p-1 rounded-full`}
            />
          ) : (
            <img
              data-tooltip-id="t-tooltip"
              data-tooltip-content="Office address (10 AM - 6 PM delivery)"
              src={getPublicURL("/png/office.png")}
              className={`${iconStyle} ml-auto h-8 w-8 bg-gray-900 p-1 rounded-full`}
            />
          )}
          </div> */}
      <div className="text-sm pl-4 cursor-pointer grow  overflow-hidden ...">
        <div className="flex mb-2  justify-between items-center gap-3">
          <span className="font-semibold">{data.fullName} {isSelected &&<span className="group"> <span className="ml-6 border-1 px-1 font-normal text-[0.8rem]" onClick={setDefault}>Default</span>
          <div className="hidden group-hover:block absolute bg-black text-white  rounded whitespace-nowrap mt-2 transform -translate-x-2/3 left-1/2">
        Change Default Address
      </div>
       </span>}</span>
          {/* {data.addressType === ADDRESS_HOME ? (
            <img
              data-tooltip-id="t-tooltip"
              data-tooltip-content="Home address (7 AM - 9 PM delivery)"
              src={getPublicURL("/png/home.png")}
              className={`${iconStyle} ml-auto`}
            />
          ) : (
            <img
              data-tooltip-id="t-tooltip"
              data-tooltip-content="Office address (10 AM - 6 PM delivery)"
              src={getPublicURL("/png/office.png")}
              className={`${iconStyle} ml-auto`}
            />
          )} */}
          <div className={V}>
          <div className="px-4 space-x-4" >
          <img
            src={getPublicURL("/png/edit.png")}
            className={iconStyle}
            onClick={editAction}
          />
          <img
            src={getPublicURL(link.link)}
            onMouseEnter={handleHover}
            onMouseLeave={handleHover}
            className={iconStyle}
            onClick={(e) => {
              setDeletePopup(true);
            }}
          />
          <Dialog
            padding="-2rem"
            visible={DeletePopup}
            setVisible={setDeletePopup}
          >
          <div className="bg-white md:w-fit w-80   rounded-2xl">
            <div className="font-semibold mt-6 md:mx-10 px-10">Are you sure,do you want to delete this address?</div>
            <div className="flex gap-10 justify-center mt-5 mb-10">
            <button className="py-1 px-6 borderC-1 text-red-100 hover:bg-red-100 rounded-full" onClick={(e) => {
              makeRequest(
                deleteAddress,
                { address: data._id },
                {
                  loading: true,
                  onSuccess: (res) => {
                    //toast.success("Address deleted");
                  },
                }
              ); 
              setDeletePopup(false);
            }}><span className="text-black">Yes</span></button>
            <button className="py-1 px-6 borderC-1 text-green-100 hover:bg-green-100 rounded-full"
            onClick={()=>{setDeletePopup(false)}}><span className="text-black">No</span></button>
            </div>
            </div>  
          </Dialog>
          </div>
          </div>
        </div>
        <div className="my-[0.3rem] truncate">
          <span className=""
            // onClick={(e) => {
            //   select();
            // }}
          >
            {`${data.addressLine1}, ${data.addressLine2}, ${data.city}, ${data.state}, ${data.country}, Phone number: ${data.phoneNumber}`}
          </span>
        </div>
      </div>
    </div>
  );
}




const ADDRESS_HOME = "Home";
const ADDRESS_OFFICE = "Office";

export function AddressEditor({ editing,editingPopup, setEditing,setEditingPopup }) {
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
    <div className="md:w-[45rem] md:h-auto w-11/12 m-auto">
      <div
      className="md:px-16  flex flex-col  md:grid md:grid-col-2 md:gap-6 "
        // style={{
        //   display: "grid",
        //   gridTemplateColumns: "auto auto",
        //   columnGap: "1.5rem",
        // }}
      >
        <ImageLabelInput
          value={fullname}
          setValue={setFullName}
          style={inputStyle}
          label="Full Name"
        />
        <ImageLabelInput
          type="tel"
          value={mobileNumber}
          setValue={setMobileNumber}
          stringValidator={mobileValidator}
          error={mobileError}
          setError={setMobileError}
          style={inputStyle}
          label="Mobile Number"
        />
        <ImageLabelInput
          value={pincode}
          setValue={setPincode}
          style={inputStyle}
          label="Pincode"
        />
        <ImageLabelInput
          value={landmark}
          setValue={setLandmark}
          style={inputStyle}
          label="Landmark"
        />
        <ImageLabelInput
          value={line1}
          setValue={setLine1}
          style={{ ...inputFullStyle, marginTop: "0.5rem" }}
          label="Address"
        />
        <ImageLabelInput
          value={state}
          setValue={setState}
          style={inputStyle}
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
          <ImageLabelInput style={inputStyle} label="Town/City/Dristrict">
          <SuggestionInput
            placeholder="Select State"
            autoComplete="nope"
            value={city}
            setValue={setCity}
            items={cities}
            onFocus={(e) => {
              setCities(StateCity[state] || []);
            }}
          />
        </ImageLabelInput>
        <ImageLabelInput
          value={line2}
          setValue={setLine2}
          style={inputFullStyle}
          label="Area, Street, Sector, Village"
        />
        {/* <ImageLabelInput
          readOnly={true}
          value={country}
          setValue={setCountry}
          style={inputStyle}
          label="Country"
        /> */}
        
        {/* <div style={{ gridColumn: "1/-1", height: "1rem" }}></div> */}
        <div className="font-bold text-sm ml-2 mt-3">Address Type</div>
        <div className="py-2 flex flex-row px-2  md:gap-4 gap-10 md:col-span-2 w-[25rem]">
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
        {addressType === ADDRESS_HOME && <div className="text-[0.7rem] ml-2 text-red-500">Delivery between 8 AM to 9 PM only</div>}
        {addressType === ADDRESS_OFFICE && <div className="text-[0.7rem] ml-2 text-red-500">Delivery between 9 AM to 6 PM only</div>}
      </div>
      <div className="mt-3 flex gap-16 pb-10">
      <div className="flex mx-auto">
      <button className="white-button mr-10 border-1 px-6 mt-3 text-sm" onClick={(e) => {setEditing(undefined);setEditingPopup(false);}}>Back</button>
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
                  setEditingPopup(false);
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
                  setEditingPopup(false);
                },
                loading: true,
              }
            );
          }
        }}
      >
        {/* {address ? "Update" : "Add"} */}
         Save
      </button>
      </div>
      </div>
    </div>
  );
}

export function AddressManager({
  onSelect = () => {},
  grid = false,
  children,
  titleStyle,
  title = "Select delivery address",
  preSelect,
}) {
  const [editing, setEditing] = useState(undefined);
  const [editingPopup,setEditingPopup] = useState(false);
  const [radio, setRadio] = useState("invisible");
  const [defaultaddress, setDefaultaddress] = useState(false);
  return (
    <div className="">
        <>
        <div className='overflow-y-auto h-[600px] py-auto overflow-scroll md:h-screen no-scrollbar'>
          <div className="flex justify-between bg-white  px-8 py-2 font-bold text-[1.2rem] border-1 md:mx-4 rounded-t-md sticky top-0" >
            <div className="">{title}</div>
            <div className="">
            <button
              className=""
              onClick={(e) => {
                setEditing("");
                setEditingPopup(true);
              }}
            >
              {/* <img className="w-4" src={getPublicURL("/svg/plus.svg")} /> */}
              <span>Add</span>
            </button>
            {children}
          </div>
          </div>
          <div className="border-1 rounded-b-lg md:mx-4">
          <Addresses
            setEditing={setEditing}
            setEditingPopup = {setEditingPopup}
            className=""
            onSelect={onSelect}
            grid={grid}
            preSelect={preSelect}
            radio ={"invisible"}
            setRadio={setRadio}
            setDefaultaddress={setDefaultaddress}
          />
          </div>
          </div>
          
          {/* default delivery address */}
          <div className="absolute z-50 top-[0rem] left-[0rem] bg-black bg-opacity-50 ">
          <Dialog
            padding=""
            visible={defaultaddress}
            setVisible={setDefaultaddress}
          >
          <div className='bg-white md:max-w-[40rem] w-full rounded-2xl'>
          <div className=" justify-between bg-white py-2 md:mx-10 mx-3 rounded-t-md sticky top-0" >
            <div className="md:text-[1.5rem] text-[1.2rem] font-bold">Change Your Default Address</div>
            <div className="text-[0.75rem]">Choose Your Default Address</div>
          </div>
          <div className="border-1 rounded-2xl md:mx-10 overflow-y-auto h-80 no-scrollbar md:w-auto w-80 mx-3">
          <Addresses
            setEditing={setEditing}
            setEditingPopup ={setEditingPopup}
            className=""
            onSelect={onSelect}
            grid={grid}
            preSelect={preSelect}
            radio ={"visible"}
            setRadio={setRadio}
            setDefaultaddress={setDefaultaddress}
          /> 
          </div>
          <div className="mt-3 flex gap-16 pb-5">
            <div className="flex mx-auto">
            <button className="white-button mr-10 border-1 px-6 mt-3 text-sm" onClick={(e) => {setDefaultaddress(false)}}>Back</button>
            <button className="blue-button-1 px-6 mt-3 text-sm" onClick={(e) => {setDefaultaddress(false)}}>
              Deliver Here
            </button>
            </div>
          </div>
          </div>
          </Dialog>
          </div>
          {/* end of change default delivery address */}
        </>
        <div className="absolute z-50 top-[0rem] left-[0rem] bg-black bg-opacity-50 ">
        <Dialog
            padding="-2rem"
            visible={editingPopup}
            setVisible={setEditingPopup}
          >
        <div className=" sticky top-0 bg-white rounded-t-2xl z-20">
          <div className="text-[1.1rem] font-semibold mb-4 pt-4 flex flex-row items-center">
            <div className="ml-6">{editing === "" ? "Add New" : "Edit Current"} Delivery Address</div>
          </div>
          <div className="h-[0.1rem] bg-gray-900"></div>
          </div>
          <div className="pt-6 no-scrollbar">
            <AddressEditor editing={editing} editingPopup={editingPopup} setEditing={setEditing} setEditingPopup={setEditingPopup}/>
          </div>
        </Dialog>
      </div>
    </div>
  );
}

