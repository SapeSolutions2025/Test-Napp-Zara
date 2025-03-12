"use client";

import "./styles/main.scss";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import ProductCard from "./components/ProductCard";
import { searchProducts } from "./services/product-services";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await searchProducts(searchQuery);
        console.log(data);
        // const idCounts = new Map()
        // data.forEach((product) => {
        //   idCounts.set(product.id, (idCounts.get(product.id) || 0) + 1)
        // })

        // const duplicates = Array.from(idCounts.entries())
        //   .filter(([_, count]) => count > 1)
        //   .map(([id]) => id)

        // if (duplicates.length > 0) {
        //   console.warn("Duplicated IDs found:", duplicates)
        // }
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    // Debounce search to avoid too many API calls
    const debounceTimer = setTimeout(() => {
      fetchProducts();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

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
              onChange={(e) => setSearchQuery(e.target.value)}
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
                price={product.price}
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
