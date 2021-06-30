import React from "react";
import { TableCell, TableRow, Box, IconButton } from "@material-ui/core";
import Swal from "sweetalert2";
import { IUser, IUserForm } from "@custom-types/user";
import { UserStatus } from "@enums/user";
import { HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi";
import { useDisclosure, useUserData } from "@hooks/index";
import { ModalDelete } from "@components/common";

type Props = {
  item: IUser;
  index: number;
  onEditClick: (value: IUserForm, id: string) => void;
  onDelete: (id: string, cb: () => void) => void;
};

const UserTableRow: React.FC<Props> = ({
  item,
  index,
  onEditClick,
  onDelete,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const userData = useUserData();
  const { name, username, status, _id } = item;

  const handleDeleteUser = () => {
    if (userData?.result?.userId !== _id) {
      onDelete(_id, () => onClose());
    } else {
      onClose();
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Tidak bisa menghapus akun Anda disini.",
        confirmButtonText: "Tutup",
      });
    }
  };

  return (
    <>
      <TableRow>
        <TableCell component="th" scope="row">
          {index + 1}
        </TableCell>
        <TableCell component="th" scope="row">
          {name}
        </TableCell>
        <TableCell component="th" scope="row">
          {username}
        </TableCell>
        <TableCell component="th" scope="row">
          {status}
        </TableCell>
        <TableCell style={{ width: 160 }}>
          <Box>
            <IconButton
              onClick={() =>
                onEditClick(
                  {
                    name,
                    username,
                    isAdmin: status === UserStatus.admin ? true : false,
                  },
                  _id
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
          id={_id}
          extraInfo={name}
          disabledButton={userData?.result.userId === _id ? true : false}
          deleteAction={handleDeleteUser}
        />
      </TableRow>
    </>
  );
};

export default UserTableRow;
