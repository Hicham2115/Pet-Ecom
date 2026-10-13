import type { Metadata } from "next";
import { ProductsPage } from "@/components/products-page";
import type { Product } from "@/lib/products";
import { getShopifyProducts } from "@/lib/shopify";

export const metadata: Metadata = {
  title: "Boutique | PawWell",
  description:
    "Découvrez la sélection PawWell : alimentation, jouets et soins pour chiens et chats.",
};

export default async function Page() {
  let shopifyProducts: Product[] = [];
  let shopifyLoadFailed = false;

  try {
    shopifyProducts = await getShopifyProducts();
  } catch (error) {
    shopifyLoadFailed = true;
    console.error("Could not load Shopify products for the products page:", error);
  }

  return (
    <ProductsPage
      initialShopifyProducts={shopifyProducts}
      shopifyLoadFailed={shopifyLoadFailed}
    />
  );
}
