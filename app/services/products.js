import { BASE_API_URL } from "../config/api";
import fetchApi from "../lib/fetchApi";
import { revalidate, unstable_cache } from "../lib/unstable_cache";

const PRODUCTS_PER_PAGE = 20;

export const getProducts = unstable_cache(async (query, offset = 0, limit = PRODUCTS_PER_PAGE) => {
  try {
    let url = `${BASE_API_URL}/products?limit=${limit}&offset=${offset}`;
    if (query) {
      url += `&search=${query}`;
    }
    const products = await fetchApi(url);
    return products;

  } catch (error) {
    console.error(`Error in getProducts for query "${query}":`, error);
    return [];
  }
}, (query, offset = 0, limit = PRODUCTS_PER_PAGE) =>
  `getProducts-${query || "all"}-${offset}-${limit}`
  , { revalidate });

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
