import { CheckCircleIcon } from "@/components/icons";

const tx = {
  whyTitle: { bg: "Защо",  ru: "Почему", en: "Why" },
  whySub:   { bg: "Вашият надежден партньор за внос от американски аукциони", ru: "Ваш надежный партнер по импорту с американских аукционов", en: "Your trusted partner for importing from US auctions" },
  ctaBtn:   { bg: "Получете безплатна консултация", ru: "Получите бесплатную консультацию", en: "Get a free consultation" },
  benefit1: { bg: "Директен внос от Copart, IAAI, ADESA и Manheim", ru: "Прямой импорт с Copart, IAAI, ADESA и Manheim", en: "Direct import from Copart, IAAI, ADESA, and Manheim" },
  benefit2: { bg: "Пълно митническо и ДДС оформяне",               ru: "Полное таможенное оформление и НДС",           en: "Full customs and VAT processing" },
  benefit3: { bg: "Доставка от САЩ до вас за 5–6 седмици",         ru: "Доставка из США к вам за 5–6 недель",          en: "Delivery from USA to you in 5–6 weeks" },
  benefit4: { bg: "Над 900 доволни клиенти от цяла България",      ru: "Более 900 довольных клиентов по всей Болгарии", en: "Over 900 satisfied customers across Bulgaria" },
} as const;

type TxKey = keyof typeof tx;
function t(key: TxKey, lang: string): string {
  return tx[key][lang as "bg" | "ru" | "en"] ?? tx[key].bg;
}

export function HeroWhyCard({ lang = "bg", className = "" }: { lang?: string; className?: string }) {
  const benefits = [
    t("benefit1", lang),
    t("benefit2", lang),
    t("benefit3", lang),
    t("benefit4", lang),
  ];

  return (
    <div className={`w-full max-w-md rounded-2xl border border-white/10 bg-black/40 p-7 backdrop-blur-md ${className}`}>
      <h2 className="text-xl font-bold text-white">
        {t("whyTitle", lang)}{" "}
        <span className="text-[#ED7014]">Best Auto?</span>
      </h2>
      <p className="mt-1 text-sm text-gray-400">{t("whySub", lang)}</p>

      <ul className="mt-6 flex flex-col gap-4">
        {benefits.map((b) => (
          <li key={b} className="flex items-start gap-3">
            <CheckCircleIcon className="mt-0.5 h-5 w-5 shrink-0 text-[#ED7014]" />
            <span className="text-sm text-gray-200">{b}</span>
          </li>
        ))}
      </ul>

      <a
        href="viber://chat?number=%2B359877575257"
        className="mt-7 flex w-full items-center justify-center rounded-xl bg-[#ED7014] px-6 py-3 font-semibold text-black transition-opacity hover:opacity-90"
      >
        {t("ctaBtn", lang)}
      </a>
    </div>
  );
}
