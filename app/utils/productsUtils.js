export const eliminateDuplicates = (products) => {
    return Array.from(new Map(products.map((product) => [product.id, product])).values());
  };