import Logo from "@/components/Logo/Logo";
import styles from "./Footer.module.scss";
import Link from "next/link";
import clsx from "clsx";
import { SvgSale } from "@/assets/icons/svgs";
import SocialLinks from "@/components/SocialLinks/SocialLinks";
import { paymentMethods } from "@/data/dumpy-data";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.main}>
          <div className={styles.logo}>
            <Logo isFooter />
            <p className="body-1">
              Официальный дистрибьютор запасных частей для автомобилей марки BMW
            </p>
          </div>
          <div className={styles.categories}>
            <Link href="/" className={clsx(styles.category, "h3")}>
              Масла и автохимия
            </Link>
            <Link href="/" className={clsx(styles.category, "h3")}>
              Диски
            </Link>
            <Link href="/" className={clsx(styles.category, "h3")}>
              Уход за автомобилем
            </Link>
            <Link href="/" className={clsx(styles.category, "h3")}>
              Инструменты
            </Link>
          </div>
          <div className={styles.menu}>
            <Link href="/" className={clsx(styles.menuItem, "body-1")}>
              Главная
            </Link>
            <Link href="/" className={clsx(styles.menuItem, "body-1")}>
              Подбор запчастей для BMW
            </Link>
            <Link href="/help" className={clsx(styles.menuItem, "body-1")}>
              Помощь покупателю
            </Link>
            <Link href="/news" className={clsx(styles.menuItem, "body-1")}>
              Блог
            </Link>
            <Link
              href="/promotions"
              className={clsx(styles.menuItem, styles.sale, "body-1")}
            >
              <SvgSale />
              Акции
            </Link>
            <Link href="/contacts" className={clsx(styles.menuItem, "body-1")}>
              Контакты
            </Link>
          </div>
          <div className={styles.contacts}>
            <div className={clsx(styles.contactItem, "h3")}>
              <div className={clsx("body-4", styles.title)}>Адрес</div>
              г. Минск, пр-т Независимости, 1
            </div>
            <div className={clsx(styles.contactItem, "h3")}>
              <div className={clsx("body-4", styles.title)}>Телефон</div>
              <Link href="tel:+375293333333">+375 29 333-33-33</Link>
            </div>
            <div className={clsx(styles.contactItem, "h3")}>
              <div className={clsx("body-4", styles.title)}>Email</div>
              <Link href="mailto:info@example.com">info@example.com</Link>
            </div>

            <div className={clsx(styles.contactItem, "h3")}>
              <div className={clsx("body-4", styles.title)}>Соцсети</div>
              <SocialLinks />
            </div>
          </div>
          <div className={styles.policy}>
            <Link href="/policy" className={clsx(styles.policyItem, "body-4")}>
              Политика обработки персональных данных
            </Link>
            <div className={styles.dev}>
              <p className="body-4">Разработка сайта:</p>
              <Link href="https://dev-studio.by" className={"body-3"}>
                cropas.by
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.copyright}>
          <p className="body-4">ⓒ2025 aeronavto.by</p>
          <div className={styles.payments}>
            <span className="body-4"> Принимаем к оплате:</span>
            <div className={styles.paymentMethods}>
              {paymentMethods.map((method) => (
                <Image key={method.id} src={method.image} alt={method.name} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
