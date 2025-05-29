import Link from "next/link";
import styles from "./SocialLinks.module.scss";
import { SvgTelegram, SvgViber, SvgWhatsapp } from "@/assets/icons/svgs";
import clsx from "clsx";
import { ContactsT } from "@/types/types";

const SocialLinks = ({ contacts }: { contacts: ContactsT["social_links"] }) => {
  return (
    <div className={styles.container}>
      {contacts?.viber && contacts?.viber !== "" && (
        <Link
          href={`viber://chat?number=${contacts.viber}`}
          target="_blank"
          className={clsx(styles.link, styles.viber)}
          aria-label="viber"
        >
          <SvgViber />
        </Link>
      )}
      {contacts?.telegram && contacts?.telegram !== "" && (
        <Link
          href={`https://t.me/${contacts.telegram}`}
          target="_blank"
          className={clsx(styles.link, styles.telegram)}
          aria-label="telegram"
        >
          <SvgTelegram />
        </Link>
      )}
      {contacts?.whatsapp && contacts?.whatsapp !== "" && (
        <Link
          href={`https://wa.me/${contacts.whatsapp}`}
          target="_blank"
          className={clsx(styles.link, styles.whatsapp)}
          aria-label="whatsapp"
        >
          <SvgWhatsapp />
        </Link>
      )}
    </div>
  );
};

export default SocialLinks;
