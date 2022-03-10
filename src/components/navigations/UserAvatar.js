import React from "react";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions, doLogout } from "../../store/auth-slice";

export const UserAvatar = ({ display }) => {
  const role = useSelector((state) => state.auth.user.role);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const settings =
    role === "customer"
      ? [
          { name: "Profile", link: "/profile" },
          { name: "My order templates", link: "/" },
          { name: "My orders", link: "/customer/orders" },
          { name: "Logout", link: "/logout" },
        ]
      : [
          { name: "Profile", link: "/profile" },
          { name: "Account", link: "/" },
          { name: "My products", link: "/vendor/products" },
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
    dispatch(doLogout());
    navigate("/login");
  };
  if (display) {
    return (
      <>
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
      </>
    );
  } else {
    return <Box sx={{ width: "2.5em" }}></Box>;
  }
};
