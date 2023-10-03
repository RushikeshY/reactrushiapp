import axios from "axios";
import { toast } from "react-toastify";
import {
  addressAdd,
  addressDelete,
  makeAddressDefault,
  updateAddresses,
} from "../redux/slices/addressSlice";
import {
  updateMyOrders,
  updateProductCategories,
  updateViewHistory,
} from "../redux/slices/cacheSlice";
import { cartAdd, updateCart } from "../redux/slices/cartSlice";
import { setLoading } from "../redux/slices/configSlice";
import { updateProduct } from "../redux/slices/productSlice";
import { loadReviews, updateReview } from "../redux/slices/reviewSlice";
import { updateUser } from "../redux/slices/userSlice";
import {
  updateWishlist,
  wishlistAdd,
  wishlistRemove,
} from "../redux/slices/wishlistSlice";
import { store } from "../redux/store";
import { objectToQuery } from "./StringUtil";
import { swashaLogoBW } from "./base64urls";
import { updateProductReview } from "../redux/slices/productReviewSlice";

let domain;
if (typeof window !== "undefined") {
  // domain = `${window.document.location.protocol}//${window.document.location.hostname}`;
  domain = "http://localhost:8080";
  updateVersion();
}

function updateVersion() {
  function updateTo(v) {
    window.localStorage.setItem("version", v);
    console.log(`Updated to version ${v}`);
  }
  const cv = parseInt(window.localStorage.getItem("version") || 0);
  console.log("version", cv);
  if (cv < 5) {
    window.localStorage.removeItem("userData");
    updateTo(5);
  }
}

export function getRazorpayClient({
  amount,
  orderId,
  onSuccess = (res) => {},
  onDismiss = () => {},
}) {
  const user = store.getState().user;
  var options = {
    key: "rzp_test_nRKEzCoAtxXepP",
    amount: parseFloat(amount) * 100,
    currency: "INR",
    name: "Swasha",
    image: swashaLogoBW,
    description: "",
    order_id: orderId,
    modal: {
      escape: false,
      confirm_close: true,
      ondismiss: onDismiss,
    },
    handler: onSuccess,
    prefill: {
      name: user.name,
      email: user.email,
      contact: user.mobileNum,
    },
    theme: {
      color: "#000000",
    },
  };
  let client = new Razorpay(options);
  client.on("payment.failed", function (response) {
    toast.error("Payment failed");
    console.log("paymentFailed", response.error);
  });

  client.on("payment.error", function (response) {
    toast.error("Payment error");
    console.log("paymentError", response.error);
  });

  return client;
}

const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL || ""}/api/v1/`,
  withCredentials: true,
});

export async function getLoggedInUserData() {
  return axiosInstance.get("me");
}

export async function updateLoggedInUserData({ data }) {
  const userBK = { ...store.getState().user };
  const res = await axiosInstance.put("/me/update", data);
  store.dispatch(updateUser({ ...userBK, ...data }));
  return res;
}

export async function changeLoggedInUserPassword({ data }) {
  return axiosInstance.put(`/password/update`, data);
}

export async function login({ email, password }) {
  return axiosInstance.post(`login`, {
    email,
    password,
  });
}

export async function logout() {
  return axiosInstance.get(`logout`);
}

export async function signup({ name, email, mobile, password }) {
  return axiosInstance.post(`register`, {
    name,
    email,
    mobileNum: mobile,
    password,
  });
}

export async function resetPassword({ token, password, confirmPassword }) {
  return axiosInstance.post(`password/reset`, {
    token,
    password,
    confirmPassword,
  });
}

export async function verifyEmail({ token }) {
  return axiosInstance.post(`verify-email`, {
    token,
  });
}

export async function requestEmailVerification() {
  return axiosInstance.get("request-email-verification");
}

export async function requestOTPVerification() {
  return axiosInstance.get("request-mobile-verification");
}

export async function verifyOTP({ otp }) {
  return axiosInstance.post(`verify-otp`, { otp });
}

export async function getResetPasswordEmail({ email }) {
  return axiosInstance.post(`password/forgot`, { email });
}

export async function getProductReviews({ productId }) {
  const pr = store.getState().productReview[productId];
  if (pr) {
    return wrapResponse(pr);
  }
  const res = await axiosInstance.get(
    `/product/reviews?productId=${productId}`
  );
  store.dispatch(updateProductReview({ productId, reviews: res.data.reviews }));
  return res;
}

export async function getProductCategories() {
  const pc = store.getState().cache.productCategories;
  if (pc) {
    console.log("found product categories in cache");
    return pc;
  }
  const res = await axiosInstance.get("product-categories");
  store.dispatch(updateProductCategories(filterResponse(res)));
  return res;
}

export async function searchProducts({ query = {} }) {
  return axiosInstance.get(`products/search?${objectToQuery(query)}`);
}

export async function getSubCategory({id}) {
  return axiosInstance.get(`/subcategories/${id}`);
}

export async function getProducts({ query = {} }) {
  return axiosInstance.get(`products?${objectToQuery(query)}`);
}

export async function getProductsByIds({ ids = {} }) {
  return axiosInstance.post(`product/by-ids`, { ids });
}

export async function addToViewHistory({ productId }) {
  return axiosInstance.post(`/view-history/add`, { productId });
}

export async function getSingleProduct({
  productID,
  view = false,
  forceFetch = false,
}) {
  let vh = store.getState().cache.viewHistory;
  if (view && vh) {
    vh = vh.filter((x) => x.productId !== productID);
    vh.unshift({ productId: productID });
    store.dispatch(updateViewHistory(vh));

    makeRequest(addToViewHistory, { productId: productID });
  }
  if (!forceFetch && store.getState().product[productID]) {
    // console.log("product found in cache");
    return wrapResponse(store.getState().product[productID]);
  }
  const p = (await axiosInstance.get(`product/${productID}?view=${view}`)).data
    .product;
  store.dispatch(updateProduct(p));
  return wrapResponse(p);
}

export async function getWishlistItems() {
  if (!store.getState().wishlist.default) {
    // console.log("loading wishlist from cache");
    return wrapResponse(store.getState().wishlist);
  }
  const res = await axiosInstance.get(`wishlist/wishlists`);
  const wl = {};
  res.data.wishlist.forEach(
    (x) => (wl[x.productId] = new Date(x.createdAt).getTime())
  );
  store.dispatch(updateWishlist(wl));
  return wrapResponse(wl);
}

export async function addToWishlist({ productId }) {
  store.dispatch(wishlistAdd(productId));
  return axiosInstance.post(`/wishlist/new`, { productId }).catch((err) => {
    store.dispatch(wishlistRemove(productId));
    throw err;
  });
}

export async function removeFromWishlist({ productId }) {
  store.dispatch(wishlistRemove(productId));
  return axiosInstance.delete(`/wishlist/${productId}`).catch((err) => {
    store.dispatch(wishlistAdd(productId));
    throw err;
  });
}

export async function getCartItems() {
  if (!store.getState().cart.default) {
    // console.log("loading cart from cache");
    return wrapResponse(store.getState().cart);
  }
  const res = await axiosInstance.get(`cart/getAllCartItems`);
  const ci = {};
  res.data.cartItems.forEach((x) => {
    ci[x.productId] = { productId: x.productId, quantity: x.quantity };
  });
  store.dispatch(updateCart(ci));
  return wrapResponse(ci);
}

export async function addToCart({ productId, quantity }) {
  if (
    !store.getState().cart[productId] &&
    store.getState().wishlist[productId]
  ) {
    makeRequest(removeFromWishlist, { productId });
  }
  if (!quantity && !store.getState().wishlist[productId]) {
    toast.info("Moved to wishlist");
    makeRequest(addToWishlist, { productId });
  }
  const ci_bk = store.getState().cart[productId];
  store.dispatch(cartAdd({ productId, quantity }));
  return axiosInstance
    .post(`/cart/addToCart`, { productId, quantity })
    .catch((e) => {
      store.dispatch(cartAdd(ci_bk || { productId, quantity: 0 }));
      throw e;
    });
}

export async function removeFromCart(productId) {
  const quantity = 0;
  const ci_bk = store.getState().cart[productId];
  store.dispatch(cartAdd({ productId, quantity }));
  return axiosInstance
    .post(`/cart/addToCart`, { productId, quantity })
    .catch((e) => {
      store.dispatch(cartAdd(ci_bk || { productId, quantity: 0 }));
      throw e;
    });
}

export async function getViewHistory() {
  const vh = store.getState().cache.viewHistory;
  if (vh) {
    console.log("found view history in cache");
    return wrapResponse({ viewHistory: vh });
  }
  const res = await axiosInstance.get(`/product-view-history`);
  store.dispatch(updateViewHistory(res.data.viewHistory));
  return res;
}

export async function getMyOrders() {
  // const mord = store.getState().cache.myOrders;
  // if (mord) {
  //   console.log("found my orders in cache");
  //   return wrapResponse(mord);
  // }
  const res = await axiosInstance.get(`/orders/me`);
  store.dispatch(updateMyOrders(res.data));
  return res;
}

export async function CancelRequest({orderId,reason}){
  return axiosInstance.put(`/order/cancel/${orderId}`, {"cancellationReason":reason});
}

export async function createReturn({orderId,returnItems}){
  return axiosInstance.post(`/return-order`,{"orderId":orderId , "returnItems":returnItems});
}

export async function getAllReturnsUser(){
  return axiosInstance.get('/my-returns/:id');
}

export async function postContactUsData(data) {
  return axiosInstance.post(`/contact/newQuery`, data);
}

export async function getAllAddresses() {
  if (!store.getState().address.default) {
    console.log("loading address from cache");
    return wrapResponse(store.getState().address);
  }
  const res = await axiosInstance.get(`/address/addresses`);
  const adr = {};
  res.data.addresses.forEach((x) => {
    adr[x._id] = x;
  });
  store.dispatch(updateAddresses(adr));
  return wrapResponse(adr);
}

export async function makeDefaultAddress({ aid }) {
  const res = await axiosInstance.get(`/address/make-default/${aid}`);
  store.dispatch(makeAddressDefault(aid));
  return res;
}

export async function addAddress({ address }) {
  const res = await axiosInstance.post(`/address/new`, address);
  store.dispatch(addressAdd(res.data.address));
  return res;
}

export async function updateAddress({ address }) {
  const res = await axiosInstance.put(
    `/address/uddateAddress/${address._id}`,
    address
  );
  store.dispatch(addressAdd(address));
  return res;
}

export async function deleteAddress({ address }) {
  const res = await axiosInstance.delete(`/address/${address}`);
  store.dispatch(addressDelete(address));
  return res;
}

export async function initiateDelivery({ payload }) {
  return axiosInstance.post(`/order/initiateDelivery`, payload);
}
export async function bulkOrder(payload) {
  return axiosInstance.post(`/bulk/newBulkQuery`, payload);
}

export async function placeOrder({ cart, addressId }) {
  const order = (
    await axiosInstance.post(`/order/new`, {
      products: Object.values(cart).map((x) => {
        return { id: x.productId, quantity: x.quantity };
      }),
      shippingAddress: addressId,
    })
  ).data.order;
  // console.log("PlaceOrder");
  store.dispatch(updateMyOrders(undefined));
  return new Promise((rs, rj) => {
    getRazorpayClient({
      amount: order.totalPrice,
      orderId: order.orderId,
      onSuccess: (res) => {
        makeRequest(
          initiateDelivery,
          {
            payload: {
              orderId: order._id,
              razorpay_payment_id: res.razorpay_payment_id,
              razorpay_order_id: res.razorpay_order_id,
              razorpay_signature: res.razorpay_signature,
            },
          },
          {
            onSuccess: () => {
              // toast.success("Order placed successfully");
              rs(wrapResponse(order));
            },
          }
        );
      },
      onDismiss: () => {
        rj({ response: { data: { message: "Payment cancelled" } } });
      },
    }).open();
  });
}

export async function placeCOD({ cart, addressId }) {
  const order_req = await axiosInstance.post(`/order/new`, {
    products: Object.values(cart).map((x) => {
      return { id: x.productId, quantity: x.quantity };
    }),
    shippingAddress: addressId,
  });
  // console.log("PlaceCod");
  const order = order_req.data.order;
  if (order) {
    return new Promise((rs, rj) => {
      rs(wrapResponse(order));
    });
  }

  store.dispatch(updateMyOrders(undefined));

  // try {
  //   await makeRequest(
  //     initiateDelivery,

  //   );
  // } catch (error) {
  //   // Handle any errors that might occur during the delivery initiation
  // }
}

export async function fetchMyReviews() {
  if (!store.getState().review.default) {
    return wrapResponse(true);
  }
  const res = await axiosInstance.get(`/product/my-reviews`);
  store.dispatch(loadReviews(res.data.reviews));
  return res;
}

export async function rateProduct({
  productId,
  rating,
  valueForMoney,
  quality,
  shipping,
  delivery,
  comment,
}) {
  const rev = {
    productId,
    rating,
    valueForMoney,
    quality,
    shipping,
    delivery,
    comment,
  };
  const res = await axiosInstance.put(`/product/review`, {
    productId,
    rating,
    valueForMoney,
    quality,
    shipping,
    delivery,
    comment,
  });
  getSingleProduct({ productID: productId, forceFetch: true });
  store.dispatch(updateReview(rev));
  return res;
}

export async function getAllUsers() {
  return axiosInstance.get(`admin/users`);
}

export async function getAllOrders() {
  return axiosInstance.get(`admin/orders`);
}

 
export async function handleOrderStatus(order) {
  return axiosInstance.post(`/admin/order/${order.orderId}`,{"orderStatus": order.orderStatus,"trackingLink": order.trackingLink,"orderUser":order.orderUser});
}

export async function handleCancelRefundStatus(order) {
  return axiosInstance.post(`/admin/cancel-refund-status/${order.orderId}`,{"cancelRefundStatus":order.newCancelRefundStatus});
}


export async function handleApproveReturn(order) {
  return axiosInstance.post(`/return-approve/${order.returnId}/items/${order.itemId}`,{"trackingLink":order.trackingLink});
}

export async function handleRejectReturn(order) {
  return axiosInstance.post(`/return-reject/${order.returnId}/items/${order.itemId}`,{"reasonForReject":order.reasonForReject});
}

export async function handleReturnRefundInitiated(order) {
  return axiosInstance.post(`/return-refund/${order.returnId}/items/${order.itemId}`);
}

export async function getAllReturnsAdmin() {
  return axiosInstance.get('/all-returns');
}

export async function addNewProduct({ data }) {
  return axiosInstance.post("admin/product/new", data);
}

export async function editProduct({ product }) {
  return axiosInstance.put(`product/${product._id}`, product);
}

export async function deleteProduct(id) {
  return axiosInstance.delete(`product/${id}`);
}

function wrapResponse(core = true) {
  return { data: core };
}

function filterResponse(res) {
  return { data: res.data };
}

export async function makeRequest(
  fn,
  arg,
  {
    onSuccess = () => {},
    onError = () => {},
    loading = false,
    noLog = false,
    ...options
  } = {}
) {
  try {
    if (loading) store.dispatch(setLoading(true));
    const res = await fn(arg);
    if (!process.env.NEXT_PUBLIC_ENV !== "production" && !noLog) {
      console.log(fn.name, res?.data);
      onSuccess(res?.data);
    }
  } catch (err) {
    if (err.response?.status === 401) {
      window.localStorage.removeItem("userData");
      store.dispatch(updateUser({}));
      console.log("Deleted unauthorized user");
    } else {
      if (process.env.NEXT_PUBLIC_ENV !== "production")
        console.log("makeRequest(err):", err);
        (err.response?.data?.message || "Something went wrong", {
        type: "error",
      });
    }
    onError(err);
  } finally {
    store.dispatch(setLoading(false));
  }
}

export async function checkPincode({Pincode}) {
  return axiosInstance.post(`/delivery/check-pincode`,{"destinationPin": Pincode});
}