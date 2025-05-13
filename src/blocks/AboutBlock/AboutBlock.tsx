import Image from "next/image";
import styles from "./AboutBlock.module.scss";
import picture from "@/assets/images/about.jpg";
import Logo from "@/components/Logo/Logo";
import clsx from "clsx";

const AboutBlock = () => {
  return (
    <section className={styles.wrapper}>
      <div className={styles.bg}>
        <Image src={picture} alt="about" />
      </div>
      <div className={styles.content}>
        <Logo className={styles.logo} />

        <div className={styles.caption}>
          <h2 className={clsx("h2", styles.title)}>О нашей компании</h2>
          <p className={clsx("body-1", styles.text)}>
            Ищете надёжные автозапчасти для BMW в Минске? Наш специализированный
            магазин предлагает оригинальные и сертифицированные комплектующие
            для всех моделей BMW — от классических серий до новейших решений.
            Мы сотрудничаем с официальными поставщиками, чтобы обеспечить
            клиентов деталями, которые идеально совместимы с конструкцией вашего
            авто.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutBlock;
