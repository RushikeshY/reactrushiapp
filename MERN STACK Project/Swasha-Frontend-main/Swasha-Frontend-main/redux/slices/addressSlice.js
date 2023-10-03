import { createSlice } from "@reduxjs/toolkit";

const initialState = {};
Object.defineProperty(initialState, "default", { value: true, writable: true });

export const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    addressAdd: (state, action) => {
      state[action.payload._id] = action.payload;
    },
    addressRemove: (state, action) => {
      delete state[action.payload];
    },
    makeAddressDefault: (state, action) => {
      Object.values(state).forEach((x) => (x.isDefault = false));
      state[action.payload].isDefault = true;
    },
    updateAddresses: (state, action) => {
      delete state.default;
      Object.assign(state, action.payload);
    },
    addressDelete(state, action) {
      delete state[action.payload]
    }
  },
});

// Action creators are generated for each case reducer function
export const { addressAdd, addressRemove, makeAddressDefault, addressDelete, updateAddresses } =
  addressSlice.actions;

export default addressSlice.reducer;
