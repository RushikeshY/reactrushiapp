import { createSlice } from "@reduxjs/toolkit";

const initialState = {};
Object.defineProperty(initialState, "default", { value: true, writable: true });

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    wishlistAdd: (state, action) => {
      state[action.payload] = Date.now();
    },
    wishlistRemove: (state, action) => {
      delete state[action.payload];
    },
    updateWishlist: (state, action) => {
      delete state.default;
      Object.assign(state, action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { wishlistAdd, wishlistRemove, updateWishlist } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;
