import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const productReviewSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    updateProductReview: (state, action) => {
      state[action.payload.productId] = action.payload.reviews;
    },
    deleteProductReview: (state, action) => {
      delete state[action.payload];
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateProductReview, deleteProductReview } =
  productReviewSlice.actions;

export default productReviewSlice.reducer;
