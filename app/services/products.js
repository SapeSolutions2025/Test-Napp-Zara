import apiClient from "../lib/axios-client";
import { eliminateDuplicates } from "../utils/productsUtils";

export const getProducts = async (filters) => {
  try {
    const { search = "" } = filters;
    const params = {
      ...(search && { search }), 
    }
    const response = await apiClient.get("/products", { params });
    return eliminateDuplicates(response.data);
  } catch (error) {
    console.error("Error obteniendo productos:", error);
    return [];
  }
};

export const getProductById = async (id) => {
  try {
    const response = await apiClient.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    if (error.status === 404) {
      notFound();
    }
    throw error;
  }
};

