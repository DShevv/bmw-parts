import React from "react";
import styles from "./Header.module.scss";
import Link from "next/link";
import clsx from "clsx";
import HeaderControls from "./HeaderControls/HeaderControls";
import HeaderInfo from "./HeaderInfo/HeaderInfo";
import { getCategories } from "@/services/CatalogService";

const Header = async () => {
  const categories = await getCategories();

  return (
    <header className={styles.header}>
      <div className={styles.info}>
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
            <Link href={"/contacts"} className={clsx("body-2", styles.link)}>
              Контакты
            </Link>
          </li>
        </ul>
      </div>
      <HeaderInfo />
      <HeaderControls categories={categories ?? undefined} />
    </header>
  );
};

export default Header;
