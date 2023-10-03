import { createSlice } from "@reduxjs/toolkit";

const initialState = { loading: 0 };

export const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      if (action.payload) state.loading++;
      else if (state.loading) state.loading--;
    },
    updateconfig: (state, action) => {
      Object.assign(state, action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLoading, updateConfig } = configSlice.actions;

export default configSlice.reducer;
