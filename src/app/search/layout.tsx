import Feedback from "@/blocks/Feedback/Feedback";
import styles from "./layout.module.scss";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import clsx from "clsx";
import SeoBlock from "@/blocks/SeoBlock/SeoBlock";
import FiltersSidebar from "@/blocks/FiltersSidebar/FiltersSidebar";
import { getCategories } from "@/services/CatalogService";
import { getGenerations } from "@/services/CarsService";
import { getSeries } from "@/services/CarsService";
import { getBodies } from "@/services/CarsService";
import { getSeoPage } from "@/services/InfoService";

export const fetchCache = "force-no-store";

export const generateMetadata = async () => {
  const { seo } = await getSeoPage("search");
  return {
    title: seo?.title ?? "Поиск",
    description: seo?.description ?? "Поиск",
    keywords: seo?.keywords,
    openGraph: {
      title: seo?.title ?? "Поиск",
      description: seo?.description ?? "Поиск",
    },
  };
};

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const categories = await getCategories();
  const generations = await getGenerations();
  const series = await getSeries();
  const bodies = await getBodies();

  return (
    <>
      <div className={styles.content}>
        <Breadcrumbs
          items={[
            { title: "Главная", href: "/" },
            { title: "Поиск", href: "/search" },
          ]}
        />
        <h1 className={clsx(styles.title, "h1")}>Поиск </h1>

        <section className={styles.container}>
          <FiltersSidebar
            categoryId={null}
            generations={generations ?? []}
            series={series ?? []}
            bodies={bodies ?? []}
            availableFilters={null}
          />
          {children}
        </section>
      </div>

      <SeoBlock page={`search`} className={styles.seo} />
      <Feedback categories={categories ?? []} />
    </>
  );
};

export default Layout;
