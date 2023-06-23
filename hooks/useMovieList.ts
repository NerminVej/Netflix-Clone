import useSWR from "swr";
import fetcher from "@component/lib/fetcher";

// Define a custom hook named useMovieList
const useMovieList = () => {
  // Use the useSWR hook from the swr library to fetch the movie list data
  const { data, error, isLoading } = useSWR("/api/movies", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  // Return the movie list data, error state, and loading state
  return {
    data,
    error,
    isLoading,
  };
};

export default useMovieList;
