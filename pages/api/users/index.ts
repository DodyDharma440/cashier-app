import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@utils/dbConnect";

dbConnect();

export default async (req: NextApiRequest, res: NextApiResponse) => {};
