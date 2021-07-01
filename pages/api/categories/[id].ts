import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@utils/dbConnect";
import Category from "@models/category";
import { withAuth } from "@middleware/auth";
import { withAdmin } from "@middleware/admin";
import { ICategoryResponse, ICategoryForm } from "@custom-types/category";

dbConnect();

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ICategoryResponse>
) => {
  const { method, body, query, userData } = req;

  switch (method) {
    case "GET":
      try {
        const category = await Category.findById(query.id);
        res.status(200).json({
          category,
        });
      } catch (error) {
        res.status(500).json({
          message: error.message,
        });
      }
      break;

    case "PUT":
      try {
        const formData: ICategoryForm = body;
        const { categoryName } = formData;

        const existingCategory = await Category.findOne({
          categoryLabel: { $regex: new RegExp(categoryName, "i") },
        });

        if (existingCategory) {
          res.status(409).json({
            message: "Nama category sudah ada.",
          });
          return;
        }

        const updatedCategory = await Category.findByIdAndUpdate(
          query.id,
          { categoryName },
          { new: true }
        );

        res.status(200).json({
          updatedCategory,
          message: "Berhasil update kategori",
        });
      } catch (error) {
        res.status(500).json({
          message: error.message,
        });
      }
      break;

    case "DELETE":
      try {
        await Category.findByIdAndRemove(query.id);

        res.status(200).json({
          message: "Berhasil menghapus kategori.",
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
