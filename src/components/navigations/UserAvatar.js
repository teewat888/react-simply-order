import React from "react";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth-slice";

export const UserAvatar = () => {
  const dispatch = useDispatch();
  const settings = [
    { name: "Profile", link: "/profile" },
    { name: "Account", link: "/" },
    { name: "Dashboard", link: "/login" },
    { name: "Logout", link: "/logout" },
  ];
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLogout = () => {
    dispatch(authActions.logout());
  };
  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt="Teerawat">T</Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settings.map((setting) => {
          if (setting.name === "Logout") {
            return (
              <MenuItem key={setting.name} onClick={handleLogout}>
                <Typography textAlign="center">{setting.name}</Typography>
              </MenuItem>
            );
          } else {
            return (
              <MenuItem
                key={setting.name}
                onClick={handleCloseUserMenu}
                component={Link}
                to={setting.link}
              >
                <Typography textAlign="center">{setting.name}</Typography>
              </MenuItem>
            );
          }
        })}
      </Menu>
    </Box>
  );
};
