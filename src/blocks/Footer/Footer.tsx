import Logo from "@/components/Logo/Logo";
import styles from "./Footer.module.scss";
import Link from "next/link";
import clsx from "clsx";
import { SvgSale } from "@/assets/icons/svgs";
import SocialLinks from "@/components/SocialLinks/SocialLinks";
import { paymentMethods } from "@/data/dumpy-data";
import Image from "next/image";
import { getContacts, getSetting } from "@/services/InfoService";

const Footer = async () => {
  const contacts = await getContacts();
  const settings = await getSetting();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.main}>
          <div className={styles.logo}>
            <Logo isFooter image={settings?.logo_path} />
            <p className="body-1">
              Официальный дистрибьютор запасных частей для автомобилей марки BMW
            </p>
          </div>
          <div className={styles.categories}>
            <Link href="/" className={clsx(styles.category, "body-1")}>
              Главная
            </Link>
            <Link href="/catalog" className={clsx(styles.category, "body-1")}>
              Каталог
            </Link>
            <Link
              href="/find-parts"
              className={clsx(styles.category, "body-1")}
            >
              Подбор запчастей для BMW
            </Link>
          </div>
          <div className={styles.menu}>
            <Link href={"/about"} className={clsx("body-1", styles.menuItem)}>
              О компании
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
              {contacts?.address}
            </div>
            <div className={clsx(styles.contactItem, "h3")}>
              <div className={clsx("body-4", styles.title)}>Телефон</div>
              <Link href={`tel:${contacts?.phones[0]}`}>
                {contacts?.phones[0]}
              </Link>
            </div>
            <div className={clsx(styles.contactItem, "h3")}>
              <div className={clsx("body-4", styles.title)}>Email</div>
              <Link href={`mailto:${contacts?.email}`}>{contacts?.email}</Link>
            </div>

            <div className={clsx(styles.contactItem, "h3")}>
              <div className={clsx("body-4", styles.title)}>Соцсети</div>
              {contacts && <SocialLinks contacts={contacts.social_links} />}
            </div>
          </div>
          <div className={styles.policy}>
            <Link
              href="/help?type=policy"
              className={clsx(styles.policyItem, "body-4")}
            >
              Политика обработки персональных данных
            </Link>
            <div className={styles.dev}>
              <p className="body-4">Разработка сайта:</p>
              <Link href="https://cropas.by" className={"body-3"}>
                cropas.by
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.copyright}>
          <p className="body-4">ⓒ2025 bmw139.by</p>
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
