//to check the expiration of jwt

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
    if (decodeJwt.exp * 1000 < Date.now()) {
      handleUnAuth();
    }
  }
};
