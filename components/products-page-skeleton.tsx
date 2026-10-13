import { Skeleton } from "@/components/ui/skeleton";

export function ProductsPageSkeleton() {
  return (
    <main aria-label="Chargement de la boutique" aria-busy="true" className="min-h-screen bg-[#f7faff]">
      <section className="border-b border-[#e4edf7] bg-[#eef7ff] px-5 py-12 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-[1440px] space-y-5">
          <Skeleton className="h-4 w-40 bg-[#dceaf8]" />
          <Skeleton className="h-3 w-48 bg-[#dceaf8]" />
          <Skeleton className="h-16 w-full max-w-2xl bg-[#dceaf8]" />
          <Skeleton className="h-6 w-full max-w-xl bg-[#dceaf8]" />
        </div>
      </section>
      <section className="mx-auto grid max-w-[1440px] grid-cols-2 gap-3 px-5 py-8 sm:grid-cols-3 sm:gap-4 sm:px-8 lg:grid-cols-4 lg:px-10">
        {Array.from({ length: 8 }, (_, index) => (
          <div className="overflow-hidden rounded-[22px] border border-[#e4edf7] bg-white" key={index}>
            <Skeleton className="h-[210px] rounded-none bg-[#edf3fa] sm:h-[230px]" />
            <div className="space-y-3 px-4 pb-4 pt-4 sm:px-5">
              <Skeleton className="h-3 w-20 bg-[#e8eff7]" />
              <Skeleton className="h-4 w-3/4 bg-[#e8eff7]" />
              <Skeleton className="h-3 w-1/2 bg-[#e8eff7]" />
              <Skeleton className="mt-5 h-6 w-24 bg-[#e8eff7]" />
              <Skeleton className="mt-4 h-11 w-full rounded-xl bg-[#e8eff7]" />
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
