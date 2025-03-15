import ProductCard from "./ProductCard";

export default function ProductList({ products }) {
  return (
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard
            key={product.uniqueId}
            id={product.id}
            brand={product.brand}
            name={product.name}
            price={product.basePrice}
            imageUrl={product.imageUrl}
            hasBorder={false}
          />
        ))}
      </div>
  );
}
