"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { NotFoundPage } from "@/components/not-found-page";
import { ProductPageSkeleton } from "@/components/product-page-skeleton";
import { SingleProductPage } from "@/components/single-product-page";
import type { Product } from "@/lib/products";

export function ShopifyProductPage({
  handle,
  initialProduct,
}: {
  handle: string;
  initialProduct?: Product;
}) {
  const productQuery = useQuery({
    queryKey: ["shopify-product", handle],
    queryFn: async () => {
      const response = await fetch(`/api/products/${encodeURIComponent(handle)}`);
      if (!response.ok) throw new Error("Shopify product is unavailable.");
      return (await response.json()) as Product | null;
    },
    initialData: initialProduct,
    initialDataUpdatedAt: 1,
    staleTime: 60_000,
  });

  useEffect(() => {
    if (productQuery.error) {
      toast.error("Impossible de charger ce produit pour le moment.");
    }
  }, [productQuery.error]);

  if (productQuery.isPending) {
    return <ProductPageSkeleton />;
  }

  if (productQuery.error) {
    return (
      <main className="mx-auto flex min-h-[50vh] max-w-[1440px] flex-col items-center justify-center gap-4 px-5 py-20 text-center">
        <p className="text-lg font-semibold text-[#10284b]">
          Le produit n’a pas pu être chargé.
        </p>
        <Link className="font-semibold text-blue-700 hover:underline" href="/products">
          Retour à la boutique
        </Link>
      </main>
    );
  }

  if (!productQuery.data) return <NotFoundPage />;

  return <SingleProductPage product={productQuery.data} />;
}
