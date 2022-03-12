import React from "react";
import TableRow from "@mui/material/TableRow";

import TableCell from "@mui/material/TableCell";
import { useNavigate } from "react-router-dom";
import AutoAwesomeMotionIcon from "@mui/icons-material/AutoAwesomeMotion";
import IconButton from "@mui/material/IconButton";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

export const Vendor = ({ vendor }) => {
  const navigate = useNavigate();

  return (
    <TableRow
      key={vendor.id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="vendor">
        {vendor.company_name}
      </TableCell>
      <TableCell align="left">
        <Tooltip title="Create template">
          <IconButton
            onClick={() => {
              navigate(`/order_templates/vendor/${vendor.id}`);
            }}
          >
            <AutoAwesomeMotionIcon />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
};
