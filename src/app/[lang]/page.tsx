import { HeroSection } from "@/components/HeroSection";
import { TickerB } from "@/components/TickerB";
import { OffersSection } from "@/components/OffersSection";
import { TestimonialsSection } from "@/components/MobileAppSection";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { HowItWorks } from "@/components/HowItWorks";
import { ImportCalculator } from "@/components/ImportCalculator";
import { StatsSection } from "@/components/StatsSection";

export default function HomePage() {
  return (
    <div className="max-w-screen overflow-x-hidden bg-[#0F1515]">
      <HeroSection />
      <TickerB />
      <div className="separator h-[1px] w-full" />
      <HowItWorks />
      <div className="separator h-[1px] w-full" />
      <OffersSection />
      <div className="separator h-[1px] w-full" />
      <TestimonialsSection />
      <div className="separator h-[1px] w-full" />
      <WhyChooseUs />
      <div className="separator h-[1px] w-full" />
      <ImportCalculator />
      <div className="separator h-[1px] w-full" />
      <StatsSection />
      <div className="separator h-[1px] w-full" />
    </div>
  );
}
