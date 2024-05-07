import { getDept, getFaculty } from "@/utils/getDeptFaculty.util";
import { UserProfile } from "@/interfaces/userData.interface";
import { userRoleProfile } from "@/utils/userRole.util";
import { formatDate } from "@/utils/formatdate.util";

export const userDataArrFunc = (props: UserProfile | null | undefined) => [
  { label: "Full Name", data: props?.name || "", errMsg: "", show: true },
  { label: "Email", data: props?.email || "", errMsg: "", show: true },
  {
    label: "Gender",
    data: props?.gender,
    errMsg: "",
    show: true,
  },
  {
    label: "Matric Number",
    data: props?.matricNum || "",
    errMsg: "",
    show: props?.role === "Student",
  },
  {
    label: "User",
    data: props?.role ? userRoleProfile(props?.role as string) : "",
    errMsg: "",
    show: true,
  },
  {
    label: "Department",
    data: getDept(props?.department as string) || "",
    errMsg: "",
    show: ["Student", "HOD"].includes(props?.role as string),
  },
  {
    label: "Faculty",
    data: getFaculty(props?.faculty as string) || "",
    errMsg: "",
    show: props?.role === "Dean",
  },
  {
    label: "Date Created",
    data: formatDate(props?.createdAt || `${new Date()}`),
    errMsg: "",
    show: true,
  },
];

export const passwordInput = [
  { label: "Current Password", data: "", errMsg: "", show: true },
  {
    label: "New Password",
    data: "",
    errMsg: "Password length must be 6 or more",
    show: true,
  },
  {
    label: "Confirm Password",
    data: "",
    errMsg: "Password does not match",
    show: true,
  },
];
