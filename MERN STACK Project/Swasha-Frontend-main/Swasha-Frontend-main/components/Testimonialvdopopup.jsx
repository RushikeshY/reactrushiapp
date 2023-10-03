// import React from 'react';
// import Slider from 'react-slick';

// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';

// const Testimonialvdopopup = ({ videoUrls }) => {
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//   };

//   return (
//     <div className="w-full h-full">
//       <Slider {...settings}>
//         {videoUrls.map((videoUrl, index) => (
//           <div key={index} className="flex items-center justify-center h-full">
//             <iframe
//               title={`YouTube Video ${index + 1}`}
//               width="640"
//               height="360"
//               src={videoUrl}
//               frameBorder="0"
//               allowFullScreen
//               className="w-full h-full"
//             ></iframe>
//           </div>
//         ))}
//       </Slider>
//     </div>
//   );
// };

// export default Testimonialvdopopup;

import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const  Testimonialvdopopup = () => {
  const videoUrls = [
     'https://www.youtube.com/embed/E1xKUCXCox8?si=GhfphWqgSh3saFVB',
    ' https://www.youtube.com/embed/qO3SixpcrBs?si=eWPzXYFGiZQ_bBLs',
      'https://www.youtube.com/embed/LIYJjbxW4kg?si=hRcq-jIoIRnDICbg',
      'https://www.youtube.com/embed/Q7fHfMBjAo8?si=ZSJOtCCxlSjGsHKG',
    // Add more YouTube video URLs here
  ];
   // Define different width and height values based on screen size
   const smallScreenWidth = '';
   const smallScreenHeight = '180px';
 
   const mediumScreenWidth = '460';
   const mediumScreenHeight = '315px';
 
   const largeScreenWidth = '565';
   const largeScreenHeight = '315';
 
   // Determine the screen size based on window width
   let screenWidth = window.innerWidth;
   let screenHeight;
 
   if (screenWidth < 768) {
     screenWidth = smallScreenWidth;
     screenHeight = smallScreenHeight;
   } else if (screenWidth < 1024) {
     screenWidth = mediumScreenWidth;
     screenHeight = mediumScreenHeight;
   } else {
     screenWidth = largeScreenWidth;
     screenHeight = largeScreenHeight;
   }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000, // Autoplay interval in milliseconds
  };

  return (
    <div className="">
      <h2>Testimonials</h2>
        <div>
            
        {videoUrls.map((videoUrl, index) => (
          <div key={index} className="">
            <iframe width={screenWidth}  height={screenHeight} src={videoUrl} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
          </div>
        ))}
        </div>
    </div>
  );
};

export default  Testimonialvdopopup;

