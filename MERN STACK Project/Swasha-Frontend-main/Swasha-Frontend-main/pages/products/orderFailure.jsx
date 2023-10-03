import { useSelector } from "react-redux";
import { CurrencyFormatter } from "../../util/StringUtil";
import { getPublicURL } from "../../util/UrlUtils";
import Header from "../../components/Header"
import { Router, useRouter } from 'next/router'

export default function orderFailure() {
  const router = useRouter();
  let order = undefined;
  if (typeof window !== "undefined") {
    order = JSON.parse(window.sessionStorage.getItem("lastOrder"));
  }
  const address = useSelector((x) => x.address[order?.shippingAddress]);
  if (!order) return;
  return (
    <div>
    <Header page="Fail"/>
    <div className="flex flex-col items-center p-12">
      <img
        src={getPublicURL("/svg/big-red-wrong.svg")}
        style={{ width: "10rem"}}
      />
      <span className="text-[1rem] mt-5">
        Opps something went wrong
      </span>
      <span className="my-2 mb-4 text-red-100 font-bold">Your Purchase Failled</span>
      <span className="mt-10">Your Payment Wasn't Completed</span>
      <div className="mt-4 self-center flex flex-col gap-4 rounded-full">
          <button className="yellow-btn "onClick={() => router.push("/user/cart/")} >Please try again</button>
          <button className="borderC-1 rounded-md py-[0.4rem] text-sm font-bold text-black" 
          onClick={() => router.replace("../")}>Return to Home</button>
        </div>
    </div>
    </div>
  );
}
