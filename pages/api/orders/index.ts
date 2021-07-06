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

        const ordersQuery: any = await Order.find({ author: userId });

        let ordersData: IOrder[] = [];

        if (ordersQuery.length === 0) {
          return res.status(200).json({
            orders: [],
          });
        }

        ordersQuery.map((order: IOrder, indexQuery: number) => {
          let productsData: IOrderProduct[] = [];

          order.products.map(async (product: IOrderProduct, index: number) => {
            const productData = await Product.findById(product.productId);

            productsData.push({
              ...productData._doc,
              note: product.note,
              quantity: product.quantity,
            });

            if (index === order.products.length - 1) {
              ordersData.push({
                ...order?._doc,
                products: productsData,
              });

              if (indexQuery === ordersQuery.length - 1) {
                return res.status(200).json({
                  orders: ordersData,
                });
              }
            }
          });
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

        let productsData: any = [];

        if (products.length === 0) {
          return res.status(400).json({
            message: "Daftar produk masih kosong",
          });
        }

        products.map(async (product: IOrderProductForm, index: number) => {
          const productData = await Product.findById(product.productId);
          productsData.push({
            ...productData._doc,
            note: product.note,
            quantity: product.quantity,
          });

          if (index === products.length - 1) {
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

    default:
      res.status(405).json({
        message: "Method not allowed",
      });
  }
};

export default withAuth(handler);
