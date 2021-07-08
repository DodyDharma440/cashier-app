import React, { useState, useEffect } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import clsx from "clsx";
import { Button, Typography, TextField, Grid } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import { EmptyData } from "@components/common";
import { CardProduct } from "@components/products";
import { IProduct, IProductCart } from "@custom-types/product";
import { ICategory } from "@custom-types/category";
import { ScrollContainer } from "@components/common";
import { getProductsByCategory } from "@actions/product";
import { useProcess } from "@hooks/index";
import { searchProducts } from "@actions/product";

type Props = {
  categories: ICategory[];
  onAddCart: (product: IProductCart) => void;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      margin: `${theme.spacing(1)}px 0px`,
    },
    searchField: {
      padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
    },
    categoryBtnWrapper: {
      display: "inline-block",
    },
    categoryBtn: {
      margin: theme.spacing(1),
      borderRadius: theme.spacing(4),
      textTransform: "capitalize",
      boxShadow: "none",
      transition: "all 0.3s",
      "&:hover": {
        boxShadow: "none",
        transform: "translateY(-4px)",
      },
    },
    activeCategory: {
      backgroundColor: theme.palette.primary.main,
      "&:hover": {
        backgroundColor: theme.palette.primary.main,
      },
      "&:active": {
        backgroundColor: theme.palette.primary.dark,
      },
    },
    firstCategoryBtn: {
      marginLeft: 0,
    },
    lastCategoryBtn: {
      marginRight: 0,
    },
    productsContainer: {
      margin: `${theme.spacing(3)}px 0px`,
    },
  })
);

const Menu: React.FC<Props> = ({ categories, onAddCart }) => {
  const classes = useStyles();
  const [currentCategory, setCurrentCategory] = useState<string>(
    categories[0].categoryName
  );
  const [products, setProducts] = useState<IProduct[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [emptyMessage, setEmptyMessage] = useState<string>("Data masih kosong");
  const { startLoading, endLoading, isLoading } = useProcess();

  const handleGetProducts = (categoryName: string) => {
    getProductsByCategory(categoryName, (data: IProduct[], error: any) => {
      endLoading();

      if (data) {
        setProducts(data);
      }

      if (error) {
        setErrorMessage(error.response.data.message || error.message);
      }
    });
  };

  const handleChangeCategory = (categoryName: string) => {
    startLoading();
    setEmptyMessage("Data masih kosong");
    setCurrentCategory(categoryName);
    handleGetProducts(categoryName);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    startLoading();
    setCurrentCategory("");
    setErrorMessage(null);
    setSearchValue(value);

    if (value === "") {
      handleChangeCategory(categories[0].categoryName);
      return;
    }

    searchProducts(value, (products: IProduct[], error: any) => {
      endLoading();

      if (products) {
        if (products.length === 0) {
          setEmptyMessage("Data tidak ditemukan");
        }
        setProducts(products);
      }

      if (error) {
        setErrorMessage(error.response.data.message || error.message);
      }
    });
  };

  useEffect(() => {
    startLoading();
    handleGetProducts(currentCategory);
  }, []);

  return (
    <>
      <div className={classes.header}>
        <Typography variant="h6">Menu</Typography>
        <TextField
          variant="outlined"
          placeholder="Cari Produk"
          inputProps={{
            className: classes.searchField,
          }}
          value={searchValue}
          onChange={handleSearch}
        />
      </div>
      <ScrollContainer horizontal>
        {categories.map(({ categoryName, _id }, index) => (
          <div key={_id} className={classes.categoryBtnWrapper}>
            <Button
              className={clsx(classes.categoryBtn, {
                [classes.firstCategoryBtn]: index === 0,
                [classes.lastCategoryBtn]: index === categories.length - 1,
                [classes.activeCategory]: currentCategory === categoryName,
              })}
              variant="contained"
              onClick={() => handleChangeCategory(categoryName)}
            >
              {categoryName}
            </Button>
          </div>
        ))}
      </ScrollContainer>
      <div className={classes.productsContainer}>
        {isLoading ? (
          "Loading..."
        ) : products.length === 0 && !isLoading ? (
          <EmptyData caption={emptyMessage} />
        ) : errorMessage ? (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {errorMessage}
          </Alert>
        ) : (
          <Grid container spacing={2}>
            {products.map((product) => (
              <Grid item key={product._id} xs={12} sm={6} lg={4}>
                <CardProduct product={product} onAddCart={onAddCart} />
              </Grid>
            ))}
          </Grid>
        )}
      </div>
    </>
  );
};

export default Menu;
