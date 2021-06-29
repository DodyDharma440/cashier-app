import React from "react";
import { Box, Typography, Divider } from "@material-ui/core";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";

type Props = {
  title: string;
  rightSide?: () => void;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBottom: theme.spacing(2),
    },
    wrapper: {
      margin: `${theme.spacing(1)}px 0px`,
      display: "flex",
      alignItems: "center",
    },
    title: {
      flex: 1,
    },
    titleText: {
      fontWeight: 600,
    },
  })
);

const HeaderTitle: React.FC<Props> = ({ title, rightSide }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Box className={classes.wrapper}>
        <Box className={classes.title}>
          <Typography className={classes.titleText} variant="h5">
            {title}
          </Typography>
        </Box>
        {rightSide && rightSide()}
      </Box>
      <Divider />
    </div>
  );
};

export default HeaderTitle;
