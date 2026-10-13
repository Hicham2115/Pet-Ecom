import type { Metadata } from "next";
import { SingleProductPage } from "@/components/single-product-page";
import { ShopifyProductPage } from "@/components/shopify-product-page";
import { getProductBySlug } from "@/lib/products";

type ProductRouteProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: ProductRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) return { title: "Produit | PawWell" };

  return {
    title: `${product.name} | PawWell`,
    description: `${product.brand} — ${product.detail}. ${product.description}`,
  };
}

export default async function Page({ params }: ProductRouteProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return <ShopifyProductPage handle={slug} />;

  return <SingleProductPage product={product} />;
}
