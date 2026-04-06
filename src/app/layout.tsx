import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://best-auto.bg'),
  title: {
    default: "Внос на автомобили от САЩ | Best Auto",
    template: "%s | Best Auto",
  },
  description:
    "Внос на коли от САЩ и Канада. Пълно обслужване - избор, закупуване, транспорт, митническо освобождаване и доставка до вашия дом в България.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={`${inter.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col font-sans bg-[#0F1515] text-white">
        {children}
      </body>
    </html>
  );
}
