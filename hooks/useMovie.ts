import useSWR from "swr";
import fetcher from "@component/lib/fetcher";

// Define a custom hook named useMovie
const useMovie = (id?: string) => {
  // Use the useSWR hook from the swr library to fetch movie data
  const { data, error, isLoading } = useSWR(
    id ? `/api/movies/${id}` : null,   // Conditionally fetch movie data based on the presence of the movie ID
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  // Return the movie data, error, and loading state
  return {
    data,
    error,
    isLoading,
  };
};

export default useMovie;
