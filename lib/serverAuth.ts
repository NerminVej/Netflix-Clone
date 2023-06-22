import { NextApiRequest } from "next";
import { getSession } from "next-auth/react";
import prismadb from "@/lib/prismadb";

const serverAuth = async (req: NextApiRequest) => {
  // Retrieve the session from the request
  const session = await getSession({ req });

  // Check if the user is signed in by verifying the presence of user email in the session
  if (!session?.user?.email) {
    throw new Error("Not signed in");
  }

  // Find the current user in the database using the user's email from the session
  const currentUser = await prismadb.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  // If the current user is not found in the database, throw an error
  if (!currentUser) {
    throw new Error("Not signed in");
  }

  // Return an object containing the current user
  return { currentUser };
};

export default serverAuth;
