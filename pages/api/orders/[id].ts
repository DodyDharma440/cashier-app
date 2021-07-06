import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@utils/dbConnect";
import Order from "@models/order";
import { withAuth } from "@middleware/auth";
import {
  IOrderResponse,
  IOrderForm,
  IOrderProductForm,
  IOrderProduct,
} from "@custom-types/order";
import { IProduct } from "@custom-types/product";
import Product from "@models/product";

dbConnect();

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<IOrderResponse>
) => {
  const { query } = req;

  switch (req.method) {
    case "GET":
      try {
        const order = await Order.findById(query.id);
        let productsData: IOrderProduct[] = [];

        order.products.map(async (product: IOrderProduct, index: number) => {
          const productData = await Product.findById(product.productId);

          productsData.push({
            ...productData._doc,
            note: product.note,
            quantity: product.quantity,
          });

          if (index === order.products.length - 1) {
            res.status(200).json({
              order: {
                ...order._doc,
                products: productsData,
              },
            });
          }
        });
      } catch (error) {
        res.status(500).json({
          message: error.message,
        });
      }
      break;

    case "PUT":
      try {
        const author = req.userData._id;
        const formData: IOrderForm = req.body;
        const { orderName, products, status, totalPrice } = formData;

        const existingOrder = await Order.findOne({
          orderName,
          author,
        });

        if (existingOrder) {
          if (existingOrder._id.toString() !== query.id) {
            return res.status(409).json({
              message: "Nama pesanan tidak boleh sama.",
            });
          }

          if (existingOrder.author != author) {
            return res.status(401).json({
              message: "Tidak diijinkan untuk update pesanan user lain",
            });
          }
        }

        let productsData: any = [];

        products.map(async (product: IOrderProductForm, index: number) => {
          const productData = await Product.findById(product.productId);
          productsData.push({
            ...productData._doc,
            note: product.note,
            quantity: product.quantity,
          });

          if (index === products.length - 1) {
            const updatedOrder = await Order.findByIdAndUpdate(
              query.id,
              {
                orderName,
                products,
                totalPrice,
                author,
                status,
              },
              {
                new: true,
              }
            );

            res.status(200).json({
              updatedOrder: {
                ...updatedOrder._doc,
                products: productsData,
              },
            });
          }
        });
      } catch (error) {
        res.status(500).json({
          message: error.message,
        });
      }
      break;

    case "DELETE":
      try {
        await Order.findByIdAndRemove(query.id);

        res.status(200).json({
          message: "Berhasil menghapus pesanan.",
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

export default withAuth(handler);
