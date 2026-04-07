import type { Metadata } from "next";
import { HeroSection } from "@/components/HeroSection";
import { TickerB } from "@/components/TickerB";
import { OffersSection } from "@/components/OffersSection";
import { TestimonialsSection } from "@/components/MobileAppSection";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { HowItWorks } from "@/components/HowItWorks";
import { HeroWhyCard } from "@/components/HeroWhyCard";
import { ImportCalculator } from "@/components/ImportCalculator";
import { StatsSection } from "@/components/StatsSection";

type Props = { params: Promise<{ lang: string }> };

const meta = {
  bg: {
    title: "Внос на автомобили от САЩ | Best Auto",
    description: "Внос на коли от САЩ — аукцион, доставка, мито, ДДС и регистрация. Пълно обслужване от Best Auto.",
  },
  ru: {
    title: "Импорт автомобилей из США | Best Auto",
    description: "Импорт авто из США — аукцион, доставка, таможня, НДС и регистрация. Полный сервис от Best Auto.",
  },
  en: {
    title: "Car Import from the USA | Best Auto",
    description: "Import cars from the USA — auction, shipping, customs, VAT, and registration. Full service from Best Auto.",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const m = meta[lang as keyof typeof meta] ?? meta.bg;
  return {
    title: m.title,
    description: m.description,
    openGraph: {
      title: m.title,
      description: m.description,
      locale: lang === "ru" ? "ru_RU" : lang === "en" ? "en_US" : "bg_BG",
      type: "website",
      siteName: "Best Auto",
    },
    twitter: {
      card: "summary_large_image",
      title: m.title,
      description: m.description,
    },
    alternates: {
      canonical: lang === "bg" ? "/" : `/${lang}`,
      languages: { bg: "/", ru: "/ru", en: "/en" },
    },
  };
}

export default async function HomePage({ params }: Props) {
  const { lang } = await params;
  return (
    <div className="max-w-screen overflow-x-hidden bg-[#0F1515]">
      <HeroSection lang={lang} />
      <TickerB lang={lang} />
      <div className="separator h-[1px] w-full" />
      <HowItWorks lang={lang} />
      <div className="md:hidden px-4 py-8 flex justify-center">
        <HeroWhyCard lang={lang} />
      </div>
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
