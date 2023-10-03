import React, { useState } from 'react';
import { getPublicURL } from '../util/UrlUtils';
import Dialog from "./Dialog";
import Contactus from "./Contactus";
import ContactUsPopUp from "./buttons/ContactUsPopUp";
import BulkOrder from "./BulkOrder";
import Faq from "./Faq";
import Link from "next/link";
import Testimonialvdopopup from "./Testimonialvdopopup";
import Shipping from "./Shipping";
import AboutUs from "./AboutUs";

const FooterMobile = ({footer}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupVisiblebulk, setPopupVisiblebulk] = useState(false);
  const [showPopupbulk, setShowPopupbulk] = useState(false);
  const [popupVisiblefaq, setPopupVisiblefaq] = useState(false);
  const [popupVisibleshipping, setPopupVisibleshipping] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupVisibletestimonialvdopopup, setPopupVisibletestimonialvdopopup] =
  useState(false);
  const [popupVisibleaboutus, setPopupVisibleaboutus] = useState(false);
  const toggleFooter = () => {
    setIsExpanded(!isExpanded);
  };
  const [activeTab, setActiveTab] = useState('About'); // Initialize the active tab to 'About'

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);}
 

  return (
    <div className="mfooter">
      <footer className="bg-[#172337] p-2 pt-5 pb-5 z-50 ">
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

          <Dialog
            className="h-3"
            padding="2rem"
            visible={popupVisibleaboutus}
            setVisible={setPopupVisibleaboutus}
          >
            <AboutUs onBackClick={() => setPopupVisibleaboutus(false)} />
          </Dialog>


<Dialog
          padding="2rem"
          visible={popupVisible}
          setVisible={setPopupVisible}
        >
          {/* <Contactus onBackClick={() => setPopupVisible(false)} /> */}

          <Contactus
            padding="-2rem"
            setShowPopup={setShowPopup}
            onBackClick={() => setPopupVisible(false)}
          />
        </Dialog>
         <Dialog visible={showPopup} setVisible={setShowPopup}>
          <ContactUsPopUp onBackClick={() => setShowPopup(false)} />
        </Dialog>
        <Dialog
            className="h-3"
            padding="2rem"
            visible={popupVisiblefaq}
            setVisible={setPopupVisiblefaq}
          >
            <Faq onBackClick={() => setPopupVisiblefaq(false)} />
          </Dialog>

          <Dialog
            className="h-3"
            padding="2rem"
            visible={popupVisibleshipping}
            setVisible={setPopupVisibleshipping}
          >
            <Shipping onBackClick={() => setPopupVisibleshipping(false)} />
          </Dialog>


          <Dialog
            className="h-3"
            padding="2rem"
            visible={popupVisibletestimonialvdopopup}
            setVisible={setPopupVisibletestimonialvdopopup}
          >
            <Testimonialvdopopup
              onBackClick={() => setPopupVisibletestimonialvdopopup(false)}
            />
          </Dialog>

        <div className='flex justify-between pb-6 text-white'>
            <div className='cursor-pointer'> About Swasha</div>
            <div className="show-more cursor-pointer " onClick={toggleFooter}>
            {isExpanded ? 'Show Less' : 'Show More'}
        {/* Show more <FaAngleDown /> */}
      </div>
        </div>
      <div className={`footer-content ${isExpanded ? 'expanded' : ''}`}>
      
       
        {/* Conditional content */}
        {isExpanded && (
          <div>
           <div className='flex border-2 text-[#79877D] border-[#79877D] w-full rounded-md mb-4 text-center  '>
            
            <div
          className={`hover:bg-white w-1/4 cursor-pointer border-0 border-r border-white border-solid ${
            activeTab === 'About' ? 'bg-white' : ''
          }`}
          onClick={() => handleTabClick('About')}
        >
          About
        </div>
        <div
          className={`hover:bg-white cursor-pointer w-1/4 border-0 border-r border-white border-solid ${
            activeTab === 'Help' ? 'bg-white' : ''
          }`}
          onClick={() => handleTabClick('Help')}
        >
          Help
        </div>
        <div
          className={`hover:bg-white cursor-pointer w-1/4 border-0 border-r border-white border-solid ${
            activeTab === 'Policies' ? 'bg-white' : ''
          }`}
          onClick={() => handleTabClick('Policies')}
        >
          Policy's
        </div>
        <div
          className={`hover:bg-white cursor-pointer w-1/4 ${
            activeTab === 'ReachUs' ? 'bg-white' : ''
          }`}
          onClick={() => handleTabClick('ReachUs')}
        >
          Reach Us
        </div>
           </div>
           <div className='flex flex-col gap-2'>
        {activeTab === 'About' && (
           <div className='flex flex-col gap-2 '>
           <div
               className="pr-2 border-0  border-white border-solid cursor-pointer md:border-0 text-white"
               onClick={(e) => {
                 setPopupVisible(true);
               }}
             >
               Contact Us
             </div>
             <div className="text-white   cursor-pointer md:border-0" onClick={(e) => {
                 
                 setPopupVisibleaboutus(true);
               }
             }>
                About Us
              </div>
           <div
                className=" text-white  cursor-pointer md:border-0"
                onClick={(e) => {
                 
                    setPopupVisibletestimonialvdopopup(true);
                  }
                }
              >
                Testimonials
              </div>
          </div>
        )}
       
        {activeTab === 'Help' && (
          <div className="flex flex-col gap-2">
             
          <div className="pr-2 border-0  border-white border-solid cursor-pointer md:border-0">
          <Link href="../products/ReturnRefundCancellation" target="_blank">
          Return, Cancellation & Refund
            </Link>
          
          </div>

          <div className="pr-2 border-0  border-white border-solid cursor-pointer md:border-0 text-white"
           onClick={(e) => {
            setPopupVisibleshipping(true);
          }}>
              
              Shipping
               
              
              </div>
          
          <div
            className="pr-2 border-0  border-white border-solid cursor-pointer md:border-0 text-white"
            onClick={(e) => {
              setPopupVisiblefaq(true);
            }}
          >
            FAQ
          </div>
        </div>
        )}
        {activeTab === 'Policies' && (
            <div className="flex flex-col gap-2">
          <div className='text-white cursor-pointer '> 
          <div className="pr-2 border-0 border-r border-white border-solid cursor-pointer md:border-0 text-white">
          <Link href="../products/TermsConditions" target="_blank">
            Terms And Conditions
          </Link>
        </div>

       
        <div className="cursor-pointer">
          <Link href="../products/PrivacyPolicy" target="_blank">
            Privacy Policy
          </Link>
        </div></div>
        </div>
        )}
        {activeTab === 'ReachUs' && (
          <div className='text-white cursor-pointer '><div className="text-left flex text-[#79877D]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 mr-2"
          >
            <path
              fillRule="evenodd"
              d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
              clipRule="evenodd"
            />
          </svg>
          <div className="text-base">Registered Office Address</div>
        </div> <div className='pt-2 text-white' >
            H.No: 1-98/9/3, Flat No. 302, Plot No.3, Jaihind Enclave, Madhapur, Hyderabad, Telangana - 500081.
            </div></div>
        )}
      </div>

          
           <div className=' p-2 flex justify-center'>


           <button  onClick={(e) => {
                setPopupVisiblebulk(true);
              }}
           className="border-1 border-solid border-[#707070] cursor-pointer text-xs text-[#FFFFFF] w-32 text-center rounded-full py-1 px-2 md:mt-10 mt-4 hover:bg-[#79877D] hover:text-black hover:font-semibold focus:ring-2 focus:outline-none focus:ring-gray-300">
            Try Bulk Order
          </button>
            
           </div>

           <div className="flex text-[#79877D] gap-8 cursor-pointer md:mt-9 mt-4 justify-center">
             {/*------------------ facebook svg icon ------------------- */}
             <Link href="https://www.facebook.com/profile.php?id=100091939407370" target="_blank">
             <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" width="28" height="28" viewBox="0 2 25 25" id="facebook"><path d="M20.9,2H3.1A1.1,1.1,0,0,0,2,3.1V20.9A1.1,1.1,0,0,0,3.1,22h9.58V14.25h-2.6v-3h2.6V9a3.64,3.64,0,0,1,3.88-4,20.26,20.26,0,0,1,2.33.12v2.7H17.3c-1.26,0-1.5.6-1.5,1.47v1.93h3l-.39,3H15.8V22h5.1A1.1,1.1,0,0,0,22,20.9V3.1A1.1,1.1,0,0,0,20.9,2Z" fill="#79877D"></path></svg>
                </Link>
             
                  
                 

              {/*------------------ facebook svg icon ------------------- */}

              {/* ----------insta svg icon-------------- */}
              <Link href="https://www.instagram.com/swasha_handicrafts/" target="_blank">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 33 33"
              >
                <g
                  id="Group_1979"
                  data-name="Group 1979"
                  transform="translate(7444.121 11929)"
                >
                  <g id="Group_1978" data-name="Group 1978">
                    <path
                      id="Path_1514"
                      data-name="Path 1514"
                      d="M10.5,3h15A7.5,7.5,0,0,1,33,10.5v15A7.5,7.5,0,0,1,25.5,33h-15A7.5,7.5,0,0,1,3,25.5v-15A7.5,7.5,0,0,1,10.5,3Z"
                      transform="translate(-7445.621 -11930.5)"
                      fill="none"
                      stroke="#9c9c9c"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                    />
                    <path
                      id="Path_1515"
                      data-name="Path 1515"
                      d="M24,17.055A6,6,0,1,1,18.945,12,6,6,0,0,1,24,17.055Z"
                      transform="translate(-7445.621 -11930.5)"
                      fill="none"
                      stroke="#9c9c9c"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                    />
                    <path
                      id="Path_1516"
                      data-name="Path 1516"
                      d="M26.25,9.75h0"
                      transform="translate(-7445.621 -11930.5)"
                      fill="none"
                      stroke="#9c9c9c"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                    />
                  </g>
                </g>
              </svg>
              </Link>
              {/* ----------insta svg icon-------------- */}
             
              {/*----------------- linked in svg icon ------------------*/}
              <Link href="https://www.linkedin.com/in/swasha-handicrafts-148b68274/" target="_blank">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="23"
                height="25"
                fill="#79877D"
                class="bi bi-linkedin"
                viewBox="0 0 16 16"
              >
                <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
              </svg>
              </Link>
              
              {/*----------------- linked in svg icon ------------------*/}
              {/*--------------- twitter icon svg---------------- */}
              <Link href="https://twitter.com/SWASHACRAFTS/status/1655445622424743937" target="_blank">
              <svg xmlns="http://www.w3.org/2000/svg"  width="23"
                height="25" fill="#79877D" class="bi bi-twitter" viewBox="0 0 16 16">
  <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
</svg>
</Link>
  {/*--------------- twitter icon svg---------------- */}
            </div>
           <hr/>
           <div className='pl-2'>
           
            
            <div className='flex  justify-between text-white'>
            <div>@2023 swasha.org</div>
            <div>version 1.0</div>
            </div>
           </div>
           
           
          </div>
        )}
      </div>
     
    </footer>
    </div>
  );
};

export default FooterMobile;
