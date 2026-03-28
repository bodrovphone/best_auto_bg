import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['bg', 'ru'],
  defaultLocale: 'bg',
  localePrefix: 'always',
  localeDetection: true,
  localeCookie: {
    name: 'preferred-language',
    maxAge: 60 * 60 * 24 * 365,
  },
  alternateLinks: false,
});

export type Locale = (typeof routing.locales)[number];
