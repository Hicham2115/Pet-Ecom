import type { Metadata } from "next";
import { Suspense } from "react";
import { ProductPageSkeleton } from "@/components/product-page-skeleton";
import { ShopifyProductPage } from "@/components/shopify-product-page";
import { getShopifyProductByHandle } from "@/lib/shopify";

type ProductRouteProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: ProductRouteProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const product = await getShopifyProductByHandle(slug);
    if (!product) return { title: "Produit introuvable | PawWell" };

    return {
      title: `${product.name} | PawWell`,
      description: `${product.brand} — ${product.detail}. ${product.description}`,
    };
  } catch {
    return { title: "Produit | PawWell" };
  }
}

export default function Page({ params }: ProductRouteProps) {
  return (
    <Suspense
      fallback={<ProductPageSkeleton />}
    >
      <ProductRoute params={params} />
    </Suspense>
  );
}

async function ProductRoute({ params }: ProductRouteProps) {
  const { slug } = await params;
  let shopifyProduct;

  try {
    shopifyProduct = await getShopifyProductByHandle(slug);
  } catch (error) {
    console.error("Could not load Shopify product for the product page:", error);
  }

  return <ShopifyProductPage handle={slug} initialProduct={shopifyProduct} />;
}
