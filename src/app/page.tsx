import { redirect } from "next/navigation";
import { headers } from "next/headers";

const SUPPORTED = ['bg', 'ru'] as const;
const DEFAULT = 'bg';

function detectLocale(acceptLanguage: string | null): string {
  if (!acceptLanguage) return DEFAULT;

  const languages = acceptLanguage
    .split(',')
    .map((part) => {
      const [lang, q] = part.trim().split(';q=');
      return { lang: lang.trim().toLowerCase(), q: q ? parseFloat(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);

  for (const { lang } of languages) {
    const prefix = lang.split('-')[0];
    const match = SUPPORTED.find((s) => s === prefix);
    if (match) return match;
  }

  return DEFAULT;
}

export default async function RootPage() {
  const headersList = await headers();
  const acceptLanguage = headersList.get('accept-language');
  const locale = detectLocale(acceptLanguage);
  redirect(`/${locale}`);
}
