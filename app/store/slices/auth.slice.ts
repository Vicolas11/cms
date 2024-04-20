import { AuthSliceData } from "@/interfaces/slice.interface";
import { createSlice } from "@reduxjs/toolkit";

const initialState: AuthSliceData = {
  isAuth: true,
  isError: false,
  token: null,
  isExpired: false,
  isLoading: false,
  error: null,
  success: false,
  message: null,
  status: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetMsg: (state) => {
      state.message = null;
      state.status = null;
      state.isError = false;
      state.success = false;
    },
    setIsExpired: (state) => {
      state.isExpired = true;
    },
    logoutUser: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const { logoutUser, setIsExpired, resetMsg } = authSlice.actions;
export default authSlice.reducer;
