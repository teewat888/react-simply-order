import React from "react";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

export const SkeletonLoading = (props) => {
  const skeletons = [];
  for (let i = 1; i < 25; i++) {
    skeletons.push(<Skeleton key={i} />);
  }
  return (
    <>
      <Box sx={{ width: "80%", height: "100%", mt: "2em" }}>{skeletons}</Box>
    </>
  );
};
