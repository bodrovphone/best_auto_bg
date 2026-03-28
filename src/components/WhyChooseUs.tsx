import { CarIcon, BarChartIcon, TruckIcon } from "@/components/icons";

const features = [
  {
    icon: CarIcon,
    title: "Само Clean Title",
    description:
      "Не купуваме всичко подред. Подбираме само автомобили с чист документ и минимални щети — такива, каквито бихме взели за себе си.",
  },
  {
    icon: BarChartIcon,
    title: "До 40% по-евтино",
    description:
      "Цените на американските аукциони са значително по-ниски от българския пазар. Ние ви помагаме да се възползвате без риск и скрити такси.",
  },
  {
    icon: TruckIcon,
    title: "Всичко включено",
    description:
      "Аукцион, транспорт, мито, ДДС, регистрация в КАТ — вие получавате готов автомобил. Ние се грижим за всяка стъпка от процеса.",
  },
] as const;

export function WhyChooseUs() {
  return (
    <section
      id="about"
      className="py-16 text-center"
      style={{ backgroundColor: "rgb(17, 24, 39)" }}
    >
      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}
        <h2 className="text-[30px] leading-tight">
          <span className="text-gray-400">Защо</span>{" "}
          <span className="font-bold text-white">Best Auto?</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-[16px] leading-relaxed text-gray-400">
          Един човек, прозрачен процес и над 900 успешно внесени автомобила.
          Без посредници, без изненади в цената.
        </p>

        {/* Feature Cards */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl border border-gray-700/50 bg-transparent p-8 text-left"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#E1E100]/10">
                <feature.icon className="h-6 w-6 text-[#E1E100]" />
              </div>
              <h3 className="mt-4 text-[20px] font-bold text-white">
                {feature.title}
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
