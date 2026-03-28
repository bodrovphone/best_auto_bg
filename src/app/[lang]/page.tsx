import { HeroSection } from "@/components/HeroSection";
import { TickerB } from "@/components/TickerB";
import { OffersSection } from "@/components/OffersSection";
import { TestimonialsSection } from "@/components/MobileAppSection";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { HowItWorks } from "@/components/HowItWorks";
import { ImportCalculator } from "@/components/ImportCalculator";
import { StatsSection } from "@/components/StatsSection";

type Props = { params: Promise<{ lang: string }> };

export default async function HomePage({ params }: Props) {
  const { lang } = await params;
  return (
    <div className="max-w-screen overflow-x-hidden bg-[#0F1515]">
      <HeroSection lang={lang} />
      <TickerB lang={lang} />
      <div className="separator h-[1px] w-full" />
      <HowItWorks lang={lang} />
      <div className="separator h-[1px] w-full" />
      <OffersSection lang={lang} />
      <div className="separator h-[1px] w-full" />
      <TestimonialsSection lang={lang} />
      <div className="separator h-[1px] w-full" />
      <WhyChooseUs lang={lang} />
      <div className="separator h-[1px] w-full" />
      <ImportCalculator lang={lang} />
      <div className="separator h-[1px] w-full" />
      <StatsSection lang={lang} />
      <div className="separator h-[1px] w-full" />
    </div>
  );
}
