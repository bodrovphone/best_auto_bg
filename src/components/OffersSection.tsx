import Image from "next/image";

const titleTypeLabels: Record<string, { bg: string; ru: string }> = {
  "CLEAN TITLE":   { bg: "Чист документ",  ru: "Чистый документ" },
  "SALVAGE TITLE": { bg: "Тотална щета",   ru: "Тотальный ущерб" },
  "REBUILT TITLE":  { bg: "Възстановен",    ru: "Восстановлен" },
};

const damageLabels: Record<string, { bg: string; ru: string }> = {
  "MINOR DENT/SCRATCHES": { bg: "Малки вдлъбнатини",    ru: "Небольшие вмятины" },
  "NORMAL WEAR":          { bg: "Нормално износване",   ru: "Нормальный износ" },
  "FRONT END":            { bg: "Предна част",          ru: "Передняя часть" },
  "REAR END":             { bg: "Задна част",           ru: "Задняя часть" },
  "ALL OVER":             { bg: "Цялостни щети",        ru: "Повреждения повсюду" },
  "HAIL":                 { bg: "Градушка",             ru: "Град" },
  "WATER/FLOOD":          { bg: "Вода/наводнение",      ru: "Вода/затопление" },
  "MECHANICAL":           { bg: "Механична повреда",    ru: "Механическое повреждение" },
};

const tx = {
  badge:       { bg: "Copart Аукцион",     ru: "Аукцион Copart" },
  heading:     { bg: "Последни Лотове",    ru: "Последние лоты" },
  subtext:     { bg: "Реални лотове, спечелени и внасяни в момента. Свържете се с нас за детайли.", ru: "Реальные лоты, выигранные и импортируемые прямо сейчас. Свяжитесь с нами для подробностей." },
  viewAll:     { bg: "Виж всички",         ru: "Смотреть все" },
  auction:     { bg: "Търг:",              ru: "Торги:" },
  damage:      { bg: "Щета:",             ru: "Ущерб:" },
  expectedBid: { bg: "Очакван търг",      ru: "Ожидаемая ставка" },
  priceBG:     { bg: "~цена в БГ",        ru: "~цена в БГ" },
  disclaimer:  { bg: `* Приблизителни цени. „Очакван търг“ е оценка базирана на исторически данни. „~цена в БГ“ включва доставка, мито и ДДС.`, ru: `* Приблизительные цены. „Ожидаемая ставка“ основана на исторических данных. „~цена в БГ“ включает доставку, пошлину и НДС.` },
} as const;

type TxKey = keyof typeof tx;
function t(key: TxKey, lang: string): string {
  return tx[key][lang as "bg" | "ru"] ?? tx[key].bg;
}

function translateDamage(raw: string, lang: string): string {
  const entry = damageLabels[raw];
  if (!entry) return raw;
  return entry[lang as "bg" | "ru"] ?? entry.bg;
}

function translateTitleType(raw: string, lang: string): string {
  const entry = titleTypeLabels[raw];
  if (!entry) return raw;
  return entry[lang as "bg" | "ru"] ?? entry.bg;
}

/** Returns a date string YYYY-MM-DD that is `days` days from today */
function daysFromToday(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

interface Lot {
  lotId: string;
  title: string;
  odometer: number;
  titleType: string;
  primaryDamage: string;
  location: string;
  auctionBudget: number;
  shipping: number;
  /** How many days from today the auction ends */
  daysAhead: number;
  image: string;
  lotUrl: string;
}

const lots: Lot[] = [
  { lotId: "79066585", title: "2023 RAM 1500 TRADESMAN",    odometer: 113394, titleType: "CLEAN TITLE", primaryDamage: "MINOR DENT/SCRATCHES", location: "MS - JACKSON",          auctionBudget: 14500, shipping: 2800, daysAhead: 2, image: "/assets/images/lots/79066585.jpg", lotUrl: "https://www.copart.com/lot/79066585" },
  { lotId: "46366066", title: "2025 KIA TELLURIDE S",       odometer: 10923,  titleType: "CLEAN TITLE", primaryDamage: "MINOR DENT/SCRATCHES", location: "GA - SAVANNAH",         auctionBudget: 21000, shipping: 2400, daysAhead: 2, image: "/assets/images/lots/46366066.jpg", lotUrl: "https://www.copart.com/lot/46366066" },
  { lotId: "79983845", title: "2019 CHEVROLET TRAX 1LT",    odometer: 95282,  titleType: "CLEAN TITLE", primaryDamage: "NORMAL WEAR",          location: "FL - TALLAHASSEE",      auctionBudget: 7000,  shipping: 2400, daysAhead: 3, image: "/assets/images/lots/79983845.jpg", lotUrl: "https://www.copart.com/lot/79983845" },
  { lotId: "79775655", title: "2023 KIA SOUL LX",           odometer: 114842, titleType: "CLEAN TITLE", primaryDamage: "MINOR DENT/SCRATCHES", location: "KS - KANSAS CITY",      auctionBudget: 6000,  shipping: 2100, daysAhead: 3, image: "/assets/images/lots/79775655.jpg", lotUrl: "https://www.copart.com/lot/79775655" },
  { lotId: "79768855", title: "2018 DODGE CHARGER SXT PLUS",odometer: 134606, titleType: "CLEAN TITLE", primaryDamage: "MINOR DENT/SCRATCHES", location: "FL - FT. PIERCE",       auctionBudget: 7500,  shipping: 2100, daysAhead: 2, image: "/assets/images/lots/79768855.jpg", lotUrl: "https://www.copart.com/lot/79768855" },
  { lotId: "79452215", title: "2024 MITSUBISHI MIRAGE ES",  odometer: 27073,  titleType: "CLEAN TITLE", primaryDamage: "NORMAL WEAR",          location: "FL - JACKSONVILLE N.", auctionBudget: 7500,  shipping: 2100, daysAhead: 3, image: "/assets/images/lots/79452215.jpg", lotUrl: "https://www.copart.com/lot/79452215" },
  { lotId: "79248535", title: "2018 JEEP COMPASS LATITUDE", odometer: 32873,  titleType: "CLEAN TITLE", primaryDamage: "MINOR DENT/SCRATCHES", location: "NV - LAS VEGAS WEST",   auctionBudget: 9500,  shipping: 2400, daysAhead: 2, image: "/assets/images/lots/79248535.jpg", lotUrl: "https://www.copart.com/lot/79248535" },
  { lotId: "79055305", title: "2024 MAZDA CX-30 SELECT",    odometer: 39913,  titleType: "CLEAN TITLE", primaryDamage: "NORMAL WEAR",          location: "AZ - PHOENIX",          auctionBudget: 13000, shipping: 2400, daysAhead: 3, image: "/assets/images/lots/79055305.jpg", lotUrl: "https://www.copart.com/lot/79055305" },
  { lotId: "78997995", title: "2023 NISSAN KICKS SV",       odometer: 94490,  titleType: "CLEAN TITLE", primaryDamage: "MINOR DENT/SCRATCHES", location: "MS - JACKSON",          auctionBudget: 7500,  shipping: 2400, daysAhead: 2, image: "/assets/images/lots/78997995.jpg", lotUrl: "https://www.copart.com/lot/78997995" },
  { lotId: "78892095", title: "2018 HYUNDAI SONATA SEL",    odometer: 76978,  titleType: "CLEAN TITLE", primaryDamage: "MINOR DENT/SCRATCHES", location: "FL - TALLAHASSEE",      auctionBudget: 6500,  shipping: 2100, daysAhead: 3, image: "/assets/images/lots/78892095.jpg", lotUrl: "https://www.copart.com/lot/78892095" },
];

function calcBgPrice(auctionUsd: number, shipping: number): number {
  const eur = auctionUsd * 0.92;
  const auctionFees = auctionUsd * 0.10 * 0.92 + 320;
  const insurance = Math.round(eur * 0.015);
  const cif = eur + shipping + insurance;
  const customs = cif * 0.10;
  const vat = (cif + customs) * 0.20;
  return Math.round(eur + auctionFees + shipping + customs + vat + 200);
}

function formatUsd(v: number) { return `$${v.toLocaleString("en-US")}`; }
function formatEur(v: number) { return `\u20AC${v.toLocaleString("bg-BG")}`; }
function formatKm(miles: number) { return `${Math.round(miles * 1.60934).toLocaleString("bg-BG")} \u043A\u043C`; }

function formatSaleDate(dateStr: string): string {
  const [, month, day] = dateStr.split("-");
  return `${day}.${month}`;
}

function LotCard({ lot, lang }: { lot: Lot & { saleDate: string }; lang: string }) {
  const isClean = lot.titleType === "CLEAN TITLE";
  const bgPrice = calcBgPrice(lot.auctionBudget, lot.shipping);

  return (
    <a
      href={lot.lotUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col rounded-xl border border-gray-700/50 bg-gray-900/60 overflow-hidden transition-all duration-300 hover:border-customYellow/40 hover:bg-gray-900/90 hover:-translate-y-0.5"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-800">
        <Image
          src={lot.image}
          alt={lot.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div className="absolute top-2.5 left-2.5">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${isClean ? "bg-emerald-500/90 text-white" : "bg-orange-500/90 text-white"}`}>
            {translateTitleType(lot.titleType, lang)}
          </span>
        </div>
        <div className="absolute top-2.5 right-2.5">
          <span className="text-[10px] font-semibold bg-black/70 text-gray-300 px-2 py-0.5 rounded">
            {t("auction", lang)} {formatSaleDate(lot.saleDate)}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2.5 p-4">
        <h3 className="text-white font-bold text-sm leading-tight line-clamp-2 group-hover:text-customYellow transition-colors">
          {lot.title}
        </h3>

        <div className="flex flex-col gap-1 text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <svg className="h-3 w-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {lot.location}
          </span>
          <span className="flex items-center gap-1">
            <svg className="h-3 w-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            {formatKm(lot.odometer)}
          </span>
        </div>

        <p className="text-xs text-gray-500 truncate">
          {t("damage", lang)} {translateDamage(lot.primaryDamage, lang)}
        </p>

        <div className="mt-auto pt-2 border-t border-gray-700/40 flex items-end justify-between gap-2">
          <div>
            <p className="text-[10px] text-gray-500 uppercase tracking-wide">{t("expectedBid", lang)}</p>
            <p className="text-base font-black text-customYellow leading-tight">~{formatUsd(lot.auctionBudget)}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-gray-500 uppercase tracking-wide">{t("priceBG", lang)}</p>
            <p className="text-sm font-semibold text-emerald-400 leading-tight">~{formatEur(bgPrice)}</p>
          </div>
        </div>
      </div>
    </a>
  );
}

export function OffersSection({ lang = "bg" }: { lang?: string }) {
  const lotsWithDates = lots.map((lot) => ({
    ...lot,
    saleDate: daysFromToday(lot.daysAhead),
  }));

  return (
    <section id="offers" className="bg-[#0F1515] py-12 lg:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-10 flex flex-col items-center text-center gap-3 sm:flex-row sm:justify-between sm:text-left">
          <div>
            <span className="text-sm font-semibold uppercase tracking-widest text-customYellow">
              {t("badge", lang)}
            </span>
            <h2 className="mt-1 text-2xl font-bold text-white lg:text-3xl">
              {t("heading", lang)}
            </h2>
            <p className="mt-1 max-w-md text-sm text-gray-400">
              {t("subtext", lang)}
            </p>
          </div>
          <a
            href="https://www.copart.com"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-1.5 rounded-full border border-gray-600 px-4 py-2 text-sm text-gray-300 transition-colors hover:border-customYellow hover:text-customYellow"
          >
            {t("viewAll", lang)}
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
          {lotsWithDates.map((lot) => (
            <LotCard key={lot.lotId} lot={lot} lang={lang} />
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-gray-600">
          {t("disclaimer", lang)}
        </p>
      </div>
    </section>
  );
}
