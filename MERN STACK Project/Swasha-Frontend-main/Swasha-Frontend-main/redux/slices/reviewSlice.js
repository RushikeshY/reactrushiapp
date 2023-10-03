import { createSlice } from "@reduxjs/toolkit";

const initialState = {};
Object.defineProperty(initialState, "default", { value: true, writable: true });

export const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    updateReview: (state, action) => {
      state[action.payload.productId] = action.payload;
    },
    loadReviews: (state, action) => {
      delete state.default;
      action.payload.forEach((x) => {
        state[x.productId] = x;
      });
    },
    deleteReview: (state, action) => {
      delete state[action.payload];
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateReview, loadReviews, deleteReview } = reviewSlice.actions;

export default reviewSlice.reducer;
