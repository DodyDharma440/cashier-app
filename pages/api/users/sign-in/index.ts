import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dbConnect from "@utils/dbConnect";
import { IUser, IUserResponse, IUserLoginForm } from "@custom-types/user";
import User from "@models/user";

dbConnect();

export default async (
  req: NextApiRequest,
  res: NextApiResponse<IUserResponse>
) => {
  const formData: IUserLoginForm = req.body;

  try {
    const existingUser: IUser = await User.findOne({
      username: formData.username,
    });

    if (!existingUser) {
      return res.status(404).json({
        message: "Pengguna tidak ditemukan.",
      });
    }

    const { username, name, status, _id } = existingUser;

    const isPwCorrect = await bcrypt.compare(
      formData.password,
      existingUser.password
    );

    if (!isPwCorrect) {
      return res.status(400).json({
        message: "Password yang dimasukkan salah.",
      });
    }

    const token = jwt.sign(
      {
        userId: _id,
        username,
        name,
        status,
      },
      process.env.jwtKey || "secret",
      { expiresIn: "1d" }
    );

    res.status(200).json({
      result: {
        userId: _id,
        name,
        username,
        status,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
