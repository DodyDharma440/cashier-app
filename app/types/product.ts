import { Document } from "mongoose";

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
  description: string;
}
