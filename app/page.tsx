import { Hero } from "@/components/hero";
import { CategorySection } from "@/components/category-section";
import { BestSellersSection } from "@/components/best-sellers-section";
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
      <ScrollReveal>
        <CategorySection />
      </ScrollReveal>
      <ScrollReveal>
        <OfferCountdown />
      </ScrollReveal>
      <ScrollReveal>
        <BestSellersSection />
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
