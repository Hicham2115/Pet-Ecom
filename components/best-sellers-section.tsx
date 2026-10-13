import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShoppingCart, Star } from "lucide-react";

const products = [
  {
    brand: "Meadowland",
    name: "Croquettes chien adulte",
    detail: "Poulet & riz complet · 12 kg",
    price: "420 DH",
    unitPrice: "35 DH/kg",
    reviews: 428,
    image: "/products/dog-food.webp",
  },
  {
    brand: "PawWell",
    name: "Bouchées fondantes",
    detail: "Saumon · Friandises pour chat · 60 g",
    price: "29 DH",
    unitPrice: "48 DH/100 g",
    reviews: 316,
    image: "/products/cat-treats.webp",
  },
  {
    brand: "PureBowl",
    name: "Croquettes pour chat",
    detail: "Recette au poulet · 2 kg",
    price: "160 DH",
    unitPrice: "80 DH/kg",
    reviews: 207,
    image: "/products/cat-food.webp",
  },
  {
    brand: "PlayPaws",
    name: "Corde résistante",
    detail: "Jouet à tirer · Pour chiens actifs",
    price: "95 DH",
    unitPrice: "",
    reviews: 184,
    image: "/products/rope-toy.webp",
  },
  {
    brand: "FreshPaws",
    name: "Lingettes pour animaux",
    detail: "Aloe vera & avoine · 100 pièces",
    price: "55 DH",
    unitPrice: "0,55 DH/pièce",
    reviews: 521,
    image: "/products/pet-wipes.webp",
  },
];

export function BestSellersSection() {
  return (
    <section aria-labelledby="best-sellers" className="bg-white px-5 pb-12 pt-2 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-5 flex items-end justify-between gap-4">
          <h2
            id="best-sellers"
            className="text-[25px] font-extrabold leading-tight tracking-[-0.03em] text-[#10284b] sm:text-[28px]"
          >
            Nos meilleures ventes
          </h2>
          <Link
            className="mb-0.5 inline-flex shrink-0 items-center gap-1 text-xs font-bold text-blue-700 transition-colors hover:text-blue-900 sm:text-sm"
            href="/products"
          >
            <span className="hidden sm:inline">Voir toutes les meilleures ventes</span>
            <span className="sm:hidden">Tout voir</span>
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>

        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 lg:gap-4">
          {products.map((product) => (
            <li
              className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-[#e5edf6] bg-white shadow-[0_2px_8px_rgba(16,40,75,0.04)] transition-[transform,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-[#c8dcf5] hover:shadow-[0_14px_32px_rgba(16,40,75,0.12)] focus-within:border-[#c8dcf5] focus-within:shadow-[0_14px_32px_rgba(16,40,75,0.12)] motion-reduce:transition-none"
              key={product.brand}
            >
              <div className="relative h-36 overflow-hidden bg-white sm:h-44">
                <Image
                  alt={`${product.brand} — ${product.name}`}
                  className="object-contain p-2 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] group-focus-within:scale-[1.04] motion-reduce:transition-none"
                  fill
                  sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 20vw"
                  src={product.image}
                />
              </div>
              <div className="flex flex-1 flex-col px-3 pb-3 pt-2.5 sm:px-3.5">
                <p className="text-xs font-bold text-[#10284b] sm:text-sm">{product.brand}</p>
                <p className="mt-0.5 text-xs leading-4 text-[#365577] sm:text-sm sm:leading-5">
                  {product.name}
                  <span className="block">{product.detail}</span>
                </p>
                <div
                  aria-label={`Note : 4,5 sur 5, ${product.reviews} avis`}
                  className="mt-2 flex items-center gap-1"
                  role="img"
                >
                  <span className="flex text-amber-400">
                    {Array.from({ length: 5 }, (_, index) => (
                      <Star aria-hidden="true" className="size-3.5 fill-current" key={index} />
                    ))}
                  </span>
                  <span className="text-[10px] text-slate-500">({product.reviews})</span>
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-base font-extrabold text-[#10284b] sm:text-lg">{product.price}</span>
                  {product.unitPrice && (
                    <span className="text-[10px] text-slate-500 sm:text-xs">{product.unitPrice}</span>
                  )}
                </div>
                <button
                  className="mt-2.5 inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-blue-600 px-2 text-xs font-bold text-white transition-[opacity,transform,background-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 sm:text-sm sm:translate-y-2 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 sm:group-focus-within:translate-y-0 sm:group-focus-within:opacity-100 motion-reduce:transition-none"
                  type="button"
                >
                  <ShoppingCart aria-hidden="true" className="size-4" />
                  Ajouter au panier
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
