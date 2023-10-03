import { createSlice } from "@reduxjs/toolkit";
const initialState = {};
export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    updateProduct: (state, action) => {
      state[action.payload._id] = action.payload;
    },
    deleteProduct: (state, action) => {
      delete state[action.payload];
    },
  },
});
// Action creators are generated for each case reducer function
export const { updateProduct, deleteProduct } = productSlice.actions;
export default productSlice.reducer;