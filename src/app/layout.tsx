import { Unbounded, Noto_Sans } from "next/font/google";
import "./globals.scss";
import Script from "next/script";
import Header from "@/blocks/Header/Header";
import MenuPopup from "@/blocks/MenuPopup/MenuPopup";
import Footer from "@/blocks/Footer/Footer";
import FeedbackPopup from "@/blocks/FeedbackPopup/FeedbackPopup";
import PopupButton from "@/components/Buttons/PopupButton/PopupButton";
import Notification from "@/components/Notification/Notification";
import { Suspense } from "react";
import OrderPricePopup from "@/blocks/OrderPricePopup/OrderPricePopup";
import { getContacts, getSeoPage } from "@/services/InfoService";
import { getSetting } from "@/services/InfoService";
import HeaderMobile from "@/blocks/HeaderMobile/HeaderMobile";
import { getCategories } from "@/services/CatalogService";

const unbounded = Unbounded({
  variable: "--second-family",
  subsets: ["latin", "cyrillic"],
});

const notoSans = Noto_Sans({
  variable: "--font-family",
  subsets: ["latin", "cyrillic"],
});

export const generateMetadata = async () => {
  const { seo } = await getSeoPage("main");
  const setting = await getSetting();

  return {
    title: seo?.title ?? "BMW parts",
    description: seo?.description ?? "BMW parts",
    keywords: seo?.keywords,
    openGraph: {
      title: seo?.og_title ?? seo?.title,
      description: seo?.og_description ?? seo?.description,
    },
    icons: {
      icon: `${process.env.NEXT_PUBLIC_STORE_URL}/${setting?.favicon_path}`,
    },
  };
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const categories = await getCategories();
  const contacts = await getContacts();
  const settings = await getSetting();

  return (
    <html lang="ru">
      <body className={`${unbounded.variable} ${notoSans.variable}`}>
        <Script
          src="https://api-maps.yandex.ru/v3/?apikey=e1f9579b-8502-438f-8273-6dff1fc98656&lang=ru_RU"
          strategy="beforeInteractive"
        />

        <Header
          categories={categories ?? undefined}
          contacts={contacts ?? undefined}
          settings={settings ?? undefined}
        />
        <HeaderMobile />
        <main>
          <Suspense>{children}</Suspense>
        </main>
        <Footer />

        <MenuPopup
          contacts={contacts ?? undefined}
          settings={settings ?? undefined}
        />
        <FeedbackPopup />
        <PopupButton />
        <Notification />
        <OrderPricePopup />
      </body>
    </html>
  );
}
