import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const cacheSlice = createSlice({
  name: "cache",
  initialState,
  reducers: {
    updateMyOrders: (state, action) => {
      state.myOrders = action.payload;
    },
    updateViewHistory: (state, action) => {
      state.viewHistory = action.payload;
    },
    updateProductCategories: (state, action) => {
      state.productCategories = action.payload;
    },
    updateCache: (state, action) => {
      Object.assign(state, action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  updateCache,
  updateMyOrders,
  updateProductCategories,
  updateViewHistory,
} = cacheSlice.actions;

export default cacheSlice.reducer;
