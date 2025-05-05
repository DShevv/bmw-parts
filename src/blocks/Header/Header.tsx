import React from "react";
import styles from "./Header.module.scss";
import Link from "next/link";
import { SvgPhone, SvgSale } from "@/assets/icons/svgs";
import clsx from "clsx";
import SocialLinks from "@/components/SocialLinks/SocialLinks";
import HeaderControls from "./HeaderControls/HeaderControls";
import HeaderCategories from "./HeaderCategories/HeaderCategories";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.info}>
        <Link href={"tel:+79111234567"} className={styles.phone}>
          <div className={styles.icon}>
            <SvgPhone />
          </div>
          <div className={clsx("body-1", styles.caption)}>
            +375 (29) 999-99-99
            <span className="body-4">Ежедневно 09:00–21:00</span>
          </div>
        </Link>

        <ul className={styles.menu}>
          <li>
            <Link href={"/"} className={clsx("body-2", styles.link)}>
              Главная
            </Link>
          </li>
          <li>
            <Link href={"/"} className={clsx("body-2", styles.link)}>
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
        <SocialLinks />
      </div>
      <HeaderControls />
      <HeaderCategories />
    </header>
  );
};

export default Header;
