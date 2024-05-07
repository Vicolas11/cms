import { IOpt } from "./props.interface";
import { Role } from "./userData.interface";

export interface SelectOptType {
  user: IOpt | null | undefined;
  dept: IOpt | null | undefined;
  facult: IOpt | null | undefined;
  gender: IOpt | null | undefined;
}

export interface SelectEditOptType {
  [key: string]: IOpt | null | undefined;
}

export interface InputValueType {
  [key: string]: string;
}

export interface InputIsValidType {
  [key: string]: boolean;
}

export interface DetailType {
  [key: string]: string | boolean;
}

export interface GetFaculty {
  role?: Role;
  perPage?: number;
  currentPage?: number;
}

export interface GetFacultResp {
  id: string;
  name: string;
  faculty: string | null;
  department: string | null;
}

export type GetFacultType = GetFacultResp[] | null | undefined;
