import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import {
  Paper,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  IconButton,
  Typography,
} from "@material-ui/core";
import { HiPlus } from "react-icons/hi";
import { IProduct } from "@custom-types/product";
import { currencyFormatter } from "@utils/currency";

type Props = {
  product: IProduct;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      borderRadius: theme.spacing(2),
      boxShadow: "2px 1px 9px 0px #0000002e",
    },
    media: {
      height: 0,
      paddingTop: "75%",
    },
    content: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    title: {
      textTransform: "capitalize",
      color: "#333",
      fontWeight: "bold",
      "&:hover": {
        color: theme.palette.secondary.light,
        cursor: "pointer",
      },
    },
    price: {
      color: "#666",
    },
    actions: {
      padding: theme.spacing(2),
    },
    addBtn: {
      textTransform: "capitalize",
      borderRadius: theme.spacing(1),
    },
  })
);

const CardProduct: React.FC<Props> = ({ product }) => {
  const classes = useStyles();
  const { productName, imageUrl, price } = product;

  return (
    <Card className={classes.root} elevation={0}>
      <CardMedia
        className={classes.media}
        title={productName}
        image={imageUrl}
      />

      <CardContent className={classes.content}>
        <Typography className={classes.title} variant="body1">
          {productName}
        </Typography>
        <Typography className={classes.price} variant="body2">
          {currencyFormatter(Number(price))}
        </Typography>
      </CardContent>
      <CardActions className={classes.actions}>
        <Button
          className={classes.addBtn}
          fullWidth
          color="primary"
          variant="contained"
          startIcon={<HiPlus size={20} />}
        >
          Add to list
        </Button>
      </CardActions>
    </Card>
  );
};

export default CardProduct;
