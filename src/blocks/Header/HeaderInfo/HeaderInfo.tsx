import {
  SvgBank,
  SvgDelivery,
  SvgLocation,
  SvgPhone,
} from "@/assets/icons/svgs";
import styles from "./HeaderInfo.module.scss";
import Logo from "@/components/Logo/Logo";
import SocialLinks from "@/components/SocialLinks/SocialLinks";
import { getContacts } from "@/services/InfoService";
import Link from "next/link";
import clsx from "clsx";

const HeaderInfo = async () => {
  const contacts = await getContacts();

  return (
    <div className={styles.container}>
      <Logo className={styles.logo} />
      {contacts && <SocialLinks contacts={contacts.social_links} />}
      <div className={styles.info}>
        <div className={styles.infoItem}>
          <SvgPhone />
          <div className={styles.caption}>
            <div className={clsx("body-3", styles.title)}>Телефон:</div>
            <Link
              href={`tel:${contacts?.phones[0]}`}
              className={clsx("body-4", styles.value)}
            >
              {contacts?.phones[0]}
            </Link>
          </div>
        </div>
        <div className={styles.infoItem}>
          <SvgLocation />
          <div className={styles.caption}>
            <div className={clsx("body-3", styles.title)}>Адрес:</div>
            <div className={clsx("body-4", styles.value)}>
              {contacts?.address}
            </div>
          </div>
        </div>
        <div className={styles.infoItem}>
          <SvgDelivery />
          <div className={styles.caption}>
            <div className={clsx("body-3", styles.title)}>Доставка:</div>
            <div className={clsx("body-4", styles.value)}>по Минску и РБ</div>
          </div>
        </div>
        <div className={styles.infoItem}>
          <SvgBank />
          <div className={styles.caption}>
            <div className={clsx("body-3", styles.title)}>Оплата:</div>
            <div className={clsx("body-4", styles.value)}>
              картой или через ЕРИП
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderInfo;
