import Image from "next/image";
import { PhoneIcon, ViberIcon, TelegramIcon } from "@/components/icons";

const tx = {
  description: { bg: "Внос на автомобили директно от американски аукциони. Доставка, мито, ДДС и регистрация — всичко включено.", ru: "Импорт автомобилей напрямую с американских аукционов. Доставка, пошлина, НДС и регистрация — все включено." },
  navHeader:   { bg: "Навигация",       ru: "Навигация" },
  auctHeader:  { bg: "Аукциони",        ru: "Аукционы" },
  contactHeader: { bg: "Контакти",      ru: "Контакты" },
  howItWorks:  { bg: "Как работи",      ru: "Как это работает" },
  lots:        { bg: "Последни лотове", ru: "Последние лоты" },
  calculator:  { bg: "Калкулатор",      ru: "Калькулятор" },
  reviews:     { bg: "Отзиви",          ru: "Отзывы" },
  about:       { bg: "За нас",          ru: "О нас" },
} as const;

type TxKey = keyof typeof tx;
function t(key: TxKey, lang: string): string {
  return tx[key][lang as "bg" | "ru"] ?? tx[key].bg;
}

function getNavLinks(lang: string) {
  return [
    { label: t("howItWorks", lang), href: "#how-it-works" },
    { label: t("lots", lang),       href: "#offers" },
    { label: t("calculator", lang), href: "#calculator" },
    { label: t("reviews", lang),    href: "#testimonials" },
    { label: t("about", lang),      href: "/about" },
  ];
}

const auctionLinks = [
  { label: "Copart", href: "https://www.copart.com", image: "/assets/images/copart_logo.jpg" },
  { label: "IAAI", href: "https://www.iaai.com", image: "/assets/images/iaai_logo.jpg" },
  { label: "Manheim", href: "https://www.manheim.com", image: "/assets/images/manheim_logo.jpg" },
  { label: "AutoBidMaster", href: "https://www.autobidmaster.com", image: "/images/icons/abm-logo-white.89480f31.svg" },
];

export function Footer({ lang = "bg" }: { lang?: string }) {
  const prefix = `/${lang}`;
  const navLinks = getNavLinks(lang);

  return (
    <footer className="border-t border-white/5 bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div className="space-y-4">
            <Image
              src="/images/logo.svg"
              alt="Best Auto"
              width={200}
              height={40}
              className="h-8 w-auto"
            />
            <p className="text-sm leading-relaxed text-gray-500">
              {t("description", lang)}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-gray-500">
              {t("navHeader", lang)}
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href.startsWith("/") ? `${prefix}${link.href}` : link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Auctions */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-gray-500">
              {t("auctHeader", lang)}
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {auctionLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center rounded-lg border border-white/5 bg-white/5 p-3 transition-all hover:border-customYellow/30 hover:bg-white/10"
                >
                  <Image
                    src={link.image}
                    alt={link.label}
                    width={100}
                    height={32}
                    className="h-7 w-auto object-contain opacity-60 group-hover:opacity-100 transition-opacity"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-gray-500">
              {t("contactHeader", lang)}
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="tel:+359885451689" className="flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white">
                  <PhoneIcon className="h-4 w-4 shrink-0" />
                  +359 885 451 689
                </a>
              </li>
              <li>
                <a href="mailto:bestauto@mail.com" className="flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white">
                  <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  bestauto@mail.com
                </a>
              </li>
              <li className="flex gap-2 pt-1">
                <a
                  href="viber://chat?number=%2B359885451689"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-600/20 text-purple-400 transition-colors hover:bg-purple-600/30"
                  aria-label="Viber"
                >
                  <ViberIcon className="h-4 w-4" />
                </a>
                <a
                  href="https://t.me/+359885451689"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-500/20 text-sky-400 transition-colors hover:bg-sky-500/30"
                  aria-label="Telegram"
                >
                  <TelegramIcon className="h-4 w-4" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-white/5 pt-8 text-center text-xs text-gray-600">
          <p>&copy; {new Date().getFullYear()} &bdquo;БЕСТ АВТО&ldquo; ЕООД &middot; ЕИК 208075843</p>
        </div>
      </div>
    </footer>
  );
}
