export const getDept = (dept: string) => {
  let result = dept;
  switch (dept) {
    case "Business":
      result = "Business Administration";
      break;
    case "ComputerSci":
      result = "Computer Science";
      break;
    case "ComputerEdu":
      result = "Computer Education";
      break;
    case "English":
      result = "English and Literally Studies";
      break;
    case "Information":
      result = "Information Technology";
      break;
    case "International":
      result = "International Relation and Diplomacy";
      break;
    case "Public":
      result = "Public Administration";
      break;
    default:
      result = dept;
      break;
  }

  return result;
};

export const getFaculty = (faculty: string) => {
  let result = faculty;
  switch (faculty) {
    case "Science":
      result = "Applied Sciences";
      break;
    case "Information":
      result = "Information Technology";
      break;
    case "Management":
      result = "Management Studies";
      break;
    default:
      result = faculty;
      break;
  }

  return result;
};
