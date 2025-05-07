import styles from "./page.module.scss";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import clsx from "clsx";
import Image from "next/image";
import RecentPromo from "@/blocks/RecentPromo/RecentPromo";
import { getNews, getNewsBySlug } from "@/services/NewsService";
import { formatDate } from "@/utils/helper";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const promotion = await getNewsBySlug(slug);
  return {
    title: promotion?.title ?? "BMW parts",
    description:
      promotion?.content.replace(/<[^>]*>?/g, "").slice(0, 155) ?? "BMW parts",
    openGraph: {
      title: promotion?.title ?? "BMW parts",
      description:
        promotion?.content.replace(/<[^>]*>?/g, "").slice(0, 155) ??
        "BMW parts",
    },
  };
};

export const dynamicParams = false;

export async function generateStaticParams() {
  const promo = await getNews({ page: 1, perPage: 10000 });

  if (!promo?.data) {
    return [];
  }

  return promo.data.map((promotion) => ({
    slug: promotion.slug,
  }));
}

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const promotion = await getNewsBySlug(slug);
  const promos = await getNews({ page: 1, perPage: 8 });

  return (
    <>
      <section className={styles.wrapper}>
        <div className={styles.content}>
          <div className={styles.container}>
            <Breadcrumbs
              items={[
                { title: "Главная", href: "/" },
                { title: "Акции", href: "/promotions" },
                {
                  title: promotion?.title ?? "",
                  href: "",
                },
              ]}
            />
            <h1 className={clsx(styles.title, "h1")}>{promotion?.title}</h1>
            <div className={styles.info}>
              <div className={clsx(styles.date, "body-3")}>
                {formatDate(promotion?.created_at ?? "")}
              </div>
            </div>
          </div>
          <Image
            src={`${process.env.NEXT_PUBLIC_STORE_URL}/${promotion?.image}`}
            alt="news"
            className={styles.image}
            height={420}
            width={1296}
          />
        </div>
        <div
          className={styles.text}
          dangerouslySetInnerHTML={{ __html: promotion?.content ?? "" }}
        />
      </section>

      <RecentPromo title="Другие акции" promo={promos?.data ?? []} />
    </>
  );
};

export default page;
