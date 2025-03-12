import { BASE_API_URL, API_KEY } from "../config/api";

export const fetchFromAPI = async (endpoint, options) => {
  const url = `${BASE_API_URL}${endpoint}`;

  const headers = {
    "Content-Type": "application/json",
    "x-api-key": API_KEY,
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching from API:", error);
    throw error;
  }
};
