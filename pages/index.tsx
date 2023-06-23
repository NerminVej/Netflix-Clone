import Image from "next/image";
import { Inter } from "next/font/google";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import Navbar from "@component/components/Navbar";
import Billboard from "@component/components/Billboard";
import MovieList from "@component/components/MovieList";
import useMovieList from "@component/hooks/useMovieList";
import useFavorites from "@component/hooks/useFavorites";

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

  const { data: movies = [] } = useMovieList();
  const { data: favorites = [] } = useFavorites();

  return (
    <main>
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MovieList title="Trending Now" data={movies}/>
        <MovieList title="My List" data={favorites}/>
      </div>
    </main>
  );
}
