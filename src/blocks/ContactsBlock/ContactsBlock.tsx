import Map from "@/components/Map/Map";
import styles from "./ContactsBlock.module.scss";
import clsx from "clsx";
import { SvgLocation, SvgPhone, SvgMail } from "@/assets/icons/svgs";
import Link from "next/link";
import SocialLinks from "@/components/SocialLinks/SocialLinks";
import { getContacts } from "@/services/InfoService";

const ContactsBlock = async ({ noTitle }: { noTitle?: boolean }) => {
  const contacts = await getContacts();

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
              {contacts?.address}
            </p>
          </div>
          <div className={styles.infoItem}>
            <p className={clsx(styles.infoItemTitle, "body-4")}>Телефон</p>
            <Link
              href={`tel:+${contacts?.phones[0]}`}
              className={clsx(styles.infoItemValue, "h3")}
            >
              <SvgPhone />
              {contacts?.phones[0]}
            </Link>
          </div>
          <div className={styles.infoItem}>
            <p className={clsx(styles.infoItemTitle, "body-4")}>Email</p>
            <Link
              href={`mailto:${contacts?.email}`}
              className={clsx(styles.infoItemValue, "h3")}
            >
              <SvgMail />
              {contacts?.email}
            </Link>
          </div>
          <div className={styles.infoItem}>
            <p className={clsx(styles.infoItemTitle, "body-4")}>Соцсети</p>
            {contacts && <SocialLinks contacts={contacts} />}
          </div>
        </div>
        <Map className={styles.map} address={contacts?.address} />
      </div>
    </div>
  );
};

export default ContactsBlock;
