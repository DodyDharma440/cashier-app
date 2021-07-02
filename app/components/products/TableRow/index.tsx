import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { TableCell, TableRow, Box, IconButton } from "@material-ui/core";
import { IProduct, IProductForm } from "@custom-types/product";
import { HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi";
import { useDisclosure } from "@hooks/index";
import { ModalDelete } from "@components/common";
import { currencyFormatter } from "@utils/currency";

type Props = {
  item: IProduct;
  index: number;
  onEditClick: (value: IProductForm, id: string) => void;
  onDelete: (id: string, cb: () => void) => void;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    imageWrapper: {
      width: 100,
      height: 100,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  })
);

const ProductsTableRow: React.FC<Props> = ({
  item,
  index,
  onDelete,
  onEditClick,
}) => {
  const classes = useStyles();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { _id, productName, categoryName, price, imageUrl, description } = item;

  const handleDelete = () => {
    onDelete(_id, () => onClose());
  };

  const handleEdit = () => {
    const { _id, productName, categoryId, price, description, imageUrl } = item;

    onEditClick(
      {
        productName,
        categoryId,
        price,
        description,
        imageUrl,
      },
      _id
    );
  };

  return (
    <>
      <TableRow>
        <TableCell component="th" scope="row">
          {index + 1}
        </TableCell>
        <TableCell component="th" scope="row">
          <Box className={classes.imageWrapper}>
            <img
              src={imageUrl}
              alt={productName}
              style={{ maxWidth: "100%" }}
            />
          </Box>
        </TableCell>
        <TableCell component="th" scope="row">
          {productName}
        </TableCell>
        <TableCell component="th" scope="row">
          {categoryName}
        </TableCell>
        <TableCell component="th" scope="row">
          {currencyFormatter(Number(price))}
        </TableCell>
        <TableCell component="th" scope="row">
          {description}
        </TableCell>
        <TableCell style={{ width: 160 }}>
          <Box>
            <IconButton onClick={handleEdit}>
              <HiOutlinePencilAlt />
            </IconButton>
            <IconButton onClick={onOpen}>
              <HiOutlineTrash />
            </IconButton>
          </Box>
        </TableCell>
        <ModalDelete
          title="Hapus Produk"
          isOpen={isOpen}
          onClose={onClose}
          id={_id}
          extraInfo={productName}
          deleteAction={handleDelete}
        />
      </TableRow>
    </>
  );
};

export default ProductsTableRow;
