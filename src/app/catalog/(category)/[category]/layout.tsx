import Feedback from "@/blocks/Feedback/Feedback";
import styles from "./layout.module.scss";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import clsx from "clsx";
import SeoBlock from "@/blocks/SeoBlock/SeoBlock";
import SubcategorySlider from "@/blocks/SubcategorySlider/SubcategorySlider";
import FiltersSidebar from "@/blocks/FiltersSidebar/FiltersSidebar";
import { getCategories, getCategoriesBySlug } from "@/services/CatalogService";
import { getGenerations } from "@/services/CarsService";
import { getSeries } from "@/services/CarsService";
import { getBodies } from "@/services/CarsService";

const Layout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ category: string }>;
}) => {
  const { category } = await params;
  const categories = await getCategories();
  const categoryData =
    category === "all" ? null : await getCategoriesBySlug(category);
  const generations = await getGenerations();
  const series = await getSeries();
  const bodies = await getBodies();

  return (
    <>
      <div className={styles.content}>
        <Breadcrumbs
          items={[
            { title: "Главная", href: "/" },
            { title: "Каталог", href: "/catalog" },
            {
              title:
                category === "all" ? "Все товары" : categoryData?.name ?? "",
              href: `/catalog/${category}`,
            },
          ]}
        />
        <h1 className={clsx(styles.title, "h1")}>
          {category === "all" ? "Все товары" : categoryData?.name ?? ""}
          {categoryData && categoryData.products_count > 0 && (
            <span className={clsx("body-4", styles.count)}>
              {categoryData.products_count} товаров
            </span>
          )}
        </h1>
        {categories && categories.length > 0 && (
          <SubcategorySlider
            slug={category}
            categories={categories}
            categoryData={categoryData}
          />
        )}

        <section className={styles.container}>
          <FiltersSidebar
            generations={generations ?? []}
            series={series ?? []}
            bodies={bodies ?? []}
          />
          {children}
        </section>
      </div>

      <SeoBlock page={`${category}`} className={styles.seo} />
      <Feedback categories={categories ?? []} />
    </>
  );
};

export default Layout;
