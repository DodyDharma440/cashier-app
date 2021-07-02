import { Document } from "mongoose";
import { TableHead } from "@custom-types/table";

export interface IProduct extends Document {
  productName: string;
  categoryId: string;
  categoryName: string;
  price: string;
  imageUrl: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface IProductResponse {
  products?: IProduct[];
  product?: IProduct;
  newProduct?: IProduct;
  updatedProduct?: IProduct;
  message?: string;
  totalProducts?: number;
  test?: any;
}

export interface IProductForm {
  productName: string;
  categoryId: string;
  price: string;
  productImage?: any;
  imageUrl?: string;
  description: string;
}

export interface IProductTable extends TableHead {
  id: keyof IProduct;
}
