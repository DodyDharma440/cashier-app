import React, { useState } from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { Button } from "@material-ui/core";
import { HiPlus } from "react-icons/hi";
import { withAdmin } from "@hoc/index";
import { getUsers } from "@api/user";
import { deleteUser } from "@actions/user";
import {
  Layout,
  HeaderTitle,
  TableWrapper,
  EmptyData,
} from "@components/common";
import { FormUser, TableUser } from "@components/users";
import { IUser, IUserForm } from "@custom-types/user";
import { useDisclosure } from "@hooks/index";

type Props = {
  users: IUser[];
  errorMessage: string;
};

const Anggota: React.FC<Props> = (props) => {
  const [users, setUsers] = useState<IUser[]>(props.users);
  const [editId, setEditId] = useState<string>("");
  const [editValue, setEditValue] = useState<IUserForm | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleEditClick = (value: IUserForm, id: string) => {
    onOpen();
    setEditValue(value);
    setEditId(id);
  };

  const handleAddClick = () => {
    onOpen();
    setEditValue(null);
    setEditId("");
  };

  const handleDeleteUser = (id: string, cb: () => void) => {
    deleteUser(id, () => {
      setUsers(users.filter((user) => user._id !== id));
      cb();
    });
  };

  const handleUpdateUserState = (updatedUser: IUser[]) => {
    setUsers(updatedUser);
  };

  return (
    <>
      <Head>
        <title>Cashier | Anggota</title>
      </Head>
      <Layout>
        <HeaderTitle title="Daftar Anggota" />
        <Button
          startIcon={<HiPlus color="secondary" />}
          onClick={handleAddClick}
          variant="contained"
          color="primary"
        >
          Tambah Anggota
        </Button>
        <TableWrapper>
          {users.length === 0 ? (
            <EmptyData />
          ) : (
            <TableUser
              users={users}
              onEditClick={handleEditClick}
              onDelete={handleDeleteUser}
            />
          )}
        </TableWrapper>
        <FormUser
          open={isOpen}
          onClose={onClose}
          editValue={editValue}
          editId={editId}
          onUpdateUserState={handleUpdateUserState}
          users={users}
        />
      </Layout>
    </>
  );
};

export default withAdmin(Anggota);

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  if (!req.headers.cookie && !req.cookies.auth_token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const { data } = await getUsers({
    headers: {
      cookie: req.headers.cookie,
    },
  });

  if (!data) {
    return {
      props: {
        errorMessage: "Something went wrong. Please try again.",
      },
    };
  }

  return {
    props: {
      users: data.users,
    },
  };
};
