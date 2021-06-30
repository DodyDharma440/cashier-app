import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  ICategoryForm,
  ICategory,
  ICategoryResponse,
} from "@custom-types/category";
import { useProcess } from "@hooks/index";
import { addCategory, updateCategory } from "@actions/category";

type Props = {
  open: boolean;
  onClose: () => void;
  editValue: ICategoryForm | null;
  editId: string;
  categories: ICategory[];
  onUpdateCategoryState: (updatedCategory: ICategory[]) => void;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    input: {
      margin: `${theme.spacing(1)}px 0px`,
    },
  })
);

const Form: React.FC<Props> = ({
  open,
  onClose,
  editValue,
  editId,
  categories,
  onUpdateCategoryState,
}) => {
  const classes = useStyles();
  const [inputValue, setInputValue] = useState<ICategoryForm>({
    categoryName: "",
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const { isLoading, startLoading, endLoading } = useProcess();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const callbackAction = (data: ICategoryResponse, error: any) => {
    endLoading();

    if (data) {
      onClose();
      setInputValue({ categoryName: "" });

      if (data.newCategory) {
        onUpdateCategoryState([...categories, data.newCategory]);
      }

      if (data.updatedCategory) {
        const i = categories.findIndex(
          (category: ICategory) => category._id === data.updatedCategory?._id
        );
        categories[i] = data.updatedCategory;
        onUpdateCategoryState([...categories]);
      }
    }

    if (error) {
      const message = error.response
        ? error.response.data.message
        : error.message;

      setErrorMessage(message);
    }
  };

  const handleSubmitAdd = () => {
    addCategory(inputValue, callbackAction);
  };

  const handleSubmitUpdate = () => {
    updateCategory(inputValue, editId, callbackAction);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startLoading();

    if (editValue !== null) {
      handleSubmitUpdate();
    } else {
      handleSubmitAdd();
    }
  };

  useEffect(() => {
    endLoading();
    setErrorMessage(null);
    setInputValue({
      categoryName: "",
    });
    if (editValue !== null) {
      setInputValue(editValue);
    }
  }, [open, editValue]);

  return (
    <Dialog
      maxWidth="sm"
      fullWidth
      open={open}
      onClose={onClose}
      aria-labelledby="dialog-title"
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle>
          {editValue ? "Edit Kategori" : "Tambah Kategori"}
        </DialogTitle>
        <DialogContent>
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
          <TextField
            className={classes.input}
            name="categoryName"
            label="Nama Kategori"
            fullWidth
            value={inputValue.categoryName}
            onChange={handleChange}
            variant="outlined"
            required
          />
        </DialogContent>
        <DialogActions>
          <Button
            type="button"
            onClick={onClose}
            color="secondary"
            variant="contained"
          >
            Batal
          </Button>
          <Button
            endIcon={
              isLoading && <CircularProgress color="secondary" size={15} />
            }
            type="submit"
            color="primary"
            variant="contained"
          >
            Simpan
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default Form;
