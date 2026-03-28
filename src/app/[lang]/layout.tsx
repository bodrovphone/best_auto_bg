import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

type Props = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ lang: locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { lang } = await params;
  setRequestLocale(lang);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={lang} messages={messages}>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer lang={lang} />
    </NextIntlClientProvider>
  );
}
