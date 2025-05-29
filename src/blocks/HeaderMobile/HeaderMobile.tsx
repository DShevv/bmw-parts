import React from "react";
import styles from "./HeaderMobile.module.scss";
import Link from "next/link";
import { SvgPhone, SvgSale } from "@/assets/icons/svgs";
import clsx from "clsx";
import SocialLinks from "@/components/SocialLinks/SocialLinks";
import HeaderControls from "./HeaderControls/HeaderControls";
import { getContacts, getSetting } from "@/services/InfoService";

const HeaderMobile = async () => {
  const contacts = await getContacts();
  const settings = await getSetting();

  return (
    <header className={styles.header}>
      <div className={styles.info}>
        <Link href={`tel:+${contacts?.phones[0]}`} className={styles.phone}>
          <div className={styles.icon}>
            <SvgPhone />
          </div>
          <div className={clsx("body-1", styles.caption)}>
            {contacts?.phones[0]}
            <span className="body-4">{contacts?.working_hours}</span>
          </div>
        </Link>

        <ul className={styles.menu}>
          <li>
            <Link href={"/"} className={clsx("body-2", styles.link)}>
              Главная
            </Link>
          </li>
          <li>
            <Link href={"/find-parts"} className={clsx("body-2", styles.link)}>
              Подбор запчастей для BMW
            </Link>
          </li>
          <li>
            <Link href={"/help"} className={clsx("body-2", styles.link)}>
              Помощь покупателю
            </Link>
          </li>
          <li>
            <Link href={"/news"} className={clsx("body-2", styles.link)}>
              Блог
            </Link>
          </li>
          <li>
            <Link
              href={"/promotions"}
              className={clsx("body-2", styles.link, styles.sale)}
            >
              <SvgSale />
              Акции
            </Link>
          </li>
          <li>
            <Link href={"/contacts"} className={clsx("body-2", styles.link)}>
              Контакты
            </Link>
          </li>
        </ul>
        {contacts && <SocialLinks contacts={contacts.social_links} />}
      </div>
      <HeaderControls logo={settings?.logo_path ?? ""} />
    </header>
  );
};

export default HeaderMobile;
