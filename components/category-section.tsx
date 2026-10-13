import Link from "next/link";
import { ArrowRight } from "lucide-react";

const categories = [
  {
    label: "Chien",
    description: "Alimentation, jouets, soins et plus",
    href: "/products",
    crop: "18%",
  },
  {
    label: "Chat",
    description: "Alimentation, jouets, soins et plus",
    href: "/products",
    crop: "24%",
  },
  {
    label: "Alimentation",
    description: "Bien manger pour être en pleine forme",
    href: "/products",
    crop: "38%",
  },
  {
    label: "Jouets",
    description: "De quoi jouer et s'amuser chaque jour",
    href: "/products",
    crop: "42%",
  },
  {
    label: "Hygiène & soins",
    description: "Les essentiels pour leur bien-être",
    href: "/products",
    crop: "20%",
  },
];

export function CategorySection() {
  return (
    <section
      aria-labelledby="shop-by-category"
      className="bg-white px-5 pb-10 pt-7 sm:px-8 lg:px-10"
    >
      <div className="mx-auto max-w-[1440px]">
        <h2
          id="shop-by-category"
          className="text-[26px] font-extrabold leading-tight tracking-[-0.03em] text-[#10284b]"
        >
          Acheter par catégorie
        </h2>
        <p className="mt-1 text-sm text-[#365577] sm:text-base">
          Tout pour leur quotidien, au même endroit.
        </p>
        <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 lg:gap-4">
          {categories.map(({ label, description, href, crop }, index) => (
            <li key={label}>
              <Link
                href={href}
                className="group block overflow-hidden rounded-2xl bg-[#eef7ff] transition-shadow hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                <div className="relative h-48 overflow-hidden bg-[#e3f1ff] sm:h-62">
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-no-repeat transition-transform duration-300 group-hover:scale-105"
                    style={{
                      backgroundImage: "url('/pawwell-categories.png')",
                      backgroundPosition: `${index * 25}% ${crop}`,
                      backgroundSize: "500% auto",
                    }}
                  />
                </div>
                <div className="flex min-h-[76px] items-center justify-between gap-2 px-3 py-2.5 sm:px-4">
                  <span className="min-w-0">
                    <span className="block text-sm font-bold text-[#10284b] sm:text-base">
                      {label}
                    </span>
                    <span className="mt-0.5 block text-[11px] leading-4 text-[#365577] sm:text-xs">
                      {description}
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="flex size-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white transition-transform group-hover:translate-x-0.5"
                  >
                    <ArrowRight className="size-4" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
