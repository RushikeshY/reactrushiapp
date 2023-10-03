import React, { useState } from "react";

const ProductForm = () => {
  const [formData, setFormData] = useState({
    productName: "",
    description: "",
    price: "",
    images: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFormData((prevData) => ({
      ...prevData,
      images: selectedFiles,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Here you can handle form submission, including image uploads
    // formData.images contains the selected image files
    console.log(formData);
    
    // Reset form fields and images after submission
    setFormData({
      productName: "",
      description: "",
      price: "",
      images: [],
    });
    
    // Reset the file input
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) {
      fileInput.value = ""; // Clear the selected files
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Product Name</label>
        <input
          type="text"
          name="productName"
          value={formData.productName}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Description</label>
        <input
          name="description"
          value={formData.description}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Price</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Upload Images</label>
        <input
          type="file"
          name="images"
          multiple
          accept="image/*"
          onChange={handleImageUpload}
        />
      </div>
      <button type="submit">Submit</button>

      {/* Render uploaded images */}
      {formData.images.map((image, index) => (
        <img
          key={index}
          src={URL.createObjectURL(image)}
          alt={`Image ${index}`}
          width="100"
          height="100"
        />
      ))}
    </form>
  );
};

export default ProductForm;
