import Image from "next/image";
import { Inter } from "next/font/google";
import { NextPageContext } from "next";
import { getSession, signOut } from "next-auth/react";

// This function is executed on the server-side to get the initial props for the page
export async function getServerSideProps(context: NextPageContext) {
  // Retrieve the session information using the getSession function from next-auth
  const session = await getSession(context);

  // If there is no session (user is not authenticated), redirect them to the "/auth" page
  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  // If the user is authenticated, return an empty object as props
  return {
    props: {},
  };
}

// Load the Inter font subset (in this case, "latin")
const inter = Inter({ subsets: ["latin"] });

// The default export for the Home component
export default function Home() {
  return (
    <main>
      {/* Display a heading with the "text-green-500" CSS class */}
      <h1 className="text-green-500"> Netflix Clone</h1>

      {/* Render a sign out button that triggers the signOut function from next-auth */}
      <button className="h-10 w-full bg-white" onClick={() => signOut()}>
        {" "}
        Sign Out
      </button>
    </main>
  );
}
