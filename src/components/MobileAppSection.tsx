import { StarIcon } from "@/components/icons";

const tx = {
  badge:        { bg: "Отзиви",                               ru: "Отзывы" },
  heading1:     { bg: "Какво казват",                          ru: "Что говорят" },
  headingHL:    { bg: "нашите клиенти",                       ru: "наши клиенты" },
  subtext:      { bg: "Над 900 доволни клиенти, които се довериха на Best Auto за вноса на техния автомобил от САЩ", ru: "Более 900 довольных клиентов, которые доверили Best Auto импорт своего автомобиля из США" },
  avgRating:    { bg: "Средна оценка",                        ru: "Средняя оценка" },
  happyClients: { bg: "Доволни клиенти",                      ru: "Довольных клиентов" },
  transparent:  { bg: "Прозрачен процес",                     ru: "Прозрачный процесс" },
} as const;

type TxKey = keyof typeof tx;
function t(key: TxKey, lang: string): string {
  return tx[key][lang as "bg" | "ru"] ?? tx[key].bg;
}

interface Review {
  name: string;
  location: string;
  car: string;
  rating: number;
  text: { bg: string; ru: string };
  initials: string;
  color: string;
}

const reviews: Review[] = [
  {
    name: "Георги Димитров",
    location: "София",
    car: "BMW X5 2021",
    rating: 5,
    text: {
      bg: "Абсолютно професионална услуга от начало до край. Колата пристигна точно както беше описана. Целият процес — от избора на аукцион до регистрацията в КАТ — беше напълно прозрачен. Препоръчвам на всеки, който иска кола от САЩ!",
      ru: "Абсолютно профессиональный сервис от начала до конца. Автомобиль прибыл точно таким, как был описан. Весь процесс — от выбора аукциона до регистрации в КАТ — был полностью прозрачен. Рекомендую всем, кто хочет авто из США!",
    },
    initials: "ГД",
    color: "from-yellow-400 to-amber-500",
  },
  {
    name: "Мария Иванова",
    location: "Пловдив",
    car: "Tesla Model 3 2022",
    rating: 5,
    text: {
      bg: "Търсех Tesla на добра цена и Best Auto ми помогнаха да спестя над 8000 лв спрямо цените в България. Доставката отне около 5 седмици, точно колкото обещаха. Много съм доволна от комуникацията и крайния резултат.",
      ru: "Искала Tesla по хорошей цене, и Best Auto помогли сэкономить более 8000 лв по сравнению с ценами в Болгарии. Доставка заняла около 5 недель, как и обещали. Очень довольна коммуникацией и результатом.",
    },
    initials: "МИ",
    color: "from-emerald-400 to-green-500",
  },
  {
    name: "Иван Петров",
    location: "Варна",
    car: "Ford Mustang 2020",
    rating: 5,
    text: {
      bg: "Мечтаех си за Mustang от години. Момчетата от Best Auto го намериха на Copart на страхотна цена, спечелиха аукциона и го докараха до Варна без никакви проблеми. Колата е в перфектно състояние. Благодаря!",
      ru: "Мечтал о Mustang годами. Ребята из Best Auto нашли его на Copart по отличной цене, выиграли аукцион и доставили в Варну без проблем. Автомобиль в идеальном состоянии. Спасибо!",
    },
    initials: "ИП",
    color: "from-blue-400 to-sky-500",
  },
  {
    name: "Петър Стоянов",
    location: "Бургас",
    car: "Toyota RAV4 Hybrid 2021",
    rating: 5,
    text: {
      bg: "Втори автомобил, който внасям с Best Auto. Първия път беше толкова лесно, че не се поколебах отново. Хибридният RAV4 мина митница и регистрация за по-малко от седмица. Винаги са на линия за въпроси.",
      ru: "Второй автомобиль, который импортирую с Best Auto. В первый раз было настолько просто, что не сомневался снова. Гибридный RAV4 прошел таможню и регистрацию менее чем за неделю. Всегда на связи для вопросов.",
    },
    initials: "ПС",
    color: "from-purple-400 to-violet-500",
  },
  {
    name: "Елена Тодорова",
    location: "Стара Загора",
    car: "Chevrolet Tahoe 2019",
    rating: 4,
    text: {
      bg: "Страхувах се да внасям кола от чужбина, но екипът ме успокои и обясни всяка стъпка. Tahoe пристигна в отлично състояние. Цената с всички разходи излезе много по-добра от очакваната. Супер професионалисти!",
      ru: "Боялась импортировать авто из-за рубежа, но команда успокоила и объяснила каждый шаг. Tahoe прибыл в отличном состоянии. Цена со всеми расходами оказалась гораздо лучше ожидаемой. Супер профессионалы!",
    },
    initials: "ЕТ",
    color: "from-rose-400 to-pink-500",
  },
  {
    name: "Димитър Колев",
    location: "Русе",
    car: "Dodge RAM 1500 2020",
    rating: 5,
    text: {
      bg: "Искам да благодаря на целия екип за безпроблемния внос на моя RAM. От наддаването на IAAI до доставката на паркинга ми — всичко беше перфектно организирано. Определено ще се обърна отново към тях.",
      ru: "Хочу поблагодарить всю команду за беспроблемный импорт моего RAM. От торгов на IAAI до доставки на мою парковку — все было идеально организовано. Определенно обращусь к ним снова.",
    },
    initials: "ДК",
    color: "from-orange-400 to-amber-500",
  },
];

function ReviewCard({ review, lang }: { review: Review; lang: string }) {
  const text = review.text[lang as "bg" | "ru"] ?? review.text.bg;
  return (
    <div className="group relative flex flex-col rounded-2xl border border-gray-700/50 bg-gray-900/50 p-6 transition-all duration-300 hover:border-customYellow/30 hover:bg-gray-900/80">
      {/* Quote mark */}
      <svg
        className="mb-4 h-8 w-8 text-customYellow/30"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11H10v10H0z" />
      </svg>

      {/* Review text */}
      <p className="mb-6 flex-1 text-sm leading-relaxed text-gray-300">
        {text}
      </p>

      {/* Stars */}
      <div className="mb-4 flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <StarIcon
            key={i}
            className={`h-4 w-4 ${i < review.rating ? "text-yellow-400" : "text-gray-600"}`}
          />
        ))}
      </div>

      {/* Author */}
      <div className="flex items-center gap-3 border-t border-gray-700/50 pt-4">
        <div
          className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${review.color} text-sm font-bold text-gray-900`}
        >
          {review.initials}
        </div>
        <div>
          <p className="text-sm font-semibold text-white">{review.name}</p>
          <p className="text-xs text-gray-500">
            {review.car} &middot; {review.location}
          </p>
        </div>
      </div>
    </div>
  );
}

export function TestimonialsSection({ lang = "bg" }: { lang?: string }) {
  return (
    <section
      id="testimonials"
      className="py-16 font-[Inter,sans-serif] lg:py-24"
      style={{ backgroundColor: "#0F1515" }}
    >
      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <span className="mb-4 inline-block rounded-full border border-yellow-400 px-4 py-1 text-sm uppercase tracking-wider text-yellow-400">
            {t("badge", lang)}
          </span>
          <h2 className="mb-4 text-3xl font-bold text-white lg:text-5xl">
            {t("heading1", lang)}{" "}
            <span className="text-customYellow">{t("headingHL", lang)}</span>
          </h2>
          <p className="mx-auto max-w-2xl text-base text-gray-400">
            {t("subtext", lang)}
          </p>
        </div>

        {/* Reviews grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <ReviewCard key={review.name} review={review} lang={lang} />
          ))}
        </div>

        {/* Trust bar */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-center">
          <div>
            <p className="text-2xl font-bold text-customYellow">4.9/5</p>
            <p className="text-xs text-gray-500">{t("avgRating", lang)}</p>
          </div>
          <div className="h-8 w-px bg-gray-700" />
          <div>
            <p className="text-2xl font-bold text-white">900+</p>
            <p className="text-xs text-gray-500">{t("happyClients", lang)}</p>
          </div>
          <div className="h-8 w-px bg-gray-700" />
          <div>
            <p className="text-2xl font-bold text-white">100%</p>
            <p className="text-xs text-gray-500">{t("transparent", lang)}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
