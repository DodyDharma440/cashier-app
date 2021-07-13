import React, { useState } from "react";
import {
  makeStyles,
  createStyles,
  Theme,
  useTheme,
} from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Divider,
  Button,
  Collapse,
  IconButton,
} from "@material-ui/core";
import clsx from "clsx";
import Swal from "sweetalert2";
import { HiOutlineChevronDown } from "react-icons/hi";
import { IOrder } from "@custom-types/order";
import { OrderStatus as OrderStatusEnum } from "@enums/order";
import { dateFormatter } from "@utils/dateTimeFormat";
import { currencyFormatter } from "@utils/currency";
import { OrderStatus, LoadingDialog } from "@components/common";
import { useDisclosure, useProcess } from "@hooks/index";
import { updateOrderStatus } from "@actions/order";

type Props = {
  item: IOrder;
};

type LiProps = {
  label: string;
  children: React.ReactNode;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      borderRadius: theme.spacing(2),
      boxShadow: "0px 2px 5px #00000057",
    },
    titleWrapper: {
      textAlign: "center",
    },
    title: {
      fontWeight: 600,
    },
    divider: {
      margin: `${theme.spacing(2)}px 0px`,
    },
    listItem: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: theme.spacing(2),
    },
    listItemLabel: {
      opacity: 0.7,
    },
    listItemVal: {
      fontWeight: 500,
    },
    button: {
      borderRadius: theme.spacing(1),
      textTransform: "capitalize",
      marginTop: theme.spacing(1),
      boxShadow: "none",
    },
    cardActions: {
      justifyContent: "center",
      paddingTop: 0,
    },
    expand: {
      transform: "rotate(0deg)",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: "rotate(180deg)",
    },
  })
);

const ListItem: React.FC<LiProps> = ({ label, children }) => {
  const classes = useStyles();

  return (
    <div className={classes.listItem}>
      <Typography className={classes.listItemLabel}>{label}</Typography>
      {children}
    </div>
  );
};

const CardDetail: React.FC<Props> = ({ item }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [detailData, setDetailData] = useState<IOrder>(item);
  const { _id, orderName, products, status, totalPrice, createdAt } =
    detailData;
  const { startLoading, endLoading, isLoading } = useProcess();
  const { isOpen, onToggle } = useDisclosure();

  const handleUpdateStatus = (status: OrderStatusEnum) => {
    startLoading();
    updateOrderStatus(status, _id, theme, (data: any, error: any) => {
      endLoading();
      if (data) {
        setDetailData({ ...detailData, status });
      }
    });
  };

  const handleStatusCancel = () => {
    Swal.fire({
      icon: "question",
      confirmButtonText: "Yakin",
      confirmButtonColor: theme.palette.primary.main,
      showCancelButton: true,
      cancelButtonText: "Batal",
      cancelButtonColor: theme.palette.secondary.main,
      title: "Batalkan Pesanan",
      text: `Yakin untuk membatalkan pesanan ${orderName}?`,
    }).then((result) => {
      if (result.isConfirmed) {
        handleUpdateStatus(OrderStatusEnum.dibatalkan);
      }
    });
  };

  const handleStatusDone = () => {
    Swal.fire({
      icon: "question",
      confirmButtonText: "Yakin",
      confirmButtonColor: theme.palette.primary.main,
      showCancelButton: true,
      cancelButtonText: "Batal",
      cancelButtonColor: theme.palette.secondary.main,
      title: "Selesaikan Pesanan",
      text: `Yakin untuk menyelesaikan pesanan ${orderName}?`,
    }).then((result) => {
      if (result.isConfirmed) {
        handleUpdateStatus(OrderStatusEnum.selesai);
      }
    });
  };

  return (
    <>
      <Card className={classes.root}>
        <CardContent>
          <div className={classes.titleWrapper}>
            <Typography className={classes.title} variant="h4">
              {orderName}
            </Typography>
            <Typography variant="caption" style={{ opacity: 0.8 }}>
              {_id}
            </Typography>
          </div>
          <Divider className={classes.divider} />
          <ListItem label="Dibuat">
            <Typography className={classes.listItemVal}>
              {dateFormatter(createdAt)}
            </Typography>
          </ListItem>
          <ListItem label="Status">
            <OrderStatus status={status} />
          </ListItem>
          <ListItem label="Subtotal">
            <Typography className={classes.listItemVal}>
              {currencyFormatter(Number(totalPrice))}
            </Typography>
          </ListItem>
          <ListItem label="Jumlah Produk">
            <Typography className={classes.listItemVal}>
              {products.length}
            </Typography>
          </ListItem>
          <Divider className={classes.divider} />
        </CardContent>
        {status === OrderStatusEnum.diproses && (
          <>
            <CardActions className={classes.cardActions}>
              <IconButton
                className={clsx(classes.expand, {
                  [classes.expandOpen]: isOpen,
                })}
                onClick={onToggle}
                aria-expanded={isOpen}
                aria-label="Lihat aksi"
              >
                <HiOutlineChevronDown />
              </IconButton>
            </CardActions>
            <Collapse in={isOpen} timeout="auto" unmountOnExit>
              <CardContent>
                <Button
                  className={classes.button}
                  fullWidth
                  color="primary"
                  variant="contained"
                  onClick={handleStatusDone}
                >
                  Tandai Selesai
                </Button>
                <Button
                  className={classes.button}
                  fullWidth
                  color="default"
                  variant="contained"
                  onClick={handleStatusCancel}
                >
                  Batalkan Pesanan
                </Button>
              </CardContent>
            </Collapse>
          </>
        )}
      </Card>
      {isLoading && <LoadingDialog />}
    </>
  );
};

export default CardDetail;
