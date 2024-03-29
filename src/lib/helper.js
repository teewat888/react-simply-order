import React from "react";

// to define promise resp function from fetch api
export const respFunc = (resp) => {
  if (resp.headers.get("jwt") !== null) {
   
    localStorage.setItem("jwt", resp.headers.get("jwt"));
  }
  return resp.json();
};

export const confObjwithBody = (method, body) => {
  return {
    method: `${method}`,
    headers: {
      "content-type": "application/json",
      accept: "application/json",
    },
    body: body,
  };
};

export const confObjAuth = (method) => {
  return {
    method: `${method}`,
    headers: {
      "content-type": "application/json",
      accept: "application/json",
      Authorization: "Bearer " + localStorage.getItem("jwt"),
    },
  };
};
export const confObjAuthwithBody = (method, body) => {
  return {
    method: `${method}`,
    headers: {
      "content-type": "application/json",
      accept: "application/json",
      Authorization: "Bearer " + localStorage.getItem("jwt"),
    },
    body: body,
  };
};

export const errCatch = (e) => {
  console.log("error: ", e);
  //localStorage.clear();
};

export const renderHTML = (escapedHTML) => {
  return React.createElement("div", {
    dangerouslySetInnerHTML: { __html: escapedHTML },
  });
};
