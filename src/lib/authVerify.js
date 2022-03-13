//to check the expiration of jwt in localstorage

export const authVerify = (handleUnAuth) => {
  const parseJwt = (token) => {
    try {
      //return JSON.parse(atob(token.split(".")[1]));
      //convert from depreciated atob to Buffer.from
      return JSON.parse(
        Buffer.from(token.split(".")[1], "base64").toString("ascii")
      );
    } catch (e) {
      return null;
    }
  };
  const decodeJwt = parseJwt(localStorage.getItem("jwt"));
  if (decodeJwt !== null) {
    if (decodeJwt.exp * 1000 < Date.now()) {
      handleUnAuth();
    }
  }
};
