import mongoose from "mongoose";
import { IOrder } from "@custom-types/order";
import { OrderStatus } from "@enums/order";

const orderSchema: mongoose.Schema = new mongoose.Schema(
  {
    orderName: {
      type: String,
      required: true,
      unique: true,
    },
    author: {
      type: String,
      required: true,
    },
    products: {
      type: Array,
      default: [],
      required: true,
    },
    totalPrice: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: [OrderStatus.selesai, OrderStatus.dibatalkan, OrderStatus.diproses],
    },
  },
  { timestamps: true }
);

export default mongoose.models.Order ||
  mongoose.model<IOrder>("Order", orderSchema);
