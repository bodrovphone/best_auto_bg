"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import {
  PhoneIcon,
  GlobeIcon,
  MenuIcon,
  XIcon,
  ViberIcon,
  TelegramIcon,
  ChevronDownIcon,
} from "@/components/icons";

interface DropdownItem {
  label: string;
  href: string;
  muted?: boolean;
  image?: string;
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

const navLinks: NavLink[] = [
  { label: "Начало", href: "#", active: true },
  { label: "Как работи", href: "#how-it-works" },
  { label: "Последни лотове", href: "#offers" },
  {
    label: "Аукциони",
    href: "#",
    dropdown: [
      {
        items: [
          { label: "Copart", href: "https://www.copart.com", image: "/assets/images/copart_logo.jpg" },
          { label: "IAAI", href: "https://www.iaai.com", image: "/assets/images/iaai_logo.jpg" },
          { label: "Manheim", href: "https://www.manheim.com", image: "/assets/images/manheim_logo.jpg" },
          { label: "AutoBidMaster", href: "https://www.autobidmaster.com", image: "/images/icons/abm-logo-white.89480f31.svg" },
        ],
      },
    ],
  },
  { label: "Калкулатор", href: "#calculator" },
  { label: "Отзиви", href: "#testimonials" },
  { label: "За нас", href: "/about" },
];

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
          hasImages ? "min-w-[320px] p-4" : "min-w-[260px]"
        }`}
      >
        {hasImages ? (
          <div className="grid grid-cols-2 gap-2.5">
            {groups.flatMap((g) => g.items).map((item) => {
              const isExternal = item.href.startsWith("http");
              return (
                <a
                  key={item.label}
                  href={item.href}
                  {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex items-center justify-center rounded-lg border border-white/5 bg-white/5 p-3 transition-all hover:border-customYellow/30 hover:bg-white/10"
                >
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.label}
                      width={120}
                      height={40}
                      className="h-8 w-auto object-contain brightness-110 opacity-70 group-hover:opacity-100 transition-opacity"
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
        <div className="grid grid-cols-2 gap-2">
          {groups.flatMap((g) => g.items).map((item) => {
            const isExternal = item.href.startsWith("http");
            return (
              <a
                key={item.label}
                href={item.href}
                {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="flex items-center justify-center rounded-lg border border-white/10 bg-white/5 p-3 transition-all hover:bg-white/10"
              >
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.label}
                    width={100}
                    height={32}
                    className="h-7 w-auto object-contain brightness-110 opacity-80"
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
  const lang = (params?.lang as string) ?? "bg";
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 50);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

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
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/90 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      {/* Top info bar - hidden on mobile */}
      <div className="hidden lg:block border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-8">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <GlobeIcon className="h-4 w-4" />
            <span>Работно време: Пон.- Нед. 10:00-20:00</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-gray-400">
            <a href="tel:+359885451689" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <PhoneIcon className="h-3.5 w-3.5" />
              <span>Телефон: +359 885 451 689</span>
            </a>
            <a href="viber://chat?number=%2B359885451689" className="hover:text-white transition-colors" aria-label="Viber">
              <ViberIcon className="h-4 w-4" />
            </a>
            <a href="https://t.me/+359885451689" className="hover:text-white transition-colors" aria-label="Telegram">
              <TelegramIcon className="h-4 w-4" />
            </a>
            <button className="flex items-center gap-1 hover:text-white transition-colors">
              <Image
                src="/images/icons/bulgaria-flag.svg"
                alt="БГ flag"
                width={16}
                height={16}
              />
              <span>БГ</span>
              <ChevronDownIcon className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16 lg:h-20">
        {/* Logo */}
        <a href="#" className="flex-shrink-0">
          <Image
            src="/images/logo.svg"
            alt="Best Auto"
            width={280}
            height={50}
            className="h-8 lg:h-10 w-auto"
          />
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
                href={link.href.startsWith("/") ? `/${lang}${link.href}` : link.href.startsWith("#") ? `/${lang}/${link.href}` : link.href}
                className={`flex items-center gap-1 px-3 py-2 text-sm transition-colors relative ${
                  link.active
                    ? "text-white font-bold"
                    : "text-gray-300 hover:text-[#E1E100]"
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
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#E1E100] rounded-full" />
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
        <div className="flex items-center gap-3">
          <a
            href="viber://chat?number=%2B359885451689"
            className={`hidden sm:inline-flex items-center gap-2 text-sm font-semibold rounded-full px-4 py-2.5 transition-all duration-300 ${
              scrolled
                ? "bg-purple-600 text-white hover:opacity-90"
                : "bg-white/10 text-white border border-white/30 hover:bg-white/20"
            }`}
            aria-label="Viber"
          >
            <ViberIcon className="h-5 w-5" />
            Viber
          </a>
          <a
            href="https://t.me/+359885451689"
            className={`hidden sm:inline-flex items-center gap-2 text-sm font-semibold rounded-full px-4 py-2.5 transition-all duration-300 ${
              scrolled
                ? "bg-sky-500 text-white hover:opacity-90"
                : "bg-white/10 text-white border border-white/30 hover:bg-white/20"
            }`}
            aria-label="Telegram"
          >
            <TelegramIcon className="h-5 w-5" />
            Telegram
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

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 top-16 bg-black/95 backdrop-blur-md z-40 overflow-y-auto">
          <div className="flex flex-col p-6 gap-1">
            {navLinks.map((link) => (
              <div key={link.label}>
                <div className="flex items-center">
                  <a
                    href={link.href.startsWith("/") ? `/${lang}${link.href}` : link.href.startsWith("#") ? `/${lang}/${link.href}` : link.href}
                    className={`flex-1 py-3 px-4 text-lg rounded-lg transition-colors ${
                      link.active
                        ? "text-[#E1E100] font-bold bg-white/5"
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
                href="tel:+359885451689"
                className="flex items-center gap-2 text-gray-400 py-2"
              >
                <PhoneIcon className="h-4 w-4" />
                +359 885 451 689
              </a>
            </div>
            <div className="mt-4 flex gap-3">
              <a
                href="viber://chat?number=%2B359885451689"
                className="flex-1 inline-flex items-center justify-center gap-2 bg-purple-600 text-white font-semibold rounded-full px-6 py-3"
              >
                <ViberIcon className="h-5 w-5" />
                Viber
              </a>
              <a
                href="https://t.me/+359885451689"
                className="flex-1 inline-flex items-center justify-center gap-2 bg-sky-500 text-white font-semibold rounded-full px-6 py-3"
              >
                <TelegramIcon className="h-5 w-5" />
                Telegram
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
