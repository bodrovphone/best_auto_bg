import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://best-auto.bg';
  const locales = ['bg', 'ru'];
  const pages = ['', '/about'];

  return locales.flatMap((locale) =>
    pages.map((page) => ({
      url: `${base}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: page === '' ? 1.0 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${base}/${l}${page}`])
        ),
      },
    }))
  );
}
