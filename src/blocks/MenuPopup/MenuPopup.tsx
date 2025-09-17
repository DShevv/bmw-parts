"use client";
import { observer } from "mobx-react-lite";
import styles from "./MenuPopup.module.scss";
import clsx from "clsx";
import { useState, useEffect } from "react";
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
import { ContactsT, SettingT } from "@/types/types";
import { getContacts } from "@/services/InfoService";

interface IMenuPopupProps {
  contacts: ContactsT | undefined;
  settings: SettingT | undefined;
}

const MenuPopup = observer(({}: IMenuPopupProps) => {
  const { popupStore } = globalStore;
  const { menu, closePopup } = popupStore;
  const [contacts, setContacts] = useState<ContactsT | null>(null);

  useEffect(() => {
    const fetchContacts = async () => {
      const res = await getContacts();
      setContacts(res);
    };
    fetchContacts();
  }, []);

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
        <button
          className={styles.close}
          onClick={() => closePopup("menu")}
          aria-label="close"
        >
          <SvgClose />
        </button>

        <ul className={styles.menu}>
          <li>
            <Link
              className={clsx("h4", styles.item)}
              href="/"
              onClick={() => closePopup("menu")}
            >
              Главная
            </Link>
          </li>

          <li>
            <Link
              className={clsx("h4", styles.item)}
              href="/catalog"
              onClick={() => closePopup("menu")}
            >
              Каталог
            </Link>
          </li>
          <li>
            <Link
              className={clsx("h4", styles.item)}
              href="/find-parts"
              onClick={() => closePopup("menu")}
            >
              Подбор запчастей для BMW
            </Link>
          </li>
          <li>
            <Link
              className={clsx("h4", styles.item)}
              href="/help"
              onClick={() => closePopup("menu")}
            >
              Оплата и доставка
            </Link>
          </li>
          <li>
            <Link
              className={clsx("h4", styles.item)}
              href="/news"
              onClick={() => closePopup("menu")}
            >
              Блог
            </Link>
          </li>
          <li>
            <Link
              className={clsx("h4", styles.item, styles.sale)}
              href="/promotions"
              onClick={() => closePopup("menu")}
            >
              <SvgSale />
              Акции
            </Link>
          </li>
          <li>
            <Link
              className={clsx("h4", styles.item)}
              href="/contacts"
              onClick={() => closePopup("menu")}
            >
              Контакты
            </Link>
          </li>
          <li>
            <Link
              className={clsx("h4", styles.item)}
              href={"/about"}
              onClick={() => closePopup("menu")}
            >
              О компании
            </Link>
          </li>
        </ul>

        <div className={styles.contacts}>
          <div className={clsx("body-3", styles.contactsItem)}>
            <SvgLocation />
            {contacts?.address}
          </div>
          {contacts?.phones.map((phone, index) => (
            <Link
              className={clsx("body-3", styles.contactsItem)}
              href="tel:+375291234567"
              key={index}
            >
              <SvgPhone />
              {phone}
            </Link>
          ))}
          <Link
            className={clsx("body-3", styles.contactsItem)}
            href={`mailto:${contacts?.email}`}
          >
            <SvgMail />
            {contacts?.email}
          </Link>
          {contacts && <SocialLinks contacts={contacts.social_links} />}
        </div>
      </div>
    </div>
  );
});

export default MenuPopup;
