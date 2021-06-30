import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import User from "@models/user";
import { IUser } from "@custom-types/user";

declare module "next" {
  export interface NextApiRequest {
    userData: IUser;
  }
}

export const withAuth = (
  handler: (req: NextApiRequest, res: NextApiResponse) => void
) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    let token;

    if (req.cookies && req.cookies.auth_token) {
      token = req.cookies.auth_token;
    }

    if (!token) {
      return res.status(401).json({
        message: "Anda belum login. Silahkan login terlebih dahulu.",
      });
    }

    try {
      const decodedToken: any = jwt.verify(token, process.env.jwtKey || "");
      const existingUser: IUser = await User.findById(decodedToken.userId);

      req.userData = existingUser;

      return handler(req, res);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };
};
