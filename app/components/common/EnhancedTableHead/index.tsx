import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@material-ui/core";
import { Order } from "@custom-types/table";

type Props = {
  onRequestSort: (e: React.MouseEvent<unknown>, property: any) => void;
  order: Order;
  orderBy: string;
  headCells: any;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    visuallyHidden: {
      border: 0,
      clip: "rect(0 0 0 0)",
      height: 1,
      margin: -1,
      overflow: "hidden",
      padding: 0,
      position: "absolute",
      top: 20,
      width: 1,
    },
  })
);

const EnhancedTableHead: React.FC<Props> = ({
  onRequestSort,
  order,
  orderBy,
  headCells,
}) => {
  const classes = useStyles();
  const createSortHandler =
    (property: any) => (e: React.MouseEvent<unknown>) => {
      onRequestSort(e, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell>ID</TableCell>
        {headCells.map((headCell: any) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id && (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted desc" : "sorted asc"}
                </span>
              )}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell>Aksi</TableCell>
      </TableRow>
    </TableHead>
  );
};

export default EnhancedTableHead;
