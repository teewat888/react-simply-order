export const delay = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// have to use  delay(10).then(()=>doing thing here)
