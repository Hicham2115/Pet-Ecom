import Link from "next/link";
import { ArrowRight, PawPrint } from "lucide-react";

export function NotFoundPage() {
  return (
    <main className="relative flex min-h-[calc(100svh-108px)] items-center justify-center overflow-hidden bg-[#f4f9fd] px-5 py-16 sm:px-8">
      <div className="relative z-10 mx-auto flex w-full max-w-2xl flex-col items-center text-center">
        <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-[#365577]">
          <PawPrint aria-hidden="true" className="size-4 fill-blue-600 text-blue-600" />
          Page introuvable
        </p>

        <div
          aria-label="Erreur 404"
          className="mt-5 flex items-center gap-1.5 text-[clamp(7rem,28vw,13rem)] font-black leading-[0.8] tracking-[-0.09em] text-[#10284b]"
          role="img"
        >
          <span>4</span>
          <span className="flex size-[0.68em] items-center justify-center rounded-full bg-blue-600 text-white shadow-[0_14px_30px_rgba(37,99,235,0.22)]">
            <PawPrint aria-hidden="true" className="size-[0.42em] fill-white" />
          </span>
          <span>4</span>
        </div>

        <h1 className="mt-8 max-w-xl text-[clamp(2rem,7vw,3.5rem)] font-extrabold leading-[1.05] tracking-[-0.05em] text-[#10284b]">
          Oups, cette page s’est égarée.
        </h1>
        <p className="mt-4 max-w-lg text-base leading-7 text-[#49627d] sm:text-lg">
          Le lien a peut-être changé. Retrouvons les essentiels pour vos compagnons.
        </p>

        <div className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
          <Link
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-7 text-sm font-bold text-white transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 sm:w-auto"
            href="/"
          >
            Retour à l’accueil
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
          <Link
            className="inline-flex h-12 w-full items-center justify-center rounded-full border border-[#c8d9eb] px-7 text-sm font-bold text-[#183657] transition-colors hover:border-blue-300 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 sm:w-auto"
            href="/#shop-by-category"
          >
            Voir les catégories
          </Link>
        </div>
      </div>
    </main>
  );
}
