type Status = "bid" | "won" | "shipping" | "transit" | "customs" | "registration" | "delivered";

const statusConfigByLang: Record<string, Record<Status, { label: string; classes: string }>> = {
  bg: {
    bid:          { label: "\u2B06 \u041D\u0410\u0414\u0414\u0410\u0412\u0410\u041D\u0415",   classes: "bg-yellow-400/10 text-yellow-300/70" },
    won:          { label: "\u2605 \u0421\u041F\u0415\u0427\u0415\u041B\u0415\u041D",     classes: "bg-[#ED7014]/10 text-[#ED7014]/80" },
    shipping:     { label: "\u25B8 \u0418\u0417\u041F\u0420\u0410\u0429\u0410\u041D\u0415",    classes: "bg-orange-400/10 text-orange-300/70" },
    transit:      { label: "\u2708 \u0422\u0420\u0410\u041D\u0417\u0418\u0422",      classes: "bg-sky-400/10 text-sky-300/70" },
    customs:      { label: "\u2299 \u041C\u0418\u0422\u041D\u0418\u0426\u0410",      classes: "bg-violet-400/10 text-violet-300/70" },
    registration: { label: "\u2AE1 \u0420\u0415\u0413\u0418\u0421\u0422\u0420\u0410\u0426\u0418\u042F", classes: "bg-blue-400/10 text-blue-300/70" },
    delivered:    { label: "\u2713 \u0414\u041E\u0421\u0422\u0410\u0412\u0415\u041D",     classes: "bg-emerald-400/10 text-emerald-300/70" },
  },
  ru: {
    bid:          { label: "\u2B06 \u0421\u0422\u0410\u0412\u041A\u0410",       classes: "bg-yellow-400/10 text-yellow-300/70" },
    won:          { label: "\u2605 \u0412\u042B\u0418\u0413\u0420\u0410\u041D",     classes: "bg-[#ED7014]/10 text-[#ED7014]/80" },
    shipping:     { label: "\u25B8 \u041E\u0422\u041F\u0420\u0410\u0412\u041A\u0410",    classes: "bg-orange-400/10 text-orange-300/70" },
    transit:      { label: "\u2708 \u0422\u0420\u0410\u041D\u0417\u0418\u0422",      classes: "bg-sky-400/10 text-sky-300/70" },
    customs:      { label: "\u2299 \u0422\u0410\u041C\u041E\u0416\u041D\u042F",      classes: "bg-violet-400/10 text-violet-300/70" },
    registration: { label: "\u2AE1 \u0420\u0415\u0413\u0418\u0421\u0422\u0420\u0410\u0426\u0418\u042F", classes: "bg-blue-400/10 text-blue-300/70" },
    delivered:    { label: "\u2713 \u0414\u041E\u0421\u0422\u0410\u0412\u041B\u0415\u041D",   classes: "bg-emerald-400/10 text-emerald-300/70" },
  },
};

const headerTx = {
  status:   { bg: "\u0421\u0442\u0430\u0442\u0443\u0441",     ru: "\u0421\u0442\u0430\u0442\u0443\u0441" },
  vehicle:  { bg: "\u0410\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B",  ru: "\u0410\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u044C" },
  route:    { bg: "\u041C\u0430\u0440\u0448\u0440\u0443\u0442",    ru: "\u041C\u0430\u0440\u0448\u0440\u0443\u0442" },
  priceBG:  { bg: "\u0426\u0435\u043D\u0430 \u0432 \u0411\u0413",  ru: "\u0426\u0435\u043D\u0430 \u0432 \u0411\u0413" },
  saved:    { bg: "\u0421\u043F\u0435\u0441\u0442\u0435\u043D\u043E",    ru: "\u042D\u043A\u043E\u043D\u043E\u043C\u0438\u044F" },
} as const;

type HKey = keyof typeof headerTx;
function th(key: HKey, lang: string): string {
  return headerTx[key][lang as "bg" | "ru"] ?? headerTx[key].bg;
}

const entries: {
  vehicle: string;
  from: string;
  to: string;
  status: Status;
  price: number;
  saved: number;
}[] = [
  { vehicle: "2023 RAM 1500 TRADESMAN",    from: "MS, USA", to: "\u0412\u0430\u0440\u043D\u0430",          status: "delivered",    price: 22400, saved: 8600  },
  { vehicle: "2025 KIA TELLURIDE S",       from: "GA, USA", to: "\u0421\u043E\u0444\u0438\u044F",          status: "transit",      price: 31200, saved: 11800 },
  { vehicle: "2024 MAZDA CX-30 SELECT",    from: "AZ, USA", to: "\u041F\u043B\u043E\u0432\u0434\u0438\u0432",        status: "customs",      price: 19800, saved: 7200  },
  { vehicle: "2019 CHEVROLET TRAX 1LT",    from: "FL, USA", to: "\u0411\u0443\u0440\u0433\u0430\u0441",         status: "registration", price: 11300, saved: 4100  },
  { vehicle: "2023 KIA SOUL LX",           from: "KS, USA", to: "\u0420\u0443\u0441\u0435",           status: "delivered",    price: 10600, saved: 3900  },
  { vehicle: "2018 JEEP COMPASS LATITUDE", from: "NV, USA", to: "\u0421\u0442\u0430\u0440\u0430 \u0417\u0430\u0433\u043E\u0440\u0430",   status: "won",          price: 15700, saved: 5800  },
  { vehicle: "2024 MITSUBISHI MIRAGE ES",  from: "FL, USA", to: "\u0412\u0430\u0440\u043D\u0430",          status: "shipping",     price: 12400, saved: 4300  },
  { vehicle: "2018 HYUNDAI SONATA SEL",    from: "FL, USA", to: "\u0412\u0435\u043B\u0438\u043A\u043E \u0422\u044A\u0440\u043D\u043E\u0432\u043E", status: "transit",      price: 10900, saved: 3800  },
  { vehicle: "2022 FORD MUSTANG GT",       from: "TX, USA", to: "\u0421\u043E\u0444\u0438\u044F",          status: "bid",          price: 28500, saved: 10200 },
  { vehicle: "2021 TOYOTA RAV4 HYBRID",    from: "CA, USA", to: "\u041F\u043B\u043E\u0432\u0434\u0438\u0432",        status: "won",          price: 25100, saved: 9400  },
  { vehicle: "2023 NISSAN KICKS SV",       from: "MS, USA", to: "\u0412\u0430\u0440\u043D\u0430",          status: "customs",      price: 12200, saved: 4600  },
  { vehicle: "2020 BMW X5 XDRIVE40I",      from: "NY, USA", to: "\u0421\u043E\u0444\u0438\u044F",          status: "delivered",    price: 35300, saved: 13900 },
];

function formatEur(v: number) {
  return `\u20AC${v.toLocaleString("bg-BG")}`;
}

const ROW_HEIGHT = 44;
const VISIBLE_ROWS = 3;

function Row({ entry, lang }: { entry: typeof entries[0]; lang: string }) {
  const config = statusConfigByLang[lang] ?? statusConfigByLang.bg;
  const s = config[entry.status];
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
        {entry.from}<span className="mx-1 text-[#ED7014]/40">\u2192</span>{entry.to}
      </span>
      <span className="text-right font-bold text-gray-200">{formatEur(entry.price)}</span>
      <span className="text-right text-[11px] text-emerald-400/60">-{formatEur(entry.saved)}</span>
    </div>
  );
}

export function TickerB({ lang = "bg" }: { lang?: string }) {
  const doubled = [...entries, ...entries];

  return (
    <div className="w-full bg-gray-950 border-y border-white/5">
      {/* Header */}
      <div
        className="grid items-center border-b border-white/5 px-4 font-mono text-[10px] uppercase tracking-widest text-gray-700"
        style={{ gridTemplateColumns: "130px 1fr 100px 70px 80px", height: 32 }}
      >
        <span>{th("status", lang)}</span>
        <span>{th("vehicle", lang)}</span>
        <span>{th("route", lang)}</span>
        <span className="text-right">{th("priceBG", lang)}</span>
        <span className="text-right">{th("saved", lang)}</span>
      </div>

      {/* Scrolling rows */}
      <div className="overflow-hidden" style={{ height: ROW_HEIGHT * VISIBLE_ROWS }}>
        <div className="animate-marquee-vertical">
          {doubled.map((entry, i) => (
            <Row key={i} entry={entry} lang={lang} />
          ))}
        </div>
      </div>
    </div>
  );
}
