import { TypedUseSelectorHook, useDispatch } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import GlobalReducer from "./slices/global.slice";
import AuthReducer from "./slices/auth.slice";
import { useSelector } from "react-redux";

export const createStore = () =>
  configureStore({ reducer: { global: GlobalReducer, auth: AuthReducer } });
export type StoreType = ReturnType<typeof createStore>;
export type RootState = ReturnType<StoreType["getState"]>;
export type AppDispatch = StoreType["dispatch"];
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
