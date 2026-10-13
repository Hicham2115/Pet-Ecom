"use client";

import { Heart, ShoppingCart } from "lucide-react";
import type { Product } from "@/lib/products";
import { useEcommerceStore } from "@/lib/ecommerce-store";

export function FeaturedProductFavorite({ product }: { product: Product }) {
  const isWishlisted = useEcommerceStore((state) =>
    state.wishlist.some((item) => item.slug === product.slug),
  );
  const toggleWishlist = useEcommerceStore((state) => state.toggleWishlist);

  return (
    <button
      aria-label={`${isWishlisted ? "Retirer" : "Ajouter"} ${product.name} ${isWishlisted ? "des" : "aux"} favoris`}
      aria-pressed={isWishlisted}
      className={`absolute right-3 top-3 z-10 flex size-9 items-center justify-center rounded-full bg-white/95 shadow-sm transition-[transform,color,background-color] duration-300 hover:scale-105 hover:text-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${isWishlisted ? "text-blue-600" : "text-[#365577]"}`}
      onClick={() => toggleWishlist(product)}
      type="button"
    >
      <Heart aria-hidden="true" className={`size-[17px] ${isWishlisted ? "fill-current" : ""}`} />
    </button>
  );
}

export function FeaturedProductAddToCart({ product }: { product: Product }) {
  const addToCart = useEcommerceStore((state) => state.addToCart);
  const isCartPending = useEcommerceStore((state) =>
    state.pendingCartSlugs.includes(product.slug),
  );
  const unavailable = product.availableForSale === false || !product.shopifyVariantId;

  return (
      <button
        className="absolute inset-x-3 bottom-3 z-10 inline-flex min-h-10 cursor-pointer items-center justify-center gap-2 rounded-xl bg-blue-600 px-2 text-xs font-bold text-white transition-colors duration-200 hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 disabled:cursor-not-allowed disabled:bg-[#e4ebf4] disabled:text-[#49627d] sm:min-h-11 sm:text-sm"
        disabled={unavailable || isCartPending}
        onClick={() => void addToCart(product)}
        type="button"
      >
        <ShoppingCart aria-hidden="true" className="size-4" />
        {unavailable ? "Indisponible" : isCartPending ? "Ajout…" : "Ajouter au panier"}
      </button>
  );
}
