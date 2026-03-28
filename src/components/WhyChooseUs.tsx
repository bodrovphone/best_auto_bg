import { CarIcon, BarChartIcon, TruckIcon } from "@/components/icons";
import type { ComponentType, SVGProps } from "react";

const tx = {
  headingPre:  { bg: "Защо",             ru: "Почему" },
  subtitle:    { bg: "Един човек, прозрачен процес и над 900 успешно внесени автомобила. Без посредници, без изненади в цената.", ru: "Один человек, прозрачный процесс и более 900 успешно импортированных автомобилей. Без посредников, без сюрпризов в цене." },
  feat1Title:  { bg: "Само Clean Title",  ru: "Только Clean Title" },
  feat1Desc:   { bg: "Не купуваме всичко подред. Подбираме само автомобили с чист документ и минимални щети — такива, каквито бихме взели за себе си.", ru: "Мы не покупаем все подряд. Подбираем только автомобили с чистым документом и минимальными повреждениями — такие, какие взяли бы для себя." },
  feat2Title:  { bg: "До 40% по-евтино",  ru: "До 40% дешевле" },
  feat2Desc:   { bg: "Цените на американските аукциони са значително по-ниски от българския пазар. Ние ви помагаме да се възползвате без риск и скрити такси.", ru: "Цены на американских аукционах значительно ниже болгарского рынка. Мы помогаем вам воспользоваться этим без рисков и скрытых комиссий." },
  feat3Title:  { bg: "Всичко включено",   ru: "Все включено" },
  feat3Desc:   { bg: "Аукцион, транспорт, мито, ДДС, регистрация в КАТ — вие получавате готов автомобил. Ние се грижим за всяка стъпка от процеса.", ru: "Аукцион, транспорт, пошлина, НДС, регистрация в КАТ — вы получаете готовый автомобиль. Мы заботимся о каждом этапе процесса." },
} as const;

type TxKey = keyof typeof tx;
function t(key: TxKey, lang: string): string {
  return tx[key][lang as "bg" | "ru"] ?? tx[key].bg;
}

interface Feature {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  titleKey: TxKey;
  descKey: TxKey;
}

const features: Feature[] = [
  { icon: CarIcon,      titleKey: "feat1Title", descKey: "feat1Desc" },
  { icon: BarChartIcon, titleKey: "feat2Title", descKey: "feat2Desc" },
  { icon: TruckIcon,    titleKey: "feat3Title", descKey: "feat3Desc" },
];

export function WhyChooseUs({ lang = "bg" }: { lang?: string }) {
  return (
    <section
      id="about"
      className="py-16 text-center"
      style={{ backgroundColor: "rgb(17, 24, 39)" }}
    >
      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}
        <h2 className="text-[30px] leading-tight">
          <span className="text-gray-400">{t("headingPre", lang)}</span>{" "}
          <span className="font-bold text-white">Best Auto?</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-[16px] leading-relaxed text-gray-400">
          {t("subtitle", lang)}
        </p>

        {/* Feature Cards */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.titleKey}
              className="rounded-xl border border-gray-700/50 bg-transparent p-8 text-left"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#E1E100]/10">
                <feature.icon className="h-6 w-6 text-[#E1E100]" />
              </div>
              <h3 className="mt-4 text-[20px] font-bold text-white">
                {t(feature.titleKey, lang)}
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-gray-400">
                {t(feature.descKey, lang)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
