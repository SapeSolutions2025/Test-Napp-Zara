"use client";

import { useState } from "react";
import Navbar from "./Navbar";
import ProductCard from "./ProductCard";
import { searchProducts } from "../services/product-services";

export default function Home({ initialProducts }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState(initialProducts);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (query) => {
    setSearchQuery(query);
    setIsLoading(true);
    const data = await searchProducts(query);
    setProducts(data);
    setIsLoading(false);
  };

  return (
    <main>
      <div className="sticky-header">
        <Navbar />
        <div className="container">
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="Search for a smartphone..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="container main-content">
        <div className="results-count">
          {isLoading ? "Searching..." : `${products.length} RESULTS`}
        </div>
        <div className="products-grid">
          {isLoading ? (
            <p>Loading products...</p>
          ) : products.length > 0 ? (
            products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                brand={product.brand}
                name={product.name}
                price={product.basePrice}
                imageUrl={product.imageUrl}
              />
            ))
          ) : (
            <p>No products found. Try a different search term.</p>
          )}
        </div>
      </div>
    </main>
  );
}
