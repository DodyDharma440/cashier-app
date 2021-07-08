import React, { useState, useEffect } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";
import { IOrderForm, IOrderProductForm } from "@custom-types/order";
import { OrderStatus } from "@enums/order";
import { SidebarRight, HeaderTitle, ScrollContainer } from "@components/common";
import { MenuOrder } from "@components/orders";
import { ICategory } from "@custom-types/category";
import { IProductCart, IProduct } from "@custom-types/product";
import { currencyFormatter } from "@utils/currency";

type Props = {
  categories: ICategory[];
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    sidebarContent: {
      padding: `${theme.spacing(2)}px ${theme.spacing(4)}px`,
      [theme.breakpoints.down("md")]: {
        paddingLeft: 0,
        paddingRight: 0,
      },
    },
  })
);

const Form: React.FC<Props> = ({ categories }) => {
  const classes = useStyles();

  const [formValue, setFormValue] = useState<IOrderForm>({
    orderName: "",
    products: [],
    status: OrderStatus.diproses,
    totalPrice: 0,
  });

  const [cart, setCart] = useState<IProductCart[]>([]);

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

    if (filteredCart.length && filteredProducts.length === 1) {
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

    console.log("formValue => ", formValue);
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
        <ScrollContainer vertical>
          <div className={classes.sidebarContent}>
            <HeaderTitle title="Keranjang" />
            {cart.length === 0 ? (
              <p>Keranjang masih kosong</p>
            ) : (
              <>
                {cart.map((product) => (
                  <React.Fragment key={product._id}>
                    <p>{product.productName}</p>
                    <p>{currencyFormatter(Number(product.price))}</p>
                    <button
                      type="button"
                      onClick={() => handleDecreaseQty(product._id)}
                    >
                      -
                    </button>
                    <span style={{ margin: "0px 8px" }}>
                      {product.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleIncreaseQty(product._id)}
                    >
                      +
                    </button>
                    <div style={{ margin: "8px 0px" }}>
                      <input
                        name={product._id}
                        onChange={handleChangeNote}
                        value={product.note}
                      />
                    </div>
                    <div style={{ margin: "8px 0px" }}>
                      <button
                        type="button"
                        onClick={() => handleRemoveCart(product._id)}
                      >
                        Hapus
                      </button>
                    </div>
                    <hr />
                  </React.Fragment>
                ))}
                <p>
                  Total Semua :{" "}
                  {currencyFormatter(Number(formValue.totalPrice))}
                </p>
                <button type="submit">Simpan</button>
              </>
            )}
          </div>
        </ScrollContainer>
      </SidebarRight>
    </form>
  );
};

export default Form;
