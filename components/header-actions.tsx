"use client";

import Link from "next/link";
import { Heart, ShoppingCart } from "lucide-react";
import { useEcommerceStore } from "@/lib/ecommerce-store";

export function HeaderActions() {
  const cartQuantity = useEcommerceStore(
    (state) => state.cart?.totalQuantity ?? 0,
  );
  const wishlistCount = useEcommerceStore((state) => state.wishlist.length);
  const hasHydrated = useEcommerceStore((state) => state.hasHydrated);
  const visibleCartQuantity = hasHydrated ? cartQuantity : 0;
  const visibleWishlistCount = hasHydrated ? wishlistCount : 0;

  return (
    <nav aria-label="Favoris et panier" className="ml-auto flex shrink-0 items-center gap-1.5 lg:ml-0 lg:gap-2">
      <Link
        aria-label={`Favoris, ${visibleWishlistCount} article${visibleWishlistCount === 1 ? "" : "s"}`}
        className="relative flex size-10 items-center justify-center rounded-full text-[#10284b] transition-colors hover:bg-blue-50 hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
        href="/wishlist"
      >
        <Heart aria-hidden="true" className="size-[21px]" />
        <span aria-hidden="true" className="absolute right-0.5 top-0.5 flex min-h-4 min-w-4 items-center justify-center rounded-full bg-[#175ffc] px-1 text-[9px] font-bold text-white">
          {visibleWishlistCount}
        </span>
      </Link>
      <Link
        aria-label={`Panier, ${visibleCartQuantity} article${visibleCartQuantity === 1 ? "" : "s"}`}
        className="relative flex size-10 items-center justify-center rounded-full text-[#10284b] transition-colors hover:bg-blue-50 hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
        href="/cart"
      >
        <ShoppingCart aria-hidden="true" className="size-[21px]" />
        <span aria-hidden="true" className="absolute right-0.5 top-0.5 flex min-h-4 min-w-4 items-center justify-center rounded-full bg-[#175ffc] px-1 text-[9px] font-bold text-white">
          {visibleCartQuantity}
        </span>
      </Link>
    </nav>
  );
}
