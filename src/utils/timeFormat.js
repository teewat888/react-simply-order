// format date to dd-mm-yyyy
export const formatDate = (mdate) => {
  const d = new Date(mdate);
  return d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();
};
