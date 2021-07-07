import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";

type Props = {
  children: React.ReactNode;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: "fixed",
      backgroundColor: "white",
      bottom: 0,
      right: 0,
      top: 0,
      width: 460,
      [theme.breakpoints.down("md")]: {
        position: "unset",
        width: "100%",
        backgroundColor: "inherit",
      },
    },
  })
);

const SidebarRight: React.FC<Props> = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.root}>{children}</div>;
};

export default SidebarRight;
