export type Role = "Admin" | "Student" | "Dean" | "HOD" | "Student_Affairs";

export type Faculty =
  | "Science"
  | "Education"
  | "Information"
  | "Law"
  | "Management";

export type Department =
  | "Accounting"
  | "Biochemistry"
  | "Botany"
  | "Business"
  | "ComputerSci"
  | "ComputerEdu"
  | "Criminology"
  | "Economics"
  | "English"
  | "Information"
  | "International"
  | "Law"
  | "Microbiology"
  | "Public";

export type Gender = "Male" | "Female";

export interface DecodedUserType {
  id: string;
  role: Role;
}

export interface UserProfile {
  name: string;
  email: string;
  matricNum: string;
  avatar: string;
  gender: Gender;
  faculty: Faculty | null;
  department: Department | null;
  createdAt: string;
  role: Role | undefined | null;
  numOfNotReplied: number;
}

export interface UserData {
  userId: string;
  role: Role;
}
