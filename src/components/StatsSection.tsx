const stats = [
  { emoji: "\uD83C\uDFC6", value: "10", label: "Години Опит" },
  { emoji: "\uD83D\uDE97", value: "900", label: "Внесени Превозни Средства" },
  { emoji: "\uD83D\uDE0A", value: "3000", label: "Доволни Клиенти" },
  { emoji: "\u2B50", value: "5", label: "Спечелени Награди" },
] as const;

export function StatsSection() {
  return (
    <section
      id="testimonials"
      className="py-16"
      style={{ backgroundColor: "#0F1515" }}
    >
      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="mb-10 text-center">
          <h2 className="mb-3 text-[30px] font-bold text-white">
            Водени от Страст и{" "}
            <span style={{ color: "#E1E100" }}>Професионализъм</span>
          </h2>
          <p className="mx-auto max-w-3xl text-[16px] text-gray-400">
            В основата си ние сме не просто агенция за внос на автомобили – ние
            сме динамичен екип от любители на автомобили, стратези и логистични
            експерти.
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border p-6 text-center"
              style={{ borderColor: "rgba(225, 225, 0, 0.3)" }}
            >
              <div className="mb-2 text-[32px]">{stat.emoji}</div>
              <div
                className="text-[48px] font-bold leading-tight"
                style={{ color: "#E1E100" }}
              >
                {stat.value}
                <span className="text-[32px]">+</span>
              </div>
              <div className="text-[14px] text-gray-300">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
