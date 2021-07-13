import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { Grid, Button, Typography, useTheme } from "@material-ui/core";
import Swal from "sweetalert2";
import {
  Layout,
  HeaderTitle,
  TableWrapper,
  LoadingDialog,
} from "@components/common";
import { getOrder } from "@api/order";
import { IOrder } from "@custom-types/order";
import { OrderStatus as OrderStatusEnum } from "@enums/order";
import { CardDetailOrder } from "@components/orders";
import { ItemDetailOrder } from "@components/products";
import { deleteOrder } from "@actions/order";
import { useProcess } from "@hooks/index";

type Props = {
  order: IOrder;
};

const DetailOrder: React.FC<Props> = ({ order }) => {
  const theme = useTheme();
  const router = useRouter();
  const { _id, orderName, products, status, totalPrice, createdAt } = order;
  const { startLoading, endLoading, isLoading } = useProcess();

  const handleDelete = () => {
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
        deleteOrder(_id, theme, (data: any, error: any) => {
          endLoading();
          if (data) {
            router.push("/kasir/pesanan");
          }
        });
      }
    });
  };

  return (
    <>
      <Head>
        <title>Cashier | {orderName}</title>
      </Head>

      <Layout>
        <HeaderTitle title="Detail Pesanan" />
        {status === OrderStatusEnum.diproses && (
          <Button
            style={{ marginRight: 8 }}
            variant="contained"
            color="primary"
          >
            Edit Pesanan
          </Button>
        )}
        <Button variant="contained" onClick={handleDelete}>
          Hapus Pesanan
        </Button>
        <TableWrapper>
          <Grid container spacing={2}>
            <Grid item xs={12} md={5} lg={4}>
              <CardDetailOrder item={order} />
            </Grid>
            <Grid item xs={12} md={7} lg={8}>
              <Typography variant="h6" style={{ marginBottom: 8 }}>
                Produk
              </Typography>
              <Grid container spacing={2}>
                {products.map((product) => (
                  <Grid item key={product._id} xs={12} md={6}>
                    <ItemDetailOrder item={product} />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </TableWrapper>
        {isLoading && <LoadingDialog />}
      </Layout>
    </>
  );
};

export default DetailOrder;

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
}) => {
  const { data } = await getOrder(params?.id, {
    headers: {
      cookie: req.headers.cookie,
    },
  });

  return {
    props: {
      order: data.order,
    },
  };
};
