import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['bg', 'en'],
  defaultLocale: 'bg',
  localePrefix: 'always',
  localeDetection: true,
  localeCookie: {
    name: 'preferred-language',
    maxAge: 60 * 60 * 24 * 365, // 1 year
  },
  alternateLinks: false,
});

export type Locale = (typeof routing.locales)[number];
