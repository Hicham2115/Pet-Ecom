import Image from "next/image";
import Link from "next/link";
import { ArrowRight, PawPrint } from "lucide-react";
import { getShopifyProducts } from "@/lib/shopify";
import type { Product } from "@/lib/products";
import {
  FeaturedProductAddToCart,
  FeaturedProductFavorite,
} from "@/components/featured-product-actions";

export async function BestSellersSection() {
  let products: Product[] = [];

  try {
    products = (await getShopifyProducts()).slice(0, 5);
  } catch (error) {
    console.error("Could not load featured Shopify products:", error);
  }

  return (
    <section aria-labelledby="best-sellers" className="bg-white px-5 pb-12 pt-2 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-5 flex items-end justify-between gap-4">
          <h2
            id="best-sellers"
            className="text-[25px] font-extrabold leading-tight tracking-[-0.03em] text-[#10284b] sm:text-[28px]"
          >
            À découvrir
          </h2>
          <Link
            className="mb-0.5 inline-flex shrink-0 items-center gap-1 text-xs font-bold text-blue-700 transition-colors hover:text-blue-900 sm:text-sm"
            href="/products"
          >
            <span className="hidden sm:inline">Voir tous les produits</span>
            <span className="sm:hidden">Tout voir</span>
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>

        {products.length ? (
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 lg:gap-4">
            {products.map((product) => (
              <li
                className="group relative flex min-w-0 flex-col overflow-hidden rounded-2xl border border-[#e5edf6] bg-white shadow-[0_2px_8px_rgba(16,40,75,0.04)] transition-[box-shadow,border-color] duration-300 hover:border-[#c8dcf5] hover:shadow-[0_14px_32px_rgba(16,40,75,0.12)] focus-within:border-[#c8dcf5] focus-within:shadow-[0_14px_32px_rgba(16,40,75,0.12)]"
                key={product.slug}
              >
                <div className="relative h-36 overflow-hidden bg-white sm:h-44">
                  <Link
                    aria-label={`Voir ${product.name}`}
                    className="absolute inset-0 flex items-center justify-center"
                    href={`/products/${product.slug}`}
                  >
                  {product.image ? (
                    <Image
                      alt={`${product.brand} — ${product.name}`}
                      className="object-contain p-2 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] group-focus-within:scale-[1.04] motion-reduce:transition-none"
                      fill
                      sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 20vw"
                      src={product.image}
                    />
                  ) : (
                    <PawPrint aria-hidden="true" className="size-10 text-[#b8cbe0]" />
                  )}
                  </Link>
                  <FeaturedProductFavorite product={product} />
                </div>
                <div className="flex flex-1 flex-col px-3 pb-16 pt-2.5 sm:px-3.5">
                  {product.brand && <p className="text-xs font-bold text-[#10284b] sm:text-sm">{product.brand}</p>}
                  <p className="mt-0.5 text-xs leading-4 text-[#365577] sm:text-sm sm:leading-5">
                    {product.name}
                    {product.detail && <span className="block">{product.detail}</span>}
                  </p>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-base font-extrabold text-[#10284b] sm:text-lg">{product.price} DH</span>
                    {product.unitPrice && (
                      <span className="text-[10px] text-slate-500 sm:text-xs">{product.unitPrice}</span>
                    )}
                  </div>
                </div>
                <FeaturedProductAddToCart product={product} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="rounded-2xl border border-[#e5edf6] bg-[#f7faff] px-5 py-10 text-center text-sm text-[#66809c]">
            Les produits seront bientôt disponibles.
          </p>
        )}
      </div>
    </section>
  );
}
