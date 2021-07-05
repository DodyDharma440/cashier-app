import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  Avatar,
  IconButton,
} from "@material-ui/core";
import { currencyFormatter } from "@utils/currency";
import {
  HiOutlineEye,
  HiOutlineTrash,
  HiOutlinePencilAlt,
} from "react-icons/hi";

type Props = {
  item: any;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      boxShadow: "0px 2px 5px #00000057",
      marginBottom: theme.spacing(2),
      display: "flex",
      [theme.breakpoints.down("sm")]: {
        display: "block",
      },
    },
    cardContent: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flex: 1,
      [theme.breakpoints.down("xs")]: {
        display: "block",
      },
    },
    success: {
      borderLeft: `4px solid ${theme.palette.success.main}`,
    },
    warning: {
      borderLeft: `4px solid ${theme.palette.warning.main}`,
    },
    error: {
      borderLeft: `4px solid ${theme.palette.error.main}`,
    },
    title: {
      fontWeight: 600,
    },
    orderThumbContainer: {
      display: "flex",
      flexWrap: "wrap",
      margin: `${theme.spacing(2)}px 0px`,
    },
    avatar: {
      width: theme.spacing(3),
      height: theme.spacing(3),
      marginRight: theme.spacing(1),
    },
  })
);

const OrderItem: React.FC<Props> = ({ item }) => {
  const classes = useStyles();
  const [totalPrice, setTotalPrice] = useState<any>(0);

  const { id, orderName, products, status } = item;

  useEffect(() => {
    let total = 0;

    products.forEach((product: any) => {
      const price = Number(product.price * product.quantity);

      total += price;
    });

    setTotalPrice(total);

    console.log(totalPrice);
  }, []);

  return (
    <Card
      className={clsx(classes.root, {
        [classes.success]: status === "selesai",
        [classes.warning]: status === "diproses",
        [classes.error]: status === "dibatalkan",
      })}
      elevation={0}
    >
      <CardContent className={classes.cardContent}>
        <Typography className={classes.title} variant="h6">
          {orderName}
        </Typography>
        <Typography variant="caption">04 Jul 2021</Typography>
        <div className={classes.orderThumbContainer}>
          {products.slice(0, 5).map((product: any, index: number) => (
            <Avatar
              className={classes.avatar}
              alt={orderName}
              src={product.imageUrl}
            />
          ))}
        </div>
        <Typography>{currencyFormatter(totalPrice)}</Typography>
      </CardContent>
      <CardActions>
        <IconButton color="secondary">
          <HiOutlineEye />
        </IconButton>
        <IconButton color="secondary">
          <HiOutlineTrash />
        </IconButton>
        <IconButton color="secondary">
          <HiOutlinePencilAlt />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default OrderItem;
