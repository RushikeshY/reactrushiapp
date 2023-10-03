import { createSlice } from "@reduxjs/toolkit";

const initialState = {};
Object.defineProperty(initialState, "default", { value: true, writable: true });

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    cartAdd: (state, action) => {
      if (action.payload.quantity < 1) {
        console.log("remove");
        delete state[action.payload.productId];
        return;
      }
      state[action.payload.productId] = {
        productId: action.payload.productId,
        quantity: action.payload.quantity,
      };
    },
    cartRemove: (state, action) => {
      delete state[action.payload];
    },
    cartClear: (state, action) => {
      const filteredCart = action.payload;
      Object.keys(filteredCart).forEach((productId) => delete state[productId]);
    },
    updateCart: (state, action) => {
      delete state.default;
      Object.assign(state, action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { cartAdd, cartRemove, updateCart, cartClear } = cartSlice.actions;

export default cartSlice.reducer;
