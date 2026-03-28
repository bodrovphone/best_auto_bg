import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Внос на автомобили от САЩ | Best Auto",
  description:
    "Внос на коли от САЩ и Канада. Пълно обслужване - избор, закупуване, транспорт, митническо освобождаване и доставка до вашия дом в България.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-[#0F1515] text-white">
        {children}
      </body>
    </html>
  );
}
