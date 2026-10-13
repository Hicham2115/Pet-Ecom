"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/lib/products";
import {
  Check,
  ChevronRight,
  Heart,
  Minus,
  Plus,
  ShoppingCart,
  Star,
  Truck,
} from "lucide-react";

const galleryImages = [
  { label: "Vue complète", position: "center 50%" },
  { label: "Détails du sac", position: "center 12%" },
  { label: "La recette", position: "center 56%" },
  { label: "Les ingrédients", position: "center 88%" },
];

const productTabs = [
  "Description",
  "Composition",
  "Conseils d’utilisation",
] as const;
type ProductTab = (typeof productTabs)[number];

export function SingleProductPage({ product }: { product: Product }) {
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState<ProductTab>("Description");
  const [quantity, setQuantity] = useState(1);

  return (
    <main className="min-h-screen bg-white text-[#10284b]">
      <div className="mx-auto max-w-[1440px] px-5 pb-14 pt-6 sm:px-8 lg:px-10 lg:pt-8">
        <nav
          aria-label="Fil d’Ariane"
          className="mb-6 flex flex-wrap items-center gap-2 text-xs font-medium text-[#71849a] sm:mb-7 sm:text-sm"
        >
          <Link className="transition-colors hover:text-blue-700" href="/">
            Accueil
          </Link>
          <ChevronRight
            aria-hidden="true"
            className="size-3.5 text-[#a7b8ca]"
          />
          <Link
            className="transition-colors hover:text-blue-700"
            href="/products"
          >
            {product.pet}
          </Link>
          <ChevronRight
            aria-hidden="true"
            className="size-3.5 text-[#a7b8ca]"
          />
          <Link
            className="transition-colors hover:text-blue-700"
            href="/products"
          >
            {product.category}
          </Link>
          <ChevronRight
            aria-hidden="true"
            className="size-3.5 text-[#a7b8ca]"
          />
          <span aria-current="page" className="text-[#294360]">
            {product.name}
          </span>
        </nav>

        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 xl:gap-16">
          <section aria-label="Photos du produit" className="min-w-0">
            <div className="relative aspect-square overflow-hidden rounded-[24px] bg-[#ffffff] sm:rounded-[30px]">
              <Image
                alt={`${product.brand} — ${product.name}, ${product.detail}`}
                className={`object-contain p-5 transition-transform duration-300 sm:p-8 ${activeImage === 0 ? "" : "scale-[1.65]"}`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                src={product.image}
                style={{ objectPosition: galleryImages[activeImage].position }}
              />
            </div>
            <div
              aria-label="Choisir une vue du produit"
              className="mt-3 grid grid-cols-4 gap-2.5 sm:mt-4 sm:gap-3"
            >
              {galleryImages.map((image, index) => (
                <button
                  aria-label={image.label}
                  aria-pressed={activeImage === index}
                  className={`relative aspect-square overflow-hidden rounded-xl border-2 bg-[#f4f8fc] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:rounded-2xl ${activeImage === index ? "border-[#175ffc]" : "border-transparent hover:border-[#c9dcf2]"}`}
                  key={image.label}
                  onClick={() => setActiveImage(index)}
                  type="button"
                >
                  <Image
                    alt=""
                    className={`object-contain p-1.5 ${index === 0 ? "" : "scale-[1.8]"}`}
                    fill
                    sizes="(max-width: 640px) 22vw, 130px"
                    src={product.image}
                    style={{ objectPosition: image.position }}
                  />
                </button>
              ))}
            </div>
          </section>

          <section
            aria-labelledby="product-title"
            className="flex flex-col pt-1 sm:pt-3 lg:pt-2"
          >
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#71849a]">
              {product.brand}
            </p>
            <h1
              id="product-title"
              className="mt-2 text-[clamp(30px,4vw,46px)] font-extrabold leading-[1.04] tracking-[-0.045em] text-[#10284b]"
            >
              {product.name}
            </h1>
            <p className="mt-2 text-lg text-[#5d7590] sm:text-xl">
              {product.detail}
            </p>

            {product.reviews !== undefined && (
              <a
                className="mt-4 inline-flex w-fit items-center gap-2 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
                href="#product-reviews"
                aria-label={`Lire les ${product.reviews} avis clients, note 4,5 sur 5`}
              >
                <span aria-hidden="true" className="flex text-amber-400">
                  {Array.from({ length: 5 }, (_, index) => (
                    <Star className="size-5 fill-current" key={index} />
                  ))}
                </span>
                <span className="text-sm font-semibold text-blue-700">
                  ({product.reviews} avis)
                </span>
              </a>
            )}

            <div className="mt-6">
              <p className="text-[38px] font-extrabold leading-none tracking-[-0.04em] text-[#10284b]">
                {product.price} DH
              </p>
              {product.unitPrice && (
                <p className="mt-2 text-sm text-[#71849a]">
                  {product.unitPrice}
                </p>
              )}
            </div>

            {product.availableForSale === false && (
              <p className="mt-3 text-sm font-semibold text-[#9b3e45]">
                Actuellement indisponible
              </p>
            )}

            <p className="mt-5 max-w-xl text-[15px] leading-7 text-[#49627d]">
              {product.description}
            </p>

            <div className="mt-5 flex flex-wrap gap-2.5">
              <span className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-[#dce8f5] bg-[#f7faff] px-3.5 text-xs font-semibold text-[#365577]">
                <span className="flex size-6 items-center justify-center rounded-lg bg-white text-[#175ffc]">
                  <Check aria-hidden="true" className="size-3.5" />
                </span>
                {product.pet}
              </span>
              <span className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-[#dce8f5] bg-[#f7faff] px-3.5 text-xs font-semibold text-[#365577]">
                <span
                  aria-hidden="true"
                  className="size-2 rounded-full bg-[#175ffc]"
                />
                {product.category}
              </span>
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <div
                aria-label="Quantité"
                className="flex h-12 w-fit items-center overflow-hidden rounded-xl border border-[#dce8f5] bg-white"
              >
                <button
                  aria-label="Diminuer la quantité"
                  className="flex size-12 items-center justify-center text-[#365577] transition-colors hover:bg-[#f3f8fd] disabled:text-[#bdc9d7]"
                  disabled={quantity === 1}
                  onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                  type="button"
                >
                  <Minus aria-hidden="true" className="size-4" />
                </button>
                <span
                  aria-live="polite"
                  className="flex h-full min-w-12 items-center justify-center border-x border-[#e8eff7] text-sm font-bold"
                >
                  {quantity}
                </span>
                <button
                  aria-label="Augmenter la quantité"
                  className="flex size-12 items-center justify-center text-[#365577] transition-colors hover:bg-[#f3f8fd]"
                  onClick={() => setQuantity((value) => value + 1)}
                  type="button"
                >
                  <Plus aria-hidden="true" className="size-4" />
                </button>
              </div>
              <button
                className="inline-flex min-h-12 flex-1 items-center justify-center gap-2.5 rounded-xl bg-[#175ffc] px-5 text-sm font-bold text-white transition-[transform,background-color] duration-300 hover:cursor-pointer hover:bg-[#0f4fdb] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#175ffc] disabled:cursor-not-allowed disabled:bg-[#a9bad0] disabled:hover:bg-[#a9bad0]"
                disabled={product.availableForSale === false}
                type="button"
              >
                <ShoppingCart aria-hidden="true" className="size-[18px]" />
                {product.availableForSale === false ? "Indisponible" : "Ajouter au panier"}
              </button>
            </div>
            <button
              className="mt-3 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-[#c9dcf5] bg-white text-sm font-semibold text-[#175ffc] transition-colors hover:cursor-pointer hover:bg-[#f5f9ff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#175ffc]"
              type="button"
            >
              <Heart aria-hidden="true" className="size-[18px]" />
              Ajouter aux favoris
            </button>

            <div className="mt-5 flex items-center gap-4 rounded-2xl border border-[#e0ebf7] bg-[#f3f8fd] px-4 py-4 sm:px-5">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#175ffc]">
                <Truck aria-hidden="true" className="size-6" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-bold text-[#10284b]">
                  Livraison suivie
                </span>
                <span className="mt-0.5 block text-xs leading-5 text-[#71849a]">
                  Livraison estimée sous 2 à 4 jours ouvrés.
                </span>
              </span>
              <ChevronRight
                aria-hidden="true"
                className="ml-auto size-4 shrink-0 text-[#91a3ba]"
              />
            </div>
          </section>
        </div>

        <section
          aria-label="Informations produit"
          className="mt-10 border-t border-[#e2ebf5] pt-2 sm:mt-12"
        >
          <div
            aria-label="Détails du produit"
            className="flex gap-5 overflow-x-auto sm:gap-9"
            role="tablist"
          >
            {productTabs.map((tab) => (
              <button
                aria-selected={activeTab === tab}
                className={`min-h-12 shrink-0 border-b-2 px-1 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-blue-600 ${activeTab === tab ? "border-[#175ffc] text-[#175ffc]" : "border-transparent text-[#71849a] hover:text-[#294360]"}`}
                key={tab}
                onClick={() => setActiveTab(tab)}
                role="tab"
                type="button"
              >
                {tab}
              </button>
            ))}
          </div>
          <div
            aria-live="polite"
            className="max-w-5xl py-5 text-sm leading-7 text-[#5d7590]"
            role="tabpanel"
          >
            {
              product[
                activeTab === "Description"
                  ? "description"
                  : activeTab === "Composition"
                    ? "composition"
                    : "usage"
              ]
            }
          </div>
        </section>
        <span id="product-reviews" className="sr-only">
          Avis clients
        </span>
      </div>
    </main>
  );
}
