import React from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/NavBar";

const RetRefCan = () => {
  return (
    <div className="min-h-screen bg-gray-500  w-11/12 mx-auto ">
      <div className="bg-white  rounded-lg shadow-lg">
        <header className="bg-white w-11/12 px-7 mr-1  pt-3 fixed top-[5rem]  md:top-[5rem]  rounded-lg shadow-mdTop shadow-mdLeft shadow-mdRight ">
          <h1 className=" text-xl m-auto font-extrabold pt-4 pb-2  pl-2 ">
            Return, Refund, and Cancellation Policy{" "}
          </h1>
        </header>
        <div className="flex justify-center items-center min-h-screen">
          <div className=" w-9/10 p-10 pt-14 bg-white ">
            <p>
              <strong>Cancellation:</strong>
            </p>
            <p>
              The cancellation policy is the scheme provided on Swasha’s
              website, which is available at{" "}
              <a href="http://www.swasha.org">www.swasha.org</a> .This
              cancellation policy (“<strong>Policy</strong>”) outlines the
              mechanism by which a customer can cancel an order placed on the
              Platform.
            </p>
            <p>
              As a customer, you have the right to cancel your order within 24
              hours of placing it or before it's dispatched, whichever occurs
              earlier. In the event of cancellation, we will promptly refund any
              payments you've made for the order. Please note that we do not
              permit partial cancellations.
            </p>
            <p>
              For bulk orders, if cancellation is made before 24 hours, no
              charges will apply but if cancellation is made after 24 hours, a
              15% charge on the product will be applied. An upfront payment of
              50% is required for bulk orders when placing the order. The
              remaining payment is split into two parts: 25% should be paid
              before shipping, and the remaining 25% should be paid upon
              delivery.
            </p>
            <p>
              However, if we suspect any fraudulent transactions or violations
              of our website's terms and conditions, we reserve the right to
              cancel such orders at our sole discretion. A record of fraudulent
              transactions and customers will be maintained, and access to such
              customers may be denied, along with the cancellation of any orders
              they place.
            </p>
            <p>
              <strong>Return Criteria:</strong>
            </p>
            <p>
              While we understand your preferences, returns are not accepted
              based solely on personal preferences like the product's design or
              color, which are inherent characteristics. However, we do allow
              returns within 5 days from the date of delivery for other valid
              reasons.
            </p>
            <p>
              <strong>How to return?</strong>
            </p>
            If a customer wants to return a product:
            <ol>
              <li>Visit our website and log in to your account.</li>
              <li>Navigate to the "My Orders" section.</li>
              <li>
                Locate the specific order containing the product you wish to
                return.
              </li>
              <li>
                Click on the "Request Return" option associated with that order.
              </li>
              <li>Provide details about the reason for your return.</li>
              <li>Submit your return request.</li>
            </ol>
            <p>After you've submitted your return request:</p>
            <ul>
              <li>
                One of our customer service representatives will promptly review
                your request.
              </li>
              <li>
                They will reach out to you via the contact information provided
                in your account to gather further details about the issue.
              </li>
              <li>
                Once the details are confirmed and the reason for return aligns
                with the situation, our team will initiate the pick-up process.
              </li>
            </ul>
            <p>While returning your product follow these steps:</p>
            <ul>
              <li>Pack the item securely with the tag intact.</li>
            </ul>
            <ul>
              <li>Include proof of purchase.</li>
            </ul>
            <p>
              We strive to ensure that your return experience is seamless and
              hassle-free. If you have any additional questions or concerns,
              please feel free to reach out to our customer support team for
              assistance.
            </p>
            <p>
              <strong>Refund Process:</strong>
            </p>
            <ul>
              <li>
                <strong>Prepaid Orders:</strong> Refunds for prepaid orders will
                be initiated within 15 days to the original payment mode after
                we receive the returned product from our delivery partner.
              </li>
              <li>
                <strong>Cash on Delivery (CoD):</strong> For customers who
                selected Cash on Delivery, our efficient customer service team
                will assist you. We will reach out using the contact details
                provided in your account to gather essential refund information,
                such as UPI or bank account details. Please provide these
                details via email, and once received, we will initiate the
                refund process within 15 days.
              </li>
            </ul>
            <p>
              <strong>Impact on Offers and Discounts:</strong>
            </p>
            <p>
              If a product is cancelled or returned in line with our policy, any
              applied offers, promotions, or discounts will be forfeited, unless
              stated otherwise. It's important to adhere to our guidelines to
              ensure a seamless return and refund process.
            </p>
            <p>
              At Swasha, we strive to ensure your satisfaction and provide
              transparency throughout the return, refund, and cancellation
              process. Should you have any queries or require assistance, our
              dedicated customer service team is here to help. Your experience
              matters to us, and we're committed to providing a smooth and
              satisfactory shopping journey.
            </p>
            <p>&nbsp;</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RetRefCan;
