import React from "react";
import TableRow from "@mui/material/TableRow";

import TableCell from "@mui/material/TableCell";
import { useNavigate } from "react-router-dom";

export const ProductTemplateItem = ({ product }) => {
  const navigate = useNavigate();
  return (
    <TableRow
      key={product.id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="product">
        {product.name}
      </TableCell>
      <TableCell align="left"></TableCell>
    </TableRow>
  );
};
