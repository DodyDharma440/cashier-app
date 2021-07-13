import { Document } from "mongoose";
import { OrderStatus } from "@enums/order";
import { IProduct } from "@custom-types/product";

export interface IOrderProductForm {
  productId: string;
  quantity: number;
  note: string;
}

export interface IOrderProduct extends IProduct, IOrderProductForm {}

export interface IOrderModel extends Document {
  orderName: string;
  author: string;
  products: IOrderProduct[];
  totalPrice: number | string;
  note: string;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
  _doc?: any;
}

export interface IOrder {
  _id: string;
  orderName: string;
  author: string;
  products: IOrderProduct[];
  totalPrice: number | string;
  note: string;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
  _doc?: any;
  __v: number;
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
