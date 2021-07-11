import React, { useState } from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Button, Grid, useTheme } from "@material-ui/core";
import { HiPlus } from "react-icons/hi";
import Swal from "sweetalert2";
import { Layout, HeaderTitle } from "@components/common";
import { ItemOrder } from "@components/orders";
import { getOrders } from "@api/order";
import { IOrder } from "@custom-types/order";
import { deleteOrder } from "@actions/order";

type Props = {
  orders: IOrder[];
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    ordersContainer: {
      margin: `${theme.spacing(2)}px 0px`,
    },
  })
);

const Pesanan: React.FC<Props> = (props) => {
  const theme = useTheme();
  const classes = useStyles();
  const router = useRouter();
  const [orders, setOrders] = useState<IOrder[]>(props.orders);

  const handleUpdateOrderState = (updatedOrder: IOrder[]) => {
    setOrders(updatedOrder);
  };

  const handleDelete = (id: string, cb: () => void) => {
    deleteOrder(id, (data: any, error: any) => {
      if (data) {
        Swal.fire({
          icon: "success",
          confirmButtonText: "Tutup",
          cancelButtonColor: theme.palette.secondary.main,
          title: "Berhasil",
          text: "Pesanan berhasil dihapus.",
        });
        setOrders(orders.filter((order) => order._id !== id));
      }

      if (error) {
        Swal.fire({
          icon: "error",
          confirmButtonText: "Tutup",
          cancelButtonColor: theme.palette.secondary.main,
          title: "Gagal",
          text: error.response.data.message || error.message,
        });
      }

      cb();
    });
  };

  return (
    <>
      <Head>
        <title>Cashier | Pesanan</title>
      </Head>

      <Layout>
        <HeaderTitle title="Pesanan" />
        <Button
          startIcon={<HiPlus color="secondary" />}
          variant="contained"
          color="primary"
          onClick={() => router.push("/kasir/pesanan/buat")}
        >
          Buat Pesanan
        </Button>
        <div className={classes.ordersContainer}>
          <Grid container>
            {orders.map((order) => (
              <Grid item xs={12} lg={6} key={order._id}>
                <ItemOrder
                  item={order}
                  orders={orders}
                  onUpdateOrderState={handleUpdateOrderState}
                  onDelete={handleDelete}
                />
              </Grid>
            ))}
          </Grid>
        </div>
      </Layout>
    </>
  );
};

export default Pesanan;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  if (!req.headers.cookie && !req.cookies.auth_token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const { data } = await getOrders({
    headers: {
      cookie: req.headers.cookie,
    },
  });

  return {
    props: {
      orders: data.orders,
    },
  };
};
