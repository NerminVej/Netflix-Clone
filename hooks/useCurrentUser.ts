import useSwr from "swr";
import fetcher from "@/lib/fetcher";

// Define a custom hook named useCurrentUser
const useCurrentUser = () => {
  // Use the useSwr hook from the swr library to fetch data
  const { data, error, isLoading, mutate } = useSwr("/api/current", fetcher);

  // Return the data, error, isLoading, and mutate function
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

// Export the useCurrentUser hook as the default export
export default useCurrentUser;
