import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Card, CardContent, Typography, Divider } from "@material-ui/core";
import { IOrderProduct } from "@custom-types/order";
import { currencyFormatter } from "@utils/currency";

type Props = {
  item: IOrderProduct;
};

type LiProps = {
  label: string;
  children: React.ReactNode;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      borderRadius: theme.spacing(1),
      boxShadow: "0px 1px 2px #00000057",
    },
    content: {
      display: "flex",
      gap: theme.spacing(1),
      paddingBottom: `${theme.spacing(2)}px !important`,
      alignItems: "center",
    },
    image: {
      width: "35%",
      height: 96,
      boxShadow: "1px 1px 4px #0000003d",
      borderRadius: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    title: {
      textTransform: "capitalize",
      fontWeight: 600,
    },
    listItem: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: theme.spacing(1),
    },
    listItemLabel: {
      opacity: 0.7,
    },
    divider: {
      margin: `${theme.spacing(1)}px 0px`,
    },
  })
);

const ListItem: React.FC<LiProps> = ({ children, label }) => {
  const classes = useStyles();

  return (
    <div className={classes.listItem}>
      <Typography variant="body2" className={classes.listItemLabel}>
        {label}
      </Typography>
      {children}
    </div>
  );
};

const ItemDetailOrder: React.FC<Props> = ({ item }) => {
  const classes = useStyles();
  const { imageUrl, productName, price, quantity } = item;

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <div
          className={classes.image}
          style={{
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div style={{ flex: 1 }}>
          <Typography className={classes.title} variant="body1">
            {productName}
          </Typography>
          <Divider className={classes.divider} />
          <ListItem label="Qty">
            <Typography variant="body2">{quantity}</Typography>
          </ListItem>
          <ListItem label="Total">
            <Typography variant="body2" color="primary">
              {currencyFormatter(Number(price) * quantity)}
            </Typography>
          </ListItem>
        </div>
      </CardContent>
    </Card>
  );
};

export default ItemDetailOrder;
