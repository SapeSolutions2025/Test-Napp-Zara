import { Suspense } from "react";
import { getProducts } from "./services/products";
import SearchForm from "./components/SearchForm";
import ProductList from "./components/ProductList";
import ProductsGridSkeleton from "./components/skeletons/ProductsGridSkeleton";
import "./styles/main.scss";
import NoProductsFound from "./components/NoProductsFound";

async function ProductsContainer({ searchParams }) {
  const filters = (await searchParams).search;

  const products = await getProducts(filters);

  return (
    <>
      <div className="results-count">{`${products.length} RESULTS`}</div>
      <div className="main-content">
        <div className="container">
          {products.length > 0 ? (
            <ProductList products={products} />
          ) : (
            <NoProductsFound searchTerm={filters} />
          )}
        </div>
      </div>
    </>
  );
}

export default function HomePage({ searchParams }) {
  return (
    <>
      <SearchForm />
      <Suspense fallback={<ProductsGridSkeleton />}>
        <ProductsContainer searchParams={searchParams} />
      </Suspense>
    </>
  );
}
