import { GetFacultType } from "@/interfaces/generic.interface";
import { getDept, getFaculty } from "@/utils/getDeptFaculty.util";

export const optArr = [
  { name: "A", ph: "Option A", opt: "opt1" },
  { name: "B", ph: "Option B", opt: "opt2" },
  { name: "C", ph: "Option C", opt: "opt3" },
  { name: "D", ph: "Option D", opt: "opt4" },
];

export const usersOpts = [
  { value: "ST", label: "Student" },
  { value: "SA", label: "Student Affairs" },
  { value: "HO", label: "HOD" },
  { value: "DE", label: "DEAN" },
];

export const deptOpts = [
  { value: "Economics", label: "Economics" },
  { value: "Business", label: "Business Administration" },
  { value: "Public", label: "Public Administration" },
  { value: "Criminology", label: "Criminology" },
  { value: "ComputerSci", label: "Computer Science" },
  { value: "Information", label: "Information Technology" },
  { value: "Microbiology", label: "Microbiology" },
  { value: "Biochemistry", label: "Biochemistry" },
  { value: "English", label: "English and Literally Studies" },
  { value: "ComputerSci", label: "Computer Education" },
  { value: "International", label: "International Relation and Diplomacy" },
  { value: "Accounting", label: "Accounting" },
  { value: "Law", label: "Law" },
  { value: "Botany", label: "Botany" },
];

export const facultyOpts = [
  { value: "Law", label: "College of Law" },
  { value: "Management", label: "College of Management Studies" },
  { value: "Science", label: "College of Applied Sciences" },
  { value: "Information", label: "College of Information Technology" },
  { value: "Education", label: "College of Education" },
];

export const genderOpts = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
];

export const facultyOpts_ = (data: GetFacultType) =>
  data
    ? data.map((itm) => ({
        value: itm.id,
        label: `${itm.name} (${getFaculty(itm.faculty as string)})`,
      }))
    : [];

export const departmentOpts_ = (data: GetFacultType) =>
  data
    ? data.map((itm) => ({
        value: itm.id,
        label: `${itm.name} (${getDept(itm.department as string)})`,
      }))
    : [];

export const selectArrFunc = (user: any) => [
  { opts: usersOpts, ph: "Select User Type", name: "user", show: true },
  {
    opts: deptOpts,
    ph: "Select Department",
    name: "dept",
    show: user?.value === "HO" || user?.value === "ST",
  },
  {
    opts: facultyOpts,
    ph: "Select Faculty",
    name: "facult",
    show: user?.value === "DE",
  },
  {
    opts: genderOpts,
    ph: "Select Gender",
    name: "gender",
    show: true,
  },
];

export const selectReportArrFunc = (
  arg: any,
  facult: GetFacultType,
  depart: GetFacultType
) => [
  {
    opts: usersOpts.filter((val) => val.value !== "ST"),
    ph: "Who am reporting to",
    name: "user",
    show: true,
  },
  {
    opts: departmentOpts_(depart),
    ph: "Select Department",
    name: "dept",
    show: arg?.value === "HO",
  },
  {
    opts: facultyOpts_(facult),
    ph: "Select Faculty",
    name: "facult",
    show: arg?.value === "DE",
  },
];
