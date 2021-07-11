import React, { useState } from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { Button } from "@material-ui/core";
import { HiPlus } from "react-icons/hi";
import { withAdmin } from "@hoc/index";
import { getProducts } from "@api/product";
import { getCategories } from "@api/category";
import { IProduct, IProductForm } from "@custom-types/product";
import { ICategory } from "@custom-types/category";
import {
  Layout,
  HeaderTitle,
  EmptyData,
  TableWrapper,
} from "@components/common";
import { TableProduct, FormProduct } from "@components/products";
import { useDisclosure } from "@hooks/index";
import { deleteProduct } from "@actions/product";

type Props = {
  products: IProduct[];
  categories: ICategory[];
};

const Produk: React.FC<Props> = (props) => {
  const [products, setProducts] = useState<IProduct[]>(props.products);
  const [editValue, setEditValue] = useState<IProductForm | null>(null);
  const [editId, setEditId] = useState<string>("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleAddClick = () => {
    onOpen();
    setEditValue(null);
    setEditId("");
  };

  const handleEditClick = (value: IProductForm, id: string) => {
    onOpen();
    setEditValue(value);
    setEditId(id);
  };

  const handleDelete = (id: string, cb: () => void) => {
    deleteProduct(id, () => {
      setProducts(products.filter((product) => product._id !== id));
      cb();
    });
  };

  const handleUpdateProductState = (updatedProduct: IProduct[]) => {
    setProducts(updatedProduct);
  };

  return (
    <>
      <Head>
        <title>Cashier | Produk</title>
      </Head>

      <Layout>
        <HeaderTitle title="Daftar Produk" />
        <Button
          startIcon={<HiPlus color="secondary" />}
          onClick={handleAddClick}
          variant="contained"
          color="primary"
        >
          Tambah Produk
        </Button>
        <TableWrapper>
          {products.length === 0 ? (
            <EmptyData />
          ) : (
            <TableProduct
              products={products}
              onEditClick={handleEditClick}
              onDelete={handleDelete}
            />
          )}
        </TableWrapper>
        <FormProduct
          open={isOpen}
          onClose={onClose}
          editValue={editValue}
          editId={editId}
          categories={props.categories}
          products={products}
          onUpdateProductState={handleUpdateProductState}
        />
      </Layout>
    </>
  );
};

export default withAdmin(Produk);

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
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

  const resProducts = await getProducts(config);
  const resCategories = await getCategories(config);

  return {
    props: {
      products: resProducts.data.products,
      categories: resCategories.data.categories,
    },
  };
};
