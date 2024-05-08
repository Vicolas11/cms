"use server";
import { envConfig } from "@/configs/env.config";
import {
  changePasswordService,
  forgetPasswordService,
  loginUserService,
  logoutUserService,
  registerUserService,
  resendForgetPasswordService,
  resetPasswordService,
  updateUserService,
} from "./authService";
import { userRoleType } from "@/utils/userRole.util";
import { constant } from "@/configs/constant.config";
import { getUser } from "@/data/user/getUser";
import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

const { dev } = envConfig;
const { prodDomain } = constant;

const config = {
  maxAge: 60 * 60 * 24 * 7, // 1 week
  path: "/",
  domain: dev ? "localhost" : prodDomain,
  httpOnly: true,
  secure: true,
};

export async function registerUserAction(_: any, formData: FormData) {
  const role = formData.get("role");
  // Studnet User
  const getFormStudData = {
    role: userRoleType(role as string),
    matricNum: formData.get("matricNum")?.toString() || "",
    name: formData.get("full_name")?.toString() || "",
    gender: formData.get("gender")?.toString() || "",
    department: formData.get("department")?.toString() || "",
    email: formData.get("email")?.toString() || "",
    password: formData.get("password")?.toString() || "",
  };

  // Dean of Faculty
  const getFormDeanData = {
    role: userRoleType(role as string),
    faculty: formData.get("faculty")?.toString() || "",
    gender: formData.get("gender")?.toString() || "",
    name: formData.get("full_name")?.toString() || "",
    email: formData.get("email")?.toString() || "",
    password: formData.get("password")?.toString() || "",
  };

  // Head of Department User
  const getFormHOData = {
    role: userRoleType(role as string),
    department: formData.get("department")?.toString() || "",
    gender: formData.get("gender")?.toString() || "",
    name: formData.get("full_name")?.toString() || "",
    email: formData.get("email")?.toString() || "",
    password: formData.get("password")?.toString() || "",
  };

  // Student Affairs User
  const getFormSAData = {
    role: userRoleType(role as string),
    name: formData.get("full_name")?.toString() || "",
    gender: formData.get("gender")?.toString() || "",
    email: formData.get("email")?.toString() || "",
    password: formData.get("password")?.toString() || "",
  };

  let param: any = getFormStudData;

  switch (role) {
    case "DE":
      param = getFormDeanData;
      break;
    case "HO":
      param = getFormHOData;
      break;
    case "SA":
      param = getFormSAData;
      break;
    default:
      param = getFormStudData;
      break;
  }

  const responseData = await registerUserService(param);

  if (!responseData) {
    return {
      data: {
        status: false,
        message: "Ops! Something went wrong. Please try again.",
      },
    };
  }

  if (responseData.error || !responseData.status) {
    return {
      data: {
        status: false,
        message: responseData.message,
      },
    };
  }

  revalidateTag("reportedTo");

  return {
    data: {
      ...responseData,
      message: "Registered successfully. Login Now!",
    },
  };
}

export async function loginUserAction(
  _: any,
  formData: FormData
): Promise<any> {
  const role = formData.get("role");

  const getFormStudData = {
    role: userRoleType(role as string),
    matricNum: formData.get("matricNum")?.toString() || "",
    password: formData.get("password")?.toString() || "",
  };

  const getFormData = {
    role: userRoleType(role as string),
    email: formData.get("email")?.toString() || "",
    password: formData.get("password")?.toString() || "",
  };

  const responseData = await loginUserService(
    role === "ST" ? getFormStudData : getFormData
  );

  if (responseData.data) {
    cookies().set("token", responseData.data.accessToken, config);
    cookies().set("refreshToken", responseData.data.refreshToken, config);
  }
  // redirect("/report");
  // console.log("RES => ", responseData);

  return {
    data: {
      ...responseData,
    },
  };
}

export async function logoutUserAction() {
  const responseData = await logoutUserService();

  if (!responseData) {
    return {
      data: {
        status: false,
        code: responseData.code,
        message: "Invalid Token",
      },
    };
  }

  if (!responseData.status) {
    return {
      data: {
        status: false,
        code: responseData.code,
        message: "Invalid Token",
      },
    };
  }

  cookies().delete("token");
  cookies().delete("refreshToken");
  redirect("/");
}

export async function changePasswordAction(
  _: any,
  formData: FormData
): Promise<any> {
  const user = await getUser();

  if (!user?.userId) {
    redirect("/login");
  }

  const getFormData = {
    id: user.userId,
    oldpassword: formData.get("Current Password")?.toString() || "",
    newpassword: formData.get("New Password")?.toString() || "",
  };

  const responseData = await changePasswordService(getFormData);

  if (responseData.code === 401) {
    cookies().delete("token");
    cookies().delete("refreshToken");
    redirect("/login");
  }

  return {
    data: {
      ...responseData,
    },
  };
}

export async function forgetPasswordAction(
  _: any,
  formData: FormData
): Promise<any> {
  const getFormData = {
    email: formData.get("email")?.toString() || "",
  };

  const responseData = await forgetPasswordService(getFormData);

  // redirect("/report");
  console.log("RES => ", responseData);
  if (responseData.code === 500) {
    return {
      data: {
        ...responseData,
        message: "An error occurred. Try again!",
      },
    };
  }

  return {
    data: {
      ...responseData,
    },
  };
}

export async function resendForgetPasswordAction(
  _: any,
  formData: FormData
): Promise<any> {
  const getFormData = {
    email: formData.get("email")?.toString() || "",
  };

  const responseData = await resendForgetPasswordService(getFormData);

  if (responseData.code === 500) {
    return {
      data: {
        ...responseData,
        message: "An error occurred. Try again!",
      },
    };
  }

  return {
    data: {
      ...responseData,
    },
  };
}

export async function resetPasswordAction(
  _: any,
  formData: FormData
): Promise<any> {
  const getFormData = {
    otp: formData.get("otp")?.toString() || "",
    email: formData.get("email")?.toString() || "",
    password: formData.get("password")?.toString() || "",
  };

  const responseData = await resetPasswordService(getFormData);

  // redirect("/report");
  console.log("RES => ", responseData);

  return {
    data: {
      ...responseData,
    },
  };
}

export async function updateUserAction(
  _: any,
  formData: FormData
): Promise<any> {
  const user = await getUser();

  if (!user?.userId) {
    redirect("/login");
  }

  const getFormData = {
    id: user.userId,
    name: formData.get("Full Name")?.toString() || "",
  };

  const responseData = await updateUserService(getFormData);

  if (responseData.code === 401) {
    cookies().delete("token");
    cookies().delete("refreshToken");
    redirect("/login");
  }

  revalidateTag("userData");
  revalidateTag("reportedTo");

  return {
    data: {
      ...responseData,
    },
  };
}
