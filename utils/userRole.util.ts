import { Role } from "@/interfaces/userData.interface";

export const userRoleType = (type: string) => {
  let role = "";
  switch (type) {
    case "ST":
      role = "Student";
      break;
    case "DE":
      role = "Dean";
      break;
    case "HO":
      role = "HOD";
      break;
    case "SA":
      role = "Student_Affairs";
      break;
    default:
      role = "";
      break;
  }

  return role;
};

export const userRoleProfile = (type: string) => {
  let role = type;
  switch (type) {
    case "Student_Affairs":
      role = "Student Affairs";
      break;
    case "HOD":
      role = "Head of Department";
      break;
    default:
      role = type;
      break;
  }

  return role;
};

export const userOpt = (role: Role) => {
  let opt = { label: "", value: "" };
  switch (role) {
    case "Student_Affairs":
      opt = { label: "Student Affairs", value: "SA" };
      break;
    case "Dean":
      opt = { label: "DEAN", value: "DE" };
      break;
    case "HOD":
      opt = { label: "HOD", value: "HO" };
      break;
    case "Student":
      opt = { label: "Student", value: "ST" };
      break;
    default:
      opt = { label: "", value: "" };
      break;
  }
  return opt;
};
