import React from "react";
import { TableCell, TableRow, Box, IconButton } from "@material-ui/core";
import { IUser, IUserForm } from "@custom-types/user";
import { UserStatus } from "@enums/user";
import { HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi";
import { useDisclosure, useUserData } from "@hooks/index";
import { ModalDelete } from "@components/common";

type Props = {
  item: IUser;
  index: number;
  onEditClick: (value: IUserForm, id: string) => void;
};

const UserTableRow: React.FC<Props> = ({ item, index, onEditClick }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const userData = useUserData();

  const handleDeleteUser = (id: string) => {
    // if (userData?.result._id !== id) {
    //   dispatch(deleteUser(id));
    // } else {
    //   alert("Can't delete your account here");
    // }
  };

  return (
    <>
      <TableRow>
        <TableCell component="th" scope="row">
          {index + 1}
        </TableCell>
        <TableCell component="th" scope="row">
          {item.name}
        </TableCell>
        <TableCell component="th" scope="row">
          {item.username}
        </TableCell>
        <TableCell component="th" scope="row">
          {item.status}
        </TableCell>
        <TableCell style={{ width: 160 }}>
          <Box>
            <IconButton
              onClick={() =>
                onEditClick(
                  {
                    name: item.name,
                    username: item.username,
                    isAdmin: item.status === UserStatus.admin ? true : false,
                  },
                  item._id
                )
              }
            >
              <HiOutlinePencilAlt />
            </IconButton>
            <IconButton onClick={onOpen}>
              <HiOutlineTrash />
            </IconButton>
          </Box>
        </TableCell>
        <ModalDelete
          title="Hapus Pengguna"
          isOpen={isOpen}
          onClose={onClose}
          id={item._id}
          extraInfo={item.name}
          disabledButton={userData?.result._id === item._id ? true : false}
          deleteAction={handleDeleteUser}
        />
      </TableRow>
    </>
  );
};

export default UserTableRow;
