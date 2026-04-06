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

const content = {
  bg: {
    badge: "За нас",
    title1: "Човекът зад",
    title2: "Best Auto",
    intro:
      "Не сме агенция с кол центрове и скрити комисиони. Best Auto е един човек с дълбока страст към автомобилите и доказан процес, изграден върху стотици успешни вноса.",
    storyTitle: "Как започна всичко",
    story1:
      "Всичко започна с лична нужда — исках да намеря добър автомобил на разумна цена. Огледах се в България и разбрах, че местният пазар е надценен с 35–50% спрямо това, което се предлага на американските аукциони.",
    story2:
      "Проучих процеса сам, закупих първата кола, мина митница, регистрира се. Работеше. После втора, трета — за приятели. С времето се изгради и репутация. Днес Best Auto е официалната форма на услугата, която вече стотици хора са се доверили.",
    expertiseTitle: "Експертиза",
    expertise: [
      "Над 5 години опит с американски аукциони",
      "Лично присъствие на Copart, IAAI и Manheim",
      "Задълбочена проверка на всеки автомобил преди наддаване",
      "Познания по американско и европейско митническо законодателство",
      "Доверени партньори за RoRo доставка до пристанище Варна",
      "Пълна прозрачност — клиентът вижда всяка фактура",
    ],
    servicesTitle: "Какво включва услугата",
    services: [
      { title: "Намиране на автомобил", desc: "Проучване на стотици лотове всяка седмица. Избираме само автомобили с чист документ и минимални щети." },
      { title: "Наддаване на аукцион", desc: "Участваме от ваше име на Copart, IAAI или Manheim. Следим наддаването в реално време и не надплащаме." },
      { title: "Транспорт от САЩ", desc: "Организираме RoRo товарен транспорт директно до пристанище Варна или Бургас. Средно 5–6 седмици." },
      { title: "Митническо оформяне", desc: "Обработваме цялата митническа документация, заплащаме мито и ДДС от ваше име. Нула изненади." },
      { title: "Регистрация в КАТ", desc: "Регистрираме автомобила в КАТ и го предаваме с всички документи, готов за шофиране." },
    ],
    philosophyTitle: "Философия",
    philosophy1:
      "Работя само с автомобили с чист документ (Clean Title) и минимални щети. Не купувам коли само за да спечеля комисиона — купувам такива, каквито бих взел за себе си или за семейството си.",
    philosophy2:
      "Клиентът получава пълен достъп до всяка стъпка от процеса — снимки от аукциона, товарителница, митнически декларации, фактури. Никакви черни кутии, никакви изненади в края.",
    philosophy3: "Над 900 доставени автомобила. Нито един клиент не е останал без своята кола.",
    companyTitle: "Фирмена информация",
    companyFields: [
      ["Наименование", '„БЕСТ АВТО" ЕООД / "BEST AUTO" LTD'],
      ["ЕИК", "208075843"],
      ["ДДС номер", "BG208075843"],
      ["Управител", "Олексій Стоянов"],
    ] as [string, string][],
    ctaTitle: "Готови да започнем?",
    ctaSub: "Пишете ни — консултацията е безплатна.",
    ctaViber: "Пишете ни във Viber",
    ctaTelegram: "Пишете ни в Telegram",
  },
  ru: {
    badge: "О нас",
    title1: "Человек за",
    title2: "Best Auto",
    intro:
      "Мы не агентство с колл-центрами и скрытыми комиссиями. Best Auto — один человек с глубокой страстью к автомобилям и проверенным процессом, выстроенным на сотнях успешных импортов.",
    storyTitle: "Как всё началось",
    story1:
      "Всё началось с личной потребности — хотел найти хороший автомобиль по разумной цене. Изучив болгарский рынок, понял, что он переоценён на 35–50% по сравнению с тем, что предлагается на американских аукционах.",
    story2:
      "Изучил процесс самостоятельно, купил первый автомобиль, прошёл таможню, поставил на учёт. Сработало. Потом второй, третий — для друзей. Со временем сложилась репутация. Сегодня Best Auto — официальная форма услуги, которой уже доверились сотни людей.",
    expertiseTitle: "Экспертиза",
    expertise: [
      "Более 5 лет опыта работы с американскими аукционами",
      "Личное присутствие на Copart, IAAI и Manheim",
      "Тщательная проверка каждого автомобиля перед торгами",
      "Знание американского и европейского таможенного законодательства",
      "Надёжные партнёры по RoRo-доставке до порта Варна",
      "Полная прозрачность — клиент видит каждый счёт",
    ],
    servicesTitle: "Что включает услуга",
    services: [
      { title: "Поиск автомобиля", desc: "Изучаем сотни лотов каждую неделю. Выбираем только автомобили с чистыми документами и минимальными повреждениями." },
      { title: "Участие в аукционе", desc: "Участвуем от вашего имени на Copart, IAAI или Manheim. Следим за торгами в реальном времени и не переплачиваем." },
      { title: "Транспортировка из США", desc: "Организуем RoRo-доставку напрямую до порта Варна или Бургас. В среднем 5–6 недель." },
      { title: "Таможенное оформление", desc: "Оформляем всю таможенную документацию, оплачиваем пошлины и НДС от вашего имени. Ноль сюрпризов." },
      { title: "Регистрация в КАТ", desc: "Регистрируем автомобиль в органах ГАИ и передаём со всеми документами, готовый к езде." },
    ],
    philosophyTitle: "Философия",
    philosophy1:
      "Работаю только с автомобилями с чистым документом (Clean Title) и минимальными повреждениями. Не покупаю машины ради комиссии — беру только те, которые взял бы для себя или семьи.",
    philosophy2:
      "Клиент получает полный доступ к каждому этапу процесса — фотографии с аукциона, транспортные накладные, таможенные декларации, счета. Никаких тёмных мест, никаких сюрпризов в конце.",
    philosophy3: "Более 900 доставленных автомобилей. Ни один клиент не остался без своей машины.",
    companyTitle: "Информация о компании",
    companyFields: [
      ["Наименование", '„БЕСТ АВТО" ЕООД / "BEST AUTO" LTD'],
      ["ЕИК", "208075843"],
      ["Номер НДС", "BG208075843"],
      ["Управляющий", "Алексей Стоянов"],
    ] as [string, string][],
    ctaTitle: "Готовы начать?",
    ctaSub: "Напишите нам — консультация бесплатна.",
    ctaViber: "Написать в Viber",
    ctaTelegram: "Написать в Telegram",
  },
  en: {
    badge: "About Us",
    title1: "The Person Behind",
    title2: "Best Auto",
    intro:
      "We are not an agency with call centres and hidden commissions. Best Auto is one person with a deep passion for cars and a proven process built on hundreds of successful imports.",
    storyTitle: "How It All Started",
    story1:
      "It all started with a personal need — I wanted to find a good car at a reasonable price. I looked around Bulgaria and realised the local market was overpriced by 35–50% compared to what US auctions offered.",
    story2:
      "I researched the process myself, bought the first car, cleared customs, got it registered. It worked. Then a second, a third — for friends. Over time a reputation was built. Today Best Auto is the official form of a service that hundreds of people have already trusted.",
    expertiseTitle: "Expertise",
    expertise: [
      "Over 5 years of experience with US auctions",
      "Personal presence at Copart, IAAI, and Manheim",
      "Thorough inspection of every vehicle before bidding",
      "Knowledge of US and European customs legislation",
      "Trusted partners for RoRo delivery to Varna port",
      "Full transparency — the client sees every invoice",
    ],
    servicesTitle: "What the Service Includes",
    services: [
      { title: "Finding a Vehicle", desc: "We research hundreds of lots every week and select only vehicles with clean titles and minimal damage." },
      { title: "Auction Bidding", desc: "We bid on your behalf at Copart, IAAI, or Manheim. We monitor the auction in real time and never overpay." },
      { title: "Transport from the US", desc: "We arrange RoRo freight transport directly to Varna or Burgas port. Average 5–6 weeks." },
      { title: "Customs Clearance", desc: "We handle all customs documentation, pay duties and VAT on your behalf. Zero surprises." },
      { title: "Vehicle Registration", desc: "We register the car and hand it over with all documents, ready to drive." },
    ],
    philosophyTitle: "Philosophy",
    philosophy1:
      "I work only with vehicles that have a Clean Title and minimal damage. I don't buy cars just to earn a commission — I buy the kind I would get for myself or my family.",
    philosophy2:
      "The client gets full access to every step of the process — auction photos, bill of lading, customs declarations, invoices. No black boxes, no surprises at the end.",
    philosophy3: "Over 900 cars delivered. Not a single client has been left without their car.",
    companyTitle: "Company Information",
    companyFields: [
      ["Name", '"BEST AUTO" LTD'],
      ["EIK", "208075843"],
      ["VAT Number", "BG208075843"],
      ["Director", "Oleksiy Stoyanov"],
    ] as [string, string][],
    ctaTitle: "Ready to Start?",
    ctaSub: "Write to us — the consultation is free.",
    ctaViber: "Message us on Viber",
    ctaTelegram: "Message us on Telegram",
  },
};

const meta = {
  bg: {
    title: "За нас | Best Auto — Внос на автомобили от САЩ",
    description: "Внос на коли от САЩ — аукцион, доставка, мито, ДДС и регистрация. Пълно обслужване от Best Auto.",
  },
  ru: {
    title: "О нас | Best Auto — Импорт автомобилей из США",
    description: "Импорт авто из США — аукцион, доставка, таможня, НДС и регистрация. Полный сервис от Best Auto.",
  },
  en: {
    title: "About Us | Best Auto — Car Import from the USA",
    description: "Car import from the USA — auction, shipping, customs, VAT, and registration. Full service from Best Auto.",
  },
};

const localeOg: Record<string, string> = { bg: "bg_BG", ru: "ru_RU", en: "en_US" };

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const m = meta[lang as keyof typeof meta] ?? meta.bg;
  return {
    title: m.title,
    description: m.description,
    openGraph: {
      title: m.title,
      description: m.description,
      locale: localeOg[lang] ?? "bg_BG",
      type: "website",
      siteName: "Best Auto",
    },
    twitter: {
      card: "summary_large_image",
      title: m.title,
      description: m.description,
    },
    alternates: {
      canonical: lang === "bg" ? "/about" : `/${lang}/about`,
      languages: { bg: "/about", ru: "/ru/about", en: "/en/about" },
    },
  };
}

export default async function AboutPage({ params }: Props) {
  const { lang } = await params;
  const c = content[lang as keyof typeof content] ?? content.bg;
  return (
    <div className="min-h-screen bg-[#0F1515]">
      {/* Hero */}
      <div className="relative pt-32 pb-16 lg:pt-40">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-customYellow">
            {c.badge}
          </span>
          <h1 className="mt-3 text-4xl font-bold leading-tight text-white lg:text-5xl">
            {c.title1}<br />
            <span className="text-customYellow">{c.title2}</span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-gray-400">
            {c.intro}
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="mx-auto max-w-3xl px-4 pb-24 space-y-20">

        {/* Story + first photo */}
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="space-y-5 text-gray-300 leading-relaxed">
            <h2 className="text-2xl font-bold text-white">{c.storyTitle}</h2>
            <p>{c.story1}</p>
            <p>{c.story2}</p>
          </div>
          <div className="overflow-hidden rounded-2xl">
            <Image
              src={inlinePhotos[0].src}
              alt="Auction vehicle"
              width={inlinePhotos[0].width}
              height={inlinePhotos[0].height}
              className="w-full object-cover"
            />
          </div>
        </div>

        {/* Expertise */}
        <div className="rounded-2xl border border-gray-700/50 bg-gray-900/40 p-8">
          <h2 className="mb-6 text-2xl font-bold text-white">{c.expertiseTitle}</h2>
          <ul className="space-y-4">
            {c.expertise.map((item) => (
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
                alt="Auction"
                width={p.width}
                height={p.height}
                className="w-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Services */}
        <div>
          <h2 className="mb-8 text-2xl font-bold text-white">{c.servicesTitle}</h2>
          <div className="space-y-6">
            {c.services.map((s, i) => (
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
                alt="Auction"
                width={p.width}
                height={p.height}
                className="w-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Philosophy */}
        <div className="space-y-5 border-l-2 border-customYellow/40 pl-6 text-gray-300 leading-relaxed">
          <h2 className="text-2xl font-bold text-white">{c.philosophyTitle}</h2>
          <p>{c.philosophy1}</p>
          <p>{c.philosophy2}</p>
          <p>{c.philosophy3}</p>
        </div>

        {/* Company info */}
        <div className="rounded-2xl border border-gray-700/50 bg-gray-900/40 p-8">
          <h2 className="mb-6 text-2xl font-bold text-white">{c.companyTitle}</h2>
          <dl className="grid gap-4 sm:grid-cols-2">
            {c.companyFields.map(([label, value]) => (
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
            {c.ctaTitle}
          </h2>
          <p className="mt-2 text-gray-400">
            {c.ctaSub}
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href="viber://chat?number=%2B359877575257"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-6 py-3 font-semibold text-white transition-opacity hover:opacity-90"
            >
              <ViberIcon className="h-5 w-5" />
              {c.ctaViber}
            </a>
            <a
              href="https://t.me/+359877575257"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-500 px-6 py-3 font-semibold text-white transition-opacity hover:opacity-90"
            >
              <TelegramIcon className="h-5 w-5" />
              {c.ctaTelegram}
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
