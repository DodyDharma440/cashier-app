import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
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

        const arrId: string[] = order.products.map(
          (product: IOrderProduct) => product.productId
        );

        const products = await Product.find({
          _id: {
            $in: arrId,
          },
        });

        products.forEach((product: IProduct, index: number) => {
          //index from order products
          const indexProd = order.products.findIndex(
            (prod: IOrderProductForm) =>
              prod.productId.toString() === product._id.toString()
          );

          products[index] = {
            ...product._doc,
            note: order.products[indexProd].note,
            quantity: order.products[indexProd].quantity,
          };
        });

        res.status(200).json({
          order: {
            ...order._doc,
            products,
          },
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
            products: productsQuery,
          },
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
