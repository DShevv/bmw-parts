import styles from "./page.module.scss";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import clsx from "clsx";
import Image from "next/image";
import newsImage from "@/assets/images/new.png";
import RecentPromo from "@/blocks/RecentPromo/RecentPromo";

const page = () => {
  return (
    <>
      <section className={styles.wrapper}>
        <div className={styles.content}>
          <div className={styles.container}>
            <Breadcrumbs
              items={[
                { title: "Главная", href: "/" },
                { title: "Акции", href: "/promotions" },
                {
                  title: "При заказе от 300 BYN получите скидку 5%!",
                  href: "",
                },
              ]}
            />
            <h1 className={clsx(styles.title, "h1")}>
              При заказе от 300 BYN получите скидку 5%!
            </h1>
            <div className={styles.info}>
              <div className={clsx(styles.date, "body-3")}>01.04.2025</div>
            </div>
          </div>
          <Image src={newsImage} alt="news" className={styles.image} />
        </div>
        <div className={styles.text}>
          <h3>
            Обнови свой BMW с выгодой! 🚘💨 <br /> При заказе запчастей для BMW
            от 300 BYN — скидка 5% автоматически!
          </h3>
          <p>
            ✨ Почему мы? <br /> Оригинальные детали и проверенные аналоги.{" "}
            <br />
            Мгновенный расчёт скидки в корзине. <br /> Бесплатная консультация
            по подбору.
          </p>
          <p>
            Не переплачивай! <br /> 🛠️ Выбери нужные детали → Добавь в корзину →
            Скидка уже ждёт тебя! <br /> 🔥 Улучшай свой автомобиль без лишних
            трат — только до конца месяца! 🔥
          </p>
        </div>
      </section>

      <RecentPromo title="Другие акции" />
    </>
  );
};

export default page;
