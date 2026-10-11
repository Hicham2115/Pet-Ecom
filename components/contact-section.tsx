import { ArrowRight, Mail, PawPrint } from "lucide-react";

export function ContactSection() {
  return (
    <section
      aria-labelledby="contact-title"
      className=" px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20"
    >
      <div className="relative mx-auto grid max-w-[1440px] overflow-hidden rounded-[28px] border border-[#dce9f8] bg-[#f4f9ff] shadow-[0_16px_44px_rgba(16,40,75,0.07)] sm:rounded-[32px] lg:grid-cols-[0.85fr_1.15fr]">
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-0 z-10 hidden size-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#dce9f8] bg-white lg:block"
        />
        <span
          aria-hidden="true"
          className="absolute bottom-0 left-1/2 z-10 hidden size-8 -translate-x-1/2 translate-y-1/2 rounded-full border border-[#dce9f8] bg-white lg:block"
        />

        <div className="flex flex-col border-b border-[#cbdcf0] p-6 sm:p-9 lg:min-h-[650px] lg:border-b-0 lg:border-r lg:border-dashed lg:p-12 xl:p-14">
          <div className="flex size-14 items-center justify-center rounded-full border-2 border-[#175ffc] bg-[#10284b] text-white shadow-[0_0_0_4px_rgba(23,95,252,0.1)]">
            <PawPrint aria-hidden="true" className="size-6 fill-white" />
          </div>
          <p className="mt-7 text-xs font-bold uppercase tracking-[0.2em] text-[#175ffc]">
            À votre écoute
          </p>
          <h2
            className="mt-3 max-w-lg font-serif text-[34px] leading-[1.12] tracking-[-0.035em] text-[#10284b] sm:text-[42px]"
            id="contact-title"
          >
            Parlons de leur <span className="text-[#175ffc]">bien-être.</span>
          </h2>
          <p className="mt-4 max-w-md text-base leading-7 text-[#536b87] sm:text-lg sm:leading-8">
            Une question sur un produit, une commande ou les besoins de votre
            compagnon ? Écrivez-nous : nous sommes à votre écoute.
          </p>

          <div className="mt-7 divide-y divide-dashed divide-[#cbdcf0] border-y border-dashed border-[#cbdcf0]">
            <div className="flex flex-col gap-1 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#61758e]">
                Contact
              </span>
              <span className="text-sm font-medium text-[#10284b] sm:text-right">
                Formulaire ci-contre
              </span>
            </div>
            <div className="flex flex-col gap-1 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#61758e]">
                Vos sujets
              </span>
              <span className="text-sm font-medium text-[#10284b] sm:text-right">
                Produits, commandes, conseils
              </span>
            </div>
          </div>

          <a
            className="mt-7 inline-flex min-h-12 w-fit items-center gap-3 rounded-lg bg-[#175ffc] px-5 text-xs font-bold uppercase tracking-[0.08em] text-white transition-colors hover:bg-[#0f4fdb] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#175ffc] lg:mt-auto"
            href="#contact-form"
          >
            <Mail aria-hidden="true" className="size-4" />
            Nous écrire
          </a>
        </div>

        <form
          className="flex flex-col p-6 sm:p-9 lg:min-h-[650px] lg:p-12 xl:p-14"
          id="contact-form"
        >
          <div className="grid gap-x-7 gap-y-6 sm:grid-cols-2 sm:gap-y-7 lg:flex-1 lg:grid-rows-[auto_auto_1fr]">
            <div>
              <label
                className="font-serif text-sm font-bold uppercase tracking-[0.12em] text-[#10284b]"
                htmlFor="contact-first-name"
              >
                Prénom
              </label>
              <input
                autoComplete="given-name"
                className="mt-2.5 min-h-10 w-full border-b border-[#c7d8eb] bg-transparent pb-2 text-sm text-[#10284b] outline-none placeholder:text-[#91a3ba] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#175ffc]"
                id="contact-first-name"
                name="firstName"
                placeholder="Votre prénom"
                required
              />
            </div>
            <div>
              <label
                className="font-serif text-sm font-bold uppercase tracking-[0.12em] text-[#10284b]"
                htmlFor="contact-last-name"
              >
                Nom
              </label>
              <input
                autoComplete="family-name"
                className="mt-2.5 min-h-10 w-full border-b border-[#c7d8eb] bg-transparent pb-2 text-sm text-[#10284b] outline-none placeholder:text-[#91a3ba] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#175ffc]"
                id="contact-last-name"
                name="lastName"
                placeholder="Votre nom"
                required
              />
            </div>
            <div className="sm:col-span-2">
              <label
                className="font-serif text-sm font-bold uppercase tracking-[0.12em] text-[#10284b]"
                htmlFor="contact-email"
              >
                E-mail
              </label>
              <input
                autoComplete="email"
                className="mt-2.5 min-h-10 w-full border-b border-[#c7d8eb] bg-transparent pb-2 text-sm text-[#10284b] outline-none placeholder:text-[#91a3ba] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#175ffc]"
                id="contact-email"
                name="email"
                placeholder="vous@exemple.com"
                required
                type="email"
              />
            </div>
            <div className="sm:col-span-2 lg:flex lg:min-h-0 lg:flex-col">
              <label
                className="font-serif text-sm font-bold uppercase tracking-[0.12em] text-[#10284b]"
                htmlFor="contact-message"
              >
                Votre message
              </label>
              <textarea
                className="mt-2.5 min-h-32 w-full resize-y border-b border-[#c7d8eb] bg-transparent py-2 text-sm leading-6 text-[#10284b] outline-none placeholder:text-[#91a3ba] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#175ffc] sm:min-h-40 lg:flex-1"
                id="contact-message"
                name="message"
                placeholder="Parlez-nous de votre question..."
                required
                rows={4}
              />
            </div>
          </div>

          <div className="mt-7 flex flex-col gap-5 border-t border-[#cbdcf0] pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-sm text-xs leading-5 text-[#71839a]">
              En envoyant ce message, vous acceptez d’être recontacté par notre
              équipe.
            </p>
            <button
              className="inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-lg bg-[#175ffc] px-5 text-xs font-bold uppercase tracking-[0.08em] text-white transition-colors hover:bg-[#0f4fdb] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#175ffc] sm:w-auto"
              type="button"
            >
              Envoyer ma demande
              <ArrowRight aria-hidden="true" className="size-4" />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
