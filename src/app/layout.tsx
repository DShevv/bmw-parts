import { Unbounded, Noto_Sans } from "next/font/google";
import "./globals.scss";
import Script from "next/script";

const unbounded = Unbounded({
  variable: "--second-family",
  subsets: ["latin", "cyrillic"],
});

const notoSans = Noto_Sans({
  variable: "--font-family",
  subsets: ["latin", "cyrillic"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${unbounded.variable} ${notoSans.variable}`}>
        <Script
          src="https://api-maps.yandex.ru/v3/?apikey=e1f9579b-8502-438f-8273-6dff1fc98656&lang=ru_RU"
          strategy="beforeInteractive"
        />

        <main>{children}</main>
      </body>
    </html>
  );
}
