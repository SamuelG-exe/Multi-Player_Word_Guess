export const fetchWord = async (length: Number) => {
  try {
    const response = await fetch(
      `https://8kxrj1e308.execute-api.us-east-1.amazonaws.com/fetchWordFunction?length=${length}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch word");
    }
    const data = await response.json();
    return data.word;
  } catch (err) {
    console.error("Error fetching word:", err);
    throw new Error("Failed to fetch word. Please try again.");
  }
};
