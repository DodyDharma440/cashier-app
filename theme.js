import { createMuiTheme } from "@material-ui/core/styles";

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
  },
});

export default theme;
