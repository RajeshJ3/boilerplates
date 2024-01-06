import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    user: null,
  },
  reducers: {
    authenticate: (state, { payload }) => {
      if (!payload.user) return;

      state.isAuthenticated = true;
      state.user = payload.user;
    },
    deAuthenticate: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { authenticate, deAuthenticate } = authSlice.actions;

export default authSlice.reducer;
