import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@utils/dbConnect";
import Order from "@models/order";
import Product from "@models/product";
import Category from "@models/category";
import { withAuth } from "@middleware/auth";
import { IOrderResponse, IOrderForm } from "@custom-types/order";

dbConnect();

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<IOrderResponse>
) => {
  switch (req.method) {
    case "GET":
      try {
        const userId = req.userData._id;

        const orders = await Order.find({ author: userId });
        res.status(200).json({
          orders,
        });
      } catch (error) {
        res.status(500).json({
          message: error.message,
        });
      }
      break;

    case "POST":
      try {
        const author = req.userData._id;
        const formData: IOrderForm = req.body;

        const { orderName, products } = formData;

        const exisitingOrder = await Order.findOne({
          orderName,
          author,
        });

        if (exisitingOrder) {
          return res.status(409).json({
            message: "Nama pesanan tidak boleh sama.",
          });
        }

        let totalPrice: number = 0;

        products.map((product: any) => {
          const price = Number(product.price) * product.quantity;
          totalPrice += price;
        });

        const newOrder = await Order.create({
          orderName,
          products,
          totalPrice,
          author,
          status: "diproses",
        });

        res.status(201).json({
          newOrder,
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
  }
};

export default withAuth(handler);
