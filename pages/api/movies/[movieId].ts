import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@component/lib/prismadb";
import serverAuth from "@component/lib/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "GET") {
      return res.status(405).end(); // Return a 405 status code if the HTTP method is not GET
    }

    await serverAuth(req, res); // Authenticate the request using the serverAuth function

    const { movieId } = req.query;

    if (typeof movieId !== "string") {
      throw new Error("Invalid Id"); // Throw an error if the movieId is not a string
    }

    if (!movieId) {
      throw new Error("Missing Id"); // Throw an error if the movieId is missing
    }

    const movies = await prismadb.movie.findUnique({
      where: {
        id: movieId,
      },
    });

    return res.status(200).json(movies); // Return the movie data as JSON with a 200 status code
  } catch (error) {
    console.log(error); // Log any errors that occur during the execution
    return res.status(500).end(); // Return a 500 status code for internal server errors
  }
}
