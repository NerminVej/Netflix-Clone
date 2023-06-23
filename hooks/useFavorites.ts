import useSWR from 'swr';
import fetcher from '@component/lib/fetcher';

const useMovies = () => {
  const { data, error, isLoading, mutate } = useSWR('/api/favorites', fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return {
    data, // Fetched data from the "/api/favorites" endpoint
    error, // Error that occurred during the fetch
    isLoading, // Loading status indicating whether the fetch is in progress
    mutate, // Function to manually trigger a revalidation of the data
  };
};

export default useMovies;
