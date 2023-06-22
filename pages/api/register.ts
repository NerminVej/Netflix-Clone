import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "POST") {
      return res.status(405).end();
    }

    const { email, name, password } = req.body;

    // Check if the user with the given email already exists
    const existingUser = await prismadb.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      // If the user already exists, return an error response
      return res.status(422).json({ error: "Email taken" });
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create a new user in the database
    const user = await prismadb.user.create({
      data: {
        email,
        name,
        hashedPassword,
        image: "",
        emailVerified: new Date(),
      },
    });

    // Return a success response with the created user object
    return res.status(200).json(user);
  } catch (error) {
    // Return an error response if any error occurs during the process
    return res.status(400).json({ error: `Something went wrong: ${error}` });
  }
}
