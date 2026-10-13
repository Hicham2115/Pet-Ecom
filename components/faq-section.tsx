import Link from "next/link";
import {
  ArrowRight,
  Dog,
  Bone,
  Headset,
  PawPrint,
  Plus,
  Cat,
} from "lucide-react";

const questions = [
  {
    question: "Comment choisir le bon produit pour mon animal ?",
    answer:
      "Commencez par son espèce, son âge et ses besoins du quotidien. Lisez les indications sur chaque fiche produit et, pour une question de santé ou d’alimentation spécifique, demandez conseil à votre vétérinaire.",
  },
  {
    question: "Livrez-vous partout au Maroc ?",
    answer:
      "Les zones desservies, les frais et les délais estimés sont indiqués lors de la commande, après saisie de votre adresse. Vous pourrez les vérifier avant de confirmer votre achat.",
  },
  {
    question: "Comment suivre ma commande ?",
    answer:
      "Les informations disponibles sur votre commande sont communiquées après validation. Si un lien de suivi est proposé pour votre livraison, vous le retrouverez dans les détails de la commande.",
  },
  {
    question: "Quels moyens de paiement puis-je utiliser ?",
    answer:
      "Les moyens de paiement disponibles pour votre adresse et votre commande s’affichent au moment du règlement, avant la confirmation finale.",
  },
  {
    question: "Puis-je recevoir les essentiels à intervalles réguliers ?",
    answer:
      "La livraison récurrente est pensée pour les produits que votre compagnon utilise souvent. Les articles éligibles et les options de fréquence seront précisés au moment de la sélection.",
  },
];

export function FaqSection() {
  return (
    <section
      aria-labelledby="faq-title"
      className=" px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20"
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-8 max-w-2xl sm:mb-10">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-blue-700">
            Un coup de patte
          </p>
          <h2
            className="text-[28px] font-extrabold leading-tight tracking-[-0.04em] text-[#10284b] sm:text-4xl"
            id="faq-title"
          >
            Vos questions, <span className="text-blue-600">nos réponses.</span>
          </h2>
          <p className="mt-3 text-sm leading-6 text-[#536b87] sm:text-base">
            Les infos utiles pour prendre soin d’eux, du premier clic à la
            livraison.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[0.82fr_1.18fr] lg:gap-8">
          <aside className="relative flex min-h-[300px] flex-col overflow-hidden rounded-[28px] bg-gradient-to-br from-[#1d63f7] via-[#1556df] to-[#1046b8] p-6 text-white shadow-[0_18px_40px_rgba(21,86,223,0.18)] sm:min-h-[340px] sm:p-8 lg:h-[480px] lg:min-h-0 lg:self-start lg:p-9 lg:pr-[42%]">
            <div
              aria-hidden="true"
              className="absolute -right-14 -top-16 size-64 rounded-full border-[36px] border-white/[0.08]"
            />

            <div
              aria-hidden="true"
              className="absolute right-7 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-5 lg:flex xl:right-10"
            >
              <div className="relative flex size-40 items-center justify-center rounded-full border border-white/20 bg-white/[0.07] shadow-[0_0_0_16px_rgba(255,255,255,0.04)] xl:size-48">
                <div className="flex size-24 items-center justify-center rounded-full border border-white/20 bg-white/10 xl:size-28">
                  <PawPrint
                    className="size-12 text-white/90 xl:size-14"
                    strokeWidth={1.5}
                  />
                </div>
                <span className="absolute right-1 top-5 flex size-9 items-center justify-center rounded-xl border border-white/20 bg-[#4d8aff] shadow-lg xl:right-2">
                  <Dog className="size-4" strokeWidth={1.8} />
                </span>
                <span className="absolute bottom-2 left-0 flex size-9 items-center justify-center rounded-xl border border-white/20 bg-[#4d8aff] shadow-lg xl:left-2">
                  <Bone className="size-4" strokeWidth={1.8} />
                </span>
                <span className="absolute bottom-5 right-0 flex size-9 items-center justify-center rounded-xl border border-white/20 bg-[#4d8aff] shadow-lg xl:right-1">
                  <Cat className="size-4" strokeWidth={1.8} />
                </span>
              </div>
              <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold tracking-wide text-blue-50 backdrop-blur-sm">
                Nutrition · Jeu · Soins
              </span>
            </div>

            <div className="relative flex items-center gap-3">
              <span className="flex size-11 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-white shadow-inner shadow-white/10">
                <PawPrint aria-hidden="true" className="size-5" />
              </span>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-blue-100">
                Toujours là pour eux
              </p>
            </div>

            <div className="relative mt-8 max-w-sm sm:mt-10">
              <h3 className="text-[26px] font-bold leading-[1.12] tracking-[-0.035em] sm:text-[32px]">
                Un petit doute ?<br />
                On vous guide.
              </h3>
              <p className="mt-3 max-w-[340px] text-sm leading-6 text-blue-50/90">
                Chaque compagnon est unique. Trouvez les essentiels qui lui
                ressemblent.
              </p>
            </div>

            <Link
              className="relative mt-6 inline-flex min-h-11 w-fit items-center gap-3 rounded-full border border-white/30 bg-white/10 py-2 pl-5 pr-2 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              href="/products"
            >
              Explorer les catégories
              <span className="flex size-8 items-center justify-center rounded-full bg-white text-blue-700">
                <ArrowRight aria-hidden="true" className="size-4" />
              </span>
            </Link>

            <div className="relative mt-auto hidden items-center gap-2 border-t border-white/15 pt-5 text-xs font-medium text-blue-100 sm:flex">
              <Headset aria-hidden="true" className="size-4" />
              <span>Le bien-être animal, notre priorité</span>
            </div>
          </aside>

          <div className="space-y-3">
            {questions.map(({ question, answer }, index) => (
              <details
                className="group rounded-2xl border border-[#e1eaf5] bg-white px-5 py-0 shadow-[0_3px_14px_rgba(16,40,75,0.035)] open:border-blue-200 open:shadow-[0_8px_24px_rgba(20,92,245,0.08)] sm:px-6"
                key={question}
                open={index === 0}
              >
                <summary className="flex min-h-[68px] cursor-pointer list-none items-center justify-between gap-4 py-4 text-left marker:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 [&::-webkit-details-marker]:hidden">
                  <span className="text-sm font-bold leading-5 text-[#10284b] sm:text-base">
                    {question}
                  </span>
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#eef5ff] text-blue-600 transition-colors group-open:bg-blue-600 group-open:text-white">
                    <Plus
                      aria-hidden="true"
                      className="size-4 transition-transform duration-200 group-open:rotate-45"
                    />
                  </span>
                </summary>
                <p className="max-w-2xl border-t border-[#edf2f8] pb-5 pt-3 text-sm leading-6 text-[#536b87]">
                  {answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
