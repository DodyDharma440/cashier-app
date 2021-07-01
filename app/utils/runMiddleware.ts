import { NextApiRequest, NextApiResponse } from "next";

export const runMiddleware = (
  req: NextApiRequest,
  res: NextApiResponse,
  middleware: any
) => {
  return new Promise((resolve, reject) => {
    middleware(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};
