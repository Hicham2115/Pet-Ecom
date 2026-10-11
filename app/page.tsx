import { Hero } from "@/components/hero";
import { CategorySection } from "@/components/category-section";
import { BestSellersSection } from "@/components/best-sellers-section";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <CategorySection />
      <BestSellersSection />
    </main>
  );
}
