import React from "react";
import { ICategory, ICategoryForm } from "@custom-types/category";
import { useRequestSort } from "@hooks/index";
import { TableData } from "@components/common";
import { TableRowCategory } from "@components/categories";
import { tableHeadCategory } from "@constants/tableHead";

type Props = {
  categories: ICategory[];
  onEditClick: (value: ICategoryForm, id: string) => void;
  onDelete: (id: string, cb: () => void) => void;
};

const Table: React.FC<Props> = ({ categories, onEditClick, onDelete }) => {
  const { order, orderBy, onRequestSort } =
    useRequestSort<keyof ICategory>("categoryName");

  return (
    <TableData
      data={categories}
      renderTableRow={(category: ICategory, index: number) => (
        <TableRowCategory
          key={category._id}
          index={index}
          item={category}
          onEditClick={onEditClick}
          onDelete={onDelete}
        />
      )}
      headCells={tableHeadCategory}
      order={order}
      orderBy={orderBy}
      onRequestSort={onRequestSort}
    />
  );
};

export default Table;
