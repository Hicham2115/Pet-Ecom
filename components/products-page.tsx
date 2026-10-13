"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Product } from "@/lib/products";
import {
  ArrowDownWideNarrow,
  ArrowRight,
  Cat,
  Check,
  Dog,
  Heart,
  PawPrint,
  Search,
  ShoppingCart,
  SlidersHorizontal,
  Star,
} from "lucide-react";

const categories = [
  "Tout",
  "Chiens",
  "Chats",
  "Alimentation",
  "Jouets",
  "Soins",
];

function matchesCategory(product: Product, category: string) {
  return (
    category === "Tout" ||
    (category === "Chiens" && product.pet.toLowerCase().includes("chien")) ||
    (category === "Chats" && product.pet.toLowerCase().includes("chat")) ||
    product.category === category
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group flex min-w-0 flex-col overflow-hidden rounded-[22px] border border-[#e4edf7] bg-white transition-[transform,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-[#c8dcf5] hover:shadow-[0_18px_38px_rgba(16,40,75,0.12)] focus-within:border-[#c8dcf5] focus-within:shadow-[0_18px_38px_rgba(16,40,75,0.12)] motion-reduce:transition-none">
      <div className="relative h-[210px] overflow-hidden bg-[#ffffff] sm:h-[230px]">
        {product.category && (
          <span className="absolute left-3 top-3 z-10 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold text-[#365577] shadow-sm backdrop-blur">
            {product.category}
          </span>
        )}
        <button
          aria-label={`Ajouter ${product.name} aux favoris`}
          className="absolute right-3 top-3 z-10 flex size-9 items-center justify-center rounded-full bg-white/90 text-[#365577] shadow-sm transition-colors hover:text-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          type="button"
        >
          <Heart aria-hidden="true" className="size-[17px]" />
        </button>
        <Link
          aria-label={`Voir ${product.name}`}
          className="absolute inset-0 flex items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-blue-600"
          href={`/products/${product.slug}`}
        >
          {product.image ? (
            <Image
              alt={`${product.brand} — ${product.name}`}
              className="object-contain p-4 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05] motion-reduce:transition-none"
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              src={product.image}
            />
          ) : (
            <PawPrint aria-hidden="true" className="size-12 text-[#b8cbe0]" />
          )}
        </Link>
      </div>
      <div className="flex flex-1 flex-col px-4 pb-4 pt-4 sm:px-5">
        {product.brand && <p className="text-xs font-bold text-[#10284b]">{product.brand}</p>}
        <h2 className="mt-1 text-[15px] font-semibold leading-5 text-[#294360]">
          <Link className="transition-colors hover:text-blue-700" href={`/products/${product.slug}`}>
            {product.name}
          </Link>
        </h2>
        {product.detail && (
          <p className="mt-0.5 text-xs leading-5 text-[#66809c]">
            {product.detail}
          </p>
        )}
        {product.reviews !== undefined && (
          <div
            aria-label={`Note : 4,5 sur 5, ${product.reviews} avis`}
            className="mt-3 flex items-center gap-1.5"
            role="img"
          >
            <span className="flex text-amber-400">
              {Array.from({ length: 5 }, (_, index) => (
                <Star
                  aria-hidden="true"
                  className="size-3.5 fill-current"
                  key={index}
                />
              ))}
            </span>
            <span className="text-[11px] text-slate-500">
              ({product.reviews})
            </span>
          </div>
        )}
        <div className="mt-3 flex items-baseline justify-between gap-2">
          <span className="text-xl font-extrabold tracking-tight text-[#10284b]">
            {product.price} DH
          </span>
          {product.unitPrice && (
            <span className="text-[11px] text-[#71849a]">
              {product.unitPrice}
            </span>
          )}
        </div>
        <button
          className="mt-4 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#175ffc] px-3 text-sm font-bold text-white transition-[transform,background-color] duration-300 hover:-translate-y-0.5 hover:bg-[#0f4fdb] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#175ffc] disabled:cursor-not-allowed disabled:bg-[#a9bad0] disabled:hover:translate-y-0"
          disabled={product.availableForSale === false}
          type="button"
        >
          <ShoppingCart aria-hidden="true" className="size-4" />
          {product.availableForSale === false ? "Indisponible" : "Ajouter au panier"}
        </button>
      </div>
    </article>
  );
}

function ProductCardSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="overflow-hidden rounded-[22px] border border-[#e4edf7] bg-white"
    >
      <Skeleton className="h-[210px] rounded-none bg-[#edf3fa] sm:h-[230px]" />
      <div className="space-y-3 px-4 pb-4 pt-4 sm:px-5">
        <Skeleton className="h-3 w-20 bg-[#e8eff7]" />
        <Skeleton className="h-4 w-3/4 bg-[#e8eff7]" />
        <Skeleton className="h-3 w-1/2 bg-[#e8eff7]" />
        <Skeleton className="mt-5 h-6 w-24 bg-[#e8eff7]" />
        <Skeleton className="mt-4 h-11 w-full rounded-xl bg-[#e8eff7]" />
      </div>
    </div>
  );
}

export function ProductsPage({
  initialShopifyProducts,
  shopifyLoadFailed,
}: {
  initialShopifyProducts: Product[];
  shopifyLoadFailed: boolean;
}) {
  const [category, setCategory] = useState("Tout");
  const [sort, setSort] = useState("popular");
  const [query, setQuery] = useState("");
  const [maxPrice, setMaxPrice] = useState(500);
  const shopifyQuery = useQuery({
    queryKey: ["shopify-products"],
    queryFn: async () => {
      const response = await fetch("/api/products");
      if (!response.ok) throw new Error("Shopify products are unavailable.");
      return (await response.json()) as Product[];
    },
    initialData: initialShopifyProducts,
    // Keep the timestamp deterministic during prerender; the client refreshes this data on mount.
    initialDataUpdatedAt: shopifyLoadFailed ? 0 : 1,
    staleTime: 60_000,
  });
  const shopifyProducts = shopifyQuery.data;
  const catalog = useMemo(() => shopifyProducts ?? [], [shopifyProducts]);

  useEffect(() => {
    if (shopifyQuery.error) {
      toast.error("Impossible de charger les nouveaux produits pour le moment.");
    }
  }, [shopifyQuery.error]);

  const visibleProducts = useMemo(() => {
    const filtered = catalog.filter((product) => {
      const searchable =
        `${product.brand} ${product.name} ${product.detail}`.toLowerCase();
      return (
        matchesCategory(product, category) &&
        product.price <= maxPrice &&
        searchable.includes(query.toLowerCase())
      );
    });

    if (sort === "price-asc") return filtered.sort((a, b) => a.price - b.price);
    if (sort === "price-desc")
      return filtered.sort((a, b) => b.price - a.price);
    return filtered;
  }, [catalog, category, maxPrice, query, sort]);

  return (
    <main className="min-h-screen bg-[#f7faff]">
      <section className="relative isolate overflow-hidden border-b border-[#e4edf7] bg-[#eef7ff]">
        <div className="relative aspect-[3/2] w-full bg-[#e7f2fd] lg:absolute lg:-right-8 lg:top-[54%] lg:w-[min(62vw,880px)] lg:-translate-y-1/2">
          <Image
            alt="Un chien heureux près de sa sélection PawWell"
            className="object-cover object-center"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 640px"
            src="/repeat-delivery.webp"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#eef7ff] lg:bg-gradient-to-r lg:from-[#eef7ff] lg:from-0% lg:via-[#eef7ff]/75 lg:via-5% lg:to-transparent lg:to-72%"
          />
        </div>
        <div className="relative mx-auto -mt-4 max-w-[1440px] px-5 pb-8 sm:px-8 sm:pb-11 lg:mt-0 lg:flex lg:min-h-[390px] lg:items-center lg:px-10 lg:py-12">
          <div className="relative z-10 max-w-[660px]">
            <nav
              aria-label="Fil d’Ariane"
              className="mb-6 flex items-center gap-2 text-xs font-medium text-[#69809a]"
            >
              <Link className="transition-colors hover:text-blue-700" href="/">
                Accueil
              </Link>
              <span aria-hidden="true" className="text-[#a5b7ca]">
                /
              </span>
              <span className="font-semibold text-[#294360]">Boutique</span>
            </nav>
            <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#175ffc] sm:text-xs">
              <span aria-hidden="true" className="h-px w-7 bg-[#175ffc]" />
              La sélection PawWell
            </p>
            <h1 className="mt-4 max-w-2xl text-[clamp(36px,5.7vw,62px)] font-extrabold leading-[0.98] tracking-[-0.055em] text-[#10284b]">
              Tout pour leur
              <br className="hidden sm:block" />{" "}
              <span className="text-[#175ffc]">bonheur.</span>
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-6 text-[#49627d] sm:text-base sm:leading-7">
              Des essentiels choisis avec soin, pour chaque museau et chaque
              patte.
            </p>
          </div>
        </div>
      </section>

      <section
        aria-label="Catalogue de produits"
        className="mx-auto max-w-[1440px] px-5 py-7 sm:px-8 sm:py-9 lg:px-10 lg:py-11"
      >
        <div className="grid gap-6 lg:grid-cols-[230px_minmax(0,1fr)] lg:gap-8">
          <aside
            aria-label="Filtres des produits"
            className="h-fit rounded-2xl border border-[#e2ebf5] bg-white p-4 sm:p-5"
          >
            <div className="flex items-center justify-between border-b border-[#edf2f8] pb-4">
              <h2 className="text-base font-bold text-[#10284b]">Filtres</h2>
              <SlidersHorizontal
                aria-hidden="true"
                className="size-4 text-[#175ffc]"
              />
            </div>
            <fieldset className="pt-4">
              <legend className="mb-3 text-xs font-bold uppercase tracking-[0.12em] text-[#71849a]">
                Catégories
              </legend>
              <div className="space-y-1">
                {categories.map((item) => (
                  <button
                    aria-pressed={category === item}
                    className={`flex min-h-10 w-full items-center justify-between rounded-lg px-2.5 text-left text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${category === item ? "bg-[#eef5ff] font-semibold text-[#175ffc]" : "text-[#365577] hover:bg-[#f7faff] hover:text-[#10284b]"}`}
                    key={item}
                    onClick={() => setCategory(item)}
                    type="button"
                  >
                    <span className="flex items-center gap-2.5">
                      {item === "Chiens" && (
                        <Dog aria-hidden="true" className="size-4" />
                      )}
                      {item === "Chats" && (
                        <Cat aria-hidden="true" className="size-4" />
                      )}
                      {item === "Tout" && (
                        <PawPrint aria-hidden="true" className="size-4" />
                      )}
                      {item === "Alimentation" && (
                        <Check aria-hidden="true" className="size-4" />
                      )}
                      {item === "Jouets" && (
                        <ArrowRight aria-hidden="true" className="size-4" />
                      )}
                      {item === "Soins" && (
                        <Heart aria-hidden="true" className="size-4" />
                      )}
                      {item}
                    </span>
                    <span className="text-xs text-[#91a3ba]">
                      {catalog.filter((product) => matchesCategory(product, item)).length}
                    </span>
                  </button>
                ))}
              </div>
            </fieldset>
            <div className="mt-5 border-t border-[#edf2f8] pt-4">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-[0.12em] text-[#71849a]">
                  Prix maximum
                </h3>
                <span className="text-sm font-bold text-[#10284b]">
                  {maxPrice} DH
                </span>
              </div>
              <label className="sr-only" htmlFor="max-price">
                Prix maximum en dirhams
              </label>
              <input
                className="h-2 w-full cursor-pointer accent-[#175ffc]"
                id="max-price"
                max="500"
                min="25"
                onChange={(event) => setMaxPrice(Number(event.target.value))}
                step="5"
                type="range"
                value={maxPrice}
              />
              <div className="mt-2 flex justify-between text-[11px] text-[#91a3ba]">
                <span>25 DH</span>
                <span>500 DH</span>
              </div>
            </div>
            <button
              className="mt-4 w-full rounded-lg py-2 text-xs font-bold text-[#175ffc] transition-colors hover:bg-[#f3f8ff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              onClick={() => {
                setCategory("Tout");
                setMaxPrice(500);
                setQuery("");
              }}
              type="button"
            >
              Réinitialiser les filtres
            </button>
          </aside>

          <div className="min-w-0">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#7d91a8]">
                  <SlidersHorizontal aria-hidden="true" className="size-3.5" />
                  La boutique
                </div>
                <h2 className="mt-1 text-xl font-extrabold tracking-tight text-[#10284b] sm:text-2xl">
                  Tous les produits
                </h2>
                <p className="mt-1 text-xs text-[#71849a]">
                  {visibleProducts.length} produit
                  {visibleProducts.length > 1 ? "s" : ""} sur {catalog.length}
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <label className="relative block w-full sm:w-[230px]">
                  <span className="sr-only">Rechercher dans les produits</span>
                  <Search
                    aria-hidden="true"
                    className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[#7b91aa]"
                  />
                  <input
                    className="h-11 w-full rounded-full border border-[#dce8f5] bg-white pl-10 pr-4 text-sm text-[#10284b] outline-none transition-shadow placeholder:text-[#91a3ba] focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Rechercher un produit…"
                    type="search"
                    value={query}
                  />
                </label>
                <div className="flex h-11 items-center gap-2 self-start rounded-xl border border-[#dce8f5] bg-white px-3 sm:self-auto">
                  <ArrowDownWideNarrow
                    aria-hidden="true"
                    className="size-4 text-[#71849a]"
                  />
                  <span className="whitespace-nowrap text-xs font-medium text-[#71849a]">
                    Trier par
                  </span>
                  <Select onValueChange={(value) => setSort(String(value))} value={sort}>
                    <SelectTrigger className="h-9 min-w-[150px] border-0 px-2 text-xs font-semibold text-[#10284b] shadow-none hover:bg-[#f4f8fd] focus-visible:border-0 focus-visible:ring-2 focus-visible:ring-blue-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent align="end" className="min-w-[190px] border-[#dce8f5] p-1.5 text-[#10284b] shadow-[0_14px_38px_rgba(16,40,75,0.16)]">
                      <SelectItem className="min-h-9 rounded-lg text-xs focus:bg-[#eef5ff] focus:text-[#175ffc]" value="popular">Les plus populaires</SelectItem>
                      <SelectItem className="min-h-9 rounded-lg text-xs focus:bg-[#eef5ff] focus:text-[#175ffc]" value="price-asc">Prix croissant</SelectItem>
                      <SelectItem className="min-h-9 rounded-lg text-xs focus:bg-[#eef5ff] focus:text-[#175ffc]" value="price-desc">Prix décroissant</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="mb-5 mt-5 border-b border-[#e2ebf5]" />

            {visibleProducts.length || shopifyQuery.isPending ? (
              <div
                aria-busy={shopifyQuery.isPending}
                className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-3"
              >
                {shopifyQuery.isPending && (
                  <span className="sr-only" role="status">
                    Chargement des produits Shopify
                  </span>
                )}
                {visibleProducts.map((product) => (
                  <ProductCard key={product.brand} product={product} />
                ))}
                {shopifyQuery.isPending &&
                  Array.from({ length: 3 }, (_, index) => (
                    <ProductCardSkeleton key={`shopify-skeleton-${index}`} />
                  ))}
              </div>
            ) : (
              <div className="rounded-3xl border border-dashed border-[#cfdeed] bg-white px-5 py-16 text-center">
                <PawPrint
                  aria-hidden="true"
                  className="mx-auto size-8 text-[#9bb1c9]"
                />
                <h3 className="mt-4 text-lg font-bold text-[#10284b]">
                  Aucun produit trouvé
                </h3>
                <p className="mt-1 text-sm text-[#71849a]">
                  Essayez une autre catégorie ou modifiez votre recherche.
                </p>
                <button
                  className="mt-4 text-sm font-bold text-blue-700 hover:text-blue-900"
                  onClick={() => {
                    setCategory("Tout");
                    setMaxPrice(500);
                    setQuery("");
                  }}
                  type="button"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
