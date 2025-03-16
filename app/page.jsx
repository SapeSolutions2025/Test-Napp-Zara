import { Suspense } from "react";
import NoProductsFound from "./components/NoProductsFound";
import ProductList from "./components/ProductList";
import SearchForm from "./components/SearchForm";
import ProductsGridSkeleton from "./components/skeletons/ProductsGridSkeleton";
import { getProducts } from "./services/products";
import "./styles/main.scss";

async function ProductsContainer({ searchParams }) {
  const filters = (await searchParams).search;

  const products = await getProducts(filters);

  return (
    <>
      <div className="results-count">{`${products.length} RESULTS`}</div>
      <div className="main-content">
        <div className="container">
          {!!products.length ? (
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
