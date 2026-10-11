import { Hero } from "@/components/hero";
import { CategorySection } from "@/components/category-section";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <CategorySection />
    </main>
  );
}
