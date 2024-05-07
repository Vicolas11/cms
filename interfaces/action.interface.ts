import { Department, Faculty, Role } from "./userData.interface";

export interface LoginStudParams {
  matricNum: string;
  password: string;
}

export interface LoginUserParams {
  email: string;
  password: string;
}

export interface RegisterUserParams {
  username: string;
  password: string;
  email: string;
}

export interface ChangePasswordParams {
  id: string;
  oldpassword: string;
  newpassword: string;
}

export interface ForgetPasswordParams {
  email: string;
}

export interface ResetPasswordParams {
  otp: string;
  email: string;
  password: string;
}

export interface ComplaintResp {
  id: string;
  subject: string;
  body: string;
  reportedToUserId: string;
  complainerUserId: string;
  hasReplied: boolean;
  hasOpened: boolean;
  createdAt: string;
  responseId: string | null;
  reportedTo: {
    id: string;
    name: string;
    faculty: Faculty;
    department: Department;
    role: Role;
  };
}

export interface AComplaintResp {
  id: string;
  subject: string;
  body: string;
  reportedToUserId: string;
  complainerUserId: string;
  hasReplied: true;
  hasOpened: true;
  createdAt: string;
  responseId: string | null;
  reportedTo: {
    id: string;
    name: string;
    faculty: Faculty | null;
    department: Department | null;
    role: Role;
  };
  complainer: {
    id: string;
    name: string;
    faculty: Faculty | null;
    department: Department | null;
    role: Role;
  }
  response: {
    body: string;
    createdAt: string;
  };
}

export interface ReComplaintResp {
  error: any;
  totalCount: number;
  data: ComplaintResp[];
}
