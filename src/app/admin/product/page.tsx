import { getAllProducts } from "@/services/product/service.product";
import ProductsClient from "./ProductsClient";

export default async function ProductPage({ searchParams }: {
  searchParams: Promise<{ success?: string; deleted?: string }>;
}) {
  const { success, deleted } = await searchParams;
  const raw = await getAllProducts();
  const products = raw.map((p) => ({ ...p, price: p.price.toString() }));
  return <ProductsClient products={products} success={success} deleted={deleted} />;
}
