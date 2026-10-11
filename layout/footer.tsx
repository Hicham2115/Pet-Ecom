import Link from "next/link";
import { PawPrint } from "lucide-react";

const groups = [
  {
    title: "Boutique",
    links: ["Pour les chiens", "Pour les chats", "Alimentation", "Jouets", "Hygiène & soins"],
  },
  {
    title: "Aide & contact",
    links: [
      "Suivre ma commande",
      "Informations de livraison",
      "Retours & remboursements",
      "Nous contacter",
      "Conseils pour vos animaux",
    ],
  },
  {
    title: "À propos de PawWell",
    links: [
      "Notre histoire",
      "Notre engagement",
      "Développement durable",
      "Carrières",
      "Devenir partenaire",
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white text-[#10284b]">
      <div className="mx-auto grid max-w-[1440px] gap-8 px-5 py-10 sm:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_1fr_1fr] lg:px-10">
        <div>
          <Link
            aria-label="Accueil PawWell"
            className="mb-4 inline-flex items-center gap-2"
            href="/"
          >
            <PawPrint
              aria-hidden="true"
              className="size-7 fill-blue-600 text-blue-600"
            />
            <span className="text-2xl font-extrabold tracking-tight">
              PawWell
            </span>
          </Link>
          <p className="max-w-xs text-sm leading-6 text-slate-600">
            Tout pour des animaux heureux et en bonne santé. Des produits de
            qualité, des conseils et une attention sincère, au même endroit.
          </p>
        </div>
        {groups.map((group) => (
          <div key={group.title}>
            <h2 className="mb-3 text-sm font-bold">{group.title}</h2>
            <ul className="space-y-2 text-sm text-slate-600">
              {group.links.map((label) => (
                <li key={label}>
                  <Link className="hover:text-blue-700" href="#">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-slate-100 px-5 py-4 text-xs text-slate-500">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-2 sm:flex-row sm:items-center sm:justify-between lg:px-10">
          <span>© 2026 PawWell. Tous droits réservés.</span>
          <span className="flex gap-5">
            <Link href="#">Conditions générales</Link>
            <Link href="#">Confidentialité</Link>
            <Link href="#">Cookies</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
