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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "БЕСТ АВТО ЕООД / BEST AUTO LTD",
            url: "https://best-auto.bg",
            telephone: "+359877575257",
            email: "bestauto@mail.com",
            vatID: "BG208075843",
            areaServed: { "@type": "Country", name: "Bulgaria" },
            description: lang === "ru"
              ? "Импорт автомобилей из США в Болгарию. Полный сервис: аукцион, доставка, таможня, регистрация."
              : "Внос на автомобили от САЩ в България. Пълно обслужване: аукцион, доставка, мито, регистрация.",
            serviceType: ["Car Import", "Vehicle Auction Bidding", "Customs Clearance"],
          }),
        }}
      />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer lang={lang} />
    </NextIntlClientProvider>
  );
}
