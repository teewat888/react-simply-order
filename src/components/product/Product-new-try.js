import React from "react";
import TableRow from "@mui/material/TableRow";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import { useNavigate } from "react-router-dom";

export const Product = ({ product }) => {
  const navigate = useNavigate();
  return (
    <TableRow
      key={product.id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="product">
        {product.name}
      </TableCell>
      <TableCell align="left">
        <IconButton
          aria-label="edit"
          color="primary"
          onClick={() => {
            navigate(`/vendor/products/edit/${product.id}`);
          }}
        >
          <EditIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};
