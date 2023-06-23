import { NextApiRequest, NextApiResponse } from "next";

import prismadb from "@component/lib/prismadb";
import serverAuth from "@component/lib/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "GET") {
      return res.status(405).end();
    }

    const { currentUser } = await serverAuth(req, res); // Authenticate the request using the serverAuth function

    const favoritedMovies = await prismadb.movie.findMany({
      where: {
        id: {
          in: currentUser?.favoriteIds, // Filter movies based on whether their IDs are present in the user's favoriteIds array
        },
      },
    });

    return res.status(200).json(favoritedMovies); // Return the favoritedMovies array as JSON with a 200 status code
  } catch (error) {
    console.log(error); // Log any errors that occur during the execution
    return res.status(500).end(); // Return a 500 status code for internal server errors
  }
}
