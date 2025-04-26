import ContactsBlock from "@/blocks/ContactsBlock/ContactsBlock";
import Feedback from "@/blocks/Feedback/Feedback";
import styles from "./page.module.scss";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import clsx from "clsx";
import { SvgBank, SvgLocation } from "@/assets/icons/svgs";
const page = () => {
  return (
    <>
      <div className={styles.content}>
        <Breadcrumbs
          items={[
            { title: "Главная", href: "/" },
            { title: "Контакты", href: "/contacts" },
          ]}
        />
        <h1 className={clsx(styles.title, "h1")}>Контакты</h1>
        <ContactsBlock noTitle />
      </div>

      <section className={styles.requisites}>
        <h2 className={clsx(styles.title, "h2")}>Заказать обратный звонок</h2>
        <div className={styles.requisitesContent}>
          <div className={styles.item}>
            <div className={clsx(styles.itemTitle, "h4")}>
              <div className={styles.icon}>
                <SvgLocation />
              </div>
              Юридический адрес
            </div>
            <div className={clsx(styles.itemValue, "body-1")}>
              <p>Юридический адрес: г. Минск, пр-т Независимости, 1</p>
              <p>УНП: 999999999 </p>
              <p>ИНН: 7727438551</p>
              <p>ОГРН: 1207700036466</p>
            </div>
          </div>
          <div className={styles.item}>
            <div className={clsx(styles.itemTitle, "h4")}>
              <div className={styles.icon}>
                <SvgBank />
              </div>
              Банковские реквизиты
            </div>
            <div className={clsx(styles.itemValue, "body-1")}>
              <p>Название компании: ООО «Аэронавто»</p>
              <p>Расчётный счёт: 40702810601300023440</p>
              <p>Корреспондентский счёт: 30101810200000000593</p>
              <p>Банк: ЗАО «Альфа-Банк» БИК: 044525593</p>
            </div>
          </div>
        </div>
      </section>

      <Feedback />
    </>
  );
};

export default page;
