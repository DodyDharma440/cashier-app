import React, { useState } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";
import { IOrderForm } from "@custom-types/order";
import { OrderStatus } from "@enums/order";
import { SidebarRight } from "@components/common";
import { MenuOrder } from "@components/orders";
import { ICategory } from "@custom-types/category";

type Props = {
  categories: ICategory[];
};

const Form: React.FC<Props> = ({ categories }) => {
  const [formValue, setFormValue] = useState<IOrderForm>({
    orderName: "",
    products: [],
    status: OrderStatus.diproses,
    totalPrice: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue({ ...formValue, orderName: e.target.value });
  };

  return (
    <form>
      <TextField
        label="Nama Pesanan"
        fullWidth
        value={formValue.orderName}
        onChange={handleChange}
        variant="outlined"
        required
      />
      <MenuOrder categories={categories} />
      <SidebarRight>
        <div>pp</div>
      </SidebarRight>
    </form>
  );
};

export default Form;
