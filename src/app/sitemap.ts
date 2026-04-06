import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://best-auto.bg';
  const defaultLocale = 'bg';
  const locales = ['bg', 'ru'];
  const pages = ['', '/about'];

  // bg is the default locale → no prefix; other locales get /<locale>
  const localizedPath = (locale: string, page: string) =>
    locale === defaultLocale ? `${base}${page || '/'}` : `${base}/${locale}${page}`;

  return locales.flatMap((locale) =>
    pages.map((page) => ({
      url: localizedPath(locale, page),
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: page === '' ? 1.0 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, localizedPath(l, page)])
        ),
      },
    }))
  );
}
