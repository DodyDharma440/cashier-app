import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import clsx from "clsx";

type Props = {
  children: React.ReactNode;
  vertical?: boolean;
  horizontal?: boolean;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      height: "100%",
      "&::-webkit-scrollbar": {
        width: 8,
        height: 8,
      },
      "&::-webkit-scrollbar-button": {
        width: 0,
        height: 0,
      },
      "&::-webkit-scrollbar-thumb": {
        background: theme.palette.primary.main,
        borderRadius: "4px",
      },
      "&::-webkit-scrollbar-thumb:active": {
        background: theme.palette.primary.dark,
      },
      "&::-webkit-scrollbar-track": {
        background: "#ccc",
        borderRadius: "4px",
      },
    },
    verticalScroll: {
      overflowY: "auto",
    },
    horizontalScroll: {
      overflow: "auto",
      whiteSpace: "nowrap",
    },
  })
);

const ScrollContainer: React.FC<Props> = ({
  children,
  vertical,
  horizontal,
}) => {
  const classes = useStyles();

  return (
    <div
      className={clsx(classes.container, {
        [classes.verticalScroll]: vertical,
        [classes.horizontalScroll]: horizontal,
      })}
    >
      {children}
    </div>
  );
};

export default ScrollContainer;
