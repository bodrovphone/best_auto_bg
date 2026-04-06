import type { Metadata } from "next";
import Image from "next/image";
import { ViberIcon, TelegramIcon, CheckCircleIcon } from "@/components/icons";

const inlinePhotos = [
  { src: "/assets/images/gallery/02.jpg", width: 728,  height: 1280 },
  { src: "/assets/images/gallery/06.jpg", width: 731,  height: 1280 },
  { src: "/assets/images/gallery/13.jpg", width: 752,  height: 1280 },
  { src: "/assets/images/gallery/16.jpg", width: 746,  height: 1280 },
  { src: "/assets/images/gallery/18.jpg", width: 752,  height: 1280 },
  { src: "/assets/images/gallery/21.jpg", width: 1080, height: 1237 },
];

const expertise = [
  "Над 5 години опит с американски аукциони",
  "Лично присъствие на Copart, IAAI и Manheim",
  "Задълбочена проверка на всеки автомобил преди наддаване",
  "Познания по американско и европейско митническо законодателство",
  "Доверени партньори за RoRo доставка до пристанище Варна",
  "Пълна прозрачност — клиентът вижда всяка фактура",
];

const services = [
  {
    title: "Намиране на автомобил",
    desc: "Проучване на стотици лотове всяка седмица. Избираме само автомобили с чист документ и минимални щети.",
  },
  {
    title: "Наддаване на аукцион",
    desc: "Участваме от ваше име на Copart, IAAI или Manheim. Следим наддаването в реално време и не надплащаме.",
  },
  {
    title: "Транспорт от САЩ",
    desc: "Организираме RoRo товарен транспорт директно до пристанище Варна или Бургас. Средно 5–6 седмици.",
  },
  {
    title: "Митническо оформяне",
    desc: "Обработваме цялата митническа документация, заплащаме мито и ДДС от ваше име. Нула изненади.",
  },
  {
    title: "Регистрация в КАТ",
    desc: "Регистрираме автомобила в КАТ и го предаваме с всички документи, готов за шофиране.",
  },
];

type Props = { params: Promise<{ lang: string }> };

const meta = {
  bg: {
    title: "За нас | Best Auto — Внос на автомобили от САЩ",
    description: "Внос на коли от САЩ — аукцион, доставка, мито, ДДС и регистрация. Пълно обслужване от Best Auto.",
  },
  ru: {
    title: "О нас | Best Auto — Импорт автомобилей из США",
    description: "Импорт авто из США — аукцион, доставка, таможня, НДС и регистрация. Полный сервис от Best Auto.",
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
      locale: lang === "ru" ? "ru_RU" : "bg_BG",
      type: "website",
      siteName: "Best Auto",
    },
    twitter: {
      card: "summary_large_image",
      title: m.title,
      description: m.description,
    },
    alternates: {
      canonical: `/${lang}/about`,
      languages: { bg: "/bg/about", ru: "/ru/about" },
    },
  };
}

export default async function AboutPage({ params }: Props) {
  const { lang } = await params;
  return (
    <div className="min-h-screen bg-[#0F1515]">
      {/* Hero */}
      <div className="relative pt-32 pb-16 lg:pt-40">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-customYellow">
            За нас
          </span>
          <h1 className="mt-3 text-4xl font-bold leading-tight text-white lg:text-5xl">
            Човекът зад<br />
            <span className="text-customYellow">Best Auto</span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-gray-400">
            Не сме агенция с кол центрове и скрити комисиони. Best Auto е един
            човек с дълбока страст към автомобилите и доказан процес, изграден
            върху стотици успешни вноса.
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="mx-auto max-w-3xl px-4 pb-24 space-y-20">

        {/* Story + first photo */}
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="space-y-5 text-gray-300 leading-relaxed">
            <h2 className="text-2xl font-bold text-white">Как започна всичко</h2>
            <p>
              Всичко започна с лична нужда — исках да намеря добър автомобил на
              разумна цена. Огледах се в България и разбрах, че местният пазар
              е надценен с 35–50% спрямо това, което се предлага на американските
              аукциони.
            </p>
            <p>
              Проучих процеса сам, закупих първата кола, мина митница,
              регистрира се. Работеше. После втора, трета — за приятели. С времето
              се изгради и репутация. Днес Best Auto е официалната форма на
              услугата, която вече стотици хора са се доверили.
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl">
            <Image
              src={inlinePhotos[0].src}
              alt="Автомобил от аукцион"
              width={inlinePhotos[0].width}
              height={inlinePhotos[0].height}
              className="w-full object-cover"
            />
          </div>
        </div>

        {/* Expertise */}
        <div className="rounded-2xl border border-gray-700/50 bg-gray-900/40 p-8">
          <h2 className="mb-6 text-2xl font-bold text-white">Експертиза</h2>
          <ul className="space-y-4">
            {expertise.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircleIcon className="mt-0.5 h-5 w-5 shrink-0 text-customYellow" />
                <span className="text-gray-300">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Photo pair */}
        <div className="grid grid-cols-2 gap-4">
          {inlinePhotos.slice(1, 3).map((p, i) => (
            <div key={i} className="overflow-hidden rounded-2xl">
              <Image
                src={p.src}
                alt="Аукцион"
                width={p.width}
                height={p.height}
                className="w-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Services */}
        <div>
          <h2 className="mb-8 text-2xl font-bold text-white">Какво включва услугата</h2>
          <div className="space-y-6">
            {services.map((s, i) => (
              <div key={s.title} className="flex gap-5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-customYellow/10 font-bold text-customYellow text-sm">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-bold text-white">{s.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-gray-400">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Photo trio */}
        <div className="grid grid-cols-3 gap-4">
          {inlinePhotos.slice(3).map((p, i) => (
            <div key={i} className="overflow-hidden rounded-xl">
              <Image
                src={p.src}
                alt="Аукцион"
                width={p.width}
                height={p.height}
                className="w-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Philosophy */}
        <div className="space-y-5 border-l-2 border-customYellow/40 pl-6 text-gray-300 leading-relaxed">
          <h2 className="text-2xl font-bold text-white">Философия</h2>
          <p>
            Работя само с автомобили с чист документ (Clean Title) и минимални
            щети. Не купувам коли само за да спечеля комисиона — купувам такива,
            каквито бих взел за себе си или за семейството си.
          </p>
          <p>
            Клиентът получава пълен достъп до всяка стъпка от процеса —
            снимки от аукциона, товарителница, митнически декларации,
            фактури. Никакви черни кутии, никакви изненади в края.
          </p>
          <p>
            Над 900 доставени автомобила. Нито един клиент не е останал без
            своята кола.
          </p>
        </div>

        {/* Company info */}
        <div className="rounded-2xl border border-gray-700/50 bg-gray-900/40 p-8">
          <h2 className="mb-6 text-2xl font-bold text-white">Фирмена информация</h2>
          <dl className="grid gap-4 sm:grid-cols-2">
            {[
              ["Наименование", '„БЕСТ АВТО" ЕООД / "BEST AUTO" LTD'],
              ["ЕИК", "208075843"],
              ["ДДС номер", "BG208075843"],
              ["Управител", "Олексій Стоянов"],
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="text-xs uppercase tracking-wider text-gray-500">{label}</dt>
                <dd className="mt-1 text-sm text-gray-300">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* CTA */}
        <div className="rounded-2xl border border-customYellow/20 bg-customYellow/5 p-8 text-center">
          <h2 className="text-2xl font-bold text-white">
            Готови да започнем?
          </h2>
          <p className="mt-2 text-gray-400">
            Пишете ни — консултацията е безплатна.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href="viber://chat?number=%2B359877575257"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-6 py-3 font-semibold text-white transition-opacity hover:opacity-90"
            >
              <ViberIcon className="h-5 w-5" />
              Пишете ни във Viber
            </a>
            <a
              href="https://t.me/+359877575257"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-500 px-6 py-3 font-semibold text-white transition-opacity hover:opacity-90"
            >
              <TelegramIcon className="h-5 w-5" />
              Пишете ни в Telegram
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
