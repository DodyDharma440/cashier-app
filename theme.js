import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  typography: {
    fontFamily: ["'Inter'", "sans-serif"].join(","),
  },
  palette: {
    primary: {
      main: "#fb9300",
      light: "#fba833",
      dark: "#af6600",
    },
    secondary: {
      main: "#424642",
      light: "#676b67",
      dark: "#2e312e",
    },
  },
});

export default theme;
