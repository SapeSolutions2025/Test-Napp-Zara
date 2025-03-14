import axios from "axios"
import { ApiError } from "./errors"

// Get environment variables with fallback values for debugging
const BASE_API_URL = process.env.BASE_API_URL || "https://prueba-tecnica-api-tienda-moviles.onrender.com"
const NEXT_PUBLIC_API_KEY = process.env.NEXT_PUBLIC_API_KEY || ""

// Log the API URL for debugging (will only show in server logs)
console.log("Using API URL:", BASE_API_URL)

// Create axios instance
const apiClient = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
    "x-api-key": NEXT_PUBLIC_API_KEY,
  },
})

// Interceptor to handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response || error)

    const status = error.response?.status || 500
    const errorData = error.response?.data || {
      error: error.message,
      message: "Error de conexión con el servidor",
    }

    throw new ApiError(errorData.message || `Error API: ${status}`, status, errorData)
  },
)

export default apiClient



