import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Divider, Typography, Button, TextField } from "@material-ui/core";
import { IProductCart } from "@custom-types/product";
import { currencyFormatter } from "@utils/currency";

type Props = {
  item: IProductCart;
  onIncreaseQty: (id: string) => void;
  onDecreaseQty: (id: string) => void;
  onChangeNote: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBottom: theme.spacing(2),
    },
    container: {
      display: "flex",
      marginBottom: theme.spacing(1),
    },
    image: {
      width: "25%",
      height: 96,
      boxShadow: "1px 1px 4px #0000003d",
      borderRadius: theme.spacing(1),
    },
    content: {
      flex: 1,
      paddingLeft: theme.spacing(2),
    },
    contentTop: {
      width: "100%",
      height: "60%",
      alignItems: "flex-start",
      justifyContent: "space-between",
      display: "flex",
      paddingBottom: theme.spacing(2),
    },
    title: {
      fontWeight: "bold",
    },
    counterWrapper: {
      display: "flex",
      alignItems: "center",
    },
    counterButton: {
      padding: `6px 12px`,
      minWidth: 0,
      minHeight: 0,
      lineHeight: 1,
      fontSize: 16,
    },
    qtyLabel: {
      margin: `0px ${theme.spacing(1)}px`,
    },
  })
);

const ItemCart: React.FC<Props> = ({
  item,
  onChangeNote,
  onDecreaseQty,
  onIncreaseQty,
}) => {
  const classes = useStyles();
  const { _id, productName, price, imageUrl, quantity, note } = item;

  return (
    <>
      <div className={classes.root}>
        <div className={classes.container}>
          <div
            className={classes.image}
            style={{
              backgroundImage: `url(${imageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className={classes.content}>
            <div className={classes.contentTop}>
              <div>
                <Typography variant="body1" className={classes.title} noWrap>
                  {productName}
                </Typography>
                <Typography variant="caption" noWrap>
                  {currencyFormatter(Number(price))}
                </Typography>
              </div>
              <div className={classes.counterWrapper}>
                <Button
                  onClick={() => onDecreaseQty(_id)}
                  className={classes.counterButton}
                  variant="contained"
                  color="primary"
                >
                  -
                </Button>
                <Typography className={classes.qtyLabel}>{quantity}</Typography>
                <Button
                  onClick={() => onIncreaseQty(_id)}
                  className={classes.counterButton}
                  variant="contained"
                  color="primary"
                >
                  +
                </Button>
              </div>
            </div>
            <TextField
              name={_id}
              value={note}
              onChange={onChangeNote}
              placeholder="Catatan..."
              fullWidth
              autoComplete="off"
            />
          </div>
        </div>
        <Divider />
      </div>
    </>
  );
};

export default ItemCart;
