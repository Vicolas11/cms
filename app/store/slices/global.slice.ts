import { createSlice } from "@reduxjs/toolkit";

interface IGlobalSlice {}

const initialState: IGlobalSlice = {};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {},
});

export const {} = globalSlice.actions;
export default globalSlice.reducer;
