import { getSeoPage } from "@/services/InfoService";
import React from "react";

export const generateMetadata = async () => {
  const { seo } = await getSeoPage("cart");

  return {
    title: seo?.title ?? "Корзина",
    description: seo?.description ?? "Корзина",
    keywords: seo?.keywords,
    openGraph: {
      title: seo?.og_title ?? seo?.title,
      description: seo?.og_description ?? seo?.description,
    },
  };
};

const layout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default layout;
