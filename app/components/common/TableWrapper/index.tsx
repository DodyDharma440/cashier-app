import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

type Props = {
  children: React.ReactNode;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tableWrapper: {
      margin: `${theme.spacing(2)}px 0px`,
    },
  })
);

const TableWrapper: React.FC<Props> = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.tableWrapper}>{children}</div>;
};

export default TableWrapper;
