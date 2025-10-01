import Feedback from "@/blocks/Feedback/Feedback";
import styles from "./page.module.scss";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import clsx from "clsx";
import { getSeoPage, getSetting } from "@/services/InfoService";
import { getCategories } from "@/services/CatalogService";
import AboutBlock from "@/blocks/AboutBlock/AboutBlock";
import ContactsBlock from "@/blocks/ContactsBlock/ContactsBlock";
import { ProductCatalog } from "@/blocks/ProductCatalog";
import { AboutTextBlock } from "@/blocks/AboutTextBlock";

export const generateMetadata = async () => {
  const { seo } = await getSeoPage("about");

  return {
    title: seo?.title ?? "О компании",
    description: seo?.description ?? "О компании",
    keywords: seo?.keywords,
    openGraph: {
      title: seo?.title ?? "О компании",
      description: seo?.title ?? "О компании",
    },
  };
};

const page = async () => {
  const categories = await getCategories();
  const settings = await getSetting();

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

      {settings?.about.content_blocks.map((block, index) => {
        switch (block.type) {
          case "text":
            return <AboutTextBlock key={index} text={block.content.text} />;
          case "image_text":
            return (
              <ProductCatalog
                key={index}
                text={block.content.text}
                image={block.content.image_path}
                imagePosition={block.content.image_position}
              />
            );
        }
      })}

      <ContactsBlock />
      <Feedback categories={categories ?? []} />
    </>
  );
};

export default page;
