import { StarIcon } from "@/components/icons";

interface Review {
  name: string;
  location: string;
  car: string;
  rating: number;
  text: string;
  initials: string;
  color: string;
}

const reviews: Review[] = [
  {
    name: "Георги Димитров",
    location: "София",
    car: "BMW X5 2021",
    rating: 5,
    text: "Абсолютно професионална услуга от начало до край. Колата пристигна точно както беше описана. Целият процес — от избора на аукцион до регистрацията в КАТ — беше напълно прозрачен. Препоръчвам на всеки, който иска кола от САЩ!",
    initials: "ГД",
    color: "from-yellow-400 to-amber-500",
  },
  {
    name: "Мария Иванова",
    location: "Пловдив",
    car: "Tesla Model 3 2022",
    rating: 5,
    text: "Търсех Tesla на добра цена и Best Auto ми помогнаха да спестя над 8000 лв спрямо цените в България. Доставката отне около 5 седмици, точно колкото обещаха. Много съм доволна от комуникацията и крайния резултат.",
    initials: "МИ",
    color: "from-emerald-400 to-green-500",
  },
  {
    name: "Иван Петров",
    location: "Варна",
    car: "Ford Mustang 2020",
    rating: 5,
    text: "Мечтаех си за Mustang от години. Момчетата от Best Auto го намериха на Copart на страхотна цена, спечелиха аукциона и го докараха до Варна без никакви проблеми. Колата е в перфектно състояние. Благодаря!",
    initials: "ИП",
    color: "from-blue-400 to-sky-500",
  },
  {
    name: "Петър Стоянов",
    location: "Бургас",
    car: "Toyota RAV4 Hybrid 2021",
    rating: 5,
    text: "Втори автомобил, който внасям с Best Auto. Първия път беше толкова лесно, че не се поколебах отново. Хибридният RAV4 мина митница и регистрация за по-малко от седмица. Винаги са на линия за въпроси.",
    initials: "ПС",
    color: "from-purple-400 to-violet-500",
  },
  {
    name: "Елена Тодорова",
    location: "Стара Загора",
    car: "Chevrolet Tahoe 2019",
    rating: 4,
    text: "Страхувах се да внасям кола от чужбина, но екипът ме успокои и обясни всяка стъпка. Tahoe пристигна в отлично състояние. Цената с всички разходи излезе много по-добра от очакваната. Супер професионалисти!",
    initials: "ЕТ",
    color: "from-rose-400 to-pink-500",
  },
  {
    name: "Димитър Колев",
    location: "Русе",
    car: "Dodge RAM 1500 2020",
    rating: 5,
    text: "Искам да благодаря на целия екип за безпроблемния внос на моя RAM. От наддаването на IAAI до доставката на паркинга ми — всичко беше перфектно организирано. Определено ще се обърна отново към тях.",
    initials: "ДК",
    color: "from-orange-400 to-amber-500",
  },
];

function ReviewCard({ review }: { review: Review }) {
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
        {review.text}
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

export function TestimonialsSection() {
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
            Отзиви
          </span>
          <h2 className="mb-4 text-3xl font-bold text-white lg:text-5xl">
            Какво казват{" "}
            <span className="text-customYellow">нашите клиенти</span>
          </h2>
          <p className="mx-auto max-w-2xl text-base text-gray-400">
            Над 900 доволни клиенти, които се довериха на Best Auto за вноса на
            техния автомобил от САЩ
          </p>
        </div>

        {/* Reviews grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <ReviewCard key={review.name} review={review} />
          ))}
        </div>

        {/* Trust bar */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-center">
          <div>
            <p className="text-2xl font-bold text-customYellow">4.9/5</p>
            <p className="text-xs text-gray-500">Средна оценка</p>
          </div>
          <div className="h-8 w-px bg-gray-700" />
          <div>
            <p className="text-2xl font-bold text-white">900+</p>
            <p className="text-xs text-gray-500">Доволни клиенти</p>
          </div>
          <div className="h-8 w-px bg-gray-700" />
          <div>
            <p className="text-2xl font-bold text-white">100%</p>
            <p className="text-xs text-gray-500">Прозрачен процес</p>
          </div>
        </div>
      </div>
    </section>
  );
}
