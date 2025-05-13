import clsx from "clsx";
import styles from "./SeoBlock.module.scss";
import { getSeoText } from "@/services/InfoService";

const SeoBlock = async ({
  page,
  className,
}: {
  page: string;
  className?: string;
}) => {
  const seoText = await getSeoText(page);

  if (!seoText) {
    return null;
  }

  return (
    <section
      className={clsx(styles.container, className)}
      dangerouslySetInnerHTML={{ __html: seoText.content }}
    />
  );
};

export default SeoBlock;
