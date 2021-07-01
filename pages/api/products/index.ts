import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@utils/dbConnect";
import Product from "@models/product";
import Category from "@models/category";
import { withAuth } from "@middleware/auth";
import { withAdmin } from "@middleware/admin";
import { IProductResponse, IProductForm } from "@custom-types/product";
import { useUploadImage } from "@middleware/imageUpload";

dbConnect();

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<IProductResponse>
) => {
  switch (req.method) {
    case "GET":
      try {
        const products = await Product.find();

        res.status(200).json({
          products,
          totalProducts: products.length,
        });
      } catch (error) {
        res.status(500).json({
          message: error.message,
        });
      }
      break;

    case "POST":
      try {
        await useUploadImage(req, res);

        const formData: IProductForm = req.body;
        const { productName, categoryId, price, description } = formData;
        const { categoryName } = await Category.findById(categoryId);

        const newProduct = await Product.create({
          productName,
          categoryId,
          categoryName,
          price,
          description,
          imageUrl: req.imageUrl || "",
        });

        res.status(201).json({
          newProduct,
          message: "Produk berhasil dibuat",
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

export const config = {
  api: {
    bodyParser: false,
  },
};
