import Link from "next/link";
import { PawPrint, Search, ShoppingCart, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";

function SearchBox() {
  const id = "header-search";
  return (
    <form
      action="/"
      className="flex h-11 w-full items-center rounded-full border border-[#9fb5d0] bg-[#f8fbff] p-1 shadow-[0_2px_10px_rgba(16,40,75,0.04)] transition-colors hover:border-blue-400 focus-within:border-blue-600 focus-within:ring-4 focus-within:ring-blue-100 lg:h-12"
      role="search"
    >
      <label className="sr-only" htmlFor={id}>
        Rechercher des produits
      </label>
      <input
        className="min-w-0 flex-1 bg-transparent px-4 text-sm text-[#10284b] outline-none placeholder:text-slate-400 sm:px-5"
        id={id}
        name="q"
        placeholder="Alimentation, jouets, soins et plus encore..."
        type="search"
      />
      <Button
        aria-label="Rechercher"
        className="h-full w-10 shrink-0 rounded-full bg-blue-600 text-white hover:bg-blue-700 lg:w-11"
        size="icon"
        type="submit"
      >
        <Search aria-hidden="true" className="size-5" />
      </Button>
    </form>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white shadow-[0_2px_14px_rgba(16,40,75,0.05)]">
      <div className="mx-auto flex min-h-[60px] w-full max-w-[1600px] items-center gap-3 px-3 py-2 sm:min-h-[68px] sm:px-6 lg:gap-6 lg:px-8 lg:py-3 2xl:px-12">
        <Link
          aria-label="Accueil PawWell"
          className="flex min-w-0 shrink-0 items-center gap-2"
          href="/"
        >
          <PawPrint
            aria-hidden="true"
            className="size-8 fill-blue-600 text-blue-600 sm:size-9"
          />
          <span className="flex flex-col leading-none">
            <span className="text-[20px] font-extrabold tracking-tight text-[#10284b] sm:text-[23px]">
              PawWell
            </span>
            <span className="mt-1 text-[7px] font-medium tracking-wide text-slate-500 sm:text-[9px]">
              Des animaux plus heureux. Des jours plus lumineux.
            </span>
          </span>
        </Link>
        <div className="hidden min-w-0 flex-1 lg:flex">
          <SearchBox />
        </div>
        <details className="group relative ml-auto shrink-0 lg:hidden">
          <summary className="inline-flex size-10 cursor-pointer list-none items-center justify-center rounded-full text-[#10284b] transition-colors hover:bg-blue-50 hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 [&::-webkit-details-marker]:hidden">
            <span className="sr-only">Rechercher</span>
            <Search aria-hidden="true" className="size-6" />
          </summary>
          <div className="absolute right-[-48px] top-full z-50 mt-2 w-[min(90vw,360px)] rounded-2xl bg-white p-3 shadow-[0_12px_36px_rgba(16,40,75,0.18)]">
            <SearchBox />
          </div>
        </details>
        <div className="hidden shrink-0 items-center gap-2 text-[#10284b] lg:flex">
          <Truck aria-hidden="true" className="size-6 text-blue-600" />
          <span className="flex flex-col leading-tight">
            <span className="text-[11px] font-semibold">Livraison à</span>
            <span className="text-xs">Votre code postal</span>
          </span>
        </div>
        <Link
          aria-label="Panier, 0 article"
          className="flex shrink-0 items-center gap-2 text-[#10284b] transition-colors hover:text-blue-700 lg:ml-0"
          href="/cart"
        >
          <span className="relative">
            <ShoppingCart aria-hidden="true" className="size-6" />
            <span
              aria-hidden="true"
              className="absolute -right-2 -top-2 flex size-4 items-center justify-center rounded-full bg-blue-600 text-[9px] font-bold text-white"
            >
              0
            </span>
          </span>
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="text-[11px] font-semibold">Panier</span>
            <span className="text-xs">0,00 DH</span>
          </span>
        </Link>
      </div>
      <Navbar />
    </header>
  );
}
