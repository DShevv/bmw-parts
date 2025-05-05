"use client";
import { observer } from "mobx-react-lite";
import styles from "./MenuPopup.module.scss";
import clsx from "clsx";
import { useEffect } from "react";
import globalStore from "@/stores/global-store";
import {
  SvgClose,
  SvgLocation,
  SvgMail,
  SvgPhone,
  SvgSale,
} from "@/assets/icons/svgs";
import Link from "next/link";
import SocialLinks from "@/components/SocialLinks/SocialLinks";

const MenuPopup = observer(() => {
  const { popupStore } = globalStore;
  const { menu, closePopup } = popupStore;

  useEffect(() => {
    if (menu) {
      const scrollPosition = window.scrollY;

      document.body.style.position = "fixed";
      document.body.style.overflowY = "scroll";
      document.body.style.top = `-${scrollPosition}px`;
      document.body.style.width = "100%";

      return () => {
        document.body.style.position = "";
        document.body.style.overflowY = "auto";
        document.body.style.top = "";
        document.body.style.width = "";
        window.scrollTo(0, scrollPosition);
      };
    }
  }, [menu]);

  return (
    <div
      className={clsx(styles.wrapper, { [styles.active]: menu })}
      onClick={() => closePopup("menu")}
    >
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        <button className={styles.close} onClick={() => closePopup("menu")}>
          <SvgClose />
        </button>

        <ul className={styles.menu}>
          <li>
            <Link className={clsx("h4", styles.item)} href="/">
              Главная
            </Link>
          </li>

          <li>
            <Link className={clsx("h4", styles.item)} href="/catalog">
              Каталог
            </Link>
          </li>
          <li>
            <Link className={clsx("h4", styles.item)} href="/">
              Подбор запчастей для BMW
            </Link>
          </li>
          <li>
            <Link className={clsx("h4", styles.item)} href="/help">
              Помощь покупателю
            </Link>
          </li>
          <li>
            <Link className={clsx("h4", styles.item)} href="/news">
              Блог
            </Link>
          </li>
          <li>
            <Link
              className={clsx("h4", styles.item, styles.sale)}
              href="/promotions"
            >
              <SvgSale />
              Акции
            </Link>
          </li>
          <li>
            <Link className={clsx("h4", styles.item)} href="/contacts">
              Контакты
            </Link>
          </li>
        </ul>

        <div className={styles.contacts}>
          <div className={clsx("body-3", styles.contactsItem)}>
            <SvgLocation />
            г. Минск, пр-т Независимости, 1
          </div>
          <Link
            className={clsx("body-3", styles.contactsItem)}
            href="tel:+375291234567"
          >
            <SvgPhone />
            +375 (29) 123-45-67
          </Link>
          <Link
            className={clsx("body-3", styles.contactsItem)}
            href="mailto:info@example.com"
          >
            <SvgMail />
            info@example.com
          </Link>
          <SocialLinks />
        </div>
      </div>
    </div>
  );
});

export default MenuPopup;
