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
        const { category, search } = req.query;

        let products = await Product.find();

        if (category && category !== "all") {
          const categoryQuery = await Category.findOne({
            categoryName: category,
          });

          products = await Product.find({ categoryId: categoryQuery._id });
        }

        if (search) {
          products = await Product.find({
            productName: { $regex: search, $options: "i" },
          });
        }

        products.map(async (product: any, index: number) => {
          const { categoryName } = await Category.findById(product.categoryId);

          if (!categoryName) {
            return res.status(401).json({
              message: "Produk ini tak terdaftar dalam kategori",
            });
          }

          product._doc.categoryName = categoryName;

          products[index] = product;
        });

        setTimeout(
          () =>
            res.status(200).json({
              products,
              totalProducts: products.length,
            }),
          1000
        );
      } catch (error) {
        res.status(500).json({
          message: error.message,
        });
      }
      break;

    case "POST":
      try {
        await useUploadImage(req, res);

        res.send({
          test: req.imageUrl,
          // message: `${process.cwd()}/`,
        });

        // const formData: IProductForm = req.body;
        // const { productName, categoryId, price, description } = formData;

        // const newProduct = await Product.create({
        //   productName,
        //   categoryId,
        //   price,
        //   description,
        //   imageUrl: req.imageUrl || "",
        // });

        // const { categoryName } = await Category.findById(categoryId);
        // newProduct._doc.categoryName = categoryName;

        // res.status(201).json({
        //   newProduct,
        //   message: "Produk berhasil dibuat",
        // });
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
