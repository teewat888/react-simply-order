import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      light: "#ffb04c",
      main: "#f57f17",
      dark: "#bc5100",
      contrastText: "#000000",
    },
    secondary: {
      light: "#f9683a",
      main: "#bf360c",
      dark: "#870000",
      contrastText: "#ffffff",
    },
  },
});

export default theme;
