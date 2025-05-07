import Feedback from "@/blocks/Feedback/Feedback";
import styles from "./layout.module.scss";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import clsx from "clsx";
import SeoBlock from "@/blocks/SeoBlock/SeoBlock";
import SubcategorySlider from "@/blocks/SubcategorySlider/SubcategorySlider";
import FiltersSidebar from "@/blocks/FiltersSidebar/FiltersSidebar";

const Layout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ category: string }>;
}) => {
  const { category } = await params;

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
        <SubcategorySlider
          slug={category}
          categories={[
            "Фрикционные диски",
            "Стальные диски",
            "Стальные опорные диски",
            "Фрикционные диски",
          ]}
        />

        <section className={styles.container}>
          <FiltersSidebar />
          {children}
        </section>
      </div>

      <SeoBlock page={`${category}`} />
      <Feedback />
    </>
  );
};

export default Layout;
