import React from "react";
import { IProduct, IProductForm } from "@custom-types/product";
import { useRequestSort } from "@hooks/index";
import { TableData } from "@components/common";
import { TableRowProduct } from "@components/products";
import { tableHeadProduct } from "@constants/tableHead";

type Props = {
  products: IProduct[];
  onEditClick: (value: IProductForm, id: string) => void;
  onDelete: (id: string, cb: () => void) => void;
};

const Table: React.FC<Props> = ({ products, onEditClick, onDelete }) => {
  const { order, orderBy, onRequestSort } =
    useRequestSort<keyof IProduct>("productName");

  return (
    <TableData
      data={products}
      renderTableRow={(product: IProduct, index: number) => (
        <TableRowProduct
          key={product._id}
          index={index}
          item={product}
          onEditClick={onEditClick}
          onDelete={onDelete}
        />
      )}
      headCells={tableHeadProduct}
      order={order}
      orderBy={orderBy}
      onRequestSort={onRequestSort}
    />
  );
};

export default Table;
