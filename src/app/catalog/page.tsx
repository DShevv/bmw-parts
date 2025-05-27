import Feedback from "@/blocks/Feedback/Feedback";
import styles from "./page.module.scss";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import clsx from "clsx";
import CatalogModels from "@/blocks/CatalogModels/CatalogModels";
import SeoBlock from "@/blocks/SeoBlock/SeoBlock";
import CatalogCategories from "@/blocks/CatalogCategories/CatalogCategories";
import { getSeoPage } from "@/services/InfoService";
import { getCategories } from "@/services/CatalogService";
import { getBodies, getGenerations } from "@/services/CarsService";
import { getSeries } from "@/services/CarsService";
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

const page = async () => {
  const [categories, series, generations, bodies] = await Promise.all([
    getCategories(),
    getSeries(),
    getGenerations(),
    getBodies(),
  ]);

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
        <CatalogModels
          series={series ?? []}
          generations={generations ?? []}
          bodies={bodies ?? []}
        />
        <CatalogCategories categories={categories ?? []} />
      </div>

      <SeoBlock page="catalog" />
      <Feedback categories={categories ?? []} />
    </>
  );
};

export default page;
