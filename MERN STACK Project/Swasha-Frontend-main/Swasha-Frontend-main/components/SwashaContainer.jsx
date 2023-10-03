import { getPublicURL } from "../util/UrlUtils";
import { useRouter } from "next/router";
export default function ({ children }) {
  const router = useRouter();
  return (
    <>
    <div className="hidden md:flex h-screen  md:flex-row">
    <div className="md:flex md:max-w-[30rem] bg-indigo-100 relative">
      <div className="left-blue-bg">
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <img
            className="w-28  md:w-60 rounded-full bg-indigo-100  cursor-pointer"
            src = {getPublicURL("/svg/monologo_notext.svg")}
            onClick={(e) => {
              router.push("/");
            }}
          />
        </div>
    </div>
    <div className="my-auto mx-auto items-center flex-col">
        {children}
      </div>
      </div>
{/* mobile view */}
<div className="flex md:hidden flex-col">
    <div className="w-full rounded-b-[30px]  bg-indigo-100 relative">
      <div className="left-blue-bg  h-72 ">
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <img
            className="w-72 bg-indigo-100  cursor-pointer"
            src = {getPublicURL("/svg/swasha-big-logo.svg")}
            onClick={(e) => {
              router.push("/");
            }}
          />
        </div>
    </div>
    <div className="mt-14 mx-auto items-center flex-col">
        {children}
      </div>
      </div>

      {/* <div className="flex md:hidden flex-col">
    <div className="  h-72 w-full rounded-lg">
      <div className="left-blue-bg h-full border rounded-b-[30px] bg-indigo-100 relative ">
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
      <img
          className="w-[194px] bg-indigo-100   cursor-pointer"
          src = {getPublicURL("/svg/swasha-big-logo.svg")}
          onClick={(e) => {
            router.push("/");
          }}
        />
        </div>
    </div>
    <div className="mt-14 mx-auto items-center flex-col">
        {children}
      </div>
      </div> */}
      </>
  );
}