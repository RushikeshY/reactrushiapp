import React, { useState } from "react";
const Shipping = () => {
  const shipItems = [
    {
      question: "Order Processing Time",
      answer:
        "Upon successfully placing your order, please allow us up to 24 hours for order processing and preparation before it is shipped. Our team will work diligently to ensure your order is carefully packed and ready for delivery.",
    },
    {
      question: "Delivery Partners",
      answer:
        "SWASHA has partnered with Shift as our logistics provider for product delivery and pickup. Shift collaborates with various trusted delivery partners, including DTDC, Xpressbees, and others, to ensure efficient and reliable delivery services.",
    },
    {
      question: "Delivery fees",
      answer:
        "We charge a flat Rs. 50 delivery fee across India. For orders below Rs. 500, there's an additional cash-on-delivery charge of Rs. 22 or 1.2% of the total order value, whichever is lower. Orders above Rs. 500 enjoy free shipping.",
    },
    {
      question: "Delivery Timeframe",
      answer:
        "The estimated delivery timeframe for your order may vary depending on your location and the delivery partner selected. We strive to provide accurate delivery estimates, but please note that unforeseen circumstances like natural calamities or regional factors may affect delivery times. You will receive a tracking number once your order has been dispatched to monitor its progress.",
    },
    {
      question: "Loss or Damage",
      answer:
        "In the unfortunate event of product loss or damage during transit, SWASHA's terms and conditions will align with Shift's policies, which are intricately tied to the specific vendor (e.g., DTDC, Xpressbees). We will work closely with our delivery partners to resolve any issues and ensure a satisfactory resolution for you.",
    },
    {
      question:
        "Tracking Orders",
      answer:
        " To track the status of your order, please use the provided tracking number on the respective delivery partner's website or portal. If you have any concerns or require assistance with tracking your order, our customer support team is here to help.",
    },
    {
      question:
        "Contact Us",
      answer:
        "If you have any questions, concerns, or require further information regarding our shipping policy, please do not hesitate to contact our customer support team. We are dedicated to providing you with the best possible service and ensuring your satisfaction.",
    }
    
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
          Shipping Policy
        </h1>
        <div>
<p> At SWASHA, we are committed to providing you with a seamless and efficient shopping experience, including reliable product delivery. Our shipping policy outlines important information regarding the shipping and delivery of your orders, including our partnership with Shift as our logistics provider and their associated delivery partners.</p>
        </div>
        <div className="">
          <div className="space-y-4">
            {shipItems.map((item, index) => (
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
          <div className="pt-4">Thank you for choosing SWASHA, and we look forward to serving you with excellence in every aspect of your shopping experience.
          <p></p></div>
        </div>
      </div>
    </div>
  );
};
export default Shipping;
