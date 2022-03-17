// to define promise resp function from fetch api
export const respFunc = (resp) => {
  if (resp.headers.get("jwt") !== null) {
    console.log("jwt = ", resp.headers.get("jwt"));
    localStorage.setItem("jwt", resp.headers.get("jwt"));
  }
  return resp.json();
};
