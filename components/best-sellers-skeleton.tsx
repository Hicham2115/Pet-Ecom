import { Skeleton } from "@/components/ui/skeleton";

export function BestSellersSkeleton() {
  return (
    <section aria-label="Chargement des produits en vedette" aria-busy="true" className="bg-white px-5 pb-12 pt-2 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-[1440px]">
        <Skeleton className="mb-5 h-8 w-64 bg-[#e8eff7]" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 lg:gap-4">
          {Array.from({ length: 5 }, (_, index) => (
            <div className="overflow-hidden rounded-2xl border border-[#e5edf6] bg-white p-3" key={index}>
              <Skeleton className="h-36 bg-[#edf3fa] sm:h-44" />
              <Skeleton className="mt-4 h-4 w-2/3 bg-[#e8eff7]" />
              <Skeleton className="mt-2 h-4 w-full bg-[#e8eff7]" />
              <Skeleton className="mt-5 h-6 w-20 bg-[#e8eff7]" />
              <Skeleton className="mt-3 h-10 w-full rounded-xl bg-[#e8eff7]" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
