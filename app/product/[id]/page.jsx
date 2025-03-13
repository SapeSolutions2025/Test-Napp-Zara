import ProductDetail from "../../components/ProductDetail";
import { getProductById } from "../../services/product-services";
import { notFound } from "next/navigation";

export default async function ProductPage({ params }) {
  const { id } = await params;

  const product = await getProductById(id);
  if (!product) return notFound(); 

  return <ProductDetail product={product} />;
}