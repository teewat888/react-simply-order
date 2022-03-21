//to check the expiration of jwt in localstorage

export const authVerify = (handleUnAuth) => {
  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };
  const decodeJwt = parseJwt(localStorage.getItem("jwt"));
  if (decodeJwt !== null) {
    console.log("jwt|now", decodeJwt.exp * 1000, Date.now());
    if (decodeJwt.exp * 1000 < Date.now()) {
      handleUnAuth();
    }
  }
};
