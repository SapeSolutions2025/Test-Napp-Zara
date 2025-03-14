import apiClient from "../lib/axios-client"
import { eliminateDuplicates } from "../utils/productsUtils"

// Helper function to handle API errors consistently
const handleApiError = (error, functionName) => {
  console.error(`Error in ${functionName}:`, error)
  return []
}

export const getAllProducts = async () => {
  try {
    console.log("Fetching all products...")
    const response = await apiClient.get("/products?limit=21")
    return eliminateDuplicates(response.data)
  } catch (error) {
    return handleApiError(error, "getAllProducts")
  }
}

export const getProductById = async (id) => {
  try {
    const response = await apiClient.get(`/products/${id}`)
    return response.data
  } catch (error) {
    if (error.status === 404) {
      console.log("Product not found:", error.apiMessage)
    } else {
      console.error("Error fetching product:", error.message)
    }
    return null
  }
}

export const searchProducts = async (query) => {
  try {
    if (!query || query.trim() === "") {
      return await getAllProducts();
    }
    const response =  await apiClient.get(`/products?search=${query}`);
    return eliminateDuplicates(response.data);
  } catch (error) {
    console.error(`Error in searchProducts for query "${query}":`, error);
    return [];
  }
};

