import { Skeleton } from "@/components/ui/skeleton";

export function ProductPageSkeleton() {
  return (
    <main
      aria-label="Chargement du produit"
      aria-busy="true"
      className="mx-auto min-h-screen max-w-[1440px] px-5 pb-14 pt-6 sm:px-8 lg:px-10 lg:pt-8"
    >
      <Skeleton className="mb-7 h-4 w-64 bg-[#e8eff7]" />
      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 xl:gap-16">
        <div>
          <Skeleton className="aspect-square w-full rounded-[24px] bg-[#edf3fa] sm:rounded-[30px]" />
          <div className="mt-4 grid grid-cols-4 gap-3">
            {Array.from({ length: 4 }, (_, index) => (
              <Skeleton className="aspect-square rounded-2xl bg-[#edf3fa]" key={index} />
            ))}
          </div>
        </div>
        <div className="space-y-5 pt-2">
          <Skeleton className="h-3 w-28 bg-[#e8eff7]" />
          <Skeleton className="h-12 w-4/5 bg-[#e8eff7]" />
          <Skeleton className="h-6 w-2/3 bg-[#e8eff7]" />
          <Skeleton className="h-12 w-40 bg-[#e8eff7]" />
          <Skeleton className="h-20 w-full bg-[#e8eff7]" />
          <Skeleton className="h-12 w-full rounded-xl bg-[#e8eff7]" />
          <Skeleton className="h-12 w-full rounded-xl bg-[#e8eff7]" />
        </div>
      </div>
      <Skeleton className="mt-12 h-32 w-full bg-[#edf3fa]" />
    </main>
  );
}
