import { Hero } from "@/components/hero";
import { CategorySection } from "@/components/category-section";
import { BestSellersSection } from "@/components/best-sellers-section";
import { RepeatDeliverySection } from "@/components/repeat-delivery-section";
import { ReviewsSection } from "@/components/reviews-section";
import { FaqSection } from "@/components/faq-section";
import { ContactSection } from "@/components/contact-section";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <CategorySection />
      <BestSellersSection />
      <RepeatDeliverySection />
      <ReviewsSection />
      <FaqSection />
      <ContactSection />
    </main>
  );
}
