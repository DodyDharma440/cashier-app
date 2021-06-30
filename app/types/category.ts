import { Document } from "mongoose";

export interface ICategoryModel extends Document {
  categoryName: string;
}

export interface ICategory {
  _id: string;
  categoryName: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ICategoryResponse {
  categories?: ICategory[];
  category?: ICategory;
  newCategory?: ICategory;
  updatedCategory?: ICategory;
  message?: string;
}

export interface ICategoryForm {
  categoryName: string;
}
