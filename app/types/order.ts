import { Document } from "mongoose";
import { OrderStatus } from "@enums/order";
import { IProduct } from "@custom-types/product";

export interface IOrderProductForm {
  productId: string;
  quantity: number;
  note: string;
}

export interface IOrderProduct extends IProduct, IOrderProductForm {}

export interface IOrder extends Document {
  orderName: string;
  author: string;
  products: IOrderProduct[];
  totalPrice: number | string;
  note: string;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  _doc?: any;
}

export interface IOrderResponse {
  orders?: IOrder[];
  order?: IOrder;
  newOrder?: IOrder;
  updatedOrder?: IOrder;
  message?: string;
  totalOrders?: number;
  test?: any;
}

export interface IOrderForm {
  orderName: string;
  products: IOrderProductForm[];
  status?: OrderStatus;
  totalPrice: number;
}
