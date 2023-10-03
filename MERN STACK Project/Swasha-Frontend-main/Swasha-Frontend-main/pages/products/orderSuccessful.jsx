import { useSelector } from "react-redux";
import { CurrencyFormatter } from "../../util/StringUtil";
import { getPublicURL } from "../../util/UrlUtils";
import Header from "../../components/Header";
import { Router, useRouter } from "next/router";

export default function OrderSuccessful() {
  const router = useRouter();
  let order = undefined;
  if (typeof window !== "undefined") {
    order = JSON.parse(window.sessionStorage.getItem("lastOrder"));
  }
  const address = useSelector((x) => x.address[order?.shippingAddress]);
  if (!order) return;
  return (
    <div>
      <Header page="Successful" />
      <div className="flex flex-col items-center p-12">
        <img
          src={getPublicURL("/svg/big-green-tick.svg")}
          style={{ width: "10rem" }}
        />
        <span className="font-semibold text-[1.3rem] mt-5">
          Your purchase completed
        </span>
        <span className="mt-2">Thank you!</span>
        <span>Keep shopping with us.</span>
        <div
          className="rounded-md mt-8 flex md:flex-row flex-col md:items-center whitespace-nowrap md:gap-12 gap-6 md:px-16 px-8 py-4"
          style={{ backgroundColor: "rgb(0 161 255 / 9%)" }}
        >
          <div className="text-[0.9rem]">
            <div className="mb-2">
              <span className="font-semibold">Order Number:</span>{" "}
              {order.orderId}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Order Date:</span>{" "}
              {/* {new Date().toDateString()} */}
              {order.createdAt.substring(0, 10)}
            </div>
            <div>
              <span className="font-semibold">Order Total:</span>{" "}
              {CurrencyFormatter.format(order.totalPrice)}
            </div>
          </div>
          {address && (
            <div>
              <div className="text-[0.95rem] font-semibold">
                {address.addressType}
              </div>
              <div className="text-[0.8rem]">
                <div>{address.addressLine1},</div>
                <div>{address.addressLine2},</div>
                <div>Pin - {address.postalCode},</div>
                <div>{address.city},</div>
                <div>{address.state}.</div>
              </div>
            </div>
          )}
          <div className="md:ml-16 self-center flex flex-col gap-4">
            <button className="yellow-btn " onClick={()=>{router.push("/user/profile/#My%20Orders");}}>Manage Order</button>
            <button
              className="borderC-1 rounded-md py-[0.2rem] md:text-sm text-[0.6rem] font-bold text-black"
              onClick={() => router.replace("../")}
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
