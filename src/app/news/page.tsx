import Feedback from "@/blocks/Feedback/Feedback";
import styles from "./page.module.scss";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import clsx from "clsx";
import Pagination from "@/components/Pagination/Pagination";
import NewsItem from "@/components/NewsItem/NewsItem";
import { getNews } from "@/services/NewsService";
import SeoBlock from "@/blocks/SeoBlock/SeoBlock";
import { getSeoPage } from "@/services/InfoService";
export const dynamicParams = false;

export const generateMetadata = async () => {
  const { seo } = await getSeoPage("news");

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
  const news = await getNews({
    page: Number(page) ?? 1,
    perPage: 9,
  });
  return (
    <>
      <div className={styles.content}>
        <Breadcrumbs
          items={[
            { title: "Главная", href: "/" },
            { title: "Блог", href: "/news" },
          ]}
        />
        <h1 className={clsx(styles.title, "h1")}>Блог</h1>
        <section className={styles.container}>
          {news?.data.map((promotion) => (
            <NewsItem promotion={promotion} key={promotion.id} />
          ))}
        </section>
        {news && news?.last_page > 1 && (
          <Pagination
            current={news?.current_page ?? 1}
            max={news?.last_page ?? 1}
            maxPerView={5}
            className={styles.pagination}
          />
        )}
      </div>

      <SeoBlock page="news" />
      <Feedback />
    </>
  );
};

export default page;
