import { NextApiResponse, NextApiRequest } from "next";
import { withAuth } from "@middleware/auth";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      res.setHeader(
        "Set-Cookie",
        `auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`
      );
      res.status(200).json({
        message: "Logout berhasil",
      });
      res.end();
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
