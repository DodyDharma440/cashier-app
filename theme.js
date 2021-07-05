import { createMuiTheme } from "@material-ui/core/styles";
import { green, yellow, red } from "@material-ui/core/colors";

const theme = createMuiTheme({
  typography: {
    fontFamily: ["'Inter'", "sans-serif"].join(","),
  },
  palette: {
    primary: {
      main: "#ff6380",
      light: "#ff8299",
      dark: "#b24559",
    },
    secondary: {
      main: "#261d56",
      light: "#514a77",
      dark: "#1a143c",
    },
    success: {
      main: green[400],
      light: green[100],
      dark: green[700],
    },
    error: {
      main: red[400],
      light: red[100],
      dark: red[700],
    },
    warning: {
      main: yellow[400],
      light: yellow[100],
      dark: yellow[700],
    },
  },
});

export default theme;
