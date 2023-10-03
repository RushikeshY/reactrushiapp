import { getPublicURL } from "../../util/UrlUtils";
import { Helmet } from "react-helmet";
import React, { useState, useEffect } from "react";
import {
  FacebookShareButton,
  WhatsappShareButton,
  EmailShareButton,
  LinkedinShareButton,
} from "react-share";
import {
  FacebookIcon,
  WhatsappIcon,
  EmailIcon,
  LinkedinIcon,
} from "react-share";

export default function ShareButton({ productId, className, ...other }) {
  const [share, setShare] = useState("invisible");
  const Url = "https://swasha.org/products/view/?id="+productId;

  useEffect(() => {
    if (share === "visible") {
      const timer = setTimeout(() => {
        setShare("invisible");
      }, 2000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [share]);
  return (
    <div>
      <img
        src={getPublicURL("/svg/share.svg")}
        className={`p-1 rounded-full bg-white ${className}`}
        onClick={(e) => {
          setShare("visible");
        }}
      />
      <div
        className={`rounded-full z-1 top-[2.5rem] right-[3rem] pt-1 px-1 w-fit bg-white  md:block absolute bg-opacity-50 backdrop-blur-3xl ${share}`}
      > 
        <span className="pr-1">
        <FacebookShareButton url={Url}>
          <FacebookIcon size={28} round/>
        </FacebookShareButton>
        </span>
        <span className="pr-1">
        <WhatsappShareButton url={Url}>
          <WhatsappIcon size={28} round/>
        </WhatsappShareButton>
        </span>
        <span className="pr-1">
        <EmailShareButton url={Url}>
          <EmailIcon size={28} round/>
        </EmailShareButton>
        </span>
        <span className="">
        <LinkedinShareButton url={Url}>
          <LinkedinIcon size={28} round/>
        </LinkedinShareButton>
        </span>
        <div onClick={(e) => {
            setShare("visible");
          }}></div>
      </div>
    </div>
  );
}
