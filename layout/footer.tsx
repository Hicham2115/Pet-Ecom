import Link from "next/link";
import { ArrowRight, PawPrint } from "lucide-react";

const footerGroups = [
  {
    title: "Boutique",
    links: [
      { label: "Chiens & chats", href: "#shop-by-category" },
      { label: "Alimentation", href: "#shop-by-category" },
      { label: "Jouets", href: "#shop-by-category" },
      { label: "Hygiène & soins", href: "#shop-by-category" },
      { label: "Meilleures ventes", href: "#best-sellers" },
    ],
  },
  {
    title: "Aide",
    links: [
      { label: "Questions fréquentes", href: "#faq-title" },
      { label: "Livraison & commandes", href: "#faq-title" },
      { label: "Conseils pour vos animaux", href: "#faq-title" },
      { label: "Avis clients", href: "#reviews-title" },
    ],
  },
];

const quickLinks = [
  { label: "Chiens", href: "#shop-by-category" },
  { label: "Chats", href: "#shop-by-category" },
  { label: "Alimentation", href: "#shop-by-category" },
  { label: "Jouets", href: "#shop-by-category" },
  { label: "Hygiène & soins", href: "#shop-by-category" },
];

export function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-[#0b1c35] px-4 pb-36 pt-7 text-white sm:px-6 sm:pb-44 sm:pt-10 lg:px-10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 select-none overflow-hidden text-center text-[clamp(5rem,17vw,15rem)] font-black leading-[0.8] tracking-[-0.09em] text-white/[0.035]"
      >
        PawWell
      </div>

      <div className="relative z-10 mx-auto max-w-[1520px] rounded-[28px] border border-white/10 bg-[#122f54] shadow-[0_20px_70px_rgba(0,0,0,0.2)] sm:rounded-[36px]">
        <div className="grid gap-9 px-6 py-9 sm:grid-cols-2 sm:px-9 sm:py-11 lg:grid-cols-[1.15fr_0.8fr_0.9fr_1.35fr] lg:gap-10 lg:px-12 lg:py-14">
          <div>
            <Link
              aria-label="Accueil PawWell"
              className="inline-flex items-center gap-2.5 transition-opacity duration-300 ease-in-out hover:opacity-80"
              href="/"
            >
              <PawPrint
                aria-hidden="true"
                className="size-8 fill-[#175ffc] text-[#175ffc]"
              />
              <span className="text-[25px] font-extrabold tracking-[-0.04em]">
                PawWell
              </span>
            </Link>
            <p className="mt-4 max-w-[270px] text-sm leading-6 text-blue-100/75">
              Des animaux plus heureux. Des jours plus lumineux. Tout ce qu’il
              faut pour prendre soin d’eux, chaque jour.
            </p>
          </div>

          {footerGroups.map((group) => (
            <nav aria-label={group.title} key={group.title}>
              <h2 className="mb-4 text-xs font-extrabold uppercase tracking-[0.16em] text-[#91baff]">
                {group.title}
              </h2>
              <ul className="space-y-3">
                {group.links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      className="group relative inline-flex text-sm text-white/75 transition-[color,transform] duration-500 ease-in-out hover:translate-x-0.5 hover:text-white after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-[#175ffc] after:transition-[width] after:duration-500 after:ease-in-out hover:after:w-full focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#175ffc]"
                      href={href}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div id="newsletter">
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#91baff]">
              Restez informé
            </p>
            <h2 className="mt-3 max-w-sm text-[21px] font-bold leading-tight tracking-[-0.03em] sm:text-2xl">
              Des nouvelles pour mieux prendre soin d’eux.
            </h2>
            <p className="mt-2 max-w-sm text-sm leading-6 text-blue-100/75">
              Conseils, nouveautés et petites attentions pour vos compagnons.
            </p>
            <div className="mt-5 flex min-h-12 max-w-[440px] rounded-xl border border-white/20 bg-white/[0.06] p-1.5 transition-colors focus-within:border-blue-300 focus-within:ring-4 focus-within:ring-blue-400/15">
              <label className="sr-only" htmlFor="newsletter-email">
                Votre adresse e-mail
              </label>
              <input
                autoComplete="email"
                className="min-w-0 flex-1 bg-transparent px-3 text-sm text-white outline-none placeholder:text-blue-100/55"
                id="newsletter-email"
                name="email"
                placeholder="Votre adresse e-mail"
                type="email"
              />
              <button
                aria-label="S’inscrire à la newsletter"
                className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#175ffc] text-white transition-colors hover:bg-[#0f4fdb] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                type="button"
              >
                <ArrowRight aria-hidden="true" className="size-4" />
              </button>
            </div>
            <p className="mt-2 text-[11px] leading-4 text-blue-100/50">
              Des nouvelles utiles, pensées pour leur quotidien.
            </p>
          </div>
        </div>

        <div className="mx-6 border-t border-white/10 sm:mx-9 lg:mx-12" />

        <nav
          aria-label="Accès rapide à la boutique"
          className="flex flex-col gap-4 px-6 py-5 sm:px-9 sm:py-6 lg:flex-row lg:items-center lg:gap-8 lg:px-12"
        >
          <span className="shrink-0 text-xs font-semibold uppercase tracking-[0.14em] text-blue-100/55">
            Explorer
          </span>
          <ul className="flex flex-wrap gap-2">
            {quickLinks.map(({ label, href }) => (
              <li key={label}>
                <Link
                  className="inline-flex min-h-9 items-center rounded-full border border-white/15 bg-white/[0.04] px-4 text-xs font-medium text-white/75 transition-[color,background-color,border-color,transform] duration-500 ease-in-out hover:-translate-y-0.5 hover:border-[#175ffc]/60 hover:bg-[#175ffc]/15 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#175ffc]"
                  href={href}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mx-6 border-t border-white/10 sm:mx-9 lg:mx-12" />

        <div className="px-6 py-5 text-center sm:px-9 sm:py-6">
          <p className="text-xs text-blue-100/65">
            © {new Date().getFullYear()} PawWell. Tous droits réservés.
          </p>
        </div>
      </div>

      <p className="relative z-10 mx-auto max-w-[1440px] px-6 py-4 text-center text-[12px] text-white/70 sm:px-8 lg:px-12">
        Designed &amp; developed by{" "}
        <a
          href="https://www.stallionadvertising.ma/"
          target="_blank"
          rel="noopener noreferrer"
          className="mb-20 underline decoration-transparent underline-offset-2 transition-colors duration-500 ease-in-out hover:text-white hover:decoration-white"
        >
          Stallion Advertising
        </a>
      </p>
    </footer>
  );
}
