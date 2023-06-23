import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@component/lib/prismadb";
import serverAuth from "@component/lib/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end(); // Return a 405 status code if the HTTP method is not GET
  }

  try {
    await serverAuth(req, res); // Authenticate the request using the serverAuth function
    const movies = await prismadb.movie.findMany(); // Retrieve all movies from the prismadb
    return res.status(200).json(movies); // Return the movies as JSON with a 200 status code
  } catch (error) {
    console.log(error); // Log any errors that occur during the execution
    return res.status(400).end(); // Return a 400 status code for bad requests
  }
}
