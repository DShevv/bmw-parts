import styles from "./page.module.scss";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import clsx from "clsx";
import Image from "next/image";
import RecentPromo from "@/blocks/RecentPromo/RecentPromo";
import { formatDate } from "@/utils/helper";
import { getPromo, getPromoBySlug } from "@/services/PromoService";

const transformContent = (content: string): string => {
  if (!content) return "";

  // Сохраняем содержимое h3 тегов
  const h3Contents: string[] = [];
  const processedContent = content.replace(
    /<h3[^>]*>(.*?)<\/h3>/g,
    (_, content) => {
      h3Contents.push(content);
      return "###H3_PLACEHOLDER###";
    }
  );

  // Объединяем содержимое h3 тегов в один тег
  const h3Content =
    h3Contents.length > 0 ? `<h3>${h3Contents.join("<br>")}</h3>` : "";

  // Разделяем контент по <br> тегу на логические блоки
  const parts = processedContent.split(/<br\s*\/?>/);

  // Обрабатываем каждую часть
  const processedParts = parts.map((part) => {
    // Заменяем все плейсхолдеры на пустую строку, так как h3 уже обработаны
    const processed = part.replace(/###H3_PLACEHOLDER###/g, "");

    // Находим все параграфы
    const paragraphContents = processed.match(/<p[^>]*>.*?<\/p>/g) || [];
    if (paragraphContents.length === 0) return processed;

    // Извлекаем текст из параграфов и объединяем с <br> между ними
    const combinedText = paragraphContents
      .map((p) => p.replace(/<p[^>]*>(.*?)<\/p>/g, "$1").trim())
      .filter((text) => text.length > 0)
      .join("<br>");

    // Возвращаем один параграф с объединенным текстом
    return (
      processed
        .replace(/<p[^>]*>.*?<\/p>/g, "")
        .replace(/(<p><\/p>|<p\s*\/>)/g, "")
        .trim() + (combinedText ? `<p>${combinedText}</p>` : "")
    );
  });

  // Собираем финальный контент, добавляя h3 в начало
  return (
    h3Content + processedParts.filter((part) => part.trim().length > 0).join("")
  );
};

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const promotion = await getPromoBySlug(slug.split("_")[1]);
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
  const promo = await getPromo({ page: 1, perPage: 10000 });

  if (!promo?.data) {
    return [];
  }

  return promo.data.data.map((promotion) => ({
    slug: `${promotion.slug}_${promotion.id}`,
  }));
}

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const promotion = await getPromoBySlug(slug.split("_")[1]);
  const promos = await getPromo({ page: 1, perPage: 8 });

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
                {formatDate(promotion?.published_at ?? "")}
              </div>
            </div>
          </div>
          <Image
            src={`${process.env.NEXT_PUBLIC_STORE_URL}/${promotion?.photo_path}`}
            alt="news"
            className={styles.image}
            height={420}
            width={1296}
          />
        </div>
        <div
          className={styles.text}
          dangerouslySetInnerHTML={{
            __html: transformContent(promotion?.content ?? ""),
          }}
        />
      </section>

      <RecentPromo title="Другие акции" promo={promos?.data.data ?? []} />
    </>
  );
};

export default page;
