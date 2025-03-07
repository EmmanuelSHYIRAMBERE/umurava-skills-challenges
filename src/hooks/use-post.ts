import axios from "axios";
import useSWRMutation from "swr/mutation";

// Function to handle data addition (POST)
const addData = async (
  url: string,
  { arg }: { arg: Record<string, unknown> }
) => {
  try {
    // Retrieve token from local storage
    const token = localStorage.getItem("token");

    const headers = token ? { Authorization: `Bearer ${token}` } : undefined;

    const response = await axios.post(url, arg, { headers });

    return response.data;
  } catch (error) {
    console.log("Error adding data:", error);
    throw new Error("Failed to add data");
  }
};

// Custom hook for adding data
const usePost = (path: string) => {
  const url = `${path}`;
  const { trigger, isMutating, data, error } = useSWRMutation(url, addData);

  return {
    add: trigger,
    isAdding: isMutating,
    data,
    error,
  };
};

export default usePost;
