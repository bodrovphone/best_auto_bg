import { NextResponse, type NextRequest } from 'next/server';

const LOCALES = ['bg', 'ru', 'en'] as const;
type Locale = (typeof LOCALES)[number];
const DEFAULT_LOCALE: Locale = 'bg';
const COOKIE_NAME = 'preferred-language';

function detectLocale(request: NextRequest): Locale {
  // 1. Cookie has highest priority (explicit user choice)
  const cookieValue = request.cookies.get(COOKIE_NAME)?.value;
  if (cookieValue && (LOCALES as readonly string[]).includes(cookieValue)) {
    return cookieValue as Locale;
  }
  // 2. Accept-Language header
  const accept = request.headers.get('accept-language') ?? '';
  const lowered = accept.toLowerCase();
  for (const lang of lowered.split(',')) {
    const code = lang.trim().split(/[-;]/)[0];
    if ((LOCALES as readonly string[]).includes(code)) {
      return code as Locale;
    }
  }
  // 3. Fallback
  return DEFAULT_LOCALE;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // If the URL already starts with a known locale (/bg/... or /ru/...),
  // strip /bg → / for the default locale (clean URL), otherwise pass through.
  for (const loc of LOCALES) {
    if (pathname === `/${loc}` || pathname.startsWith(`/${loc}/`)) {
      if (loc === DEFAULT_LOCALE) {
        // Redirect /bg → / and /bg/about → /about (default locale should be unprefixed)
        const url = request.nextUrl.clone();
        url.pathname = pathname.slice(`/${loc}`.length) || '/';
        return NextResponse.redirect(url);
      }
      return NextResponse.next();
    }
  }

  // No locale in URL — pick one
  const locale = detectLocale(request);

  if (locale === DEFAULT_LOCALE) {
    // Internal rewrite — URL bar stays clean (e.g. / or /about),
    // but Next.js renders [lang]/page.tsx with lang=bg.
    // Use new URL() with absolute base to avoid Turbopack clone issues.
    const target = `/${DEFAULT_LOCALE}${pathname === '/' ? '' : pathname}`;
    return NextResponse.rewrite(new URL(target, request.url));
  } else {
    // Non-default locale: redirect to add the prefix
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ['/((?!_next|_vercel|api|.*\\..*).*)'],
};
