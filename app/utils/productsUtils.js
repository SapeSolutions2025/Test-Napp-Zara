import { v4 as uuidv4 } from "uuid";

export const eliminateDuplicates = (products) => {
  return Array.from(
    new Map(products.map((product) => [product.id, product])).values()
  );
};

export const assignUniqueIds = (products) => {
  if (!Array.isArray(products)) {
    console.warn("assignUniqueIds received a non-array value:", products);
    return [];
  }
  return products.map((product) => {
    if (product && typeof product === "object" && !product.uniqueId) {
      return { ...product, uniqueId: uuidv4() };
    }
    return product;
  });
};
