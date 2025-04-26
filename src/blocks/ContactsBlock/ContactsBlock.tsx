import Map from "@/components/Map/Map";
import styles from "./ContactsBlock.module.scss";
import clsx from "clsx";
import { SvgLocation, SvgPhone, SvgMail } from "@/assets/icons/svgs";
import Link from "next/link";
import SocialLinks from "@/components/SocialLinks/SocialLinks";

const ContactsBlock = ({ noTitle }: { noTitle?: boolean }) => {
  return (
    <div className={styles.wrapper}>
      {!noTitle && (
        <div className={styles.header}>
          <h2 className={clsx("h2", styles.title)}>Контакты компании</h2>
        </div>
      )}

      <div className={styles.content}>
        <div className={styles.info}>
          <div className={styles.infoItem}>
            <p className={clsx(styles.infoItemTitle, "body-4")}>Адрес</p>
            <p className={clsx(styles.infoItemValue, "h3")}>
              <SvgLocation />
              г. Минск, пр-т Независимости, 1
            </p>
          </div>
          <div className={styles.infoItem}>
            <p className={clsx(styles.infoItemTitle, "body-4")}>Телефон</p>
            <Link
              href="tel:+375291234567"
              className={clsx(styles.infoItemValue, "h3")}
            >
              <SvgPhone />
              +375 (29) 123-45-67
            </Link>
          </div>
          <div className={styles.infoItem}>
            <p className={clsx(styles.infoItemTitle, "body-4")}>Email</p>
            <Link
              href="mailto:info@example.com"
              className={clsx(styles.infoItemValue, "h3")}
            >
              <SvgMail />
              info@example.com
            </Link>
          </div>
          <div className={styles.infoItem}>
            <p className={clsx(styles.infoItemTitle, "body-4")}>Соцсети</p>
            <SocialLinks />
          </div>
        </div>
        <Map className={styles.map} />
      </div>
    </div>
  );
};

export default ContactsBlock;
