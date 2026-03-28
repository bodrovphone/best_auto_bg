import Image from "next/image";
import { CheckCircleIcon } from "@/components/icons";

const benefits = [
  "Директен внос от Copart, IAAI и Manheim",
  "Пълно митническо и ДДС оформяне",
  "Доставка от САЩ до вас за 5–6 седмици",
  "Над 900 доволни клиенти от цяла България",
];

export function HeroSection() {
  return (
    <section className="relative min-h-[736px] w-full overflow-hidden">
      {/* Background image */}
      <Image
        src="/assets/images/pexels-miguel-mallari-3716324-5549657.jpg"
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/30" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[736px] max-w-7xl items-center px-4 pt-32 pb-12 lg:pt-32">
        <div className="grid w-full gap-10 lg:grid-cols-2 lg:gap-16">

          {/* Left column */}
          <div className="flex flex-col justify-center">
            <h1>
              <span className="block text-[32px] font-medium leading-tight text-white md:text-[42px] lg:text-[56px]">
                ВНОС НА АВТОМОБИЛИ
              </span>
              <span className="block bg-gradient-to-r from-[#E1E100] to-amber-400 bg-clip-text text-[32px] font-bold leading-tight text-transparent md:text-[42px] lg:text-[56px]">
                ДИРЕКТНО ОТ САЩ
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-lg text-gray-200 lg:text-xl lg:leading-relaxed">
              Спечелете аукцион на Copart или IAAI и ние се грижим за
              всичко останало — доставка, мито, ДДС и регистрация в КАТ.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#offers"
                className="inline-flex items-center justify-center rounded-lg bg-[#E1E100] px-6 py-3 font-semibold text-black transition-opacity hover:opacity-90"
              >
                Разгледай лотовете
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center rounded-lg border border-white/50 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
              >
                Как работи?
              </a>
            </div>
          </div>

          {/* Right column — Why Best Auto panel */}
          <div className="flex items-center lg:justify-end">
            <div className="w-full max-w-md rounded-2xl border border-white/10 bg-black/40 p-7 backdrop-blur-md">
              <h2 className="text-xl font-bold text-white">
                Защо{" "}
                <span className="text-[#E1E100]">Best Auto?</span>
              </h2>
              <p className="mt-1 text-sm text-gray-400">
                Вашият надежден партньор за внос от американски аукциони
              </p>

              <ul className="mt-6 flex flex-col gap-4">
                {benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <CheckCircleIcon className="mt-0.5 h-5 w-5 shrink-0 text-[#E1E100]" />
                    <span className="text-sm text-gray-200">{b}</span>
                  </li>
                ))}
              </ul>

              <a
                href="viber://chat?number=%2B359885451689"
                className="mt-7 flex w-full items-center justify-center rounded-xl bg-[#E1E100] px-6 py-3 font-semibold text-black transition-opacity hover:opacity-90"
              >
                Получете безплатна консултация
              </a>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
