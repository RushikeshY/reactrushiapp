import { useEffect, useState } from "react";
import {
  addNewProduct,
  editProduct,
  getSingleProduct,
  makeRequest,
} from "../../../util/ApiClient";
import { toast } from "react-toastify";
import { EditIcon, PlusIcon } from "../../../components/svg";

const Form = ({prodId, setCurrent, setProductId}) => {
  const [productDetail, setProductDetail] = useState({});
  const [uploadImg, setUploadImg] = useState([]);
  const [disableDiv, setDisableDiv] = useState(false);
  const [data, setData] = useState({
    keyword: "",
    productTitle: "",
    productDecription: "",
    colours: "",
    generalDetails: "",
    mrp: "",
    sellingPrice: "",
    productImagesUrl: [],
    category: "",
    subCategory: "",
    stock: "",
  });
  const handleChange = (e, prop) => {
    // if (prop === "productImagesUrl") {
    //   const newUploadImg = [...uploadImg, e.target.value];
    //   setData({ ...data, [prop]: newUploadImg });
    //   setUploadImg(newUploadImg);
    // } else {
    //   setData({ ...data, [prop]: e.target.value });
    // } 
    setData({ ...data, [prop]: e.target.value });   
  };

  const submitData = (event) => {
    event.preventDefault();
    console.log(data);
    if (prodId) {
      makeRequest(
        editProduct,
        {
          product: { ...productDetail, ...data },
        },
        {
          onSuccess: () => {
            toast.success("Product updated successfully");
          },
          onError: (e) => {
            console.log(e);
          },
        }
      );
    } else {
      makeRequest(
        addNewProduct,
        {
          product: data,
        },
        {
          onSuccess: () => {
            toast.success("Product added successfully");
          },
          onError: (e) => {
            console.log(e);
          },
        }
      );
    }
  };

  useEffect(() => {
    console.log(prodId);
    if (prodId) {
      makeRequest(
        getSingleProduct,
        { productID: prodId },
        {
          onSuccess: (res) => {
            setProductDetail(res);
            setData({
              keyword: res.keyword,
              productTitle: res.productTitle,
              productDecription: res.productDecription,
              colours: res.colours,
              generalDetails: res.generalDetails,
              mrp: res.mrp,
              sellingPrice: res.sellingPrice,
              productImagesUrl: res.productImagesUrl,
              category: res.category,
              subCategory: res.subCategory,
              stock: res.stock,
            });
            res.stock === 0
              ? setDisableDiv(true)
              : setDisableDiv(false);
          },
          onError: (e) => {
            console.log(e);
          },
        }
      );
    }
  }, [prodId]);
  

  return (
    <form className="px-6 py-4 m-4 rounded-2xl  shadow-xl">
      <div className="text-lg font-semibold">
        {!prodId ? "Add Product" : "Edit Product"}
      </div>
      <hr className="mb-6" />
      <div className="grid gap-8 mb-6 md:grid-cols-2">
        {/* <div>
          <div className="relative p-4 border-1 h-[13rem] text-center rounded-lg">
            <label
              for="file-upload"
              className="block mb-2 text-left text-sm font-semibold"
            >
              Product Image URL
              <EditIcon className="w-9 h-9 right-2 top-2" />
            </label>
            {!data?.productImagesUrl ? (
              <div className="text-center mt-20 text-sm">
                Please Choose Image
              </div>
            ) : (
              <img
                src={data?.productImagesUrl ? data.productImagesUrl[0]:""}
                alt=""
                width="80%"
                height="90%"
                className="rounded-md"
              />
            )}
            <input
              id="file-upload"
              onChange={(e) => {
                handleChange(e, "productImagesUrl");
              }}
              type="file"
              accept="image/*"
              name="productImages"
              className="border-1 hidden text-sm rounded-xl focus:ring-black focus:border-black w-full bg-gray-500 p-3"
              placeholder="Enter Product Image URL"
            />
          </div>
          <div className="flex justify-around mt-2">
            <div className="relative border-1 h-12 w-12 rounded-lg">
              <label for="file-upload" className="block text-sm font-semibold">
                <EditIcon className="w-4 h-4 p-1 right-0 top-0" />
              </label>

              <img
                src={data?.productImagesUrl ? data.productImagesUrl[1] : ""}
                alt=""
                width="100%"
                height="100%"
                className="rounded-md"
              />
              <input
                id="file-upload"
                onChange={(e) => {
                  handleChange(e, "productImagesUrl");
                }}
                type="file"
                accept="image/*"
                name="productImages"
                className="border-1 hidden text-sm rounded-xl focus:ring-black focus:border-black w-full bg-gray-500 p-3"
                placeholder="Enter Product Image URL"
              />
            </div>
            <div className="relative border-1 h-12 w-12 rounded-lg">
              <label for="file-upload" className="block text-sm font-semibold">
                <EditIcon className="w-4 h-4 p-1 right-0 top-0" />
              </label>
              <img
                src={data?.productImagesUrl ? data.productImagesUrl[2] : ""}
                alt=""
                width="100%"
                height="100%"
                className="rounded-md"
              />
              <input
                id="file-upload"
                onChange={(e) => {
                  handleChange(e, "productImagesUrl");
                }}
                type="file"
                accept="image/*"
                name="productImages"
                className="border-1 hidden text-sm rounded-xl focus:ring-black focus:border-black w-full bg-gray-500 p-3"
                placeholder="Enter Product Image URL"
              />
            </div>
            <div className="relative border-1 h-12 w-12 rounded-lg">
              <label for="file-upload" className="block text-sm font-semibold">
                <EditIcon className="w-4 h-4 p-1 right-0 top-0" />
              </label>
              <img
                src={data?.productImagesUrl ? data.productImagesUrl[3] : ""}
                alt=""
                width="100%"
                height="100%"
                className="rounded-md"
              />
              <input
                id="file-upload"
                onChange={(e) => {
                  handleChange(e, "productImagesUrl");
                }}
                type="file"
                accept="image/*"
                name="productImages"
                className="border-1 hidden text-sm rounded-xl focus:ring-black focus:border-black w-full bg-gray-500 p-3"
                placeholder="Enter Product Image URL"
              />
            </div>
            <div className="relative border-1 h-12 w-12 rounded-lg">
              <label for="file-upload" className="block text-sm font-semibold">
                <EditIcon className="w-4 h-4 p-1 right-0 top-0" />
              </label>
              <img
                src={data?.productImagesUrl ? data.productImagesUrl[4] : ""}
                alt=""
                width="100%"
                height="100%"
                className="rounded-md"
              />
              <input
                id="file-upload"
                onChange={(e) => {
                  handleChange(e, "productImagesUrl");
                }}
                type="file"
                accept="image/*"
                name="productImages"
                className="border-1 hidden text-sm rounded-xl focus:ring-black focus:border-black w-full bg-gray-500 p-3"
                placeholder="Enter Product Image URL"
              />
            </div>
            <div className="relative p-4 border-1 h-12 w-12 rounded-lg">
              <label for="file-upload" className="block text-sm font-semibold">
                <EditIcon className="w-4 h-4 p-1 right-0 top-0" />
              </label>
              <PlusIcon />
              <input
                id="file-upload"
                onChange={(e) => {
                  handleChange(e, "productImagesUrl");
                }}
                type="file"
                accept="image/*"
                name="productImages"
                className="border-1 hidden text-sm rounded-xl focus:ring-black focus:border-black w-full bg-gray-500 p-3"
                placeholder="Enter Product Image URL"
              />
            </div>
          </div>
        </div> */}
        <div>
          <label className="block mb-2 text-sm font-semibold">
            Product Description
          </label>
          <textarea
            onChange={(e) => {
              handleChange(e, "productDecription");
            }}
            value={data?.productDecription}
            type="text"
            className="border-1 text-sm rounded-xl h-[14.5rem] focus:ring-black focus:border-black block w-full p-3"
            placeholder="Enter Product Description"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-semibold">
            Keyword
          </label>
          <input
            onChange={(e) => {
              handleChange(e, "keyword");
            }}
            value={data?.keyword}
            type="text"
            className="border-1 text-sm rounded-xl focus:ring-black focus:border-black block w-full p-3"
            placeholder="Enter Keyword"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-semibold">
            Product Title
          </label>
          <input
            onChange={(e) => {
              handleChange(e, "productTitle");
            }}
            value={data?.productTitle}
            type="text"
            className="border-1 text-sm rounded-xl focus:ring-black focus:border-black block w-full p-3"
            placeholder="Enter Product Name"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-semibold">
            General Details
          </label>
          <input
            onChange={(e) => {
              handleChange(e, "generalDetails");
            }}
            value={data?.generalDetails}
            type="text"
            className="border-1 text-sm rounded-xl focus:ring-black focus:border-black block w-full p-3"
            placeholder="Enter General Details"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-semibold">Colors</label>
          <input
            onChange={(e) => {
              handleChange(e, "colours");
            }}
            type="text"
            className="border-1 text-sm rounded-xl focus:ring-black focus:border-black block w-full p-3"
            placeholder="Enter Colors"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-semibold">MRP</label>
          <input
            onChange={(e) => {
              handleChange(e, "MRP");
            }}
            value={data?.mrp}
            type="number"
            className="border-1 text-sm rounded-xl focus:ring-black focus:border-black block w-full p-3"
            placeholder="Enter MRP"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-semibold">
            Selling Price
          </label>
          <input
            onChange={(e) => {
              handleChange(e, "sellingPrice");
            }}
            value={data?.sellingPrice}
            type="number"
            className="border-1 text-sm rounded-xl focus:ring-black focus:border-black block w-full p-3"
            placeholder="Enter Selling Price"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-semibold">Category</label>
          <select
            onChange={(e) => {
              handleChange(e, "category");
            }}
            value={data?.category}
            className="border-1 text-sm rounded-xl focus:ring-black focus:border-black block w-full p-3"
          >
            <option value="">Select Category</option>
            <option value="Home Decore">Home Decore</option>
            <option value="Bag">Bag</option>
            <option value="Jewellery">Jewellery</option>
          </select>
        </div>
        <div>
          <label className="block mb-2 text-sm font-semibold">
            Sub Category
          </label>
          <input
            onChange={(e) => {
              handleChange(e, "subCategory");
            }}
            value={data?.subCategory}
            type="text"
            className="border-1 text-sm rounded-xl focus:ring-black focus:border-black block w-full p-3"
            placeholder="Enter Sub Category"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-semibold">Stock</label>
          <input
            onChange={(e) => {
              handleChange(e, "stock");
            }}
            value={data?.stock}
            type="number"
            className="border-1 text-sm rounded-xl focus:ring-black focus:border-black block w-full p-3"
            placeholder="Enter Stock"
          />
        </div>
      </div>
      <div className="flex justify-between">
        <button
          type="submit"
          onClick={submitData}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-xl text-sm sm:w-auto px-5 py-2.5 text-center"
        >
          Submit
        </button>
        {/* {prodId && (
          <div className="flex flex-col">
            <button
              onClick={() => setDisableDiv(!disableDiv)}
              className={`text-white font-semibold rounded-xl text-sm w-full sm:w-auto px-5 py-2.5 text-center ${
                disableDiv ? "bg-red-100" : "bg-green-300"
              }`}
            >
              {disableDiv ? "Disabled" : "Enable"}
            </button>
            <span className="md:text-xs text-[9px]">
              Click button to {disableDiv ? "Enable" : "Disable"} the Product
            </span>
          </div>
        )} */}
        <div className="flex flex-col">
        <button className="text-white font-semibold bg-red-100 rounded-xl text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        onClick={()=>{setCurrent("products");}}
        >Close</button>
        </div>
      </div>
    </form>
  );
};

export default Form;