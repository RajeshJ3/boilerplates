import { createSlice } from "@reduxjs/toolkit";

export const utilsSlice = createSlice({
  name: "utils",
  initialState: {
    activePathId: null,
    notify: {
      open: false,
      action: null,
      severity: null,
      autoHideDuration: 5000,
      vertical: "bottom",
      horizontal: "right",
    },
  },
  reducers: {
    setActivePathId: (state, { payload }) => {
      state.activePathId = payload;
    },
    setNotify: (state, { payload }) => {
      state.notify = payload;
    },
  },
});

export const { setActivePathId, setNotify } = utilsSlice.actions;

export default utilsSlice.reducer;
