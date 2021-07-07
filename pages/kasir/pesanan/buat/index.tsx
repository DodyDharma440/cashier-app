import React from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { Layout, HeaderTitle, SidebarRight } from "@components/common";
import { FormOrder } from "@components/orders";
import { getCategories } from "@api/category";
import { ICategory } from "@custom-types/category";

type Props = {
  categories: ICategory[];
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    gridContainer: {},
  })
);

const BuatPesanan: React.FC<Props> = ({ categories }) => {
  return (
    <>
      <Head>
        <title>Cashier | Tambah Pesanan</title>
      </Head>

      <Layout withSidebarLeft>
        <HeaderTitle title="Buat Pesanan Baru" />
        <FormOrder categories={categories} />
      </Layout>
    </>
  );
};

export default BuatPesanan;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const categoriesRes = await getCategories({
    headers: {
      cookie: req.headers.cookie,
    },
  });

  return {
    props: {
      categories: categoriesRes.data.categories,
    },
  };
};
