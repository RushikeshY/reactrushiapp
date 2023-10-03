import React, { useState, useEffect } from "react";
import Dialog from "../Dialog";
import BulkOrder from "../BulkOrder";
import ContactUsPopUp from "./ContactUsPopUp";
import { getPublicURL } from "../../util/UrlUtils";

const TryBulkOrderButton = () => {
  const [showButton, setShowButton] = useState(true);
  const [popupVisiblebulk, setPopupVisiblebulk] = useState(false);
  const [showPopupbulk, setShowPopupbulk] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const mfooter = document.querySelector(".mfooter");

      if (mfooter) {
        const windowHeight = window.innerHeight;
        const mfooterPosition = mfooter.getBoundingClientRect().top;

        if (mfooterPosition <= windowHeight) {
          setShowButton(false);
        } else {
          setShowButton(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`z-10 fixed bottom-20 md:bottom-5 right-4 transition-opacity duration-300 ${
        showButton ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <Dialog
        className=""
        padding="2rem"
        visible={popupVisiblebulk}
        setVisible={setPopupVisiblebulk}
      >
        <BulkOrder
          setShowPopupbulk={setShowPopupbulk}
          onBackClick={() => setPopupVisiblebulk(false)}
        />
      </Dialog>
      <Dialog visible={showPopupbulk} setVisible={setShowPopupbulk}>
        <ContactUsPopUp onBackClick={() => setShowPopupbulk(false)} />
      </Dialog>
      <button
        onClick={(e) => {
          setPopupVisiblebulk(true);
        }}
        className="bg-blue-900 text-white  p-2 flex gap-2 text-sm  rounded-full shadow-md backdrop-blur-md "
      >
        Try Bulk Order
        <img
          src={getPublicURL("/png/bulkorderwhite.png")} // Replace with your actual icon path
          alt="Bulk Order"
          className="w-5 h-5"
        />
      </button>
    </div>
  );
};

export default TryBulkOrderButton;
