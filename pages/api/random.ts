import { NextApiRequest, NextApiResponse } from "next";

import prismadb from "@component/lib/prismadb";
import serverAuth from "@component/lib/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end(); // Return a 405 status code if the HTTP method is not GET (method not allowed)
  }

  try {
    await serverAuth(req, res); // Authenticate the request using the serverAuth function

    const movieCount = await prismadb.movie.count(); // Count the total number of movies in the database
    const randomIndex = Math.floor(Math.random() * movieCount); // Generate a random index based on the movie count
    const randomMovies = await prismadb.movie.findMany({
      // Retrieve a single random movie from the database
      take: 1, // Retrieve only one movie
      skip: randomIndex, // Skip a certain number of movies based on the random index
    });

    return res.status(200).json(randomMovies[0]); // Return the first (and only) movie in the randomMovies array as JSON with a 200 status code
  } catch (error) {
    console.log(error); // Log any errors that occur during the execution
    return res.status(400).end(); // Return a 400 status code for bad requests
  }
}
