import ProductCard from "./ProductCard";

export default function ProductList({ products }) {
  return (
    <>
      <div className="results-count">
        {`${products.length} RESULTS`}
      </div>
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            brand={product.brand}
            name={product.name}
            price={product.basePrice}
            imageUrl={product.imageUrl}
          />
        ))}
      </div>
    </>
  );
}
