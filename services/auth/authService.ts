import { constant } from "@/configs/constant.config";
import { envConfig } from "@/configs/env.config";
import { verifyToken } from "@/utils/jwt.util";
import { cookies } from "next/headers";
import {
  ChangePasswordParams,
  ForgetPasswordParams,
  LoginStudParams,
  LoginUserParams,
  ResetPasswordParams,
} from "@/interfaces/action.interface";

const { prodURL, devURL } = constant;
const { dev } = envConfig;
const baseURL = dev ? devURL : prodURL;

export async function registerUserService(userData: any) {
  const url = new URL("api/auth/register", baseURL);
  const isEmpty = Object.values(userData).some((val) => val === "");

  if (isEmpty) {
    return;
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...userData }),
      cache: "no-cache",
    });

    return response.json();
  } catch (error) {
    console.error("Registration Service Error:", error);
    throw error;
  }
}

export async function loginUserService(
  userData: LoginStudParams | LoginUserParams
) {
  const url = new URL("api/auth/login", baseURL);
  const isEmpty = Object.values(userData).some((val) => val === "");

  if (isEmpty) {
    return;
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...userData }),
      cache: "no-cache",
    });

    return response.json();
  } catch (error) {
    console.error("Login Service Error:", error);
    throw error;
  }
}

export async function logoutUserService() {
  const token = cookies().get("token")?.value;
  const authToken = verifyToken(token);

  const url = new URL("api/auth/logout", baseURL);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      cache: "no-cache",
    });

    return response.json();
  } catch (error) {
    console.error("Logout Service Error:", error);
    throw error;
  }
}

export async function changePasswordService(userData: ChangePasswordParams) {
  const token = cookies().get("token")?.value;
  const authToken = verifyToken(token);

  const url = new URL("api/auth/changepassword", baseURL);
  const isEmpty = Object.values(userData).some((val) => val === "");

  if (isEmpty) {
    return;
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({ ...userData }),
      cache: "no-cache",
    });

    return response.json();
  } catch (error) {
    console.error("Change Password Service Error:", error);
    throw error;
  }
}

export async function forgetPasswordService(userData: ForgetPasswordParams) {
  const url = new URL("api/auth/forgetpassword", baseURL);
  const isEmpty = Object.values(userData).some((val) => val === "");

  if (isEmpty) {
    return;
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...userData }),
      cache: "no-cache",
    });

    return response.json();
  } catch (error) {
    console.error("Forget Password Service Error:", error);
    throw error;
  }
}

export async function resendForgetPasswordService(
  userData: ForgetPasswordParams
) {
  const url = new URL("api/auth/resendforgetpassword", baseURL);
  const isEmpty = Object.values(userData).some((val) => val === "");

  if (isEmpty) {
    return;
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...userData }),
      cache: "no-cache",
    });

    return response.json();
  } catch (error) {
    console.error("Forget Password Service Error:", error);
    throw error;
  }
}

export async function resetPasswordService(userData: ResetPasswordParams) {
  const url = new URL("api/auth/resetpassword", baseURL);
  const isEmpty = Object.values(userData).some((val) => val === "");

  if (isEmpty) {
    return;
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...userData }),
      cache: "no-cache",
    });

    return response.json();
  } catch (error) {
    console.error("Reset Password Service Error:", error);
    throw error;
  }
}

export async function updateUserService(userData: any) {
  const token = cookies().get("token")?.value;
  const authToken = verifyToken(token);
  const url = new URL("api/auth/account", baseURL);
  const isEmpty = Object.values(userData).some((val) => val === "");

  if (isEmpty) {
    return;
  }

  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({ ...userData }),
      cache: "no-cache",
    });

    return response.json();
  } catch (error) {
    console.error("Update User Service Error:", error);
    throw error;
  }
}
