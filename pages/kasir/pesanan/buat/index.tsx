import React from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { Layout, HeaderTitle } from "@components/common";
import { FormOrder } from "@components/orders";
import { getCategories } from "@api/category";
import { ICategory } from "@custom-types/category";

type Props = {
  categories: ICategory[];
};

const BuatPesanan: React.FC<Props> = ({ categories }) => {
  return (
    <>
      <Head>
        <title>Cashier | Tambah Pesanan</title>
      </Head>

      <Layout withSidebarRight>
        <HeaderTitle title="Buat Pesanan Baru" />
        <FormOrder categories={categories} />
      </Layout>
    </>
  );
};

export default BuatPesanan;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  if (!req.headers.cookie && !req.cookies.auth_token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

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
