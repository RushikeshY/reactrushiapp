import React, { useEffect } from 'react'
import { getPublicURL } from '../../util/UrlUtils'

function ContactUsPopUp({setShowPopup, onBackClick}) {

  useEffect(() => {
    // Use useEffect to run the code after the component is mounted
    const timeout = setTimeout(() => {
      // console.log('ContactUsPopUp');
       onBackClick() // Hide the popup after 2 seconds
    }, 2000); // Set the timeout interval to 2000 milliseconds (2 seconds)

    // Clear the timeout if the component is unmounted
    return () => {
      clearTimeout(timeout);
    };
  }, [setShowPopup]);
  return (
    <div className="w-80 md:w-[700px]  lg:w-[865px]  lg:h-[280px] p-4 mx-auto  text-center  items-center z-10">
        <p className=' font-bold text-lg md:text-[30px]'>Thank You For Contacting Us!</p>
        <p className='font-bold text-sm md:text-[18px]'>We Will Reach Out You In A Short Time</p>
        <div className="flex flex-row-reverse items-center justify-between w-full">
          {/* <div className="flex row-auto">
            <button
              className="flex flex-row items-center"
              onClick={onBackClick}
            >
              <img
                src={getPublicURL("/svg/back.svg")}
                className="h-[0.7rem] mr-1 cursor-pointer"
              />
              <span className="text-[0.8rem] md:text-[1rem]">Back</span>
            </button>
          </div> */}
          </div>



    </div>
  )
}

export default ContactUsPopUp