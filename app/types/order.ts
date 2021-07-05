import { Document } from "mongoose";
import { OrderStatus } from "@enums/order";

interface IProduct {
  productId: string;
  productName: string;
  categoryName: string;
  price: string;
  imageUrl: string;
  quantity: string;
}

export interface IOrder extends Document {
  orderName: string;
  author: string;
  products: IProduct[];
  totalPrice: number | string;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
}

export interface IOrderResponse {
  orders?: IOrder[];
  order?: IOrder;
  newOrder?: IOrder;
  updatedOrder?: IOrder;
  message?: string;
  totalOrders?: number;
}

export interface IOrderForm {
  orderName: string;
  products: IProduct[];
}
