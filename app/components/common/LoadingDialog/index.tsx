import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { CircularProgress, Modal } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      outline: "none",
    },
    content: {
      backgroundColor: "#fff",
      position: "absolute",
      borderRadius: theme.spacing(1),
      padding: theme.spacing(2),
      outline: "none",
    },
  })
);

const LoadingDialog = () => {
  const classes = useStyles();

  return (
    <Modal className={classes.root} open={true}>
      <div className={classes.content}>
        <CircularProgress />
      </div>
    </Modal>
  );
};

export default LoadingDialog;
