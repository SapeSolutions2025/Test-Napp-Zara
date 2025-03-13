import { BASE_API_URL, NEXT_PUBLIC_API_KEY } from "../config/api";

export const fetchFromAPI = async (endpoint, options) => {
  const url = `${BASE_API_URL}${endpoint}`;

  const headers = {
    "Content-Type": "application/json",
    "x-api-key": NEXT_PUBLIC_API_KEY,
  };

  try {
    console.log(`Fetching from: ${url}`)
    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      let errorData
      try {
        errorData = await response.json()
      } catch (e) {
        // If it's not JSON, get the text
        const errorText = await response.text()
        errorData = { error: response.statusText, message: errorText }
      }
      console.error(`API error: ${response.status} ${response.statusText}`, errorData)
      const error = new Error(errorData.message || `API error: ${response.status} ${response.statusText}`)
      error.status = response.status
      error.statusText = response.statusText
      error.apiError = errorData.error
      error.apiMessage = errorData.message
      error.data = errorData

      throw error
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching from API:", error);
    throw error;
  }
};
