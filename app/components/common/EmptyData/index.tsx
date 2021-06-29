import React from "react";
import Image from "next/image";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Paper, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(4),
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
  })
);

const EmptyData = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Image
        src="/assets/images/empty-illustration.jpg"
        alt="empty illustration"
        width="400"
        height="400"
      />
      <Typography>Data masih kosong.</Typography>
    </Paper>
  );
};

export default EmptyData;
