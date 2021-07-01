import { NextApiRequest, NextApiResponse } from "next";
import { unlink } from "fs";
import path from "path";
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
        const product = await Product.findById(req.query.id);
        res.status(200).json({
          product,
        });
      } catch (error) {
        res.status(500).json({
          message: error.message,
        });
      }
      break;

    case "PUT":
      try {
        await useUploadImage(req, res);

        const existingProduct = await Product.findById(req.query.id);

        const formData: IProductForm = req.body;
        const { productName, categoryId, price, description } = formData;
        const { categoryName } = await Category.findById(categoryId);

        if (req.imageUrl) {
          const arrImgUrl = existingProduct.imageUrl.split("/");
          const imageName = arrImgUrl[arrImgUrl.length - 1];

          unlink(
            path.join(
              __dirname,
              `../../../../../public/assets/images/upload/${imageName}`
            ),
            (error) => {
              if (error) {
                console.log(error);
              }
            }
          );
        }

        const updatedProduct = await Product.findByIdAndUpdate(
          req.query.id,
          {
            productName,
            categoryId,
            categoryName,
            price,
            description,
            imageUrl: req.imageUrl || existingProduct.imageUrl,
          },
          {
            new: true,
          }
        );

        res.status(200).json({
          updatedProduct,
          message: "Produk berhasil diperbarui",
        });
      } catch (error) {
        res.status(500).json({
          message: error.message,
        });
      }
      break;

    case "DELETE":
      try {
        const existingProduct = await Product.findById(req.query.id);

        if (existingProduct.imageUrl !== "") {
          const arrImgUrl = existingProduct.imageUrl.split("/");
          const imageName = arrImgUrl[arrImgUrl.length - 1];

          unlink(
            path.join(
              __dirname,
              `../../../../../public/assets/images/upload/${imageName}`
            ),
            (error) => {
              if (error) {
                console.log(error);
              }
            }
          );
        }

        await Product.findByIdAndRemove(req.query.id);

        res.status(200).json({
          message: "Berhasil menghapus produk.",
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