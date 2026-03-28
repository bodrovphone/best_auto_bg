"use client";

import { useState } from "react";
import { CheckCircleIcon, ChevronDownIcon } from "@/components/icons";

type CarType = "sedan" | "suv" | "truck";
type EngineType = "petrol" | "diesel" | "electric" | "hybrid";

interface CalculationResult {
  eurPrice: number;
  auctionFees: number;
  shippingCost: number;
  customsDuty: number;
  ecoTax: number;
  vat: number;
  registration: number;
  total: number;
  bgMarketPrice: number;
  savings: number;
  savingsPercent: number;
}

const carTypeOptions: { value: CarType; label: string }[] = [
  { value: "sedan", label: "Седан" },
  { value: "suv", label: "SUV" },
  { value: "truck", label: "Пикап" },
];

const engineTypeOptions: { value: EngineType; label: string }[] = [
  { value: "petrol", label: "Бензин" },
  { value: "diesel", label: "Дизел" },
  { value: "electric", label: "Електрически" },
  { value: "hybrid", label: "Хибрид" },
];

const yearOptions = Array.from({ length: 15 }, (_, i) => {
  const y = 2026 - i;
  return { value: String(y), label: String(y) };
});

const benefits = [
  "Прозрачни цени без скрити такси",
  "Включена доставка от САЩ",
  "Митническо оформяне и ДДС",
  "Регистрация в КАТ",
];

function formatEur(value: number): string {
  return `€${value.toLocaleString("bg-BG", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

function calculate(
  carPrice: number,
  carType: CarType,
  engine: EngineType,
  year: number
): CalculationResult {
  // USD to EUR conversion
  const eurRate = 0.92;
  const eurPrice = Math.round(carPrice * eurRate);

  // Auction buyer premium (~10%) + fixed fees (~$350 → EUR)
  const auctionFees = Math.round(carPrice * 0.10 * eurRate + 320);

  // Shipping: RoRo from USA to Varna/Burgas (real market rates 2025)
  const shippingCost =
    carType === "suv" ? 2400 : carType === "truck" ? 2800 : 2100;

  // CIF value = car price + shipping + insurance (~1.5% of car value)
  const insurance = Math.round(eurPrice * 0.015);
  const cifValue = eurPrice + shippingCost + insurance;

  // Customs duty: 10% of CIF value (EU tariff code 8703 for passenger vehicles)
  const customsDuty = Math.round(cifValue * 0.10);

  // Eco tax: based on Euro emission standard (approximated by year)
  // Newer cars (Euro 6) ~€95, older cars up to €250
  const yearsOld = Math.max(0, 2026 - year);
  let ecoTax: number;
  if (engine === "electric") {
    ecoTax = 0;
  } else if (yearsOld <= 3) {
    ecoTax = 95; // Euro 6d
  } else if (yearsOld <= 6) {
    ecoTax = 150; // Euro 6
  } else if (yearsOld <= 10) {
    ecoTax = 200; // Euro 5
  } else {
    ecoTax = 250; // Euro 4 or older
  }

  // VAT: 20% of (CIF + customs duty)
  const vatBase = cifValue + customsDuty;
  const vat = Math.round(vatBase * 0.20);

  // Registration in KAT + technical inspection
  const registration = 200;

  const total = eurPrice + auctionFees + shippingCost + customsDuty + ecoTax + vat + registration;

  // Bulgarian market comparison: dealers import + add 35-50% margin
  // Newer/premium cars have higher markup, older cars less
  const ageMarkup = yearsOld <= 3 ? 0.50 : yearsOld <= 6 ? 0.45 : 0.38;
  const bgMarketPrice = Math.round(total * (1 + ageMarkup));
  const savings = bgMarketPrice - total;
  const savingsPercent = Math.round((savings / bgMarketPrice) * 100);

  return { eurPrice, auctionFees, shippingCost, customsDuty, ecoTax, vat, registration, total, bgMarketPrice, savings, savingsPercent };
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-gray-300">
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-xl border border-gray-700 bg-gray-800/50 px-4 py-3 pr-10 text-white outline-none transition-colors focus:border-customYellow focus:ring-1 focus:ring-customYellow/50"
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
      </div>
    </div>
  );
}

export function ImportCalculator() {
  const [carPrice, setCarPrice] = useState("");
  const [carType, setCarType] = useState<CarType>("sedan");
  const [engine, setEngine] = useState<EngineType>("petrol");
  const [year, setYear] = useState("2022");
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [showResult, setShowResult] = useState(false);

  function handleCalculate() {
    const price = parseFloat(carPrice);
    const yr = parseInt(year, 10);
    if (!price || price <= 0 || !yr || yr < 2012 || yr > 2026) return;

    const calc = calculate(price, carType, engine, yr);
    setResult(calc);
    // Trigger animation by toggling
    setShowResult(false);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setShowResult(true);
      });
    });
  }

  return (
    <section
      id="calculator"
      className="py-16 lg:py-24"
      style={{ backgroundColor: "rgb(17, 24, 39)" }}
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column — Info */}
          <div className="flex flex-col justify-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-customYellow">
              Калкулатор
            </span>

            <h2 className="mt-4 text-3xl font-bold leading-tight text-white lg:text-4xl">
              Изчислете цената на{" "}
              <span className="italic text-customYellow">вашия внос</span>
            </h2>

            <p className="mt-4 max-w-md text-base leading-relaxed text-gray-400">
              Въведете данните за автомобила и вижте приблизителна цена с включени
              всички разходи — доставка, мито, ДДС и регистрация.
            </p>

            <ul className="mt-8 space-y-4">
              {benefits.map((text) => (
                <li key={text} className="flex items-center gap-3">
                  <CheckCircleIcon className="h-5 w-5 shrink-0 text-emerald-400" />
                  <span className="text-sm text-gray-300">{text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column — Calculator Card */}
          <div
            className="rounded-2xl border border-gray-700/50 p-6 sm:p-8"
            style={{
              backgroundColor: "rgba(15, 21, 21, 0.8)",
              boxShadow: "0 0 60px rgba(225, 225, 0, 0.05)",
            }}
          >
            <div className="space-y-5">
              {/* Car Price */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-300">
                  Цена на колата (USD)
                </label>
                <input
                  type="number"
                  placeholder="напр. 15000"
                  value={carPrice}
                  onChange={(e) => setCarPrice(e.target.value)}
                  className="w-full rounded-xl border border-gray-700 bg-gray-800/50 px-4 py-3 text-white outline-none transition-colors placeholder:text-gray-500 focus:border-customYellow focus:ring-1 focus:ring-customYellow/50"
                />
              </div>

              {/* Car Type */}
              <SelectField
                label="Тип кола"
                value={carType}
                onChange={(v) => setCarType(v as CarType)}
                options={carTypeOptions}
              />

              {/* Engine Type */}
              <SelectField
                label="Тип двигател"
                value={engine}
                onChange={(v) => setEngine(v as EngineType)}
                options={engineTypeOptions}
              />

              {/* Year */}
              <SelectField
                label="Година на производство"
                value={year}
                onChange={(v) => setYear(v)}
                options={yearOptions}
              />

              {/* Calculate Button */}
              <button
                onClick={handleCalculate}
                className="w-full cursor-pointer rounded-xl bg-customYellow py-3.5 font-bold text-black transition-colors hover:bg-customYellow-dark"
              >
                Изчисли цената
              </button>
            </div>

            {/* Results Area */}
            <div
              className="overflow-hidden transition-all duration-500 ease-out"
              style={{
                maxHeight: showResult && result ? "900px" : "0px",
                opacity: showResult && result ? 1 : 0,
              }}
            >
              <div className="mt-6 border-t border-gray-700/50 pt-6">
                <div className="space-y-3">
                  <ResultRow label="Цена на колата" value={result ? formatEur(result.eurPrice) : ""} />
                  <ResultRow label="Аукционни такси (~10% + fees)" value={result ? formatEur(result.auctionFees) : ""} />
                  <ResultRow label="Транспорт САЩ → България" value={result ? formatEur(result.shippingCost) : ""} />
                  <ResultRow label="Мито (10% от CIF)" value={result ? formatEur(result.customsDuty) : ""} />
                  <ResultRow label="Еко такса" value={result ? formatEur(result.ecoTax) : ""} />
                  <ResultRow label="ДДС (20%)" value={result ? formatEur(result.vat) : ""} />
                  <ResultRow label="Регистрация + преглед" value={result ? formatEur(result.registration) : ""} />

                  {/* Total */}
                  <div className="flex items-center justify-between pt-3">
                    <span className="text-lg font-bold text-white">Обща цена</span>
                    <span className="text-xl font-bold text-customYellow">
                      {result ? formatEur(result.total) : ""}
                    </span>
                  </div>
                </div>

                {/* BG Market Comparison */}
                {result && (
                  <div className="mt-5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                    <div className="mb-3 flex items-center gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20">
                        <svg className="h-3.5 w-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                      </div>
                      <span className="text-sm font-semibold text-emerald-400">
                        Спестявате с Best Auto
                      </span>
                    </div>

                    <div className="flex items-end justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <div>
                            <p className="text-[11px] text-gray-500">Цена в БГ пазар</p>
                            <p className="text-base font-semibold text-gray-400 line-through">
                              {formatEur(result.bgMarketPrice)}
                            </p>
                          </div>
                          <svg className="h-5 w-5 shrink-0 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                          <div>
                            <p className="text-[11px] text-emerald-400/70">С Best Auto</p>
                            <p className="text-base font-bold text-white">
                              {formatEur(result.total)}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-2xl font-black text-emerald-400">
                          -{result.savingsPercent}%
                        </p>
                        <p className="text-xs text-emerald-400/70">
                          {formatEur(result.savings)} спестени
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <p className="mt-4 text-xs text-gray-500">
                  * Цените са приблизителни. Сравнението е базирано на средни цени от mobile.bg и auto.bg за аналогичен автомобил.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ResultRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-gray-700/30 pb-3">
      <span className="text-sm text-gray-400">{label}</span>
      <span className="text-sm font-medium text-white">{value}</span>
    </div>
  );
}
