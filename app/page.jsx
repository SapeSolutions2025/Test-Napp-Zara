import Home from "./components/Home";
import { searchProducts } from "./services/services";

export default async function Page() {
  const products = await searchProducts();

  return <Home initialProducts={products} />;
}
