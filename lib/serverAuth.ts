import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import prismadb from "@component/lib/prismadb";
import { authOptions } from "@component/pages/api/auth/[...nextauth]";

// Define an async function called serverAuth that handles server-side authentication
const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => {
  // Retrieve the server session using the getServerSession function from next-auth
  const session = await getServerSession(req, res, authOptions);

  // If the session doesn't exist or the user's email is not available, throw an error indicating not signed in
  if (!session?.user?.email) {
    throw new Error('Not signed in');
  }

  // Retrieve the current user from the Prismadb by finding a unique user based on their email
  const currentUser = await prismadb.user.findUnique({
    where: {
      email: session.user.email,
    }
  });

  // If the current user doesn't exist, throw an error indicating not signed in
  if (!currentUser) {
    throw new Error('Not signed in');
  }

  // Return an object containing the currentUser
  return { currentUser };
}

// Export the serverAuth function as the default export
export default serverAuth;
