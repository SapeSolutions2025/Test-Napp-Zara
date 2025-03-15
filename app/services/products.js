import { BASE_API_URL } from "../config/api";
import fetchApi from "../lib/fetchApi";
import { assignUniqueIds } from "../utils/productsUtils";

const PRODUCTS_PER_PAGE = 20;

export const getProducts = async (query, offset = 0) => {
  try {
    let url = `${BASE_API_URL}/products?limit=${PRODUCTS_PER_PAGE}&offset=${offset}`;
    if (query) {
      url += `&search=${query}`;
    }
    const products = await fetchApi(url);
    const productsWithIds = assignUniqueIds(products);
    return productsWithIds;

  } catch (error) {
    console.error(`Error in getProducts for query "${query}":`, error);
    return [];
  }
};

export const getProductById = async (id) => {
  try {
    const url = `${BASE_API_URL}/products/${id}`;
    const reponse = await fetchApi(url);
    return reponse;
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    throw error;
  }
};
