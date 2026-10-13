import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#eef7ff]">
      <div className="pointer-events-none absolute inset-y-0 left-[25%] right-0 hidden lg:block">
        <Image
          alt=""
          aria-hidden="true"
          className="object-cover object-[center_18%]"
          fill
          priority
          sizes="75vw"
          src="/pawwell-hero.png"
        />
      </div>
      <div className="pointer-events-none absolute inset-0 hidden bg-[linear-gradient(to_right,#eef7ff_0%,#eef7ff_23%,rgba(238,247,255,0.94)_37%,rgba(238,247,255,0.36)_55%,transparent_72%)] lg:block" />
      <div className="relative mx-auto flex max-w-[1440px] flex-col lg:min-h-[550px] lg:flex-row lg:items-center xl:min-h-[530px]">
        <div className="relative h-[67vw] min-h-[240px] max-h-[440px] w-full lg:hidden">
          <Image
            alt="Un golden retriever et un chat tigré se reposent ensemble à la maison"
            className="object-cover object-[center_10%]"
            fill
            priority
            sizes="100vw"
            src="/pawwell-hero.png"
          />
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent to-[#eef7ff]" />
        </div>
        <div className="relative z-10 flex w-full flex-col justify-center bg-[#eef7ff] px-5 pb-8 pt-4 sm:px-8 lg:w-[58%] lg:bg-transparent lg:py-8 lg:pl-10 lg:pr-0 xl:pl-12">
          <p className="mb-3 text-[9px] font-bold uppercase tracking-[0.25em] text-[#365577] sm:mb-4 sm:text-[11px] lg:mb-5 lg:text-xs xl:mb-6 xl:text-[13px]">
            <span className="lg:hidden">
              Pour une vie plus saine et plus heureuse
            </span>
            <span className="hidden lg:inline">
              Pour leur bonheur au quotidien
            </span>
          </p>
          <h1 className="max-w-[540px] text-[clamp(28px,8.1vw,34px)] font-extrabold leading-[1.01] tracking-[-0.04em] text-[#10284b] sm:text-[38px] lg:max-w-[620px] lg:text-[48px] xl:max-w-[700px] xl:text-[56px] 2xl:text-[60px]">
            <span className="lg:hidden">
              Tout ce dont ils ont
              <br />
              besoin pour chaque
              <br />
              <span className="text-blue-600">journée extraordinaire</span>
            </span>
            <span className="hidden lg:inline">
              Tout ce qu’il leur faut
              <br /> pour{" "}
              <span className="text-blue-600">des jours heureux</span>
            </span>
          </h1>
          <p className="mt-3 max-w-[440px] text-[15px] leading-[1.55] text-[#294360] sm:mt-4 sm:text-base sm:leading-6 lg:mt-5 lg:max-w-[500px] lg:text-lg lg:leading-7 xl:mt-6 xl:max-w-[540px] xl:text-xl xl:leading-8">
            <span className="lg:hidden">
              Une sélection de confiance de nourriture, jouets, hygiène et soins
              pour les animaux qui rendent notre vie plus belle.
            </span>
            <span className="hidden lg:inline">
              Alimentation, jouets, hygiène et soins de confiance pour ceux qui
              embellissent nos vies.
            </span>
          </p>
          <Link
            className="mt-4 inline-flex h-11 w-full items-center justify-center rounded-full bg-blue-600 px-7 text-sm font-bold text-white transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 sm:mt-5 sm:h-12 sm:w-fit sm:px-8 sm:text-base lg:mt-6 lg:h-12 xl:mt-7 xl:h-14 xl:px-9"
            href="/products"
          >
            <span className="lg:hidden">Découvrir par animal</span>
            <span className="hidden lg:inline">Choisir par animal</span>
            <ArrowRight aria-hidden="true" className="ml-2 size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
