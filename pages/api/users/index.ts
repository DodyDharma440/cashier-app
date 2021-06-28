import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import dbConnect from "@utils/dbConnect";
import User from "@models/user";
import { withAuth } from "@middleware/auth";
import { IUserFixedForm, IUserResponse, IUser } from "@custom-types/user";
import { UserStatus } from "@enums/user";

dbConnect();

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<IUserResponse>
) => {
  const { method, body } = req;

  switch (method) {
    case "GET":
      try {
        if (!req.userData) {
          return res.status(401).json({
            message: "Anda belum login. Silahkan login terlebih dahulu",
          });
        }

        const users = await User.find();

        res.status(200).json({
          users,
        });
      } catch (error) {
        res.status(500).json({
          message: error.message,
        });
      }
      break;

    case "POST":
      const formData: IUserFixedForm = body;
      const { name, username, status } = formData;

      try {
        if (!req.userData) {
          return res.status(401).json({
            message: "Anda belum login. Silahkan login terlebih dahulu",
          });
        }

        if (req.userData.status !== UserStatus.admin) {
          return res.status(401).json({
            message: "Hanya admin yang boleh menambahkan user.",
          });
        }

        const existingUser: IUser = await User.findOne({
          username: formData.username,
        });

        if (existingUser) {
          return res.status(409).json({
            message: "Username sudah digunakan.",
          });
        }

        const password = "cashierapp";
        const hashPassword = await bcrypt.hash(password, 12);

        const newUser = await User.create({
          name,
          username,
          password: hashPassword,
          status,
        });

        res.status(201).json({
          newUser,
          message: "Anggota baru berhasil dibuat",
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
