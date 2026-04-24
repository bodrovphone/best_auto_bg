"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, usePathname } from "next/navigation";
import Image from "next/image";
import BG from "country-flag-icons/react/3x2/BG";
import RU from "country-flag-icons/react/3x2/RU";
import GB from "country-flag-icons/react/3x2/GB";
import {
  PhoneIcon,
  MenuIcon,
  XIcon,
  ViberIcon,
  TelegramIcon,
  ChevronDownIcon,
} from "@/components/icons";
import { auctionLinks } from "@/lib/auctionLinks";

interface DropdownItem {
  label: string;
  href: string;
  muted?: boolean;
  image?: string;
  dark?: boolean;
  invert?: boolean;
}

interface DropdownGroup {
  items: DropdownItem[];
}

interface NavLink {
  label: string;
  href: string;
  active?: boolean;
  dropdown?: DropdownGroup[];
}

const tx = {
  home:       { bg: "Начало",           ru: "Главная",            en: "Home" },
  howItWorks: { bg: "Как работи",       ru: "Как это работает",   en: "How It Works" },
  lots:       { bg: "Последни лотове",  ru: "Последние лоты",     en: "Latest Lots" },
  auctions:   { bg: "Аукциони",         ru: "Аукционы",           en: "Auctions" },
  calculator: { bg: "Калкулатор",       ru: "Калькулятор",        en: "Calculator" },
  reviews:    { bg: "Отзиви",           ru: "Отзывы",             en: "Reviews" },
  about:      { bg: "За нас",           ru: "О нас",              en: "About Us" },
} as const;

type TxKey = keyof typeof tx;
function tr(key: TxKey, lang: string): string {
  return tx[key][lang as "bg" | "ru" | "en"] ?? tx[key].bg;
}

function getNavLinks(lang: string): NavLink[] {
  return [
    { label: tr("home", lang), href: "/", active: true },
    { label: tr("howItWorks", lang), href: "#how-it-works" },
    { label: tr("lots", lang), href: "#offers" },
    {
      label: tr("auctions", lang),
      href: "#",
      dropdown: [
        { items: auctionLinks },
      ],
    },
    // { label: tr("calculator", lang), href: "#calculator" },
    { label: tr("reviews", lang), href: "#testimonials" },
    { label: tr("about", lang), href: "/about" },
  ];
}

function DesktopDropdown({
  groups,
  open,
}: {
  groups: DropdownGroup[];
  open: boolean;
}) {
  const hasImages = groups.some((g) => g.items.some((i) => i.image));

  return (
    <div
      className={`absolute left-0 top-full pt-2 z-50 transition-all duration-200 ${
        open
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 -translate-y-1 pointer-events-none"
      }`}
    >
      <div
        className={`rounded-xl border border-white/10 bg-gray-900/95 backdrop-blur-xl shadow-2xl overflow-hidden ${
          hasImages ? "min-w-[260px] p-3" : "min-w-[260px]"
        }`}
      >
        {hasImages ? (
          <div className="flex flex-col gap-2">
            {groups.flatMap((g) => g.items).map((item) => {
              const isExternal = item.href.startsWith("http");
              return (
                <a
                  key={item.label}
                  href={item.href}
                  {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className={
                    item.dark
                      ? "group flex h-12 items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-white/[0.03] px-4 transition-all hover:border-white/20 hover:bg-white/[0.06]"
                      : "group flex h-12 items-center justify-center overflow-hidden rounded-lg bg-white/90 px-4 transition-all hover:bg-white"
                  }
                >
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.label}
                      width={130}
                      height={40}
                      className="h-7 w-auto max-w-[130px] object-contain transition-transform duration-200 group-hover:scale-105"
                      style={item.invert ? { filter: "brightness(0) invert(1)" } : undefined}
                    />
                  ) : (
                    <span className="text-sm font-semibold text-gray-300 group-hover:text-white transition-colors">
                      {item.label}
                      <span className="ml-1 text-gray-500">&#8599;</span>
                    </span>
                  )}
                </a>
              );
            })}
          </div>
        ) : (
          groups.map((group, gi) => (
            <div key={gi}>
              {gi > 0 && <div className="mx-4 border-t border-white/10" />}
              <div className="py-2">
                {group.items.map((item) => {
                  const isExternal = item.href.startsWith("http");
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className={`block px-5 py-2.5 text-sm transition-colors ${
                        item.muted
                          ? "text-gray-500 hover:text-gray-300 hover:bg-white/5"
                          : "text-gray-200 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {item.label}
                      {isExternal && <span className="ml-1.5 text-gray-500">&#8599;</span>}
                    </a>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const LANGS = [
  { code: "bg", label: "Български", Flag: BG },
  { code: "ru", label: "Русский",   Flag: RU },
  { code: "en", label: "English",   Flag: GB },
] as const;

function FlagIcon({ code, className }: { code: string; className?: string }) {
  const found = LANGS.find((l) => l.code === code);
  if (!found) return null;
  const { Flag } = found;
  return <Flag className={className ?? "h-4 w-auto rounded-[2px]"} />;
}

function LanguagePicker({
  current,
  switchHref,
}: {
  current: string;
  switchHref: (code: string) => string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const setCookieAndGo = (code: string) => {
    document.cookie = `preferred-language=${code}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
  };

  const currentLang = LANGS.find((l) => l.code === current) ?? LANGS[0];

  return (
    <div ref={ref} className="relative">
      {/* Trigger button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs font-semibold text-gray-300 transition-colors hover:border-white/20 hover:bg-white/10 hover:text-white"
        aria-label="Select language"
        aria-expanded={open}
      >
        <FlagIcon code={current} className="h-3.5 w-auto rounded-[2px]" />
        <span className="uppercase tracking-wide">{current.toUpperCase()}</span>
        <ChevronDownIcon
          className={`h-3 w-3 transition-transform duration-150 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 top-full mt-1.5 z-[70] min-w-[140px] rounded-xl border border-white/10 bg-gray-900/98 shadow-2xl backdrop-blur-xl overflow-hidden">
          {LANGS.map((l) => {
            const active = current === l.code;
            return (
              <a
                key={l.code}
                href={switchHref(l.code)}
                onClick={() => {
                  setCookieAndGo(l.code);
                  setOpen(false);
                }}
                className={`flex items-center gap-2.5 px-3 py-2.5 text-sm transition-colors ${
                  active
                    ? "bg-customYellow/10 text-customYellow font-semibold"
                    : "text-gray-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <l.Flag className="h-4 w-auto flex-shrink-0 rounded-[2px]" />
                <span>{l.label}</span>
                {active && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-customYellow" />
                )}
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}

function MobileDropdown({
  groups,
  open,
}: {
  groups: DropdownGroup[];
  open: boolean;
}) {
  if (!open) return null;
  const hasImages = groups.some((g) => g.items.some((i) => i.image));

  return (
    <div className="ml-4 mt-2 mb-1 pl-2">
      {hasImages ? (
        <div className="flex flex-col gap-2">
          {groups.flatMap((g) => g.items).map((item) => {
            const isExternal = item.href.startsWith("http");
            return (
              <a
                key={item.label}
                href={item.href}
                {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className={
                  item.dark
                    ? "flex h-12 items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-white/[0.03] px-4"
                    : "flex h-12 items-center justify-center overflow-hidden rounded-lg bg-white/90 px-4"
                }
              >
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.label}
                    width={130}
                    height={40}
                    className="h-7 w-auto max-w-[130px] object-contain"
                    style={item.invert ? { filter: "brightness(0) invert(1)" } : undefined}
                  />
                ) : (
                  <span className="text-sm font-medium text-gray-300">
                    {item.label} <span className="text-gray-500">&#8599;</span>
                  </span>
                )}
              </a>
            );
          })}
        </div>
      ) : (
        <div className="border-l-2 border-customYellow/30 pl-4">
          {groups.map((group, gi) => (
            <div key={gi}>
              {gi > 0 && <div className="my-1 border-t border-white/10" />}
              {group.items.map((item) => {
                const isExternal = item.href.startsWith("http");
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className={`block py-2 text-base transition-colors ${
                      item.muted
                        ? "text-gray-500 hover:text-gray-300"
                        : "text-gray-300 hover:text-white"
                    }`}
                  >
                    {item.label}
                    {isExternal && <span className="ml-1.5 text-gray-500">&#8599;</span>}
                  </a>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function Navbar() {
  const params = useParams();
  const pathname = usePathname() ?? "/";
  const lang = (params?.lang as string) ?? "bg";
  const prefix = lang === "bg" ? "" : `/${lang}`;
  const navLinks = getNavLinks(lang);

  // Build the equivalent URL for another locale, preserving the current path.
  // bg is the default → no prefix; ru/en → /<locale> prefix.
  const switchLocaleHref = (target: string) => {
    // Strip any leading locale segment from current pathname
    const stripped = pathname.replace(/^\/(bg|ru|en)(?=\/|$)/, "") || "/";
    return target === "bg" ? stripped : `/${target}${stripped === "/" ? "" : stripped}`;
  };
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleMouseEnter = (label: string) => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setOpenDropdown(label);
  };

  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  };

  return (
    <>
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/90 backdrop-blur-md shadow-lg">
      {/* Main nav */}
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-20 lg:h-24">
        {/* Logo + brand name */}
        <a href={`${prefix}/`} className="flex flex-shrink-0 items-center gap-3">
          <Image
            src="/images/logo-new1.webp"
            alt="Best Auto"
            width={96}
            height={96}
            className="h-16 lg:h-[88px] w-auto"
          />
          <span className="hidden text-xl font-bold uppercase tracking-wide text-white sm:inline lg:text-2xl">
            Best <span className="text-customYellow">Auto</span>
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <div
              key={link.label}
              className="relative"
              onMouseEnter={
                link.dropdown ? () => handleMouseEnter(link.label) : undefined
              }
              onMouseLeave={link.dropdown ? handleMouseLeave : undefined}
            >
              <a
                href={link.href.startsWith("/") ? `${prefix}${link.href}` : link.href.startsWith("#") ? `${prefix}/${link.href}` : link.href}
                className={`flex items-center gap-1 px-3 py-2 text-sm transition-colors relative ${
                  link.active
                    ? "text-white font-bold"
                    : "text-gray-300 hover:text-[#ED7014]"
                }`}
              >
                {link.label}
                {link.dropdown && (
                  <ChevronDownIcon
                    className={`h-3.5 w-3.5 transition-transform duration-200 ${
                      openDropdown === link.label ? "rotate-180" : ""
                    }`}
                  />
                )}
                {link.active && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#ED7014] rounded-full" />
                )}
              </a>
              {link.dropdown && (
                <DesktopDropdown
                  groups={link.dropdown}
                  open={openDropdown === link.label}
                />
              )}
            </div>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Language picker — visible on all screen sizes */}
          <LanguagePicker current={lang} switchHref={switchLocaleHref} />
          <a
            href="tel:+359877575257"
            className="hidden sm:flex items-center justify-center h-11 w-11 rounded-full bg-emerald-500 text-white shadow-md transition-all hover:scale-105 hover:bg-emerald-400"
            aria-label="Call +359 877 575 257"
          >
            <PhoneIcon className="h-5 w-5" />
          </a>
          <a
            href="viber://chat?number=%2B359877575257"
            className="hidden sm:flex items-center justify-center h-11 w-11 rounded-full bg-purple-600 text-white shadow-md transition-all hover:scale-105 hover:bg-purple-500"
            aria-label="Viber"
          >
            <ViberIcon className="h-5 w-5" />
          </a>
          <a
            href="https://t.me/+359877575257"
            className="hidden sm:flex items-center justify-center h-11 w-11 rounded-full bg-sky-500 text-white shadow-md transition-all hover:scale-105 hover:bg-sky-400"
            aria-label="Telegram"
          >
            <TelegramIcon className="h-5 w-5" />
          </a>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <XIcon className="h-6 w-6" />
            ) : (
              <MenuIcon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

    </nav>

    {/* Mobile menu overlay — sibling of <nav>, NOT a child, because the nav has
        backdrop-blur which would make it the containing block for fixed descendants
        and collapse this overlay. */}
    {mobileOpen && (
      <div className="lg:hidden fixed inset-0 top-20 bg-black/95 backdrop-blur-md z-[60] overflow-y-auto">
          <div className="flex flex-col p-6 gap-1">
            {navLinks.map((link) => (
              <div key={link.label}>
                <div className="flex items-center">
                  <a
                    href={link.href.startsWith("/") ? `${prefix}${link.href}` : link.href.startsWith("#") ? `${prefix}/${link.href}` : link.href}
                    className={`flex-1 py-3 px-4 text-lg rounded-lg transition-colors ${
                      link.active
                        ? "text-[#ED7014] font-bold bg-white/5"
                        : "text-white hover:bg-white/5"
                    }`}
                    onClick={
                      link.dropdown
                        ? (e) => {
                            e.preventDefault();
                            setMobileDropdown(
                              mobileDropdown === link.label
                                ? null
                                : link.label,
                            );
                          }
                        : () => setMobileOpen(false)
                    }
                  >
                    <span className="flex items-center justify-between">
                      {link.label}
                      {link.dropdown && (
                        <ChevronDownIcon
                          className={`h-4 w-4 transition-transform duration-200 ${
                            mobileDropdown === link.label ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </span>
                  </a>
                </div>
                {link.dropdown && (
                  <MobileDropdown
                    groups={link.dropdown}
                    open={mobileDropdown === link.label}
                  />
                )}
              </div>
            ))}
            <div className="mt-4 pt-4 border-t border-white/10">
              <a
                href="tel:+359877575257"
                className="flex items-center gap-2 text-gray-400 py-2"
              >
                <PhoneIcon className="h-4 w-4" />
                +359 877 575 257
              </a>
            </div>
            <div className="mt-4 flex gap-3">
              <a
                href="viber://chat?number=%2B359877575257"
                className="flex-1 inline-flex items-center justify-center gap-2 bg-purple-600 text-white font-semibold rounded-full px-6 py-3"
              >
                <ViberIcon className="h-5 w-5" />
                Viber
              </a>
              <a
                href="https://t.me/+359877575257"
                className="flex-1 inline-flex items-center justify-center gap-2 bg-sky-500 text-white font-semibold rounded-full px-6 py-3"
              >
                <TelegramIcon className="h-5 w-5" />
                Telegram
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
