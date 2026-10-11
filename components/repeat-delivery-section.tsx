import Image from "next/image";
import Link from "next/link";
import { ArrowRight, RefreshCw } from "lucide-react";

export function RepeatDeliverySection() {
  return (
    <section aria-labelledby="repeat-delivery-title" className="bg-white px-5 pb-12 sm:px-8 lg:px-10">
      <div
        className="relative mx-auto flex max-w-[1440px] flex-col overflow-hidden rounded-[24px] bg-[#eaf5ff] sm:rounded-[28px] lg:min-h-[260px] lg:flex-row lg:items-center"
        id="repeat-delivery"
      >
        <div className="relative z-10 flex items-start gap-4 px-5 pb-6 pt-7 sm:gap-5 sm:px-8 lg:w-[62%] lg:items-center lg:gap-8 lg:px-10 lg:py-8">
          <RefreshCw
            aria-hidden="true"
            className="mt-1 size-10 shrink-0 text-blue-600 sm:size-12 lg:mt-0 lg:size-[68px]"
            strokeWidth={2.4}
          />
          <div className="max-w-[580px]">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-blue-700 sm:text-xs">
              Livraison récurrente
            </p>
            <h2
              className="mt-2 text-[23px] font-extrabold leading-[1.12] tracking-[-0.03em] text-[#10284b] sm:text-[28px] lg:text-[32px]"
              id="repeat-delivery-title"
            >
              Leurs essentiels, livrés au bon moment.
            </h2>
            <p className="mt-2 max-w-[500px] text-sm leading-5 text-[#365577] sm:text-base sm:leading-6">
              Recevez leurs favoris à la fréquence qui vous convient. Toujours bien équipés, sans y penser.
            </p>
            <Link
              className="mt-4 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-blue-600 px-6 text-sm font-bold text-white shadow-[0_5px_14px_rgba(37,99,235,0.18)] transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 sm:px-8"
              href="#best-sellers"
            >
              Choisir mes produits
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </div>

        <div className="relative h-[210px] w-full sm:h-[260px] lg:absolute lg:inset-y-0 lg:right-0 lg:h-full lg:w-[52%]">
          <Image
            alt="Une boîte de produits pour animaux prête à être livrée à domicile"
            className="object-cover object-[70%_center] lg:object-[72%_center]"
            fill
            sizes="(max-width: 1024px) 100vw, 52vw"
            src="/repeat-delivery.webp"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#eaf5ff] to-transparent sm:h-20 lg:hidden"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 hidden w-32 bg-gradient-to-r from-[#eaf5ff] to-transparent lg:block"
          />
        </div>
      </div>
    </section>
  );
}
