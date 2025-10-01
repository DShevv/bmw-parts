import ContactsBlock from "@/blocks/ContactsBlock/ContactsBlock";
import Feedback from "@/blocks/Feedback/Feedback";
import styles from "./page.module.scss";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import clsx from "clsx";
import { SvgBank, SvgLocation } from "@/assets/icons/svgs";
import { getContacts, getSeoPage } from "@/services/InfoService";
import { getCategories } from "@/services/CatalogService";

export const generateMetadata = async () => {
  const { seo } = await getSeoPage("contacts");

  return {
    title: seo?.title ?? "Контакты",
    description: seo?.description ?? "Контакты",
    keywords: seo?.keywords,
    openGraph: {
      title: seo?.title ?? "Контакты",
      description: seo?.title ?? "Контакты",
    },
  };
};

const page = async () => {
  const contacts = await getContacts();
  const categories = await getCategories();

  return (
    <>
      <div className={styles.content}>
        <Breadcrumbs
          items={[
            { title: "Главная", href: "/" },
            { title: "Контакты", href: "/contacts" },
          ]}
        />
        <h1 className={clsx(styles.title, "h1")}>Контакты</h1>
        <ContactsBlock noTitle />
      </div>

      <section className={styles.requisites}>
        <h2 className={clsx(styles.title, "h2")}>Реквизиты компании</h2>
        <div className={styles.requisitesContent}>
          <div className={styles.item}>
            <div className={clsx(styles.itemTitle, "h4")}>
              <div className={styles.icon}>
                <SvgLocation />
              </div>
              Юридический адрес
            </div>
            <div
              className={clsx(styles.itemValue, "body-1")}
              dangerouslySetInnerHTML={{
                __html: contacts?.company_info || "",
              }}
            />
          </div>
          <div className={styles.item}>
            <div className={clsx(styles.itemTitle, "h4")}>
              <div className={styles.icon}>
                <SvgBank />
              </div>
              Банковские реквизиты
            </div>
            <div
              className={clsx(styles.itemValue, "body-1")}
              dangerouslySetInnerHTML={{
                __html: contacts?.bank_details || "",
              }}
            />
          </div>
        </div>
      </section>

      <Feedback categories={categories ?? []} />
    </>
  );
};

export default page;
