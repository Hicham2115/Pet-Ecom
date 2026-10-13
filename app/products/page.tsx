import type { Metadata } from "next";
import { ProductsPage } from "@/components/products-page";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Boutique | PawWell",
  description:
    "Découvrez la sélection PawWell : alimentation, jouets et soins pour chiens et chats.",
};

export default function Page() {
  return <ProductsPage products={products} />;
}
