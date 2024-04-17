import { SerializedError } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export interface AuthSliceData {
  isAuth: boolean;
  isError: boolean;
  token: string | null;
  isExpired: boolean;
  isLoading: boolean;
  error: SerializedError | null | AxiosError;
  success: boolean;
  message: string | null;
  status: number | null;
}
