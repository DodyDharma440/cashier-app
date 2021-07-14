import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@utils/dbConnect";
import Order from "@models/order";
import Product from "@models/product";
import { withAuth } from "@middleware/auth";
import {
  IOrderResponse,
  IOrderForm,
  IOrder,
  IOrderProduct,
  IOrderProductForm,
} from "@custom-types/order";
import { IProduct } from "@custom-types/product";

dbConnect();

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<IOrderResponse>
) => {
  switch (req.method) {
    case "GET":
      try {
        const userId = req.userData._id;

        const ordersQuery = await Order.find({ author: userId });

        ordersQuery.map(async (order: IOrder, index: number) => {
          const arrId: string[] = order.products.map(
            (product: IOrderProduct) => product.productId
          );

          const products = await Product.find({
            _id: {
              $in: arrId,
            },
          });

          products.forEach((product: IProduct, indexProd: number) => {
            //index from order products
            const indexOrder = order.products.findIndex(
              (prod: any) =>
                prod.productId.toString() === product._id.toString()
            );

            products[indexProd] = {
              ...product._doc,
              note: order.products[indexOrder].note,
              quantity: order.products[indexOrder].quantity,
            };
          });

          ordersQuery[index] = {
            ...order._doc,
            products,
          };
        });

        setTimeout(
          () =>
            res.status(200).json({
              orders: ordersQuery,
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
        const author = req.userData._id;
        const formData: IOrderForm = req.body;

        const { orderName, products, totalPrice } = formData;

        const exisitingOrder = await Order.findOne({
          orderName,
          author,
        });

        if (exisitingOrder) {
          return res.status(409).json({
            message: "Nama pesanan tidak boleh sama.",
          });
        }

        if (products.length === 0) {
          return res.status(400).json({
            message: "Daftar produk masih kosong",
          });
        }

        const arrId: string[] = products.map(
          (product: IOrderProductForm) => product.productId
        );

        const productsQuery = await Product.find({
          _id: {
            $in: arrId,
          },
        });

        productsQuery.forEach((product: IProduct, index: number) => {
          const indexProd = products.findIndex(
            (prod: IOrderProductForm) =>
              prod.productId.toString() === product._id.toString()
          );

          productsQuery[index] = {
            ...product._doc,
            note: products[indexProd].note,
            quantity: products[indexProd].quantity,
          };
        });

        const newOrder = await Order.create({
          orderName,
          products,
          totalPrice,
          author,
          status: "diproses",
        });

        res.status(201).json({
          newOrder: {
            ...newOrder._doc,
            products: productsQuery,
          },
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
