import type { NextApiRequest, NextApiResponse } from "next";
import multer from "multer";
import path from "path";
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

    const directory =
      process.env.NODE_ENV === "development"
        ? `public/assets/images/upload`
        : path.join(process.cwd(), "public/assets/images/upload");

    // console.log(__dirname);

    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, directory);
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

      req.imageUrl = `${
        process.env.NODE_ENV === "production"
          ? "https://cashier-app.vercel.app"
          : "http://localhost:3000"
      }/api/image/${imageName}`;
    }

    //req di return agar dapat diambil di handler
    return req;
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      test: {
        dirname: __dirname,
        cwd: process.cwd(),
      },
    });
  }
};
