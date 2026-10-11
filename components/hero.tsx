import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart, ShieldCheck, Truck } from "lucide-react";

const benefits = [
  { icon: Truck, label: "Livraison", detail: "Rapide, suivie et fiable" },
  {
    icon: ShieldCheck,
    label: "Sélection",
    detail: "Des marques choisies avec soin",
  },
  {
    icon: Heart,
    label: "Bien-être",
    detail: "Des essentiels pour leur santé",
  },
];

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
      <div className="relative mx-auto flex max-w-[1440px] flex-col lg:min-h-[550px] lg:flex-row lg:items-center xl:min-h-[620px]">
        <div className="relative z-10 flex w-full flex-col justify-center px-5 py-10 sm:px-8 lg:w-[58%] lg:py-8 lg:pl-10 lg:pr-0 xl:pl-12">
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.28em] text-[#365577] sm:text-[11px] lg:mb-5 lg:text-xs xl:mb-6 xl:text-[13px]">
            Pour leur bonheur au quotidien
          </p>
          <h1 className="max-w-[540px] text-[34px] font-extrabold leading-[1.06] tracking-[-0.04em] text-[#10284b] sm:text-[38px] lg:max-w-[620px] lg:text-[48px] xl:max-w-[700px] xl:text-[56px] 2xl:text-[60px]">
            Tout ce qu’il leur faut
            <br className="hidden lg:block" /> pour{" "}
            <span className="text-blue-600">des jours heureux</span>
          </h1>
          <p className="mt-4 max-w-[440px] text-[15px] leading-6 text-[#294360] sm:text-base sm:leading-6 lg:mt-5 lg:max-w-[500px] lg:text-lg lg:leading-7 xl:mt-6 xl:max-w-[540px] xl:text-xl xl:leading-8">
            Alimentation, jouets, hygiène et soins de confiance pour ceux qui
            embellissent nos vies.
          </p>
          <Link
            className="mt-5 inline-flex h-10 w-fit items-center justify-center rounded-full bg-blue-600 px-7 text-sm font-bold text-white transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 lg:mt-6 lg:h-12 lg:px-8 lg:text-base xl:mt-7 xl:h-14 xl:px-9"
            href="#shop-by-category"
          >
            Choisir par animal{" "}
            <ArrowRight aria-hidden="true" className="ml-2 size-4" />
          </Link>
          <ul className="mt-6 grid max-w-[500px] grid-cols-3 gap-3 sm:gap-5 lg:mt-8 lg:max-w-[600px] lg:gap-6 xl:mt-10 xl:gap-8">
            {benefits.map(({ icon: Icon, label, detail }) => (
              <li
                className="flex min-w-0 flex-col gap-1.5 border-r border-[#9db5ce]/60 pr-2 last:border-0 last:pr-0 sm:gap-2 sm:pr-4 lg:pr-5 xl:pr-6"
                key={label}
              >
                <span className="flex items-center gap-1.5 sm:gap-2">
                  <Icon
                    aria-hidden="true"
                    className="size-4 shrink-0 text-blue-600 sm:size-[18px]"
                  />
                  <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-[#183657] sm:text-[10px] lg:text-[11px]">
                    {label}
                  </span>
                </span>
                <span className="text-[10px] leading-[1.4] text-[#49627d] sm:text-[11px] lg:text-xs xl:text-[13px]">
                  {detail}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative h-[290px] w-full lg:hidden">
          <Image
            alt="Un golden retriever et un chat tigré se reposent ensemble à la maison"
            className="object-cover object-[center_10%]"
            fill
            priority
            sizes="100vw"
            src="/pawwell-hero.png"
          />
        </div>
      </div>
    </section>
  );
}
