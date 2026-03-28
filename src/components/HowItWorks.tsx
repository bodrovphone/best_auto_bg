"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ComponentType, type SVGProps } from "react";
import {
  PhoneIcon,
  GavelIcon,
  TruckIcon,
  FileTextIcon,
  PackageIcon,
} from "@/components/icons";

/* ------------------------------------------------------------------ */
/*  Translations                                                       */
/* ------------------------------------------------------------------ */

const tx = {
  badge:        { bg: "Как работи",     ru: "Как это работает" },
  headingPre:   { bg: "От търсене до",  ru: "От поиска до" },
  headingHL:    { bg: "вашата врата",    ru: "вашей двери" },
  subtext:      { bg: "Пет стъпки. Един партньор. Ние се грижим за всичко.", ru: "Пять шагов. Один партнер. Мы позаботимся обо всем." },
} as const;

type TxKey = keyof typeof tx;
function tr(key: TxKey, lang: string): string {
  return tx[key][lang as "bg" | "ru"] ?? tx[key].bg;
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface Step {
  number: number;
  title: { bg: string; ru: string };
  description: { bg: string; ru: string };
  duration: { bg: string; ru: string };
  bullets: { bg: string; ru: string }[];
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  imageSrc?: string;
  imageAlt: { bg: string; ru: string };
}

const steps: Step[] = [
  {
    number: 1,
    title:       { bg: "Свържете се с нас",   ru: "Свяжитесь с нами" },
    description: { bg: "Разкажете ни какъв автомобил търсите — марка, модел, бюджет. Консултацията е напълно безплатна.", ru: "Расскажите, какой автомобиль ищете — марка, модель, бюджет. Консультация полностью бесплатна." },
    duration:    { bg: "Безплатна консултация", ru: "Бесплатная консультация" },
    bullets: [
      { bg: "Обсъждаме бюджет и желания",           ru: "Обсуждаем бюджет и пожелания" },
      { bg: "Показваме примери от текущи аукциони",  ru: "Показываем примеры с текущих аукционов" },
      { bg: "Договаряме условия без скрити такси",   ru: "Согласовываем условия без скрытых комиссий" },
    ],
    icon: PhoneIcon,
    imageSrc: "/assets/images/pexels-pixabay-164634.jpg",
    imageAlt: { bg: "Свържете се с нас", ru: "Свяжитесь с нами" },
  },
  {
    number: 2,
    title:       { bg: "Наддаваме и печелим",  ru: "Делаем ставку и выигрываем" },
    description: { bg: "Участваме в търга от ваше име на Copart, IAAI или Manheim с предварително договорен таван.", ru: "Участвуем в торгах от вашего имени на Copart, IAAI или Manheim с заранее согласованным лимитом." },
    duration:    { bg: "В деня на търга", ru: "В день торгов" },
    bullets: [
      { bg: "Следим наддаването в реално време",      ru: "Следим за торгами в реальном времени" },
      { bg: "Работим само с договорен лимит",          ru: "Работаем только в рамках согласованного лимита" },
      { bg: "Незабавно уведомление при спечелване",    ru: "Мгновенное уведомление при выигрыше" },
    ],
    icon: GavelIcon,
    imageSrc: "/assets/images/pexels-shkrabaanthony-7144199.jpg",
    imageAlt: { bg: "Наддаване и покупка", ru: "Ставка и покупка" },
  },
  {
    number: 3,
    title:       { bg: "Доставка от САЩ",      ru: "Доставка из США" },
    description: { bg: "Организираме RoRo морски транспорт директно от американското пристанище до Варна или Бургас.", ru: "Организуем морскую перевозку RoRo напрямую из американского порта в Варну или Бургас." },
    duration:    { bg: "5–7 седмици", ru: "5–7 недель" },
    bullets: [
      { bg: "RoRo товарен транспорт",               ru: "Грузовая перевозка RoRo" },
      { bg: "Онлайн проследяване на пратката",      ru: "Онлайн-отслеживание груза" },
      { bg: "Застраховка по време на транзит",       ru: "Страховка на время транзита" },
    ],
    icon: TruckIcon,
    imageSrc: "/assets/images/shipping2.jpg",
    imageAlt: { bg: "Доставка от САЩ", ru: "Доставка из США" },
  },
  {
    number: 4,
    title:       { bg: "Митница и регистрация",   ru: "Таможня и регистрация" },
    description: { bg: "Обработваме цялата митническа документация, заплащаме мито и ДДС, регистрираме в КАТ.", ru: "Оформляем всю таможенную документацию, оплачиваем пошлину и НДС, регистрируем в КАТ." },
    duration:    { bg: "1–2 седмици", ru: "1–2 недели" },
    bullets: [
      { bg: "Мито и ДДС изцяло от ваше име",       ru: "Пошлина и НДС полностью от вашего имени" },
      { bg: "Пълна митническа документация",        ru: "Полная таможенная документация" },
      { bg: "Регистрация и табели в КАТ",           ru: "Регистрация и номера в КАТ" },
    ],
    icon: FileTextIcon,
    imageSrc: "/assets/images/pexels-redyar-rzgar-1257188192-33889800.jpg",
    imageAlt: { bg: "Митница и регистрация", ru: "Таможня и регистрация" },
  },
  {
    number: 5,
    title:       { bg: "Колата е ваша!",           ru: "Автомобиль ваш!" },
    description: { bg: "Доставяме готовия автомобил до вашия адрес в цяла България — с всички документи на ръка.", ru: "Доставляем готовый автомобиль по вашему адресу в любую точку Болгарии — со всеми документами на руках." },
    duration:    { bg: "Доставка до адрес", ru: "Доставка до адреса" },
    bullets: [
      { bg: "Доставка в цяла България",                      ru: "Доставка по всей Болгарии" },
      { bg: "Пълен комплект документи",                      ru: "Полный комплект документов" },
      { bg: "Готов за шофиране от деня на получаване",       ru: "Готов к езде с момента получения" },
    ],
    icon: PackageIcon,
    imageSrc: "/assets/images/pexels-gustavo-fring-4895449.jpg",
    imageAlt: { bg: "Доставка до вас", ru: "Доставка к вам" },
  },
];

/* ------------------------------------------------------------------ */
/*  Road paths                                                         */
/* ------------------------------------------------------------------ */

const DESKTOP_ROAD_PATH =
  "M 500 40 C 520 150, 560 250, 550 360 C 540 470, 470 530, 460 640 C 450 750, 470 820, 500 930 C 530 1040, 560 1100, 540 1210 C 520 1320, 470 1370, 480 1440 C 490 1500, 500 1540, 500 1560";

const MOBILE_ROAD_PATH = "M 30 0 L 30 1000";

/* ------------------------------------------------------------------ */
/*  Milestone positions                                                */
/* ------------------------------------------------------------------ */

const desktopPositions: { cx: number; cy: number; cardSide: "left" | "right" }[] = [
  { cx: 500, cy: 40,   cardSide: "left" },
  { cx: 550, cy: 360,  cardSide: "right" },
  { cx: 460, cy: 640,  cardSide: "left" },
  { cx: 500, cy: 930,  cardSide: "right" },
  { cx: 480, cy: 1220, cardSide: "left" },
];

const mobilePositions: { cy: number }[] = [
  { cy: 0 }, { cy: 250 }, { cy: 500 }, { cy: 750 }, { cy: 1000 },
];

/* ------------------------------------------------------------------ */
/*  Terrain dots                                                       */
/* ------------------------------------------------------------------ */

const terrainDots = [
  { x: 200, y: 120, r: 2 }, { x: 600, y: 90, r: 1.5 }, { x: 400, y: 300, r: 2.5 },
  { x: 750, y: 450, r: 1.5 }, { x: 250, y: 550, r: 2 }, { x: 600, y: 700, r: 1.5 },
  { x: 350, y: 800, r: 2 }, { x: 800, y: 900, r: 1.5 }, { x: 450, y: 1050, r: 2 },
  { x: 100, y: 1150, r: 1.5 }, { x: 680, y: 1280, r: 2 }, { x: 300, y: 1400, r: 1.5 },
  { x: 900, y: 200, r: 1 }, { x: 50, y: 1000, r: 1 }, { x: 550, y: 1500, r: 1.5 },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function getCarTransform(path: SVGPathElement, fraction: number) {
  const len = path.getTotalLength();
  const at = fraction * len;
  const pt = path.getPointAtLength(at);
  const eps = 2;
  const p1 = path.getPointAtLength(Math.max(0, at - eps));
  const p2 = path.getPointAtLength(Math.min(len, at + eps));
  const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x) * (180 / Math.PI);
  return { x: pt.x, y: pt.y, angle };
}

/** Find the fraction (0–1) along the path closest to (cx, cy) */
function findFractionOnPath(path: SVGPathElement, cx: number, cy: number): number {
  const len = path.getTotalLength();
  let bestT = 0;
  let bestDist = Infinity;
  const samples = 500;
  for (let i = 0; i <= samples; i++) {
    const t = i / samples;
    const pt = path.getPointAtLength(t * len);
    const dist = (pt.x - cx) ** 2 + (pt.y - cy) ** 2;
    if (dist < bestDist) {
      bestDist = dist;
      bestT = t;
    }
  }
  return bestT;
}

/* ------------------------------------------------------------------ */
/*  Localized text helper                                              */
/* ------------------------------------------------------------------ */

function loc(obj: { bg: string; ru: string }, lang: string): string {
  return obj[lang as "bg" | "ru"] ?? obj.bg;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function HowItWorks({ lang = "bg" }: { lang?: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const desktopPathRef = useRef<SVGPathElement>(null);
  const mobilePathRef = useRef<SVGPathElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mobileStepRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [visibleSteps, setVisibleSteps] = useState<Set<number>>(new Set());
  const [desktopCar, setDesktopCar] = useState<{ x: number; y: number; angle: number } | null>(null);
  const [mobileCar, setMobileCar] = useState<{ x: number; y: number; angle: number } | null>(null);

  /** Precomputed fractions for each milestone on the path */
  const desktopFractions = useRef<number[]>([]);
  const mobileFractions = useRef<number[]>([]);

  /** Animation state */
  const currentFrac = useRef(0);
  const targetFrac = useRef(0);
  const mobileFrac = useRef(0);
  const mobileTarget = useRef(0);
  const rafId = useRef(0);

  /* --- Precompute milestone fractions on mount --- */
  useEffect(() => {
    const dp = desktopPathRef.current;
    const mp = mobilePathRef.current;
    if (dp) {
      desktopFractions.current = desktopPositions.map((p) =>
        findFractionOnPath(dp, p.cx, p.cy)
      );
    }
    if (mp) {
      mobileFractions.current = mobilePositions.map((p) =>
        findFractionOnPath(mp, 30, p.cy)
      );
    }
  }, []);

  /* --- IntersectionObserver for step reveal --- */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute("data-step-index"));
            if (!isNaN(idx)) {
              setVisibleSteps((prev) => new Set(prev).add(idx));
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    [...stepRefs.current, ...mobileStepRefs.current].forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  /* --- When visible steps change, update target fraction --- */
  useEffect(() => {
    const highest = Math.max(-1, ...Array.from(visibleSteps));

    if (highest >= 0 && desktopFractions.current.length > 0) {
      targetFrac.current = desktopFractions.current[highest] ?? 0;
    }
    if (highest >= 0 && mobileFractions.current.length > 0) {
      mobileTarget.current = mobileFractions.current[highest] ?? 0;
    }
  }, [visibleSteps]);

  /* --- rAF animation loop: lerp fraction toward target --- */
  useEffect(() => {
    const LERP = 0.035; // ease factor — lower = smoother/slower

    const tick = () => {
      // Desktop
      const dDiff = targetFrac.current - currentFrac.current;
      if (Math.abs(dDiff) > 0.0005) {
        currentFrac.current += dDiff * LERP;
      } else {
        currentFrac.current = targetFrac.current;
      }

      if (desktopPathRef.current) {
        setDesktopCar(getCarTransform(desktopPathRef.current, currentFrac.current));

        // Update trail dashoffset
        const len = desktopPathRef.current.getTotalLength();
        document.querySelectorAll<SVGPathElement>(".dt-trail").forEach((el) => {
          el.style.strokeDasharray = `${len}`;
          el.style.strokeDashoffset = `${len * (1 - currentFrac.current)}`;
        });
      }

      // Mobile
      const mDiff = mobileTarget.current - mobileFrac.current;
      if (Math.abs(mDiff) > 0.0005) {
        mobileFrac.current += mDiff * LERP;
      } else {
        mobileFrac.current = mobileTarget.current;
      }

      if (mobilePathRef.current) {
        setMobileCar(getCarTransform(mobilePathRef.current, mobileFrac.current));

        const mLen = mobilePathRef.current.getTotalLength();
        document.querySelectorAll<SVGPathElement>(".mb-trail").forEach((el) => {
          el.style.strokeDasharray = `${mLen}`;
          el.style.strokeDashoffset = `${mLen * (1 - mobileFrac.current)}`;
        });
      }

      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId.current);
  }, []);

  const CAR_W = 55;
  const CAR_H = 27;

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative py-20 lg:py-28 overflow-hidden"
      style={{ backgroundColor: "#0F1515" }}
    >
      <style>{`
        .step-node {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.7s ease-out, transform 0.7s ease-out;
        }
        .step-node.step-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .milestone-circle {
          transform: scale(0);
          transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .step-visible .milestone-circle {
          transform: scale(1);
        }
        .step-card {
          backdrop-filter: blur(12px);
          transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;
        }
        .step-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 32px rgba(225, 225, 0, 0.08);
          border-color: rgba(225, 225, 0, 0.3);
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.35; }
        }
        .terrain-dot {
          animation: pulse-dot 4s ease-in-out infinite;
        }
      `}</style>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <div className="mb-16 lg:mb-24 text-center">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] mb-4" style={{ color: "#E1E100" }}>
            {tr("badge", lang)}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            {tr("headingPre", lang)}{" "}
            <span className="italic" style={{ color: "#E1E100" }}>{tr("headingHL", lang)}</span>
          </h2>
          <p className="mt-5 text-gray-400 max-w-xl mx-auto text-base lg:text-lg leading-relaxed">
            {tr("subtext", lang)}
          </p>
        </div>

        {/* ============ DESKTOP ============ */}
        <div className="hidden lg:block relative" style={{ height: "1600px" }}>
          <svg viewBox="0 0 1000 1600" fill="none" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
            {terrainDots.map((dot, i) => (
              <circle key={i} cx={dot.x} cy={dot.y} r={dot.r} fill="#3a4a4a" className="terrain-dot" style={{ animationDelay: `${i * 0.3}s` }} />
            ))}

            {/* Road base */}
            <path d={DESKTOP_ROAD_PATH} stroke="#1a2626" strokeWidth="10" strokeLinecap="round" fill="none" />

            {/* Yellow trail */}
            <path d={DESKTOP_ROAD_PATH} stroke="#E1E100" strokeWidth="10" strokeLinecap="round" fill="none" opacity="0.35" className="dt-trail" />

            {/* Glow */}
            <path d={DESKTOP_ROAD_PATH} stroke="#E1E100" strokeWidth="22" strokeLinecap="round" fill="none" opacity="0.08" className="dt-trail" style={{ filter: "blur(12px)" }} />

            {/* Center dashes */}
            <path d={DESKTOP_ROAD_PATH} stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeLinecap="round" strokeDasharray="12 8" fill="none" />

            {/* Hidden path for measurement */}
            <path ref={desktopPathRef} d={DESKTOP_ROAD_PATH} fill="none" stroke="transparent" strokeWidth="1" />

            {/* Milestone numbered circles on the road */}
            {desktopPositions.map((pos, i) => (
              <g key={i} style={{ transition: "opacity 0.6s ease-out, transform 0.5s cubic-bezier(0.34,1.56,0.64,1)", transitionDelay: `${i * 0.15}s`, opacity: visibleSteps.has(i) ? 1 : 0, transformOrigin: `${pos.cx}px ${pos.cy}px`, transform: visibleSteps.has(i) ? "scale(1)" : "scale(0)" }}>
                <circle cx={pos.cx} cy={pos.cy} r="22" fill="#0F1515" stroke="#E1E100" strokeWidth="2" />
                <text x={pos.cx} y={pos.cy} textAnchor="middle" dominantBaseline="central" fill="#E1E100" fontSize="14" fontWeight="bold" fontFamily="inherit">{i + 1}</text>
              </g>
            ))}

            {/* Car */}
            {desktopCar && (
              <g transform={`translate(${desktopCar.x}, ${desktopCar.y}) rotate(${desktopCar.angle})`}>
                <ellipse cx="0" cy="2" rx={CAR_W * 0.45} ry="8" fill="#E1E100" opacity="0.15" style={{ filter: "blur(6px)" }} />
                <image href="/images/steps/car-moving.png" width={CAR_W} height={CAR_H} x={-CAR_W / 2} y={-CAR_H / 2} />
              </g>
            )}
          </svg>

          {/* Step cards */}
          {steps.map((step, i) => {
            const pos = desktopPositions[i];
            const topPct = (pos.cy / 1600) * 100;
            const isCardLeft = pos.cardSide === "left";

            return (
              <div
                key={step.number}
                ref={(el) => { stepRefs.current[i] = el; }}
                data-step-index={i}
                className={`step-node absolute ${visibleSteps.has(i) ? "step-visible" : ""}`}
                style={{
                  top: `${topPct}%`,
                  ...(isCardLeft ? { left: 0, right: "58%" } : { left: "58%", right: 0 }),
                  transitionDelay: `${i * 0.15}s`,
                }}
              >
                <div className="step-card rounded-2xl border overflow-hidden" style={{ backgroundColor: "rgba(20, 30, 30, 0.85)", borderColor: "rgba(255,255,255,0.06)" }}>
                  {/* Image */}
                  {step.imageSrc ? (
                    <div className="w-full h-[160px] relative overflow-hidden">
                      <Image src={step.imageSrc} alt={loc(step.imageAlt, lang)} fill className="object-cover" sizes="380px" />
                      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 50%, rgba(20,30,30,0.9) 100%)" }} />
                    </div>
                  ) : (
                    <div className="w-full h-[160px] flex items-center justify-center" style={{ backgroundColor: "rgba(225,225,0,0.04)" }}>
                      <step.icon className="w-14 h-14" style={{ color: "#E1E100", opacity: 0.3 }} />
                    </div>
                  )}
                  {/* Content */}
                  <div className="px-5 py-5">
                    <div className="flex items-center gap-2.5 mb-2">
                      <step.icon className="w-5 h-5 shrink-0" style={{ color: "#E1E100" }} />
                      <h3 className="text-white font-semibold text-base">{loc(step.title, lang)}</h3>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed mb-4">{loc(step.description, lang)}</p>
                    <ul className="space-y-1.5">
                      {step.bullets.map((b, bi) => (
                        <li key={bi} className="flex items-start gap-2 text-xs text-gray-400">
                          <span className="mt-0.5 shrink-0 w-3.5 h-3.5 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgba(225,225,0,0.12)" }}>
                            <span style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: "#E1E100", display: "block" }} />
                          </span>
                          {loc(b, lang)}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 pt-3 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                      <span className="text-xs font-medium" style={{ color: "#E1E100", opacity: 0.7 }}>{loc(step.duration, lang)}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ============ MOBILE ============ */}
        <div className="lg:hidden relative" style={{ minHeight: "1000px" }}>
          <svg viewBox="0 0 60 1000" fill="none" className="absolute left-0 top-0 w-[60px] h-full" preserveAspectRatio="none">
            {/* Road base */}
            <path d={MOBILE_ROAD_PATH} stroke="#1a2626" strokeWidth="6" strokeLinecap="round" fill="none" />
            {/* Yellow trail */}
            <path d={MOBILE_ROAD_PATH} stroke="#E1E100" strokeWidth="6" strokeLinecap="round" fill="none" opacity="0.3" className="mb-trail" />
            {/* Glow */}
            <path d={MOBILE_ROAD_PATH} stroke="#E1E100" strokeWidth="14" strokeLinecap="round" fill="none" className="mb-trail" opacity="0.06" style={{ filter: "blur(8px)" }} />
            {/* Center dashes */}
            <path d={MOBILE_ROAD_PATH} stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="8 6" fill="none" />
            {/* Hidden measurement path */}
            <path ref={mobilePathRef} d={MOBILE_ROAD_PATH} fill="none" stroke="transparent" strokeWidth="1" />
          </svg>
          {/* Car — rendered as HTML to avoid SVG stretch distortion */}
          {mobileCar && (
            <div
              className="absolute z-10 pointer-events-none"
              style={{
                left: "16px",
                top: `${(mobileCar.y / 1000) * 100}%`,
                transform: "translate(-50%, -50%) rotate(90deg)",
              }}
            >
              <div className="absolute inset-0 rounded-full" style={{ boxShadow: "0 0 12px 4px rgba(225,225,0,0.15)" }} />
              <Image src="/images/steps/car-moving.png" alt="" width={32} height={16} className="block" />
            </div>
          )}

          <div className="relative flex flex-col" style={{ gap: "56px" }}>
            {steps.map((step, i) => (
              <div
                key={step.number}
                ref={(el) => { mobileStepRefs.current[i] = el; }}
                data-step-index={i}
                className={`step-node flex items-start gap-4 pl-14 pr-2 ${visibleSteps.has(i) ? "step-visible" : ""}`}
                style={{ transitionDelay: `${i * 0.12}s` }}
              >
                <div className="milestone-circle absolute w-10 h-10 rounded-full border-2 flex items-center justify-center text-xs font-bold z-10" style={{ left: "10px", borderColor: "#E1E100", backgroundColor: "#0F1515", color: "#E1E100", transitionDelay: `${i * 0.12 + 0.1}s` }}>
                  {step.number}
                </div>
                <div className="step-card rounded-xl border overflow-hidden flex-1" style={{ backgroundColor: "rgba(20, 30, 30, 0.85)", borderColor: "rgba(255,255,255,0.06)" }}>
                  {step.imageSrc ? (
                    <div className="w-full h-[130px] relative overflow-hidden">
                      <Image src={step.imageSrc} alt={loc(step.imageAlt, lang)} fill className="object-cover" sizes="(max-width: 1024px) 80vw, 400px" />
                      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 50%, rgba(20,30,30,0.9) 100%)" }} />
                    </div>
                  ) : (
                    <div className="w-full h-[130px] flex items-center justify-center" style={{ backgroundColor: "rgba(225,225,0,0.04)" }}>
                      <step.icon className="w-12 h-12" style={{ color: "#E1E100", opacity: 0.3 }} />
                    </div>
                  )}
                  <div className="px-4 py-4">
                    <div className="flex items-center gap-2 mb-2">
                      <step.icon className="w-4 h-4 shrink-0" style={{ color: "#E1E100" }} />
                      <h3 className="text-white font-semibold text-sm">{loc(step.title, lang)}</h3>
                    </div>
                    <p className="text-gray-400 text-xs leading-relaxed mb-3">{loc(step.description, lang)}</p>
                    <ul className="space-y-1.5">
                      {step.bullets.map((b, bi) => (
                        <li key={bi} className="flex items-start gap-2 text-xs text-gray-500">
                          <span className="mt-0.5 shrink-0 w-3 h-3 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgba(225,225,0,0.1)" }}>
                            <span style={{ width: 4, height: 4, borderRadius: "50%", backgroundColor: "#E1E100", display: "block" }} />
                          </span>
                          {loc(b, lang)}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-3 pt-2.5 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                      <span className="text-xs font-medium" style={{ color: "#E1E100", opacity: 0.7 }}>{loc(step.duration, lang)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
