import { AuthSliceData } from "@/interfaces/slice.interface";
import { createSlice } from "@reduxjs/toolkit";

const initialState: AuthSliceData = {};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});

export const {} = authSlice.actions;
export default authSlice.reducer;
