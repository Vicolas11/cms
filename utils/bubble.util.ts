export const bubbleText = (num: string) => {
  let result = num;
  if (+num > 9) {
    result = "9+";
  }

  return result;
};
