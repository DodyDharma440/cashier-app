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
  Grid,
} from "@material-ui/core";
import { currencyFormatter } from "@utils/currency";
import {
  HiOutlineEye,
  HiOutlineTrash,
  HiOutlinePencilAlt,
} from "react-icons/hi";
import { dateFormatter } from "@utils/dateTimeFormat";

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
      flex: 1,
    },
    gridOrderData: {
      alignItems: "center",
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

  const { _id, orderName, products, status, totalPrice, createdAt } = item;

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
        <Grid container className={classes.gridOrderData}>
          <Grid item xs={12} md={6} lg={3}>
            <Typography className={classes.title} variant="h6">
              {orderName}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Typography variant="caption">
              {dateFormatter(createdAt)}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <div className={classes.orderThumbContainer}>
              {products.slice(0, 5).map((product: any) => (
                <Avatar
                  key={product.productId}
                  className={classes.avatar}
                  alt={orderName}
                  src={product.imageUrl}
                />
              ))}
            </div>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Typography>{currencyFormatter(Number(totalPrice))}</Typography>
          </Grid>
        </Grid>
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
