import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import {
  TextField,
  Typography,
  Button,
  CircularProgress,
} from "@material-ui/core";
import {
  IOrderForm,
  IOrder,
  IOrderProductForm,
  IOrderEditVal,
} from "@custom-types/order";
import { OrderStatus } from "@enums/order";
import {
  SidebarRight,
  LoadingDialog,
  HeaderTitle,
  ScrollContainer,
} from "@components/common";
import { ItemCart } from "@components/products";
import { MenuOrder } from "@components/orders";
import { ICategory } from "@custom-types/category";
import { IProductCart, IProduct } from "@custom-types/product";
import { currencyFormatter } from "@utils/currency";
import { addOrder, updateOrder } from "@actions/order";
import { useProcess } from "@hooks/index";

type Props = {
  categories: ICategory[];
  editValue?: IOrderEditVal;
  editId?: string;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    sidebarContent: {
      padding: `${theme.spacing(2)}px 0px`,
    },
    sidebarItem: {
      padding: `0px ${theme.spacing(4)}px`,
      [theme.breakpoints.down("md")]: {
        paddingLeft: 0,
        paddingRight: 0,
      },
    },
    subTotal: {
      textAlign: "right",
      marginBottom: theme.spacing(1),
      marginTop: theme.spacing(2),
    },
    placeholder: {
      textAlign: "center",
      opacity: 0.6,
    },
  })
);

const Form: React.FC<Props> = ({ categories, editValue, editId }) => {
  const classes = useStyles();
  const router = useRouter();

  const [formValue, setFormValue] = useState<IOrderForm>({
    orderName: "",
    products: [],
    status: OrderStatus.diproses,
    totalPrice: 0,
  });

  const [cart, setCart] = useState<IProductCart[]>([]);

  const { startLoading, endLoading, isLoading } = useProcess();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue({ ...formValue, orderName: e.target.value });
  };

  const handleChangeNote = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const { products } = formValue;

    const filteredCart = cart.filter((product) => product._id === name);

    const filteredProducts = products.filter(
      (product) => product.productId === name
    );

    if (filteredCart.length === 1 && filteredProducts.length === 1) {
      const iCart = cart.findIndex((product) => product._id === name);
      const iProducts = products.findIndex(
        (product) => product.productId === name
      );

      products[iProducts] = { ...products[iProducts], note: value };
      cart[iCart] = { ...cart[iCart], note: value };

      setFormValue({
        ...formValue,
        products: [...products],
      });
      setCart([...cart]);

      return;
    }
  };

  const handleAddCart = (productParam: IProductCart) => {
    if (cart.length === 0) {
      setCart([...cart, productParam]);
    } else {
      const filteredCart = cart.filter(
        (product) => product._id === productParam._id
      );

      if (filteredCart.length === 0) {
        setCart([...cart, productParam]);
      } else {
        const i = cart.findIndex(
          (product: IProduct) => product._id === productParam._id
        );
        cart[i] = { ...cart[i], quantity: cart[i].quantity + 1 };
        setCart([...cart]);
      }
    }

    const productFormValue: IOrderProductForm = {
      productId: productParam._id,
      note: productParam.note,
      quantity: productParam.quantity,
    };

    const { products } = formValue;

    if (products.length === 0) {
      setFormValue({
        ...formValue,
        products: [...products, productFormValue],
      });
    } else {
      const filteredProducts = products.filter(
        (product) => product.productId === productParam._id
      );

      if (filteredProducts.length === 0) {
        setFormValue({
          ...formValue,
          products: [...products, productFormValue],
        });
      } else {
        const i = products.findIndex(
          (product) => product.productId === productParam._id
        );

        products[i] = { ...products[i], quantity: products[i].quantity + 1 };
        setFormValue({
          ...formValue,
          products: [...products],
        });
      }
    }
  };

  const handleIncreaseQty = (id: string) => {
    const iCart = cart.findIndex((product: IProduct) => product._id === id);
    cart[iCart] = { ...cart[iCart], quantity: cart[iCart].quantity + 1 };

    const { products } = formValue;

    const iProducts = products.findIndex((product) => product.productId === id);
    products[iProducts] = {
      ...products[iProducts],
      quantity: products[iProducts].quantity + 1,
    };

    setFormValue({
      ...formValue,
      products: [...products],
    });
    setCart([...cart]);
  };

  const handleDecreaseQty = (id: string) => {
    const iCart = cart.findIndex((product: IProduct) => product._id === id);
    cart[iCart] = { ...cart[iCart], quantity: cart[iCart].quantity - 1 };

    const { products } = formValue;

    const iProducts = products.findIndex((product) => product.productId === id);
    products[iProducts] = {
      ...products[iProducts],
      quantity: products[iProducts].quantity - 1,
    };

    if (cart[iCart].quantity === 0 && products[iProducts].quantity === 0) {
      handleRemoveCart(id);
      return;
    }

    setFormValue({
      ...formValue,
      products: [...products],
    });
    setCart([...cart]);
  };

  const handleRemoveCart = (id: string) => {
    setCart(cart.filter((product) => product._id !== id));
    setFormValue({
      ...formValue,
      products: formValue.products.filter(
        (product) => product.productId !== id
      ),
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startLoading();

    const cbAction = (data: IOrder, error: any) => {
      endLoading();
      if (data) {
        router.push("/kasir/pesanan");
      }

      if (error) {
        alert(error.response.data.message || error.message);
      }
    };

    if (editValue && editId) {
      updateOrder(editId, formValue, cbAction);
    } else {
      addOrder(formValue, cbAction);
    }
  };

  useEffect(() => {
    let totalPrice: number = 0;

    if (cart.length === 0) {
      setFormValue({
        ...formValue,
        totalPrice: 0,
      });
      return;
    }

    cart.forEach((product, index) => {
      const price = Number(product.price) * product.quantity;

      totalPrice += price;

      if (index === cart.length - 1) {
        setFormValue({
          ...formValue,
          totalPrice,
        });
      }
    });
  }, [cart]);

  useEffect(() => {
    if (editValue) {
      const { orderName, products, status, totalPrice } = editValue;
      const productsValue: any[] = [];

      products.map((product) => {
        productsValue.push(product);
      });

      productsValue.map((product: any, index: number) => {
        productsValue[index] = {
          productId: product._id,
          note: product.note,
          quantity: product.quantity,
        };
      });

      setCart(products);

      setFormValue({
        orderName,
        products: productsValue,
        status,
        totalPrice,
      });
    }
  }, [editValue]);

  useEffect(() => console.log("cart", cart), [cart]);

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Nama Pesanan"
        fullWidth
        value={formValue.orderName}
        onChange={handleChange}
        variant="outlined"
        required
      />
      <MenuOrder categories={categories} onAddCart={handleAddCart} />
      <SidebarRight>
        <div className={classes.sidebarContent}>
          <div className={classes.sidebarItem}>
            <HeaderTitle title="Keranjang" />
          </div>
          <ScrollContainer vertical>
            <div className={classes.sidebarItem} style={{ height: "72vh" }}>
              {cart.length === 0 ? (
                <Typography className={classes.placeholder}>
                  Keranjang masih kosong
                </Typography>
              ) : (
                <>
                  {cart.map((product) => (
                    <ItemCart
                      key={product._id}
                      item={product}
                      onChangeNote={handleChangeNote}
                      onIncreaseQty={handleIncreaseQty}
                      onDecreaseQty={handleDecreaseQty}
                      onRemoveItem={handleRemoveCart}
                    />
                  ))}
                </>
              )}
            </div>
          </ScrollContainer>
          {cart.length > 0 && (
            <div className={classes.sidebarItem}>
              <Typography variant="body1" className={classes.subTotal}>
                Subtotal :{" "}
                <Typography
                  variant="body1"
                  component="span"
                  color="primary"
                  style={{ fontWeight: "bold" }}
                >
                  {currencyFormatter(Number(formValue.totalPrice))}
                </Typography>
              </Typography>
              <Button
                type="submit"
                fullWidth
                color="primary"
                variant="contained"
              >
                Simpan
              </Button>
            </div>
          )}
        </div>
        {isLoading && <LoadingDialog />}
      </SidebarRight>
    </form>
  );
};

export default Form;
