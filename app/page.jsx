import Home from "./components/Home";
import { searchProducts } from "./services/product-services";

export default async function Page() {
  const products = await searchProducts("");

  return <Home initialProducts={products} />;
}