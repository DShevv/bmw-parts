import Feedback from "@/blocks/Feedback/Feedback";
import styles from "./page.module.scss";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import clsx from "clsx";
import Pagination from "@/components/Pagination/Pagination";
import PromoItem from "@/components/PromoItem/PromoItem";
import { getNews } from "@/services/NewsService";
import SeoBlock from "@/blocks/SeoBlock/SeoBlock";
import { getSeoPage } from "@/services/InfoService";

export const generateMetadata = async () => {
  const { seo } = await getSeoPage("promotions");

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

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { page } = await searchParams;
  const promo = await getNews({
    page: Number(page) ?? 1,
    perPage: 8,
  });

  return (
    <>
      <div className={styles.content}>
        <Breadcrumbs
          items={[
            { title: "Главная", href: "/" },
            { title: "Акции", href: "/promotions" },
          ]}
        />
        <h1 className={clsx(styles.title, "h1")}>Акции</h1>
        <section className={styles.container}>
          {promo?.data.map((promotion) => (
            <PromoItem promotion={promotion} key={promotion.id} />
          ))}
        </section>
        {promo && promo?.last_page > 1 && (
          <Pagination
            current={promo?.current_page ?? 1}
            max={promo?.last_page ?? 1}
            maxPerView={5}
            className={styles.pagination}
          />
        )}
      </div>

      <SeoBlock page="promotions" />
      <Feedback />
    </>
  );
};

export default page;
