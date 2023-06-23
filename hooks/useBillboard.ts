import useSWR from "swr";
import fetcher from "@component/lib/fetcher";

const useBillboard = () => {
  // The useSWR hook is used to fetch data from the "/api/random" endpoint
  // The fetcher function is used to handle the actual HTTP request
  const { data, error, isLoading } = useSWR("/api/random", fetcher, {
    revalidateIfStale: false, // Disable automatic revalidation when the data is stale
    revalidateOnFocus: false, // Disable automatic revalidation when the window gains focus
    revalidateOnReconnect: false, // Disable automatic revalidation when the network connection is restored
  });

  // The hook returns the data, error, and isLoading status
  return {
    data, // Fetched data from the "/api/random" endpoint
    error, // Error that occurred during the fetch
    isLoading, // Loading status indicating whether the fetch is in progress
  };
};

export default useBillboard;
