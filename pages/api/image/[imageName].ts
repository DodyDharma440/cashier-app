import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { imageName } = req.query;

    const arrImgName: any =
      typeof imageName === "string" && imageName.split(".");
    const fileExt = arrImgName[arrImgName.length - 1];

    const filePath = `public/assets/images/upload/${imageName}`;
    const imageBuffer = fs.readFileSync(filePath);

    res.setHeader("Content-Type", `image/${fileExt.toLowerCase()}`);
    res.send(imageBuffer);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export default handler;
