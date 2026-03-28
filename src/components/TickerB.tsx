type Status = "bid" | "won" | "shipping" | "transit" | "customs" | "registration" | "delivered";

const statusConfig: Record<Status, { label: string; classes: string }> = {
  bid:          { label: "⬆ НАДДАВАНЕ",   classes: "bg-yellow-400/10 text-yellow-300/70" },
  won:          { label: "★ СПЕЧЕЛЕН",     classes: "bg-[#E1E100]/10 text-[#E1E100]/80" },
  shipping:     { label: "▸ ИЗПРАЩАНЕ",    classes: "bg-orange-400/10 text-orange-300/70" },
  transit:      { label: "✈ ТРАНЗИТ",      classes: "bg-sky-400/10 text-sky-300/70" },
  customs:      { label: "⊙ МИТНИЦА",      classes: "bg-violet-400/10 text-violet-300/70" },
  registration: { label: "⊡ РЕГИСТРАЦИЯ", classes: "bg-blue-400/10 text-blue-300/70" },
  delivered:    { label: "✓ ДОСТАВЕН",     classes: "bg-emerald-400/10 text-emerald-300/70" },
};

const entries: {
  vehicle: string;
  from: string;
  to: string;
  status: Status;
  price: number;
  saved: number;
}[] = [
  { vehicle: "2023 RAM 1500 TRADESMAN",    from: "MS, USA", to: "Варна",          status: "delivered",    price: 22400, saved: 8600  },
  { vehicle: "2025 KIA TELLURIDE S",       from: "GA, USA", to: "София",          status: "transit",      price: 31200, saved: 11800 },
  { vehicle: "2024 MAZDA CX-30 SELECT",    from: "AZ, USA", to: "Пловдив",        status: "customs",      price: 19800, saved: 7200  },
  { vehicle: "2019 CHEVROLET TRAX 1LT",    from: "FL, USA", to: "Бургас",         status: "registration", price: 11300, saved: 4100  },
  { vehicle: "2023 KIA SOUL LX",           from: "KS, USA", to: "Русе",           status: "delivered",    price: 10600, saved: 3900  },
  { vehicle: "2018 JEEP COMPASS LATITUDE", from: "NV, USA", to: "Стара Загора",   status: "won",          price: 15700, saved: 5800  },
  { vehicle: "2024 MITSUBISHI MIRAGE ES",  from: "FL, USA", to: "Варна",          status: "shipping",     price: 12400, saved: 4300  },
  { vehicle: "2018 HYUNDAI SONATA SEL",    from: "FL, USA", to: "Велико Търново", status: "transit",      price: 10900, saved: 3800  },
  { vehicle: "2022 FORD MUSTANG GT",       from: "TX, USA", to: "София",          status: "bid",          price: 28500, saved: 10200 },
  { vehicle: "2021 TOYOTA RAV4 HYBRID",    from: "CA, USA", to: "Пловдив",        status: "won",          price: 25100, saved: 9400  },
  { vehicle: "2023 NISSAN KICKS SV",       from: "MS, USA", to: "Варна",          status: "customs",      price: 12200, saved: 4600  },
  { vehicle: "2020 BMW X5 XDRIVE40I",      from: "NY, USA", to: "София",          status: "delivered",    price: 35300, saved: 13900 },
];

function formatEur(v: number) {
  return `€${v.toLocaleString("bg-BG")}`;
}

const ROW_HEIGHT = 44;
const VISIBLE_ROWS = 3;

function Row({ entry }: { entry: typeof entries[0] }) {
  const s = statusConfig[entry.status];
  return (
    <div
      className="grid items-center border-b border-white/5 px-4 font-mono text-sm"
      style={{
        height: ROW_HEIGHT,
        gridTemplateColumns: "130px 1fr 100px 70px 80px",
      }}
    >
      <span className={`rounded px-2 py-0.5 text-[11px] font-semibold tracking-wide justify-self-start ${s.classes}`}>
        {s.label}
      </span>
      <span className="truncate font-medium text-gray-300 pr-4">{entry.vehicle}</span>
      <span className="text-[11px] text-gray-600 truncate">
        {entry.from}<span className="mx-1 text-[#E1E100]/40">→</span>{entry.to}
      </span>
      <span className="text-right font-bold text-gray-200">{formatEur(entry.price)}</span>
      <span className="text-right text-[11px] text-emerald-400/60">-{formatEur(entry.saved)}</span>
    </div>
  );
}

export function TickerB() {
  const doubled = [...entries, ...entries];

  return (
    <div className="w-full bg-gray-950 border-y border-white/5">
      {/* Header */}
      <div
        className="grid items-center border-b border-white/5 px-4 font-mono text-[10px] uppercase tracking-widest text-gray-700"
        style={{ gridTemplateColumns: "130px 1fr 100px 70px 80px", height: 32 }}
      >
        <span>Статус</span>
        <span>Автомобил</span>
        <span>Маршрут</span>
        <span className="text-right">Цена в БГ</span>
        <span className="text-right">Спестено</span>
      </div>

      {/* Scrolling rows */}
      <div className="overflow-hidden" style={{ height: ROW_HEIGHT * VISIBLE_ROWS }}>
        <div className="animate-marquee-vertical">
          {doubled.map((entry, i) => (
            <Row key={i} entry={entry} />
          ))}
        </div>
      </div>
    </div>
  );
}
