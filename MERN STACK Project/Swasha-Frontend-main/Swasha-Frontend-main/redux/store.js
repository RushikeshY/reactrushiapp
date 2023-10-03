import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import cacheReducer from "./slices/cacheSlice";
import wishlistReducer from "./slices/wishlistSlice";
import cartReducer from "./slices/cartSlice";
import productReducer from "./slices/productSlice";
import productReviewReducer from "./slices/productReviewSlice";
import reviewReducer from "./slices/reviewSlice";
import addressReducer from "./slices/addressSlice";
import configReducer from "./slices/configSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    cache: cacheReducer,
    wishlist: wishlistReducer,
    cart: cartReducer,
    product: productReducer,
    review: reviewReducer,
    address: addressReducer,
    config: configReducer,
    productReview: productReviewReducer,
  },
});
