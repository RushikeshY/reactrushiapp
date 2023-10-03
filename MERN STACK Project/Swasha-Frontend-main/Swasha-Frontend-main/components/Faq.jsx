import React, { useState } from "react";
const FAQPage = () => {
  const faqItems = [
    {
      question: "Do you customize bags as per our needs?",
      answer:
        "Yes, we do offer customization services for bags as per your specific needs and requirements. We are happy to work with you to create a custom bag that meets your unique specifications, including the materials used, size, shape, colour, and other features. To place an order or discuss your customization needs further, please visit our website at www.swasha.org and contact us through the provided contact details. We look forward to working with you to create the perfect bag for your needs! ",
    },
    {
      question: "Is there any Minimum Requirement for placing a bulk order?",
      answer:
        "Yes, there is a minimum order requirement of 20 products. This means that to place a bulk order with us, you must order at least 20 of the specific product you are interested in. If you have any questions or concerns about the minimum order requirement or would like to discuss your order further, please do not hesitate to contact us.",
    },
    {
      question: "How can I track my order?",
      answer:
        "To track your order, simply go to the 'My Orders' section in your account dashboard and select the order you want to track. You should see the current status of your order, as well as any relevant updates and tracking information provided by our shipping partners.",
    },
    {
      question: "How long will it take for my order to arrive?",
      answer:
        "The delivery time for an order is influenced by various factors such as the shipping method chosen, location, the delivery partner assigned, and unforeseen events such as weather disruptions or transportation delays. To stay informed about the status of your order, you can usually track your order from the 'My Orders' section. If you have any questions or concerns about the delivery of your order, please do not hesitate to contact us.",
    },
    {
      question: "How do I cancel my order?",
      answer:
        "If you wish to cancel your order, you can do so by logging in to your account and going to the 'My Orders' section. If your order is eligible for cancellation (usually within 24 hours of placing the order), you should see an option to cancel it. Please note that if the order has already been shipped or delivered, it may not be possible to cancel it.",
    },
    {
      question:
        "What should I do if I receive a damaged, defective or wrong product?",
      answer:
        " If you receive a damaged, defective or wrong product, it is acceptable to return it. To initiate the return process, you must capture a photo of the received product and share it during the return request on the website. If the photo proves that the product is indeed damaged, defective, or wrong, the return will be accepted and a courier pickup will be initiated.Once courier pickup is initiated, you should pack the item securely with the tag intact and include proof of purchase. It's important to note that there is a time limit of 5 days for returns.Once the vendor receives the returned product, a refund will be initiated within 15 business days to the original mode of payment. However, please be aware that the return pickup charges will be deducted from the refund amount.",
    },
    {
      question:
        "When can I expect to receive the refund for my returned product, and how will it be processed?",
      answer:
        "After we receive a returned product through our delivery partner, a full refund will be processed within approximately 15 days. The refund amount will be issued to the original mode of payment used during the purchase. If you chose Cash on Delivery, our customer service team will promptly assist you. We'll contact you through the information provided in your account to gather necessary refund details, such as UPI or bank account information. Kindly provide these details via email, and once received, we will initiate the refund process within 15 days.",
    },
    {
      question: "What are the available payment methods on Swasha?",
      answer:
        "We offer several convenient and secure payment options for our customers. These include: Debit or credit card payments: You can use your Visa, MasterCard, or other major credit cards to make online payments directly on our website. Net banking: You can also use your online banking account to transfer funds and pay for your order securely and quickly.UPI payments: We support several popular UPI payment apps, such as Google Pay, PhonePe, Paytm, and BHIM UPI, which allow you to make instant payments from your bank account using your mobile device. Cash on Delivery: You can pay in cash once you receive your order.",
    },
    {
      question: "How do you calculate the shipping charges for the products?",
      answer:
        "We've partnered with 'Shift' as our logistics provider for product delivery and pickup. 'Shift' collaborates with various delivery partners, including DTDC, Xpressbees, and others. When you place an order, 'Shift' assesses the delivery location and assigns it to a delivery partner, considering the partner's lowest bid charges. We charge a flat Rs. 50 delivery fees across India. For orders below Rs. 500, there's an additional cash-on-delivery charge of Rs. 22 or 1.2% of the total order value, whichever is lower. Orders above Rs. 500 enjoy free shipping.If an unfortunate event of product loss occurs, our terms and conditions will align with Shift's policies, which are intricately tied to the specific vendor (DTDC, Xpressbees, and the like).",
    },
    {
      question: "Is my personal and payment information secure?",
      answer:
        "Yes, your personal and payment information is secure. We take the security and privacy of your payment information seriously and all transactions are encrypted and processed through trusted payment gateways that adhere to strict industry standards. If you have any concerns or issues with your payment, please feel free to contact our customer support team for assistance.",
    },
    {
      question: "Do you offer any discounts or promotions?",
      answer:
        "Yes, we do offer discounts and promotions from time to time, especially during festival sales and other sales events to make our products more affordable and accessible.To stay informed about our current discounts and promotions, we recommend checking our website or social media pages regularly as well as subscribing to our email updates.",
    },
    {
      question: "Do you ship internationally?",
      answer:
        "Yes, we do offer international shipping services. We understand that our customers come from all over the world and we are committed to making our products available to them no matter where they live.To place an international order, simply visit our website or contact us to discuss your order and shipping options. However, please note that international shipping may come with additional costs, such as customs fees or taxes, which are the responsibility of the customer.",
    },
    // ... (same faqItems data as before)
  ];
  const [expandedIndex, setExpandedIndex] = useState(null);
  return (
    <div className="bg-gray-100 ">
      <style>
        {`
          .scrollbar {
            max-height: 400px;
            overflow-y: auto;
            scrollbar-width: thin;
            scrollbar-color: transparent transparent;
          }
          .scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .scrollbar::-webkit-scrollbar-thumb {
            background-color: transparent;
          }
        `}
      </style>
      <div className="max-w-3xl mx-auto px-4 pb-4">
        {" "}
        {/* Adjusted padding here */}
        <h1 className="text-2xl font-bold text-center ">
          Frequently Asked Questions
        </h1>
        <div className="scrollbar">
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div key={index} className="bg-white p-4 rounded shadow">
                <button
                  className="w-full flex justify-between items-center font-bold text-left hover:text-blue-600"
                  onClick={() =>
                    setExpandedIndex(index === expandedIndex ? null : index)
                  }
                >
                  <span>{item.question}</span>
                  <svg
                    className={`w-4 h-4 ml-2 transform transition-transform ${
                      index === expandedIndex ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </button>
                {expandedIndex === index && (
                  <p className="mt-2 text-black">{item.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default FAQPage;
