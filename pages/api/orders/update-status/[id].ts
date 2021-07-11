import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@utils/dbConnect";
import Order from "@models/order";
import { withAuth } from "@middleware/auth";
import { IOrderResponse } from "@custom-types/order";

dbConnect();

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<IOrderResponse>
) => {
  const { id } = req.query;

  switch (req.method) {
    case "PUT":
      try {
        const author = req.userData._id;
        const { status } = req.body;

        const existingOrder = await Order.findOne({
          author,
        });

        if (existingOrder.author != author) {
          return res.status(401).json({
            message: "Tidak diijinkan untuk update pesanan user lain",
          });
        }

        await Order.findByIdAndUpdate(id, { status }, { new: true });

        res.status(200).json({
          message: status,
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
