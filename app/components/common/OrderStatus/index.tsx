import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Chip } from "@material-ui/core";
import clsx from "clsx";
import { OrderStatus as OrderStatusEnum } from "@enums/order";

type Props = {
  status: OrderStatusEnum;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      borderRadius: theme.spacing(1),
      textTransform: "capitalize",
    },
    success: {
      border: `1px solid ${theme.palette.success.main}`,
      backgroundColor: theme.palette.success.light,
    },
    warning: {
      border: `1px solid ${theme.palette.warning.main}`,
      backgroundColor: theme.palette.warning.light,
    },
    error: {
      border: `1px solid ${theme.palette.error.main}`,
      backgroundColor: theme.palette.error.light,
    },
  })
);

const OrderStatus: React.FC<Props> = ({ status }) => {
  const classes = useStyles();

  return (
    <Chip
      className={clsx(classes.root, {
        [classes.success]: status === OrderStatusEnum.selesai,
        [classes.warning]: status === OrderStatusEnum.diproses,
        [classes.error]: status === OrderStatusEnum.dibatalkan,
      })}
      label={status}
    />
  );
};

export default OrderStatus;
