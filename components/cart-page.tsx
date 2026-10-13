"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useEcommerceStore } from "@/lib/ecommerce-store";

function formatPrice(amount: string, currencyCode: string) {
  return new Intl.NumberFormat("fr-MA", {
    style: "currency",
    currency: currencyCode,
    maximumFractionDigits: 2,
  }).format(Number(amount));
}

export function CartPage() {
  const hasHydrated = useEcommerceStore((state) => state.hasHydrated);
  const cartId = useEcommerceStore((state) => state.cartId);
  const cart = useEcommerceStore((state) => state.cart);
  const refreshCart = useEcommerceStore((state) => state.refreshCart);
  const updateCartLine = useEcommerceStore((state) => state.updateCartLine);
  const clearCart = useEcommerceStore((state) => state.clearCart);
  const isCartClearing = useEcommerceStore((state) => state.isCartClearing);

  useEffect(() => {
    if (hasHydrated && cartId) void refreshCart();
  }, [cartId, hasHydrated, refreshCart]);

  if (!hasHydrated) {
    return (
      <main className="mx-auto min-h-[65vh] max-w-6xl px-5 py-12 sm:px-8">
        <Skeleton className="h-10 w-56 bg-[#e8eff7]" />
        <Skeleton className="mt-8 h-40 w-full rounded-2xl bg-[#edf3fa]" />
      </main>
    );
  }

  const lines = cart?.lines.nodes ?? [];

  return (
    <main className="min-h-[65vh] bg-[#f7faff]">
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
        <nav aria-label="Fil d’Ariane" className="mb-5 text-xs font-medium text-[#71849a]">
          <Link className="hover:text-blue-700" href="/">Accueil</Link>
          <span aria-hidden="true" className="px-2">/</span>
          <span aria-current="page" className="text-[#294360]">Panier</span>
        </nav>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#175ffc]">Votre sélection</p>
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-[#10284b] sm:text-4xl">Votre panier</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-[#71849a]">{cart?.totalQuantity ?? 0} article{cart?.totalQuantity === 1 ? "" : "s"}</span>
            {lines.length > 0 && (
              <button
                className="inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-xl border border-[#f0d6d8] bg-white px-3 text-xs font-semibold text-[#a7444b] transition-colors hover:bg-[#fff6f6] disabled:cursor-not-allowed disabled:opacity-60 sm:px-4 sm:text-sm"
                disabled={isCartClearing}
                onClick={() => void clearCart()}
                type="button"
              >
                <Trash2 aria-hidden="true" className="size-4" />
                {isCartClearing ? "Suppression…" : "Vider le panier"}
              </button>
            )}
          </div>
        </div>

        {lines.length === 0 ? (
          <section aria-live="polite" className="mt-8 rounded-3xl border border-[#e2ebf5] bg-white px-6 py-14 text-center shadow-[0_8px_24px_rgba(16,40,75,0.04)]" role="status">
            <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-[#eef5ff] text-[#175ffc]">
              <ShoppingBag aria-hidden="true" className="size-7" />
            </span>
            <h2 className="mt-5 text-xl font-bold text-[#10284b]">Aucun article dans votre panier</h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#71849a]">Parcourez notre sélection et trouvez les essentiels pour votre compagnon.</p>
            <Link className="mt-6 inline-flex min-h-11 items-center justify-center rounded-xl bg-[#175ffc] px-5 text-sm font-bold text-white transition-colors hover:bg-[#0f4fdb]" href="/products">Découvrir les produits</Link>
          </section>
        ) : (
          <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
            <section aria-label="Articles du panier" className="space-y-3">
              {lines.map((line) => (
                <article className="flex gap-4 rounded-2xl border border-[#e2ebf5] bg-white p-4 sm:gap-5 sm:p-5" key={line.id}>
                  <Link aria-label={`Voir ${line.merchandise.product.title}`} className="relative size-24 shrink-0 overflow-hidden rounded-xl bg-[#f5f8fc] sm:size-28" href={`/products/${line.merchandise.product.handle}`}>
                    {line.merchandise.image?.url && <Image alt={line.merchandise.image.altText ?? line.merchandise.product.title} className="object-contain p-2" fill sizes="112px" src={line.merchandise.image.url} />}
                  </Link>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <Link className="font-bold text-[#10284b] hover:text-blue-700" href={`/products/${line.merchandise.product.handle}`}>{line.merchandise.product.title}</Link>
                    <p className="mt-1 text-sm font-semibold text-[#175ffc]">{formatPrice(line.merchandise.price.amount, line.merchandise.price.currencyCode)}</p>
                    <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-4">
                      <div aria-label="Quantité" className="flex h-9 items-center overflow-hidden rounded-lg border border-[#dce8f5]">
                        <button aria-label="Diminuer la quantité" className="flex size-9 items-center justify-center text-[#49627d] hover:bg-[#f3f8fd]" onClick={() => void updateCartLine(line.id, Math.max(0, line.quantity - 1))} type="button"><Minus aria-hidden="true" className="size-3.5" /></button>
                        <span aria-live="polite" className="min-w-9 text-center text-sm font-semibold">{line.quantity}</span>
                        <button aria-label="Augmenter la quantité" className="flex size-9 items-center justify-center text-[#49627d] hover:bg-[#f3f8fd]" onClick={() => void updateCartLine(line.id, line.quantity + 1)} type="button"><Plus aria-hidden="true" className="size-3.5" /></button>
                      </div>
                      <button className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#71849a] transition-colors hover:text-red-600" onClick={() => void updateCartLine(line.id, 0)} type="button"><Trash2 aria-hidden="true" className="size-3.5" /> Retirer</button>
                    </div>
                  </div>
                </article>
              ))}
            </section>

            <aside className="h-fit rounded-2xl border border-[#e2ebf5] bg-white p-5 shadow-[0_8px_24px_rgba(16,40,75,0.04)] sm:p-6">
              <h2 className="text-lg font-bold text-[#10284b]">Récapitulatif</h2>
              <div className="mt-5 flex justify-between gap-3 border-b border-[#edf2f8] pb-4 text-sm text-[#5d7590]">
                <span>Sous-total</span>
                <span className="font-semibold text-[#294360]">{formatPrice(cart!.cost.subtotalAmount.amount, cart!.cost.subtotalAmount.currencyCode)}</span>
              </div>
              <div className="flex justify-between gap-3 py-4 text-base font-bold text-[#10284b]">
                <span>Total estimé</span>
                <span>{formatPrice(cart!.cost.totalAmount.amount, cart!.cost.totalAmount.currencyCode)}</span>
              </div>
              <p className="text-xs leading-5 text-[#71849a]">Les frais de livraison et les taxes sont calculés lors du paiement.</p>
              <a className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-[#175ffc] px-5 text-sm font-bold text-white transition-colors hover:bg-[#0f4fdb] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#175ffc]" href={cart!.checkoutUrl}>Passer au paiement</a>
              <Link className="mt-4 block text-center text-sm font-semibold text-[#175ffc] hover:text-[#0f4fdb]" href="/products">Continuer mes achats</Link>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
