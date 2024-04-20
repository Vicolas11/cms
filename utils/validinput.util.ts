export const isValidEmail = (value: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
};

export const isValidMatric = (value: string) => {
  const matricRegex = /^(SU|su)(20[0-9][0-9])([0-9]{4})[tT]?$/;
  return matricRegex.test(value);
};

export const isValidFullName = (value: string) => {
  const fullNameRegex = /^(?!\s)([a-zA-Z]{2,})+(?:\s([a-zA-Z]{2,})+)+$/;
  return fullNameRegex.test(value);
};

export const isValidAll = (value: string, type: string) => {
  let result = false;
  switch (type) {
    case "email":
      result = isValidEmail(value);
      break;
    case "password":
      result = value.length >= 6;
      break;
    case "matricNum":
      result = isValidMatric(value);
      break;
    case "full_name":
      result = isValidFullName(value);
      break;
    default:
      result = false;
      break;
  }
  return result;
};

export const isValidCheck = (name: string, value: string, inputValue: any) => {
  let isValid = false;
  switch (name) {
    case "New Password":
      isValid = value.length < 6;
      break;
    case "Confirm Password":
      isValid = value !== inputValue["New Password"];
      break;
    default:
      isValid = false;
      break;
  }

  return isValid;
};
