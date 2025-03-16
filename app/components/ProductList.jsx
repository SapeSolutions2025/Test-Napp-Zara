import ProductCard from "./ProductCard";

export default function ProductList({ products }) {
  return (
      <div className="products-grid">
        {products.map((product,index) => (
          <ProductCard
            key={`${product.id}-${index}`}
            id={product.id}
            brand={product.brand}
            name={product.name}
            price={product.basePrice}
            imageUrl={product.imageUrl}
          />
        ))}
      </div>
  );
}
