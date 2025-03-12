import { fetchFromAPI } from "../lib/api-client";

export const getAllProducts = async () => {
  try {
    const response = await fetchFromAPI("/products?limit=21");
    const uniqueProducts = Array.from(
      new Map(response.map((product) => [product.id, product])).values()
    );
    return uniqueProducts;
  } catch (error) {
    console.error("Error in getAllProducts:", error);
    return [];
  }
};

export const getProductById = async (id) => {
  try {
    return await fetchFromAPI(`/products/${id}`);
  } catch (error) {
    console.error(`Error in getProductById for id ${id}:`, error);
    throw error;
  }
};

export const searchProducts = async (query) => {
  try {
    if (!query || query.trim() === "") {
      return await getAllProducts();
    }
    return await fetchFromAPI(`/products?search=${query}`);
  } catch (error) {
    console.error(`Error in searchProducts for query "${query}":`, error);
    return [];
  }
};
