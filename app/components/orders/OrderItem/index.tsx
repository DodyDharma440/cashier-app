import React, { useState } from "react";
import { useRouter } from "next/router";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import {
  Typography,
  Avatar,
  Paper,
  ListItemIcon,
  ListItemText,
  Grid,
  Chip,
  Menu,
  MenuItem,
  useTheme,
} from "@material-ui/core";
import { AvatarGroup } from "@material-ui/lab";
import {
  HiOutlineEye,
  HiOutlineTrash,
  HiOutlinePencilAlt,
  HiCheck,
  HiX,
} from "react-icons/hi";
import Swal from "sweetalert2";
import { LoadingDialog, OrderStatus } from "@components/common";
import { IOrder } from "@custom-types/order";
import { currencyFormatter } from "@utils/currency";
import { OrderStatus as OrderStatusEnum } from "@enums/order";
import { dateFormatter } from "@utils/dateTimeFormat";
import { useProcess } from "@hooks/index";

type Props = {
  item: IOrder;
  onDelete: (id: string, cb: () => void) => void;
  onUpdateStatus: (status: OrderStatusEnum, id: string, cb: () => void) => void;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      boxShadow: "0px 2px 5px #00000057",
      marginBottom: theme.spacing(2),
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      display: "flex",
      padding: `${theme.spacing(1)}px ${theme.spacing(4)}px`,
      borderRadius: theme.spacing(2),
      transition: "all 0.3s",
      [theme.breakpoints.down("sm")]: {
        display: "block",
      },
      "&:active": {
        transform: "scale(0.9)",
      },
    },
    gridOrderData: {
      alignItems: "center",
    },
    title: {
      fontWeight: 600,
    },
    date: {
      opacity: 0.7,
    },
    orderThumbContainer: {
      display: "flex",
      flexWrap: "wrap",
      margin: `${theme.spacing(2)}px 0px`,
    },
    avatar: {
      width: theme.spacing(5),
      height: theme.spacing(5),
    },
  })
);

const OrderItem: React.FC<Props> = ({ item, onDelete, onUpdateStatus }) => {
  const router = useRouter();
  const theme = useTheme();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { _id, orderName, products, status, totalPrice, createdAt } = item;
  const { isLoading, startLoading, endLoading } = useProcess();

  const handleDeleteOrder = () => {
    handleCloseMenu();
    Swal.fire({
      icon: "question",
      confirmButtonText: "Hapus",
      confirmButtonColor: theme.palette.primary.main,
      showCancelButton: true,
      cancelButtonText: "Batal",
      cancelButtonColor: theme.palette.secondary.main,
      title: "Hapus Pesanan",
      text: `Apakah anda yakin untuk menghapus pesanan ${orderName}?`,
    }).then((result) => {
      if (result.isConfirmed) {
        startLoading();
        onDelete(_id, () => {
          endLoading();
        });
      }
    });
  };

  const handleStatusCancel = () => {
    handleCloseMenu();
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
        startLoading();
        onUpdateStatus(OrderStatusEnum.dibatalkan, _id, () => {
          endLoading();
        });
      }
    });
  };

  const handleStatusDone = () => {
    handleCloseMenu();
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
        startLoading();
        onUpdateStatus(OrderStatusEnum.selesai, _id, () => {
          endLoading();
        });
      }
    });
  };

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Paper className={classes.root} elevation={0} onClick={handleOpenMenu}>
        <Grid container className={classes.gridOrderData}>
          <Grid item xs={6} sm={3}>
            <Typography className={classes.title} variant="h6" noWrap>
              {orderName}
            </Typography>
            <Typography className={classes.date} variant="caption">
              {dateFormatter(createdAt)}
            </Typography>
          </Grid>
          <Grid item xs={6} sm={3}>
            <div className={classes.orderThumbContainer}>
              <AvatarGroup max={3}>
                {products.slice(0, 3).map((product: any) => (
                  <Avatar
                    key={product._id}
                    className={classes.avatar}
                    alt={orderName}
                    src={product.imageUrl}
                  />
                ))}
              </AvatarGroup>
            </div>
          </Grid>
          <Grid item xs={6} sm={3} style={{ textAlign: "center" }}>
            <Typography>{currencyFormatter(Number(totalPrice))}</Typography>
          </Grid>
          <Grid item xs={6} sm={3} style={{ textAlign: "end" }}>
            <OrderStatus status={status} />
          </Grid>
        </Grid>
      </Paper>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={() => router.push(`/kasir/pesanan/detail/${_id}`)}>
          <ListItemIcon>
            <HiOutlineEye size={25} />
          </ListItemIcon>
          <ListItemText>Detail Pesanan</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleDeleteOrder}>
          <ListItemIcon>
            <HiOutlineTrash size={25} />
          </ListItemIcon>
          <ListItemText>Hapus Pesanan</ListItemText>
        </MenuItem>
        {status === OrderStatusEnum.diproses && (
          <MenuItem>
            <ListItemIcon>
              <HiOutlinePencilAlt size={25} />
            </ListItemIcon>
            <ListItemText>Edit Pesanan</ListItemText>
          </MenuItem>
        )}
        {status === OrderStatusEnum.diproses && (
          <MenuItem onClick={handleStatusDone}>
            <ListItemIcon>
              <HiCheck size={25} />
            </ListItemIcon>
            <ListItemText>Tandai Selesai</ListItemText>
          </MenuItem>
        )}
        {status === OrderStatusEnum.diproses && (
          <MenuItem onClick={handleStatusCancel}>
            <ListItemIcon>
              <HiX size={25} />
            </ListItemIcon>
            <ListItemText>Batalkan Pesanan</ListItemText>
          </MenuItem>
        )}
      </Menu>
      {isLoading && <LoadingDialog />}
    </>
  );
};

export default OrderItem;
