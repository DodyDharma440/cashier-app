import React, { useEffect, useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  Paper,
  Typography,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { HiOutlineUpload, HiRefresh } from "react-icons/hi";
import { IProductForm } from "@custom-types/product";
import { ICategory } from "@custom-types/category";
import { useProcess } from "@hooks/index";

type Props = {
  open: boolean;
  onClose: () => void;
  editValue: IProductForm | null;
  editId: string;
  categories: ICategory[];
};

type ImgPlaceholderProps = {
  classes: ReturnType<typeof useStyles>;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    input: {
      margin: `${theme.spacing(1)}px 0px`,
    },
    imgPlaceholder: {
      height: 200,
      margin: `${theme.spacing(1)}px 0px`,
      background: "#ddd",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    imgButtonWrapper: {
      display: "flex",
      justifyContent: "space-between",
    },
  })
);

const initialInputValue = {
  productName: "",
  categoryId: "",
  price: "",
  description: "",
  productImage: null,
};

const ImagePlaceholder: React.FC<ImgPlaceholderProps> = ({ classes }) => {
  return (
    <Paper elevation={0} className={classes.imgPlaceholder}>
      <Typography style={{ opacity: 0.5 }}>
        Tidak ada gambar diupload.
      </Typography>
    </Paper>
  );
};

const Form: React.FC<Props> = ({
  open,
  onClose,
  editValue,
  editId,
  categories,
}) => {
  const classes = useStyles();

  const [inputValue, setInputValue] = useState<IProductForm>(initialInputValue);
  const [selectedImg, setSelectedImg] = useState<any>("");
  const { isLoading, startLoading, endLoading } = useProcess();
  const [errorMessage, setErrorMessage] = useState(null);

  const handleChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleChangeSelect = (e: React.ChangeEvent<{ value: unknown }>) => {
    setInputValue({
      ...inputValue,
      categoryId: e.target.value as string,
    });
  };

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        setSelectedImg(reader.result);
      };
      setInputValue({
        ...inputValue,
        productImage: e.target.files[0],
      });
    }

    return;
  };

  const callbackAction = (success: any, error: any) => {
    if (success) {
      onClose();
      setInputValue(initialInputValue);
      setSelectedImg("");
    }

    if (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage(error.message);
      }
    }

    endLoading();
  };

  const handleSubmitAdd = () => {};

  const handleSubmitUpdate = () => {};

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startLoading();
    if (editValue !== null) {
      handleSubmitUpdate();
    } else {
      handleSubmitAdd();
    }
  };

  const handleResetImage = () => {
    setInputValue({
      ...inputValue,
      productImage: null,
    });
    setSelectedImg("");
  };

  useEffect(() => {
    endLoading();
    setErrorMessage(null);
    setInputValue(initialInputValue);
    setSelectedImg("");
    if (editValue !== null) {
      const { productName, categoryId, price, description, imageUrl } =
        editValue;

      setInputValue({
        ...inputValue,
        productName,
        categoryId,
        price,
        description,
      });
      setSelectedImg(imageUrl);
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
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <DialogTitle id="dialog-title">Tambahkan Produk</DialogTitle>
        <DialogContent>
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
          <TextField
            name="productName"
            className={classes.input}
            label="Nama Produk"
            fullWidth
            value={inputValue.productName}
            onChange={handleChangeForm}
            variant="outlined"
            required
          />
          <TextField
            name="price"
            type="number"
            className={classes.input}
            label="Harga"
            fullWidth
            value={inputValue.price}
            onChange={handleChangeForm}
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">Rp</InputAdornment>
              ),
            }}
            required
          />
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="category-label">Kategori</InputLabel>
            <Select
              fullWidth
              labelId="category-label"
              id="select-category"
              name="categoryLabel"
              value={inputValue.categoryId}
              onChange={handleChangeSelect}
              label="Kategori"
            >
              <MenuItem value="" selected disabled>
                Pilih Kategori
              </MenuItem>
              {categories?.map((category, index) => (
                <MenuItem value={category._id} key={index}>
                  {category.categoryName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            name="description"
            className={classes.input}
            label="Deskripsi"
            fullWidth
            value={inputValue.description}
            onChange={handleChangeForm}
            variant="outlined"
            multiline
            required
          />

          {selectedImg !== "" ? (
            <img src={selectedImg} style={{ maxWidth: "100%" }} />
          ) : (
            <ImagePlaceholder classes={classes} />
          )}
          <Box className={classes.imgButtonWrapper}>
            <Button
              component="label"
              variant="contained"
              startIcon={<HiOutlineUpload />}
              color="primary"
            >
              Upload Image
              <input
                type="file"
                multiple={false}
                name="product_image"
                hidden
                onChange={handleChangeImage}
              />
            </Button>
            {selectedImg !== "" && (
              <Button
                component="label"
                variant="contained"
                startIcon={<HiRefresh />}
                color="secondary"
                onClick={handleResetImage}
              >
                Reset
              </Button>
            )}
          </Box>
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
