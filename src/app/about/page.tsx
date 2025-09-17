import Feedback from "@/blocks/Feedback/Feedback";
import styles from "./page.module.scss";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import clsx from "clsx";
import { getSeoPage } from "@/services/InfoService";
import { getCategories } from "@/services/CatalogService";
import AboutBlock from "@/blocks/AboutBlock/AboutBlock";
import ContactsBlock from "@/blocks/ContactsBlock/ContactsBlock";
import { PrinciplesOfOurWork } from "@/blocks/principles-of-our-work";
import { ProductCatalog } from "@/blocks/ProductCatalog";

export const generateMetadata = async () => {
  const { seo } = await getSeoPage("about");

  return {
    title: seo?.title ?? "BMW parts",
    description: seo?.description ?? "BMW parts",
    keywords: seo?.keywords,
    openGraph: {
      title: seo?.title ?? "BMW parts",
      description: seo?.title ?? "BMW parts",
    },
  };
};

const page = async () => {
  const categories = await getCategories();

  return (
    <>
      <div className={styles.content}>
        <Breadcrumbs
          items={[
            { title: "Главная", href: "/" },
            { title: "О компании", href: "/about" },
          ]}
        />
        <h1 className={clsx(styles.title, "h1")}>О компании</h1>
        <AboutBlock />
      </div>

      <PrinciplesOfOurWork />
      <ProductCatalog />
      <ContactsBlock />
      <Feedback categories={categories ?? []} />
    </>
  );
};

export default page;
