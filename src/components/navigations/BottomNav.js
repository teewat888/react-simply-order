import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Home from "@mui/icons-material/Home";
import AutoAwesomeMotionIcon from "@mui/icons-material/AutoAwesomeMotion";
import HistoryIcon from "@mui/icons-material/History";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { useNavigate } from "react-router-dom";

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  return (
    <Box sx={{ width: "100%" }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        sx={{
          width: "100%",
          position: "fixed",
          bottom: 0,
          alignItems: "center",
        }}
      >
        <BottomNavigationAction
          label="Home"
          icon={<Home />}
          onClick={() => {
            navigate("/");
          }}
        />
        <BottomNavigationAction
          label="Templates"
          icon={<AutoAwesomeMotionIcon />}
          onClick={() => {
            navigate("/test");
          }}
        />
        <BottomNavigationAction
          label="Past Orders"
          icon={<HistoryIcon />}
          onClick={() => {
            navigate("/");
          }}
        />
        <BottomNavigationAction
          label="Shopping Lists"
          icon={<LocalMallIcon />}
          onClick={() => {
            navigate("/");
          }}
        />
      </BottomNavigation>
    </Box>
  );
}
