import { NextApiRequest, NextApiResponse } from "next";
import { without } from "lodash";

import prismadb from "@component/lib/prismadb";
import serverAuth from "@component/lib/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const { currentUser } = await serverAuth(req, res); // Authenticate the request using the serverAuth function

      const { movieId } = req.body; // Extract the movieId from the request body

      const existingMovie = await prismadb.movie.findUnique({
        where: {
          id: movieId,
        },
      });

      if (!existingMovie) {
        throw new Error("Invalid ID"); // Throw an error if the movie with the provided ID doesn't exist
      }

      const user = await prismadb.user.update({
        where: {
          email: currentUser.email || "",
        },
        data: {
          favoriteIds: {
            push: movieId,
          },
        },
      });
      return res.status(200).json(user); // Return the updated user object as JSON with a 200 status code
    }

    if (req.method === "DELETE") {
      const { currentUser } = await serverAuth(req, res); // Authenticate the request using the serverAuth function

      const { movieId } = req.query as { movieId: string }; // Extract the movieId from the query parameters

      const existingMovie = await prismadb.movie.findUnique({
        where: {
          id: movieId,
        },
      });

      if (!existingMovie) {
        throw new Error("Invalid ID"); // Throw an error if the movie with the provided ID doesn't exist
      }

      const updatedFavoriteIds = without(currentUser.favoriteIds, movieId); // Remove the movieId from the user's favoriteIds using lodash's `without` function

      const updatedUser = await prismadb.user.update({
        where: {
          email: currentUser.email || "",
        },
        data: {
          favoriteIds: updatedFavoriteIds,
        },
      });

      return res.status(200).json(updatedUser); // Return the updated user object as JSON with a 200 status code
    }

    return res.status(405).end(); // Return a 405 status code if the HTTP method is not POST or DELETE
  } catch (error) {
    console.log(error); // Log any errors that occur during the execution
    return res.status(400).end(); // Return a 400 status code for bad requests
  }
}
