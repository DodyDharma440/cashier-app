import React from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { Button, useTheme } from "@material-ui/core";
import Swal from "sweetalert2";
import { IOrder } from "@custom-types/order";
import { OrderStatus } from "@enums/order";
import { ICategory } from "@custom-types/category";
import { Layout, HeaderTitle, LoadingDialog } from "@components/common";
import { FormOrder } from "@components/orders";
import { getCategories } from "@api/category";
import { getOrder } from "@api/order";
import { updateOrderStatus } from "@actions/order";
import { useProcess } from "@hooks/index";

type Props = {
  order: IOrder;
  categories: ICategory[];
};

const EditOrder: React.FC<Props> = ({ order, categories }) => {
  const { orderName, products, status, totalPrice, _id } = order;

  const theme = useTheme();
  const router = useRouter();
  const { isLoading, startLoading, endLoading } = useProcess();

  const editValue = {
    orderName,
    products,
    status,
    totalPrice: Number(totalPrice),
  };

  const handleUpdateStatus = (status: OrderStatus) => {
    startLoading();
    updateOrderStatus(status, _id, theme, (data: any, error: any) => {
      endLoading();
      if (data) {
        router.push("/kasir/pesanan");
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
        handleUpdateStatus(OrderStatus.dibatalkan);
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
        handleUpdateStatus(OrderStatus.selesai);
      }
    });
  };

  return (
    <>
      <Head>
        <title>Cashier | Edit {orderName}</title>
      </Head>

      <Layout withSidebarRight>
        <HeaderTitle title="Edit Pesanan" />
        <div style={{ marginBottom: 16 }}>
          {status === OrderStatus.diproses && (
            <Button
              onClick={handleStatusDone}
              style={{ marginRight: 8 }}
              variant="contained"
              color="primary"
            >
              Tandai Selesai
            </Button>
          )}
          <Button onClick={handleStatusCancel} variant="contained">
            Batalkan Pesanan
          </Button>
        </div>
        <FormOrder editValue={editValue} editId={_id} categories={categories} />
        {isLoading && <LoadingDialog />}
      </Layout>
    </>
  );
};

export default EditOrder;

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  if (!req.headers.cookie && !req.cookies.auth_token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const config = {
    headers: {
      cookie: req.headers.cookie,
    },
  };

  const resCategories = await getCategories(config);

  const resOrder = await getOrder(params?.id, config);

  return {
    props: {
      order: resOrder.data.order,
      categories: resCategories.data.categories,
    },
  };
};
