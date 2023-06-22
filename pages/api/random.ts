import { NextApiRequest, NextApiResponse } from "next";

import prismadb from "@component/lib/prismadb";
import serverAuth from "@component/lib/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    await serverAuth(req);
  } catch (error) {
    console.log(error);
    return res.status(400).end;
  }
}
