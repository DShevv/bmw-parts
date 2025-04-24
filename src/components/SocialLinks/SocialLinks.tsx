import Link from "next/link";
import styles from "./SocialLinks.module.scss";
import { SvgTelegram, SvgViber, SvgWhatsapp } from "@/assets/icons/svgs";
import clsx from "clsx";

const SocialLinks = () => {
  return (
    <div className={styles.container}>
      <Link
        href={""}
        target="_blank"
        className={clsx(styles.link, styles.viber)}
      >
        <SvgViber />
      </Link>
      <Link
        href={""}
        target="_blank"
        className={clsx(styles.link, styles.telegram)}
      >
        <SvgTelegram />
      </Link>
      <Link
        href={""}
        target="_blank"
        className={clsx(styles.link, styles.whatsapp)}
      >
        <SvgWhatsapp />
      </Link>
    </div>
  );
};

export default SocialLinks;
