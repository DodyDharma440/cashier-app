import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Typography, Box, CircularProgress } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    },
    text: {
      margin: `${theme.spacing(1)}px 0px`,
    },
  })
);

const AppLoading = () => {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <Box style={{ textAlign: "center" }}>
        <CircularProgress color="primary" />
        <Box className={classes.text}>
          <Typography>Please wait</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default AppLoading;
