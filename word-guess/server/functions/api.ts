import axios from "axios";

// get a random word from the API
export const fetchWordFromAPI = async (length: number): Promise<string> => {
  const url = `https://random-word-api.herokuapp.com/word?length=${length}`;

  try {
    const response = await axios.get<string[]>(url);
    return response.data[0];
  } catch (error) {
    console.error("Error fetching word:", error);
    throw new Error("Failed to fetch word");
  }
};
