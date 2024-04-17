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
    { value: "econs", label: "Economics" },
    { value: "bus", label: "Business Administration" },
    { value: "pub", label: "Public Administration" },
    { value: "crime", label: "Criminology" },
    { value: "csc", label: "Computer Science" },
    { value: "tech", label: "Information Technology" },
    { value: "micro", label: "Microbiology" },
    { value: "bio", label: "Biochemistry" },
    { value: "els", label: "English and Literally Studies" },
    { value: "edu", label: "Computer Education" },
    { value: "ird", label: "International Relation and Diplomacy" },
    { value: "account", label: "Accounting" },
    { value: "law", label: "Law" },
    { value: "bot", label: "Botany" },
  ];
  
  export const facultyOpts = [
    { value: "law", label: "College of Law" },
    { value: "manage", label: "College of Management Studies" },
    { value: "science", label: "College of Applied Sciences" },
    { value: "tech", label: "College of Information Technology" },
    { value: "edu", label: "College of Education" },
  ];

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
  ];
  
  export const selectReportArrFunc = (arg: any) => [
    {
      opts: usersOpts.filter((val) => val.value !== "ST"),
      ph: "Who am reporting to",
      name: "user",
      show: true,
    },
    {
      opts: deptOpts,
      ph: "Select Department",
      name: "dept",
      show: arg?.value === "HO",
    },
    {
      opts: facultyOpts,
      ph: "Select Faculty",
      name: "facult",
      show: arg?.value === "DE",
    },
  ];