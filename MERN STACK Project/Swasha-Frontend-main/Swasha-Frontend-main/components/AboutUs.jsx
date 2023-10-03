import React, { useState } from "react";
const AboutUs = () => {
  
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
          About Us
        </h1>
        <div>
        <>
  <p>
    <strong>About Us:</strong>
  </p>
 
  <p>
    <span style={{ fontWeight: 400 }}>Welcome to </span>
    <strong>SWASHA</strong>
    <span style={{ fontWeight: 400 }}>
      , an initiative of Nirmaan Organization!&nbsp;&nbsp;
    </span>
  </p>
  
  <p>
    <span style={{ fontWeight: 400 }}>
      Nirmaan is a nonprofit organization with a rich history of empowering
      underprivileged women and marginalized communities like Persons with
      Disabilities (PwDs) and the LGBTQ+ gain the skills and resources they need
      to become self-sufficient and financially independent.
    </span>
  </p>
  
  <p>
    <span style={{ fontWeight: 400 }}>
      Since 2010, Nirmaan Organization has trained over 10,000 women in various
      vocational skills. Its first vocational training center was launched in
      Anjaiah Nagar in 2012, which subsequently led to the formation of “
    </span>
    <strong>Swayam shakti</strong>
    <span style={{ fontWeight: 400 }}>
      ” and creation of our nonprofit E-commerce platform, SWASHA.&nbsp;
    </span>
  </p>
 
  <p>
    <strong>Goal:&nbsp;</strong>
  </p>
  <p>
    <span style={{ fontWeight: 400 }}>
      Our goal is to provide underprivileged women and other marginalized
      communities like Persons with Disabilities and LGBTQ+ with the necessary
      resources, skills and opportunities to become successful entrepreneurs.
    </span>
  </p>
  
  <p>
    <span style={{ fontWeight: 400 }}>
      At Nirmaan, we divide our work into three main areas:&nbsp;
    </span>
  </p>
  <ul>
    <li style={{ fontWeight: 400 }}>
      <span style={{ fontWeight: 400 }}>Skill development</span>
    </li>
    <li style={{ fontWeight: 400 }}>
      <span style={{ fontWeight: 400 }}>Entrepreneurship</span>
    </li>
    <li style={{ fontWeight: 400 }}>
      <span style={{ fontWeight: 400 }}>Employment</span>
    </li>
  </ul>
 
  <p>
    <span style={{ fontWeight: 400 }}>
      Our skill development programs offer training and support to women,
      Persons with Disabilities and LGBTQ+ communities to run small-scale
      businesses. Additionally, we provide entrepreneurship programs that
      provide a global platform for underprivileged women entrepreneurs,
      government organizations and non-governmental organizations to design,
      manufacture, and market their products and secure a decent livelihood.
    </span>
  </p>
  
  <p>
    <span style={{ fontWeight: 400 }}>
      Inorder to overcome the primary barriers to success such as lack of access
      to finance, digital and business skills, sales, marketing and
      market-linkages, we offer various solutions such as manufacturing locally
      and selling globally, product listing and payment support, advertising and
      market linkage support to financially vulnerable individuals and
      non-profit organizations. Additionally, we offer access to multinational
      companies through sharing a catalog for corporate orders.
    </span>
  </p>
  
  <p>
    <strong>Our Initiatives:</strong>
  </p>
  
  <p>
    <strong>Threads of Hope</strong>
    <span style={{ fontWeight: 400 }}>
      {" "}
      is one of our initiatives that serves as a social enterprise to provide a
      platform for underprivileged women to create, promote, and market various
      handmade products.&nbsp;&nbsp;
    </span>
  </p>
  
  <p>
    <strong>Our products fulfill the criteria of:</strong>
  </p>
  <ul>
    <li style={{ fontWeight: 400 }}>
      <span style={{ fontWeight: 400 }}>Quality</span>
    </li>
    <li style={{ fontWeight: 400 }}>
      <span style={{ fontWeight: 400 }}>Affordability</span>
    </li>
    <li style={{ fontWeight: 400 }}>
      <span style={{ fontWeight: 400 }}>Eco-friendliness</span>
    </li>
    <li style={{ fontWeight: 400 }}>
      <span style={{ fontWeight: 400 }}>Swadeshi</span>
    </li>
  </ul>

  <p>
    <strong>Our Activities:</strong>
  </p>
  
  <ul>
    <li style={{ fontWeight: 400 }}>
      <span style={{ fontWeight: 400 }}>
        We set up stalls at various corporate offices to display the
        products.&nbsp;
      </span>
    </li>
    <li style={{ fontWeight: 400 }}>
      <span style={{ fontWeight: 400 }}>
        We are also exploring opportunities to collaborate with other
        like-minded organizations to support more women, Persons with
        Disabilities and LGBTQ+ communities through marketing and distribution
        of their products.
      </span>
    </li>
  </ul>
  
  <p>
    <span style={{ fontWeight: 400 }}>
      We invite you to extend our mission and make a difference in the lives of
      underprivileged women and other marginalized communities.&nbsp;
    </span>
  </p>
  
  <p>
    <span style={{ fontWeight: 400 }}>
      Together, we can create a more equitable and just society where everyone
      can lead a life of dignity.
    </span>
  </p>
  <p>&nbsp;</p>
</>

        </div>
      </div>
    </div>
  );
};
export default AboutUs;
