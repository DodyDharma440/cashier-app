import { NextApiResponse } from "next";
import { getRandomStr } from "@utils/randomString";

export const makeFileName = (file: any, res: NextApiResponse) => {
  const fileUploaded = file;
  const arrayFileName = fileUploaded.originalname.split(".");
  const fileExt = arrayFileName[arrayFileName.length - 1]
    .split(" ")
    .join("")
    .toLowerCase();

  if (fileExt !== "jpg" && fileExt !== "png" && fileExt !== "jpeg") {
    return res.status(409).json({
      message: `Hanya file jpg, jpeg atau png yang diijinkan. Ekstensi file anda .${fileExt}`,
    });
  }

  arrayFileName[0] = `${getRandomStr()}-${new Date().getTime()}`;
  const newImageName = arrayFileName.join(".");

  return newImageName;
};
