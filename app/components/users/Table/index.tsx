import React from "react";
import { IUserForm, IUser } from "@custom-types/user";
import { useRequestSort } from "@hooks/index";
import { TableRowUser } from "@components/users";
import { TableData } from "@components/common";
import { tableHeadUser } from "@constants/tableHead";

type Props = {
  users: IUser[];
  onEditClick: (value: IUserForm, id: string) => void;
  onDelete: (id: string, cb: () => void) => void;
};

const Table: React.FC<Props> = ({ users, onEditClick, onDelete }) => {
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
          onDelete={onDelete}
        />
      )}
      headCells={tableHeadUser}
      order={order}
      orderBy={orderBy}
      onRequestSort={onRequestSort}
    />
  );
};

export default Table;
