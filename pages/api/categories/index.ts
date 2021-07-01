import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@utils/dbConnect";
import Category from "@models/category";
import { ICategoryResponse, ICategoryForm } from "@custom-types/category";
import { withAuth } from "@middleware/auth";
import { withAdmin } from "@middleware/admin";

dbConnect();

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ICategoryResponse>
) => {
  const { method, body, userData } = req;

  switch (method) {
    case "GET":
      try {
        const categories = await Category.find();

        res.status(200).json({
          categories,
        });
      } catch (error) {
        res.status(500).json({
          message: error.message,
        });
      }
      break;

    case "POST":
      const formData: ICategoryForm = body;
      const { categoryName } = formData;

      try {
        const existingCategory = await Category.findOne({
          categoryLabel: { $regex: new RegExp(categoryName, "i") },
        });

        if (existingCategory) {
          res.status(409).json({
            message: "Nama kategori tidak boleh sama.",
          });
          return;
        }

        const newCategory = await Category.create({ categoryName });

        res.status(201).json({
          newCategory,
          message: "Kategori baru berhasil dibuat.",
        });
      } catch (error) {
        res.status(500).json({
          message: error.message,
        });
      }

      break;

    default:
      res.status(405).json({
        message: "Method not allowed",
      });
      break;
  }
};

export default withAuth(withAdmin(handler));
