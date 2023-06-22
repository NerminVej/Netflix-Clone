import axios from "axios";

// Define a fetcher function
const fetcher = (url: string) => axios.get(url).then((res) => res.data);
// Export the fetcher function as the default export
export default fetcher;
