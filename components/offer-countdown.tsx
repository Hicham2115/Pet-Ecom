"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, PawPrint, Sparkles } from "lucide-react";

const offerDuration = 14 * 24 * 60 * 60 * 1000;
const offerKey = "pawwell-offer-ends-at";

function getTimeLeft() {
  let endTime = Number(window.localStorage.getItem(offerKey));

  if (!endTime || endTime <= Date.now()) {
    endTime = Date.now() + offerDuration;
    window.localStorage.setItem(offerKey, String(endTime));
  }

  const remaining = Math.max(0, endTime - Date.now());
  return {
    days: Math.floor(remaining / 86_400_000),
    hours: Math.floor((remaining / 3_600_000) % 24),
    minutes: Math.floor((remaining / 60_000) % 60),
    seconds: Math.floor((remaining / 1_000) % 60),
  };
}

const units = [
  { key: "days", label: "Jours" },
  { key: "hours", label: "Heures" },
  { key: "minutes", label: "Minutes" },
  { key: "seconds", label: "Secondes" },
] as const;

export function OfferCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 14,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const update = () => setTimeLeft(getTimeLeft());
    update();
    const interval = window.setInterval(update, 1000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <section
      aria-labelledby="offer-title"
      className="px-5 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12"
    >
      <div className="relative mx-auto grid max-w-[1440px] overflow-hidden rounded-[28px] bg-[#10284b] px-6 py-8 text-white shadow-[0_24px_70px_rgba(16,40,75,0.16)] sm:rounded-[36px] sm:px-10 sm:py-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-14 lg:py-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-36 size-[420px] rounded-full bg-blue-500/20 blur-[90px]"
        />
        <div className="relative z-10">
          <p className="inline-flex items-center gap-2 rounded-full border border-blue-300/20 bg-blue-400/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-blue-100 sm:text-xs">
            Offre spéciale PawWell
          </p>
          <h2
            id="offer-title"
            className="mt-5 max-w-xl text-[clamp(28px,5vw,48px)] font-extrabold leading-[1.02] tracking-[-0.045em]"
          >
            Leur bonheur mérite{" "}
            <span className="text-[#91baff]">une belle surprise.</span>
          </h2>
          <p className="mt-3 max-w-lg text-sm leading-6 text-white sm:text-base">
            Profitez de notre sélection du moment avant la fin de l’offre.
            Faites plaisir à votre compagnon, simplement.
          </p>
          <Link
            className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#175ffc] px-6 text-sm font-bold text-white transition-[transform,background-color] duration-200 hover:-translate-y-0.5 hover:bg-[#3475ff] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            href="/products"
          >
            Voir les offres <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>

        <div className="relative z-10 mt-8 lg:mt-0 lg:pl-10">
          <div
            aria-hidden="true"
            className="absolute -right-5 -top-8 hidden rotate-12 text-blue-300/[0.12] sm:block"
          >
            <PawPrint className="size-36" />
          </div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-blue-100/65">
            L’offre se termine dans
          </p>
          <div
            aria-label={`${timeLeft.days} jours, ${timeLeft.hours} heures, ${timeLeft.minutes} minutes et ${timeLeft.seconds} secondes restantes`}
            className="grid grid-cols-4 gap-2 sm:gap-3"
            role="timer"
          >
            {units.map(({ key, label }) => (
              <div
                className="rounded-2xl border border-white/10 bg-white/[0.07] px-2 py-3 text-center backdrop-blur-sm sm:rounded-[20px] sm:px-3 sm:py-4"
                key={key}
              >
                <span className="block font-mono text-2xl font-bold tabular-nums tracking-[-0.06em] sm:text-4xl lg:text-[42px]">
                  {String(timeLeft[key]).padStart(2, "0")}
                </span>
                <span className="mt-1 block text-[9px] font-semibold uppercase tracking-[0.1em] text-blue-100/60 sm:text-[10px]">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
