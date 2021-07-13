import React, { useState } from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Button, Grid, useTheme } from "@material-ui/core";
import { HiPlus } from "react-icons/hi";
import { Layout, HeaderTitle, EmptyData } from "@components/common";
import { ItemOrder } from "@components/orders";
import { getOrders } from "@api/order";
import { IOrder } from "@custom-types/order";
import { OrderStatus } from "@enums/order";
import { deleteOrder, updateOrderStatus } from "@actions/order";

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

  const handleDelete = (id: string, cb: () => void) => {
    deleteOrder(id, theme, (data: any, error: any) => {
      if (data) {
        setOrders(orders.filter((order) => order._id !== id));
      }

      cb();
    });
  };

  const handleUpdateStatus = (
    status: OrderStatus,
    id: string,
    cb: () => void
  ) => {
    updateOrderStatus(status, id, theme, (data: any, error: any) => {
      if (data) {
        const i = orders.findIndex((order) => order._id === id);
        orders[i].status = status;
        setOrders([...orders]);
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
          {orders.length === 0 ? (
            <EmptyData />
          ) : (
            <Grid container>
              {orders.map((order) => (
                <Grid item xs={12} lg={6} key={order._id}>
                  <ItemOrder
                    item={order}
                    onDelete={handleDelete}
                    onUpdateStatus={handleUpdateStatus}
                  />
                </Grid>
              ))}
            </Grid>
          )}
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
