import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['bg', 'ru', 'en'],
  defaultLocale: 'bg',
  // 'as-needed' = default locale (bg) has no URL prefix, others do (e.g. /ru).
  // TODO: verify in prod that /about and other top-level routes still resolve correctly.
  // Caveat: never create a top-level folder named `bg` or `ru` under src/app/ — it would
  // collide with the locale namespace. All pages must live under src/app/[lang]/.
  localePrefix: 'as-needed',
  localeDetection: true,
  localeCookie: {
    name: 'preferred-language',
    maxAge: 60 * 60 * 24 * 365,
  },
  alternateLinks: true,
});

export type Locale = (typeof routing.locales)[number];
