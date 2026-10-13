import { Suspense } from "react";
import { Hero } from "@/components/hero";
import { CategorySection } from "@/components/category-section";
import { BestSellersSection } from "@/components/best-sellers-section";
import { BestSellersSkeleton } from "@/components/best-sellers-skeleton";
import { RepeatDeliverySection } from "@/components/repeat-delivery-section";
import { ReviewsSection } from "@/components/reviews-section";
import { FaqSection } from "@/components/faq-section";
import { ContactSection } from "@/components/contact-section";
import { ScrollReveal } from "@/components/scroll-reveal";
import { OfferCountdown } from "@/components/offer-countdown";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <CategorySection />

      <ScrollReveal>
        <OfferCountdown />
      </ScrollReveal>
      <ScrollReveal>
        <Suspense fallback={<BestSellersSkeleton />}>
          <BestSellersSection />
        </Suspense>
      </ScrollReveal>
      <ScrollReveal>
        <RepeatDeliverySection />
      </ScrollReveal>
      <ScrollReveal>
        <ReviewsSection />
      </ScrollReveal>
      <ScrollReveal>
        <FaqSection />
      </ScrollReveal>
      <ScrollReveal>
        <ContactSection />
      </ScrollReveal>
    </main>
  );
}
