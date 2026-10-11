"use client";

import { useRef } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, Quote, Star } from "lucide-react";

const ratings = [
  { stars: 5, width: "w-[83%]", count: "29K" },
  { stars: 4, width: "w-[13%]", count: "4,5K" },
];

const highlights = [
  ["4,9", "Qualité"],
  ["4,8", "Livraison"],
  ["4,9", "Rapport qualité-prix"],
  ["5,0", "Service client"],
];

const reviews = [
  {
    quote:
      "Salam, ma chienne Luna adore ses croquettes. La livraison a été rapide et le colis très soigné.",
    name: "Amine B.",
    pet: "Humain de Luna",
    city: "Casablanca",
  },
  {
    quote:
      "Enfin des produits doux pour mon chat sensible. Je trouve tout au même endroit, c’est très pratique.",
    name: "Sara M.",
    pet: "Humaine de Milo",
    city: "Rabat",
  },
  {
    quote:
      "Le jouet préféré de Rio ! La qualité est au rendez-vous et il s’amuse avec tous les jours.",
    name: "Youssef E.",
    pet: "Humain de Rio",
    city: "Marrakech",
  },
  {
    quote:
      "Commande simple, bons conseils et une équipe vraiment à l’écoute. Je recommande PawWell.",
    name: "Lina A.",
    pet: "Humaine de Nala",
    city: "Tanger",
  },
];

function ReviewStars({ count = 5 }: { count?: number }) {
  return (
    <span aria-label={`${count} étoiles sur 5`} className="inline-flex gap-0.5 text-blue-600">
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          aria-hidden="true"
          className={`size-4 ${index < count ? "fill-current" : "text-[#d8dce3]"}`}
          key={index}
        />
      ))}
    </span>
  );
}

export function ReviewsSection() {
  const carouselRef = useRef<HTMLDivElement>(null);

  function scrollReviews(direction: "left" | "right") {
    const carousel = carouselRef.current;
    if (!carousel) return;

    carousel.scrollBy({
      left: (direction === "left" ? -1 : 1) * carousel.clientWidth * 0.82,
      behavior: "smooth",
    });
  }

  return (
    <section aria-labelledby="reviews-title" className="bg-white px-5 pb-14 pt-8 sm:px-8 lg:px-10 lg:pb-16">
      <div className="mx-auto max-w-[1440px]">
        <h2 className="text-[25px] font-extrabold tracking-[-0.03em] text-[#10284b] sm:text-[30px]">
          Avis
        </h2>

        <div className="mt-5 border-y border-[#e7ebf0] py-5 sm:py-6">
          <div className="grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)] lg:items-center lg:gap-8">
            <div className="flex items-center gap-5 lg:min-h-[112px] lg:border-r lg:border-[#e2e7ed]">
              <div>
                <p className="text-[54px] font-semibold leading-none tracking-[-0.06em] text-[#10284b] sm:text-[60px]">
                  4,8
                </p>
                <div className="mt-2">
                  <ReviewStars />
                </div>
                <p className="mt-1 text-xs text-[#718096]">35 000 évaluations</p>
              </div>
              <div className="hidden h-20 w-px bg-[#e2e7ed] sm:block lg:hidden" />
              <p className="max-w-[130px] text-sm leading-5 text-[#53657a] sm:hidden">
                La confiance de milliers d’humains et de leurs compagnons.
              </p>
            </div>

            <div className="space-y-2" aria-label="Répartition des notes">
              {ratings.map(({ stars, width, count }) => (
                <div className="flex items-center gap-3" key={stars}>
                  <span className="w-9 shrink-0 text-right text-xs font-medium text-[#53657a]">
                    {stars},0
                  </span>
                  <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-[#edf0f4]">
                    <div className={`h-full rounded-full bg-blue-600 ${width}`} />
                  </div>
                  <span className="w-12 shrink-0 text-right text-[11px] text-[#718096] sm:w-14">
                    {count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <ul className="mt-5 flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible">
            {highlights.map(([score, label]) => (
              <li
                className="inline-flex min-h-9 shrink-0 items-center gap-1.5 rounded-full border border-[#dce9f8] bg-[#f3f8ff] px-3.5 text-xs text-[#37465a]"
                key={label}
              >
                <span className="font-bold text-blue-700">{score}</span>
                <span>{label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-5 mt-7 flex items-end justify-between gap-4 sm:mt-9">
          <div>
            <h3
              className="text-[25px] font-extrabold leading-tight tracking-[-0.03em] text-[#10284b] sm:text-[30px]"
              id="reviews-title"
            >
              Ce que disent <span className="font-serif italic text-blue-600">nos clients</span>
            </h3>
            <p className="mt-1 text-sm text-[#718096]">Des avis vérifiés de nos clients au Maroc</p>
          </div>
          <div className="flex shrink-0 gap-2">
            <button
              aria-label="Avis précédents"
              className="inline-flex size-10 items-center justify-center rounded-full border border-[#e3e8ef] text-[#52677f] transition-colors hover:border-blue-600 hover:bg-blue-600 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:size-11"
              onClick={() => scrollReviews("left")}
              type="button"
            >
              <ArrowLeft aria-hidden="true" className="size-4" />
            </button>
            <button
              aria-label="Avis suivants"
              className="inline-flex size-10 items-center justify-center rounded-full bg-[#10284b] text-white transition-colors hover:bg-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:size-11"
              onClick={() => scrollReviews("right")}
              type="button"
            >
              <ArrowRight aria-hidden="true" className="size-4" />
            </button>
          </div>
        </div>

        <div
          className="-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-3 scroll-smooth sm:-mx-8 sm:gap-4 sm:px-8 lg:mx-0 lg:px-0"
          ref={carouselRef}
          role="region"
          aria-label="Avis clients"
        >
          {reviews.map(({ quote, name, pet, city }, index) => (
            <article
              className="flex min-h-[230px] w-[88%] shrink-0 snap-start flex-col rounded-2xl border border-[#e7ebf0] bg-white p-5 shadow-[0_4px_18px_rgba(16,40,75,0.045)] sm:w-[calc(50%-8px)] sm:p-6 lg:w-[calc(33.333%-11px)]"
              key={name}
            >
              <div className="flex items-center justify-between">
                <Quote aria-hidden="true" className="size-7 fill-blue-100 text-blue-300" />
                <ReviewStars count={index === 2 ? 4 : 5} />
              </div>
              <p className="mt-4 flex-1 text-[15px] leading-6 text-[#263b56] sm:text-base">
                “{quote}”
              </p>
              <div className="mt-4 flex items-center justify-between gap-3 border-t border-[#edf0f4] pt-3">
                <div>
                  <p className="text-sm font-bold text-[#10284b]">{name}</p>
                  <p className="mt-0.5 text-xs text-[#718096]">
                    {pet} · {city}
                  </p>
                </div>
                <span className="inline-flex shrink-0 items-center gap-1 text-[10px] font-medium text-[#52728e]">
                  <CheckCircle2 aria-hidden="true" className="size-3.5 text-blue-600" />
                  Vérifié
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
