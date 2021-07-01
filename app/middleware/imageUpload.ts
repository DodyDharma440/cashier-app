import type { NextApiRequest, NextApiResponse } from "next";
import multer from "multer";
import { runMiddleware } from "@utils/runMiddleware";
import { makeFileName } from "@utils/makeFileName";

declare module "next" {
  export interface NextApiRequest {
    files: any[];
    imageUrl: string;
  }
}

export const useUploadImage = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    let imageName = "";

    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, "public/assets/images/upload");
      },
      filename: (req, file, cb) => {
        imageName = makeFileName(file, res);
        cb(null, imageName);
      },
    });

    const upload = multer({ storage });
    await runMiddleware(req, res, upload.any());

    if (req.files?.length) {
      if (req.files.length > 1) {
        return res.status(400).json({
          message: "Only 1 file allowed",
        });
      }

      req.imageUrl = `http://localhost:3000/api/image/${imageName}`;
    }

    //req di return agar dapat diambil di handler
    return req;
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
