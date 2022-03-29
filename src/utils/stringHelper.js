export const stringHelper = (str) => {
  return str.trim();
};

export const correctStr = (str) => {
  if (str.length === 0) {
    return "0";
  } else return str;
};
