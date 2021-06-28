import { NextApiResponse, NextApiRequest } from "next";
import { withAuth } from "@middleware/auth";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const date = new Date();
      date.setTime(date.getTime());
      res.setHeader(
        "Set-Cookie",
        `auth_token=; path=/; expires=${date.toUTCString()}`
      );
      res.status(200).json({
        message: "Logout berhasil",
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  } else {
    res.status(400).json({
      message: "Method not allowed",
    });
  }
};

export default withAuth(handler);
