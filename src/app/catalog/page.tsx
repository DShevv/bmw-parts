import Feedback from "@/blocks/Feedback/Feedback";
import styles from "./page.module.scss";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import clsx from "clsx";
import CatalogModels from "@/blocks/CatalogModels/CatalogModels";
import SeoBlock from "@/blocks/SeoBlock/SeoBlock";
import CatalogCategories from "@/blocks/CatalogCategories/CatalogCategories";
import { getSeoPage } from "@/services/InfoService";

export const generateMetadata = async () => {
  const { seo } = await getSeoPage("catalog");

  return {
    title: seo?.title ?? "BMW parts",
    description: seo?.description ?? "BMW parts",
    keywords: seo?.keywords,
    openGraph: {
      title: seo?.og_title ?? seo?.title,
      description: seo?.og_description ?? seo?.description,
    },
  };
};

const page = () => {
  return (
    <>
      <div className={styles.content}>
        <Breadcrumbs
          items={[
            { title: "Главная", href: "/" },
            { title: "Каталог", href: "/catalog" },
          ]}
        />
        <h1 className={clsx(styles.title, "h1")}>Каталог</h1>
        <CatalogModels />
        <CatalogCategories />
      </div>

      <SeoBlock page="catalog" />
      <Feedback />
    </>
  );
};

export default page;
