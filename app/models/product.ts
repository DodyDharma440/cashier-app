import mongoose from "mongoose";
import { IProductModel } from "@custom-types/product";

const productSchema: mongoose.Schema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      maxLength: 100,
    },
    categoryId: {
      type: String,
      required: true,
    },
    categoryName: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
    },
    description: {
      type: String,
      maxLength: 1000,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model<IProductModel>("Product", productSchema);
