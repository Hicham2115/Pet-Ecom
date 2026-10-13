"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, PawPrint, ShoppingCart, Trash2 } from "lucide-react";
import { useEcommerceStore } from "@/lib/ecommerce-store";

export function WishlistPage() {
  const wishlist = useEcommerceStore((state) => state.wishlist);
  const hasHydrated = useEcommerceStore((state) => state.hasHydrated);
  const toggleWishlist = useEcommerceStore((state) => state.toggleWishlist);
  const addToCart = useEcommerceStore((state) => state.addToCart);
  const isCartPending = useEcommerceStore((state) => state.isCartPending);

  return (
    <main className="min-h-[65vh] bg-[#f7faff]">
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#175ffc]">À garder en tête</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-[#10284b] sm:text-4xl">Mes favoris</h1>
        {!hasHydrated ? (
          <div aria-busy="true" className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 4 }, (_, index) => <div aria-hidden="true" className="h-64 animate-pulse rounded-2xl bg-[#e8eff7]" key={index} />)}
          </div>
        ) : wishlist.length === 0 ? (
          <section className="mt-8 rounded-3xl border border-[#e2ebf5] bg-white px-6 py-14 text-center">
            <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-[#eef5ff] text-[#175ffc]"><Heart aria-hidden="true" className="size-7" /></span>
            <h2 className="mt-5 text-xl font-bold text-[#10284b]">Aucun favori pour le moment</h2>
            <p className="mt-2 text-sm text-[#71849a]">Enregistrez les produits que vous souhaitez retrouver facilement.</p>
            <Link className="mt-6 inline-flex min-h-11 items-center justify-center rounded-xl bg-[#175ffc] px-5 text-sm font-bold text-white hover:bg-[#0f4fdb]" href="/products">Parcourir les produits</Link>
          </section>
        ) : (
          <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
            {wishlist.map((product) => (
              <article className="overflow-hidden rounded-2xl border border-[#e2ebf5] bg-white p-3 sm:p-4" key={product.slug}>
                <Link aria-label={`Voir ${product.name}`} className="relative flex aspect-square items-center justify-center overflow-hidden rounded-xl bg-[#f7faff]" href={`/products/${product.slug}`}>
                  {product.image ? <Image alt={`${product.brand} — ${product.name}`} className="object-contain p-3" fill sizes="(max-width: 640px) 45vw, 250px" src={product.image} /> : <PawPrint aria-hidden="true" className="size-10 text-[#b8cbe0]" />}
                </Link>
                <p className="mt-3 text-xs font-bold text-[#71849a]">{product.brand}</p>
                <Link className="mt-1 line-clamp-2 min-h-10 text-sm font-semibold text-[#294360] hover:text-blue-700" href={`/products/${product.slug}`}>{product.name}</Link>
                <p className="mt-2 text-lg font-extrabold text-[#10284b]">{product.price} DH</p>
                <div className="mt-3 grid grid-cols-[1fr_auto] gap-2">
                  <button className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-lg bg-[#175ffc] px-2 text-xs font-bold text-white transition-colors hover:bg-[#0f4fdb] disabled:cursor-not-allowed disabled:bg-[#a9bad0]" disabled={!product.shopifyVariantId || product.availableForSale === false || isCartPending} onClick={() => void addToCart(product)} type="button"><ShoppingCart aria-hidden="true" className="size-3.5" /> Ajouter</button>
                  <button aria-label={`Retirer ${product.name} des favoris`} className="flex size-10 items-center justify-center rounded-lg border border-[#e2ebf5] text-[#71849a] transition-colors hover:border-red-200 hover:text-red-600" onClick={() => toggleWishlist(product)} type="button"><Trash2 aria-hidden="true" className="size-4" /></button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
