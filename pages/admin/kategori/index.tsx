import React, { useState } from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { Button } from "@material-ui/core";
import { HiPlus } from "react-icons/hi";
import { withAdmin } from "@hoc/index";
import { getCategories } from "@api/category";
import {
  Layout,
  HeaderTitle,
  TableWrapper,
  EmptyData,
} from "@components/common";
import { TableCategory, FormCategory } from "@components/categories";
import { ICategory, ICategoryForm } from "@custom-types/category";
import { useDisclosure } from "@hooks/index";
import { deleteCategory } from "@actions/category";

type Props = {
  categories: ICategory[];
};

const Kategori: React.FC<Props> = (props) => {
  const [categories, setCategories] = useState<ICategory[]>(props.categories);
  const [editId, setEditId] = useState<string>("");
  const [editValue, setEditValue] = useState<ICategoryForm | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleAddClick = () => {
    onOpen();
    setEditValue(null);
    setEditId("");
  };

  const handleEditClick = (value: ICategoryForm, id: string) => {
    onOpen();
    setEditValue(value);
    setEditId(id);
  };

  const handleDelete = (id: string, cb: () => void) => {
    deleteCategory(id, () => {
      setCategories(categories.filter((category) => category._id !== id));
      cb();
    });
  };

  const handleUpdateCategoryState = (updatedCategory: ICategory[]) => {
    setCategories(updatedCategory);
  };

  return (
    <>
      <Head>
        <title>Cashier | Kategori</title>
      </Head>

      <Layout>
        <HeaderTitle title="Daftar Kategori" />
        <Button
          startIcon={<HiPlus color="secondary" />}
          onClick={handleAddClick}
          variant="contained"
          color="primary"
        >
          Tambah Kategori
        </Button>
        <TableWrapper>
          {categories.length === 0 ? (
            <EmptyData />
          ) : (
            <TableCategory
              categories={categories}
              onEditClick={handleEditClick}
              onDelete={handleDelete}
            />
          )}
        </TableWrapper>
        <FormCategory
          open={isOpen}
          onClose={onClose}
          editValue={editValue}
          editId={editId}
          onUpdateCategoryState={handleUpdateCategoryState}
          categories={categories}
        />
      </Layout>
    </>
  );
};

export default withAdmin(Kategori);

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { data } = await getCategories({
    headers: {
      cookie: req.headers.cookie,
    },
  });

  return {
    props: {
      categories: data.categories,
    },
  };
};
