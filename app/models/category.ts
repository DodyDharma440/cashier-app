import mongoose from "mongoose";
import { ICategoryModel } from "@custom-types/category";

const categorySchema: mongoose.Schema = new mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Category ||
  mongoose.model<ICategoryModel>("Category", categorySchema);
