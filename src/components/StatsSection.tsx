"use client";

import { useEffect, useRef, useState } from "react";

const tx = {
  badge:      { bg: "Числата говорят",   ru: "Цифры говорят",        en: "Numbers Speak" },
  heading1:   { bg: "Резултати, не",     ru: "Результаты, а не",     en: "Results, not" },
  headingHL:  { bg: "обещания",          ru: "обещания",             en: "promises" },
  subtext:    { bg: "Всяко число стои зад реален автомобил, реален клиент и реално спестяване. Не продаваме мечти — доставяме коли.", ru: "За каждой цифрой стоит реальный автомобиль, реальный клиент и реальная экономия. Мы не продаем мечты — доставляем автомобили.", en: "Every number stands for a real car, a real client, and real savings. We don't sell dreams — we deliver cars." },
  stat1Label: { bg: "Внесени автомобила", ru: "Импортированных авто",  en: "Cars Imported" },
  stat1Sub:   { bg: "от 2020 до днес",    ru: "с 2020 по сегодня",    en: "from 2020 to today" },
  stat2Label: { bg: "Спестявате средно",  ru: "Средняя экономия",     en: "Average Savings" },
  stat2Sub:   { bg: "спрямо българския пазар", ru: "по сравнению с рынком БГ", en: "vs Bulgarian market" },
  stat3Label: { bg: "Оценка от клиенти", ru: "Оценка клиентов",       en: "Customer Rating" },
  stat3Sub:   { bg: "в Google Reviews",   ru: "в Google Reviews",     en: "on Google Reviews" },
  stat4Label: { bg: "Години опит",        ru: "Лет опыта",            en: "Years Experience" },
  stat4Sub:   { bg: "на американски аукциони", ru: "на американских аукционах", en: "at US auctions" },
} as const;

type TxKey = keyof typeof tx;
function t(key: TxKey, lang: string): string {
  return tx[key][lang as "bg" | "ru" | "en"] ?? tx[key].bg;
}

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1600;
          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min((now - start) / duration, 1);
            const ease = 1 - Math.pow(1 - t, 3);
            setDisplay(Math.round(ease * value));
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="text-4xl sm:text-5xl font-bold leading-none" style={{ color: "#ED7014" }}>
      {display}
      <span className="text-2xl sm:text-3xl">{suffix}</span>
    </div>
  );
}

export function StatsSection({ lang = "bg" }: { lang?: string }) {
  const stats = [
    { value: 150, suffix: "+", labelKey: "stat1Label" as TxKey, subKey: "stat1Sub" as TxKey },
    { value: 30,  suffix: "%", labelKey: "stat2Label" as TxKey, subKey: "stat2Sub" as TxKey },
    { value: 5,   suffix: "/5", labelKey: "stat3Label" as TxKey, subKey: "stat3Sub" as TxKey },
    { value: 4,   suffix: "+", labelKey: "stat4Label" as TxKey, subKey: "stat4Sub" as TxKey },
  ];

  return (
    <section
      id="stats"
      className="py-20 lg:py-28"
      style={{ backgroundColor: "#0F1515" }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <div className="mb-14 text-center">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] mb-4" style={{ color: "#ED7014" }}>
            {t("badge", lang)}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            {t("heading1", lang)}{" "}
            <span className="italic" style={{ color: "#ED7014" }}>{t("headingHL", lang)}</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base lg:text-lg text-gray-400 leading-relaxed">
            {t("subtext", lang)}
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {stats.map((stat) => (
            <div
              key={stat.labelKey}
              className="group rounded-2xl border p-6 sm:p-8 text-center transition-all duration-300 hover:border-[#ED7014]/40"
              style={{
                borderColor: "rgba(255,255,255,0.06)",
                backgroundColor: "rgba(20, 30, 30, 0.6)",
              }}
            >
              <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              <div className="mt-3 text-sm sm:text-base font-semibold text-white">{t(stat.labelKey, lang)}</div>
              <div className="mt-1 text-xs text-gray-500">{t(stat.subKey, lang)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
