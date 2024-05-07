"use server";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import {
  deleteResponseService,
  makeComplaintService,
  makeResponseService,
  updateResponseService,
} from "./complaintService";

export async function makeComplaintAction(_: any, formData: FormData) {
  const getFormData = {
    reportedToUserId: formData.get("reportedToUserId")?.toString() || "",
    subject: formData.get("subject")?.toString() || "",
    body: formData.get("body")?.toString() || "",
  };

  const respData = await makeComplaintService(getFormData);

  if (!respData) {
    return {
      data: {
        ...respData,
        code: respData.code,
        message: "Ops! Something went wrong. Please try again.",
      },
    };
  }

  if (respData.code === 401) {
    cookies().delete("token");
    cookies().delete("refreshToken");
    redirect("/login");
  }

  if (respData.error || !respData.status) {
    return {
      data: {
        ...respData,
        code: respData.code,
        message: "Failed to Register.",
      },
    };
  }

  revalidateTag("bubble");
  revalidateTag("complaints");

  return {
    data: {
      ...respData,
    },
  };
}

export async function deleteComplaintAction(_: any, formData: FormData) {
  const getFormData = {
    id: formData.get("id")?.toString() || "",
  };

  const respData = await deleteResponseService(getFormData.id);

  if (respData.code === 401) {
    cookies().delete("token");
    cookies().delete("refreshToken");
    redirect("/login");
  }

  if (!respData) {
    return {
      data: {
        ...respData,
        code: respData.code,
        message: "Ops! Something went wrong. Please try again.",
      },
    };
  }

  if (respData.error || !respData.status) {
    return {
      data: {
        ...respData,
        code: respData.code,
        message: "Failed to Delete.",
      },
    };
  }

  revalidateTag("complaints");

  return {
    data: {
      ...respData,
    },
  };
}

export async function updateComplaintAction(_: any, formData: FormData) {
  const getFormData = {
    id: formData.get("id")?.toString() || "",
    reportedToUserId: formData.get("reportedToUserId")?.toString() || "",
    subject: formData.get("subject")?.toString() || "",
    body: formData.get("body")?.toString() || "",
  };

  const respData = await updateResponseService(getFormData);

  if (respData.code === 401) {
    cookies().delete("token");
    cookies().delete("refreshToken");
    redirect("/login");
  }

  if (!respData) {
    return {
      data: {
        ...respData,
        code: respData.code,
        message: "Ops! Something went wrong. Please try again.",
      },
    };
  }

  if (respData.error || !respData.status) {
    return {
      data: {
        ...respData,
        code: respData.code,
        message: "Failed to Update.",
      },
    };
  }

  revalidateTag("complaints");

  return {
    data: {
      ...respData,
    },
  };
}

export async function makeResponseAction(_: any, formData: FormData) {
  const getFormData = {
    id: formData.get("id")?.toString() || "",
    body: formData.get("body")?.toString() || "",
  };

  const respData = await makeResponseService(getFormData);

  if (!respData) {
    return {
      data: {
        ...respData,
        code: respData.code,
        message: "Ops! Something went wrong. Please try again.",
      },
    };
  }

  if (respData.code === 401) {
    cookies().delete("token");
    cookies().delete("refreshToken");
    redirect("/login");
  }

  if (respData.error || !respData.status) {
    return {
      data: {
        ...respData,
        code: respData.code,
        message: respData.message || "Failed to make response.",
      },
    };
  }

  revalidateTag("complaints");
  revalidateTag("bubble");

  return {
    data: {
      ...respData,
    },
  };
}
