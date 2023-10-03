import { getPublicURL } from "../../util/UrlUtils";
import React, { useState } from "react";
import Dashboard from "./dashboard/dashboard";
import Products from "./dashboard/products";
import Order from "./dashboard/order";
import Users from "./dashboard/users";
import ImageHolder from "../../components/ImageHolder";
import Dropdown from "../../components/Dropdown";
import {
  CancelIcon,
  DashboardIcon,
  DownArrowIcon,
  HamIcon,
  LogoForHeader1,
  LogoForHeader2,
  LogoForHeaderSmall,
  LogoutIcon,
  OrderIcon,
  ProductIcon,
  SettingIcon,
  UserIcon,
} from "../../components/svg";
import { useSelector } from "react-redux";
import AddProduct from "./productAction/addProduct";
import EditProduct from "./productAction/editProduct";
import ProductDetail from "./productAction/prodDetail";
import EditUser from "./usersAction/editUser";
import OrderDetails from "./orderAction/orderDetails";
import { useRouter } from "next/router";
import { logout, makeRequest } from "../../util/ApiClient";

const Admin = () => {
  const [showSideBar, setShowSideBar] = useState(true);
  const [showSmallSideBar, setShowSmallSideBar] = useState(false);
  const [current, setCurrent] = useState("dashboard");
  const [productId, setProductId] = useState("");
  const [user, setUser] = useState({});
  const [order, setOrder] = useState({});
  return (
    <div>
      <div className="md:h-[14vh] bg-gray-50 shadow-md border-1 md:border-0 pb-3 w-[100vw]">
        <Nav
          setShowSideBar={setShowSideBar}
          showSideBar={showSideBar}
          showSmallSideBar={showSmallSideBar}
          setShowSmallSideBar={setShowSmallSideBar}
        />
      </div>
      <div className={`${showSideBar ? "flex" : ""}`}>
        {showSideBar && (
          <div className="w-[24vw] hidden md:block bg-gray-50">
            <SideBar current={current} setCurrent={setCurrent} />
          </div>
        )}
        {showSmallSideBar ? (
          <SideBarSmall
            current={current}
            setCurrent={setCurrent}
            setShowSmallSideBar={setShowSmallSideBar}
          />
        ) : (
          ""
        )}
        <div className="h-[84vh] w-[100vw] rounded-sm px-4 py-2 overflow-y-auto">
          {current == "dashboard" ? (
            <Dashboard />
          ) : current == "products" ? (
            <Products setCurrent={setCurrent} setProductId={setProductId} />
          ) : current == "order" ? (
            <Order setCurrent={setCurrent} setOrder={setOrder} />
          ) : current == "users" ? (
            <Users setCurrent={setCurrent} setUser={setUser} />
          ) : current == "addProduct" ? (
            <AddProduct setCurrent={setCurrent} />
          ) : current == "editProduct" ? (
            <EditProduct prodId={productId} setCurrent={setCurrent}/>
          ) : current == "productDetail" ? (
            <ProductDetail prodId={productId} setCurrent={setCurrent} />
          ) : current == "editUser" ? (
            <EditUser user={user} />
          ) : current == "orderDetails" ? (
            <OrderDetails setCurrent={setCurrent} order={order} />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;

function Nav({
  setShowSideBar,
  showSideBar,
  showSmallSideBar,
  setShowSmallSideBar,
}) {
  const router = useRouter();
  const user = useSelector((s) => s.user);
  const [profileDropdownVisible, setProfileDropdownVisible] = useState(false);
  const dropdownItems = {
    "Swasha Website": () => {
      router.push("/");
    },
    "Log Out": () => {
      makeRequest(
        logout,
        {},
        {
          onSuccess: () => {
            window.localStorage.removeItem("userData");
            window.location.href = "/auth/login";
          },
        }
      );
    },
  };
  return (
    <div className="flex justify-between font-bold bg-indigo-200">
      <div className="flex p-3 md:p-5 md:ml-3 ">
        <div>
          <div
            onClick={() => setShowSideBar(!showSideBar)}
            className="hidden md:block"
          >
            <HamIcon />
          </div>
          <div
            onClick={() => setShowSmallSideBar(!showSmallSideBar)}
            className="md:hidden"
          >
            <HamIcon />
          </div>
        </div>
        <div
          className="mt-3 md:hidden"
          onClick={() => {
            router.push("/adminPanel/admin");
          }}
        >
          <LogoForHeaderSmall />
        </div>
        <div
          className="hidden md:block"
          onClick={() => {
            router.push("/adminPanel/admin");
          }}
        >
          {/* <LogoForHeader1 /> */}
          <img className="h-10 md:h-12 mx-auto md:mr-auto md:ml-6 cursor-pointer" src="/svg/Logo_NoBG.svg"></img>
        </div>
        <div
          className="mt-2.5 ml-2 hidden md:block"
          onClick={() => {
            router.push("/adminPanel/admin");
          }}
        >
          {/* <LogoForHeader2 /> */}
        </div>
      </div>
      <div
        className="relative text-xs md:text-base"
        onClick={() => {
          setProfileDropdownVisible(!profileDropdownVisible);
        }}
      >
        <div className="flex px-2 py-1 mt-4 mr-2 bg-white rounded-full cursor-pointer md:px-4 md:py-2 md:mr-6">
          <ImageHolder
            className="w-[2rem] md:w-[2.5rem] mr-4"
            style={{ borderRadius: "999px" }}
            src={getPublicURL("/png/no-dp.png")}
          />
          <div>
            <div>{user.name?.split(" ")?.[0]}</div>
            <div className="text-xs">{user.role}</div>
          </div>
          <DownArrowIcon />
        </div>
        <Dropdown
          items={Object.keys(dropdownItems)}
          visible={profileDropdownVisible}
          setVisible={setProfileDropdownVisible}
          onSelect={(i) => Object.values(dropdownItems)[i]()}
        />
      </div>
    </div>
  );
}

function SideBarSmall({ current, setCurrent, setShowSmallSideBar }) {
  return (
    <div className="bg-gray-50 md:hidden shadow-lg absolute h-[84vh] z-10">
      <div
        onClick={() => setShowSmallSideBar(false)}
        className="text-right cursor-pointer md:hidden"
      >
        <CancelIcon />
      </div>
      <div className="flex flex-col gap-4 px-8 mt-2 font-bold">
        <div
          className={`cursor-pointer flex gap-2 px-5 ${
            current == "dashboard" ? "bg-blue-100 py-3 rounded-full" : ""
          } `}
          onClick={() => {
            setCurrent("dashboard");
            setShowSmallSideBar(false);
          }}
        >
          <DashboardIcon /> <div>Dashboard</div>
        </div>
        <div
          className={`cursor-pointer flex gap-2 px-5 ${
            current == "products" ? "bg-blue-100 py-3 rounded-full" : ""
          } `}
          onClick={() => {
            setCurrent("products");
            setShowSmallSideBar(false);
          }}
        >
          <ProductIcon /> <div>Products</div>
        </div>
        <div
          className={`cursor-pointer flex gap-2 px-5 ${
            current == "order" ? "bg-blue-100 py-3 rounded-full" : ""
          } `}
          onClick={() => {
            setCurrent("order");
            setShowSmallSideBar(false);
          }}
        >
          <OrderIcon /> <div>Order</div>
        </div>
        <div
          className={`cursor-pointer flex gap-2 px-5 ${
            current == "users" ? "bg-blue-100 py-3 rounded-full" : ""
          } `}
          onClick={() => {
            setCurrent("users");
            setShowSmallSideBar(false);
          }}
        >
          <UserIcon /> <div>Users</div>
        </div>
      </div>

      <div className="absolute flex flex-col gap-4 px-10 font-bold bottom-10">
        <div className="flex gap-2 px-5 cursor-pointer">
          <SettingIcon /> <div>Settings</div>
        </div>
        <div className="flex gap-2 px-5 cursor-pointer">
          <LogoutIcon />{" "}
          <div
            onClick={() => {
              makeRequest(
                logout,
                {},
                {
                  onSuccess: () => {
                    window.localStorage.removeItem("userData");
                    window.location.href = "/auth/login";
                  },
                }
              );
            }}
          >
            Logout
          </div>
        </div>
      </div>
    </div>
  );
}

function SideBar({ current, setCurrent }) {
  const router = useRouter();
  return (
    <div
      className="hidden md:block"
      onClick={() => router.push("/adminPanel/admin")}
    >
      <div className="flex flex-col gap-4 px-3 mt-5 font-bold">
        <div
          className={`cursor-pointer flex gap-4 px-5 ${
            current == "dashboard" ? "bg-blue-100 py-3 rounded-full" : ""
          } `}
          onClick={() => {
            setCurrent("dashboard");
          }}
        >
          <DashboardIcon /> <div>Dashboard</div>
        </div>
        <div
          className={`cursor-pointer flex gap-4 px-5 ${
            current == "products" ? "bg-blue-100 py-3 rounded-full" : ""
          } `}
          onClick={() => {
            setCurrent("products");
          }}
        >
          <ProductIcon /> <div>Products</div>
        </div>
        <div
          className={`cursor-pointer flex gap-4 px-5 ${
            current == "order" ? "bg-blue-100 py-3 rounded-full" : ""
          } `}
          onClick={() => {
            setCurrent("order");
          }}
        >
          <OrderIcon /> <div>Order</div>
        </div>
        <div
          className={`cursor-pointer flex gap-4 px-5 ${
            current == "users" ? "bg-blue-100 py-3 rounded-full" : ""
          } `}
          onClick={() => {
            setCurrent("users");
          }}
        >
          <UserIcon /> <div>Users</div>
        </div>
      </div>

      <div className="absolute flex flex-col gap-4 px-3 font-bold bottom-10">
        {/* <div className="flex gap-4 px-5 cursor-pointer">
          <SettingIcon /> <div>Settings</div>
        </div> */}
        <div className="flex gap-4 px-5 cursor-pointer">
          <LogoutIcon />
          <div
            onClick={() => {
              makeRequest(
                logout,
                {},
                {
                  onSuccess: () => {
                    window.localStorage.removeItem("userData");
                    window.location.href = "/auth/login";
                  },
                }
              );
            }}
          >
            Logout
          </div>
        </div>
      </div>
    </div>
  );
}
