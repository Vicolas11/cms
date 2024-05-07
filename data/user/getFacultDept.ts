import { GetFacultResp, GetFaculty } from "@/interfaces/generic.interface";
import { constant } from "@/configs/constant.config";
import { envConfig } from "@/configs/env.config";
import { verifyToken } from "../../utils/jwt.util";
import { cookies } from "next/headers";

const { prodURL, devURL } = constant;
const { dev } = envConfig;
const baseURL = dev ? devURL : prodURL;

export const getFacultDepart = async ({
  role,
  currentPage = 1,
  perPage = 10,
}: GetFaculty) => {
  const token = cookies().get("token")?.value;
  const authToken = verifyToken(token);

  if (!authToken) {
    return null;
  }

  try {
    const response = await fetch(
      `${baseURL}/api/complaints/reportedtousers?currentPage=${currentPage}&perPage=${perPage}&role=${role}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        cache: "force-cache",
        next: { tags: ["reportedTo"] },
      }
    );

    const data = await response.json();

    if (data.error || !data.status)
      return { status: false, data: null, error: data.error };

    return {
      status: data.status,
      data: data.data as GetFacultResp[],
      error: null,
    };
  } catch (error) {
    console.log(error);
    return { status: false, data: null, error: error };
  }
};
