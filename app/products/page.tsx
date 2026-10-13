import type { Metadata } from "next";
import { ProductsPage } from "@/components/products-page";

export const metadata: Metadata = {
  title: "Boutique | PawWell",
  description:
    "Découvrez la sélection PawWell : alimentation, jouets et soins pour chiens et chats.",
};

export default function Page() {
  return <ProductsPage />;
}
