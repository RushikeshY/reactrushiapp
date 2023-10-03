import React, { useEffect, useState } from "react";
import {
  makeRequest,
  getProducts,
  getProductCategories,
} from "../../../util/ApiClient";
import PaginationDn from "./paginationDn";
import { useRouter } from "next/router";
import Filter from "../features/filter";
import { useSelector } from "react-redux";
import { fetchProduct } from "../../../util/ProductClient";
import { Edit2Icon, ViewIcon } from "../../../components/svg";
import Search from "../features/search";

const Products = ({ setCurrent, setProductId }) => {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [totalProduct, setTotalProduct] = useState();
  const [resLength, setResLength] = useState();
  const [productCategories, setProductCategories] = useState();
  const sortBy = [
    { _id: 1, sort: { type: "createdAt", order: -1 }, name: "Latest" },
    { _id: 2, sort: { type: "price", order: 1 }, name: "Price Low - High" },
    { _id: 3, sort: { type: "price", order: -1 }, name: "Price High - Low" },
  ];

  useEffect(() => {
    makeRequest(
      getProducts,
      {
        query: router.query,
      },
      {
        loading:true,
        onSuccess: (res) => {
          setProducts(res.products);
          setTotalProduct(res.productCount);
          setResLength(10); // its static will change later
        },
        onError: (e) => {
          console.log(e);
        },
      }
    );
    makeRequest(
      getProductCategories,
      {},
      {
        loading:true,
        onSuccess: (res) => {
          setProductCategories(res.productCategories);
          console.log(productCategories)
        },
      }
    );
  }, [router.query]);

  return (
    <div className="w-[90vw] md:w-full">
      <div className="flex flex-row justify-between gap-3 mt-2 mb-4">
        <div className="text-xl font-bold md:mb-4">Products</div>
        <button
          type="button"
          onClick={() => {
            setCurrent("addProduct");
          }}
          className="px-3 py-2 text-sm font-medium text-center text-white rounded-lg w-41 bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 md:mb-2"
        >
          Add New Product
        </button>
      </div>
      <div className="flex flex-col justify-between gap-2 mb-4 md:flex-row">
        <Search />
        
        <div className="flex flex-col gap-2 md:flex-row">
          <Filter dropdownList={productCategories} dropdownName="ALL CATEGORY" />
          <Filter dropdownList={sortBy} dropdownName="SORT BY" />
        </div>
      </div>
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left">
          <thead className="text-xs uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-4 py-3">
                Product Code
              </th>
              <th scope="col" className="px-5 py-3">
                Product Title
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Sub Category
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Stock
              </th>
              <th scope="col" className="px-6 py-3">
                <span>Action</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product) => (
              <ProductLI key={product._id} pid={product} setCurrent={setCurrent} setProductId={setProductId} />
            ))}
          </tbody>
        </table>
      </div>
      <PaginationDn totalProduct={totalProduct} resLength={resLength} />
    </div>
  );
};

function ProductLI({ pid, setCurrent, setProductId }) {
  const product = useSelector((x) => x.product[pid]);
  useEffect(() => {
    fetchProduct(pid);
  });
  if (!product) return <></>;
  return (
    <tr
      key={product._id}
      className={`bg-white border-b hover:bg-gray-50 ${
        product.stock == 0 ? "opacity-40" : ""
      } `}
    >
      <td className="px-4 py-4">{product.productCode}</td>
      <td className="px-5 py-4">{product.productTitle}</td>
      <td className="px-6 py-4">{product.category.name}</td>
      <td className="px-6 py-4">{product.subCategory.name}</td>
      <td className="px-6 py-4"><div><strong>MRP :</strong> {product.mrp}</div><strong>Selling Price :</strong> {product.sellingPrice}</td>
      <td className="px-6 py-4">{product.stock}</td>
      <td className="flex gap-2 px-6 py-4">
        <div
          onClick={() => {
            setCurrent("editProduct");
            setProductId(product._id);
          }}
          className="cursor-pointer"
        >
          <Edit2Icon/>
        </div>
        <div
          onClick={() => {
            setCurrent("productDetail");
            setProductId(product._id);
          }}
          className="cursor-pointer"
        >
          <ViewIcon/>
        </div>
      </td>
    </tr>
  );
}

export default Products;