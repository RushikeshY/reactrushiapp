import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateName: (state, action) => {
      state.name = action.payload;
    },
    updateEmail: (state, action) => {
      state.email = action.payload;
    },
    updatePhoneNumber: (state, action) => {
      state.phoneNumber = action.payload;
    },
    updateToken: (state, action) => {
      state.token = action.payload;
    },
    setEmailVerified: (state, action) => {
      state.emailVerified = action.payload;
    },
    setMobileVerified: (state, action) => {
      state.mobileVerified = action.payload;
    },
    updateUser: (state, action) => {
      Object.assign(state, action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  updateName,
  updateEmail,
  updatePhoneNumber,
  updateToken,
  setEmailVerified,
  setMobileVerified,
  updateUser,
} = userSlice.actions;

export default userSlice.reducer;
