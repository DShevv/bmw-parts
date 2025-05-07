import styles from "./SeoBlock.module.scss";
import { getSeoText } from "@/services/InfoService";

const SeoBlock = async ({ page }: { page: string }) => {
  const seoText = await getSeoText(page);

  if (!seoText) {
    return null;
  }

  return (
    <section
      className={styles.container}
      dangerouslySetInnerHTML={{ __html: seoText.content }}
    />
  );
};

export default SeoBlock;
