import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";

import Button from "@mui/material/Button";

import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import { UserAvatar } from "./UserAvatar";
import { useSelector } from "react-redux";

const ResponsiveAppBar = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.user.role.name);

  let pages = [];
  if (!isLoggedIn) {
    pages = [
      { name: "Help", link: "/products" },
      { name: "About", link: "/product/new" },
      { name: "Login", link: "/login" },
    ];
  } else {
    switch (role) {
      case "customer":
        pages = [
          { name: "Help", link: "/order/new" },
          { name: "About", link: "/about" },
        ];
        break;
      case "vendor":
        pages = [
          { name: "Help", link: "/products" },
          { name: "About", link: "/product/new" },
        ];
        break;
      case "admin":
        pages = [
          { name: "Product managment", link: "/products" },
          { name: "User managment", link: "/product/new" },
          { name: "Help", link: "/login" },
        ];
        break;
      default:
        pages = [
          { name: "Products", link: "/products" },
          { name: "Create new product", link: "/product/new" },
          { name: "Login", link: "/login" },
        ];
    }
  }

  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <>
      <AppBar position="sticky" color="primary">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
            >
              SIMPLY ORDER
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page, i) => (
                  <MenuItem
                    key={i}
                    onClick={handleCloseNavMenu}
                    component={Link}
                    to={page.link}
                  >
                    <Typography textAlign="center">{page.name}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
            >
              SIMPLY ORDER
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page.name}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                  component={Link}
                  to={page.link}
                >
                  {page.name}
                </Button>
              ))}
            </Box>
            {isLoggedIn && <UserAvatar display={true} />}
            {!isLoggedIn && <UserAvatar display={false} />}
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};
export default ResponsiveAppBar;
