import React from "react";
import { TableCell, TableRow, Box, IconButton } from "@material-ui/core";
import { ICategory, ICategoryForm } from "@custom-types/category";
import { HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi";
import { useDisclosure } from "@hooks/index";
import { ModalDelete } from "@components/common";

type Props = {
  item: ICategory;
  index: number;
  onEditClick: (value: ICategoryForm, id: string) => void;
  onDelete: (id: string, cb: () => void) => void;
};

const CategoriesTableRow: React.FC<Props> = ({
  item,
  index,
  onEditClick,
  onDelete,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { categoryName, _id } = item;

  const handleDelete = () => {
    onDelete(_id, () => onClose());
  };

  return (
    <>
      <TableRow>
        <TableCell component="th" scope="row">
          {index + 1}
        </TableCell>
        <TableCell component="th" scope="row">
          {categoryName}
        </TableCell>
        <TableCell style={{ width: 160 }}>
          <Box>
            <IconButton onClick={() => onEditClick({ categoryName }, _id)}>
              <HiOutlinePencilAlt />
            </IconButton>
            <IconButton onClick={onOpen}>
              <HiOutlineTrash />
            </IconButton>
          </Box>
        </TableCell>
      </TableRow>
      <ModalDelete
        isOpen={isOpen}
        onClose={onClose}
        id={_id}
        deleteAction={handleDelete}
        extraInfo={categoryName}
      />
    </>
  );
};

export default CategoriesTableRow;
