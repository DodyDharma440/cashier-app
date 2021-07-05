import React from "react";
import Head from "next/head";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Button, Grid } from "@material-ui/core";
import { HiPlus } from "react-icons/hi";
import { Layout, HeaderTitle } from "@components/common";
import { OrderItem } from "@components/orders";

const dummyPesanan: any = [
  {
    id: 1,
    orderName: "Pesanan Dody",
    products: [
      {
        productId: "60dde1b3048a0d2ff03b7157",
        productName: "test update old img",
        categoryName: "Makanan Ringan",
        price: "10000",
        imageUrl: "http://localhost:3000/api/image/BFHSO9-1625154519117.jpg",
        quantity: 3,
      },
      {
        productId: "60de9476dea296153c39e0fb",
        productName: "testrrrrr",
        categoryName: "Makanan Pembukaa",
        price: "50000",
        imageUrl: "http://localhost:3000/api/image/vtw0o6-1625199734708.jpg",
        quantity: 2,
      },
      {
        productId: "60e1a3840bb3100608258e59",
        productName: "Sprite Kaleng",
        categoryName: "Minuman Dingin",
        price: "7000",
        imageUrl: "http://localhost:3000/api/image/57Lfup-1625400196027.jpg",
        quantity: 3,
      },
    ],
    status: "diproses",
  },
  {
    id: 2,
    orderName: "Pesanan Aditya",
    products: [
      {
        productId: "60dde1b3048a0d2ff03b7157",
        productName: "test update old img",
        categoryName: "Makanan Ringan",
        price: "10000",
        imageUrl: "http://localhost:3000/api/image/BFHSO9-1625154519117.jpg",
        quantity: 6,
      },
      {
        productId: "60de9476dea296153c39e0fb",
        productName: "testrrrrr",
        categoryName: "Makanan Pembukaa",
        price: "50000",
        imageUrl: "http://localhost:3000/api/image/vtw0o6-1625199734708.jpg",
        quantity: 2,
      },
      {
        productId: "60e1a3840bb3100608258e59",
        productName: "Sprite Kaleng",
        categoryName: "Minuman Dingin",
        price: "7000",
        imageUrl: "http://localhost:3000/api/image/57Lfup-1625400196027.jpg",
        quantity: 1,
      },
    ],
    status: "selesai",
  },
  {
    id: 3,
    orderName: "Pesanan Dharma",
    products: [
      {
        productId: "60dde1b3048a0d2ff03b7157",
        productName: "test update old img",
        categoryName: "Makanan Ringan",
        price: "10000",
        imageUrl: "http://localhost:3000/api/image/BFHSO9-1625154519117.jpg",
        quantity: 1,
      },
      {
        productId: "60de9476dea296153c39e0fb",
        productName: "testrrrrr",
        categoryName: "Makanan Pembukaa",
        price: "50000",
        imageUrl: "http://localhost:3000/api/image/vtw0o6-1625199734708.jpg",
        quantity: 2,
      },
      {
        productId: "60e1a3840bb3100608258e59",
        productName: "Sprite Kaleng",
        categoryName: "Minuman Dingin",
        price: "7000",
        imageUrl: "http://localhost:3000/api/image/57Lfup-1625400196027.jpg",
        quantity: 3,
      },
    ],
    status: "dibatalkan",
  },
  {
    id: 4,
    orderName: "Pesanan Empat",
    products: [
      {
        productId: "60dde1b3048a0d2ff03b7157",
        productName: "test update old img",
        categoryName: "Makanan Ringan",
        price: "10000",
        imageUrl: "http://localhost:3000/api/image/BFHSO9-1625154519117.jpg",
        quantity: 1,
      },
      {
        productId: "60de9476dea296153c39e0fb",
        productName: "testrrrrr",
        categoryName: "Makanan Pembukaa",
        price: "50000",
        imageUrl: "http://localhost:3000/api/image/vtw0o6-1625199734708.jpg",
        quantity: 1,
      },
      {
        productId: "60e1a3840bb3100608258e59",
        productName: "Sprite Kaleng",
        categoryName: "Minuman Dingin",
        price: "7000",
        imageUrl: "http://localhost:3000/api/image/57Lfup-1625400196027.jpg",
        quantity: 9,
      },
    ],
    status: "selesai",
  },
];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    ordersContainer: {
      margin: `${theme.spacing(2)}px 0px`,
    },
  })
);

const Pesanan = () => {
  const classes = useStyles();

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
        >
          Buat Pesanan
        </Button>
        <div className={classes.ordersContainer}>
          {/* <Grid container spacing={2}> */}
          {dummyPesanan.map((dummy: any, index: number) => (
            // <Grid key={index} item xs={12} sm={6} lg={4}>
            <OrderItem item={dummy} key={index} />
            // </Grid>
          ))}
          {/* </Grid> */}
        </div>
      </Layout>
    </>
  );
};

export default Pesanan;
