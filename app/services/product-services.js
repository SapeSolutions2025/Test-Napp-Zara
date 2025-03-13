import { fetchFromAPI } from "../lib/api-client";
import { eliminateDuplicates } from "../utils/productsUtils";

export const getAllProducts = async () => {
  try {
    const response = await fetchFromAPI("/products?limit=21");
    return eliminateDuplicates(response);
  } catch (error) {
    console.error("Error in getAllProducts:", error);
    return [];
  }
};

export const getProductById = async (id) => {
  try {
    return await fetchFromAPI(`/products/${id}`);
  } catch (error) {
    if (error.status === 404) {
      console.log("Product not found:", error.apiMessage);
    } else {
      console.error("Error fetching product:", error.message);
    }
  }
};

export const searchProducts = async (query) => {
  try {
    if (!query || query.trim() === "") {
      return await getAllProducts();
    }
    const response = await fetchFromAPI(`/products?search=${query}`);
    return eliminateDuplicates(response);
  } catch (error) {
    console.error(`Error in searchProducts for query "${query}":`, error);
    return [];
  }
};
