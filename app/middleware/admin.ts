import { NextApiRequest, NextApiResponse } from "next";
import { UserStatus } from "@enums/user";

export const withAdmin = (
  handler: (req: NextApiRequest, res: NextApiResponse) => void
) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const isAdmin = req.userData.status === UserStatus.admin;

    if (req.method !== "GET") {
      if (!isAdmin) {
        res.status(401).json({
          message: "Hanya admin yang boleh melakukan aksi ini.",
        });
        return;
      }
    }

    return handler(req, res);
  };
};
