import styles from "./page.module.scss";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import clsx from "clsx";
import RecentNews from "@/blocks/RecentNews/RecentNews";
import Image from "next/image";
import { getNews, getNewsBySlug, addNewsView } from "@/services/NewsService";
import { formatDate, slugifyWithOpts } from "@/utils/helper";

export const dynamicParams = false;

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const news = await getNewsBySlug(slug);
  return {
    title: news?.title ?? "BMW parts",
    description:
      news?.content.replace(/<[^>]*>?/g, "").slice(0, 155) ?? "BMW parts",
    openGraph: {
      title: news?.title ?? "BMW parts",
      description:
        news?.content.replace(/<[^>]*>?/g, "").slice(0, 155) ?? "BMW parts",
    },
  };
};

export async function generateStaticParams() {
  const news = await getNews({ page: 1, perPage: 10000 });

  if (!news?.data) {
    return [];
  }

  return news.data.map((item) => ({
    slug: `${slugifyWithOpts(item.title)}_${item.id}`,
  }));
}

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const news = await getNewsBySlug(slug.split("_")[1]);
  const newsList = await getNews({ page: 1, perPage: 9 });
  await addNewsView(news?.id ?? 0);

  return (
    <>
      <section className={styles.wrapper}>
        <div className={styles.content}>
          <div className={styles.container}>
            <Breadcrumbs
              items={[
                { title: "Главная", href: "/" },
                { title: "Блог", href: "/news" },
                {
                  title: news?.title ?? "",
                  href: "",
                },
              ]}
            />
            <h1 className={clsx(styles.title, "h1")}>{news?.title}</h1>
            <div className={styles.info}>
              <div className={clsx(styles.date, "body-3")}>
                {formatDate(news?.publication_date ?? "")}
              </div>
              {/* {news?.views && (
                <div className={clsx(styles.views, "body-3")}>
                  <SvgEye />
                  {news?.views ?? 0} просмотров
                </div>
              )} */}
            </div>
          </div>
          <Image
            src={`${process.env.NEXT_PUBLIC_STORE_URL}/${news?.photo_path}`}
            alt="news"
            className={styles.image}
            height={420}
            width={636}
          />
        </div>
        <div
          className={styles.text}
          dangerouslySetInnerHTML={{ __html: news?.content ?? "" }}
        />
      </section>

      {newsList && <RecentNews title="Другие новости" news={newsList.data} />}
    </>
  );
};

export default page;
