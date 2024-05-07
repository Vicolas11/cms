import { AComplaintResp, ComplaintResp } from "@/interfaces/action.interface";
import { GetFaculty } from "@/interfaces/generic.interface";
import { constant } from "@/configs/constant.config";
import { envConfig } from "@/configs/env.config";
import { revalidateTag } from "next/cache";
import { verifyToken } from "../../utils/jwt.util";
import { cookies } from "next/headers";

const { prodURL, devURL } = constant;
const { dev } = envConfig;
const baseURL = dev ? devURL : prodURL;

export const getComplaints = async (data: Omit<GetFaculty, "role">) => {
  const token = cookies().get("token")?.value;
  const authToken = verifyToken(token);
  let queryString = `api/complaints`;
  const { perPage, currentPage } = data;

  if (perPage) {
    queryString += `?perPage=${perPage}`;
  }

  if (currentPage) {
    queryString += `${perPage ? "&" : "?"}currentPage=${currentPage}`;
  }

  if (!authToken) {
    return null;
  }

  try {
    const response = await fetch(`${baseURL}/${queryString}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      next: { revalidate: 60, tags: ["complaints"] },
    });

    const data = await response.json();

    if (data.error || !data.status)
      return {
        status: false,
        message: "Error occurred while fetching",
        data: null,
        error: data.error,
        totalCount: 0,
      };

    return {
      status: data.status,
      message: data.message,
      data: data.data as ComplaintResp[],
      error: null,
      totalCount: data.other.totalCount as number,
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: "Error occurred while fetching",
      data: null,
      error: error,
      totalCount: 0,
    };
  }
};

export const getAComplaint = async (id: string) => {
  const token = cookies().get("token")?.value;
  const authToken = verifyToken(token);

  if (!authToken) {
    return null;
  }

  try {
    const response = await fetch(`${baseURL}/api/complaints/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });

    const data = await response.json();

    if (data.error || !data.status)
      return {
        status: false,
        message: "Error occurred while fetching",
        data: null,
        error: data.error,
      };

    revalidateTag("complaints");

    return {
      status: data.status,
      message: data.message,
      data: data.data as AComplaintResp,
      error: null,
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: "Error occurred while fetching",
      data: null,
      error: error,
    };
  }
};

export const getBubble = async () => {
  const token = cookies().get("token")?.value;
  const authToken = verifyToken(token);

  if (!authToken) {
    return null;
  }

  try {
    const response = await fetch(`${baseURL}/api/complaints/bubble`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      next: { revalidate: 60, tags: ["bubble"] },
    });

    const data = await response.json();

    if (data.error || !data.status)
      return {
        status: false,
        message: "Error occurred while fetching",
        data: null,
        error: data.error,
      };

    return {
      status: data.status,
      message: data.message,
      data: data.data.numOfNotReplied as number,
      error: null,
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: "Error occurred while fetching",
      data: null,
      error: error,
    };
  }
};
