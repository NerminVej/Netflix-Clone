import useSWR from "swr";
import fetcher from "@component/lib/fetcher";

// Define a custom hook named useCurrentUser
const useCurrentUser = () => {
  // Use the useSWR hook to fetch data from the "/api/current" endpoint
  // The fetcher function is used to handle the actual HTTP request
  const { data, error, isLoading, mutate } = useSWR("/api/current", fetcher);

  // Return the data, error, isLoading, and mutate function
  return {
    data, // Fetched data from the "/api/current" endpoint
    error, // Error that occurred during the fetch
    isLoading, // Loading status indicating whether the fetch is in progress
    mutate, // Function to manually trigger a revalidation of the data
  };
};

// Export the useCurrentUser hook as the default export
export default useCurrentUser;
