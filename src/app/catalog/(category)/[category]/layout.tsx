import Feedback from "@/blocks/Feedback/Feedback";
import styles from "./layout.module.scss";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import clsx from "clsx";
import SeoBlock from "@/blocks/SeoBlock/SeoBlock";
import SubcategorySlider from "@/blocks/SubcategorySlider/SubcategorySlider";
import FiltersSidebar from "@/blocks/FiltersSidebar/FiltersSidebar";
import { getCategories } from "@/services/CatalogService";

const Layout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ category: string }>;
}) => {
  const { category } = await params;
  const categories = await getCategories();

  return (
    <>
      <div className={styles.content}>
        <Breadcrumbs
          items={[
            { title: "Главная", href: "/" },
            { title: "Каталог", href: "/catalog" },
            {
              title: category === "all" ? "Все товары" : category,
              href: `/catalog/${category}`,
            },
          ]}
        />
        <h1 className={clsx(styles.title, "h1")}>
          {category === "all" ? "Все товары" : category}
          <span className={clsx("body-4", styles.count)}>100 товаров</span>
        </h1>
        {categories && categories.length > 0 && (
          <SubcategorySlider slug={category} categories={categories} />
        )}

        <section className={styles.container}>
          <FiltersSidebar />
          {children}
        </section>
      </div>

      <SeoBlock page={`${category}`} className={styles.seo} />
      <Feedback />
    </>
  );
};

export default Layout;
