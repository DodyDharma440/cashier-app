import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@utils/dbConnect";
import User from "@models/user";
import { withAuth } from "@middleware/auth";
import { IUserFixedForm, IUserResponse } from "@custom-types/user";
import { UserStatus } from "@enums/user";

dbConnect();

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<IUserResponse>
) => {
  const { method, body, query, userData } = req;

  switch (method) {
    case "GET":
      try {
        if (!userData) {
          return res.status(401).json({
            message: "Anda belum login. Silahkan login terlebih dahulu",
          });
        }

        const user = await User.findById(query.id);

        res.status(200).json({
          user,
        });
      } catch (error) {
        res.status(500).json({
          message: error.message,
        });
      }
      break;

    case "PUT":
      const formData: IUserFixedForm = body;
      const { name, username, status } = formData;

      try {
        if (!userData) {
          return res.status(401).json({
            message: "Anda belum login. Silahkan login terlebih dahulu",
          });
        }

        const isAdmin = userData.status === UserStatus.admin;

        if (!isAdmin && userData._id.toString() !== query.id) {
          return res.status(400).json({
            message: "Tidak dapat untuk edit user lain.",
          });
        }

        const existingUser = await User.findOne({ username });

        if (existingUser && existingUser._id.toString() !== query.id) {
          res.status(409).json({
            message: "Username sudah digunakan.",
          });
          return;
        }

        const updatedUser = await User.findByIdAndUpdate(
          query.id,
          {
            username,
            name,
            status,
          },
          {
            new: true,
          }
        );

        res.status(200).json({
          updatedUser,
          message: "Berhasil update data anggota.",
        });
      } catch (error) {
        res.status(500).json({
          message: error.message,
        });
      }
      break;

    case "DELETE":
      try {
        if (!userData) {
          return res.status(401).json({
            message: "Anda belum login. Silahkan login terlebih dahulu",
          });
        }

        const isAdmin = userData.status === UserStatus.admin;

        if (!isAdmin) {
          return res.status(401).json({
            message: "Hanya admin yang boleh menghapus user.",
          });
        }

        await User.findByIdAndRemove(query.id);

        res.status(200).json({
          message: "Berhasil menghapus user.",
        });
      } catch (error) {
        res.status(500).json({
          message: error.message,
        });
      }
      break;

    default:
      res.status(400).json({
        message: "Method not allowed",
      });
      break;
  }
};

export default withAuth(handler);
