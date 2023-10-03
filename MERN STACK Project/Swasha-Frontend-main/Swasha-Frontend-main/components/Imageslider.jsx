import React, { useState } from 'react';

function ImageSlider({ imgs }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextSlide = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imgs.length);
  };

  const prevSlide = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? imgs.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="relative">
      <div className="w-full overflow-hidden">
        <img
          src={imgs[currentImageIndex]}
          alt={`Slide ${currentImageIndex}`}
          className="w-full"
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex justify-center mb-4">
        {imgs.map((_, index) => (
          <span
            key={index}
            className={`w-3 h-3 rounded-full mx-1 cursor-pointer ${
              index === currentImageIndex ? 'bg-blue-500' : 'bg-gray-300'
            }`}
            onClick={() => goToSlide(index)}
          ></span>
        ))}
      </div>
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 px-2 py-1 bg-gray-800 text-white rounded-full text-2xl"
        onClick={prevSlide}
      >
        &#10094;
      </button>
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 px-2 py-1 bg-gray-800 text-white rounded-full text-2xl"
        onClick={nextSlide}
      >
        &#10095;
      </button>
    </div>
  );
}

export default ImageSlider;
