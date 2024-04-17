import { LoginParams } from "../../interfaces/action.interface";
import { constant } from "../../configs/constant.config";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const { prodURL } = constant;

export const loginUser = createAsyncThunk(
  "userLogin",
  async (loginData: LoginParams) => {
    try {
      const resp = await axios.post(
        `${prodURL}Authentication/Login`,
        loginData,
        { headers: { "Content-Type": "application/json" } }
      );

      const data = resp.data;
      // console.log("SUCCESS => ", data);
      return data;
    } catch (error: any) {
      // console.log("ERROR => ", error);
      if (error.response) {
        const { data, status } = error.response;
        const errorMsg = data.message || error.message;
        const statusCode = status;
        throw new Error(
          `${statusCode}: ${
            status === 500 ? "Internal server error" : errorMsg
          }`
        );
      } else {
        throw new Error(error.message);
      }
    }
  }
);
