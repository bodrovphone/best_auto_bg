import Image from "next/image";
import { HeroWhyCard } from "@/components/HeroWhyCard";

const tx = {
  heroTitle1:    { bg: "ВНОС НА АВТОМОБИЛИ",   ru: "ИМПОРТ АВТОМОБИЛЕЙ",   en: "CAR IMPORT" },
  heroTitle2:    { bg: "ДИРЕКТНО ОТ САЩ, КАНАДА И ЕВРОПА", ru: "НАПРЯМУЮ ИЗ США, КАНАДЫ И ЕВРОПЫ", en: "DIRECT FROM USA, CANADA & EUROPE" },
  heroDesc:      { bg: "Печелим аукцион на Copart, IAAI, ADESA и Manheim и се грижим за всичко останало — доставка, мито, ДДС и регистрация в КАТ.", ru: "Выигрываем аукционы на Copart, IAAI, ADESA и Manheim и берём на себя всё остальное — доставка, таможня, НДС и регистрация.", en: "We win auctions at Copart, IAAI, ADESA, and Manheim and handle everything else — shipping, customs, VAT, and registration." },
  viewLots:      { bg: "Разгледай лотовете",    ru: "Смотреть лоты",         en: "Browse Lots" },
  howWorks:      { bg: "Как работи?",            ru: "Как это работает?",     en: "How does it work?" },
  whyTitle:      { bg: "Защо",                   ru: "Почему",                en: "Why" },
  whySub:        { bg: "Вашият надежден партньор за внос от американски аукциони", ru: "Ваш надежный партнер по импорту с американских аукционов", en: "Your trusted partner for importing from US auctions" },
  ctaBtn:        { bg: "Получете безплатна консултация", ru: "Получите бесплатную консультацию", en: "Get a free consultation" },
  benefit1:      { bg: "Директен внос от Copart, IAAI, ADESA и Manheim", ru: "Прямой импорт с Copart, IAAI, ADESA и Manheim", en: "Direct import from Copart, IAAI, ADESA, and Manheim" },
  benefit2:      { bg: "Пълно митническо и ДДС оформяне",               ru: "Полное таможенное оформление и НДС",           en: "Full customs and VAT processing" },
  benefit3:      { bg: "Доставка от САЩ до вас за 5–6 седмици",         ru: "Доставка из США к вам за 5–6 недель",          en: "Delivery from USA to you in 5–6 weeks" },
  benefit4:      { bg: "Над 900 доволни клиенти от цяла България",      ru: "Более 900 довольных клиентов по всей Болгарии", en: "Over 900 satisfied customers across Bulgaria" },
} as const;

type TxKey = keyof typeof tx;
function t(key: TxKey, lang: string): string {
  return tx[key][lang as "bg" | "ru" | "en"] ?? tx[key].bg;
}

export function HeroSection({ lang = "bg" }: { lang?: string }) {
  const benefits = [
    t("benefit1", lang),
    t("benefit2", lang),
    t("benefit3", lang),
    t("benefit4", lang),
  ];

  return (
    <section className="relative min-h-[480px] md:min-h-[736px] w-full overflow-hidden bg-black">
      {/* Background image */}
      <Image
        src="/images/new_hero_image.jpg"
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      {/* Left-side dark fade so text stays readable */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/20" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[480px] md:min-h-[736px] max-w-7xl items-center px-4 pt-32 pb-12 lg:pt-32">
        <div className="grid w-full gap-10 lg:grid-cols-2 lg:gap-16">

          {/* Left column */}
          <div className="flex flex-col justify-center">
            <h1>
              <span className="block text-[32px] font-medium leading-tight text-white md:text-[42px] lg:text-[56px]">
                {t("heroTitle1", lang)}
              </span>
              <span className="block bg-gradient-to-r from-[#ED7014] to-[#FC6A03] bg-clip-text text-[26px] font-bold leading-tight text-transparent md:text-[36px] lg:text-[48px]">
                {t("heroTitle2", lang)}
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-lg text-gray-200 lg:text-xl lg:leading-relaxed">
              {t("heroDesc", lang)}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#offers"
                className="inline-flex items-center justify-center rounded-lg bg-[#ED7014] px-6 py-3 font-semibold text-black transition-opacity hover:opacity-90"
              >
                {t("viewLots", lang)}
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center rounded-lg border border-white/50 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
              >
                {t("howWorks", lang)}
              </a>
            </div>
          </div>

          {/* Right column — Why Best Auto panel (desktop only) */}
          <div className="hidden md:flex items-center lg:justify-end">
            <HeroWhyCard lang={lang} />
          </div>

        </div>
      </div>
    </section>
  );
}
