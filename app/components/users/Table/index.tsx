import React from "react";
import { IUserTable, IUserForm, IUser } from "@custom-types/user";
import { useRequestSort } from "@hooks/index";
import { TableRowUser } from "@components/users";
import { TableData } from "@components/common";

type Props = {
  users?: IUser[];
  onEditClick: (value: IUserForm, id: string) => void;
};

const headCells: IUserTable[] = [
  {
    id: "name",
    numeric: false,
    label: "Nama",
  },
  {
    id: "username",
    numeric: false,
    label: "Username",
  },
  {
    id: "status",
    numeric: false,
    label: "Status",
  },
];

const UserTable: React.FC<Props> = ({ users, onEditClick }) => {
  const { order, orderBy, onRequestSort } = useRequestSort<keyof IUser>("name");

  return (
    <TableData
      data={users}
      renderTableRow={(user: IUser, index: number) => (
        <TableRowUser
          key={user._id}
          index={index}
          item={user}
          onEditClick={onEditClick}
        />
      )}
      headCells={headCells}
      order={order}
      orderBy={orderBy}
      onRequestSort={onRequestSort}
    />
  );
};

export default UserTable;
