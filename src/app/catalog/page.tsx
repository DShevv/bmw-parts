import Feedback from "@/blocks/Feedback/Feedback";
import styles from "./page.module.scss";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import clsx from "clsx";
import CatalogModels from "@/blocks/CatalogModels/CatalogModels";
import SeoBlock from "@/blocks/SeoBlock/SeoBlock";
import CatalogCategories from "@/blocks/CatalogCategories/CatalogCategories";

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

      <SeoBlock />
      <Feedback />
    </>
  );
};

export default page;
