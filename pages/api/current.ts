import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@component/lib/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Check if the request method is "GET"
  if (req.method !== "GET") {
    // If not, return a "Method Not Allowed" response with a status code of 405
    return res.status(405).end();
  }

  try {
    // Authenticate the server-side request using the serverAuth function
    const { currentUser } = await serverAuth(req);
    return res.status(200).json(currentUser);
    // If authentication is successful, you can proceed with your logic here
  } catch (error) {
    // If an error occurs during authentication, log the error and return a "Bad Request" response with a status code of 400
    console.log(error);
    return res.status(500).end();
  }
}
